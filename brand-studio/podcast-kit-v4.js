import { STUDIES, renderPodcastArtworkSVG } from './podcast-scenes-v4.mjs';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const state = { study: 'current' };
const assetRoot = 'assets/podcast-kit-v4';
const activeStudy = () => STUDIES.find(item => item.id === state.study) || STUDIES[0];
let toastTimer;

function readURL() {
  const id = new URL(location.href).searchParams.get('study');
  state.study = STUDIES.some(item => item.id === id) ? id : 'current';
}

function updateURL() {
  const url = new URL(location.href);
  url.searchParams.set('study', state.study);
  history.replaceState(null, '', url);
}

function notify(message) {
  $('#status').textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('#status').textContent = ''; }, 6500);
}

function renderCards() {
  $('#study-cards').innerHTML = STUDIES.map((study, index) => `<button type="button" class="study" data-study="${esc(study.id)}" aria-pressed="${study.id === state.study}" aria-label="Preview ${esc(study.name)}">
    <img src="${assetRoot}/${esc(study.id)}.png" alt="Recoup Podcast — ${esc(study.name)}" width="1920" height="1080">
    <span class="study-meta"><span class="study-name"><small>${String(index + 1).padStart(2, '0')}</small><strong>${esc(study.name)}</strong></span><span class="study-indicator"><span>Selected</span><i aria-hidden="true">✓</i></span></span>
    <span class="study-caption">${esc(study.description)}</span>
  </button>`).join('');
  $('#study-cards').setAttribute('aria-busy', 'false');
}

function renderStage() {
  const study = activeStudy();
  $('#stage').innerHTML = renderPodcastArtworkSVG({ study: study.id, fontCSS: '', backgroundHref: study.background });
  $('#stage').setAttribute('aria-label', `Recoup Podcast — ${study.name}`);
  $('#preview-title').textContent = study.name;
  $('#study-description').textContent = study.description;
  const links = [
    ['#download-png', `${assetRoot}/${study.id}.png`],
    ['#download-svg', `${assetRoot}/${study.id}.svg`],
    ['#download-background', study.background],
    ['#open-artwork', `${assetRoot}/${study.id}.png`],
  ];
  for (const [selector, href] of links) {
    $(selector).href = href;
    $(selector).removeAttribute('aria-disabled');
  }
  document.querySelectorAll('[data-study]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.study === state.study)));
}

async function preloadImage(url) {
  const image = new Image();
  image.src = url;
  try { await image.decode(); }
  catch { throw new Error('An artwork file could not load. Refresh to try again.'); }
}

async function start() {
  readURL();
  // Covers are the exact exported images; the larger preview keeps live vector lettering.
  await Promise.all([
    ...STUDIES.flatMap(study => [preloadImage(`${assetRoot}/${study.id}.png`), preloadImage(study.background)]),
    ...['300 20px "DM Sans"', '600 20px "DM Sans"', '400 12px "IBM Plex Mono"'].map(font => document.fonts.load(font)),
  ]);
  await document.fonts.ready;
  renderCards();
  renderStage();
  $('#study-cards').addEventListener('click', event => {
    const button = event.target.closest('[data-study]');
    if (!button || !STUDIES.some(study => study.id === button.dataset.study)) return;
    state.study = button.dataset.study;
    renderStage();
    updateURL();
    $('#preview').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
  window.addEventListener('popstate', () => { readURL(); renderStage(); });
  window.addEventListener('pagehide', () => clearTimeout(toastTimer));
}

start().catch(error => {
  $('#study-cards').setAttribute('aria-busy', 'false');
  $('#study-cards').innerHTML = '<p class="loading">The backgrounds could not load. Refresh to try again.</p>';
  $('#stage').textContent = 'The preview could not load. Refresh to try again.';
  notify(error.message);
});
