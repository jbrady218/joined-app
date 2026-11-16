const {chromium}=require('playwright');const {icon}=require('./marks.js');
const card=(k,t,d)=>`<div class="c"><div class="row"><div class="ic">${icon(k)}</div><div class="wm"><div class="ic sm">${icon(k)}</div><span>Joined</span></div></div><b>${t}</b><p>${d}</p></div>`;
const html=`<html><head><style>body{margin:0;background:#efede8;font-family:Inter,system-ui,sans-serif;color:#1c1a17}
.w{padding:36px;display:flex;flex-direction:column;gap:18px;width:1100px}h1{font-family:Georgia,serif;font-size:30px;margin:0}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.c{background:#fdfcf9;border:1px solid #dcd7cc;border-radius:14px;padding:22px}
.row{display:flex;gap:18px;align-items:center}.ic{width:96px;height:96px}.ic svg{width:100%;height:100%}.ic.sm{width:34px;height:34px}
.wm{display:flex;align-items:center;gap:10px}.wm span{font-family:Georgia,serif;font-size:32px;font-weight:600;letter-spacing:-.01em}
b{display:block;margin-top:16px;font-size:16px}p{margin:4px 0 0;color:#6a655c;font-size:14px;line-height:1.45}
.t{font-family:Georgia,serif;font-style:italic;color:#6a655c;font-size:17px;margin:-8px 0 0}</style></head><body><div class="w">
<h1>Joined: logo ideas</h1><p class="t">“Join them one to another into one stick; and they shall become one in thine hand.” Ezekiel 37:17</p>
<div class="g">${card('one','A · Two sticks become one','Two sticks joined end to end and bound in the middle. The closest picture of Ezekiel 37.')}
${card('bundle','B · A bundle in the hand','Three sticks held together, fanning out from where a hand would hold them.')}
${card('pair','C · Bound side by side','Two sticks laid together and tied in two places. The simplest and quietest.')}</div></div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:500},deviceScaleFactor:2});await p.setContent(html);const el=await p.$('.w');await el.screenshot({path:'/mnt/user-data/outputs/joined-logo-ideas.png'});await b.close();})();
