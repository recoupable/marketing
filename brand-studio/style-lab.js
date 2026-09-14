const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const backgrounds = [['fine-grain','Fine grain'],['glass','Diffused glass'],['airbrush','Airbrush']];
const colorways = [
  ['blue-major','Blue leads','Mostly blue, with a smaller lime area.'],
  ['lime-major','Lime leads','The same arrangement, with lime and blue swapping prominence.'],
  ['reverse','Reverse the direction','Blue still dominates; lime moves to the opposite corner.'],
  ['inverted','Invert the colors','An orange/violet study, using inverted blue/lime anchor colors.'],
];
const illustrations = [['ink','Expressive ink'],['paper','Cut paper'],['airbrush','Airbrush illustration'],['glass','Frosted glass']];
const subjects = [['record','Record + sleeve'],['book','Open book']];
const typeStyles = [
  ['bold','Bold sentence case','Heavy weight, close spacing, a direct headline.'],
  ['stacked','Stacked capitals','Uppercase, compact lines, a poster-like rhythm.'],
  ['editorial','Open editorial','Lighter weight, more breathing room, a small section label.'],
  ['highlight','Highlighted phrase','Bold type with a lime highlight beneath the final phrase.'],
  ['caption','Headline + caption','A smaller, bottom-aligned headline with a fine dividing rule.'],
];
const defaultState = {step:'backgrounds',family:'fine-grain',colorway:'blue-major',subject:'record',style:'ink',type:'bold',ink:'auto',headline:'AI and the business of music.',showArt:true};
const storageKey = 'recoup-style-combinations:v1';
const nameOf = (options,id) => options.find(([key])=>key===id)?.[1] || id;
const buttons = (options,key,selected) => options.map(([id,label])=>`<button type="button" data-sl-${key}="${id}" aria-pressed="${id===selected}">${esc(label)}</button>`).join('');
const options = (items,selected) => items.map(([id,label])=>`<option value="${id}" ${id===selected?'selected':''}>${esc(label)}</option>`).join('');

