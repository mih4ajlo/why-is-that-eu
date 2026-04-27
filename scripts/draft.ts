#!/usr/bin/env tsx
/**
 * AI-assisted entry drafter for why-is-that-eu.
 *
 * Usage:
 *   npm run draft -- "USB-C charger directive"
 *   npm run draft -- "2022/2380/EU"
 *   npm run draft -- --provider deepseek "GDPR"
 *   npm run draft -- --provider deepseek --model deepseek-reasoner "Single-use plastics"
 *   npm run draft -- --no-context "topic"    # skip EUR-Lex context fetch
 */

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIRECTIVES_DIR = path.join(__dirname, '..', 'src', 'content', 'directives');
const CANDIDATES_FILE = path.join(__dirname, '..', 'data', 'candidates.json');

const CATEGORIES = [
  'Consumer Electronics',
  'Environmental',
  'Digital & Data',
  'Food & Agriculture',
  'Health & Safety',
  'Financial',
  'Sanctions & Foreign Policy',
  'Trade & Competition',
  'Transport',
  'Energy',
  'Other',
];

const SYSTEM_PROMPT = `You are an expert on EU law, policy, and history. Your task is to write knowledge base entries explaining EU directives, regulations, and standards — with a focus on the *why*: the historical context, political motivations, economic drivers, and industry dynamics that led to each piece of legislation.

Entries should be accurate, well-structured, and accessible to a general audience. Always explain things from first principles — assume the reader asks "but why?".`;

const ENTRY_PROMPT = (topic: string, context?: string) => `Write a knowledge base entry about: "${topic}"
${context ? `
## Official EUR-Lex source document

Use the following official text as your primary factual source. The recitals (numbered paragraphs in the preamble) explicitly state the legislative intent — lean on them heavily for the "Why was it introduced?" section. Verify all dates, regulation numbers, and causal claims against this text.

<source_document>
${context}
</source_document>

` : ''}
The entry must be in this EXACT format (frontmatter + markdown body):

---
title: "<full official title>"
directive: "<official number like 2022/2380/EU, or omit if not applicable>"
category: "<one of: ${CATEGORIES.join(' | ')}>"
year: <4-digit year the directive/regulation came into force>
tags: [<3-6 lowercase tags>]
summary: "<one or two sentences explaining what this is and why it matters>"
status: "in-force"
---

## What is it?

[2-3 paragraphs explaining the directive/standard in plain language]

## Why was it introduced?

[The core section. Explain the history: what problem existed, who lobbied for it, what triggered EU action, what alternatives were considered. Be specific about dates, companies, incidents, and political dynamics.]

## Timeline

[A bullet-point chronology of key events, from early concerns to adoption to implementation]

- **YYYY** — [event]
- **YYYY** — [event]
...

## Impact and consequences

[Who was affected, how industry responded, what changed in practice]

## Key questions answered

[2-4 specific "why" questions people commonly ask, answered concisely]

**Why [specific question]?**
[Answer]

**Why [specific question]?**
[Answer]

## Official sources

- [Official EU source title](URL)

---

Write only the entry. No preamble, no commentary. Start directly with the frontmatter \`---\`.`;

// ── Argument parsing ──────────────────────────────────────────────────────────

type Provider = 'anthropic' | 'deepseek';

const DEFAULTS: Record<Provider, string> = {
  anthropic: 'claude-opus-4-7',
  deepseek: 'deepseek-chat',
};

function parseArgs(argv: string[]): { provider: Provider; model: string; topic: string; noContext: boolean } {
  const args = argv.slice(2);
  let provider: Provider = 'anthropic';
  let model: string | null = null;
  let noContext = false;
  const topicParts: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' && args[i + 1]) {
      const p = args[++i];
      if (p !== 'anthropic' && p !== 'deepseek') {
        console.error(`Unknown provider "${p}". Valid options: anthropic, deepseek`);
        process.exit(1);
      }
      provider = p;
    } else if (args[i] === '--model' && args[i + 1]) {
      model = args[++i];
    } else if (args[i] === '--no-context') {
      noContext = true;
    } else {
      topicParts.push(args[i]);
    }
  }

  return {
    provider,
    model: model ?? DEFAULTS[provider],
    topic: topicParts.join(' ').trim(),
    noContext,
  };
}

// ── Context injection ─────────────────────────────────────────────────────────
// EUR-Lex HTML is WAF-blocked. We build context from two accessible sources:
//   1. CELLAR SPARQL  — metadata: EUROVOC tags, legal basis, related acts, dates
//   2. Wikipedia API  — prose summary when an article exists for this directive

interface CandidateRef { celex: string; title: string }

