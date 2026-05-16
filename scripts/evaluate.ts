#!/usr/bin/env tsx
/**
 * Quality evaluation for directive entries: summaries, Q&A pairs, and article sections.
 *
 * Heuristic checks run on all entries (free).
 * LLM evaluation runs on flagged/sampled entries (uses Anthropic API).
 *
 * Run:
 *   npm run evaluate                          # heuristics only, all entries
 *   npm run evaluate -- --llm                # + LLM eval on all heuristic failures
 *   npm run evaluate -- --llm --sample 20    # + LLM eval on 20 random entries
 *   npm run evaluate -- --llm --file adequate-minimum-wages-directive
 *   npm run evaluate -- --model claude-haiku-4-5-20251001 --llm --sample 50
 */

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'src', 'content', 'directives');
const DEFAULT_OUT = path.join(__dirname, '..', 'data', 'eval-report.json');

// ── types ─────────────────────────────────────────────────────────────────────

interface DirectiveEntry {
  file: string;
  slug: string;
  raw: string;
  title: string;
  directive: string;
  category: string;
  year: number;
  summary: string;
  sections: Record<string, string>;
  questions: Array<{ question: string; answer: string }>;
}

interface HeuristicFlag {
  kind: 'summary' | 'section' | 'question';
  target?: string;
  message: string;
  severity: 'warn' | 'error';
}

interface QuestionEval {
  question: string;
  relevance: number;
  specificity: number;
  issues: string[];
}

interface LLMEval {
  slug: string;
  summaryScore: number;
  summaryIssues: string[];
  whyScore: number;
  whyIssues: string[];
  questions: QuestionEval[];
  inputTokens: number;
  outputTokens: number;
}

interface EntryReport {
  slug: string;
  title: string;
  directive: string;
  category: string;
  questionCount: number;
  heuristicFlags: HeuristicFlag[];
  llmEval?: LLMEval;
}

// ── parsing ───────────────────────────────────────────────────────────────────

function field(content: string, key: string): string {
  const quoted = content.match(new RegExp(`^${key}:\\s*"([^"]+)"`, 'm'));
  if (quoted) return quoted[1];
  const bare = content.match(new RegExp(`^${key}:\\s*([^\\n"#\\[]+)`, 'm'));
  return bare?.[1]?.trim() ?? '';
}

