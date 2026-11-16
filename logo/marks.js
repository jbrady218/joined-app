// Shared stick drawing: a rod with a lighter top edge and a bark line
const stick=(x1,y1,x2,y2,c="#e9c46a",w=9)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const cord=(cx,cy,len,ang,n=3,c="#8a5a12")=>{let s="";const r=ang*Math.PI/180,dx=Math.cos(r),dy=Math.sin(r);for(let i=0;i<n;i++){const o=(i-(n-1)/2)*4.2;const px=cx+dx*o,py=cy+dy*o;const nx=-dy*len/2,ny=dx*len/2;s+=`<line x1="${(px-nx).toFixed(1)}" y1="${(py-ny).toFixed(1)}" x2="${(px+nx).toFixed(1)}" y2="${(py+ny).toFixed(1)}" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;}return s;};
const MARKS={
 // A: two sticks joined end to end into one (Ezekiel 37:17)
 one:`${stick(22,78,54,46,"#e9c46a")}${stick(46,54,78,22,"#f4dfa0")}${cord(50,50,18,-45,3)}`,
 // B: three sticks held together, fanning out from the hand
 bundle:`${stick(46,84,30,16,"#e2b857")}${stick(50,85,50,14,"#f4dfa0")}${stick(54,84,70,16,"#e9c46a")}${cord(50,66,24,90,3)}`,
 // C: two sticks laid side by side and bound in two places
 pair:`${stick(40,84,46,16,"#e9c46a",10)}${stick(54,84,60,16,"#f4dfa0",10)}${cord(49,36,30,90,2)}${cord(51,64,30,90,2)}`};
const icon=(k,bg="#1d4e89")=>`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="24" fill="${bg}"/>${MARKS[k]}</svg>`;
module.exports={MARKS,icon};
