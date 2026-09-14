import { THEMES, FORMATS, DIMENSIONS, CAMERA_WINDOWS, renderPodcastSVG } from './podcast-scenes-v2.mjs';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params = new URL(location.href).searchParams;
const state = {
  theme: THEMES.some(theme => theme.id === params.get('direction')) ? params.get('direction') : THEMES[0].id,
  format: FORMATS.some(format => format.id === params.get('format')) ? params.get('format') : 'intro',
  title: 'AI and the business of music',
  host: 'Host name', guest: 'Guest name', episode: '01',
  quote: 'Good systems give people more time to think.', time: 3,
};
const cameraFormats = new Set(['solo', 'duo', 'vertical']);
const limits = { title: 96, host: 40, guest: 40, episode: 6, quote: 150 };
const notes = {
  intro: 'The show opening introduces the identity before the conversation begins.',
  cover: 'Square artwork for the podcast listing and show profile.',
  thumbnail: 'The episode title leads, with the selected direction around it.',
  solo: 'A wide camera frame for one speaker. Use the labels-only layer over a moving background.',
  duo: 'A matching frame for host and guest, with room for both names.',
  vertical: 'A portrait camera frame for short clips and vertical video.',
  quote: 'A portrait quote card for sharing an idea from the conversation.',
  endcard: 'A closing screen to finish the episode in the same visual identity.',
  background: 'A seamless background cycle to repeat behind your video feeds.',
};
const directionNotes = {
  cut: 'Bold cuts and smaller accents, with room for the conversation.',
  weave: 'Repeating forms across the canvas, with quieter space for people.',
  layer: 'Oversized shapes and open space, with a change of scale across the kit.',
};
let fontCSS = '', playing = false, frame = 0, lastDraw = 0, startTime = 0, startPosition = 0;
let edited = false, ready = false, exporting = false, introStarted = false, inputTimer, toastTimer;
const boardURLs = new Set();
const activeTheme = () => THEMES.find(theme => theme.id === state.theme) || THEMES[0];
const activeFormat = () => FORMATS.find(format => format.id === state.format) || FORMATS[0];
const dimension = format => DIMENSIONS[format] || { width: 1920, height: 1080 };
const duration = () => state.format === 'intro' ? 6 : 12;
const animated = () => ['intro', 'background'].includes(state.format);
const source = (options = {}) => renderPodcastSVG({ ...state, fontCSS, ...options });
const gcd = (a, b) => b ? gcd(b, a % b) : a;
function ratio(format) { const {width, height} = dimension(format); const divisor = gcd(width, height); return `${width / divisor}:${height / divisor}`; }
function notify(message) { $('#status').textContent = message; clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('#status').textContent = ''; }, 6500); }
function updateExportButtons() { ['#download-png', '#download-svg'].forEach(selector => { $(selector).disabled = !ready || exporting; }); }
function updateURL() { const url = new URL(location.href); url.searchParams.set('direction', state.theme); url.searchParams.set('format', state.format); history.replaceState(null, '', url); }
function clearBoards() { for (const url of boardURLs) URL.revokeObjectURL(url); boardURLs.clear(); }
function boardURL(svg) { const url = URL.createObjectURL(new Blob([svg], {type: 'image/svg+xml'})); boardURLs.add(url); return url; }

function renderDirections() {
  $('#directions').innerHTML = THEMES.map((theme, index) => `<button type="button" class="direction" data-theme="${esc(theme.id)}" aria-pressed="${theme.id === state.theme}" aria-label="Choose ${esc(theme.name)}">
    <img src="assets/podcast-kit-v2/${esc(theme.id)}-thumbnail.png" alt="${esc(theme.name)} episode thumbnail" width="1920" height="1080">
    <span class="direction-meta"><span><small>0${index + 1}</small><strong>${esc(theme.name)}</strong></span><i aria-hidden="true">✓</i></span>
    <span class="direction-description">${esc(theme.description || directionNotes[theme.id] || '')}</span>
  </button>`).join('');
}

