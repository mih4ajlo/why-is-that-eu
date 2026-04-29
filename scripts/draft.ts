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

import 'dotenv/config';
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
  'Labour & Social',
  'Migration & Asylum',
  'Justice & Civil Law',
  'Governance & Institutions',
  'Sanctions & Foreign Policy',
  'Trade & Competition',
  'Transport',
  'Energy',
  'Other',
];

export const SYSTEM_PROMPT = `You are an expert on EU law, policy, and history. Your task is to write knowledge base entries explaining EU directives, regulations, and standards — with a focus on the *why*: the historical context, political motivations, economic drivers, and industry dynamics that led to each piece of legislation.

Write like a well-informed journalist covering EU policy, not a legal textbook. Be specific: name the commissioners, the companies, the incidents, the vote counts, the fines. Prefer active voice. Lead with what is surprising or consequential.

## Analytical framework for "Why was it introduced?"

Apply all four lenses:
1. **Structural tension** — what contradiction or failure in the existing system made legislation inevitable? (e.g. ETS free allowances creating windfall profits while carbon leakage continued; safe-harbour rules written for bulletin boards being applied to billion-user platforms)
2. **Coalition dynamics** — who formed the majority that got this passed and what held them together? Who opposed it, why, and how close did they come to blocking it?
3. **Timing** — why did this succeed under THIS Commission in THIS political moment? What crisis, election, court ruling, or geopolitical event broke a previous deadlock?
4. **What changed** — if earlier attempts failed or stalled, name the specific event that unblocked them.

## Attribution rules — strictly enforced

- Every statistic must name its source inline: "the Commission's 2020 impact assessment found…", "according to Eurostat…", "the EEA's 2022 State of Nature report showed…"
- Never invent a quote. If you cannot attribute a quote to a specific named person in a verifiable context, paraphrase their position instead.
- If you are uncertain about a specific number, use qualitative language: "the Commission cited rising emissions" rather than a figure you cannot verify.
- Statistics and dates from the source document provided in the prompt are reliable — use them. Statistics from training memory should be attributed with the source name; if the source is unclear, omit the number and describe the situation qualitatively.
- It is better to write "European industry warned of significant job losses" than to invent a specific figure.

## Style anti-patterns — never use these

- "concerns grew" → say who raised them, when, and in which document
- "various stakeholders" / "industry" → name specific companies, associations, or officials
- "it was recognised that" / "experts noted" → attribute to a specific actor
- "has had significant impact" → give a specific number, case, fine, or outcome
- opening "Why was it introduced?" with a generic background sentence → start with the most specific, dramatic element: a scandal, a court ruling, a political crisis, a CEO threat, an industry collapse`;

export const ENTRY_PROMPT = (topic: string, context?: string) => `Write a knowledge base entry about: "${topic}"
${context ? `
## Source documents

The following context was fetched from official EU sources. Where recitals are included, they are the Commission's own stated justification — treat statistics and causal claims from recitals as authoritative and cite them as "the regulation's preamble states…" or "recital N of the regulation notes…". For other statistics in this context, cite the named source. Do not add statistics from training memory unless you can name the source document.

<source_document>
${context}
</source_document>

