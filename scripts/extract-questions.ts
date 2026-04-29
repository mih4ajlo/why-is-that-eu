#!/usr/bin/env tsx
/**
 * Extracts "Key questions answered" Q&A pairs from all directive entries
 * and writes data/questions.json.
 *
 * Run: npm run extract-questions
 *      npm run extract-questions -- --topics-file data/topics-batch-7.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'src', 'content', 'directives');
const OUT = path.join(__dirname, '..', 'data', 'questions.json');
const ROOT = path.join(__dirname, '..');

export interface QuestionEntry {
  id: string;          // URL slug for the individual question page
  question: string;
  answer: string;      // raw markdown paragraph(s)
  slug: string;        // parent directive entry slug
  title: string;
  directive: string;
  category: string;
  year: number;
}

function field(content: string, key: string): string {
  const quoted = content.match(new RegExp(`^${key}:\\s*"([^"]+)"`, 'm'));
  if (quoted) return quoted[1];
  const bare = content.match(new RegExp(`^${key}:\\s*([^\\n"#\\[]+)`, 'm'));
  return bare?.[1]?.trim() ?? '';
}

function parseArgs(argv: string[]): { topicsFile: string | null } {
  const args = argv.slice(2);
  let topicsFile: string | null = null;
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--topics-file' && args[i + 1]) {
      topicsFile = args[++i];
    } else if (!args[i].startsWith('--')) {
      positional.push(args[i]);
    }
  }

  // npm/PowerShell can strip flag names and pass only values.
  if (!topicsFile && positional.length > 0 && /\.json$/i.test(positional[0])) {
    topicsFile = positional[0];
  }

  return { topicsFile };
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function topicRef(topic: string): string | null {
  const m = topic.match(/\b\d{2,4}\/\d{1,4}\/[A-Za-z]{2,5}\b/);
  return m ? m[0].toUpperCase() : null;
}

function topicTitleHint(topic: string): string {
  // "Data Act (2023/2854/EU) — ..." -> "Data Act"
  const trimmed = topic.split('—')[0].trim();
  const noParens = trimmed.replace(/\([^)]*\)/g, '').trim();
  return normalize(noParens);
}

function toId(question: string): string {
  return question
    .toLowerCase()
    .replace(/\?$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function extractQuestions(raw: string, slug: string): Omit<QuestionEntry, 'id'>[] {
  const title     = field(raw, 'title');
  const directive = field(raw, 'directive');
  const category  = field(raw, 'category');
  const year      = parseInt(field(raw, 'year'), 10) || 0;

  const lines = raw.split('\n');

  const sectionStart = lines.findIndex(l => /^## key questions answered/i.test(l));
  if (sectionStart === -1) return [];

  let sectionEnd = lines.length;
  for (let i = sectionStart + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) { sectionEnd = i; break; }
  }

  const section = lines.slice(sectionStart + 1, sectionEnd);
  const results: Omit<QuestionEntry, 'id'>[] = [];

  let i = 0;
  while (i < section.length) {
    if (/^### /.test(section[i])) {
      const question = section[i].replace(/^### /, '').trim();
      const answerLines: string[] = [];
      i++;
      while (i < section.length && !/^### /.test(section[i])) {
        answerLines.push(section[i]);
        i++;
      }
      const answer = answerLines.join('\n').trim();
      if (question) results.push({ question, answer, slug, title, directive, category, year });
    } else {
      i++;
    }
  }

  return results;
}

// ── main ──────────────────────────────────────────────────────────────────────

const { topicsFile } = parseArgs(process.argv);
const allFiles = fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort();
let files = allFiles;

if (topicsFile) {
  const topicsPath = path.resolve(ROOT, topicsFile);
  const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8')) as string[];
  const refs = new Set(topics.map(topicRef).filter(Boolean));
  const hints = topics.map(topicTitleHint).filter(Boolean);

  files = allFiles.filter((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
    const directive = field(raw, 'directive').toUpperCase();
    const titleNorm = normalize(field(raw, 'title'));

    if (directive && refs.has(directive)) return true;
    return hints.some(h => h.length >= 8 && titleNorm.includes(h));
  });

  console.log(`Filtering by topics file: ${topicsFile}`);
  console.log(`Matched ${files.length}/${allFiles.length} directive files.\n`);
}

const all: QuestionEntry[] = [];
const seen = new Map<string, number>();
let missing = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw  = fs.readFileSync(path.join(DIR, file), 'utf8');
  const qs   = extractQuestions(raw, slug);
  if (qs.length === 0) {
    console.warn(`  [warn] no questions: ${file}`);
    missing++;
  } else {
    console.log(`  ${String(qs.length).padStart(2)} q  ${file}`);
    for (const q of qs) {
      const base = toId(q.question);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = n === 0 ? base : `${base}-${n + 1}`;
      all.push({ id, ...q });
    }
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(all, null, 2), 'utf8');

console.log(`\n${all.length} questions from ${files.length - missing}/${files.length} entries → ${path.relative(process.cwd(), OUT)}`);
if (missing) console.log(`${missing} entries had no "Key questions answered" section.`);
