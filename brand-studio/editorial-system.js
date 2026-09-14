const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let family = 'all';

export function initEditorialSystem(onChange) {
  const root = document.querySelector('#editorial-system-controls');
  root.innerHTML = `<div class="system-toolbar"><a href="?collection=editorial-09#browse">See the subtle-gradient refinements ↗</a>
    <div class="system-families" role="group" aria-label="Editorial family">
      <button type="button" data-system-family="all" aria-pressed="true">Compare both</button>
      <button type="button" data-system-family="illustration" aria-pressed="false">Illustration</button>
      <button type="button" data-system-family="pattern" aria-pressed="false">Type + pattern</button>
    </div>
    <a class="outline-button" href="assets/editorial-08/recoup-editorial-system.zip" download>Download all 10 PNGs ↓</a>
    <a href="editorial-08-recipe.md" download>Prompt recipe ↓</a>
  </div>
  <details class="system-notes"><summary>The patterns behind this study</summary>
    <div class="system-principles">
      <div><span>01 / Color</span><h3>One dominant field.</h3><p>Roughly 80% of the cover stays in one color. Blue, forest, pale blue, white, and lime create variety without a new visual language.</p></div>
      <div><span>02 / Graphic</span><h3>One small idea.</h3><p>Expressive ink illustrations or precise abstract patterns. Space and proportion do the work; each subject stays deliberately simple.</p></div>
      <div><span>03 / Type</span><h3>One clear voice.</h3><p>Sentence case and open, regular-weight sans serif. The illustration family keeps the title below; the pattern family brings it into the cover.</p></div>
    </div>
    <p class="system-source-links">Reference systems: <a href="https://claude.com/blog" target="_blank" rel="noopener">Anthropic’s blog ↗</a> <a href="https://www.langchain.com/blog" target="_blank" rel="noopener">LangChain’s blog ↗</a></p>
    <p class="small muted">Original Recoup studies inspired by the references’ structure. Generated lettering approximates DM Sans; approved production layouts should use the actual font as editable type.</p>
  </details>`;
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-system-family]');
    if (!button) return;
    family = button.dataset.systemFamily;
    root.querySelectorAll('[data-system-family]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    onChange();
  });
}

export function matchesEditorialSystem(asset) {
  return family === 'all' || asset.family === family;
}

export function editorialSystemCard(asset, {statusHTML}) {
  const label = asset.family === 'illustration' ? 'Illustration' : 'Type + pattern';
  return `<article class="asset-card system-card">
    <button class="asset-preview is-editorial-art" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.description)}" loading="lazy"></button>
    <div class="asset-card-top"><span class="asset-category">${esc(asset.id.slice(-2))} / ${label}</span>${statusHTML(asset)}</div>
    <h3>${esc(asset.sampleTitle)}</h3>
    <div class="system-card-meta"><span>${esc(asset.paletteName)} · Example article</span><a href="${esc(asset.preview)}" download>PNG ↓</a></div>
  </article>`;
}
