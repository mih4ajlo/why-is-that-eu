#!/usr/bin/env tsx
/**
 * Extracts "Key questions answered" Q&A pairs from all directive entries
 * and writes data/questions.json.
 *
 * Run: npm run extract-questions
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'src', 'content', 'directives');
const OUT = path.join(__dirname, '..', 'data', 'questions.json');

export interface QuestionEntry {
  question: string;
  answer: string;      // raw markdown paragraph(s)
  slug: string;
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

function extractQuestions(raw: string, slug: string): QuestionEntry[] {
  const title    = field(raw, 'title');
  const directive = field(raw, 'directive');
  const category = field(raw, 'category');
  const year     = parseInt(field(raw, 'year'), 10) || 0;

  const lines = raw.split('\n');

  // Find section boundaries
  const sectionStart = lines.findIndex(l => /^## key questions answered/i.test(l));
  if (sectionStart === -1) return [];

  let sectionEnd = lines.length;
  for (let i = sectionStart + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) { sectionEnd = i; break; }
  }

  const section = lines.slice(sectionStart + 1, sectionEnd);
  const results: QuestionEntry[] = [];

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

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort();
const all: QuestionEntry[] = [];
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
    all.push(...qs);
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(all, null, 2), 'utf8');

console.log(`\n${all.length} questions from ${files.length - missing}/${files.length} entries → ${path.relative(process.cwd(), OUT)}`);
if (missing) console.log(`${missing} entries had no "Key questions answered" section.`);
