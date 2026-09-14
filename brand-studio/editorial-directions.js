const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const modeNames = { comparison: 'Same headline', feed: 'Example articles', artwork: 'Patterns only' };
let mode = 'comparison';

export function editorialDirectionsPreview(asset) {
  if (mode === 'feed') return asset.feedPreview || asset.preview;
  if (mode === 'artwork') return asset.artPreview || asset.preview;
  return asset.preview;
}

export function initEditorialDirections(onChange) {
  const root = document.querySelector('#editorial-directions-controls');
  root.innerHTML = `<div class="directions-toolbar"><div class="directions-modes" role="group" aria-label="Pattern comparison view">${Object.entries(modeNames).map(([id, label]) => `<button type="button" data-directions-mode="${id}" aria-pressed="${id === mode}">${label}</button>`).join('')}</div><div class="directions-downloads"><a href="assets/editorial-10/recoup-pattern-options.zip" download>Download all six ↓</a><a href="editorial-10-recipe.md" download>Art brief ↓</a></div></div><p class="directions-purpose" id="directions-purpose">The same headline across all six options makes the differences in shape, color, and composition easier to judge.</p>`;
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-directions-mode]');
    if (!button || !Object.hasOwn(modeNames, button.dataset.directionsMode)) return;
    mode = button.dataset.directionsMode;
    root.querySelectorAll('[data-directions-mode]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.directionsMode === mode)));
    root.querySelector('#directions-purpose').textContent = {
      comparison: 'The same headline across all six options makes the differences in shape, color, and composition easier to judge.',
      feed: 'Six example articles show how the proposed directions could work together. The artwork stays the same; only the headline changes.',
      artwork: 'Text removed, so you can judge each pattern and its color placement on their own. These are the same six compositions.',
    }[mode];
    onChange();
  });
}

export function editorialDirectionsCard(asset, { statusHTML }) {
  const preview = editorialDirectionsPreview(asset);
  const label = modeNames[mode];
  const article = mode === 'feed' ? `<p class="directions-example-title">${esc(asset.sampleTitle)}</p>` : '';
  return `<article class="asset-card directions-card">
    <button class="asset-preview is-editorial-art" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)} — ${label}"><img src="${esc(preview)}" alt="${esc(asset.title)} — ${label}. ${esc(asset.description)}" loading="lazy"></button>
    <div class="asset-card-top"><span class="asset-category">${esc(asset.id.slice(-2))} / ${label}</span>${statusHTML(asset)}</div>
    <h3>${esc(asset.title)}</h3>${article}
    <p class="directions-description">${esc(asset.description)}</p>
    <p class="directions-light"><span>Light &amp; color</span>${esc(asset.gradientRule)}</p>
    <div class="directions-card-meta"><span>${esc(asset.paletteName)}</span><a href="${esc(preview)}" download aria-label="Download ${esc(asset.title)} — ${label} PNG">PNG ↓</a></div>
  </article>`;
}
