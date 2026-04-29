# Why Is That, EU?

A static knowledge base explaining the **history and reasoning** behind EU directives and regulations — why they exist, what triggered them, and who pushed for them.

**Live site:** https://mih4ajlo.github.io/why-is-that-eu/

---

## What it is

121+ entries covering landmark EU legislation across Digital & Data, Environment & Climate, Financial Services, Labor & Social, Agriculture, Transport, Consumer Protection, and more. Each entry answers:

- **What is it?** — plain-language summary of what the law actually does
- **Why was it introduced?** — the political triggers, crises, and coalitions behind it
- **Timeline** — key dates from the first proposal to enforcement
- **Impact and consequences** — effects on businesses, citizens, and regulators
- **Key questions answered** — the "why" questions a curious person would actually ask

---

## Tech stack

| Layer | Tool |
|---|---|
| Site framework | [Astro](https://astro.build) (static output) |
| Full-text search | [Pagefind](https://pagefind.app) (client-side, zero backend) |
| Content | Markdown with YAML frontmatter, Astro content collections |
| Hosting | GitHub Pages via Actions |
| AI drafting | Anthropic Claude (Batches API) + DeepSeek (parallel) |

---

## Project structure

```
src/
  content/
    config.ts              # Zod schema for directive entries
    directives/            # 121+ .md entry files
  layouts/
    Layout.astro           # Shared HTML shell, OG tags
  pages/
    index.astro            # Homepage with category filter
    search.astro           # Pagefind-powered full-text search
    directives/[slug].astro  # Entry detail page with related links

scripts/
  draft.ts                 # Single-entry AI drafting (Anthropic or DeepSeek)
  batch-draft.ts           # Batch/parallel drafting for many topics at once
  harvest.ts               # Harvests candidate laws from EUR-Lex SPARQL
  extract-questions.ts     # Builds data/questions.json from directive entries
  rewrite-questions.ts     # Rewrites question headings for clarity/consistency

data/
  candidates.json          # Harvested EUR-Lex entries (gitignored output)
  topics-batch-2.json      # Topic list used for the 100-entry batch

public/
  favicon.svg
  robots.txt
```

---

## Local development

```bash
npm install
npm run dev        # start dev server at localhost:4321
npm run build      # build + generate Pagefind index
npm run preview    # preview the built site
```

---

## Drafting new entries

Copy `.env.example` to `.env` and add your API keys:

```
ANTHROPIC_API_KEY=sk-ant-...
DEEPSEEK_API_KEY=sk-...
```

### Single entry

```bash
# Draft one entry interactively (streams output)
npm run draft "Payment Services Directive 2"
npm run draft -- --provider deepseek "MiFID II"
npm run draft -- --provider deepseek --model deepseek-reasoner "EU AI Act"
```

On some Windows/PowerShell setups, npm can pass positional values instead of named flags.
The scripts now handle both styles, so this also works:

```bash
npm run draft -- deepseek "EU AI Act"
```

### Batch (many entries at once)

```bash
# Anthropic Batches API — 50% cost reduction, async (5–15 min)
npm run batch-draft
npm run batch-draft -- "GDPR" "AI Act" "REACH"
npm run batch-draft -- --topics-file data/my-topics.json

# Poll a running batch
npm run batch-draft -- --poll <batch_id>

# DeepSeek — parallel, ~10–20x cheaper than Claude
npm run batch-draft -- --provider deepseek
npm run batch-draft -- --provider deepseek --parallel 10 --topics-file data/topics-batch-2.json
```

On some Windows/PowerShell setups, npm may strip option names. This positional form is also supported:

```bash
npm run batch-draft -- deepseek 10 data/topics-batch-2.json
```

**Topics file** is a plain JSON array of strings:
```json
["GDPR", "MiFID II", "Solvency II"]
```

Each saved entry gets an `llm:` frontmatter field recording which model drafted it.

### Harvesting candidates from EUR-Lex

```bash
npm run harvest    # queries EUR-Lex SPARQL, writes data/candidates.json
```

If drafting logs `No local context candidate`, it means no match was found in `data/candidates.json`.
Drafting still continues with model knowledge; run `npm run harvest` to refresh candidates and improve context injection coverage.

### Extracting questions

```bash
# Rebuild data/questions.json from all entries
npm run extract-questions

# Only include entries matching a specific topics batch
npm run extract-questions -- --topics-file data/topics-batch-7.json

# Windows/npm positional fallback (also supported)
npm run extract-questions -- data/topics-batch-7.json
```

---

## Content schema

Each entry in `src/content/directives/` uses this frontmatter:

```yaml
---
title: "General Data Protection Regulation"
directive: "2016/679/EU"        # optional — the official directive/reg number
category: "Digital & Data"
year: 2018
tags: [privacy, data-protection, gdpr]
summary: "One-sentence plain-language description."
status: "in-force"              # in-force | proposed | repealed | withdrawn
related: ["2022/2065/EU"]       # cross-links to other entries by directive number
llm: "claude-opus-4-7"         # which model drafted this entry
---
```

---

## Deploying

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/`) which builds the Astro site and publishes to GitHub Pages.

---

## Troubleshooting

### Recommended daily workflow

```bash
# 1) Refresh candidate context (optional but recommended)
npm run harvest

# 2) Draft entries from your batch topics
npm run batch-draft -- --provider deepseek --parallel 8 --topics-file data/topics-batch-7.json

# 3) Rebuild questions dataset for search/Q&A pages
npm run extract-questions -- --topics-file data/topics-batch-7.json
```

Fast iteration mode: if you are refining prompts, rerunning failed items, or testing parser changes, you can skip `npm run harvest` and draft directly.

### Quick command cheat sheet

```bash
# Refresh candidate context from EUR-Lex
npm run harvest

# Draft one entry with DeepSeek
npm run draft -- --provider deepseek "EU AI Act"

# Draft one entry with positional fallback (Windows/npm)
npm run draft -- deepseek "EU AI Act"

# Run batch with DeepSeek from topics file
npm run batch-draft -- --provider deepseek --parallel 8 --topics-file data/topics-batch-7.json

# Run batch with positional fallback (Windows/npm)
npm run batch-draft -- deepseek 8 data/topics-batch-7.json

# Extract questions from all directives
npm run extract-questions

# Extract questions only for one batch
npm run extract-questions -- --topics-file data/topics-batch-7.json
```

### `--provider` / `--topics-file` flags seem ignored on Windows

On some npm + PowerShell setups, named flags can be passed positionally to scripts.

If this happens, use positional forms (supported by this repo):

```bash
# draft.ts
npm run draft -- deepseek "EU AI Act"

# batch-draft.ts
npm run batch-draft -- deepseek 8 data/topics-batch-7.json

# extract-questions.ts
npm run extract-questions -- data/topics-batch-7.json
```

### `No local context candidate` during drafting

This is non-fatal. It only means that a topic was not matched in `data/candidates.json`,
so no EUR-Lex/Wikipedia context was injected for that item. The draft still runs.

To improve context coverage:

```bash
npm run harvest
```

Then rerun your draft or batch command.

### `extract-questions` touched more files than expected

`npm run extract-questions` rebuilds `data/questions.json` from **all** directive files.
To focus on one batch, pass a topics file:

```bash
npm run extract-questions -- --topics-file data/topics-batch-7.json
```

If your project contains timestamped backup entries in `src/content/directives/`, they can still match batch filters and be included.

---

## Disclaimer

AI-assisted knowledge base. Content is for informational purposes only and is not legal advice. Always verify with official EU sources at [eur-lex.europa.eu](https://eur-lex.europa.eu).
