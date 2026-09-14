import {FORMATS,DEFAULTS,CAMERA_WINDOWS,renderDaylightSVG} from './podcast-scenes-daylight.mjs';
const $=s=>document.querySelector(s);
const initial=new URL(location.href).searchParams.get('format');
const state={...DEFAULTS,format:FORMATS.some(f=>f.id===initial)?initial:'title'};
let backgroundHref='',fontCSS='',ready=false;
const asset='assets/podcast-kit-daylight/';
async function dataURI(path){const r=await fetch(path);if(!r.ok)throw Error(`Could not load ${path}`);const blob=await r.blob();return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});}
function source(extra={}){return renderDaylightSVG({...state,backgroundHref,fontCSS,...extra});}
function render(){
  const f=FORMATS.find(f=>f.id===state.format),camera=Boolean(CAMERA_WINDOWS[state.format]);
  $('#stage').innerHTML=source({preview:true});$('#stage').classList.toggle('portrait',f.height>f.width);
  $('#preview-title').textContent=f.label;$('#dimensions').textContent=`${f.width} × ${f.height}`;$('#format-note').textContent=f.description;
  $('#format').value=f.id;$('#layer-field').hidden=!camera;
  let fields=false;document.querySelectorAll('[data-fields]').forEach(el=>{el.hidden=!el.dataset.fields.split(' ').includes(f.id);if(!el.hidden)fields=true;});
  $('#example-note').hidden=!fields;$('#fixed-note').hidden=fields;
  document.querySelectorAll('[data-format]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.format===f.id)));
  const u=new URL(location.href);u.searchParams.set('format',f.id);history.replaceState(null,'',u);
}
function save(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
async function download(kind){
  if(!ready)return;$('#png').disabled=$('#svg').disabled=true;
  try{
    const f=FORMATS.find(f=>f.id===state.format),labelsOnly=Boolean(CAMERA_WINDOWS[f.id])&&$('#layer').value==='labels';
    const blob=new Blob([source({preview:false,labelsOnly})],{type:'image/svg+xml'}),name=`recoup-podcast-${f.id}${labelsOnly?'-labels':''}`;
    if(kind==='svg')save(blob,name+'.svg');else{
      const url=URL.createObjectURL(blob);
      try{const im=new Image();im.src=url;await im.decode();const canvas=document.createElement('canvas');canvas.width=f.width;canvas.height=f.height;canvas.getContext('2d').drawImage(im,0,0);const png=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('PNG export failed'))));save(png,name+'.png');}finally{URL.revokeObjectURL(url);}
    }
    $('#status').textContent=labelsOnly?'Name labels downloaded on transparency.':CAMERA_WINDOWS[f.id]?'Frame downloaded with transparent camera openings.':'Downloaded with your current text.';
  }catch(e){$('#status').textContent=`Download failed: ${e.message}`;}finally{$('#png').disabled=$('#svg').disabled=false;}
}
async function start(){
  $('#format').innerHTML=FORMATS.map(f=>`<option value="${f.id}">${f.label}</option>`).join('');
  $('#template-grid').innerHTML=FORMATS.map(f=>`<button class="template" data-format="${f.id}" aria-pressed="false"><figure><img loading="lazy" src="${asset}${f.id}${CAMERA_WINDOWS[f.id]?'-preview':''}.png" alt="${f.label}"></figure><span class="template-caption">${f.label}<small>${f.width} × ${f.height}</small></span></button>`).join('');
  [backgroundHref,fontCSS]=await Promise.all([dataURI(asset+'daylight-background.png'),Promise.all([['DM Sans','dm-sans.woff2'],['IBM Plex Mono','ibm-plex-mono.woff2']].map(async([name,file])=>`@font-face{font-family:'${name}';src:url('${await dataURI('assets/fonts/'+file)}') format('woff2');font-weight:100 1000;}`)).then(a=>a.join(''))]);
  await document.fonts.ready;ready=true;render();$('#png').disabled=$('#svg').disabled=false;
  $('#format').addEventListener('change',e=>{state.format=e.target.value;$('#layer').value='frame';render();});
  $('#template-grid').addEventListener('click',e=>{const b=e.target.closest('[data-format]');if(b){state.format=b.dataset.format;$('#layer').value='frame';render();$('#preview').scrollIntoView({behavior:'instant'});}});
  $('#editor').addEventListener('submit',e=>e.preventDefault());$('#editor').addEventListener('input',e=>{if(Object.hasOwn(DEFAULTS,e.target.name)){state[e.target.name]=e.target.value;render();}});
  $('#png').addEventListener('click',()=>download('png'));$('#svg').addEventListener('click',()=>download('svg'));
}
start().catch(e=>{$('#status').textContent=e.message;});
