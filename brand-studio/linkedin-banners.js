const root=document.querySelector('#banners');
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const [art,assets,blue,website,earlier]=await Promise.all(['linkedin-art-manifest.json','linkedin-refined-manifest.json','linkedin-blue-manifest.json','linkedin-website-manifest.json','linkedin-options-manifest.json'].map(async path=>(await fetch(path)).json()));
const render=items=>items.map(a=>`<article id="${a.id.replace('linkedin-','')}"><div class="mock"><img class="banner" src="${a.preview}" alt="${escape(a.title)}: ${escape(a.description)}"></div><div class="meta"><div><h2>${escape(a.title)}</h2><p>${escape(a.description)}</p></div><div class="downloads">${a.files.map(f=>`<a href="${f.path}" download>${escape(f.label)} ↓</a>`).join('')}</div></div></article>`).join('');

root.innerHTML=render([assets.find(a=>a.id==='linkedin-azure-music-rightsholders'),...art].filter(Boolean));
document.querySelector('#earlier-banners').innerHTML=render([...assets.filter(a=>a.id!=='linkedin-azure-music-rightsholders'),...blue,...website,...earlier]);
