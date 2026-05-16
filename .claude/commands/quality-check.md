# Quality Check

Run the quality evaluation pipeline and report on the state of all directive entries.

Arguments: `$ARGUMENTS` — optional: `full` to run LLM eval on all flagged entries, `sample N` to LLM-eval N random entries, or blank for heuristics only.

## Steps

1. Run heuristic evaluation on all entries:
```
npm run evaluate
```
This writes `eval_errors`, `eval_warnings`, and `eval_date` to every directive's frontmatter.

2. Parse the mode from `$ARGUMENTS`:
   - `full` → `npm run evaluate -- --llm`  (LLM eval on all heuristic error entries)
   - `sample N` → `npm run evaluate -- --llm --sample N`
   - blank → heuristics only (already done in step 1)

3. Report the results:
   - Total entries checked
   - Count and list of entries with `eval_errors > 0`
   - Count of entries with `eval_warnings > 0`
   - If LLM eval ran: avg scores for summary, why, Q&A relevance, Q&A specificity
   - List any entries with `eval_why ≤ 2` or `eval_summary ≤ 3` — these need re-drafting

4. For each entry with `eval_errors > 0`, show the specific flags:
```
node -e "
const fs = require('fs');
const r = JSON.parse(fs.readFileSync('./data/eval-report.json','utf8'));
r.filter(e=>e.heuristicFlags&&e.heuristicFlags.some(f=>f.severity==='error')).forEach(e=>{
  console.log('\n'+e.slug);
  e.heuristicFlags.filter(f=>f.severity==='error').forEach(f=>console.log('  ERROR: '+f.message+(f.target?' — '+f.target.slice(0,60):'')));
});
"
```

5. If any errors or low LLM scores are found, suggest next steps:
   - For short answers (< 40 words): expand in place with 1–2 substantive sentences
   - For truncated sections: re-draft the full entry with `/fix-entry`
   - For unverifiable claims / invented statistics: re-draft with `/fix-entry`

6. Commit the updated frontmatter stats:
```
git add src/content/directives/
git commit -m "Update eval stats: heuristics + LLM scores (YYYY-MM-DD)"
git push
```
