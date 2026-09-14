const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let use = 'thumbnail', treatment = 'gradient';
const passages = {
  'editorial09-a01': {
    heading: 'Keep the source attached to the answer.',
    before: 'An answer is easier to review when it points back to the material it used. Documents, emails, and notes can contribute to the same answer while keeping their sources visible.',
    caption: 'Each part of the answer points back to a source the reviewer can open and check.',
    after: 'The review step is concrete: open the cited material, check whether it supports the answer, and correct anything that does not. A citation makes checking possible; it does not guarantee that the answer is right.'
  },
  'editorial09-a02': {
    heading: 'Give people a clear review step.',
    before: 'Decide where a person needs to take over before building the workflow. In this example, AI prepares the draft, a reviewer checks and edits it, and only approved work moves forward.',
    caption: 'Preparation, review, and approval are separate steps with a clear handoff.',
    after: 'Give the reviewer the draft, its source material, and a clear decision to make. Approval should mean someone checked the work against defined criteria.'
  }
};

export function initEditorialRefinement(onChange) {
  const root = document.querySelector('#editorial-refinement-controls');
  root.innerHTML = `<div class="refinement-toolbar"><div class="refinement-tabs" role="group" aria-label="Editorial use"><button data-editorial-use="thumbnail" aria-pressed="true">Thumbnails</button><button data-editorial-use="article" aria-pressed="false">Inside articles</button></div><div class="refinement-compare" role="group" aria-label="Thumbnail treatment"><button data-editorial-treatment="gradient" aria-pressed="true">Subtle gradient</button><button data-editorial-treatment="original" aria-pressed="false">Original</button></div><a href="assets/editorial-09/recoup-editorial-refinements.zip" download>Download the study ↓</a></div><p id="refinement-purpose" class="refinement-purpose">Five earlier type-and-pattern covers, with a faint edge gradient. Switch to Original to compare. The patterns remain an earlier study, not an approved direction.</p><details class="refinement-rules"><summary>The shared visual rules</summary><div><p><strong>Thumbnails</strong>Clear sentence-case headlines, restrained patterns, one dominant color, and a faint edge gradient. Keep the space behind the headline quiet.</p><p><strong>Inside an article</strong>Choose a diagram, chart, infographic, or metaphorical or anthropomorphic illustration to explain the idea. Keep the same palette and line character, with readable relationships and a useful caption.</p><p><strong>Review</strong>The typography and palettes informed the next study. These earlier patterns, gradient edits, and explanatory illustrations are not an approved Recoup direction.</p></div><a href="editorial-09-recipe.md" download>Download the reusable art brief ↓</a></details>`;
  root.addEventListener('click', event => {
    const tab = event.target.closest('[data-editorial-use]');
    const comparison = event.target.closest('[data-editorial-treatment]');
    if (tab) use = tab.dataset.editorialUse;
    if (comparison) treatment = comparison.dataset.editorialTreatment;
    if (!tab && !comparison) return;
    root.querySelectorAll('[data-editorial-use]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.editorialUse === use)));
    root.querySelectorAll('[data-editorial-treatment]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.editorialTreatment === treatment)));
    root.querySelector('.refinement-compare').hidden = use !== 'thumbnail';
    document.querySelector('#refinement-purpose').textContent = use === 'thumbnail' ? 'Five earlier type-and-pattern covers, with a faint edge gradient. Switch to Original to compare. The patterns remain an earlier study, not an approved direction.' : 'Two illustration proposals shown inside sample article passages. Judge whether the image helps you understand the idea.';
    onChange();
  });
}
export const matchesEditorialRefinement = asset => asset.family === use;
export const editorialRefinementIsArticle = () => use === 'article';
export function editorialRefinementCard(asset, {statusHTML}) {
  if (asset.family === 'article') {
    const passage = passages[asset.id];
    return `<article class="article-study"><div class="article-study-meta"><span>ARTICLE EXCERPT / ILLUSTRATION STUDY</span>${statusHTML(asset)}</div><h3>${esc(passage.heading)}</h3><p>${esc(passage.before)}</p><figure><button data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.sampleTitle)}"><img src="${esc(asset.preview)}" alt="${esc(asset.description)}" loading="lazy"></button><figcaption>${esc(passage.caption)} <a href="${esc(asset.preview)}" download>PNG ↓</a></figcaption></figure><p>${esc(passage.after)}</p><span class="article-example-note">Example content for design review.</span></article>`;
  }
  const original = treatment === 'original';
  const path = original ? asset.originalPreview : asset.preview;
  const id = original ? asset.originalId : asset.id;
  return `<article class="asset-card refinement-card"><button class="asset-preview is-editorial-art" data-asset="${esc(id)}" aria-label="Open ${esc(asset.sampleTitle)} — ${original ? 'original' : 'subtle gradient'}"><img src="${esc(path)}" alt="${esc(original ? `Original ${asset.paletteName} type-and-pattern thumbnail` : asset.description)}" loading="lazy"></button><div class="asset-card-top"><span class="asset-category">${esc(asset.id.slice(-2))} / TYPE + PATTERN</span>${original ? '<span class="asset-status">Earlier study</span>' : statusHTML(asset)}</div><h3>${esc(asset.sampleTitle)}</h3><div class="system-card-meta"><span>${esc(asset.paletteName)} · ${original ? 'Original' : 'Subtle edge gradient'}</span><a href="${esc(path)}" download>PNG ↓</a></div></article>`;
}
