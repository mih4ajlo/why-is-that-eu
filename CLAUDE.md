# why-is-that-eu — Claude Instructions

## What this project is

A static knowledge base explaining EU directives and regulations with a focus on **why** they were introduced — the historical context, political dynamics, key actors, and industry battles behind each piece of legislation. Built with Astro 5, deployed to GitHub Pages.

Content lives in `src/content/directives/` as markdown files. Questions extracted from all entries live in `data/questions.json`.

## Key scripts

| Command | What it does |
|---|---|
| `npm run draft -- "topic"` | Draft one entry interactively (streams claude-opus-4-7) |
| `npm run batch-draft -- --topics-file data/topics-batch-N.json` | Batch draft via Anthropic Batches API (async, 50% cheaper) |
| `npm run batch-draft -- --provider deepseek --topics-file ...` | Batch draft via DeepSeek (parallel, cheaper for large batches) |
| `npm run extract-questions` | Rebuild `data/questions.json` from all directive files |
| `npm run evaluate` | Heuristic eval on all entries + write stats to frontmatter |
| `npm run evaluate -- --llm --sample N` | + LLM eval (claude-haiku) on N entries |
| `npm run evaluate -- --llm --file slug` | + LLM eval on one specific entry |
| `npm run evaluate -- --no-write` | Heuristics only, no file changes |

## Directory structure

```
src/content/directives/    # 442 directive markdown files
data/
  questions.json           # 1625 Q&A pairs extracted from all entries
  topics-batch-N.json      # Topic lists for each draft batch (1–8 so far)
  candidates.json          # EUR-Lex harvested candidates (mostly implementing regs, low value)
scripts/
  draft.ts                 # Single-entry drafter
  batch-draft.ts           # Batch drafter (Anthropic Batches API or DeepSeek parallel)
  extract-questions.ts     # Extracts Q&A pairs from all directive files
  evaluate.ts              # Quality evaluation (heuristics + LLM-as-judge)
  harvest.ts               # EUR-Lex scraper (populates candidates.json)
```

## Directive frontmatter

Every entry has these fields:

```yaml
title: "..."
directive: "YYYY/NNN/EU"   # official number; some older acts use different format
category: "..."            # see categories below
year: YYYY
tags: [...]
summary: "..."             # one sentence, specific to this directive
status: "in-force" | "repealed" | "pending"
related: [...]             # directive numbers of related acts
llm: "model-id"            # model used to draft
eval_errors: N             # heuristic error count
eval_warnings: N           # heuristic warning count
eval_summary: N            # LLM score 1–5 (if evaluated)
eval_why: N                # LLM score 1–5 (if evaluated)
eval_qa_relevance: N.N     # avg LLM Q&A relevance score (if evaluated)
eval_qa_specificity: N.N   # avg LLM Q&A specificity score (if evaluated)
eval_date: "YYYY-MM-DD"
```

## Categories

Consumer Electronics | Environmental | Digital & Data | Food & Agriculture | Health & Safety | Financial | Labour & Social | Migration & Asylum | Justice & Civil Law | Governance & Institutions | Sanctions & Foreign Policy | Trade & Competition | Transport | Energy

## Content structure

Every directive entry must have these sections (in order):

1. `## What is it?` — what the law requires, who it applies to (≥ 80 words)
2. `## Why was it introduced?` — the historical/political story (≥ 150 words)
3. `## Timeline` — key dates as bullet list
4. `## Impact and consequences` — what changed after adoption
5. `## Key questions answered` — 3–5 Q&As as `### Question?` / answer pairs
6. `## Official sources` — links to EUR-Lex and relevant Commission pages

## Content standards

**The "why" section must:**
- Name specific commissioners, MEPs, trade unions, industry groups, or companies involved
- Identify the structural tension or failure that made legislation inevitable
- Explain what broke the political deadlock (crisis, court ruling, election, scandal)
- Attribute all statistics to a named source inline ("according to Eurostat", "the Commission's 2020 impact assessment found")
- Never invent quotes or statistics

**Q&A answers must:**
- Directly address the specific question asked (not pivot to a related topic)
- Be specific to this directive (not generic EU law boilerplate)
- Be ≥ 50 words

**Summaries must:**
- Be one sentence, ≤ 400 characters
- Be distinctive to this directive (not applicable to any EU law)
- Name the specific policy action or outcome

## Quality thresholds (evaluate script)

- `eval_errors: 0` — target; errors mean missing sections or very short answers
- `eval_warnings` — acceptable; mostly short answers and generic questions
- `eval_summary ≥ 4` — LLM score; below 4 signals generic or inaccurate summary
- `eval_why ≥ 4` — LLM score; below 4 signals thin context or unverifiable claims

## Standard workflows

### Drafting a new batch (batch cycle)

1. Identify gaps: compare existing category coverage against known major EU legislation
2. Create `data/topics-batch-N.json` as a JSON array of descriptive topic strings
3. Run batch draft: `npm run batch-draft -- --topics-file data/topics-batch-N.json`
4. Run evaluation on new entries: `npm run evaluate -- --llm --file <partial-slug>`
5. Run `npm run extract-questions` to update questions.json
6. Commit: topics file, new directive files (with eval stats), updated questions.json

### Fixing a bad entry (fix cycle)

1. Identify the entry: from eval report or heuristic output
2. Note the specific issues (short answers, unverifiable claims, truncation)
3. Re-draft: `npm run draft -- "full descriptive topic string with directive number"`
4. Delete the old file if the new one saved to a different slug
5. Run eval: `npm run evaluate -- --llm --file <slug>`
6. Commit with a clear message noting what was wrong and what changed

### Quality audit

1. Run `npm run evaluate` — writes heuristic stats to all frontmatter
2. Run `npm run evaluate -- --llm --sample 30` — spot-check semantic quality
3. Inspect low-scoring entries in the console output
4. Fix any entries with `eval_why ≤ 2` or `eval_errors > 0`
