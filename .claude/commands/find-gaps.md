# Find Coverage Gaps

Analyze the current directive knowledge base and identify major EU legislative acts that are missing.

## Steps

1. Count existing entries by category:
```
node -e "
const fs = require('fs'), path = require('path');
const dir = 'src/content/directives';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const cats = {};
files.forEach(f => {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const cat = (raw.match(/^category:\s*\"([^\"]+)\"/m) || raw.match(/^category:\s*([^\n\"#\[]+)/m))?.[1]?.trim() || 'Unknown';
  cats[cat] = (cats[cat]||0)+1;
});
Object.entries(cats).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>console.log(n+'\t'+c));
"
```

2. List all existing entry titles and directive numbers:
```
node -e "
const fs = require('fs'), path = require('path');
const dir = 'src/content/directives';
fs.readdirSync(dir).filter(f=>f.endsWith('.md')).forEach(f => {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const title = (raw.match(/^title:\s*\"([^\"]+)\"/m)||raw.match(/^title:\s*([^\n\"#\[]+)/m))?.[1]?.trim();
  const dir2 = (raw.match(/^directive:\s*\"([^\"]+)\"/m)||raw.match(/^directive:\s*([^\n\"#\[]+)/m))?.[1]?.trim();
  const cat = (raw.match(/^category:\s*\"([^\"]+)\"/m)||raw.match(/^category:\s*([^\n\"#\[]+)/m))?.[1]?.trim();
  console.log(cat + ' | ' + dir2 + ' | ' + title);
});
" | sort
```

3. For each under-covered category (especially any with fewer than 20 entries), identify major EU legislative acts that are missing. Focus on:
   - Landmark/framework legislation that people would genuinely ask "why did the EU do this?" about
   - Acts with a good political or historical story (crises, lobbying battles, vote counts)
   - NOT implementing regulations, amendments, or technical annexes

4. Cross-check candidates against the existing list — verify they are genuinely absent before flagging as gaps.

5. Output a prioritized gap list organized by category, with:
   - The act name and directive/regulation number
   - One sentence on why it's worth covering ("why is that?" potential)
   - Suggested descriptive topic string for the topics JSON file

6. Optionally create `data/topics-batch-N.json` (where N is one higher than the last batch file):
```
ls data/topics-batch-*.json | sort -V | tail -1
```
