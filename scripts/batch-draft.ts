#!/usr/bin/env tsx
/**
 * Batch/parallel drafting for why-is-that-eu.
 *
 * Anthropic (default) — Batches API, 50% cost reduction, async:
 *   npm run batch-draft
 *   npm run batch-draft -- "GDPR" "AI Act" "REACH"
 *   npm run batch-draft -- --poll <batch_id>
 *   npm run batch-draft -- --save <batch_id>
 *
 * DeepSeek — parallel requests, ~5–22x cheaper than Claude:
 *   npm run batch-draft -- --provider deepseek
 *   npm run batch-draft -- --provider deepseek --model deepseek-reasoner
 *   npm run batch-draft -- --provider deepseek --parallel 8
 *
 * Shared flags:
 *   --no-context       skip EUR-Lex / Wikipedia context fetch
 *   --parallel N       concurrency for DeepSeek (default 5); ignored for Anthropic
 */

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { lookupCandidate, fetchContext, SYSTEM_PROMPT, ENTRY_PROMPT, finalize } from './draft.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BATCH_STATE_FILE = path.join(__dirname, '..', 'data', 'batch-state.json');

const DEFAULT_TOPICS = [
  'GDPR',
  'Single-Use Plastics Directive',
  'Digital Markets Act',
  'EU AI Act',
  'Right to Repair',
  'REACH',
  'ePrivacy Directive',
  'Battery Regulation 2023',
];

const POLL_INTERVAL_MS = 15_000;

type Provider = 'anthropic' | 'deepseek';

const DEFAULT_MODELS: Record<Provider, string> = {
  anthropic: 'claude-opus-4-7',
  deepseek: 'deepseek-chat',
};

// ── Argument parsing ──────────────────────────────────────────────────────────

interface Args {
  provider: Provider;
  model: string;
  parallel: number;
  topics: string[];
  noContext: boolean;
  pollId: string | null;
  saveId: string | null;
}

function parseArgs(argv: string[]): Args {
  const args = argv.slice(2);
  let provider: Provider = 'anthropic';
  let model: string | null = null;
  let parallel = 5;
  let noContext = false;
  let pollId: string | null = null;
  let saveId: string | null = null;
  let topicsFile: string | null = null;
  const topics: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' && args[i + 1]) {
      const p = args[++i];
      if (p !== 'anthropic' && p !== 'deepseek') {
        console.error(`Unknown provider "${p}". Valid: anthropic, deepseek`);
        process.exit(1);
      }
      provider = p;
    } else if (args[i] === '--model' && args[i + 1]) {
      model = args[++i];
    } else if (args[i] === '--parallel' && args[i + 1]) {
      parallel = parseInt(args[++i], 10);
      if (isNaN(parallel) || parallel < 1) {
        console.error('--parallel must be a positive integer');
        process.exit(1);
      }
    } else if (args[i] === '--no-context') {
      noContext = true;
    } else if (args[i] === '--poll' && args[i + 1]) {
      pollId = args[++i];
    } else if (args[i] === '--save' && args[i + 1]) {
      saveId = args[++i];
    } else if (args[i] === '--topics-file' && args[i + 1]) {
      topicsFile = args[++i];
    } else {
      topics.push(args[i]);
    }
  }

  let resolvedTopics = topics.length > 0 ? topics : DEFAULT_TOPICS;
  if (topicsFile) {
    const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', topicsFile);
    resolvedTopics = JSON.parse(fs.readFileSync(filePath, 'utf8')) as string[];
    console.log(`Loaded ${resolvedTopics.length} topics from ${topicsFile}`);
  }

  return {
    provider,
    model: model ?? DEFAULT_MODELS[provider],
    parallel,
    topics: resolvedTopics,
    noContext,
    pollId,
    saveId,
  };
}

// ── Concurrency limiter ───────────────────────────────────────────────────────

