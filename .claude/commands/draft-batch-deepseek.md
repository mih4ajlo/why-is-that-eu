# Draft a Batch with DeepSeek

Batch drafting via DeepSeek — cheaper and faster than Anthropic for large batches,
but requires stricter post-eval due to higher hallucination risk.

Arguments: `$ARGUMENTS` — path to topics JSON file (e.g. `data/topics-batch-9.json`).

## When to use DeepSeek vs Anthropic

| Situation | Use |
|---|---|
| Large batch (10+ entries), cost matters | DeepSeek |
| Small batch (≤ 8 entries) or high-stakes entries | Anthropic |
| Entries in categories where facts are hard to verify (Sanctions, Migration, Financial) | Anthropic preferred |
| Entries with good EUR-Lex source context fetched | Either (source docs reduce hallucination risk) |
| Re-drafting a known-bad entry | Anthropic — don't risk another fabrication |

## DeepSeek models

| Model | Best for | Notes |
|---|---|---|
| `deepseek-chat` (default) | High volume, general topics | Fast, cheap; more prone to invented stats |
| `deepseek-reasoner` | Complex political/historical topics | Slower, better causal reasoning; still needs eval |

## Steps

1. Confirm topics file exists and preview contents:
```
cat $ARGUMENTS
```

2. Run batch draft with DeepSeek (default 5 parallel workers):
```
npm run batch-draft -- --provider deepseek --topics-file $ARGUMENTS
```
For larger batches or if hitting rate limits, adjust parallelism:
```
npm run batch-draft -- --provider deepseek --parallel 3 --topics-file $ARGUMENTS
```

3. Find all new entries:
```
git status --short | grep "^?" | grep "src/content/directives"
```

4. **Run LLM eval on every single new entry** — this is mandatory for DeepSeek output:
```
npm run evaluate -- --llm --file <slug>
```
For each entry, check:
- `eval_why` score — if ≤ 3, inspect the "Why was it introduced?" section carefully
- `eval_summary` score — if ≤ 3, the summary may be generic or inaccurate
- Any issues flagged in the LLM evaluator output

5. **Manually inspect all entries with `eval_why ≤ 3`** — read the section and check for:
   - Specific statistics without named sources ("the Commission estimated X million…" with no report cited)
   - Non-EU incidents cited as EU legislative triggers (US court cases, US agency rulings)
   - Specific vote counts, case numbers, or individual names that sound invented
   - Plausible-sounding but unverifiable position paper references

6. For any entry with fabricated content:
   - Use `/fix-entry` to re-draft with Anthropic (not DeepSeek again)
   - Commit the fix separately from the batch

7. Delete any timestamped backup files before committing:
```
ls src/content/directives/*-20??-??-??T*.md 2>/dev/null && rm src/content/directives/*-20??-??-??T*.md
```

8. Extract questions and commit:
```
npm run extract-questions
git add src/content/directives/ data/topics-batch-N.json data/questions.json
git commit -m "Add batch N (DeepSeek): X entries — Y categories"
git push
```

## Known DeepSeek failure modes (from this project's history)

- **Invented statistics** — most common failure; DeepSeek generates plausible numbers without real sources. Example: "1 million hepatitis B infections annually among EU healthcare workers" with no verifiable source.
- **US incidents as EU triggers** — DeepSeek may cite US events (e.g. a Virginia biocontainment incident) as reasons for EU legislation when the real trigger was different.
- **Invented vote counts** — specific Parliament vote tallies (e.g. "505 votes to 92") that sound precise but are fabricated.
- **Confident hallucination** — unlike Claude, DeepSeek rarely hedges when fabricating; the text reads as authoritative even when invented.

The `DEEPSEEK_SYSTEM_PROMPT` in `scripts/draft.ts` contains explicit warnings about these patterns and is automatically used by `batch-draft.ts` when `--provider deepseek` is set.
