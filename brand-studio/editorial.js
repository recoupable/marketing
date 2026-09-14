const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const editorialDirections = [
  ['Sculptural still life', 'A tangible object or interaction that makes the article’s central tension visible.'],
  ['Vinyl macro', 'An unusually close crop of a material detail. Use music objects only when relevant to the argument.'],
  ['Botanical portrait', 'One natural subject whose structure, condition, or behavior expresses a specific idea from the article. Avoid generic growth symbolism.'],
  ['Human detail', 'A close, candid-feeling view of people doing a relevant task. Preserve natural skin tones. Generated scenes are illustrative, never real customer evidence.'],
  ['Expressive line illustration', 'A simple hand-drawn action with imperfect forest-ink lines, restrained flat color, and one readable idea.'],
  ['Paper sculpture', 'A tactile cut-paper construction that expresses a specific relationship, sequence, or handoff.'],
  ['Archival collage', 'A purposeful assembly of photographic and paper fragments. Use supplied archives for historical claims; generated fragments must be clearly illustrative.'],
  ['Graphic diagram', 'A precise conceptual relationship expressed with a few shapes and lines. For a real process, build from supplied steps and labels; never invent evidence.'],
  ['Typographic cover', 'One short, exact editorial statement with bold DM Sans typography. Make the type the subject; add it as an editable layer after generating the background.'],
  ['Architectural photograph', 'A strong spatial composition with a specific connection to the article. Avoid an interchangeable hallway-as-the-future metaphor.'],
];

export const editorialRecipe = `Create one editorial artwork for Recoup.

Article: [TITLE]
Core argument: [ONE-SENTENCE ARGUMENT]
Reader: music executives, music funds, and rightsholders.
The image should communicate: [SPECIFIC IDEA OR TENSION]

Use [MEDIUM], showing [SUBJECT OR ACTION] through [COMPOSITION OR CROP]. Choose these because [CONNECTION TO THE ARTICLE]. Make one idea immediately visible at thumbnail size. If the image could accompany five unrelated articles unchanged, sharpen the concept.

Keep Recoup’s confident simplicity: purposeful space, controlled contrast, and restrained tactile detail. Color anchors: blue #007EBD / #168DDD, lime #D6FF62, forest #132B26, and ivory #F8FAF5. Choose a subset; not every image needs every color. Preserve believable skin, material, and documentary colors. Use the approved Blue to lime / Fine grain reference for color energy or delicate grain when appropriate, while inventing a fresh subject and composition. A gradient is optional.

Output a landscape 16:9 image. Keep essential details inside a 7% safe area. Default to text-free artwork with the article title placed below it. Add exact editable typography and approved logos separately; no generated marks, incidental lettering, or watermarks.

Recent six covers: [SUBJECT, MEDIUM, COMPOSITION, DOMINANT COLOR]
Avoid repeating their subject–medium combinations or visual silhouette. Change at least two meaningful dimensions from the latest cover. Relevance comes before novelty; deliberate series continuity is allowed.

When the article relies on evidence, use supplied screenshots, photographs, documents, and data. Preserve factual content. Never invent interface states, numbers, identities, quotations, or archival provenance. Choose only visually approved styles for production; these ten directions are still proposals.`;

export function editorialCard(asset, { feed, statusHTML }) {
  return `<article class="asset-card editorial-card">
    <button class="asset-preview is-editorial-art" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.description)}" loading="lazy"></button>
    <div class="asset-card-top"><span class="asset-category">${esc(asset.title)}</span>${statusHTML(asset)}</div>
    <h3>${esc(feed ? asset.sampleTitle : asset.title)}</h3>
    ${feed ? '<p class="sample-label">Example article · Visual study</p>' : `<p>${esc(asset.description)}</p><p class="editorial-sample"><span>Example article</span>${esc(asset.sampleTitle)}</p>`}
  </article>`;
}