function renderKit() {
  clearBoards();
  $('#kit-grid').innerHTML = FORMATS.map(format => {
    const preview = cameraFormats.has(format.id) ? '-preview' : '';
    const path = edited ? boardURL(source({format: format.id, time: 3, preview: true, chromeOnly: false})) : `assets/podcast-kit-v2/${state.theme}-${format.id}${preview}.png`;
    const {width, height} = dimension(format.id);
    return `<article class="kit-card"><button type="button" data-jump-format="${esc(format.id)}" aria-label="Preview ${esc(format.label)}"><span class="kit-image"><img src="${esc(path)}" alt="${esc(format.label)} — ${esc(activeTheme().name)}" width="${width}" height="${height}" loading="lazy"></span><span class="kit-label"><strong>${esc(format.label)}</strong><span aria-hidden="true">↗</span></span><span class="kit-ratio">${ratio(format.id)}</span></button></article>`;
  }).join('');
}

function renderStage() {
  const {width, height} = dimension(state.format);
  $('#stage').style.setProperty('--stage-ratio', String(width / height));
  $('#stage').innerHTML = source({fontCSS: '', preview: true, chromeOnly: false});
  $('#stage').setAttribute('aria-label', `${activeTheme().name} — ${activeFormat().label}`);
  $('#timeline').value = String(state.time);
  $('#time').textContent = `${state.time.toFixed(1)} / ${duration().toFixed(1)}`;
}

function stop() {
  playing = false;
  cancelAnimationFrame(frame);
  $('#play').textContent = state.format === 'intro' ? 'Play opening' : 'Play background';
  $('#play').setAttribute('aria-pressed', 'false');
}

function renderSelections() {
  document.querySelectorAll('[data-theme]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === state.theme)));
  document.querySelectorAll('[data-format]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.format === state.format)));
  $('#selected-direction').textContent = activeTheme().name;
  $('#preview-title').textContent = activeFormat().label;
  $('#format-note').textContent = notes[state.format] || '';
  const {width, height} = dimension(state.format);
  $('#dimensions').textContent = `${ratio(state.format)} · ${width} × ${height}`;
  $('#player').hidden = !animated();
  $('#timeline').max = String(duration());
  $('#motion-note').textContent = state.format === 'intro' ? 'Six-second opening · silent' : 'Twelve-second loop · silent';
  $('#export-layer-label').hidden = !(cameraFormats.has(state.format) || CAMERA_WINDOWS[state.format]?.length);
  $('#download-video').hidden = !animated();
  $('#download-video').href = `assets/podcast-kit-v2/${state.theme}-${state.format === 'background' ? 'background' : 'intro'}.mp4`;
  $('#download-video').textContent = state.format === 'background' ? 'Background MP4 ↓' : 'Opening MP4 ↓';
  stop();
}

function selectFormat(format, scroll = false) {
  if (!FORMATS.some(item => item.id === format)) return;
  state.format = format; state.time = 3; introStarted = false;
  renderSelections(); renderStage(); updateURL();
  if (scroll) $('#preview').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
}

function tick(now) {
  if (!playing) return;
  const elapsed = startPosition + (now - startTime) / 1000;
  if (state.format === 'intro' && elapsed >= duration()) { state.time = duration(); renderStage(); stop(); return; }
  if (now - lastDraw >= 66) { state.time = elapsed % duration(); renderStage(); lastDraw = now; }
  frame = requestAnimationFrame(tick);
}

function play(restart = false) {
  if (!animated()) return;
  if (playing && !restart) { stop(); return; }
  if (restart || state.time >= duration() || (state.format === 'intro' && !introStarted)) state.time = 0;
  if (state.format === 'intro') introStarted = true;
  startPosition = state.time; startTime = performance.now(); lastDraw = 0; playing = true;
  $('#play').textContent = 'Pause'; $('#play').setAttribute('aria-pressed', 'true');
  frame = requestAnimationFrame(tick);
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function exportFrame(kind) {
  if (!ready || exporting || !['png', 'svg'].includes(kind)) return;
  exporting = true; updateExportButtons();
  try {
    const camera = cameraFormats.has(state.format) || CAMERA_WINDOWS[state.format]?.length;
    const chromeOnly = Boolean(camera && $('#export-layer').value === 'labels');
    const svg = source({preview: false, chromeOnly});
    const {width, height} = dimension(state.format);
    const stem = `recoup-podcast-${state.theme}-${state.format}${chromeOnly ? '-labels' : ''}`;
    if (kind === 'svg') download(new Blob([svg], {type: 'image/svg+xml'}), `${stem}.svg`);
    else {
      const url = URL.createObjectURL(new Blob([svg], {type: 'image/svg+xml'}));
      try {
        const image = new Image(); image.src = url; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
        const context = canvas.getContext('2d'); if (!context) throw new Error('Image export is unavailable in this browser.');
        context.drawImage(image, 0, 0, width, height);
        const png = await new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('The PNG could not be created.')), 'image/png'));
        download(png, `${stem}.png`);
      } finally { URL.revokeObjectURL(url); }
    }
    notify(chromeOnly ? 'Labels downloaded on transparency, ready to place above footage.' : camera ? 'Frame downloaded with transparent camera openings.' : `${kind.toUpperCase()} downloaded with your current text.`);
  } catch (error) { notify(`Could not export this scene. ${error.message}`); }
  finally { exporting = false; updateExportButtons(); }
}

