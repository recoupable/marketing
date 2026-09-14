const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let size = 'large';

export const editorialExperimentsAreThumbnails = () => size === 'thumbnail';

export function initEditorialExperiments(onChange) {
  const root = document.querySelector('#editorial-experiments-controls');
  root.innerHTML = `<div class="experiments-toolbar">
    <div class="experiments-size" role="group" aria-label="Preview size">
      <button type="button" data-experiments-size="thumbnail" aria-pressed="false">Thumbnail size</button>
      <button type="button" data-experiments-size="large" aria-pressed="true">Large previews</button>
    </div>
    <a class="experiments-download" href="assets/editorial-13/recoup-editorial-experiments.zip" download>Download set ↓</a>
  </div>
  <details class="experiments-reference"><summary>What we took from the references</summary>
    <p>Our interpretation of the references, including Duetti, guided these experiments. These are observations about the work, rather than claims about the designers’ intent.</p>
    <ul>
      <li><strong>Calm and active areas.</strong> Give the headline room, then concentrate the energy elsewhere.</li>
      <li><strong>Large changes in scale.</strong> Let a big crop or a small detail shape the composition.</li>
      <li><strong>Repeated forms.</strong> Build rhythm through repetition, with a deliberate interruption.</li>
      <li><strong>Print-like texture.</strong> Try tactile surfaces that feel made and give color more character.</li>
      <li><strong>Varied compositions.</strong> Change the placement, material, and visual idea while keeping Recoup’s color world.</li>
    </ul>
    <a class="experiments-creative-notes" href="assets/editorial-13/creative-notes.md">Read creative notes ↗</a>
  </details>`;
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-experiments-size]');
    if (!button || !['thumbnail', 'large'].includes(button.dataset.experimentsSize)) return;
    size = button.dataset.experimentsSize;
    root.querySelectorAll('[data-experiments-size]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.experimentsSize === size)));
    onChange();
  });
}

export function editorialExperimentsCard(asset, { statusHTML, editable = false }) {
  const svg = editable ? asset.files?.find(file => file.path === asset.preview.replace(/\.png$/i, '.svg')) : undefined;
  return `<article class="asset-card experiments-card">
    <button type="button" class="experiments-image" data-asset="${esc(asset.id)}" aria-label="Review ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.title)}. ${esc(asset.description)}" width="${esc(asset.width || 1920)}" height="${esc(asset.height || 1080)}" loading="lazy"></button>
    <div class="experiments-card-meta"><span>${esc(asset.id.slice(-2))} · ${esc(asset.paletteName)}</span>${statusHTML(asset)}</div>
    <div class="experiments-card-heading"><h3>${esc(asset.title)}</h3><span class="experiments-card-downloads"><a href="${esc(asset.preview)}" download aria-label="Download ${esc(asset.title)} PNG">PNG ↓</a>${svg ? `<a href="${esc(svg.path)}" download aria-label="Download ${esc(asset.title)} editable SVG">SVG ↓</a>` : ''}</span></div>
    <p class="experiments-description">${esc(asset.description)}</p>
  </article>`;
}