export function editorialAssetDetails(asset) {
  if (asset.category === 'editorial-15') return `<div class="editorial-context native-editorial-context"><span class="eyebrow">Your original type treatment</span><p>DM Sans · weight 450 · size 110px · line spacing 125px · letter spacing −4.95px. The headline and its placement follow the preferred source cover.</p><span class="eyebrow">Scale &amp; coverage</span><p>${esc(asset.coverageRule)}</p><span class="eyebrow">Pattern</span><p>${esc(asset.patternRule)}</p><span class="eyebrow">Light &amp; color</span><p>${esc(asset.gradientRule)}</p><p class="small">Native vector artwork with editable type. Download the complete thumbnail or the pattern without text as a PNG or SVG.</p></div>`;
  if (asset.category === 'editorial-14') return `<div class="editorial-context native-editorial-context"><span class="eyebrow">Your original type treatment</span><p>DM Sans · weight 450 · size 110px · line spacing 125px. The headline, spacing, and placement match the preferred source cover.</p><span class="eyebrow">Pattern</span><p>${esc(asset.patternRule)}</p><span class="eyebrow">Light &amp; color</span><p>${esc(asset.gradientRule)}</p><p class="small">Native vector artwork with editable type. Download the complete thumbnail or the pattern without text as a PNG or SVG.</p></div>`;
  if (asset.category === 'editorial-13') return `<div class="editorial-context generated-experiment-context"><span class="eyebrow">Generated concept artwork</span><p>Lettering is generated within the artwork. This is a visual concept for review; final production typography can follow once a direction is chosen.</p><span class="eyebrow">Visual idea</span><p>${esc(asset.principle)}</p><span class="eyebrow">Type direction</span><p>${esc(asset.typography)}</p><span class="eyebrow">Example article</span><p>${esc(asset.sampleTitle)}</p><details class="asset-prompt"><summary>View this image’s prompt</summary><pre>${esc(asset.prompt)}</pre><button type="button" class="outline-button" data-copy="${esc(asset.prompt)}">Copy image prompt</button></details></div>`;
  if (asset.category === 'editorial-12') return `<div class="editorial-context native-editorial-context"><span class="eyebrow">Native vector artwork with editable type</span><p>${esc(asset.typography || 'DM Sans')}. This treatment remains proposed for your review.</p><span class="eyebrow">What to look for</span><ul>${(asset.changes || []).map(change => `<li>${esc(change)}</li>`).join('')}</ul><span class="eyebrow">Pattern</span><p>${esc(asset.patternRule)}</p><span class="eyebrow">Light &amp; color</span><p>${esc(asset.gradientRule)}</p><p class="small">Download this thumbnail or the artwork without text. Both include an editable SVG and a PNG.</p></div>`;
  if (asset.category === 'editorial-11') return `<div class="editorial-context native-editorial-context"><span class="eyebrow">Native vector artwork with editable type</span><p>${esc(asset.typography || 'DM Sans')}. The refinement remains proposed for your review.</p><span class="eyebrow">What changed</span><ul>${(asset.changes || []).map(change => `<li>${esc(change)}</li>`).join('')}</ul><span class="eyebrow">Pattern</span><p>${esc(asset.patternRule)}</p><span class="eyebrow">Light &amp; color</span><p>${esc(asset.gradientRule)}</p><p class="small">Download the refined thumbnail or the artwork without text. Both include an editable SVG and a PNG.</p></div>`;
  if (asset.category === 'editorial-10') return `<div class="editorial-context native-editorial-context"><span class="eyebrow">Native vector artwork with editable type</span><p>${esc(asset.typography)}. This direction remains proposed for visual review.</p><span class="eyebrow">Pattern</span><p>${esc(asset.patternRule)}</p><span class="eyebrow">Light &amp; color</span><p>${esc(asset.gradientRule)}</p><span class="eyebrow">Example article</span><p>${esc(asset.sampleTitle)}</p><p class="small">Download the comparison, example article, or artwork without text. Each includes an editable SVG and a PNG.</p></div>`;
  if (!['editorial-lab', 'layered-editorial', 'blog-thumbnails', 'editorial-07', 'editorial-08', 'editorial-09'].includes(asset.category)) return '';
  if (['editorial-07', 'editorial-08', 'editorial-09'].includes(asset.category)) return `<div class="editorial-context"><span class="eyebrow">Example article</span><p>${esc(asset.sampleTitle)}</p><span class="eyebrow">Type treatment</span><p>${esc(asset.typography)}</p><p class="small">Generated editorial artwork. This direction remains proposed for visual review.</p><details class="asset-prompt"><summary>View this image’s prompt</summary><pre>${esc(asset.prompt)}</pre><button type="button" class="outline-button" data-copy="${esc(asset.prompt)}">Copy image prompt</button></details></div>`;
  if (asset.category === 'blog-thumbnails') return `<div class="editorial-context"><span class="eyebrow">Text treatment</span><p>${esc(asset.typography)}</p><span class="eyebrow">Exact headline</span><p style="white-space:pre-line">${esc(asset.headline)}</p><p class="small">Example article topic. This downloadable PNG includes the headline.</p><details class="asset-prompt"><summary>View this image’s prompt</summary><pre>${esc(asset.prompt)}</pre><button type="button" class="outline-button" data-copy="${esc(asset.prompt)}">Copy image prompt</button></details></div>`;
  return `<div class="editorial-context"><span class="eyebrow">Example article</span><p>${esc(asset.sampleTitle)}</p>${asset.headline ? `<span class="eyebrow">Headline</span><p>${esc(asset.headline)}</p><p class="small">The headline is part of this PNG. Keep type editable when preparing a final layout.</p>` : ''}${asset.useFor?.length ? `<span class="eyebrow">Useful for</span><p>${esc(asset.useFor.join(' · '))}</p>` : ''}<details class="asset-prompt"><summary>View this image’s prompt</summary><pre>${esc(asset.prompt)}</pre><button type="button" class="outline-button" data-copy="${esc(asset.prompt)}">Copy image prompt</button></details></div>`;
}