async function loadFonts() {
  const faces = [['DM Sans', 'dm-sans.woff2', '100 1000'], ['IBM Plex Mono', 'ibm-plex-mono.woff2', '400']];
  fontCSS = (await Promise.all(faces.map(async ([name, file, weight]) => {
    const response = await fetch(`assets/fonts/${file}`);
    if (!response.ok) throw new Error('A local font could not load.');
    const blob = await response.blob();
    const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('A local font could not be read.')); reader.readAsDataURL(blob); });
    return `@font-face{font-family:'${name}';font-style:normal;font-weight:${weight};src:url('${data}') format('woff2')}`;
  }))).join('');
  await Promise.all([document.fonts.load('450 20px "DM Sans"'), document.fonts.load('400 12px "IBM Plex Mono"')]);
  await document.fonts.ready;
}

async function start() {
  renderDirections();
  $('#formats').innerHTML = FORMATS.map(format => `<button type="button" data-format="${esc(format.id)}" aria-pressed="${format.id === state.format}">${esc(format.label)}</button>`).join('');
  await loadFonts(); ready = true; updateExportButtons();
  renderKit(); renderSelections(); renderStage();
  $('#directions').addEventListener('click', event => {
    const button = event.target.closest('[data-theme]');
    if (!button || !THEMES.some(theme => theme.id === button.dataset.theme)) return;
    state.theme = button.dataset.theme; state.time = 3; introStarted = false;
    renderSelections(); renderStage(); renderKit(); updateURL();
  });
  $('#formats').addEventListener('click', event => { const button = event.target.closest('[data-format]'); if (button) selectFormat(button.dataset.format); });
  $('#kit-grid').addEventListener('click', event => { const button = event.target.closest('[data-jump-format]'); if (button) selectFormat(button.dataset.jumpFormat, true); });
  $('#play').addEventListener('click', () => play());
  $('#replay').addEventListener('click', () => { stop(); play(true); });
  $('#timeline').addEventListener('input', event => { stop(); state.time = Math.max(0, Math.min(duration(), Number(event.target.value) || 0)); if (state.format === 'intro') introStarted = true; renderStage(); });
  $('#episode-form').addEventListener('input', event => {
    const {name, value} = event.target;
    if (!Object.hasOwn(limits, name)) return;
    state[name] = String(value).slice(0, limits[name]); edited = true;
    renderStage(); clearTimeout(inputTimer); inputTimer = setTimeout(renderKit, 150);
  });
  $('#episode-form').addEventListener('submit', event => event.preventDefault());
  $('#download-png').addEventListener('click', () => exportFrame('png'));
  $('#download-svg').addEventListener('click', () => exportFrame('svg'));
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', () => { stop(); clearTimeout(inputTimer); clearBoards(); });
}

start().catch(error => { $('#stage').textContent = 'The podcast kit could not load. Refresh to try again.'; notify(error.message); });
