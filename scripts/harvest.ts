#!/usr/bin/env tsx
/**
 * EUR-Lex harvester — queries the CELLAR SPARQL endpoint for EU directives
 * and regulations, builds a candidate queue at data/candidates.json.
 *
 * Usage:
 *   npm run harvest                       # fetch new documents from EUR-Lex
 *   npm run harvest -- --list             # show all candidates grouped by category
 *   npm run harvest -- --list Digital     # filter list by category name
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const CANDIDATES_FILE = path.join(DATA_DIR, 'candidates.json');
const DIRECTIVES_DIR = path.join(ROOT, 'src', 'content', 'directives');

const SPARQL_ENDPOINT = 'https://publications.europa.eu/webapi/rdf/sparql';
const BATCH_SIZE = 200;
const MAX_BATCHES = 5; // up to 1 000 documents per run
const DELAY_MS = 700;  // be polite to EUR-Lex

// ── Category detection ────────────────────────────────────────────────────
// Rules are tested in order; first match wins. Distinctive categories first.

const CATEGORY_RULES: [string, RegExp][] = [
  // Sanctions: "restrictive measures" is nearly exclusive to EU sanctions law.
  // No final \b — "measures" (plural) would otherwise break the boundary.
  ['Sanctions & Foreign Policy',
    /restrictive measures?|asset freeze|arms embargo|targeted sanctions|travel ban.*council|council.*travel ban/i],

  // Trade: anti-dumping, countervailing, safeguards, competition law, customs classification
  ['Trade & Competition',
    /\b(anti.dumping|countervailing duty|countervailing measure|safeguard measure|state aid|block exemption|competition rules|merger regulation|dumping margin|trade defence|combined nomenclature|classification of certain goods|customs relief)\b/i],

  // Consumer Electronics — keep broad original terms, add specific new ones
  ['Consumer Electronics',
    /\b(electronic equipment|radio equipment|ecodesign|energy label|electromagnetic|charger|usb\b|electrical equipment|electrical appliance|household appliance|battery regulation|right to repair|telecom|consumer electronics)\b/i],

  // Environmental — broad original + new specific terms
  ['Environmental',
    /\b(waste|plastic|packaging|emission|pollut|environment|recycl|circular economy|climate|carbon|fluorinated|pfas|deforestation|biodiversity|ozone.depleting|\breach\b|rohs|hazardous substance|industrial emission|carbon border)\b/i],

  // Digital & Data — includes eIDAS implementing acts (electronic signatures, seals, archiving)
  ['Digital & Data',
    /\b(data protection|gdpr|digital market|digital service|privacy|cybersecurity|cyber.resilience|network security|\bnis\b|artificial intelligence|ai act|platform regulation|electronic commerce|information society|electronic identification|trust service|eidas|electronic signature|electronic seal|qualified electronic|electronic archiving|electronic ledger|electronic access point)\b/i],

  // Food & Agriculture — geographical indications, fisheries, pesticides, additives
  ['Food & Agriculture',
    /\b(food\b|nutrition|pesticide|plant protection|geographical indication|protected designation|protected geographical|traditional speciality|\bpdo\b|\bpgi\b|\btsg\b|fisheries|fishery|fishing|aquaculture|food additive|contaminant|novel food|animal feed|organic farming|wine designation|agricultural)\b/i],

  // Health & Safety — biocides, medicinal products, occupational safety
  // Note: no final \b on plural-sensitive terms (detergents, cosmetics, toys)
  ['Health & Safety',
    /\b(biocidal products?|biocides?|medicinal products?|pharmac|medical devices?|clinical trial|occupational health|carcinogen|cosmetics?\b|cosmetic products?|toys?\b|toy safety|detergents?|surfactants?|maximum residue|health.*safety|product safety|active substance)\b/i],

  // Financial — restore original broad terms + specific new ones
  ['Financial',
    /\b(financial|banking|insurance|payment|investment fund|capital requirement|fintech|crypto.asset|anti.money laundering|\baml\b|credit institution|securities|solvency|benchmark regulation)\b/i],

  // Transport — original broad + tachograph, type-approval, driving licence
  ['Transport',
    /\b(transport\b|vehicle|aviation|maritime|tachograph|driving licence|type.approval|motor vehicle|inland waterway|road safety|\brail\b|railway|aircraft|shipping|port service|tyre)\b/i],

  // Energy — restore original broad terms
  ['Energy',
    /\b(energy\b|electricity|natural gas|renewable|power grid|nuclear|solar|wind turbine|energy storage|energy community)\b/i],
];

function categorize(title: string): string {
  for (const [cat, re] of CATEGORY_RULES) {
    if (re.test(title)) return cat;
  }
  return 'Other';
}

// ── CELEX helpers ─────────────────────────────────────────────────────────

// 32022L2380 → "2022/2380/EU"
function celexToRef(celex: string): string {
  const m = celex.match(/^3(\d{4})[LR]0*(\d+)$/);
  return m ? `${m[1]}/${m[2]}/EU` : '';
}

function celexToType(celex: string): 'directive' | 'regulation' {
  return /^3\d{4}L/.test(celex) ? 'directive' : 'regulation';
}

// ── SPARQL ────────────────────────────────────────────────────────────────

interface SparqlBinding {
  celex?: { value: string };
  date?: { value: string };
  title?: { value: string };
}

function buildQuery(limit: number, offset: number): string {
  return `
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>

SELECT DISTINCT ?celex ?date ?title
WHERE {
  ?work cdm:resource_legal_id_celex ?celex ;
        cdm:work_date_document ?date .

  ?exp cdm:expression_belongs_to_work ?work ;
       cdm:expression_uses_language <http://publications.europa.eu/resource/authority/language/ENG> ;
       cdm:expression_title ?title .

  FILTER(REGEX(STR(?celex), "^3[0-9]{4}[LR][0-9]+$"))
  FILTER(?date >= "2000-01-01"^^<http://www.w3.org/2001/XMLSchema#date>)
}
ORDER BY DESC(?date)
LIMIT ${limit}
OFFSET ${offset}`.trim();
}

async function queryCellar(offset: number): Promise<SparqlBinding[]> {
  const res = await fetch(SPARQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json',
      'User-Agent': 'why-is-that-eu/harvester (+https://github.com)',
    },
    body: new URLSearchParams({ query: buildQuery(BATCH_SIZE, offset) }).toString(),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SPARQL ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json() as { results: { bindings: SparqlBinding[] } };
  return json.results?.bindings ?? [];
}

// ── Candidate type ────────────────────────────────────────────────────────

export interface Candidate {
  celex: string;
  type: 'directive' | 'regulation';
  directive: string;        // e.g. "2022/2380/EU"
  title: string;
  year: number;
  date: string;             // ISO YYYY-MM-DD
  category: string;
  url: string;
  drafted: boolean;
  harvestedAt: string;      // ISO YYYY-MM-DD
}

// ── I/O ───────────────────────────────────────────────────────────────────

function loadCandidates(): Candidate[] {
  if (!fs.existsSync(CANDIDATES_FILE)) return [];
  return JSON.parse(fs.readFileSync(CANDIDATES_FILE, 'utf8'));
}

function saveCandidates(list: Candidate[]): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(list, null, 2), 'utf8');
}

// Read directive refs already present in src/content/directives/*.md frontmatter
function loadDraftedRefs(): Set<string> {
  const drafted = new Set<string>();
  if (!fs.existsSync(DIRECTIVES_DIR)) return drafted;
  for (const file of fs.readdirSync(DIRECTIVES_DIR)) {
    if (!file.endsWith('.md')) continue;
    const text = fs.readFileSync(path.join(DIRECTIVES_DIR, file), 'utf8');
    const m = text.match(/^directive:\s*"?([^"\n]+)"?/m);
    if (m) drafted.add(m[1].trim());
  }
  return drafted;
}

// ── Harvest command ───────────────────────────────────────────────────────

async function runHarvest(): Promise<void> {
  const existing = loadCandidates();
  const knownCelex = new Set(existing.map(c => c.celex));
  const drafted = loadDraftedRefs();
  const today = new Date().toISOString().slice(0, 10);

  const fresh: Candidate[] = [];
  let totalFetched = 0;

  process.stdout.write('\nQuerying EUR-Lex CELLAR');

  for (let i = 0; i < MAX_BATCHES; i++) {
    let bindings: SparqlBinding[];
    try {
      bindings = await queryCellar(i * BATCH_SIZE);
    } catch (err) {
      console.error(`\nBatch ${i} failed: ${(err as Error).message}`);
      break;
    }

    totalFetched += bindings.length;
    process.stdout.write('.');

    for (const b of bindings) {
      const celex = b.celex?.value?.trim();
      const title = b.title?.value?.trim();
      const date = b.date?.value?.slice(0, 10);
      if (!celex || !title || !date) continue;
      if (knownCelex.has(celex)) continue;

      const directive = celexToRef(celex);
      fresh.push({
        celex,
        type: celexToType(celex),
        directive,
        title,
        year: parseInt(date.slice(0, 4), 10),
        date,
        category: categorize(title),
        url: `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:${celex}`,
        drafted: drafted.has(directive),
        harvestedAt: today,
      });
      knownCelex.add(celex);
    }

    if (bindings.length < BATCH_SIZE) break;
    if (i < MAX_BATCHES - 1) await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\n\nFetched ${totalFetched} records — ${fresh.length} new candidates`);

  // Mark already-drafted entries on the full merged list
  const all = [...existing, ...fresh]
    .map(c => ({ ...c, drafted: drafted.has(c.directive) }))
    .sort((a, b) => b.date.localeCompare(a.date));

  saveCandidates(all);

  if (fresh.length > 0) {
    const byCategory = new Map<string, number>();
    for (const c of fresh) byCategory.set(c.category, (byCategory.get(c.category) ?? 0) + 1);
    console.log('\nNew by category:');
    for (const [cat, n] of [...byCategory.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${cat.padEnd(26)} ${n}`);
    }
  }

  const undrafted = all.filter(c => !c.drafted).length;
  console.log(`\nQueue: ${all.length} total, ${undrafted} undrafted  →  data/candidates.json`);
}

// ── List command ──────────────────────────────────────────────────────────

function runList(filter?: string): void {
  const candidates = loadCandidates();
  if (candidates.length === 0) {
    console.log('No candidates. Run `npm run harvest` first.');
    return;
  }

  const items = filter
    ? candidates.filter(c => c.category.toLowerCase().includes(filter.toLowerCase()))
    : candidates;

  const byCategory = new Map<string, Candidate[]>();
  for (const c of items) {
    const list = byCategory.get(c.category) ?? [];
    list.push(c);
    byCategory.set(c.category, list);
  }

  for (const [cat, list] of [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const undrafted = list.filter(c => !c.drafted);
    console.log(`\n── ${cat} (${undrafted.length} undrafted / ${list.length} total)`);
    for (const c of undrafted.slice(0, 12)) {
      const ref = c.directive ? `[${c.directive}]` : '';
      console.log(`   ${c.year}  ${ref.padEnd(18)}  ${c.title.slice(0, 72)}`);
    }
    if (undrafted.length > 12) console.log(`   … and ${undrafted.length - 12} more`);
  }

  const totalUndrafted = items.filter(c => !c.drafted).length;
  console.log(`\nTotal: ${items.length} candidates, ${totalUndrafted} undrafted`);
  console.log('Tip: npm run draft -- "<title or directive ref>" to draft one');
}

// ── Entry point ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isList = args.includes('--list');
const positional = args.filter(a => !a.startsWith('--'));

if (isList) {
  runList(positional[0]);
} else {
  runHarvest().catch(err => {
    console.error('\nError:', err.message);
    process.exit(1);
  });
}