export const layeredRecipe = `Create one layered editorial cover for Recoup.

Article: [TITLE]
Core argument: [ONE-SENTENCE ARGUMENT]
Reader: music executives, music funds, and rightsholders.
Visual idea: [SPECIFIC IDEA OR TENSION]
Medium: [MEDIUM]
Subject or action: [SUBJECT OR ACTION]
Connection to the article: [CONNECTION TO THE ARTICLE]

BACKGROUND: A full-bleed, softly diffused gradient using [PALETTE]. Broad color transitions and delicate, even analog grain. Use the approved Blue to lime / Fine grain image as a reference for texture and color energy, without copying its composition. The atmosphere fills the frame; no flat panel behind the subject.

GRAPHIC: One distinctive, immediately recognizable subject. Place it in [SUBJECT AREA]. Preserve its material, important geometry, and crisp edges. For illustration, use expressive forest-ink linework and restrained ivory/lime shapes. For photography, preserve natural skin and material colors. Avoid decorative objects that do not explain the article.

TYPE: [TYPE INSTRUCTION]
Plan type and subject together. Reserve quiet space in [TYPE AREA], within a 7% safe margin. Check contrast behind every word, across its entire footprint. Use ivory over deep blue or forest over light areas. Reposition the gradient or subject if needed; do not rely on outlines, shadows, or a text box. Type must not cover fingers, a flower center, cable junctions, or diagram steps.

Output 16:9. Background supplies atmosphere, the subject carries the idea, and any headline states it plainly. No extra lettering, logos, signatures, or watermarks. A generated cover with type is a visual proposal; use editable DM Sans typography for final production.

For matched comparisons, generate the text-free composition first. Reference that exact output when adding a headline or changing its palette. Retain crop, scale, position, and lighting. Change only the requested layer.

Recent six covers: [SUBJECT, MEDIUM, COMPOSITION, DOMINANT COLOR]
Across different articles, vary subject, medium, silhouette, placement, and dominant color. Change at least two meaningful dimensions, while retaining restrained grain and confident contrast. Choose the idea that fits the article, not a random object or gradient.

Use supplied screenshots, source documents, and data when factual content matters. Never invent product states, numbers, quotations, or archival provenance. New palettes and compositions remain proposals until visually approved.`;