function lookupCandidate(topic: string): CandidateRef | null {
  if (!fs.existsSync(CANDIDATES_FILE)) return null;

  const candidates: Array<{ celex: string; directive: string; title: string }> =
    JSON.parse(fs.readFileSync(CANDIDATES_FILE, 'utf8'));

  const needle = topic.trim().toLowerCase();

  // 1. Exact directive ref: "2022/2380/EU"
  if (/^\d{4}\/\d+\/eu$/i.test(topic)) {
    const hit = candidates.find(c => c.directive?.toLowerCase() === needle);
    if (hit) return { celex: hit.celex, title: hit.title };
  }

  // 2. CELEX number: "32022L2380"
  if (/^3\d{4}[lr]\d+$/i.test(topic)) {
    const hit = candidates.find(c => c.celex.toLowerCase() === needle);
    if (hit) return { celex: hit.celex, title: hit.title };
  }

  // 3. Title substring — shortest (most specific) match wins
  const hits = candidates.filter(c => c.title.toLowerCase().includes(needle));
  if (hits.length > 0) {
    hits.sort((a, b) => a.title.length - b.title.length);
    return { celex: hits[0].celex, title: hits[0].title };
  }

  return null;
}

// ── Source 1: CELLAR SPARQL metadata ─────────────────────────────────────────

async function fetchCellarMetadata(celex: string): Promise<string> {
  const query = `
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT DISTINCT ?title ?date ?type ?subject ?basisCelex ?amendsCelex
WHERE {
  ?work cdm:resource_legal_id_celex ?c .
  FILTER(STR(?c) = "${celex}")

  ?work cdm:work_date_document ?date .

  OPTIONAL { ?work a ?type . }

  OPTIONAL {
    ?exp cdm:expression_belongs_to_work ?work ;
         cdm:expression_uses_language <http://publications.europa.eu/resource/authority/language/ENG> ;
         cdm:expression_title ?title .
  }
  OPTIONAL {
    ?work cdm:work_is_about_concept_eurovoc ?concept .
    ?concept skos:prefLabel ?subject .
    FILTER(LANG(?subject) = "en")
  }
  OPTIONAL {
    ?work cdm:resource_legal_basis_concept ?basis .
    ?basis cdm:resource_legal_id_celex ?basisCelex .
  }
  OPTIONAL {
    ?work cdm:work_amends ?amended .
    ?amended cdm:resource_legal_id_celex ?amendsCelex .
  }
}
LIMIT 60`.trim();

  const res = await fetch('https://publications.europa.eu/webapi/rdf/sparql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json',
    },
    body: new URLSearchParams({ query }).toString(),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) return '';

  const json = await res.json() as { results: { bindings: Record<string, { value: string }>[] } };
  const bindings = json.results?.bindings ?? [];
  if (bindings.length === 0) return '';

  const first = bindings[0];
  const title = first.title?.value ?? '';
  const date = first.date?.value?.slice(0, 10) ?? '';

  const subjects = [...new Set(bindings.map(b => b.subject?.value).filter(Boolean))];
  const bases = [...new Set(bindings.map(b => b.basisCelex?.value).filter(Boolean))];
  const amends = [...new Set(bindings.map(b => b.amendsCelex?.value).filter(Boolean))];

  const lines = [
    `OFFICIAL METADATA (EUR-Lex CELLAR):`,
    `Title: ${title}`,
    `CELEX: ${celex}`,
    `Date: ${date}`,
    subjects.length  ? `EUROVOC subjects: ${subjects.join('; ')}` : '',
    bases.length     ? `Legal basis: ${bases.join(', ')}` : '',
    amends.length    ? `Amends: ${amends.join(', ')}` : '',
    `EUR-Lex URL: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:${celex}`,
  ].filter(Boolean);

  return lines.join('\n');
}

// ── Source 2: Wikipedia extract ───────────────────────────────────────────────

