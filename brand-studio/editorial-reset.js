const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function initEditorialReset(onChange) {
  const root = document.querySelector('#editorial-reset-controls');
  root.innerHTML = `<div class="reset-toolbar">
    <div class="reset-views" role="group" aria-label="Thumbnail size">
      <button type="button" data-reset-view="large" aria-pressed="true">Large artwork</button>
      <button type="button" data-reset-view="feed" aria-pressed="false">Blog view</button>
    </div>
    <a class="outline-button" href="assets/editorial-07/recoup-editorial-directions.zip" download>Download all 10 PNGs ↓</a>
    <a href="editorial-07-recipe.md" download>Prompt recipe ↓</a>
  </div>
  <details class="reset-reference">
    <summary>What we took from the website</summary>
    <p>Open sky. Believable materials. Spacious typography. Blue as atmosphere, forest for depth, and lime as a small, deliberate accent. These are ten different editorial directions to review, not a finished style system.</p>
    <div class="reset-reference-grid">${[['hero','Homepage'],['case-studies','Case studies'],['blog','Blog']].map(([file,label])=>`<a href="assets/editorial-07/reference/website-${file}.png" target="_blank" rel="noopener"><img src="assets/editorial-07/reference/website-${file}.png" alt="Actual Recoup website: ${label}" loading="lazy"><span>${label} ↗</span></a>`).join('')}</div>
  </details>`;
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-reset-view]');
    if (!button) return;
    root.querySelectorAll('[data-reset-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    onChange();
  });
}

export function resetIsFeed() {
  return document.querySelector('[data-reset-view="feed"]').getAttribute('aria-pressed') === 'true';
}

export function editorialResetCard(asset, {statusHTML}) {
  return `<article class="asset-card reset-card">
    <button class="asset-preview is-editorial-art" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.description)}" loading="lazy"></button>
    <div class="asset-card-top"><span class="asset-category">${esc(asset.id.slice(-2))} / ${esc(asset.title)}</span>${statusHTML(asset)}</div>
    <h3>${esc(asset.sampleTitle)}</h3>
    <p class="reset-rationale">${esc(asset.description)}</p>
    <div class="reset-card-meta"><span>Example article · Visual study</span><a href="${esc(asset.preview)}" download>PNG ↓</a></div>
  </article>`;
}