const layerPalettes = [
  ['Blue + lime', 'blue #007EBD / #168DDD into lime #D6FF62, with forest #132B26 and ivory #F8FAF5 as subject/type anchors'],
  ['Butter + lime', 'pale butter and ivory #F8FAF5 into lime #D6FF62, with a restrained blue #168DDD bloom'],
  ['Forest + blue', 'forest #132B26 into cobalt and blue #168DDD, with restrained lime #D6FF62 light'],
  ['Lavender + blue', 'periwinkle #B9C8EF into sky blue #168DDD, with a restrained lime #D6FF62 edge glow'],
  ['Apricot + ivory', 'warm apricot #FFB87A into ivory #F8FAF5, with a small blue #168DDD glow'],
];
let layeredCollection = false;

export function layeredCard(asset, { statusHTML }) {
  const labels = { gradient: '01 / Gradient + graphic', headline: '02 / Add a headline', color: '03 / Try another palette' };
  return `<article class="asset-card editorial-card layered-card"><button class="asset-preview is-editorial-art" data-asset="${esc(asset.id)}" aria-label="Open ${esc(asset.title)}"><img src="${esc(asset.preview)}" alt="${esc(asset.description)}" loading="lazy"></button><div class="asset-card-top"><span class="asset-category">${labels[asset.treatment] || esc(asset.treatment)}</span>${statusHTML(asset)}</div><h3>${esc(asset.title)}</h3></article>`;
}

function syncPromptFields() {
  const root = document.querySelector('#editorial-controls');
  const treatment = root.querySelector('[name="treatment"]').value;
  root.querySelector('#prompt-palette-field').hidden = treatment === 'artwork';
  root.querySelector('#prompt-headline-field').hidden = treatment !== 'headline';
  root.querySelector('[name="headline"]').required = treatment === 'headline';
}

export function setEditorialCollection(layered, reset = false) {
  layeredCollection = layered;
  const root = document.querySelector('#editorial-controls');
  root.querySelector('[aria-label="Editorial medium"]').hidden = layered;
  root.querySelector('[aria-label="Editorial preview"]').hidden = layered;
  root.querySelector('[aria-label="Cover subject"]').hidden = !layered;
  root.querySelector('.layered-treatment-label').hidden = !layered;
  root.querySelector('#editorial-base-prompt').textContent = layered ? layeredRecipe : editorialRecipe;
  root.querySelector('#download-editorial-recipe').href = layered ? 'layered-editorial-recipe.md' : 'editorial-recipe.md';
  if (reset) {
    root.querySelectorAll('[data-editorial-family], [data-layered-family]').forEach(button => button.setAttribute('aria-pressed', String((button.dataset.editorialFamily || button.dataset.layeredFamily) === 'all')));
    root.querySelector('#layered-treatment').value = 'all';
    root.querySelector('[name="treatment"]').value = layered ? 'gradient' : 'artwork';
    root.querySelector('#editorial-prompt-result').hidden = true;
    syncPromptFields();
  }
}

