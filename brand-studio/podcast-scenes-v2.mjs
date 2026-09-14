import { patternDefs, patternField } from './podcast-patterns-v2.mjs';

export const THEMES = [
  { id:'cut', name:'Cut & shift', description:'Blue folds, sharp lime intervals, and asymmetrical compositions.', bg:'#0565BB', ink:'#FFFFFF', muted:'#C2EDFF', accent:'#D6FF62' },
  { id:'weave', name:'Repeat & reveal', description:'A forest repeat, lime lettering, and light editorial panels.', bg:'#132B26', ink:'#D6FF62', muted:'#C4DCD1', accent:'#D6FF62' },
  { id:'layer', name:'Open & overlap', description:'Lime layers, expansive crops, and small blue interruptions.', bg:'#D6FF62', ink:'#132B26', muted:'#304E40', accent:'#007EBD' },
];
export const FORMATS = [
  {id:'intro',label:'Animated opening'}, {id:'cover',label:'Show cover'},
  {id:'thumbnail',label:'Episode thumbnail'}, {id:'solo',label:'One speaker'},
  {id:'duo',label:'Two speakers'}, {id:'vertical',label:'Vertical clip'},
  {id:'quote',label:'Quote card'}, {id:'endcard',label:'End card'},
  {id:'background',label:'Clean background'},
];
export const DIMENSIONS = Object.fromEntries(FORMATS.map(f=>[f.id,
  f.id==='cover'?{width:3000,height:3000}:f.id==='vertical'?{width:1080,height:1920}:f.id==='quote'?{width:1080,height:1350}:{width:1920,height:1080}
]));
export const CAMERA_WINDOWS = {
  solo:[{x:64,y:154,width:1792,height:814,radius:22}],
  duo:[{x:64,y:210,width:876,height:690,radius:22},{x:980,y:210,width:876,height:690,radius:22}],
  vertical:[{x:52,y:326,width:976,height:1216,radius:24}],
};

