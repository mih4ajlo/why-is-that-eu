# Draft a New Batch

Full pipeline: topics file → batch draft → evaluate → extract questions → commit.

Arguments: `$ARGUMENTS` — path to topics JSON file (e.g. `data/topics-batch-9.json`), or leave blank to use the most recent topics file.

## Steps

1. Identify the topics file:
   - If `$ARGUMENTS` names a file, use it.
   - Otherwise find the latest: `ls data/topics-batch-*.json | sort -V | tail -1`
   - Show how many topics it contains before proceeding.

2. Run batch draft (Anthropic Batches API by default):
```
npm run batch-draft -- --topics-file <topics-file>
```
This is async — it polls until complete and saves files automatically.

3. Find the new directive files (files modified/created in the last 10 minutes):
```
git status --short | grep "^?" | grep "src/content/directives"
```

4. Run LLM evaluation on each new entry. For each new slug:
```
npm run evaluate -- --llm --file <partial-slug>
```
Check the output for `eval_why ≤ 3` or `eval_summary ≤ 3` — those need re-drafting.

5. If any entries score poorly:
   - Note the specific issues flagged by the LLM evaluator
   - Re-draft: `npm run draft -- "full descriptive topic with directive number and context"`
   - Delete the old file if saved to a new slug
   - Re-run eval on the replacement

6. Extract questions:
```
npm run extract-questions
```
Confirm the question count increased as expected.

7. Commit in two logical commits:
   - Commit 1: new directive files + topics file (with eval stats in frontmatter)
   - Commit 2: updated questions.json

8. Push: `git push`

## Notes

- Topic strings should be descriptive: include the directive number, common name, and a brief context note. Example: `"Renewable Energy Directive I (2009/28/EC) — first binding EU renewables targets, establishing 20% by 2020"`
- If a new entry saves to a different filename than the old one (re-draft scenario), remember to delete the old file before committing.
- Backup files with timestamps (e.g. `slug-2026-05-16T17-46.md`) should always be deleted before committing.
