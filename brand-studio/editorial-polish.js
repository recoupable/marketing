const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let view = 'compare';
let version = 'refined';

export const editorialPolishIsGrid = () => view === 'grid';

export function initEditorialPolish(onChange) {
  const root = document.querySelector('#editorial-polish-controls');
  root.innerHTML = `<div class="polish-toolbar">
    <div class="polish-view-controls">
      <div class="polish-switch" role="group" aria-label="Thumbnail view">
        <button type="button" data-polish-view="grid" aria-pressed="false">Blog grid</button>
        <button type="button" data-polish-view="compare" aria-pressed="true">Before &amp; after</button>
      </div>
      <div class="polish-switch polish-version-switch" role="group" aria-label="Blog thumbnail version" hidden>
        <button type="button" data-polish-version="original" aria-pressed="false">Original</button>
        <button type="button" data-polish-version="refined" aria-pressed="true">Refined</button>
      </div>
    </div>
    <div class="polish-downloads"><a href="assets/editorial-11/recoup-pattern-refinements.zip" download>Download study ↓</a><a href="editorial-11-recipe.md" download>Art brief ↓</a></div>
  </div>
  <p class="polish-purpose" id="polish-purpose">The same six articles, before and after. Thumbnails stay at blog size so you can judge the balance and readability.</p>`;
  root.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-polish-view]');
    const versionButton = event.target.closest('[data-polish-version]');
    if (viewButton && ['grid', 'compare'].includes(viewButton.dataset.polishView)) view = viewButton.dataset.polishView;
    else if (versionButton && ['original', 'refined'].includes(versionButton.dataset.polishVersion)) version = versionButton.dataset.polishVersion;
    else return;
    root.querySelectorAll('[data-polish-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.polishView === view)));
    root.querySelectorAll('[data-polish-version]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.polishVersion === version)));
    root.querySelector('.polish-version-switch').hidden = view !== 'grid';
    root.querySelector('#polish-purpose').textContent = view === 'compare'
      ? 'The same six articles, before and after. Thumbnails stay at blog size so you can judge the balance and readability.'
      : `${version === 'original' ? 'The original' : 'The refined'} six thumbnails, together as a blog. Switch versions to compare the full set.`;
    onChange();
  });
}

function thumbnail(asset, original = false) {
  const path = original ? asset.originalPreview : asset.preview;
  const label = original ? 'Original' : 'Refined';
  const image = `<img src="${esc(path)}" alt="${esc(asset.sampleTitle)} — ${label.toLowerCase()} ${esc(asset.title)} thumbnail" width="1920" height="1080" loading="lazy">`;
  return original
    ? `<div class="polish-image">${image}</div>`
    : `<button type="button" class="polish-image" data-asset="${esc(asset.id)}" aria-label="Review refined ${esc(asset.title)}">${image}</button>`;
}

export function editorialPolishCard(asset, { statusHTML, compact = false }) {
  if (view === 'grid' || compact) {
    const original = !compact && version === 'original';
    const path = original ? asset.originalPreview : asset.preview;
    const label = original ? 'Original' : 'Refined';
    return `<article class="asset-card polish-card polish-blog-card">
      ${thumbnail(asset, original)}
      <div class="polish-card-meta"><span>${esc(asset.paletteName)} · ${label}</span><a href="${esc(path)}" download aria-label="Download ${label.toLowerCase()} ${esc(asset.title)} PNG">PNG ↓</a></div>
      <h3>${esc(asset.sampleTitle)}</h3>
      <div class="polish-blog-caption"><span>${esc(asset.title)}</span>${original ? '' : statusHTML(asset)}</div>
    </article>`;
  }
  return `<article class="asset-card polish-card polish-pair">
    <div class="polish-pair-heading"><h3><span>${esc(asset.id.slice(-2))}</span>${esc(asset.title)}</h3>${statusHTML(asset)}</div>
    <div class="polish-pair-images">
      <div class="polish-version"><div class="polish-image-label"><span>Original</span><a href="${esc(asset.originalPreview)}" download aria-label="Download original ${esc(asset.title)} PNG">PNG ↓</a></div>${thumbnail(asset, true)}</div>
      <div class="polish-version"><div class="polish-image-label"><span>Refined</span><a href="${esc(asset.preview)}" download aria-label="Download refined ${esc(asset.title)} PNG">PNG ↓</a></div>${thumbnail(asset)}</div>
    </div>
    <ul class="polish-changes" aria-label="What changed">${(asset.changes || []).map(change => `<li>${esc(change)}</li>`).join('')}</ul>
  </article>`;
}
