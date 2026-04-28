#!/usr/bin/env tsx
/**
 * Rewrites context-free question headings in all directive entries to include
 * the regulation name, making each question self-contained.
 *
 * Run: npm run rewrite-questions
 * Flags: --dry-run  (print changes without writing)
 *        --file <slug>  (process a single file)
 */
import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'src', 'content', 'directives');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FILE_ARG = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

function field(content: string, key: string): string {
  const quoted = content.match(new RegExp(`^${key}:\\s*"([^"]+)"`, 'm'));
  if (quoted) return quoted[1];
  const bare = content.match(new RegExp(`^${key}:\\s*([^\\n"#\\[]+)`, 'm'));
  return bare?.[1]?.trim() ?? '';
}

async function rewriteQuestions(title: string, questions: string[]): Promise<string[]> {
  const prompt = `The following are question headings from a knowledge base article about: "${title}".

Rewrite each question so a regular person can understand it without knowing the regulation name. The question should describe the real-world topic or problem — not the legal instrument.

Rules:
- NEVER use the regulation name, directive title, or its number in the question.
- Replace legal names with plain-language concepts: "EU air pollution limits", "the right to be forgotten", "EU minimum wage rules", "the carbon border tax", "AI liability in Europe", etc.
- The question must still be specific enough to stand alone — use the core concept the regulation addresses.
- If a question already describes the real-world topic without naming the regulation, return it unchanged.
- Phrase questions the way a curious non-expert would naturally ask them.
- Keep each question concise and natural.
- Return ONLY the rewritten questions, one per line, numbered the same way as input.

Examples:
  "Does the Adequate Minimum Wages Directive set a wage floor?" → "Does every EU country have to set a minimum wage?"
  "Why did the Air Quality Directive (2008/50/EC) fail to solve Europe's air pollution problem?" → "Why do EU air quality rules allow cities to keep polluting years after setting emission limits?"
  "Why did ATAD not harmonise corporate tax rates across the EU?" → "Why didn't EU anti-tax-avoidance rules also harmonise corporate tax rates?"

Questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;

  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
    max_tokens: 600,
  });

  const text = response.choices[0].message.content ?? '';
  const lines = text
    .split('\n')
    .map(l => l.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);

  if (lines.length !== questions.length) {
    console.warn(`    [warn] expected ${questions.length} rewrites, got ${lines.length} — skipping file`);
    return questions;
  }

  return lines;
}

const allFiles = fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort();
const files = FILE_ARG
  ? allFiles.filter(f => f.includes(FILE_ARG))
  : allFiles;

if (files.length === 0) {
  console.error('No files matched.'); process.exit(1);
}

console.log(`Processing ${files.length} file(s)${DRY_RUN ? ' [DRY RUN]' : ''}…\n`);

let changedFiles = 0;
let changedQuestions = 0;

for (const file of files) {
  const filepath = path.join(DIR, file);
  const raw = fs.readFileSync(filepath, 'utf8');
  const title = field(raw, 'title');

  const lines = raw.split('\n');
  const sectionStart = lines.findIndex(l => /^## key questions answered/i.test(l));
  if (sectionStart === -1) { console.log(`  skip (no section): ${file}`); continue; }

  const questionIndices: number[] = [];
  const questions: string[] = [];
  for (let i = sectionStart + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) break;
    if (/^### /.test(lines[i])) {
      questionIndices.push(i);
      questions.push(lines[i].replace(/^### /, '').trim());
    }
  }

  if (questions.length === 0) { console.log(`  skip (no questions): ${file}`); continue; }

  const rewritten = await rewriteQuestions(title, questions);

  let fileChanged = false;
  for (let i = 0; i < questionIndices.length; i++) {
    const orig = questions[i];
    const next = rewritten[i];
    if (next && next !== orig) {
      console.log(`  ${file}`);
      console.log(`    - "${orig}"`);
      console.log(`    + "${next}"`);
      lines[questionIndices[i]] = `### ${next}`;
      fileChanged = true;
      changedQuestions++;
    }
  }

  if (fileChanged) {
    if (!DRY_RUN) fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
    changedFiles++;
  } else {
    console.log(`  ok: ${file}`);
  }
}

console.log(`\nDone. ${changedQuestions} questions rewritten across ${changedFiles} files.`);
if (DRY_RUN) console.log('(dry run — no files written)');
else if (changedFiles > 0) console.log('Run `npm run extract-questions` to rebuild data/questions.json.');
