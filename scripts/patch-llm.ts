#!/usr/bin/env tsx
/**
 * One-shot script: retroactively adds llm: field to entries that predate
 * the automatic llm injection feature.
 *
 * Run once: npm run patch-llm
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'src', 'content', 'directives');

// Batch-1 entries that were drafted with Claude Opus (claude-opus-4-7)
const CLAUDE = new Set([
  'carbon-border-adjustment-mechanism-cbam.md',
  'common-charger-directive.md',
  'corporate-sustainability-reporting-directive-csrd.md',
  'directive-eu-20191937-on-the-protection-of-persons-who-repor.md',
  'directive-eu-2019904-on-the-reduction-of-the-impact-of-certa.md',
  'directive-on-common-rules-promoting-the-repair-of-goods.md',
  'directive-on-privacy-and-electronic-communications-eprivacy-.md',
  'general-data-protection-regulation.md',
  'regulation-ec-no-19072006-concerning-the-registration-evalua.md',
  'regulation-eu-20221925-on-contestable-and-fair-markets-in-th.md',
  'regulation-eu-20222554-on-digital-operational-resilience-for.md',
  'regulation-eu-20231542-concerning-batteries-and-waste-batter.md',
  'regulation-eu-20231781-establishing-a-framework-of-measures-.md',
  'regulation-eu-2023988-on-general-product-safety.md',
  'regulation-eu-20241689-laying-down-harmonised-rules-on-artif.md',
  'regulation-eu-20241991-on-nature-restoration.md',
  'regulation-eu-20242847-on-horizontal-cybersecurity-requireme.md',
  'regulation-on-markets-in-crypto-assets-mica.md',
  'regulation-on-the-making-available-on-the-union-market-and-t.md',
]);

// Batch-1 entries drafted with DeepSeek (quality comparison test)
const DEEPSEEK_BATCH1 = new Set([
  'directive-eu-20222555-on-measures-for-a-high-common-level-of.md',
  'regulation-eu-20222065-on-a-single-market-for-digital-servic.md',
]);

function injectLlm(content: string, model: string): string {
  const fmEnd = content.indexOf('\n---', 3);
  if (fmEnd === -1) return content;
  return content.slice(0, fmEnd) + `\nllm: "${model}"` + content.slice(fmEnd);
}

let patched = 0;
let skipped = 0;

for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.md'))) {
  const filepath = path.join(DIR, file);
  const content = fs.readFileSync(filepath, 'utf8');

  if (/^llm:/m.test(content)) {
    skipped++;
    continue;
  }

  let model: string;
  if (CLAUDE.has(file)) {
    model = 'claude-opus-4-7';
  } else if (DEEPSEEK_BATCH1.has(file)) {
    model = 'deepseek-chat';
  } else {
    // Batch-2 entries (all DeepSeek)
    model = 'deepseek-chat';
  }

  fs.writeFileSync(filepath, injectLlm(content, model), 'utf8');
  console.log(`  ${model.padEnd(20)} ${file}`);
  patched++;
}

console.log(`\nDone: ${patched} patched, ${skipped} already had llm field.`);
