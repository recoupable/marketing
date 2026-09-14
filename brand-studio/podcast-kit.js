import { THEMES, FORMATS, renderPodcastSVG } from './podcast-scenes.mjs';

const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validTheme = new URL(location.href).searchParams.get('direction');
const state = { theme: THEMES.some(t => t.id === validTheme) ? validTheme : 'blue', format: 'intro', title: 'AI and the business of music', host: 'Host name', guest: 'Guest name', episode: '01', time: 3 };
const names = { blue: 'Blue / light drift', forest: 'Forest / after hours', lime: 'Lime / full color' };
const notes = {
  intro: 'The symbol opens the show. The title joins it, then holds on the same background.',
  solo: 'One speaker, one show lockup. The labeled camera area is transparent in the download.',
  duo: 'Equal space for host and guest. Both labeled camera areas are transparent in the download.',
  thumbnail: 'One episode title takes the lead. Edit the example below to try your own headline.',
  background: 'A quiet, twelve-second background cycle for placement behind your video feeds.'
};
let fontCSS = '', playing = false, frame = 0, lastDraw = 0, startTime = 0, startPosition = 0, toastTimer;
const blobURLs = new Set();
const notify = message => { $('#status').textContent = message; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#status').textContent = '', 5500); };
function source(options = {}) { return renderPodcastSVG({ ...state, fontCSS, ...options }); }
function imageURL(svg) { const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })); blobURLs.add(url); return url; }
function clearImages() { for (const url of blobURLs) URL.revokeObjectURL(url); blobURLs.clear(); }
function renderStage() { $('#stage').innerHTML = source({fontCSS:''}); $('#stage').setAttribute('aria-label', `${names[state.theme]}, ${FORMATS.find(f => f.id === state.format)?.label || state.format}`); $('#timeline').value = state.time; $('#time').textContent = `${state.time.toFixed(1)} / ${state.format === 'intro' ? '6.0' : '12.0'}`; }
function stop() { playing = false; cancelAnimationFrame(frame); $('#play').textContent = state.format === 'intro' ? 'Play opening' : 'Play background'; }
function tick(now) {
  if (!playing) return;
  const duration = state.format === 'intro' ? 6 : 12;
  let time = startPosition + (now - startTime) / 1000;
  if (state.format === 'intro' && time >= duration) { state.time = duration; renderStage(); stop(); return; }
  if (now - lastDraw > 66) { state.time = time % duration; renderStage(); lastDraw = now; }
  frame = requestAnimationFrame(tick);
}
function play() { if (playing) { stop(); return; } if (state.format === 'intro') state.time = 0; startPosition = state.time; startTime = performance.now(); playing = true; $('#play').textContent = 'Pause'; frame = requestAnimationFrame(tick); }
function renderSelections() {
  document.querySelectorAll('[data-theme]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === state.theme)));
  document.querySelectorAll('[data-format]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.format === state.format)));
  $('#direction-number').textContent = `Direction 0${THEMES.findIndex(t => t.id === state.theme) + 1}`;
  $('#direction-name').textContent = names[state.theme];
  $('#format-note').textContent = notes[state.format];
  $('#export-layer-label').hidden = !['solo','duo'].includes(state.format);
  $('#motion-note').textContent = state.format === 'intro' ? 'Six-second opening · silent' : 'Slow twelve-second cycle · silent';
  $('#timeline').max = state.format === 'intro' ? 6 : 12;
  $('#download-video').href = `assets/podcast-kit/${state.theme}-${state.format === 'background' ? 'background' : 'intro'}.mp4`;
  $('#download-video').textContent = state.format === 'background' ? 'Background loop MP4 ↓' : 'Opening MP4 ↓';
  $('#download-video').hidden = !['intro','background'].includes(state.format);
  stop();
}
function renderBoards() {
  clearImages();
  $('#directions').innerHTML = THEMES.map((theme, i) => `<button class="direction" type="button" data-theme="${theme.id}" aria-pressed="${theme.id === state.theme}" aria-label="Choose ${names[theme.id]}"><img src="${imageURL(source({theme:theme.id,format:'intro',time:3}))}" alt="${esc(names[theme.id])} show title"><span class="direction-meta"><span><small>0${i+1}</small>${esc(names[theme.id].split(' / ')[0])}</span><i aria-hidden="true">✓</i></span></button>`).join('');
  $('#kit-grid').innerHTML = ['intro','solo','duo','thumbnail'].map((format, i) => `<article class="kit-card"><button type="button" data-jump-format="${format}" aria-label="Preview ${esc(FORMATS.find(f => f.id === format)?.label || format)}"><img src="${imageURL(source({format,time:3}))}" alt="${esc(notes[format])}"><div><strong>${esc(FORMATS.find(f => f.id === format)?.label || format)}</strong><span>0${i+1} / 1920 × 1080 ↗</span></div></button></article>`).join('');
}
function selectFormat(format) { stop(); state.format = format; state.time = 3; renderSelections(); renderStage(); }
function download(blob, filename) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000); }
async function exportFrame(kind) {
  const buttons = [$('#download-png'), $('#download-svg')]; buttons.forEach(b => b.disabled = true);
  try {
    const chromeOnly = ['solo','duo'].includes(state.format) && $('#export-layer').value === 'labels';
    const svg = source({ preview: false, chromeOnly });
    const stem = `recoup-podcast-${state.theme}-${state.format}${chromeOnly ? '-labels' : ''}`;
    if (kind === 'svg') download(new Blob([svg], {type:'image/svg+xml'}), `${stem}.svg`);
    else {
      const url = URL.createObjectURL(new Blob([svg], {type:'image/svg+xml'}));
      try {
        const image = new Image(); image.src = url; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = 1920; canvas.height = 1080; canvas.getContext('2d').drawImage(image, 0, 0);
        const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('PNG export failed')), 'image/png'));
        download(blob, `${stem}.png`);
      } finally { URL.revokeObjectURL(url); }
    }
    notify(`${kind.toUpperCase()} ready. ${chromeOnly ? 'Labels on transparency, ready to place above footage.' : ['solo','duo'].includes(state.format) ? 'The camera windows are transparent.' : 'Your current artwork is included.'}`);
  } catch (error) { notify(`Could not export this frame. ${error.message}`); }
  finally { buttons.forEach(b => b.disabled = false); }
}
async function loadFonts() {
  const faces = [['DM Sans','dm-sans.woff2','100 1000'],['IBM Plex Mono','ibm-plex-mono.woff2','400']];
  fontCSS = (await Promise.all(faces.map(async ([name,file,weight]) => {
    const response = await fetch(`assets/fonts/${file}`); if (!response.ok) throw new Error('A local font could not load.');
    const data = await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; response.blob().then(blob => reader.readAsDataURL(blob)).catch(reject); });
    return `@font-face{font-family:'${name}';font-style:normal;font-weight:${weight};src:url('${data}') format('woff2')}`;
  }))).join('');
  await document.fonts.ready;
}
async function start() {
  await loadFonts();
  $('#formats').innerHTML = FORMATS.map(f => `<button type="button" data-format="${f.id}" aria-pressed="${f.id === state.format}">${esc(f.label)}</button>`).join('');
  renderBoards(); renderSelections(); renderStage();
  $('#directions').addEventListener('click', event => { const button = event.target.closest('[data-theme]'); if (!button) return; stop(); state.theme = button.dataset.theme; state.time = 3; const url = new URL(location.href); url.searchParams.set('direction', state.theme); history.replaceState(null,'',url); renderBoards(); renderSelections(); renderStage(); });
  $('#formats').addEventListener('click', event => { const button = event.target.closest('[data-format]'); if (button) selectFormat(button.dataset.format); });
  $('#kit-grid').addEventListener('click', event => { const button = event.target.closest('[data-jump-format]'); if (button) { selectFormat(button.dataset.jumpFormat); $('#preview').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); } });
  $('#play').addEventListener('click', play);
  $('#replay').addEventListener('click', () => { stop(); state.time = 0; renderStage(); play(); });
  $('#timeline').addEventListener('input', event => { stop(); state.time = Number(event.target.value); renderStage(); });
  $('#episode-form').addEventListener('input', event => { if (!['title','episode','host','guest'].includes(event.target.name)) return; state[event.target.name] = event.target.value; renderStage(); renderBoards(); });
  $('#episode-form').addEventListener('submit', event => event.preventDefault());
  $('#download-png').addEventListener('click', () => exportFrame('png'));
  $('#download-svg').addEventListener('click', () => exportFrame('svg'));
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', () => { stop(); clearImages(); });
}
start().catch(error => { $('#stage').textContent = 'The podcast kit could not load. Refresh to try again.'; notify(error.message); });
