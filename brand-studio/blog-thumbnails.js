const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const thumbnailTypeNames = {
  bold: 'Bold sentence case',
  editorial: 'Light editorial',
  capitals: 'Condensed capitals',
  mixed: 'Mixed-size headlines',
  highlight: 'Highlighted phrase',
  mono: 'Monospaced headline',
};
const paletteNames = {'blue-lime':'Blue + lime', 'forest-blue':'Forest + blue'};

export function initBlogThumbnails(onChange) {
  const root = document.querySelector('#blog-thumbnail-controls');
  root.innerHTML = `<div class="blog-thumbnail-toolbar">
    <label>Text style<select id="blog-type"><option value="all">All text styles</option>${Object.entries(thumbnailTypeNames).map(([id,name])=>`<option value="${id}">${name}</option>`).join('')}</select></label>
    <label>Palette<select id="blog-palette"><option value="all">Both palettes</option>${Object.entries(paletteNames).map(([id,name])=>`<option value="${id}">${name}</option>`).join('')}</select></label>
    <a class="outline-button" href="assets/blog-thumbnails/recoup-blog-thumbnails.zip" download>Download all 12 PNGs ↓</a>
    <a href="blog-thumbnail-recipe.md" download>Reusable recipe ↓</a>
  </div>`;
  root.addEventListener('change',onChange);
}

export function matchesBlogFilters(asset) {
  const type = document.querySelector('#blog-type').value;
  const palette = document.querySelector('#blog-palette').value;
  return (type === 'all' || asset.typeStyle === type) && (palette === 'all' || asset.palette === palette);
}

export function resetBlogFilters() {
  document.querySelector('#blog-type').value = 'all';
  document.querySelector('#blog-palette').value = 'all';
}

export function blogThumbnailCard(asset, {statusHTML}) {
  return `<article class="asset-card blog-thumbnail-card">
    <button class="asset-preview is-editorial-art" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.title)} — ${esc(asset.description)}" loading="lazy"></button>
    <div class="asset-card-top"><span class="asset-category">${esc(asset.id.slice(-2))} / ${esc(thumbnailTypeNames[asset.typeStyle])}</span>${statusHTML(asset)}</div>
    <h3>${esc(asset.title)}</h3>
    <div class="blog-thumbnail-meta"><span>${esc(paletteNames[asset.palette])} · Example article</span><a href="${esc(asset.preview)}" download>PNG ↓</a></div>
  </article>`;
}