async function withConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<Array<T | Error>> {
  const results: Array<T | Error> = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      try {
        results[i] = await tasks[i]();
      } catch (err) {
        results[i] = err instanceof Error ? err : new Error(String(err));
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

// ── Context fetching (shared) ─────────────────────────────────────────────────

async function buildContextMap(topics: string[]): Promise<Map<string, string | undefined>> {
  const contextMap = new Map<string, string | undefined>();
  console.log('Fetching context (CELLAR + Wikipedia) in parallel...\n');

  await Promise.all(
    topics.map(async (topic) => {
      const candidate = lookupCandidate(topic);
      if (candidate) {
        process.stdout.write(`  Looking up: ${candidate.title.slice(0, 55)}...\n`);
        const ctx = await fetchContext(candidate.celex, candidate.title).catch(() => undefined);
        contextMap.set(topic, ctx);
      } else {
        process.stdout.write(`  No candidate match for: "${topic}"\n`);
        contextMap.set(topic, undefined);
      }
    })
  );

  return contextMap;
}

// ── Anthropic Batches API path ────────────────────────────────────────────────

interface BatchState {
  batchId: string;
  topics: string[];
  customIds: string[];
  submittedAt: string;
}

function saveBatchState(state: BatchState): void {
  fs.mkdirSync(path.dirname(BATCH_STATE_FILE), { recursive: true });
  fs.writeFileSync(BATCH_STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function loadBatchState(): BatchState | null {
  if (!fs.existsSync(BATCH_STATE_FILE)) return null;
  return JSON.parse(fs.readFileSync(BATCH_STATE_FILE, 'utf8'));
}

function topicToCustomId(topic: string): string {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

async function submitAnthropicBatch(topics: string[], model: string, noContext: boolean): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }

  const client = new Anthropic();
  console.log(`\nPreparing ${topics.length} entries for Anthropic Batches API...`);

  const contextMap = noContext ? new Map<string, undefined>() : await buildContextMap(topics);

  const customIds = topics.map(topicToCustomId);

  const batch = await client.messages.batches.create({
    requests: topics.map((topic, i) => ({
      custom_id: customIds[i],
      params: {
        model,
        max_tokens: 4096,
        thinking: { type: 'adaptive' },
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: ENTRY_PROMPT(topic, contextMap.get(topic)) }],
      } as Anthropic.Messages.MessageCreateParamsNonStreaming,
    })),
  });

  const state: BatchState = {
    batchId: batch.id,
    topics,
    customIds,
    submittedAt: new Date().toISOString(),
  };
  saveBatchState(state);

  console.log(`\nBatch submitted!`);
  console.log(`  Batch ID:  ${batch.id}`);
  console.log(`  Requests:  ${topics.length}`);
  console.log(`  State:     data/batch-state.json`);
  console.log(`\nResume with:  npm run batch-draft -- --poll ${batch.id}`);

  await pollAndSave(client, batch.id, topics, customIds);
}

async function pollAndSave(
  client: Anthropic,
  batchId: string,
  topics: string[],
  customIds: string[],
): Promise<void> {
  console.log('\nPolling (Ctrl+C to detach — resume with --poll)...\n');

  while (true) {
    const batch = await client.messages.batches.retrieve(batchId);
    const { processing, succeeded, errored, canceled, expired } = batch.request_counts;
    const total = processing + succeeded + errored + canceled + expired;

    process.stdout.write(
      `\r  [${new Date().toLocaleTimeString()}]  ${succeeded}/${total} done` +
      (errored > 0 ? `  ${errored} errors` : '') +
      `  (${batch.processing_status})    `
    );

    if (batch.processing_status === 'ended') {
      console.log('\n');
      await saveAnthropicResults(client, batchId, topics, customIds);
      return;
    }

    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }
}

async function saveAnthropicResults(
  client: Anthropic,
  batchId: string,
  topics: string[],
  customIds: string[],
): Promise<void> {
  const idToTopic = new Map(customIds.map((id, i) => [id, topics[i]]));
  let saved = 0;
  let errors = 0;

  for await (const result of await client.messages.batches.results(batchId)) {
    const topic = idToTopic.get(result.custom_id) ?? result.custom_id;

    if (result.result.type === 'errored') {
      console.error(`  ERROR "${topic}": ${result.result.error.type}`);
      errors++;
      continue;
    }
    if (result.result.type !== 'succeeded') {
      console.error(`  SKIPPED "${topic}": ${result.result.type}`);
      continue;
    }

    const textBlock = result.result.message.content.find(b => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      console.error(`  No text content for "${topic}"`);
      errors++;
      continue;
    }

    console.log(`  Saving: ${topic}`);
    finalize(textBlock.text);
    saved++;
  }

  console.log(`\nDone: ${saved} saved, ${errors} errors`);
  if (fs.existsSync(BATCH_STATE_FILE)) fs.unlinkSync(BATCH_STATE_FILE);
}

async function pollOnly(batchId: string): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }
  const state = loadBatchState();
  const topics = state?.batchId === batchId ? state.topics : [];
  const customIds = state?.batchId === batchId ? state.customIds : [];
  const client = new Anthropic();
  await pollAndSave(client, batchId, topics, customIds);
}