const MARK = 'M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z';
const xml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, Number(n) || 0));
const ease = n => { const x = clamp(n); return x * x * (3 - 2 * x); };
const rect = (x, y, w, h, fill, radius = 0, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" ${extra}/>`;
const mark = (x, y, h, color) => `<g transform="translate(${x} ${y}) scale(${h / 141}) translate(-48 -41)"><path d="${MARK}" fill="${color}"/></g>`;
const text = (value, x, y, size, color, weight = 450, tracking = -.045 * size, extra = '') => `<text x="${x}" y="${y}" font-family="DM Sans" font-size="${size}" font-weight="${weight}" letter-spacing="${tracking}" fill="${color}" ${extra}>${xml(value)}</text>`;
const mono = (value, x, y, size, color, extra = '') => `<text x="${x}" y="${y}" font-family="IBM Plex Mono" font-size="${size}" font-weight="400" letter-spacing="${size * .06}" fill="${color}" ${extra}>${xml(value)}</text>`;

// Conservative font-width estimates keep long names and unbroken titles within
// their own regions in both the browser and offline SVG renderer.
function estimatedWidth(value, size, tracking = -.045 * size) {
  let units = 0;
  for (const character of String(value)) {
    units += /[MW@%]/.test(character) ? .95 : /[ilI.,:;'!|]/.test(character) ? .28 : /[ m]/.test(character) ? (character === ' ' ? .3 : .85) : /[A-Z0-9]/.test(character) ? .72 : .62;
  }
  return units * size + Math.max(0, String(value).length - 1) * tracking;
}

function headlineLayout(input, maxWidth = 1540, maxHeight = 455, preferred = 110) {
  const content = String(input).trim().replace(/\s+/g, ' ').slice(0, 180) || 'Untitled episode';
  for (let size = preferred; size >= 30; size -= 2) {
    const rows = []; let line = '';
    for (const word of content.split(' ')) {
      const candidate = line ? line + ' ' + word : word;
      if (estimatedWidth(candidate, size) <= maxWidth) { line = candidate; continue; }
      if (line) { rows.push(line); line = ''; }
      for (const character of word) {
        if (line && estimatedWidth(line + character, size) > maxWidth) { rows.push(line); line = ''; }
        line += character;
      }
    }
    if (line) rows.push(line);
    if (rows.length > 1) {
      const last = rows.length - 1;
      while (estimatedWidth(rows[last], size) < estimatedWidth(rows[last - 1], size) * .55) {
        const preceding = rows[last - 1].split(' ');
        if (preceding.length < 3) break;
        const next = preceding.at(-1) + ' ' + rows[last];
        if (estimatedWidth(next, size) > maxWidth) break;
        preceding.pop(); rows[last - 1] = preceding.join(' '); rows[last] = next;
      }
    }
    if (rows.length <= 4 && rows.length * size * 1.136 <= maxHeight) return { rows, size };
  }
  return { rows: [content.slice(0, 90), content.slice(90)], size: 30 };
}

function fitSingle(value, x, y, maxWidth, preferred, color, weight = 450, anchor = 'start') {
  const content = String(value).trim().replace(/\s+/g, ' ');
  const size = Math.min(preferred, preferred * maxWidth / Math.max(1, estimatedWidth(content, preferred, -.02 * preferred)));
  return text(content, x, y, size, color, weight, -.02 * size, `text-anchor="${anchor}"`);
}

function showLockup(t, x = 68, y = 41, h = 40) {
  const s = h / 40;
  return mark(x, y, h, t.ink) + text('Recoup', x + 53 * s, y + 35 * s, 42 * s, t.ink, 600, -1.65 * s) + text('Podcast', x + 208 * s, y + 35 * s, 42 * s, t.ink, 450, -1.65 * s);
}
// Headlines keep the preferred 450 weight and 110 px cap; long titles fit
// inside their assigned region instead of colliding with a pattern or label.
function paragraph(value,x,y,maxWidth,maxHeight,size,color,anchor='start') {
  const fitted=headlineLayout(value,maxWidth,maxHeight,size);
  const chosen=Math.min(size,fitted.size);
  return fitted.rows.map((row,i)=>text(row,x,y+i*chosen*1.136,chosen,color,450,-chosen*.045,`text-anchor="${anchor}"`)).join('');
}
function episodeText(value){return String(value).trim().slice(0,12)||'01';}
function smallLock(t,x=76,y=46,h=40){return showLockup(t,x,y,h);}
function cameraPreview(w,label){
  return rect(w.x,w.y,w.width,w.height,'#EDF2F0',w.radius)+
    rect(w.x+w.width*.09,w.y+w.height*.10,w.width*.82,w.height*.8,'#E1E9E7',Math.min(28,w.radius))+
    mono(label,w.x+w.width/2,w.y+w.height/2+9,23,'#586F78','text-anchor="middle"');
}
function opening(t,time){
  const a=ease((time-.15)/.65), b=ease((time-1.1)/.95);
  if(t.id==='cut')return `<g opacity="${a}">${mark(1345,307,270,t.accent)}</g><g opacity="${b}" transform="translate(${24*(1-b)} 0)">${text('The Recoup',112,440,125,t.ink)}${text('Podcast',112,586,125,t.ink)}${mono('AI / MUSIC / THE PEOPLE BUILDING IT',119,726,22,t.muted)}</g>`;
  if(t.id==='weave')return `<g opacity="${a}">${mark(896,212,141,t.ink)}</g><g opacity="${b}" transform="translate(0 ${20*(1-b)})">${text('The Recoup Podcast',960,570,123,t.ink,450,-5.54,'text-anchor="middle"')}${text('Conversations on AI and music.',960,655,38,t.muted,400,-1.1,'text-anchor="middle"')}</g>`;
  return `<g opacity="${a}">${mark(122,115,105,t.ink)}</g><g opacity="${b}" transform="translate(0 ${20*(1-b)})">${text('The Recoup',112,544,132,t.ink)}${text('Podcast',112,694,132,t.ink)}${mono('AI / MUSIC / THE PEOPLE BUILDING IT',121,811,22,t.muted)}</g>`;
}
function showCover(t,time){
  // Use a square design space so patterns keep their proportions on show art.
  let body=patternField(t.id,time,{coverage:t.id==='weave'?'large':'medium',width:1920,height:1920});
  if(t.id==='weave'){
    body+=rect(150,490,1620,1000,'#F0F7FA',12)+mark(242,603,124,'#132B26');
    body+=text('The Recoup',240,959,189,'#132B26')+text('Podcast',240,1170,189,'#132B26');
    body+=mono('AI AND THE BUSINESS OF MUSIC',250,1384,26,'#304E40');
  }else if(t.id==='cut'){
    body+=mark(149,148,152,t.accent)+text('The Recoup',139,763,203,t.ink)+text('Podcast',139,994,203,t.ink);
    body+=mono('AI AND THE BUSINESS OF MUSIC',151,1130,27,t.muted);
  }else{
    body+=mark(145,145,140,t.ink)+text('The Recoup',133,657,211,t.ink)+text('Podcast',133,897,211,t.ink);
    body+=mono('AI AND THE BUSINESS OF MUSIC',145,1030,27,t.muted);
  }
  return `<g transform="scale(1.5625)">${body}</g>`;
}
function thumbnail(t,title,guest,episode){
  let x=112,y=440,ink=t.ink,muted=t.muted,width=1100;
  let body='';
  if(t.id==='weave'){
    body+=rect(66,207,1246,765,'#F0F7FA',8);x=119;y=449;ink='#132B26';muted='#586F78';width=1090;
    body+=mono(`EPISODE ${episodeText(episode)}`,x,300,24,muted);
  }else if(t.id==='layer'){
    y=495;body+=mono(`EPISODE ${episodeText(episode)}`,x,320,24,muted);
  }else body+=mono(`EPISODE ${episodeText(episode)}`,x,282,24,muted);
  body+=smallLock(t,112,75,46);
  body+=paragraph(title,x,y,width,355,110,ink);
  body+=fitSingle(`With ${guest||'Guest name'}`,x,891,1070,35,ink);
  return body;
}
function cameras(t,mode,windows,preview,host,guest,title,episode){
  let body='';
  if(mode==='vertical'){
    body+=smallLock(t,63,60,43)+mono(`EP. ${episodeText(episode)}`,1010,98,22,t.muted,'text-anchor="end"');
    body+=paragraph(title,62,209,946,132,65,t.ink);
    if(preview)body+=cameraPreview(windows[0],'YOUR VERTICAL VIDEO');
    body+=fitSingle(host||'Host name',67,1635,870,43,t.ink,500);
    body+=text('The Recoup Podcast',67,1692,30,t.muted,400,-.8);
    body+=mono('WATCH THE FULL CONVERSATION',67,1833,22,t.muted);
  }else{
    body+=smallLock(t)+mono(`EP. ${episodeText(episode)}`,1840,78,23,t.muted,'text-anchor="end"');
    if(mode==='duo')body+=fitSingle(title,76,162,1750,38,t.ink);
    if(preview)body+=windows.map((w,i)=>cameraPreview(w,mode==='solo'?'YOUR CAMERA':i?'GUEST CAMERA':'HOST CAMERA')).join('');
    if(mode==='solo'){
      body+=fitSingle(host||'Host name',80,1030,600,32,t.ink,500);
      body+=fitSingle(title,1840,1030,1100,29,t.muted,400,'end');
    }else{
      body+=fitSingle(host||'Host name',81,969,820,35,t.ink,500);
      body+=fitSingle(guest||'Guest name',997,969,820,35,t.ink,500);
      body+=mono('THE RECOUP PODCAST',81,1040,20,t.muted);
    }
  }
  return body;
}
function quoteCard(t,quote,host){
  let body=smallLock(t,68,67,43),ink=t.ink;
  if(t.id==='weave'){body+=rect(58,278,964,871,'#F0F7FA',10);ink='#132B26';}
  body+=text('“',74,486,172,ink);
  body+=paragraph(quote,82,589,916,405,82,ink);
  body+=fitSingle(host||'Host name',86,1060,844,35,ink,500);
  body+=mono('FROM THE CONVERSATION',86,1269,21,t.muted);
  return body;
}
function closing(t){
  const x=t.id==='weave'?960:112,anchor=t.id==='weave'?'middle':'start';
  let body=smallLock(t,112,76,46);
  body+=text('Keep the conversation',x,452,104,t.ink,450,-4.68,`text-anchor="${anchor}"`);
  body+=text('going.',x,571,104,t.ink,450,-4.68,`text-anchor="${anchor}"`);
  body+=text('Subscribe to The Recoup Podcast.',x,721,39,t.muted,400,-1.1,`text-anchor="${anchor}"`);
  return body;
}

export function renderPodcastSVG({theme='cut',format='intro',title='AI and the business of music',host='Host name',guest='Guest name',episode='01',quote='Good systems give people more time to think.',time=3,preview=true,fontCSS='',chromeOnly=false}={}){
  const t=THEMES.find(t=>t.id===theme)||THEMES[0];
  const mode=FORMATS.some(f=>f.id===format)?format:'intro';
  const {width,height}=DIMENSIONS[mode],windows=CAMERA_WINDOWS[mode]||[];
  const frame=!preview&&windows.length&&!chromeOnly;
  const mask=frame?`<mask id="camera-mask">${rect(0,0,width,height,'white')}${windows.map(w=>rect(w.x,w.y,w.width,w.height,'black',w.radius)).join('')}</mask>`:'';
  const coverage=mode==='intro'||mode==='background'?'large':mode==='solo'||mode==='duo'||mode==='vertical'?'small':t.id==='weave'?'large':'medium';
  let body=chromeOnly&&windows.length?'':patternField(t.id,Math.max(0,Number(time)||0),{coverage,width,height});
  if(mode==='cover')body=showCover(t,time);
  if(mode==='intro')body+=opening(t,Math.max(0,Math.min(6,time)));
  if(mode==='thumbnail')body+=thumbnail(t,String(title).slice(0,96),String(guest).slice(0,40),episode);
  if(windows.length)body+=cameras(t,mode,windows,preview,String(host).slice(0,40),String(guest).slice(0,40),String(title).slice(0,96),episode);
  if(mode==='quote')body+=quoteCard(t,String(quote).slice(0,150),String(host).slice(0,40));
  if(mode==='endcard')body+=closing(t);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${xml(`The Recoup Podcast — ${t.name} — ${mode}`)}</title><defs><style>${fontCSS}</style>${patternDefs(t.id)}${mask}</defs><g${frame?' mask="url(#camera-mask)"':''}>${body}</g></svg>`;
}