function extractSections(raw: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = raw.split('\n');
  let current: string | null = null;
  const buf: string[] = [];

  for (const line of lines) {
    if (/^## /.test(line)) {
      if (current !== null) sections[current] = buf.join('\n').trim();
      current = line.replace(/^## /, '').trim().toLowerCase();
      buf.length = 0;
    } else if (current !== null) {
      buf.push(line);
    }
  }
  if (current !== null) sections[current] = buf.join('\n').trim();
  return sections;
}

function extractQAs(sections: Record<string, string>): Array<{ question: string; answer: string }> {
  const kq = sections['key questions answered'] ?? '';
  const lines = kq.split('\n');
  const results: Array<{ question: string; answer: string }> = [];
  let i = 0;
  while (i < lines.length) {
    if (/^### /.test(lines[i])) {
      const question = lines[i].replace(/^### /, '').trim();
      const answerLines: string[] = [];
      i++;
      while (i < lines.length && !/^### /.test(lines[i])) {
        answerLines.push(lines[i]);
        i++;
      }
      const answer = answerLines.join('\n').trim();
      if (question && answer) results.push({ question, answer });
    } else {
      i++;
    }
  }
  return results;
}

function loadEntry(file: string): DirectiveEntry {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const sections = extractSections(raw);
  return {
    file,
    slug,
    raw,
    title: field(raw, 'title'),
    directive: field(raw, 'directive'),
    category: field(raw, 'category'),
    year: parseInt(field(raw, 'year'), 10) || 0,
    summary: field(raw, 'summary'),
    sections,
    questions: extractQAs(sections),
  };
}

// ── heuristics ────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'that',
  'this', 'it', 'its', 'as', 'how', 'why', 'what', 'when', 'which', 'who', 'do', 'does',
  'did', 'not', 'no', 'so', 'if', 'about', 'any', 'new', 'eu', 'european', 'union',
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const intersection = [...a].filter(w => b.has(w)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const GENERIC_SUMMARY_PATTERNS = [
  /sets? (out |up )?rules? (for|on|about)/i,
  /provides? (a |the )?framework/i,
  /establishes? (a |the )?framework/i,
  /lays? down (rules?|requirements?)/i,
];

function runHeuristics(entry: DirectiveEntry): HeuristicFlag[] {
  const flags: HeuristicFlag[] = [];

  // Summary
  if (!entry.summary) {
    flags.push({ kind: 'summary', message: 'Missing summary', severity: 'error' });
  } else {
    if (entry.summary.length < 60) {
      flags.push({ kind: 'summary', message: `Summary very short (${entry.summary.length} chars)`, severity: 'warn' });
    }
    if (entry.summary.length > 450) {
      flags.push({ kind: 'summary', message: `Summary very long (${entry.summary.length} chars)`, severity: 'warn' });
    }
    const isGeneric = GENERIC_SUMMARY_PATTERNS.some(p => p.test(entry.summary));
    const hasSpecifics = /\d{4}|\d+\s*%|€|\b(ban|prohibit|require|mandate|cap|limit|ceiling|threshold)\b/i.test(entry.summary);
    if (isGeneric && !hasSpecifics) {
      flags.push({ kind: 'summary', message: 'Summary is generic boilerplate — lacks specific policy action or outcome', severity: 'warn' });
    }
  }

  // Sections
  const required: Array<[string, number]> = [
    ['what is it?', 80],
    ['why was it introduced?', 150],
    ['key questions answered', 0],
  ];
  for (const [section, minWords] of required) {
    const content = entry.sections[section];
    if (!content) {
      flags.push({ kind: 'section', target: section, message: `Missing section: "${section}"`, severity: 'error' });
    } else if (minWords > 0 && wordCount(content) < minWords) {
      flags.push({ kind: 'section', target: section, message: `Section "${section}" too short (${wordCount(content)} words, expected ≥ ${minWords})`, severity: 'warn' });
    }
  }

  // Questions
  if (entry.questions.length === 0) {
    flags.push({ kind: 'question', message: 'No Q&A pairs found', severity: 'error' });
  } else if (entry.questions.length < 3) {
    flags.push({ kind: 'question', message: `Only ${entry.questions.length} question(s) — aim for ≥ 3`, severity: 'warn' });
  }

  // Build a broad vocabulary from title + summary + opening of "what is it?"
  const whatOpening = (entry.sections['what is it?'] ?? '').slice(0, 300);
  const entryVocab = tokenize(`${entry.title} ${entry.summary} ${whatOpening}`);

  for (const { question, answer } of entry.questions) {
    const wc = wordCount(answer);
    if (wc < 40) {
      flags.push({ kind: 'question', target: question.slice(0, 70), message: `Answer too short (${wc} words)`, severity: 'error' });
    } else if (wc < 70) {
      flags.push({ kind: 'question', target: question.slice(0, 70), message: `Answer short (${wc} words)`, severity: 'warn' });
    }

    // Question should share at least one content word with the entry's key concepts
    const qTokens = tokenize(question);
    const overlap = [...qTokens].filter(w => entryVocab.has(w)).length;
    if (qTokens.size > 4 && overlap === 0) {
      flags.push({ kind: 'question', target: question.slice(0, 70), message: 'Question shares no key terms with entry summary/title — may be too generic', severity: 'warn' });
    }
  }

  // Near-duplicate questions within the same entry
  const tokenized = entry.questions.map(qa => ({ qa, tokens: tokenize(qa.question) }));
  for (let i = 0; i < tokenized.length; i++) {
    for (let j = i + 1; j < tokenized.length; j++) {
      const sim = jaccard(tokenized[i].tokens, tokenized[j].tokens);
      if (sim > 0.5) {
        flags.push({
          kind: 'question',
          message: `Near-duplicate questions (${(sim * 100).toFixed(0)}% overlap): "${tokenized[i].qa.question.slice(0, 50)}" ↔ "${tokenized[j].qa.question.slice(0, 50)}"`,
          severity: 'warn',
        });
      }
    }
  }

  return flags;
}

// ── LLM evaluation ────────────────────────────────────────────────────────────

const EVAL_TOOL: Anthropic.Tool = {
  name: 'record_evaluation',
  description: 'Record structured quality scores for a directive entry',
  input_schema: {
    type: 'object',
    required: ['summary_score', 'summary_issues', 'why_score', 'why_issues', 'questions'],
    properties: {
      summary_score: {
        type: 'integer',
        description: '1 = vague/generic boilerplate that could apply to any EU law; 3 = adequate but missing specifics; 5 = precise, distinctive, accurately captures this directive\'s core purpose',
      },
      summary_issues: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific issues with the summary. Empty array if none.',
      },
      why_score: {
        type: 'integer',
        description: '1 = generic/thin (no named actors, no specific events); 3 = some context but lacks depth; 5 = rich historical/political context with named actors, specific events, vote counts, and causal chain',
      },
      why_issues: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific issues with the "Why was it introduced?" section.',
      },
      questions: {
        type: 'array',
        description: 'Evaluation of each Q&A pair, in the same order as provided',
        items: {
          type: 'object',
          required: ['question', 'relevance', 'specificity', 'issues'],
          properties: {
            question: { type: 'string', description: 'Copy the question text verbatim' },
            relevance: {
              type: 'integer',
              description: '1 = answer does not address the question; 5 = answer directly and fully answers the question',
            },
            specificity: {
              type: 'integer',
              description: '1 = answer could apply to any EU law; 5 = answer is specific to this directive with concrete facts',
            },
            issues: {
              type: 'array',
              items: { type: 'string' },
              description: 'Specific issues. Empty array if none.',
            },
          },
        },
      },
    },
  },
};

async function evalEntry(entry: DirectiveEntry, client: Anthropic, model: string): Promise<LLMEval> {
  const whySection = entry.sections['why was it introduced?'] ?? '(missing)';
  const truncated = (s: string, n: number) => s.length > n ? s.slice(0, n) + '\n[truncated]' : s;

  const prompt = `You are evaluating the quality of a knowledge base entry about an EU directive.
Be strict. Generic boilerplate that could apply to any EU law scores 1–2. Content with specific named actors, concrete outcomes, and accurate details scores 4–5.

DIRECTIVE: ${entry.title} (${entry.directive || 'no number'}, ${entry.year || 'no year'}, ${entry.category})

SUMMARY (should be one precise sentence distinctive to this directive):
${entry.summary || '(missing)'}

"WHY WAS IT INTRODUCED?" SECTION (should name specific actors, events, and political dynamics):
${truncated(whySection, 1500)}

Q&A PAIRS (each answer should directly address its question with directive-specific facts):
${entry.questions.map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${truncated(qa.answer, 500)}`).join('\n\n')}