export async function initStyleLab({copy,notify}) {
  const root = document.querySelector('#style-lab');
  const response = await fetch('style-lab-manifest.json');
  if (!response.ok) throw new Error('The style studies could not load.');
  const assets = await response.json();
  const state = {...defaultState};
  let saved = [];
  function fitCoverText(element) {
    const heading=element.querySelector('h3');
    heading.style.fontSize='';
    const kicker=element.querySelector('.sl-cover-kicker');
    const labelHeight=kicker?kicker.getBoundingClientRect().height+parseFloat(getComputedStyle(kicker).marginTop)+parseFloat(getComputedStyle(kicker).marginBottom):0;
    const available=element.getBoundingClientRect().height*.7-labelHeight;
    for(let i=0;i<5 && heading.getBoundingClientRect().height>available;i++) {
      const size=parseFloat(getComputedStyle(heading).fontSize);
      heading.style.fontSize=`${size*.9}px`;
    }
  }
  const coverObserver = new ResizeObserver(entries=>entries.forEach(entry=>fitCoverText(entry.target)));
  function observeCovers() {coverObserver.disconnect();root.querySelectorAll('.sl-cover').forEach(element=>coverObserver.observe(element));}
  const validState = value => value && backgrounds.some(([id])=>id===value.family) && colorways.some(([id])=>id===value.colorway) && subjects.some(([id])=>id===value.subject) && illustrations.some(([id])=>id===value.style) && typeStyles.some(([id])=>id===value.type) && ['auto','ivory','forest'].includes(value.ink) && typeof value.headline==='string' && value.headline.length<=90 && typeof value.showArt==='boolean';
  try { const data=JSON.parse(localStorage.getItem(storageKey)||'[]'); if(Array.isArray(data)) saved=data.filter(validState).slice(0,24); } catch { /* The lab remains usable without browser storage. */ }

  const backgroundFor = config => assets.find(a=>a.kind==='background' && a.family===config.family && a.colorway===config.colorway);
  const illustrationFor = config => assets.find(a=>a.kind==='illustration' && a.subject===config.subject && a.style===config.style);
  const inkFor = config => config.ink==='auto' ? (backgroundFor(config)?.suggestedInk?.[config.type] || 'ivory') : config.ink;
  const splitHighlight = text => { const match=String(text).match(/\S+(?:[ \t]+\S+)?[ \t]*$/);if(!match)return esc(text);return `${esc(text.slice(0,match.index))}<mark>${esc(match[0])}</mark>`; };
  function cover(config) {
    const bg=backgroundFor(config),art=illustrationFor(config);
    return `<div class="sl-cover" data-type="${config.type}" data-ink="${inkFor(config)}" data-art="${config.showArt}"><img class="sl-cover-background" src="${esc(bg.preview)}" alt="${esc(bg.title)}">${config.showArt?`<img class="sl-cover-art" src="${esc(art.preview)}" alt="${esc(art.title)}">`:''}<div class="sl-cover-copy">${config.type==='editorial'?'<span class="sl-cover-kicker">RECOUP / INSIGHTS</span>':''}<h3>${config.type==='highlight'?splitHighlight(config.headline):esc(config.headline)}</h3>${config.type==='caption'?'<span class="sl-cover-kicker">RECOUP / INSIGHTS</span>':''}</div></div>`;
  }
  function recipe() {
    const bg=backgroundFor(state),art=illustrationFor(state);
    return `RECOUP EDITORIAL COMPOSITION — PROPOSED\n\nArticle / exact headline: ${state.headline}\nCore argument: [Add the article’s specific argument before generating.]\n\nBACKGROUND\nStyle: ${nameOf(backgrounds,state.family)}\nColor treatment: ${nameOf(colorways,state.colorway)}\nUse this selected reference for material and palette: ${bg.preview}\nBackground prompt:\n${bg.prompt}\n\nILLUSTRATION\n${state.showArt?`Style: ${nameOf(illustrations,state.style)}\nCurrent study subject: ${nameOf(subjects,state.subject)}\nReference: ${art.preview}\nChoose a NEW subject or action that expresses the article’s argument. Preserve this illustration medium and material, not the same object on every article. Generate on a true transparent background, with no type, logo, scene, or enclosing panel.\nStudy illustration prompt:\n${art.prompt}`:'No illustration for this composition.'}\n\nTYPOGRAPHY\n${nameOf(typeStyles,state.type)}. Use editable DM Sans. Exact headline: ${JSON.stringify(state.headline)}. Type color: ${inkFor(state)}. Keep a 7% safe margin and clear space between type and subject. Check contrast behind every word. The lab uses real editable text, not lettering embedded in the generated image.\n\nCOMPOSITION\nLayer the background, transparent illustration, and editable type separately. Plan a clear type area and a distinct subject area. Change only one layer when comparing styles. For a new article, vary subject, composition, and dominant color against the previous six covers; choose relevance before novelty. Use actual source material for factual diagrams, screenshots, and data.\n\nSTATUS\nThis is a saved direction for review, not an approved brand rule. The orange/violet inversion is a palette experiment. Do not change the production brand automatically.`;
  }
  function stageTitle(title,description) { return `<div class="sl-section-heading"><h2>${title}</h2><p>${description}</p></div>`; }
  function renderBackgrounds() {
    return `${stageTitle('Choose the atmosphere.','Select a material, then compare four color arrangements. Artwork and type are hidden so the background is the only variable.')}<div class="sl-choice-row" role="group" aria-label="Background material">${buttons(backgrounds,'family',state.family)}</div><div class="sl-study-grid">${colorways.map(([id,label,description])=>{const asset=backgroundFor({...state,colorway:id});return `<article class="sl-study-card"><button class="sl-image-choice" data-sl-colorway="${id}" aria-label="Choose ${label}" aria-pressed="${state.colorway===id}"><img src="${esc(asset.preview)}" alt="${esc(asset.title)}" loading="lazy">${state.colorway===id?'<span class="sl-selected">Selected</span>':''}</button><h3>${label}</h3><p>${description}</p><a class="sl-download" href="${esc(asset.preview)}" download>Download background ↓</a></article>`;}).join('')}</div>`;
  }
  function renderIllustrations() {
    return `${stageTitle('Choose the illustration style.','One subject, four treatments, one neutral backdrop. Switch subjects to see whether a style works beyond a single object.')}<div class="sl-choice-row" role="group" aria-label="Illustration subject">${buttons(subjects,'subject',state.subject)}</div><div class="sl-study-grid">${illustrations.map(([id,label])=>{const asset=illustrationFor({...state,style:id});return `<article class="sl-study-card"><button class="sl-image-choice sl-art-choice" data-sl-style="${id}" aria-label="Choose ${label}" aria-pressed="${state.style===id}"><img src="${esc(asset.preview)}" alt="${esc(asset.title)}" loading="lazy">${state.style===id?'<span class="sl-selected">Selected</span>':''}</button><h3>${label}</h3><p>${esc(asset.description)}</p><a class="sl-download" href="${esc(asset.preview)}" download>Download transparent artwork ↓</a></article>`;}).join('')}</div>`;
  }
  function renderTypeCards() {
    const held={...defaultState,headline:state.headline};
    return typeStyles.map(([id,label,description])=>`<article class="sl-study-card"><button class="sl-type-choice" data-sl-type="${id}" aria-label="Choose ${label}" aria-pressed="${state.type===id}">${cover({...held,type:id})}${state.type===id?'<span class="sl-selected">Selected</span>':''}</button><h3>${label}</h3><p>${description}</p></article>`).join('');
  }
  function renderType() {
    return `${stageTitle('Choose how the words feel.','Every option uses the same headline, blue-dominant fine grain, and ink illustration. Only the type treatment changes.')}<label class="sl-headline-field">Try your headline<input id="sl-type-headline" maxlength="90" value="${esc(state.headline)}"></label><div id="sl-type-grid" class="sl-study-grid">${renderTypeCards()}</div>`;
  }
  function renderMixer() {
    return `${stageTitle('Bring your choices together.','Swap one layer at a time. Save combinations you want to discuss; the saved recipe preserves the references and type treatment.')}<div class="sl-mixer"><div class="sl-mixer-preview"><div id="sl-live-cover">${cover(state)}</div><p class="sl-preview-caption" id="sl-live-caption"></p><div class="sl-mix-actions"><button type="button" class="outline-button" data-sl-save>Save combination</button><button type="button" class="outline-button" data-sl-copy>Copy recipe</button></div><p class="small muted">Saved in this browser as a draft for review. No styles are automatically approved.</p></div><form class="sl-mixer-controls" onsubmit="return false"><label>Background material<select name="family">${options(backgrounds,state.family)}</select></label><label>Color arrangement<select name="colorway">${options(colorways,state.colorway)}</select></label><label>Subject<select name="subject">${options(subjects,state.subject)}</select></label><label>Illustration style<select name="style">${options(illustrations,state.style)}</select></label><label>Type style<select name="type">${options(typeStyles,state.type)}</select></label><label>Type color<select name="ink">${options([['auto','Suggested for this background'],['ivory','Ivory'],['forest','Forest']],state.ink)}</select></label><label class="sl-full">Headline<textarea name="headline" maxlength="90" rows="3">${esc(state.headline)}</textarea></label><label class="sl-checkbox sl-full"><input type="checkbox" name="showArt" ${state.showArt?'checked':''}> Show illustration</label></form></div><details class="sl-prompt"><summary>Read this combination’s recipe</summary><pre id="sl-live-recipe"></pre></details><section class="sl-saved"><h3>Saved combinations</h3><div id="sl-saved-list"></div></section>`;
  }
  function updateMix() {
    root.querySelector('#sl-live-cover').innerHTML=cover(state);
    root.querySelector('#sl-live-caption').textContent=`${nameOf(backgrounds,state.family)} · ${nameOf(colorways,state.colorway)} · ${state.showArt?nameOf(illustrations,state.style):'No illustration'} · ${nameOf(typeStyles,state.type)}`;
    root.querySelector('#sl-live-recipe').textContent=recipe();
    observeCovers();
  }
  function renderSaved() {
    root.querySelector('#sl-saved-list').innerHTML=saved.length?`<div class="sl-saved-grid">${saved.map((config,i)=>`<div class="sl-saved-item"><button type="button" data-sl-load="${i}" aria-label="Load saved combination ${i+1}">${cover(config)}<span>Combination ${i+1} · ${nameOf(backgrounds,config.family)} / ${nameOf(colorways,config.colorway)}</span></button><button type="button" class="sl-remove" data-sl-remove="${i}" aria-label="Remove saved combination ${i+1}">Remove</button></div>`).join('')}</div>`:'<p class="muted">Save a combination from the mixer to keep it here.</p>';
    observeCovers();
  }
  function render() {
    root.innerHTML=`<div class="sl-steps" role="group" aria-label="Style comparison steps">${buttons([['backgrounds','01 Backgrounds'],['illustrations','02 Illustrations'],['type','03 Typography'],['mix','04 Mix your choices']],'step',state.step)}</div><div class="sl-current"><span>Current choices</span><p>${nameOf(backgrounds,state.family)} / ${nameOf(colorways,state.colorway)} <span>+</span> ${nameOf(illustrations,state.style)} <span>+</span> ${nameOf(typeStyles,state.type)}</p></div><div class="sl-stage">${state.step==='backgrounds'?renderBackgrounds():state.step==='illustrations'?renderIllustrations():state.step==='type'?renderType():renderMixer()}</div>`;
    if(state.step==='mix') { updateMix();renderSaved(); }
    observeCovers();
  }
  root.addEventListener('click',event=>{
    const button=event.target.closest('button'); if(!button)return;
    for(const key of ['step','family','colorway','subject','style','type']) {
      const dataKey=`sl${key[0].toUpperCase()}${key.slice(1)}`;
      if(button.dataset[dataKey]) { state[key]=button.dataset[dataKey];render();root.querySelector(`[data-sl-${key}="${state[key]}"]`)?.focus({preventScroll:true});return; }
    }
    if(button.hasAttribute('data-sl-copy')) copy(recipe());
    if(button.hasAttribute('data-sl-save')) {
      const config={...state}; delete config.step;
      if(saved.some(item=>JSON.stringify(item)===JSON.stringify(config))) { notify('This combination is already saved.');return; }
      if(saved.length>=24){notify('You have 24 saved combinations. Copy this recipe to keep another.');return;}
      saved.push(config);
      try {localStorage.setItem(storageKey,JSON.stringify(saved));notify('Combination saved for review.');}catch{notify('Saved for this session. Copy the recipe to keep it.');}
      renderSaved();
    }
    if(button.hasAttribute('data-sl-load')) { Object.assign(state,saved[Number(button.dataset.slLoad)],{step:'mix'});render(); }
    if(button.hasAttribute('data-sl-remove')) {saved.splice(Number(button.dataset.slRemove),1);try{localStorage.setItem(storageKey,JSON.stringify(saved));notify('Combination removed.');}catch{notify('Removed for this session. Browser storage is unavailable.');}renderSaved();}
  });
  root.addEventListener('input',event=>{
    if(event.target.id==='sl-type-headline') {state.headline=event.target.value;root.querySelector('#sl-type-grid').innerHTML=renderTypeCards();observeCovers();}
    if(event.target.closest('.sl-mixer-controls') && event.target.name==='headline') {state.headline=event.target.value;updateMix();}
  });
  root.addEventListener('change',event=>{
    if(!event.target.closest('.sl-mixer-controls') || !event.target.name)return;
    state[event.target.name]=event.target.type==='checkbox'?event.target.checked:event.target.value;
    updateMix();
    root.querySelector('.sl-current p').textContent=`${nameOf(backgrounds,state.family)} / ${nameOf(colorways,state.colorway)} + ${nameOf(illustrations,state.style)} + ${nameOf(typeStyles,state.type)}`;
  });
  render();
}