async function saveOnly(batchId: string): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }
  const state = loadBatchState();
  if (!state || state.batchId !== batchId) {
    console.error(`No state for batch ${batchId}.`);
    process.exit(1);
  }
  const client = new Anthropic();
  const batch = await client.messages.batches.retrieve(batchId);
  if (batch.processing_status !== 'ended') {
    console.log(`Batch still processing (${batch.processing_status}). Try again later.`);
    process.exit(0);
  }
  await saveAnthropicResults(client, batchId, state.topics, state.customIds);
}

// ── DeepSeek parallel path ────────────────────────────────────────────────────

async function submitDeepSeekParallel(
  topics: string[],
  model: string,
  parallel: number,
  noContext: boolean,
): Promise<void> {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('Error: DEEPSEEK_API_KEY is not set.');
    process.exit(1);
  }

  const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
  });

  console.log(`\nPreparing ${topics.length} entries — DeepSeek parallel (concurrency: ${parallel})...`);

  const contextMap = noContext ? new Map<string, undefined>() : await buildContextMap(topics);

  let completed = 0;
  let errors = 0;
  const total = topics.length;

  console.log(`\nDrafting ${total} entries with ${parallel} parallel workers...\n`);

  const tasks = topics.map((topic) => async () => {
    const ctx = contextMap.get(topic);

    const completion = await client.chat.completions.create({
      model,
      max_tokens: 8192,
      stream: false,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: ENTRY_PROMPT(topic, ctx) },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? '';
    if (!text) throw new Error('Empty response');

    finalize(text);
    completed++;
    process.stdout.write(`  [${completed}/${total}] Saved: ${topic}\n`);

    // Brief delay between requests to be polite
    await new Promise(r => setTimeout(r, 300));
  });

  const results = await withConcurrency(tasks, parallel);

  for (const [i, result] of results.entries()) {
    if (result instanceof Error) {
      console.error(`  ERROR for "${topics[i]}": ${result.message}`);
      errors++;
    }
  }

  console.log(`\nDone: ${completed} saved, ${errors} errors`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

const { provider, model, parallel, topics, noContext, pollId, saveId } = parseArgs(process.argv);

console.log(`Provider: ${provider}  Model: ${model}${provider === 'deepseek' ? `  Parallel: ${parallel}` : ' (Batches API)'}`);

if (pollId) {
  await pollOnly(pollId).catch(err => { console.error('\nError:', err.message); process.exit(1); });
} else if (saveId) {
  await saveOnly(saveId).catch(err => { console.error('\nError:', err.message); process.exit(1); });
} else if (provider === 'deepseek') {
  await submitDeepSeekParallel(topics, model, parallel, noContext).catch(err => {
    console.error('\nError:', err.message);
    process.exit(1);
  });
} else {
  await submitAnthropicBatch(topics, model, noContext).catch(err => {
    console.error('\nError:', err.message);
    process.exit(1);
  });
}