async function fetchWikipediaExtract(query: string): Promise<string> {
  // Search Wikipedia for the most relevant article
  const searchUrl = `https://en.wikipedia.org/w/api.php?` + new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: '3',
    format: 'json',
    origin: '*',
  });

  const searchRes = await fetch(searchUrl, {
    headers: { 'User-Agent': 'why-is-that-eu/draft (+https://github.com)' },
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!searchRes?.ok) return '';

  const searchJson = await searchRes.json() as {
    query: { search: Array<{ title: string; snippet: string }> }
  };
  const hits = searchJson.query?.search ?? [];
  if (hits.length === 0) return '';

  const articleTitle = hits[0].title;

  // Fetch the intro extract of that article
  const extractUrl = `https://en.wikipedia.org/w/api.php?` + new URLSearchParams({
    action: 'query',
    prop: 'extracts',
    exintro: 'true',
    explaintext: 'true',
    titles: articleTitle,
    format: 'json',
    origin: '*',
  });

  const extractRes = await fetch(extractUrl, {
    headers: { 'User-Agent': 'why-is-that-eu/draft (+https://github.com)' },
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!extractRes?.ok) return '';

  const extractJson = await extractRes.json() as {
    query: { pages: Record<string, { extract?: string }> }
  };
  const pages = extractJson.query?.pages ?? {};
  const extract = Object.values(pages)[0]?.extract ?? '';

  if (!extract || extract.length < 100) return '';

  return `WIKIPEDIA — "${articleTitle}":\n${extract.slice(0, 4_000)}`;
}

// ── Combined context fetch ────────────────────────────────────────────────────

async function fetchContext(celex: string, title: string): Promise<string | undefined> {
  process.stdout.write(`Fetching context for ${celex}...\n`);

  const [metadata, wiki] = await Promise.all([
    fetchCellarMetadata(celex).catch(() => ''),
    fetchWikipediaExtract(title).catch(() => ''),
  ]);

  const parts = [metadata, wiki].filter(Boolean);
  if (parts.length === 0) return undefined;

  const context = parts.join('\n\n---\n\n');
  const sources = [metadata && 'CELLAR', wiki && 'Wikipedia'].filter(Boolean).join(' + ');
  process.stdout.write(`  Context sources: ${sources} (${(context.length / 1000).toFixed(1)}k chars)\n`);
  return context;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function extractTitle(content: string): string {
  const match = content.match(/^---[\s\S]*?title:\s*"([^"]+)"/m);
  return match?.[1] ?? 'untitled';
}

function save(content: string): void {
  const title = extractTitle(content);
  const slug = slugify(title);
  const filename = `${slug}.md`;
  const filepath = path.join(DIRECTIVES_DIR, filename);

  if (!fs.existsSync(DIRECTIVES_DIR)) {
    fs.mkdirSync(DIRECTIVES_DIR, { recursive: true });
  }

  if (fs.existsSync(filepath)) {
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
    const backupPath = filepath.replace('.md', `-${ts}.md`);
    fs.renameSync(filepath, backupPath);
    console.log(`\nExisting file backed up to: ${path.basename(backupPath)}`);
  }

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`\nSaved to: src/content/directives/${filename}`);
  console.log('Run `npm run dev` to preview.\n');
}

// ── Providers ─────────────────────────────────────────────────────────────────

async function draftWithAnthropic(topic: string, model: string, context?: string): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }

  const client = new Anthropic();
  let fullContent = '';

  const stream = client.messages.stream({
    model,
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: ENTRY_PROMPT(topic, context) }],
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);
      fullContent += event.delta.text;
    }
  }

  console.log('\n' + '─'.repeat(50));
  finalize(fullContent);
}

async function draftWithDeepSeek(topic: string, model: string, context?: string): Promise<void> {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('Error: DEEPSEEK_API_KEY is not set.');
    process.exit(1);
  }

  const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
  });

  let fullContent = '';

  const stream = await client.chat.completions.create({
    model,
    max_tokens: 8192,
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: ENTRY_PROMPT(topic, context) },
    ],
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? '';
    if (text) {
      process.stdout.write(text);
      fullContent += text;
    }
  }

  console.log('\n' + '─'.repeat(50));
  finalize(fullContent);
}

function finalize(fullContent: string): void {
  const fmStart = fullContent.indexOf('---');
  if (fmStart === -1) {
    console.error('\nError: Generated content does not contain valid frontmatter.');
    process.exit(1);
  }
  save(fullContent.slice(fmStart));
}

// ── Main ──────────────────────────────────────────────────────────────────────

const { provider, model, topic, noContext } = parseArgs(process.argv);

if (!topic) {
  console.error('Usage: npm run draft -- [--provider anthropic|deepseek] [--model <model>] [--no-context] "topic"');
  process.exit(1);
}

console.log(`\nDrafting entry for: "${topic}"`);
console.log(`Provider: ${provider}  Model: ${model}`);

// Context injection: look up candidate, then fetch CELLAR metadata + Wikipedia
let context: string | undefined;
if (!noContext) {
  const candidate = lookupCandidate(topic);
  if (candidate) {
    console.log(`Matched: ${candidate.title.slice(0, 70)}…`);
    context = await fetchContext(candidate.celex, candidate.title);
  } else {
    console.log('No candidate match — drafting from model knowledge only.');
  }
}

console.log('─'.repeat(50));

const run = provider === 'deepseek' ? draftWithDeepSeek : draftWithAnthropic;
run(topic, model, context).catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
