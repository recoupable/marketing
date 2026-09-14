const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let view = 'all';

export function initEditorialContrast(onChange) {
  const root = document.querySelector('#editorial-contrast-controls');
  root.innerHTML = `<div class="contrast-toolbar">
    <div class="contrast-switch" role="group" aria-label="Treatment comparison view">
      <button type="button" data-contrast-view="all" aria-pressed="true">All options</button>
      <button type="button" data-contrast-view="pairs" aria-pressed="false">Compare pairs</button>
    </div>
    <a class="contrast-download" href="assets/editorial-12/recoup-visible-differences.zip" download>Download study ↓</a>
  </div>`;
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-contrast-view]');
    if (!button || !['all', 'pairs'].includes(button.dataset.contrastView)) return;
    view = button.dataset.contrastView;
    root.querySelectorAll('[data-contrast-view]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.contrastView === view)));
    onChange();
  });
}

function image(asset, original = false) {
  const path = original ? asset.originalPreview : asset.preview;
  const label = original ? 'Original Offset blocks cover' : asset.title;
  const artwork = `<img src="${esc(path)}" alt="${esc(label)} — ${esc(asset.sampleTitle || 'Choose your first AI project.')}" width="1920" height="1080" loading="lazy">`;
  return original ? `<div class="contrast-image">${artwork}</div>` : `<button type="button" class="contrast-image" data-asset="${esc(asset.id)}" aria-label="Review ${esc(asset.title)}">${artwork}</button>`;
}

const caption = asset => asset.changes?.[0] || asset.description;
const download = (path, label) => `<a href="${esc(path)}" download aria-label="Download ${esc(label)} PNG">PNG ↓</a>`;

export function editorialContrastCard(asset, { statusHTML }) {
  return `<article class="asset-card contrast-card">
    ${image(asset)}
    <div class="contrast-card-heading"><h3>${esc(asset.title)}</h3>${download(asset.preview, asset.title)}</div>
    <p class="contrast-caption">${esc(caption(asset))}</p>
    ${statusHTML(asset)}
  </article>`;
}

export function editorialContrastCollection(assets, { statusHTML }) {
  if (!assets.length) return '<div class="empty">No matching treatments. Try another search.</div>';
  if (view === 'pairs') return `<div class="contrast-pairs">${assets.map(asset => `<article class="contrast-pair">
    <div class="contrast-pair-heading"><h3>${esc(asset.title)}</h3>${statusHTML(asset)}</div>
    <div class="contrast-pair-images">
      <div><div class="contrast-image-label"><span>Original</span>${download(asset.originalPreview, 'original Offset blocks')}</div>${image(asset, true)}</div>
      <div><div class="contrast-image-label"><span>${esc(asset.title)}</span>${download(asset.preview, asset.title)}</div>${image(asset)}</div>
    </div>
    <p class="contrast-caption">${esc(caption(asset))}</p>
  </article>`).join('')}</div>`;
  const original = assets[0];
  return `<div class="contrast-all">
    <div class="contrast-original">
      <div class="contrast-original-art"><div class="contrast-image-label"><span>Original · Offset blocks</span>${download(original.originalPreview, 'original Offset blocks')}</div>${image(original, true)}</div>
      <p>One original.<br>Three different treatments.<span>The headline stays the same.</span></p>
    </div>
    <div class="contrast-options">${assets.map(asset => editorialContrastCard(asset, { statusHTML })).join('')}</div>
  </div>`;
}
