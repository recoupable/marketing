import { PALETTES, PATTERNS, renderPodcastStudySVG } from './podcast-scenes-v3.mjs';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
const state = { palette: 'forest', pattern: 'links' };
const boardURLs = new Set();
let fontCSS = '', ready = false, exporting = false, toastTimer;
const activePalette = () => PALETTES.find(item => item.id === state.palette) || PALETTES[0];
const activePattern = () => PATTERNS.find(item => item.id === state.pattern) || PATTERNS[0];
const source = options => renderPodcastStudySVG({ ...state, fontCSS, ...options });

function readURL() {
  const params = new URL(location.href).searchParams;
  state.palette = PALETTES.some(item => item.id === params.get('palette')) ? params.get('palette') : 'forest';
  state.pattern = PATTERNS.some(item => item.id === params.get('pattern')) ? params.get('pattern') : 'links';
}
function updateURL() {
  const url = new URL(location.href);
  url.searchParams.set('palette', state.palette); url.searchParams.set('pattern', state.pattern);
  history.replaceState(null, '', url);
}
function notify(message) {
  $('#status').textContent = message; clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('#status').textContent = ''; }, 6500);
}
function updateExportButtons() {
  ['#download-png', '#download-svg'].forEach(selector => { $(selector).disabled = !ready || exporting; });
}
function clearBoards() { for (const url of boardURLs) URL.revokeObjectURL(url); boardURLs.clear(); }
function boardURL(svg) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  boardURLs.add(url); return url;
}
function renderCards() {
  clearBoards();
  $('#palettes').innerHTML = PALETTES.map((palette, index) => `<button type="button" class="palette" data-palette="${esc(palette.id)}" aria-pressed="${palette.id === state.palette}" aria-label="Preview ${esc(palette.name)}">
    <img src="${esc(boardURL(source({ palette: palette.id })))}" alt="The Recoup Podcast — ${esc(palette.name)}, ${esc(activePattern().name)} pattern" width="1920" height="1080">
    <span class="palette-meta"><span class="palette-name"><small>0${index + 1}</small><strong>${esc(palette.name)}</strong></span><span class="palette-indicator"><span>Selected</span><i aria-hidden="true">✓</i></span></span>
  </button>`).join('');
}
function renderStage() {
  $('#stage').innerHTML = source({ fontCSS: '' });
  $('#stage').setAttribute('aria-label', `The Recoup Podcast — ${activePalette().name}, ${activePattern().name} pattern`);
  $('#preview-title').textContent = activePalette().name;
  $('#selected-pattern').textContent = activePattern().name;
  $('#palette-description').textContent = activePalette().description || '';
}
function renderSelections() {
  document.querySelectorAll('[data-palette]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.palette === state.palette)));
  document.querySelectorAll('[data-pattern]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pattern === state.pattern)));
  $('#pattern-description').textContent = activePattern().description || '';
}
function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
async function exportArtwork(kind) {
  if (!ready || exporting || !['png', 'svg'].includes(kind)) return;
  exporting = true; updateExportButtons();
  const exportPalette = activePalette().name;
  try {
    const svg = source();
    const filename = `recoup-podcast-${state.palette}-${state.pattern}`;
    if (kind === 'svg') download(new Blob([svg], { type: 'image/svg+xml' }), `${filename}.svg`);
    else {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      try {
        const image = new Image(); image.src = url; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = 1920; canvas.height = 1080;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Image export is unavailable in this browser.');
        context.drawImage(image, 0, 0, 1920, 1080);
        const png = await new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('The PNG could not be created.')), 'image/png'));
        download(png, `${filename}.png`);
      } finally { URL.revokeObjectURL(url); }
    }
    notify(`${exportPalette} ${kind.toUpperCase()} downloaded.`);
  } catch (error) { notify(`Could not export this artwork. ${error.message}`); }
  finally { exporting = false; updateExportButtons(); }
}
async function loadFonts() {
  const faces = [['DM Sans', 'dm-sans.woff2', '100 1000'], ['IBM Plex Mono', 'ibm-plex-mono.woff2', '400']];
  fontCSS = (await Promise.all(faces.map(async ([name, file, weight]) => {
    const response = await fetch(`assets/fonts/${file}`);
    if (!response.ok) throw new Error('A local font could not load.');
    const blob = await response.blob();
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('A local font could not be read.')); reader.readAsDataURL(blob);
    });
    return `@font-face{font-family:'${name}';font-style:normal;font-weight:${weight};src:url('${data}') format('woff2')}`;
  }))).join('');
  await Promise.all(['300 20px "DM Sans"', '400 20px "DM Sans"', '450 20px "DM Sans"', '600 20px "DM Sans"', '400 12px "IBM Plex Mono"'].map(face => document.fonts.load(face)));
  await document.fonts.ready;
}
async function start() {
  readURL();
  await loadFonts();
  $('#patterns').innerHTML = PATTERNS.map(pattern => `<button type="button" data-pattern="${esc(pattern.id)}" aria-pressed="${pattern.id === state.pattern}">${esc(pattern.name)}</button>`).join('');
  renderCards(); renderSelections(); renderStage();
  ready = true; updateExportButtons();
  $('#patterns').addEventListener('click', event => {
    const button = event.target.closest('[data-pattern]');
    if (!button || !PATTERNS.some(item => item.id === button.dataset.pattern)) return;
    state.pattern = button.dataset.pattern;
    renderCards(); renderSelections(); renderStage(); updateURL();
    notify(`${activePattern().name} applied to all six colors.`);
  });
  $('#palettes').addEventListener('click', event => {
    const button = event.target.closest('[data-palette]');
    if (!button || !PALETTES.some(item => item.id === button.dataset.palette)) return;
    state.palette = button.dataset.palette;
    renderSelections(); renderStage(); updateURL();
    $('#preview').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
  $('#download-png').addEventListener('click', () => exportArtwork('png'));
  $('#download-svg').addEventListener('click', () => exportArtwork('svg'));
  window.addEventListener('popstate', () => { readURL(); renderCards(); renderSelections(); renderStage(); });
  window.addEventListener('pagehide', () => { clearTimeout(toastTimer); clearBoards(); });
}
start().catch(error => {
  $('#palettes').innerHTML = '<p class="loading">The color studies could not load. Refresh to try again.</p>';
  $('#stage').textContent = 'The preview could not load. Refresh to try again.';
  notify(error.message);
});
