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

**Topics file** is a plain JSON array of strings:
```json
["GDPR", "MiFID II", "Solvency II"]
```

Each saved entry gets an `llm:` frontmatter field recording which model drafted it.

### Harvesting candidates from EUR-Lex

```bash
npm run harvest    # queries EUR-Lex SPARQL, writes data/candidates.json
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

## Disclaimer

AI-assisted knowledge base. Content is for informational purposes only and is not legal advice. Always verify with official EU sources at [eur-lex.europa.eu](https://eur-lex.europa.eu).
