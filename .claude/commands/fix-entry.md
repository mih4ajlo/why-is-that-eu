# Fix a Flagged Entry

Re-draft a specific directive entry that failed quality evaluation, then re-evaluate and commit.

Arguments: `$ARGUMENTS` — slug or partial slug of the entry to fix (e.g. `shareholder-rights-directive-ii`).

## Steps

1. Find the entry file:
```
ls src/content/directives/ | grep "$ARGUMENTS"
```
If multiple files match, ask the user to clarify.

2. Read the entry and identify the specific problems — check:
   - The `eval_why` frontmatter score and any LLM issues noted in the eval report
   - The "Why was it introduced?" section for thin context, unverifiable stats, or truncation
   - The Q&A section for answers below 50 words or off-topic answers
   - The summary for generic boilerplate

3. Decide: **expand in place** vs **full re-draft**
   - Expand in place if: only 1–2 answers are slightly short (32–50 words) and the content is factually solid
   - Full re-draft if: the "why" section is thin/fabricated, the entry is truncated, or `eval_why ≤ 2`

   For expansion: edit the specific short answers directly, adding 1–2 substantive sentences of specific context (named actors, dates, outcomes).

   For re-draft:
   ```
   npm run draft -- "Full descriptive topic — directive number, common name, key context note about what makes this interesting"
   ```
   The topic string should guide the model toward the accurate historical story.

4. If re-drafted to a new filename:
   - Delete the old file: `rm src/content/directives/<old-slug>.md`
   - Delete any backup file with a timestamp: `rm src/content/directives/*-20??-??-??T*.md`

5. Run eval on the fixed entry:
```
npm run evaluate -- --llm --file "$ARGUMENTS"
```
Confirm `eval_why` and `eval_summary` are both ≥ 4. If not, investigate and fix further.

6. Commit:
```
git add src/content/directives/
git commit -m "Fix <entry-name>: <one line on what was wrong and what changed>"
git push
```

## Common issues and fixes

| Issue | Fix |
|---|---|
| Answer too short (< 40 words) | Add 1–2 sentences: name a specific actor, date, or outcome |
| Truncated "why" section | Full re-draft — truncation means the model ran out of context |
| Invented statistics | Full re-draft — instruct the model to attribute all figures |
| Generic summary | Edit in place — make it name the specific policy action |
| Reston/USA incident cited for EU directive | Full re-draft — look for real EU-level triggers |
| Vote counts / names that seem invented | Full re-draft — ask model to use qualitative language if uncertain |