Call record_evaluation with scores and any issues found.`;

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    tools: [EVAL_TOOL],
    tool_choice: { type: 'any' },
    messages: [{ role: 'user', content: prompt }],
  });

  const toolBlock = response.content.find(b => b.type === 'tool_use');
  if (!toolBlock || toolBlock.type !== 'tool_use') throw new Error(`No tool_use in response for ${entry.slug}`);

  const inp = toolBlock.input as Record<string, unknown>;
  const questions = (inp.questions as Record<string, unknown>[]) ?? [];

  return {
    slug: entry.slug,
    summaryScore: Number(inp.summary_score),
    summaryIssues: (inp.summary_issues as string[]) ?? [],
    whyScore: Number(inp.why_score),
    whyIssues: (inp.why_issues as string[]) ?? [],
    questions: questions.map(q => ({
      question: String(q.question),
      relevance: Number(q.relevance),
      specificity: Number(q.specificity),
      issues: (q.issues as string[]) ?? [],
    })),
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  };
}

// ── CLI args ──────────────────────────────────────────────────────────────────

interface Args {
  useLLM: boolean;
  sampleSize: number | null;
  targetFile: string | null;
  model: string;
  out: string;
}

function parseArgs(argv: string[]): Args {
  const args = argv.slice(2);
  let useLLM = false;
  let sampleSize: number | null = null;
  let targetFile: string | null = null;
  let model = 'claude-haiku-4-5-20251001';
  let out = DEFAULT_OUT;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--llm') useLLM = true;
    else if (args[i] === '--sample' && args[i + 1]) sampleSize = parseInt(args[++i], 10);
    else if (args[i] === '--file' && args[i + 1]) targetFile = args[++i];
    else if (args[i] === '--model' && args[i + 1]) model = args[++i];
    else if (args[i] === '--out' && args[i + 1]) out = args[++i];
  }

  return { useLLM, sampleSize, targetFile, model, out };
}

// ── reporting ─────────────────────────────────────────────────────────────────

function printSummary(reports: EntryReport[]): void {
  const total = reports.length;
  const withErrors = reports.filter(r => r.heuristicFlags.some(f => f.severity === 'error'));
  const withWarns = reports.filter(r => r.heuristicFlags.some(f => f.severity === 'warn'));
  const withLLM = reports.filter(r => r.llmEval);

  console.log('\n══════════════════════════════════════════');
  console.log(' HEURISTIC RESULTS');
  console.log('══════════════════════════════════════════');
  console.log(`Entries checked : ${total}`);
  console.log(`With errors     : ${withErrors.length} (${pct(withErrors.length, total)}%)`);
  console.log(`With warnings   : ${withWarns.length} (${pct(withWarns.length, total)}%)`);

  // Top error types
  const flagCounts: Record<string, number> = {};
  for (const r of reports) {
    for (const f of r.heuristicFlags) {
      const key = f.message.replace(/\(\d+.*?\)/g, '(N)').slice(0, 60);
      flagCounts[key] = (flagCounts[key] ?? 0) + 1;
    }
  }
  const topFlags = Object.entries(flagCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (topFlags.length) {
    console.log('\nTop flag types:');
    for (const [msg, count] of topFlags) {
      console.log(`  ${String(count).padStart(4)}×  ${msg}`);
    }
  }

  // Worst entries (most errors)
  const worst = [...reports]
    .filter(r => r.heuristicFlags.length > 0)
    .sort((a, b) => {
      const score = (r: EntryReport) =>
        r.heuristicFlags.filter(f => f.severity === 'error').length * 3 +
        r.heuristicFlags.filter(f => f.severity === 'warn').length;
      return score(b) - score(a);
    })
    .slice(0, 10);

  if (worst.length) {
    console.log('\nWorst entries (heuristic score):');
    for (const r of worst) {
      const errors = r.heuristicFlags.filter(f => f.severity === 'error').length;
      const warns = r.heuristicFlags.filter(f => f.severity === 'warn').length;
      console.log(`  ${errors}E ${warns}W  ${r.slug}`);
    }
  }

  if (withLLM.length) {
    const evals = reports.map(r => r.llmEval).filter(Boolean) as LLMEval[];

    const avg = (vals: number[]) => vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 'N/A';
    const allSummaryScores = evals.map(e => e.summaryScore);
    const allWhyScores = evals.map(e => e.whyScore);
    const allRelevance = evals.flatMap(e => e.questions.map(q => q.relevance));
    const allSpecificity = evals.flatMap(e => e.questions.map(q => q.specificity));
    const totalIn = evals.reduce((s, e) => s + e.inputTokens, 0);
    const totalOut = evals.reduce((s, e) => s + e.outputTokens, 0);

    console.log('\n══════════════════════════════════════════');
    console.log(` LLM EVALUATION (${evals.length} entries)`);
    console.log('══════════════════════════════════════════');
    console.log(`Avg summary score      : ${avg(allSummaryScores)} / 5`);
    console.log(`Avg "why" section score: ${avg(allWhyScores)} / 5`);
    console.log(`Avg Q&A relevance      : ${avg(allRelevance)} / 5`);
    console.log(`Avg Q&A specificity    : ${avg(allSpecificity)} / 5`);
    console.log(`Tokens used            : ${totalIn} in / ${totalOut} out`);

    const lowScoring = evals
      .filter(e => e.summaryScore <= 2 || e.whyScore <= 2 || e.questions.some(q => q.relevance <= 2 || q.specificity <= 2))
      .slice(0, 10);
    if (lowScoring.length) {
      console.log('\nLow-scoring entries (LLM):');
      for (const e of lowScoring) {
        console.log(`  sum:${e.summaryScore} why:${e.whyScore}  ${e.slug}`);
        for (const issue of [...e.summaryIssues, ...e.whyIssues].slice(0, 2)) {
          console.log(`       · ${issue}`);
        }
      }
    }
  }

  console.log('\nFull report written to:', DEFAULT_OUT);
}

function pct(n: number, total: number): string {
  return total === 0 ? '0' : ((n / total) * 100).toFixed(0);
}

// ── main ──────────────────────────────────────────────────────────────────────

const args = parseArgs(process.argv);

const allFiles = fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort();
const targetFiles = args.targetFile
  ? allFiles.filter(f => f.includes(args.targetFile!))
  : allFiles;

console.log(`Loading ${targetFiles.length} entries…`);
const entries = targetFiles.map(loadEntry);

// Heuristic pass
const reports: EntryReport[] = entries.map(entry => ({
  slug: entry.slug,
  title: entry.title,
  directive: entry.directive,
  category: entry.category,
  questionCount: entry.questions.length,
  heuristicFlags: runHeuristics(entry),
}));

const errorEntries = entries.filter((_, i) => reports[i].heuristicFlags.some(f => f.severity === 'error'));
console.log(`Heuristics done. ${errorEntries.length} entries with errors, ${reports.filter(r => r.heuristicFlags.some(f => f.severity === 'warn')).length} with warnings.`);

// LLM pass
if (args.useLLM) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set — skipping LLM evaluation.');
  } else {
    const client = new Anthropic({ apiKey });

    // Decide which entries to evaluate
    let toEval: DirectiveEntry[];
    if (args.targetFile) {
      toEval = entries;
    } else if (args.sampleSize !== null) {
      // Sample from flagged entries first, then random
      const flagged = entries.filter((_, i) => reports[i].heuristicFlags.some(f => f.severity === 'error'));
      const unflagged = entries.filter((_, i) => !reports[i].heuristicFlags.some(f => f.severity === 'error'));
      const shuffled = [...unflagged].sort(() => Math.random() - 0.5);
      toEval = [...flagged, ...shuffled].slice(0, args.sampleSize);
    } else {
      // Default: evaluate all flagged entries
      toEval = errorEntries;
    }

    console.log(`\nRunning LLM eval on ${toEval.length} entries (model: ${args.model})…`);

    let done = 0;
    for (const entry of toEval) {
      process.stdout.write(`  [${String(++done).padStart(3)}/${toEval.length}] ${entry.slug.slice(0, 55)}… `);
      try {
        const result = await evalEntry(entry, client, args.model);
        const report = reports.find(r => r.slug === entry.slug);
        if (report) report.llmEval = result;
        const avgQ = result.questions.length
          ? (result.questions.reduce((s, q) => s + q.relevance + q.specificity, 0) / (result.questions.length * 2)).toFixed(1)
          : 'N/A';
        console.log(`sum:${result.summaryScore} why:${result.whyScore} q-avg:${avgQ}`);
      } catch (err) {
        console.log(`ERROR: ${(err as Error).message}`);
      }
    }
  }
}

// Output
fs.mkdirSync(path.dirname(args.out), { recursive: true });
fs.writeFileSync(args.out, JSON.stringify(reports, null, 2), 'utf8');

printSummary(reports);
