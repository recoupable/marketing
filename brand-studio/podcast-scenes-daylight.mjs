import {podcastLockup} from './podcast-scenes-v4.mjs';

export const FORMATS = [
  {id:'badge',label:'Podcast badge',width:1200,height:288,description:'White podcast identity on blue sampled from the upper-right Daylight background. Use at 300 × 72 in a 1080p video.'},
  {id:'badge-overlay',label:'Corner badge overlay',width:1920,height:1080,description:'The badge placed inside the upper-right corner of the solo camera frame. Everything around it is transparent.'},
  {id:'title',label:'Title card',width:1920,height:1080,description:'The approved artwork, ready for the opening frame.'},
  {id:'cover',label:'Show cover',width:3000,height:3000,description:'A square cover with the same one-line identity.'},
  {id:'thumbnail',label:'Episode thumbnail',width:1920,height:1080,description:'A clear episode headline with a compact show identity.'},
  {id:'solo',label:'Solo video',width:1920,height:1080,description:'A transparent opening for one camera, with separate name labels.'},
  {id:'duo',label:'Two-person video',width:1920,height:1080,description:'Two equal camera openings, framed by the original blue artwork.'},
  {id:'vertical',label:'Vertical clip',width:1080,height:1920,description:'A portrait camera frame with space below for captions.'},
  {id:'quote',label:'Quote card',width:1080,height:1350,description:'An editable pull quote for sharing an idea from the episode.'},
  {id:'announcement',label:'Episode announcement',width:1080,height:1350,description:'A portrait announcement built around the episode title.'},
  {id:'endcard',label:'End card',width:1920,height:1080,description:'A quiet closing frame with room for two video recommendations.'},
  {id:'background',label:'Landscape background',width:1920,height:1080,description:'Clean artwork for video, slides, and custom compositions.'},
  {id:'square-background',label:'Square background',width:3000,height:3000,description:'A square crop without lettering.'},
  {id:'portrait-background',label:'Portrait background',width:1080,height:1920,description:'A portrait crop without lettering.'},
];
export const CAMERA_WINDOWS = {
  solo:[{x:64,y:178,width:1792,height:802,radius:20}],
  duo:[{x:64,y:218,width:876,height:704,radius:20},{x:980,y:218,width:876,height:704,radius:20}],
  vertical:[{x:48,y:330,width:984,height:1260,radius:20}],
};
// Median RGB from x1560–1824, y180–270 in the approved 1920 × 1080 background.
export const BADGE_BLUE='#1088EF';
export const DEFAULTS={title:'AI and the business of music',episode:'01',host:'Host name',guest:'Guest name',quote:'Good systems give people more time to think.'};
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const rect=(x,y,w,h,fill,r=0)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const txt=(v,x,y,size=40,weight=400,fill='#FFFFFF',anchor='start',family='DM Sans')=>`<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" letter-spacing="${family==='DM Sans'?-.032*size:0}" text-anchor="${anchor}">${esc(v)}</text>`;
const mono=(v,x,y,size=23)=>txt(v,x,y,size,400,'#D9F2FF','start','IBM Plex Mono');
const identity=(x,y,s)=>`<g transform="translate(${x-960*s} ${y-540*s}) scale(${s})">${podcastLockup('#FFFFFF')}</g>`;
// Width estimates are deliberately conservative; long words also wrap.
function measure(v,size){return [...v].reduce((n,c)=>n+(/[MW@%]/.test(c)?.85:/[ilIjt .,:;!'|]/.test(c)?.25:.54),0)*size;}
function fit(v,x,y,width,size=40){return txt(v,x,y,Math.min(size,width/Math.max(measure(v,1),1)));}
function paragraph(value,x,y,width,height,preferred=110){
  let rows=[],size=preferred;
  for(;size>=24;size-=2){
    rows=[''];
    for(const word of String(value).trim().split(/\s+/)){
      if(measure(word,size)>width){
        if(rows.at(-1))rows.push('');
        for(const char of word){if(measure(rows.at(-1)+char,size)>width)rows.push('');rows[rows.length-1]+=char;}
      } else {const trial=[rows.at(-1),word].filter(Boolean).join(' ');if(measure(trial,size)>width)rows.push(word);else rows[rows.length-1]=trial;}
    }
    if(rows.length*size*1.13<=height)break;
  }
  return rows.map((row,i)=>txt(row,x,y+i*size*1.13,size,400)).join('');
}
function label(name,role,x,y,width=540){return rect(x,y,width,78,'#075AA8',12)+fit(name,x+22,y+37,width-44,30)+mono(role,x+22,y+61,15);}
export function podcastBadge(){return rect(0,0,1200,288,BADGE_BLUE,52)+identity(600,144,1.29);}
export function renderDaylightSVG(options={}){
  const o={...DEFAULTS,...options};
  const f=FORMATS.find(f=>f.id===o.format)||FORMATS[0];
  const {width:w,height:h}=f;
  const windows=CAMERA_WINDOWS[f.id]||[];
  const bg=`<image href="${esc(o.backgroundHref||'assets/podcast-kit-daylight/daylight-background.png')}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/>`;
  let content='',labels='';
  switch(f.id){
    case 'badge':content=podcastBadge();break;
    case 'badge-overlay':content=`<g transform="translate(1524 210) scale(.25)">${podcastBadge()}</g>`;break;
    case 'title':content=podcastLockup('#FFFFFF');break;
    case 'cover':content=identity(1500,1500,2.68);break;
    case 'thumbnail':content=identity(389,119,.67)+mono(`EPISODE ${o.episode}`,108,324)+paragraph(o.title,100,473,1490,390,133)+fit(`With ${o.guest}`,108,947,1550,38);break;
    case 'solo':labels=label(o.host,'HOST',92,864,570);break;
    case 'duo':labels=label(o.host,'HOST',92,806,570)+label(o.guest,'GUEST',1008,806,570);break;
    case 'vertical':content=mono(`EPISODE ${o.episode}`,58,1778,25);labels=label(o.guest,'GUEST',74,1468,650);break;
    case 'quote':content=identity(540,111,.93)+txt('“',70,409,190,300,'#C2EDFF')+paragraph(o.quote,78,474,914,515,88)+fit(o.guest,80,1130,920,38)+mono(`EPISODE ${o.episode}`,80,1194,21);break;
    case 'announcement':content=identity(540,111,.93)+mono(`EPISODE ${o.episode}`,80,397,24)+paragraph(o.title,74,521,928,440,104)+fit(`With ${o.guest}`,80,1095,920,36)+mono('WATCH THE EPISODE',80,1220,23);break;
    case 'endcard':content=identity(960,244,1)+txt('Keep the conversation going.',960,395,46,300,'#FFFFFF','middle')+mono('WATCH ANOTHER EPISODE',180,893,24)+mono('SUBSCRIBE FOR MORE',1068,893,24);break;
  }
  if(o.identityOnly)content=podcastLockup('#FFFFFF');
  const mask=windows.length?`<mask id="camera" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">${rect(0,0,w,h,'white')}${windows.map(v=>rect(v.x,v.y,v.width,v.height,'black',v.radius)).join('')}</mask>`:'';
  const placeholders=o.preview?windows.map((v,i)=>rect(v.x,v.y,v.width,v.height,'#E6EEF3',v.radius)+txt(windows.length===1?'Your camera footage':i?'Guest camera':'Host camera',v.x+v.width/2,v.y+v.height/2,windows.length===1?35:30,400,'#466475','middle')).join(''):'';
  let body=o.labelsOnly?labels:o.identityOnly||f.id==='badge'||f.id==='badge-overlay'?content:`<g${windows.length?' mask="url(#camera)"':''}>${bg}${content}</g>${placeholders}${o.preview?labels:''}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${esc(f.label)} — Recoup Podcast</title><defs><style>${o.fontCSS||''}</style>${mask}</defs>${body}</svg>`;
}
