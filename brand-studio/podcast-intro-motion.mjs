/** Connection pass. Values in seconds; final geometry is extracted from the approved title. */
export const DURATION=5.5;
const clamp=v=>Math.min(1,Math.max(0,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=t=>{t=clamp(t);return t*t*t*(t*(t*6-15)+10)};
const out=t=>1-Math.pow(1-clamp(t),4);
const progress=(t,a,b,ease=smooth)=>ease((t-a)/(b-a));
const group=(s,attr)=>`<g ${attr}>${s}</g>`;

export function introSVG(t,L,{transparent=false}={}){
  t=Math.max(0,t);
  const base=L.defs.slice(0,-7);
  // Reveal the two shoulders toward their connecting bend. No path morphing.
  const reveal=progress(t,.08,.82,out);
  const upperReveal=progress(t,.20,.95,out);
  const travel=progress(t,1.28,2.48);
  const scale=lerp(2.70,1,travel);
  const cx=lerp(960,595.47,travel),cy=lerp(540,532,travel);
  const transform=`translate(${cx} ${cy}) scale(${scale}) translate(-595.47 -532)`;
  const gap=0; // Masks reveal the whole symbol; its two ends never separate.
  const topEdge=lerp(472,532,upperReveal),bottomEdge=lerp(592,532,reveal);
  const recReveal=progress(t,2.22,3.02,out),podReveal=progress(t,2.48,3.28,out);
  const typeLift=8*(1-progress(t,2.22,3.28));
  const defs=`${base}<clipPath id="upper"><rect x="530" y="465" width="130" height="67"/></clipPath><clipPath id="lower"><rect x="530" y="532" width="130" height="70"/></clipPath><clipPath id="reveal-top"><rect x="520" y="460" width="150" height="${Math.max(0,topEdge-460)}"/></clipPath><clipPath id="reveal-bottom"><rect x="520" y="${bottomEdge}" width="150" height="160"/></clipPath><clipPath id="recoup-reveal"><path d="M675 470H${675+364*recReveal}L${655+364*recReveal} 606H675Z"/></clipPath><clipPath id="podcast-reveal"><path d="M1030 470H${1030+382*podReveal}L${1010+382*podReveal} 606H1030Z"/></clipPath></defs>`;
  let background='';
  if(!transparent){
    const settle=progress(t,.05,3.55);
    background=group(L.background,`transform="translate(${lerp(-28,0,settle)} ${lerp(10,0,settle)}) translate(960 540) scale(${lerp(1.045,1,settle)}) translate(-960 -540)"`);
    // Two restrained blue fields cross the mark on the opening beat, then leave.
    const pass=progress(t,.02,1.55);
    const envelope=Math.sin(Math.PI*pass)*.20;
    if(envelope>.0001){
      const x=lerp(-900,2050,pass),y=lerp(2550,-400,pass);
      background+=`<path d="M${x} -200h400l-430 1500h-400Z" fill="#BFEFFF" opacity="${envelope}"/><path d="M${y} -200h560l-430 1500h-560Z" fill="#034899" opacity="${envelope*.72}"/>`;
    }
  }
  let icon='';
  if(t>=.95){icon=L.icon;}else{
    const top=group(group(L.icon,'clip-path="url(#upper)"'),'clip-path="url(#reveal-top)"');
    const bottom=group(group(L.icon,'clip-path="url(#lower)"'),'clip-path="url(#reveal-bottom)"');
    icon=group(top,`transform="translate(${gap} ${-gap})"`)+group(bottom,`transform="translate(${-gap} ${gap})"`);
  }
  const identity=group(icon,`transform="${transform}" fill="#FFFFFF"`)+group(group(L.recoup,'clip-path="url(#recoup-reveal)"'),`transform="translate(0 ${typeLift})"`)+group(group(L.podcast,'clip-path="url(#podcast-reveal)"'),`transform="translate(0 ${typeLift})"`);
  // A fully settled hold reproduces the approved title exactly, including background.
  const body=t>=3.55?(transparent?L.icon+L.recoup+L.podcast:L.final):background+identity;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${L.width}" height="${L.height}" viewBox="0 0 1920 1080">${defs}<g fill="#FFFFFF">${body}</g></svg>`;
}