export function initEditorial({ onFamily, onView, onLayeredFamily, onTreatment, copy }) {
  const root = document.querySelector('#editorial-controls');
  root.innerHTML = `<div class="editorial-toolbar">
    <div class="editorial-families" role="group" aria-label="Editorial medium">${[['all','All 10 ideas'],['photography','Photography'],['illustration','Illustration'],['collage','Collage'],['graphic','Graphic design']].map(([id,label])=>`<button type="button" data-editorial-family="${id}" aria-pressed="${id==='all'}">${label}</button>`).join('')}</div>
    <div class="editorial-views" role="group" aria-label="Editorial preview"><button type="button" data-editorial-view="feed" aria-pressed="true">Blog feed</button><button type="button" data-editorial-view="artwork" aria-pressed="false">Artwork</button></div>
    <div class="editorial-families" role="group" aria-label="Cover subject" hidden>${[['all','All 12 covers'],['hand','Hand illustration'],['review','Review diagram'],['flower','Flower'],['cables','Cables']].map(([id,label])=>`<button type="button" data-layered-family="${id}" aria-pressed="${id==='all'}">${label}</button>`).join('')}</div>
    <label class="layered-treatment-label" hidden>Treatment<select id="layered-treatment"><option value="all">All treatments</option><option value="gradient">Gradient + graphic</option><option value="headline">With a headline</option><option value="color">Other palettes</option></select></label>
  </div>
  <details class="editorial-recipe-panel">
    <summary><span>One identity. A different idea for every article.</span><span class="recipe-summary-action">Prompt recipe +</span></summary>
    <div class="editorial-recipe-body">
      <div class="recipe-principles"><div><span>01 / Keep</span><h3>The visual language.</h3><p>Blue and lime as anchors, confident contrast, purposeful space, and crisp typography. Use grain where it suits the medium.</p></div><div><span>02 / Change</span><h3>The subject and medium.</h3><p>Start with the article’s point. Choose a photograph, illustration, collage, diagram, or type treatment that helps explain it.</p></div><div><span>03 / Compare</span><h3>The last six covers.</h3><p>Vary the subject, crop, dominant color, and medium. Choose the best idea for the article before trying to make it different.</p></div></div>
      <p class="recipe-evidence-note">Product walkthroughs and research need real screenshots or data. Use those as the main visual; the brand treatment supports them.</p>
      <div class="recipe-actions"><button type="button" id="copy-editorial-recipe" class="outline-button">Copy reusable recipe</button><a id="download-editorial-recipe" href="editorial-recipe.md" download>Download recipe ↓</a></div>
      <details class="base-recipe"><summary>Read the full reusable recipe</summary><pre id="editorial-base-prompt"></pre></details>
      <form id="editorial-prompt-form" class="editorial-prompt-form">
        <div class="prompt-form-heading"><h3>Prepare a prompt for your article.</h3><p>This creates a prompt to use with an image model. It does not generate or publish an image.</p></div>
        <label>Article title<input name="title" required maxlength="240" placeholder="What is the article called?"></label>
        <label>Editorial direction<select name="direction">${editorialDirections.map(([title],i)=>`<option value="${i}">${esc(title)}</option>`).join('')}</select></label>
        <label>Composition<select name="treatment"><option value="artwork">Artwork without text</option><option value="gradient">Gradient + graphic</option><option value="headline">Gradient + graphic + headline</option></select></label>
        <label id="prompt-palette-field" hidden>Gradient palette<select name="palette">${layerPalettes.map(([name],i)=>`<option value="${i}">${name}</option>`).join('')}</select></label>
        <label class="full-width" id="prompt-headline-field" hidden>Exact headline<input name="headline" maxlength="100" placeholder="A short, direct headline. These exact words will be used."></label>
        <label class="full-width">What should the reader understand?<textarea name="argument" required maxlength="1200" placeholder="The main argument in one or two sentences."></textarea></label>
        <label class="full-width">Visual idea (optional)<input name="subject" maxlength="500" placeholder="A specific subject, action, or visual tension you want to explore."></label>
        <label class="full-width">Recent covers (optional)<textarea name="recent" maxlength="2400" placeholder="List up to six: subject, medium, composition, and dominant color."></textarea></label>
        <button type="submit" class="lime-button">Build my prompt <span>↗</span></button>
      </form>
      <div id="editorial-prompt-result" class="editorial-prompt-result" hidden><label for="editorial-ready-prompt">Your editable prompt</label><textarea id="editorial-ready-prompt" rows="16"></textarea><button type="button" id="copy-editorial-ready" class="outline-button">Copy this prompt</button><p class="small muted" id="editorial-prompt-status" role="status"></p></div>
    </div>
  </details>`;
  root.querySelector('#editorial-base-prompt').textContent = editorialRecipe;
  root.addEventListener('click', event => {
    const family = event.target.closest('[data-editorial-family]');
    if (family) {
      root.querySelectorAll('[data-editorial-family]').forEach(b => b.setAttribute('aria-pressed', String(b === family)));
      onFamily(family.dataset.editorialFamily);
    }
    const view = event.target.closest('[data-editorial-view]');
    if (view) {
      root.querySelectorAll('[data-editorial-view]').forEach(b => b.setAttribute('aria-pressed', String(b === view)));
      onView(view.dataset.editorialView);
    }
    const subject = event.target.closest('[data-layered-family]');
    if (subject) {
      root.querySelectorAll('[data-layered-family]').forEach(button => button.setAttribute('aria-pressed', String(button === subject)));
      onLayeredFamily(subject.dataset.layeredFamily);
    }
  });
  root.querySelector('#layered-treatment').addEventListener('change', event => onTreatment(event.target.value));
  root.querySelector('[name="treatment"]').addEventListener('change', syncPromptFields);
  root.querySelector('#copy-editorial-recipe').addEventListener('click', () => copy(layeredCollection ? layeredRecipe : editorialRecipe));
  root.querySelector('#copy-editorial-ready').addEventListener('click', () => copy(root.querySelector('#editorial-ready-prompt').value));
  root.querySelector('#editorial-prompt-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [medium, guidance] = editorialDirections[Number(data.get('direction'))];
    const replacements = {
      '[TITLE]': String(data.get('title')).trim(),
      '[ONE-SENTENCE ARGUMENT]': String(data.get('argument')).trim(),
      '[SPECIFIC IDEA OR TENSION]': String(data.get('subject')).trim() || 'Choose the most specific, visually expressible tension from the argument above.',
      '[MEDIUM]': `${medium}. Direction guidance: ${guidance}`,
      '[SUBJECT OR ACTION]': String(data.get('subject')).trim() || 'one tangible subject or action that expresses that tension',
      '[COMPOSITION OR CROP]': 'one decisive composition, with a clear focal point and purposeful space',
      '[CONNECTION TO THE ARTICLE]': 'the subject expresses the article’s actual argument; explain the connection in one sentence before generating',
      '[SUBJECT, MEDIUM, COMPOSITION, DOMINANT COLOR]': String(data.get('recent')).trim() || 'Not supplied. Compare with the recent covers before approving this image.',
      '[PALETTE]': layerPalettes[Number(data.get('palette'))][1],
      '[SUBJECT AREA]': 'the right half, leaving the left half quiet; adjust the placement if the subject needs a different silhouette',
      '[TYPE AREA]': 'the left half, clear of the subject and important details',
      '[TYPE INSTRUCTION]': data.get('treatment') === 'headline' ? `Use this exact headline and no other text: ${JSON.stringify(String(data.get('headline')).trim())}. Set it in bold, crisp DM Sans-like grotesk type. The headline must remain readable at thumbnail size.` : 'No text. Preserve a quiet area so a headline can be added in a matched variation.',
    };
    const template = data.get('treatment') === 'artwork' ? editorialRecipe : layeredRecipe;
    let prompt = template.replace(/\[[^\]]+\]/g, token => replacements[token] ?? token);
    if (medium === 'Typographic cover' && data.get('treatment') !== 'headline') prompt += '\n\nFor this direction, first propose a short exact headline for approval. Generate only the supporting artwork, then compose that approved headline as editable DM Sans type. The raster example in the study demonstrates the idea; production typography should remain editable.';
    root.querySelector('#editorial-ready-prompt').value = prompt;
    root.querySelector('#editorial-prompt-result').hidden = false;
    root.querySelector('#editorial-prompt-status').textContent = 'Prompt ready. Review the subject and color choices before generating.';
    root.querySelector('#editorial-ready-prompt').focus();
  });
}
