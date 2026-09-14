/** The selected centered podcast identity, with independent palette and edge patterns. */
export const PALETTES = [
  {id:'forest',name:'Forest & lime',description:'Forest with lime lettering and tonal green corners.',bg:'#132B26',ink:'#D6FF62',muted:'#BCD5CA',accent:'#D6FF62',tone:'#1E4338',second:'#285344',light:'#296375'},
  {id:'blue',name:'Blue & white',description:'Open blue with white lettering and cyan detail.',bg:'#0565BB',ink:'#FFFFFF',muted:'#D1EDFF',accent:'#D6FF62',tone:'#1679BE',second:'#258DC6',light:'#45B0D4'},
  {id:'lime',name:'Lime & forest',description:'A lime field with a strong forest wordmark.',bg:'#D6FF62',ink:'#132B26',muted:'#3B5330',accent:'#132B26',tone:'#BEE655',second:'#C8EE6D',light:'#9DD69A'},
  {id:'ice',name:'Ice & ink',description:'Pale sky with dark lettering and soft blue patterns.',bg:'#C2EDFF',ink:'#152E37',muted:'#395D69',accent:'#007EBD',tone:'#ACDFEE',second:'#98D4E7',light:'#76C3DD'},
  {id:'white',name:'White & blue',description:'A white field, blue title, and cool corner shapes.',bg:'#FFFFFF',ink:'#0565BB',muted:'#586F78',accent:'#0565BB',tone:'#EAF3F6',second:'#DDECF1',light:'#BBDDEC'},
  {id:'midnight',name:'Ink & sky',description:'Deep ink with pale blue lettering and teal edges.',bg:'#152E37',ink:'#C2EDFF',muted:'#A4C6CF',accent:'#D6FF62',tone:'#20434F',second:'#285565',light:'#347286'},
];
export const PATTERNS = [
  {id:'links',name:'Split links',description:'Paired forms gather into loose repeats at the corners.'},
  {id:'petals',name:'Turning petals',description:'Small fans rotate out from the frame, with an open center.'},
  {id:'ribbons',name:'Looped lines',description:'Broad, open loops weave around opposite corners.'},
];

// Exact PageMark geometry and DM Sans wordmark specifications from the website.
const MARK='M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z';
const xml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const text=(value,x,y,size,color,weight,tracking,anchor='start')=>`<text x="${x}" y="${y}" font-family="DM Sans" font-size="${size}" font-weight="${weight}" letter-spacing="${tracking}" text-anchor="${anchor}" fill="${color}">${xml(value)}</text>`;

function links(t){
  const cells=[
    [-70,12,1.04,-35],[202,14,.84,-35],[21,222,.89,-35],[279,225,.62,-35],[-67,447,.64,-35],
    [1640,-38,.88,-35],[1921,70,1.06,-35],[1800,285,.74,-35],[2019,470,.77,-35],
    [-78,874,.93,-35],[179,1024,.98,-35],[436,1092,.82,-35],[75,709,.59,-35],
    [1670,830,.76,-35],[1941,775,.88,-35],[1499,1056,.91,-35],[1777,1091,1.04,-35],
  ];
  return cells.map(([x,y,s,angle],i)=>`<g transform="translate(${x} ${y}) rotate(${angle}) scale(${s})"><path d="M-10 -124H-90A124 124 0 0 0 -90 124H-10Z" fill="${t.tone}"/><path d="M10 -124H90A124 124 0 0 1 90 124H10Z" fill="${i===3||i===13?'url(#edge-light)':t.second}"/></g>`).join('');
}

function fan(x,y,scale,angle,t,light=false){
  return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})">${[-68,-18,32,82].map((r,i)=>`<path d="M0 0C-74 -32 -119 -154 -20 -254C62 -192 76 -73 0 0Z" transform="rotate(${r})" fill="${light&&i===2?'url(#edge-light)':i%2?t.second:t.tone}"/>`).join('')}</g>`;
}
function petals(t){
  return fan(148,166,.93,-24,t,true)+fan(440,-65,.69,17,t)+fan(-57,404,.63,44,t)+
    fan(1772,30,1.16,51,t)+fan(1990,400,.62,-99,t)+
    fan(24,992,1.1,-66,t)+fan(352,1118,.78,-40,t)+
    fan(1822,1015,1.11,141,t,true)+fan(1490,1148,.66,70,t);
}

function loops(t){
  // Broad loop strokes use only the outer perimeter; there is no central veil.
  const bundle=(x,y,rotation,scale,light)=>`<g transform="translate(${x} ${y}) rotate(${rotation}) scale(${scale})">${[0,1,2,3,4].map((i)=>`<rect x="${-255+i*74}" y="${-365+i*20}" width="205" height="540" rx="102.5" fill="none" stroke="${light&&i===3?'url(#edge-light)':i%2?t.second:t.tone}" stroke-width="31"/>`).join('')}</g>`;
  return bundle(140,38,-42,1.02,true)+bundle(1900,113,37,.94,false)+
    bundle(-49,1099,32,.92,false)+bundle(1770,1145,-43,1.05,true);
}

function identity(t){
  // Separate text runs preserve mixed weights in the existing offline outline renderer.
  // Widths measured with the bundled DM Sans, including its GPOS kerning.
  const runs=[{value:'The',width:196.431,weight:300,tracking:-4.92},
    {value:'Recoup',width:422.82128571428575,weight:600,tracking:-1.1/28*123},
    {value:'Podcast',width:425.58,weight:300,tracking:-4.92}];
  const gap=34.44;let x=(1920-runs.reduce((sum,r)=>sum+r.width,0)-gap*2)/2;
  const title=runs.map(r=>{const node=text(r.value,x,570,123,t.ink,r.weight,r.tracking);x+=r.width+gap;return node;}).join('');
  return `<g aria-label="The Recoup Podcast"><g transform="translate(896.5 212) translate(-48 -41)"><path d="${MARK}" fill="${t.accent}"/></g>${title}${text('Conversations on AI and music.',960,655,38,t.muted,350,-1.1,'middle')}</g>`;
}

export function renderPodcastStudySVG({palette='forest',pattern='links',fontCSS='',backgroundOnly=false}={}){
  const t=PALETTES.find(p=>p.id===palette)||PALETTES[0];
  const p=PATTERNS.find(p=>p.id===pattern)||PATTERNS[0];
  const geometry=p.id==='petals'?petals(t):p.id==='ribbons'?loops(t):links(t);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" role="img"><title>${xml(`The Recoup Podcast — ${t.name} — ${p.name}`)}</title><defs><style>${fontCSS}</style><linearGradient id="edge-light" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${t.second}"/><stop offset="1" stop-color="${t.light}"/></linearGradient><clipPath id="canvas"><rect width="1920" height="1080"/></clipPath></defs><g clip-path="url(#canvas)"><rect width="1920" height="1080" fill="${t.bg}"/>${geometry}${backgroundOnly?'':identity(t)}</g></svg>`;
}