` : 'No source document was fetched. Use only statistics you can attribute to a named official source (Commission report, Eurostat, EEA, etc.). If uncertain, describe qualitatively.\n\n'}
The entry must be in this EXACT format (frontmatter + markdown body):

---
title: "<full official title>"
directive: "<official number like 2022/2380/EU, or omit if not applicable>"
category: "<one of: ${CATEGORIES.join(' | ')}>"
year: <4-digit year the directive/regulation came into force>
tags: [<3-6 tags — lowercase, hyphenated, no spaces, no quotes e.g. data-protection, circular-economy>]
summary: "<one or two sentences explaining what this is and why it matters>"
status: "in-force"
related: [<directive refs of closely linked legislation, e.g. "2016/679/EU", or empty []>]
---

## What is it?

[2-3 paragraphs explaining the directive/standard in plain language]

## Why was it introduced?

[The core section. Open with the most specific, dramatic element — a court ruling, a scandal, a political crisis — not a general background sentence. Explain the history: what problem existed, who lobbied for it, what triggered EU action, what alternatives were considered. Name commissioners, companies, organisations, and incidents. Be specific about dates and amounts.]

## Timeline

[A bullet-point chronology of key events: early triggers, Commission proposal, Parliament/Council adoption, entry into force, application date, first enforcement actions]

- **YYYY** — [event]
- **YYYY** — [event]
...

## Impact and consequences

[Who was affected, how industry responded, what changed in practice. Use specific numbers: fines issued, companies affected, countries that struggled to comply.]

## Key questions answered

[2-4 questions a curious non-expert might ask, answered concisely in 2-4 sentences each.

CRITICAL RULES for question phrasing:
- Write questions around the real-world TOPIC or PROBLEM, not the legal instrument. A regular person searches "does Europe have a minimum wage?" — not "does the Adequate Minimum Wages Directive set a wage floor?".
- Never use the regulation name, directive number, or legal title in the question.
- The question must still be specific enough to stand alone — use the core concept: "EU air pollution limits", "the right to be forgotten", "the carbon border tax", "EU minimum wage rules", "AI liability in Europe".
- Phrase questions the way a curious person would naturally ask them.

  ✓ "Does every EU country have to set a minimum wage?"
  ✓ "Why does EU law allow cities to keep polluting for years after setting emission limits?"
  ✓ "Can someone sue an AI company for damages in the EU?"
  ✓ "Why did European data protection rules take so long to pass?"
  ✗ "Does the Adequate Minimum Wages Directive set a specific wage floor?" (names the regulation)
  ✗ "Why did the directive take three years to pass?" (too generic)
]

### [Plain-language question about the real-world topic]?

[Answer]

### [Plain-language question about the real-world topic]?

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
  let providerSet = false;
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
      providerSet = true;
    } else if (args[i] === '--model' && args[i + 1]) {
      model = args[++i];
    } else if (args[i] === '--no-context') {
      noContext = true;
    } else {
      topicParts.push(args[i]);
    }
  }

  // npm/PowerShell can strip flag names and pass only values.
  // Recover provider if the first positional token is a valid provider.
  if (!providerSet && topicParts.length > 0 && (topicParts[0] === 'anthropic' || topicParts[0] === 'deepseek')) {
    provider = topicParts.shift() as Provider;
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

export function lookupCandidate(topic: string): CandidateRef | null {
  if (!fs.existsSync(CANDIDATES_FILE)) return null;

  const candidates: Array<{ celex: string; directive: string; title: string }> =
    JSON.parse(fs.readFileSync(CANDIDATES_FILE, 'utf8'));

  const needle = topic.trim().toLowerCase();

  // 1. Directive/regulation ref (supports refs embedded in longer topic text):
  //    "2022/2380/EU", "2002/584/JHA", "92/85/EEC", "2009/138/EC".
  //    Prefer the longest match in case multiple refs appear.
  const directiveMatches = topic.match(/\b\d{2,4}\/\d{1,4}\/[A-Za-z]{2,5}\b/g);
  if (directiveMatches?.length) {
    const normalized = directiveMatches
      .map(s => s.toLowerCase())
      .sort((a, b) => b.length - a.length);
    const hit = candidates.find(c => {
      const d = c.directive?.toLowerCase();
      return d ? normalized.includes(d) : false;
    });
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

  // Also query for related Commission preparatory documents (impact assessments, proposals)
  const relQuery = `
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
SELECT DISTINCT ?relCelex ?relTitle WHERE {
  ?mainWork cdm:resource_legal_id_celex ?mc . FILTER(STR(?mc) = "${celex}")
  { ?mainWork cdm:work_cites ?rel . } UNION { ?rel cdm:work_cites ?mainWork . }
  ?rel cdm:resource_legal_id_celex ?relCelex .
  FILTER(REGEX(STR(?relCelex), "^5[0-9]"))
  OPTIONAL {
    ?relExp cdm:expression_belongs_to_work ?rel ;
            cdm:expression_uses_language <http://publications.europa.eu/resource/authority/language/ENG> ;
            cdm:expression_title ?relTitle .
  }
} LIMIT 10`.trim();

  let relDocs: string[] = [];
  try {
    const relRes = await fetch('https://publications.europa.eu/webapi/rdf/sparql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/sparql-results+json' },
      body: new URLSearchParams({ query: relQuery }).toString(),
      signal: AbortSignal.timeout(10_000),
    });
    if (relRes.ok) {
      const relJson = await relRes.json() as { results: { bindings: Record<string, { value: string }>[] } };
      relDocs = (relJson.results?.bindings ?? []).map(b => {
        const c = b.relCelex?.value ?? '';
        const t = b.relTitle?.value ?? '';
        return t ? `${c} — ${t.slice(0, 80)}` : c;
      }).filter(Boolean);
    }
  } catch { /* ignore */ }

  const lines = [
    `OFFICIAL METADATA (EUR-Lex CELLAR):`,
    `Title: ${title}`,
    `CELEX: ${celex}`,
    `Date: ${date}`,
    subjects.length  ? `EUROVOC subjects: ${subjects.join('; ')}` : '',
    bases.length     ? `Legal basis: ${bases.join(', ')}` : '',
    amends.length    ? `Amends: ${amends.join(', ')}` : '',
    relDocs.length   ? `Related Commission docs (impact assessments, proposals):\n  ${relDocs.join('\n  ')}` : '',
    `EUR-Lex URL: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:${celex}`,
  ].filter(Boolean);

  return lines.join('\n');
}

// ── Source 2: EUR-Lex recitals ────────────────────────────────────────────────
// The preamble recitals explicitly state the Commission's justification and
// often cite the statistical evidence used to motivate the legislation.

async function fetchEurlexRecitals(celex: string): Promise<string> {
  const url = `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:${celex}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!res.ok) return '';

  const buf = await res.arrayBuffer();
  if (buf.byteLength < 5000) return ''; // WAF challenge page is small

  const html = new TextDecoder().decode(buf);

  // Strip scripts, styles, then all tags; normalise whitespace and entities
  const plain = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ').trim();

  // Recitals follow "Whereas:" and precede the operative articles
  const whereIdx = plain.indexOf('Whereas:');
  if (whereIdx < 0) return '';
  const articleIdx = plain.indexOf('Article 1', whereIdx);
  const recText = plain.slice(whereIdx, articleIdx > 0 ? articleIdx : whereIdx + 12_000);

  // Cap to keep context manageable — first ~6 000 chars covers ~15 recitals
  return `EUR-LEX RECITALS (official preamble — cite as "the regulation's preamble states" or "recital N notes"):\n${recText.slice(0, 6_000)}`;
}

