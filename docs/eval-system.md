# Evaluation System

The `scripts/evaluate.ts` script runs a two-tier quality check on all directive entries in `src/content/directives/`. Results are written back to each file's frontmatter and to `data/eval-report.json` (gitignored).

## Architecture

```
npm run evaluate [flags]
        │
        ├─ Tier 1: Heuristics (always runs, free, all entries)
        │         Structural checks on text length, section presence,
        │         summary quality, question specificity, near-duplicates
        │
        └─ Tier 2: LLM-as-judge (opt-in, uses claude-haiku-4-5)
                  Semantic quality scores for summary, "why" section,
                  and each Q&A pair — returned as structured tool_use output
```

## CLI flags

| Flag | Effect |
|---|---|
| *(none)* | Heuristics on all entries, write stats to frontmatter |
| `--no-write` | Heuristics only, no file changes (dry run) |
| `--llm` | + LLM eval on all heuristic-error entries |
| `--llm --sample N` | + LLM eval on N entries (error entries first, then random) |
| `--llm --file slug` | + LLM eval on one specific entry (partial slug match) |
| `--model <id>` | Override LLM eval model (default: `claude-haiku-4-5-20251001`) |
| `--out <path>` | Override report output path (default: `data/eval-report.json`) |

## Tier 1: Heuristic checks

### Summary checks

| Check | Threshold | Severity |
|---|---|---|
| Missing summary field | — | error |
| Summary too short | < 60 chars | warn |
| Summary too long | > 450 chars | warn |
| Generic boilerplate without specific action | patterns + no numbers/verbs | warn |

Generic boilerplate patterns detected: `sets? (out|up)? rules? (for|on|about)`, `provides? (a|the)? framework`, `establishes? (a|the)? framework`, `lays? down (rules?|requirements?)`.

### Section checks

| Section | Min words | Severity if missing | Severity if short |
|---|---|---|---|
| `## What is it?` | 80 | error | warn |
| `## Why was it introduced?` | 150 | error | warn |
| `## Key questions answered` | — | error | — |

### Question checks

| Check | Threshold | Severity |
|---|---|---|
| No Q&A pairs found | 0 questions | error |
| Too few questions | < 3 | warn |
| Answer too short | < 40 words | error |
| Answer short | < 70 words | warn |
| Question shares no key terms with entry vocabulary | 0 overlap on > 4 tokens | warn |
| Near-duplicate questions (same entry) | Jaccard similarity > 0.5 | warn |

The "key terms" check builds a vocabulary from the entry's title + summary + first 300 chars of "What is it?" — broader than just the title to reduce false positives.

## Tier 2: LLM evaluation

Uses `claude-haiku-4-5-20251001` by default (cheap, fast, adequate for quality scoring).

### What is evaluated

For each entry the model receives:
- Directive title, number, category, year
- The full summary
- The "Why was it introduced?" section (truncated at 1,500 chars)
- All Q&A pairs (each answer truncated at 500 chars)

### Scores (1–5 scale)

**Summary score (`eval_summary`)**
- 1 — vague or generic; applies to any EU law
- 3 — adequate but missing distinctive specifics
- 5 — precise, distinctive, accurately captures this directive's core purpose

**"Why" section score (`eval_why`)**
- 1 — generic/thin; no named actors, no specific events
- 3 — some context but lacks depth or causal chain
- 5 — rich historical/political context with named actors, specific events, vote counts, and clear causal chain

**Q&A relevance (`eval_qa_relevance`)**
- 1 — answer does not address the question
- 5 — answer directly and fully addresses the question

**Q&A specificity (`eval_qa_specificity`)**
- 1 — answer could apply to any EU law
- 5 — answer is specific to this directive with concrete, verifiable facts

### Tool use schema

The evaluator uses structured output via Anthropic tool_use (`record_evaluation`). The full schema is defined in `scripts/evaluate.ts` in the `EVAL_TOOL` constant. Scores are integers 1–5 per dimension; issues are an array of strings describing specific problems found.

### Cost model

Based on a 442-entry run (May 2026):
- ~2,033 input tokens per entry
- ~357 output tokens per entry
- Model: `claude-haiku-4-5-20251001` at $0.80/M input, $4.00/M output
- **Full 442-entry run: ~$1.35**
- **30-entry sample: ~$0.09**

## Frontmatter fields written

After a heuristic-only run:

```yaml
eval_errors: 0          # count of heuristic errors (target: 0)
eval_warnings: 3        # count of heuristic warnings
eval_date: "2026-05-16"
```

After a run with `--llm`:

```yaml
eval_errors: 0
eval_warnings: 3
eval_summary: 5         # LLM summary score (1–5)
eval_why: 5             # LLM "why" section score (1–5)
eval_qa_relevance: 4.9  # avg LLM Q&A relevance (1–5)
eval_qa_specificity: 4.8 # avg LLM Q&A specificity (1–5)
eval_date: "2026-05-16"
```

Fields are idempotent — re-running overwrites existing `eval_*` lines cleanly.

## eval-report.json structure

```json
[
  {
    "slug": "adequate-minimum-wages-directive",
    "title": "Adequate Minimum Wages Directive",
    "directive": "2022/2041/EU",
    "category": "Labour & Social",
    "questionCount": 4,
    "heuristicFlags": [
      {
        "kind": "question",
        "target": "Why didn't the EU have any rules about minimum wages before?",
        "message": "Answer short (58 words)",
        "severity": "warn"
      }
    ],
    "llmEval": {
      "slug": "adequate-minimum-wages-directive",
      "summaryScore": 5,
      "summaryIssues": [],
      "whyScore": 5,
      "whyIssues": [],
      "questions": [
        {
          "question": "Why didn't the EU have any rules about minimum wages before?",
          "relevance": 5,
          "specificity": 5,
          "issues": []
        }
      ],
      "inputTokens": 2100,
      "outputTokens": 340
    }
  }
]
```

`llmEval` is absent if the entry was not LLM-evaluated in the last run.

## Baseline scores (May 2026, 441 entries)

| Metric | Score |
|---|---|
| Avg summary score | 4.98 / 5 |
| Avg "why" section score | 4.88 / 5 |
| Avg Q&A relevance | 4.96 / 5 |
| Avg Q&A specificity | 4.83 / 5 |
| Entries with heuristic errors | 0 |
| Entries with heuristic warnings | 291 (66%) |

Warnings are dominated by short answers (527 instances) and the generic-question check (114 instances). The LLM consistently rates these as high quality — they are largely false positives from the heuristic thresholds.

## Known limitations

- **LLM eval is not ground truth** — haiku may score a hallucinated "why" section as 5/5 if the fabrication is plausible and confident. Always cross-check `eval_why ≤ 3` entries manually.
- **eval-report.json is overwritten per run** — individual `--file` runs replace the full report with a single entry. Run without `--file` to get a complete report.
- **Heuristic short-answer threshold is conservative** — 40-word error / 70-word warning catches genuinely thin answers but also dense, well-written ones. Use LLM eval to disambiguate.
- **Near-duplicate check is within-entry only** — does not detect when the same question appears across different entries.
