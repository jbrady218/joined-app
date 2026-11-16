// Runs after every build. Lists each footnoted word + verse + definition used there.
// Any pairing not in reviewed.json is printed as NEW so it gets a human-style check before publishing.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.setContent('<body>'+fs.readFileSync('daniel-study.html','utf8')+'</body>');await p.waitForTimeout(300);
const rows=await p.evaluate(()=>{const o=[];BOOK_ORDER.forEach(b=>BOOKS[b].chs.forEach(c=>{TEXTS[b][Object.keys(TEXTS[b])[0]][c].forEach((v,i)=>{termsAt(b,c,i+1,v).forEach(k=>o.push(`${b}.${c}:${i+1}|${k}|${TERMS[k].plain}`));});}));return o;});
await b.close();
const rev=fs.existsSync('reviewed.json')?new Set(JSON.parse(fs.readFileSync('reviewed.json'))):null;
if(process.argv[2]==='--approve'){fs.writeFileSync('reviewed.json',JSON.stringify(rows,null,0));console.log('approved',rows.length);return;}
const nw=rev?rows.filter(r=>!rev.has(r)):rows;console.log(nw.length?`NEW, needs review (${nw.length}):\n`+nw.join('\n'):`All ${rows.length} word/verse pairings already reviewed.`);})();
