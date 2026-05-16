# Evaluate Directive Quality

Run the evaluation pipeline, triage findings, and drive fixes to completion.
Full reference: `docs/eval-system.md`.

Arguments: `$ARGUMENTS` — one of:
- *(blank)* — heuristics on all entries, write stats, report findings
- `sample N` — heuristics + LLM eval on N entries
- `full` — heuristics + LLM eval on all heuristic-error entries
- `all` — heuristics + LLM eval on every entry (~$1.35, ~20 min)
- `<slug>` — heuristics + LLM eval on one specific entry

## Step 1 — Run the appropriate mode

```bash
# blank / heuristics only
npm run evaluate

# sample (recommended for periodic checks)
npm run evaluate -- --llm --sample 30

# specific entry
npm run evaluate -- --llm --file <slug>

# full (after a large new batch or monthly audit)
npm run evaluate -- --llm --sample 443
```

## Step 2 — Triage heuristic findings

After the run, inspect errors first:

```bash
node -e "
const fs = require('fs');
const r = JSON.parse(fs.readFileSync('./data/eval-report.json','utf8'));
const errors = r.filter(e => e.heuristicFlags && e.heuristicFlags.some(f => f.severity === 'error'));
errors.forEach(e => {
  console.log('\n' + e.slug);
  e.heuristicFlags.filter(f => f.severity === 'error')
    .forEach(f => console.log('  ERROR: ' + f.message + (f.target ? ' — ' + f.target.slice(0,70) : '')));
});
console.log('\nTotal with errors:', errors.length);
"
```

### Triage decision for heuristic errors

| Error type | Action |
|---|---|
| Missing section (`## Why was it introduced?` etc.) | Re-draft with `/fix-entry` |
| Answer too short (< 40 words) | Read the answer — if substantive, expand in place (add 1–2 sentences); if thin, re-draft |
| No Q&A pairs | Re-draft — the section likely didn't generate |

### Triage decision for heuristic warnings

Most warnings are **false positives** — the LLM consistently scores "short" answers as 4–5/5. Do not fix warnings without first confirming with LLM eval.

```bash
# Confirm a specific warning is real before fixing
npm run evaluate -- --llm --file <slug>
```

Fix a warning only if LLM eval returns `relevance ≤ 3` or `specificity ≤ 3` for that answer.

## Step 3 — Triage LLM findings

### Score interpretation

| Score | Meaning | Action |
|---|---|---|
| 5 | Excellent | None |
| 4 | Good, minor issues | Check the issues list; fix if specific and actionable |
| 3 | Adequate but weak | Read the section; expand in place if content is accurate |
| 2 | Thin or problematic | Re-draft with `/fix-entry` |
| 1 | Wrong or fabricated | Re-draft immediately |

### `eval_why ≤ 2` — the most important signal

A low "why" score almost always means one of:
- **Thin content** — no named actors, no specific events, just generic EU governance description
- **Fabricated content** — invented statistics, non-EU events cited as EU triggers, made-up quotes

To diagnose: read the section and ask:
1. Are there specific named people (commissioners, MEPs, lobbyists)?
2. Are statistics attributed to a named source + year?
3. Do the events cited actually relate to EU legislative history?
4. Is there a clear causal chain from problem → crisis/trigger → legislative action?

If any answer is "no": use `/fix-entry` for a full re-draft.

### `eval_summary ≤ 3`

Read the summary. Flag it for edit if it:
- Could apply to any EU law ("establishes a framework for…")
- Does not name the specific policy action or outcome
- Is factually wrong about what the directive does

Summaries can usually be fixed in place — edit the frontmatter `summary:` field directly.

### Q&A issues

If `eval_qa_relevance ≤ 3` for a specific question: the answer doesn't address the question. Options:
- If the question is poorly written: delete the `### Question?` block and its answer
- If the answer is off-topic: expand or rewrite the answer paragraph in place

If `eval_qa_specificity ≤ 3`: the answer is too generic. Add one sentence with a specific named actor, date, fine, or outcome from this directive.

## Step 4 — Apply fixes

For **expand in place** (minor issues, < 3 answers affected):
- Edit the file directly, adding 1–2 substantive sentences per short/weak answer
- Re-run eval to confirm: `npm run evaluate -- --llm --file <slug>`

For **full re-draft** (eval_why ≤ 2, truncation, fabrication):
- Use `/fix-entry <slug>`

## Step 5 — Commit

After all fixes:

```bash
# Stage all directive files (eval stats + any content fixes)
git add src/content/directives/

# If questions changed (re-drafted entries may have different Q&A)
npm run extract-questions
git add data/questions.json

git commit -m "Eval audit YYYY-MM-DD: N errors fixed, eval stats updated"
git push
```

## Periodic audit schedule

| Trigger | Mode | Rationale |
|---|---|---|
| After each new batch | `--llm --file` per new entry | Catch batch-specific issues immediately |
| After 50+ entries added | `--llm --sample 30` | Spot-check quality drift |
| Monthly | `--llm --sample 443` | Full baseline refresh (~$1.35) |
| After model change (drafting model upgraded) | `--llm --sample 50` | Check if new model has different failure modes |

## Quick reference — common findings and fixes

| Finding | Likely cause | Fix |
|---|---|---|
| `eval_why: 2`, LLM flags "no named actors" | Generic ChatGPT-style output | Re-draft: provide specific topic string with historical context |
| `eval_why: 2`, LLM flags "unverifiable statistics" | Hallucinated figures | Re-draft: note attribution rules in topic string |
| `eval_why: 3`, section ends mid-sentence | Token limit hit during drafting | Re-draft with slightly shorter topic |
| Answer too short (38 words), `eval_qa_relevance: 5` | Heuristic false positive | Expand by 1–2 sentences, no re-draft needed |
| `eval_summary: 3`, "could apply to any EU law" | Generic summary generated | Edit frontmatter summary directly |
| Near-duplicate questions flagged | Two questions overlap > 50% | Delete the weaker question and its answer |