// ── Source 3: Wikipedia extract ───────────────────────────────────────────────

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

export async function fetchContext(celex: string, title: string): Promise<string | undefined> {
  process.stdout.write(`Fetching context for ${celex}...\n`);

  const [metadata, recitals, wiki] = await Promise.all([
    fetchCellarMetadata(celex).catch(() => ''),
    fetchEurlexRecitals(celex).catch(() => ''),
    fetchWikipediaExtract(title).catch(() => ''),
  ]);

  const parts = [metadata, recitals, wiki].filter(Boolean);
  if (parts.length === 0) return undefined;

  const context = parts.join('\n\n---\n\n');
  const sources = [metadata && 'CELLAR', recitals && 'EUR-Lex recitals', wiki && 'Wikipedia']
    .filter(Boolean).join(' + ');
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
  const match = content.match(/^---[\s\S]*?title:\s*"([^"]+)"/m)
    ?? content.match(/^---[\s\S]*?title:\s*([^\n"#]+)/m);
  return match?.[1]?.trim() ?? 'untitled';
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
  finalize(fullContent, model);
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
  finalize(fullContent, model);
}

export function finalize(fullContent: string, model?: string): void {
  const fmStart = fullContent.indexOf('---');
  if (fmStart === -1) {
    throw new Error('Generated content does not contain valid frontmatter.');
  }
  let content = fullContent.slice(fmStart);
  const fmEndIdx = content.indexOf('\n---', 3);
  if (fmEndIdx === -1) {
    throw new Error('Frontmatter block is not closed (missing closing ---).');
  }
  const fm = content.slice(0, fmEndIdx);
  const nullFields = [...fm.matchAll(/^(\w+):\s*$/gm)].map(m => m[1]);
  if (nullFields.length) {
    throw new Error(`Frontmatter has null/empty required fields: ${nullFields.join(', ')}`);
  }
  if (model) {
    content = content.slice(0, fmEndIdx) + `\nllm: "${model}"` + content.slice(fmEndIdx);
  }
  save(content);
}

// ── Main (only runs when invoked directly, not when imported) ─────────────────

const isMain = process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/draft.ts') ||
               process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/draft.js');

if (isMain) {
  const { provider, model, topic, noContext } = parseArgs(process.argv);

  if (!topic) {
    console.error('Usage: npm run draft -- [--provider anthropic|deepseek] [--model <model>] [--no-context] "topic"');
    process.exit(1);
  }

  console.log(`\nDrafting entry for: "${topic}"`);
  console.log(`Provider: ${provider}  Model: ${model}`);

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
}
