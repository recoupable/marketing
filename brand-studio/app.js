import { palette, principles, modes, rules, references } from './content.js';
import { initCreator } from './creator.js';
import { editorialCard, editorialAssetDetails, initEditorial, layeredCard, setEditorialCollection } from './editorial.js';
import { initStyleLab } from './style-lab.js';
import { initBlogThumbnails, matchesBlogFilters, resetBlogFilters, blogThumbnailCard } from './blog-thumbnails.js';
import { initEditorialReset, resetIsFeed, editorialResetCard } from './editorial-reset.js';
import { initEditorialSystem, matchesEditorialSystem, editorialSystemCard } from './editorial-system.js';
import { initEditorialRefinement, matchesEditorialRefinement, editorialRefinementCard, editorialRefinementIsArticle } from './editorial-refinement.js';
import { initEditorialDirections, editorialDirectionsCard, editorialDirectionsPreview } from './editorial-directions.js';
import { initEditorialPolish, editorialPolishCard, editorialPolishIsGrid } from './editorial-polish.js';
import { initEditorialContrast, editorialContrastCard, editorialContrastCollection } from './editorial-contrast.js';
import { initEditorialExperiments, editorialExperimentsCard, editorialExperimentsAreThumbnails } from './editorial-experiments.js';
import { initEditorialDynamic, editorialDynamicAreThumbnails, initEditorialFullCanvas, editorialFullCanvasAreThumbnails } from './editorial-dynamic.js';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storageKey = 'recoup-brand-review:v1';
const statuses = ['proposed','approved','needs-changes','retired'];
const names = {'proposed':'Proposed','approved':'Approved','needs-changes':'Needs changes','retired':'Retired'};
const motionFile = asset => asset.files.find(file => /\.mp4$/.test(file.path))?.path;
const darkLogo = asset => asset.category === 'logos' && /-(white|lime)$/.test(asset.id);
let assets = [], reviews = {}, shortlistIds = new Set(), notSelectedIds = new Set(), activeCategory = 'all', activeFamily = 'all', activeStyle = 'all', initializedCreator = false, toastTimer;
let editorialFamily = 'all', editorialView = 'feed';
let layeredFamily = 'all', layeredTreatment = 'all';
let styleLabStarted = false;
async function openStyleLab() {
  if (styleLabStarted) return;
  styleLabStarted = true;
  $('#style-lab').textContent = 'Loading the style comparisons…';
  try { await initStyleLab({copy,notify}); }
  catch { styleLabStarted = false; $('#style-lab').innerHTML = '<p>The style studies could not load.</p><button type="button" id="retry-style-lab" class="outline-button">Try again</button>'; $('#retry-style-lab').addEventListener('click',openStyleLab); }
}
const familyNames = { photographic: 'Photographic', abstract: 'Abstract art' };
const headlineOverlay = '<span class="background-headline" aria-hidden="true">AI and the business of music.</span>';
const isBackground = asset => asset.category === 'backgrounds' || asset.kind === 'Background';
const isBackgroundCollection = category => ['backgrounds', 'explorations-02'].includes(category);
function backgroundOverlay(asset) {
  return asset.category === 'explorations-02'
    ? '<span class="background-headline editorial-headline" aria-hidden="true"><small>RECOUP / INSIGHTS</small><strong>AI &amp; the<br>business<br>of music.</strong></span>'
    : headlineOverlay;
}
function explorationDetails(asset) {
  if (asset.category !== 'explorations-02') return '';
  const colors = (asset.colors || []).filter(color => /^#[0-9a-f]{6}$/i.test(color));
  return `<div class="exploration-details"><span>${esc(asset.noiseLevel || '')}</span><span class="mini-palette" aria-label="Prompt palette: ${esc(colors.join(', '))}">${colors.map(color => `<i style="background:${color}" aria-hidden="true"></i>`).join('')}</span></div><p class="exploration-caption">${esc(asset.description)}</p>`;
}
function updateBackgroundStyles() {
  const styles = [...new Set(assets.filter(asset => asset.category === 'backgrounds' && (activeFamily === 'all' || asset.family === activeFamily)).map(asset => asset.style).filter(Boolean))];
  if (!styles.includes(activeStyle)) activeStyle = 'all';
  $('#background-style').innerHTML = '<option value="all">All styles</option>' + styles.map(style => `<option value="${esc(style)}" ${style === activeStyle ? 'selected' : ''}>${esc(style)}</option>`).join('');
}
function setCategory(category, updateURL = true) {
  const changed = category !== activeCategory;
  if (changed) { activeFamily = 'all'; activeStyle = 'all'; editorialFamily = 'all'; layeredFamily = 'all'; layeredTreatment = 'all'; }
  activeCategory = category;
  const backgrounds = isBackgroundCollection(category);
  const newRound = category === 'explorations-02';
  $('#background-controls').hidden = !backgrounds;
  const editorial = ['editorial-lab', 'layered-editorial'].includes(category);
  const styleLab = category === 'style-lab';
  const blogThumbnails = category === 'blog-thumbnails';
  const editorialReset = category === 'editorial-07';
  const editorialSystem = category === 'editorial-08';
  const editorialRefinement = category === 'editorial-09';
  const editorialDirections = category === 'editorial-10';
  const editorialPolish = category === 'editorial-11';
  const editorialContrast = category === 'editorial-12';
  const editorialExperiments = category === 'editorial-13';
  const editorialDynamic = category === 'editorial-14';
  const editorialFullCanvas = category === 'editorial-15';
  $('#editorial-full-canvas-controls').hidden = !editorialFullCanvas;
  $('#editorial-dynamic-controls').hidden = !editorialDynamic;
  $('#editorial-experiments-controls').hidden = !editorialExperiments;
  $('#editorial-contrast-controls').hidden = !editorialContrast;
  $('#editorial-polish-controls').hidden = !editorialPolish;
  $('#editorial-directions-controls').hidden = !editorialDirections;
  $('#editorial-refinement-controls').hidden = !editorialRefinement;
  $('#editorial-system-controls').hidden = !editorialSystem;
  $('#editorial-reset-controls').hidden = !editorialReset;
  if (changed) resetBlogFilters();
  $('#blog-thumbnail-controls').hidden = !blogThumbnails;
  $('#editorial-controls').hidden = !editorial;
  $('#style-lab').hidden = !styleLab;
  $('#asset-count').hidden = styleLab;
  $('#asset-grid').hidden = styleLab;
  $('.search-label').hidden = styleLab;
  $('#view-browse').classList.toggle('editorial-active', editorial || styleLab || blogThumbnails || editorialReset || editorialSystem || editorialRefinement || editorialDirections || editorialPolish || editorialContrast || editorialExperiments || editorialDynamic || editorialFullCanvas);
  $('#collection-picker-label').hidden = !(editorial || styleLab || blogThumbnails || editorialReset || editorialSystem || editorialRefinement || editorialDirections || editorialPolish || editorialContrast || editorialExperiments || editorialDynamic || editorialFullCanvas);
  $('#filters').hidden = editorial || styleLab || blogThumbnails || editorialReset || editorialSystem || editorialRefinement || editorialDirections || editorialPolish || editorialContrast || editorialExperiments || editorialDynamic || editorialFullCanvas;
  if (styleLab) openStyleLab();
  setEditorialCollection(category === 'layered-editorial', changed);
  $('#collection-picker').value = category;
  if (!backgrounds) $('#background-headline-toggle').checked = false;
  const families = newRound
    ? [['all', 'All variations'], ['gradients', 'Gradients'], ['airbrush', 'Grainy airbrush'], ['forest', 'Forest + blue + lime']]
    : [['all', 'All backgrounds'], ['photographic', 'Photographic'], ['abstract', 'Abstract art']];
  $('#background-families').innerHTML = families.map(([id, title]) => `<button data-family="${id}" aria-pressed="${id === activeFamily}">${title}</button>`).join('');
  $('.background-style-label').hidden = newRound;
  $('.study-palettes').hidden = newRound;
  $('#headline-color-label').hidden = !newRound;
  const introductions = {
    'editorial-15': ['Patterns across the whole canvas.', 'Edge-to-edge repeats and oversized forms, with your preferred typography.'],
    'editorial-14': ['The type stays. The patterns move.', 'Six new pattern directions with the font, size, spacing, and headline from your preferred examples.'],
    'editorial-13': ['Six fresh editorial experiments.', 'New shapes, surfaces, and compositions in Recoup’s colors. Explore the ideas, try them at thumbnail size, and choose what feels worth developing.'],
    'editorial-12': ['Three visibly different treatments.', 'Stronger contrast, dimensional surfaces, and a bolder crop. One cover and the same headline, so you can compare the effect of each change.'],
    'editorial-11': ['Subtle refinement study.', 'These changes were too small to make a visible difference at thumbnail size. The earlier comparisons remain here for reference.'],
    'editorial-10': ['Six pattern directions.', 'Proposed shapes drawn from Recoup’s visual identity, with different compositions and deliberate color placement. Compare the same headline, example articles, or the patterns on their own.'],
    'editorial-09': ['Earlier thumbnail study.', 'An earlier exploration of type, color, and subtle edge gradients. The typography and palettes informed the next study; these patterns are not an approved Recoup direction.'],
    'editorial-08': ['Blog thumbnails. Two clear approaches.', 'Five topics, five Recoup palettes. Compare small expressive illustrations with restrained typography and abstract patterns—each on a mostly uninterrupted color field.'],
    'editorial-07': ['Ten new editorial directions.', 'Music, material, light, and space. Compare ten distinct approaches, then switch to Blog view to see how they read together.'],
    'blog-thumbnails': ['12 thumbnails. One visual family.', 'New illustrations and six text treatments, built from your favorite source-review covers. Compare the examples, open a full preview, or download the PNGs.'],
    'style-lab': ['Find the right combination.', 'Background, illustration, and typography—tested separately, then combined. These studies help us choose the ingredients before defining the finished style.'],
    'layered-editorial': ['Gradient. Graphic. Headline.', 'Four subjects, three treatments each. Compare the blue-and-lime artwork, add a headline, then try another palette. Open any cover to review or download it.'],
    'editorial-lab': ['Editorial ideas for Recoup.', 'Ten proposed directions, shown with example article titles. Compare the artwork, then use the recipe to create the next brief.'],
    backgrounds: ['Explore the backgrounds.', 'The original study: ten styles, five variations each. Open an option to see it larger, download it, or leave feedback.'],
    shortlist: ['Your shortlist.', 'Your selected source-review covers, favorite fine-grain gradient, and earlier preferred references.'],
    refinements: ['The first explorations.', 'The blue-and-lime editorial cover is your favorite. The forest-and-lime cover did not pop enough. Both remain here alongside the first four abstract backgrounds.'],
    'explorations-02': ['More color. More texture.', 'Gradients, grainy airbrush, and forest with blue and lime. Compare the color and grain, then switch on the headline to see each background in use.'],
  };
  const introduction = introductions[category] || ['Review the visuals.', 'These are visual drafts for your review. Compare the options, open a full preview, and tell us what to keep or change. Nothing here has been published.'];
  $('#browse-title').textContent = introduction[0];
  $('#browse-description').textContent = introduction[1];
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  if (updateURL) {
    const url = new URL(location.href);
    if (category === 'all') url.searchParams.delete('collection');
    else url.searchParams.set('collection', category);
    history.replaceState(null, '', url);
  }
  updateBackgroundStyles();
  renderAssets();
}
function notify(message) { $('#toast').textContent=message; $('#toast').hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').hidden=true,4500); }
function downloadJSON(value,name) { const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
async function readJSON(path) { const response=await fetch(path);if(!response.ok) throw new Error(`Could not load ${path}`);return response.json(); }
function getStatus(asset) { return reviews[asset.id]?.status || asset.status; }
function statusHTML(asset) { const status=getStatus(asset);return `<span class="asset-status ${esc(status)}">${esc(names[status]||'Proposed')}</span>`; }
async function copy(text) { try {await navigator.clipboard.writeText(text);notify('Copied.');}catch {notify('Copy is unavailable here. Select the text to copy it.');} }

$('#principles').innerHTML=principles.map(x=>`<article><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></article>`).join('');
$('#palette').innerHTML=palette.map(x=>`<button class="swatch" aria-label="Copy ${esc(x.name)} ${x.value}" data-copy="${x.value}"><span class="swatch-color" style="background:${x.value};color:${x.onColor}">${x.value}<span aria-hidden="true">↗</span></span><strong>${esc(x.name)}</strong><small>${esc(x.role)}</small></button>`).join('');
$('#rules').innerHTML=rules.map(x=>`<article class="rule"><h3>${esc(x.title)}</h3><div><span class="rule-label">Avoid</span><p>${esc(x.bad)}</p></div><div><span class="rule-label good">Use</span><p class="good">${esc(x.good)}</p><small>${esc(x.reason)}</small></div></article>`).join('');
$('#references').innerHTML=references.map(x=>`<article><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.name)} ↗</a><p>${esc(x.lesson)}</p></article>`).join('');
document.addEventListener('click',event=>{const target=event.target.closest('[data-copy]');if(target)copy(target.dataset.copy);});
function setMode(id) {const mode=modes.find(x=>x.id===id)||modes[0];document.querySelectorAll('[data-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.mode===mode.id)));const art=mode.id==='functional'?'<span>CATALOG REVIEW / EXAMPLE</span><h3>Review your catalog.</h3><div class="mini-table"><span>Source documents</span><strong>Connected</strong><span>Reporting period</span><strong>Selected</strong><span>Analyst review</span><strong>Pending</strong></div>':mode.id==='editorial'?'<span>RECOUP / INSIGHTS</span><h3>What AI brings<br>to catalog review.</h3><span>RESEARCH → REVIEW → DECISION</span>':'<span>THE RECOUP PODCAST</span><h3>AI & the<br>music catalog.</h3><span>A CONVERSATION ABOUT WHAT COMES NEXT.</span>';$('#mode-example').innerHTML=`<div class="mode-art ${mode.id}">${art}</div><div class="mode-copy"><span class="eyebrow">${esc(mode.subtitle)}</span><h3>${esc(mode.title)}</h3><p>${esc(mode.description)}</p><p class="small">${esc(mode.example)}</p></div>`;}
document.querySelectorAll('[data-mode]').forEach(x=>x.addEventListener('click',()=>setMode(x.dataset.mode)));setMode('functional');
$('#sample-save').addEventListener('click',()=>{$('#sample-result').textContent='Saved. This is a component example; nothing was sent.';});
$('#print-book').addEventListener('click',()=>window.print());
function switchView() { const view=['learn','browse','create','review'].includes(location.hash.slice(1))?location.hash.slice(1):'learn';document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!==`view-${view}`);document.querySelectorAll('[data-view]').forEach(x=>{if(x.dataset.view===view)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current');});$('#breadcrumb').textContent={learn:'The Recoup identity',browse:'The asset library',create:'The episode creator',review:'Your review notebook'}[view];if(view==='create'&&!initializedCreator){initializedCreator=true;Promise.resolve().then(()=>initCreator($('#creator-root')).ready).catch(()=>{$('#creator-root').textContent='The creator could not load. Refresh to retry.';});}if(view==='review')renderReviews();window.scrollTo(0,0);}
window.addEventListener('hashchange',switchView);

function renderAssets() {
  if (activeCategory === 'style-lab') return;
  const grid = $('#asset-grid');
  grid.classList.toggle('podcast-options', activeCategory === 'podcast');
  grid.classList.toggle('background-options', isBackgroundCollection(activeCategory));
  grid.classList.toggle('focused-options', ['shortlist', 'refinements'].includes(activeCategory));
  grid.classList.toggle('editorial-options', activeCategory === 'editorial-lab');
  grid.classList.toggle('editorial-feed', activeCategory === 'editorial-lab' && editorialView === 'feed');
  grid.classList.toggle('layered-options', activeCategory === 'layered-editorial');
  grid.classList.toggle('blog-thumbnail-options', activeCategory === 'blog-thumbnails');
  grid.classList.toggle('editorial-reset-options', activeCategory === 'editorial-07');
  grid.classList.toggle('editorial-system-options', activeCategory === 'editorial-08');
  grid.classList.toggle('editorial-refinement-options', activeCategory === 'editorial-09');
  grid.classList.toggle('editorial-directions-options', activeCategory === 'editorial-10');
  grid.classList.toggle('editorial-polish-options', activeCategory === 'editorial-11');
  grid.classList.toggle('editorial-contrast-options', activeCategory === 'editorial-12');
  grid.classList.toggle('editorial-experiments-options', ['editorial-13', 'editorial-14', 'editorial-15'].includes(activeCategory));
  grid.classList.toggle('experiments-thumbnails', (activeCategory === 'editorial-13' && editorialExperimentsAreThumbnails()) || (activeCategory === 'editorial-14' && editorialDynamicAreThumbnails()) || (activeCategory === 'editorial-15' && editorialFullCanvasAreThumbnails()));
  grid.classList.toggle('polish-blog-grid', activeCategory === 'editorial-11' && editorialPolishIsGrid());
  grid.classList.toggle('refinement-articles', activeCategory === 'editorial-09' && editorialRefinementIsArticle());
  grid.classList.toggle('reset-feed', activeCategory === 'editorial-07' && resetIsFeed());
  grid.classList.toggle('with-headline', $('#background-headline-toggle').checked);
  grid.dataset.headlineColor = $('#headline-color').value;
  const query = $('#asset-search').value.toLowerCase().trim();
  const filtered = assets.filter(asset =>
    (activeCategory !== 'blog-thumbnails' || matchesBlogFilters(asset)) &&
    (activeCategory !== 'editorial-08' || matchesEditorialSystem(asset)) &&
    (activeCategory !== 'editorial-09' || matchesEditorialRefinement(asset)) &&
    (activeCategory === 'all' || asset.category === activeCategory || (activeCategory === 'shortlist' && shortlistIds.has(asset.id))) &&
    (!isBackgroundCollection(activeCategory) || activeFamily === 'all' || asset.family === activeFamily) &&
    (activeCategory !== 'editorial-lab' || editorialFamily === 'all' || asset.family === editorialFamily) &&
    (activeCategory !== 'layered-editorial' || layeredFamily === 'all' || asset.family === layeredFamily) &&
    (activeCategory !== 'layered-editorial' || layeredTreatment === 'all' || asset.treatment === layeredTreatment) &&
    (activeCategory !== 'backgrounds' || activeStyle === 'all' || asset.style === activeStyle) &&
    `${asset.title} ${asset.description} ${asset.id} ${asset.style || ''} ${asset.family || ''} ${asset.sampleTitle || ''}`.toLowerCase().includes(query)
  );
  if (activeCategory === 'shortlist') {
    const order = [...shortlistIds];
    filtered.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }
  $('#asset-count').textContent = isBackgroundCollection(activeCategory)
    ? `${filtered.length} background${filtered.length === 1 ? '' : 's'} · Select an option for a closer look.`
    : activeCategory === 'shortlist' ? `${filtered.length} selected references · Your feedback, saved with the Studio.`
    : activeCategory === 'editorial-lab' ? `${filtered.length} editorial ideas · Open an image to see its prompt, download it, or leave feedback.`
    : activeCategory === 'layered-editorial' ? `${filtered.length} cover${filtered.length === 1 ? '' : 's'} · New palettes and layouts are proposed for your review.`
    : activeCategory === 'editorial-15' ? `${filtered.length} patterns · Larger scale · Original typography · Proposed for review.`
    : activeCategory === 'editorial-14' ? `${filtered.length} new patterns · Original typography · Proposed for review.`
    : activeCategory === 'editorial-13' ? `${filtered.length} experimental covers · Proposed for visual review.`
    : activeCategory === 'editorial-12' ? `${filtered.length} treatments · Proposed for review · Open an option for a closer look.`
    : activeCategory === 'editorial-11' ? `${filtered.length} refinements · Thumbnails shown up to 360 pixels wide · Open a refined image to review.`
    : activeCategory === 'editorial-10' ? `${filtered.length} pattern options · Proposed for review · PNG and editable artwork included.`
    : activeCategory === 'editorial-09' ? `${filtered.length} ${editorialRefinementIsArticle() ? 'article illustration proposals' : 'thumbnail refinements'} · Open an image to review or download.`
    : activeCategory === 'editorial-08' ? `${filtered.length} thumbnails · Matched topics and palettes · All proposed for review.`
    : activeCategory === 'editorial-07' ? `${filtered.length} new directions · Generated visual studies with example article titles · Open any image to review it.`
    : activeCategory === 'blog-thumbnails' ? `${filtered.length} thumbnail${filtered.length === 1 ? '' : 's'} · Example topics · New artwork and type treatments for review.`
    : `${filtered.length} assets · New applications remain proposed until you approve them.`;
  if (activeCategory === 'editorial-12') {
    grid.innerHTML = editorialContrastCollection(filtered, {statusHTML});
    return;
  }
  grid.innerHTML = filtered.length ? filtered.map(asset => {
    if (['editorial-14', 'editorial-15'].includes(asset.category)) return editorialExperimentsCard(asset, {statusHTML, editable: true});
    if (asset.category === 'editorial-13') return editorialExperimentsCard(asset, {statusHTML});
    if (asset.category === 'editorial-12') return editorialContrastCard(asset, {statusHTML});
    if (asset.category === 'editorial-11') return editorialPolishCard(asset, {statusHTML, compact: activeCategory !== 'editorial-11'});
    if (asset.category === 'editorial-10') return editorialDirectionsCard(asset, {statusHTML});
    if (asset.category === 'editorial-09') return editorialRefinementCard(asset, {statusHTML});
    if (asset.category === 'editorial-08') return editorialSystemCard(asset, {statusHTML});
    if (asset.category === 'editorial-07') return editorialResetCard(asset, {statusHTML});
    if (asset.category === 'blog-thumbnails') return blogThumbnailCard(asset, {statusHTML});
    if (asset.category === 'editorial-lab') return editorialCard(asset, { feed: activeCategory === 'editorial-lab' && editorialView === 'feed', statusHTML });
    if (asset.category === 'layered-editorial') return layeredCard(asset, { statusHTML });
    const background = isBackground(asset);
    return `<article class="asset-card ${background ? 'background-card' : ''}"><button class="asset-preview ${background ? 'is-background' : ''} ${asset.category === 'logos' ? 'is-logo' : asset.kind === 'Editorial cover' ? 'is-editorial-cover' : ''} ${darkLogo(asset) ? 'dark-preview' : ''}" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.title)}" loading="lazy">${motionFile(asset) ? '<span class="play-mark" aria-hidden="true">▶</span>' : ''}${background ? backgroundOverlay(asset) : ''}</button><div class="asset-card-top"><span class="asset-category">${esc(asset.kind || (background ? familyNames[asset.family] || 'Background' : asset.category))}</span>${shortlistIds.has(asset.id)?'<span class="reference-tag">Selected reference</span>':notSelectedIds.has(asset.id)?'<span class="not-selected-tag">Not selected</span>':statusHTML(asset)}</div><h3>${esc(asset.title)}</h3>${background ? `<span class="background-style-name">${esc(asset.style || '')}</span>${explorationDetails(asset)}` : `<p>${esc(asset.description)}</p><span class="asset-id">${esc(asset.id)} / ${asset.width} × ${asset.height}</span>`}</article>`;
  }).join('') : '<div class="empty">No matching assets. Try another category, style, or search.</div>';
}
function openAsset(id) { const asset=assets.find(x=>x.id===id);if(!asset)return;const review=reviews[id]||{};const preview=asset.category==='editorial-10'?editorialDirectionsPreview(asset):asset.preview;$('#asset-dialog').dataset.headlineColor=$('#headline-color').value;$('#asset-dialog').classList.toggle('background-dialog',isBackground(asset));$('#asset-dialog').classList.toggle('with-headline',$('#background-headline-toggle').checked);$('#dialog-content').innerHTML=`<div class="dialog-layout"><div class="dialog-art ${darkLogo(asset)?'dark-preview':''} ${isBackground(asset)?'is-background':''}">${Boolean(motionFile(asset))?`<video src="${esc(motionFile(asset))}" poster="${esc(preview)}" controls playsinline preload="metadata"></video>`:`<img src="${esc(preview)}" alt="${esc(asset.title)}">`}${isBackground(asset)?backgroundOverlay(asset):''}</div><div class="dialog-details"><span class="eyebrow">${esc(asset.id)} / ${esc(asset.category)}</span><h2 id="dialog-title">${esc(asset.title)}</h2><p>${esc(asset.description)}</p><p class="small">${asset.width} × ${asset.height} · Version 1.0</p>${editorialAssetDetails(asset)}<div class="download-list">${asset.files.map(f=>`<a href="${esc(f.path)}" download>${esc(f.label)} ↓</a>`).join('')}</div><form class="review-form" id="review-form"><label for="review-status">Decision</label><select id="review-status" name="status">${statuses.map(s=>`<option value="${s}" ${getStatus(asset)===s?'selected':''}>${names[s]}</option>`).join('')}</select><label for="review-note">What works, or what should change?</label><textarea id="review-note" name="note" maxlength="2000" placeholder="For example: keep this lighting; give the title more room.">${esc(review.note||'')}</textarea><label for="reviewer">Reviewer (optional)</label><input id="reviewer" name="reviewer" maxlength="80" value="${esc(review.reviewer||'')}"><button class="lime-button" type="submit">Save decision <span>↗</span></button><p>Saved on this browser. Export from Review to keep a portable copy.</p></form></div></div>`;$('#review-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const next={...reviews,[id]:{status:data.get('status'),note:data.get('note').trim(),reviewer:data.get('reviewer').trim(),date:new Date().toISOString(),assetVersion:'1.0'}};try{localStorage.setItem(storageKey,JSON.stringify(next));reviews=next;notify('Decision saved on this browser.');renderAssets();renderReviews();}catch{notify('Browser storage is unavailable. Your decision is kept for this session; export it from Review.');reviews=next;renderReviews();renderAssets();}});$('#asset-dialog').showModal();}
$('#asset-grid').addEventListener('click',event=>{const button=event.target.closest('[data-asset]');if(button)openAsset(button.dataset.asset);});
$('#close-dialog').addEventListener('click',()=>$('#asset-dialog').close());$('#asset-dialog').addEventListener('close',()=>{$('#asset-dialog video')?.pause();});
$('#asset-dialog').addEventListener('click',event=>{if(event.target===$('#asset-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
$('#asset-search').addEventListener('input',renderAssets);
$('#collection-picker').addEventListener('change', event => setCategory(event.target.value));
$('#background-families').addEventListener('click', event => {
  const button = event.target.closest('[data-family]');
  if (!button) return;
  activeFamily = button.dataset.family;
  activeStyle = 'all';
  document.querySelectorAll('[data-family]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.family === activeFamily)));
  updateBackgroundStyles();
  renderAssets();
});
$('#headline-color').addEventListener('change', () => { $('#asset-dialog').dataset.headlineColor = $('#headline-color').value; renderAssets(); });
$('#background-style').addEventListener('change', event => { activeStyle = event.target.value; renderAssets(); });
$('#background-headline-toggle').addEventListener('change', () => {
  $('#asset-dialog').classList.toggle('with-headline', $('#background-headline-toggle').checked);
  renderAssets();
});
function renderReviews() {const entries=Object.entries(reviews).filter(([id])=>assets.some(a=>a.id===id));$('#review-summary').textContent=`${entries.length} recorded decisions · ${entries.filter(([,r])=>r.status==='approved').length} approved`;$('#review-list').innerHTML=entries.length?entries.map(([id,r])=>{const a=assets.find(x=>x.id===id);return `<article class="review-row">${/\.mp4$/.test(a.preview)?'<span class="eyebrow">Motion</span>':`<img src="${esc(a.preview)}" alt="">`}<div><h3>${esc(a.title)}</h3>${statusHTML(a)}<p>${esc(r.note||'No note added.')}</p><small>${esc(r.reviewer||'Local review')} · ${esc(r.date.slice(0,10))}</small></div><button class="outline-button" data-review-asset="${esc(id)}">Review asset</button></article>`;}).join(''):'<div class="empty"><h3>Your next decision starts here.</h3><p class="muted">Open an asset in Browse, choose a status, and add a note.</p><a href="#browse">Browse the collection ↗</a></div>';}
$('#review-list').addEventListener('click',event=>{const x=event.target.closest('[data-review-asset]');if(x)openAsset(x.dataset.reviewAsset);});
$('#export-reviews').addEventListener('click',()=>downloadJSON({schema:'recoup-brand-review-v1',exportedAt:new Date().toISOString(),reviews},'recoup-brand-decisions.json'));
function validatedReviews(data){if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('Invalid review file');const out={};for(const [id,value] of Object.entries(data)){if(!value||!statuses.includes(value.status)||typeof value.note!=='string'||value.note.length>2000||typeof value.reviewer!=='string'||value.reviewer.length>80||typeof value.date!=='string'||!Number.isFinite(Date.parse(value.date)))throw new Error('Invalid review entry');out[id]={status:value.status,note:value.note,reviewer:value.reviewer,date:value.date,assetVersion:'1.0'};}return out;}
$('#import-reviews').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>1000000)throw new Error('Too large');const data=JSON.parse(await file.text());if(data.schema!=='recoup-brand-review-v1')throw new Error('Wrong schema');const incoming=validatedReviews(data.reviews);reviews={...reviews,...incoming};let saved=true;try{localStorage.setItem(storageKey,JSON.stringify(reviews));}catch{saved=false;}renderReviews();renderAssets();notify(saved?'Decisions imported and saved on this browser.':'Decisions imported for this session. Browser storage is unavailable.');}catch{notify('Use a valid Recoup review JSON export under 1 MB.');}event.target.value='';});
async function start(){const results=await Promise.allSettled([readJSON('asset-manifest.json'),readJSON('recipes.json'),readJSON('decisions.json'),readJSON('environment-manifest.json'),readJSON('background-manifest.json'),readJSON('background-palettes.json'),readJSON('preferences.json'),readJSON('refinement-manifest.json'),readJSON('exploration-manifest.json'),readJSON('editorial-lab-manifest.json'),readJSON('layered-editorial-manifest.json'),readJSON('blog-thumbnails-manifest.json'),readJSON('editorial-07-manifest.json'),readJSON('editorial-08-manifest.json'),readJSON('editorial-09-manifest.json'),readJSON('editorial-10-manifest.json'),readJSON('editorial-11-manifest.json'),readJSON('editorial-12-manifest.json'),readJSON('editorial-13-manifest.json'),readJSON('editorial-14-manifest.json'),readJSON('editorial-15-manifest.json')]);if(results[6].status==='fulfilled'){shortlistIds=new Set(results[6].value.shortlist||[]);notSelectedIds=new Set(results[6].value.notSelectedIds||[]);}if(results[0].status==='fulfilled'){assets=[...results[0].value,...(results[3].status==='fulfilled'?results[3].value:[]),...(results[4].status==='fulfilled'&&Array.isArray(results[4].value)?results[4].value:[]),...(results[7].status==='fulfilled'&&Array.isArray(results[7].value)?results[7].value:[]),...(results[8].status==='fulfilled'&&Array.isArray(results[8].value)?results[8].value:[]),...(results[9].status==='fulfilled'&&Array.isArray(results[9].value)?results[9].value:[]),...(results[10].status==='fulfilled'&&Array.isArray(results[10].value)?results[10].value:[]),...(results[11].status==='fulfilled'&&Array.isArray(results[11].value)?results[11].value:[]),...(results[12].status==='fulfilled'&&Array.isArray(results[12].value)?results[12].value:[]),...(results[13].status==='fulfilled'&&Array.isArray(results[13].value)?results[13].value:[]),...(results[14].status==='fulfilled'&&Array.isArray(results[14].value)?results[14].value:[]),...(results[15].status==='fulfilled'&&Array.isArray(results[15].value)?results[15].value:[]),...(results[16].status==='fulfilled'&&Array.isArray(results[16].value)?results[16].value:[]),...(results[17].status==='fulfilled'&&Array.isArray(results[17].value)?results[17].value:[]),...(results[18].status==='fulfilled'&&Array.isArray(results[18].value)?results[18].value:[]),...(results[19].status==='fulfilled'&&Array.isArray(results[19].value)?results[19].value:[]),...(results[20].status==='fulfilled'&&Array.isArray(results[20].value)?results[20].value:[])];try{reviews=validatedReviews(JSON.parse(localStorage.getItem(storageKey)||'{}'));}catch{reviews={};}const categories=[['editorial-15','Patterns across the canvas'],['editorial-14','Dynamic patterns · original type'],['editorial-13','Fresh editorial experiments'],['editorial-12','Visible differences'],['editorial-11','Earlier subtle refinements'],['editorial-10','Recoup pattern options'],['editorial-09','Earlier thumbnail study'],['editorial-08','Illustration & type'],['editorial-07','Photography studies'],['blog-thumbnails','Earlier blog thumbnails'],['style-lab','Style lab'],['layered-editorial','Layered covers'],['editorial-lab','Editorial lab'],['explorations-02','Color & texture'],['shortlist','Your shortlist'],['refinements','First explorations'],['all','All assets'],['backgrounds','Backgrounds'],['logos','Logos'],['podcast','Podcast'],['social','Social'],['editorial','Editorial'],['motion','Motion'],['environments','Environments']];$('#collection-picker').innerHTML=categories.map(([id,title])=>`<option value="${id}">${title}</option>`).join('');$('#filters').innerHTML=categories.map(([id,title])=>`<button data-filter="${id}" aria-pressed="${id==='all'}">${title}</button>`).join('');$('#filters').addEventListener('click',event=>{const x=event.target.closest('[data-filter]');if(!x)return;setCategory(x.dataset.filter);});const requestedCategory=new URLSearchParams(location.search).get('collection');setCategory(categories.some(([id])=>id===requestedCategory)?requestedCategory:'all',false);}else $('#asset-grid').innerHTML='<p>The asset index could not load. Refresh to retry.</p>';if(results[1].status==='fulfilled')$('#recipes').innerHTML=results[1].value.map(r=>`<details><summary>${esc(r.title)}</summary><div class="recipe-body"><span class="eyebrow">${esc(r.family)} / Proposed recipe</span><p>${esc(r.purpose)}</p><pre>${esc(r.prompt)}</pre><button class="outline-button" data-copy="${esc(r.prompt)}">Copy prompt</button><p><strong>Keep consistent</strong></p><ul>${r.keep.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p><strong>Change for the brief</strong></p><ul>${r.vary.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></details>`).join('');if(results[2].status==='fulfilled')$('#decisions').innerHTML=results[2].value.map(d=>`<article class="decision"><time>${esc(d.date)}</time><div><h3>${esc(d.title)}</h3><p>${esc(d.reason)}</p><blockquote>${esc(d.example)}</blockquote></div></article>`).join('');if(results[5].status==='fulfilled')$('#study-palettes').innerHTML=results[5].value.combinations.map(p=>`<div class="study-palette"><strong>${esc(p.name)}</strong><div class="color-ribbon">${p.colors.length?p.colors.map(c=>`<span style="background:${esc(c)}" title="${esc(c)}"></span>`).join(''):'<span class="open-palette">'+(p.id==='reference-tonality'?'Colors from the reference':'No fixed palette')+'</span>'}</div></div>`).join('');switchView();}
initEditorial({ onFamily: value => { editorialFamily = value; renderAssets(); }, onView: value => { editorialView = value; renderAssets(); }, onLayeredFamily: value => { layeredFamily = value; renderAssets(); }, onTreatment: value => { layeredTreatment = value; renderAssets(); }, copy });
initBlogThumbnails(renderAssets);
initEditorialReset(renderAssets);
initEditorialSystem(renderAssets);
initEditorialRefinement(renderAssets);
initEditorialDirections(renderAssets);
initEditorialPolish(renderAssets);
initEditorialContrast(renderAssets);
initEditorialExperiments(renderAssets);
initEditorialDynamic(renderAssets);
initEditorialFullCanvas(renderAssets);
start().catch(()=>notify('Some Studio content could not load. Refresh to retry.'));
