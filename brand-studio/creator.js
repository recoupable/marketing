const ASSET_ROOT = new URL('./assets/', import.meta.url);
const MARK_PATH = 'M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z';
const LIMITS = { podcastTitle: 60, episodeTitle: 140, guestName: 60, hostName: 60, episodeNumber: 8, description: 300 };
const PROJECT_KEY = 'recoup-brand-studio-podcast-v1';
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const DEFAULTS = { podcastTitle: 'The Recoup Podcast', episodeTitle: 'AI and the business of music', guestName: 'Guest name', hostName: 'Host name', episodeNumber: '01', description: 'A conversation about the tools, people, and ideas changing the business of music.', theme: 'sky', format: 'thumbnail', guestImage: null };

export const FORMATS = [
  { id: 'thumbnail', label: 'Episode thumbnail', short: 'Thumbnail', width: 1920, height: 1080, ratio: '16:9', note: 'An episode thumbnail for video and podcast listings.' },
  { id: 'cover', label: 'Square cover', short: 'Square cover', width: 3000, height: 3000, ratio: '1:1', note: 'High-resolution artwork for your episode or show.' },
  { id: 'social', label: 'Social announcement', short: 'Social post', width: 1080, height: 1350, ratio: '4:5', note: 'A portrait announcement for your social feed.' },
  { id: 'title', label: 'Episode title card', short: 'Title card', width: 1920, height: 1080, ratio: '16:9', note: 'A full-screen opener to add in your video editor.' },
  { id: 'single', label: 'Single-speaker frame', short: 'One speaker', width: 1920, height: 1080, ratio: '16:9', note: 'Place this frame above your video. The speaker window is transparent.' },
  { id: 'double', label: 'Two-speaker frame', short: 'Two speakers', width: 1920, height: 1080, ratio: '16:9', note: 'Place this frame above two video tracks. Both windows are transparent.' },
  { id: 'screen', label: 'Screenshare frame', short: 'Screenshare', width: 1920, height: 1080, ratio: '16:9', note: 'Place this frame above a screen recording and a speaker video.' },
  { id: 'overlay', label: 'Transparent name label', short: 'Name label', width: 1920, height: 1080, ratio: '16:9', note: 'A transparent PNG label to place above a video track. The checkerboard is only a preview.' },
];

const THEMES = { sky: { background: '#007EBD', ink: '#FFFFFF', muted: '#D2ECF8', panel: '#132B26', panelInk: '#FFFFFF' }, dark: { background: '#132B26', ink: '#FFFFFF', muted: '#B9D0C7', panel: '#214238', panelInk: '#FFFFFF' }, white: { background: '#FFFFFF', ink: '#152E37', muted: '#586F78', panel: '#F0F7FA', panelInk: '#152E37' } };
const xml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
const font = (size, weight = 450, mono = false) => `${weight} ${size}px "${mono ? 'IBM Plex Mono' : 'DM Sans'}"`;

export function validateProject(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.schema !== 'recoup-podcast-kit' || input.version !== 1 || !input.settings || typeof input.settings !== 'object') throw new Error('Choose a Recoup podcast project JSON file (version 1).');
  const source = input.settings;
  const result = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    if (typeof source[key] !== 'string' || source[key].length > max || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(source[key])) throw new Error(`The project has an invalid ${key}.`);
    result[key] = source[key];
  }
  if (!Object.hasOwn(THEMES, source.theme) || !FORMATS.some((format) => format.id === source.format)) throw new Error('The project contains an unsupported theme or format.');
  result.theme = source.theme;
  result.format = source.format;
  const photo = source.guestImage;
  if (photo !== null && photo !== undefined && (typeof photo !== 'string' || photo.length > MAX_IMAGE_BYTES * 1.4 || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(photo))) throw new Error('The guest image must be an embedded PNG, JPEG, or WebP under 8 MB.');
  result.guestImage = photo || null;
  return result;
}

// The same measured scene feeds Canvas and SVG, so exports retain the preview's layout.
export function fitText(context, value, maxWidth, maxHeight, preferredSize, maxLines = 4, weight = 450, mono = false) {
  const content = String(value).trim().replace(/\s+/g, ' ');
  if (!content) return { lines: [], size: preferredSize, lineHeight: preferredSize * 1.08 };
  const wrap = (size) => {
    context.font = font(size, weight, mono);
    const lines = [];
    let line = '';
    for (const word of content.split(' ')) {
      if (context.measureText(line ? `${line} ${word}` : word).width <= maxWidth) { line = line ? `${line} ${word}` : word; continue; }
      if (line) { lines.push(line); line = ''; }
      if (context.measureText(word).width <= maxWidth) { line = word; continue; }
      for (const character of Array.from(word)) {
        if (line && context.measureText(line + character).width > maxWidth) { lines.push(line); line = character; }
        else line += character;
      }
    }
    if (line) lines.push(line);
    return lines;
  };
  let low = 4, high = preferredSize;
  for (let iteration = 0; iteration < 15; iteration++) {
    const middle = (low + high) / 2;
    const lines = wrap(middle);
    if (lines.length <= maxLines && lines.length * middle * 1.08 <= maxHeight) low = middle;
    else high = middle;
  }
  const size = Math.floor(low * 10) / 10;
  return { lines: wrap(size), size, lineHeight: size * 1.08 };
}

export function buildScene(settings, format, context) {
  const w = format.width, h = format.height, unit = w / 1920;
  const scale = (value) => value * unit;
  const palette = THEMES[settings.theme];
  const commands = [];
  const rect = (x, y, width, height, fill, radius = 0, extra = {}) => commands.push({ type: 'rect', x, y, width, height, fill, radius, ...extra });
  const text = (value, x, y, width, height, size, color = palette.ink, maxLines = 3, weight = 450, mono = false) => {
    const layout = fitText(context, value, width, height, size, maxLines, weight, mono);
    layout.lines.forEach((line, index) => commands.push({ type: 'text', value: line, x, y: y + index * layout.lineHeight + layout.size * 0.84, size: layout.size, color, weight, mono }));
    return layout.lines.length * layout.lineHeight;
  };
  const mark = (x, y, height, color) => commands.push({ type: 'mark', x, y, width: height * 127 / 141, height, color });
  const brand = (x, y, height = scale(52), color = palette.ink) => {
    mark(x, y, height, color);
    text('Recoup', x + height * 1.15, y, scale(260), height * 1.1, height * 0.86, color, 1, 600);
  };
  const caption = (value, x, y, width, color = palette.muted, size = scale(24)) => text(value, x, y, width, scale(65), size, color, 2, 400, true);
  const episode = settings.episodeNumber.trim() ? `EP. ${settings.episodeNumber.trim()}` : 'NEW EPISODE';
  const footer = () => {
    commands.push({ type: 'line', x1: scale(92), y1: h - scale(110), x2: w - scale(92), y2: h - scale(110), color: palette.muted, opacity: 0.35, width: scale(1.5) });
    caption(settings.podcastTitle, scale(92), h - scale(76), w * 0.69);
    caption(episode, w - scale(300), h - scale(76), scale(210));
  };
  const window = (x, y, width, height) => {
    rect(x - scale(4), y - scale(4), width + scale(8), height + scale(8), settings.theme === 'white' ? '#CEDBDE' : '#56776D', scale(26));
    commands.push({ type: 'hole', x, y, width, height, radius: scale(22) });
  };
  const name = (value, x, y, width) => {
    rect(x, y, width, scale(74), '#D6FF62', scale(12));
    text(value || 'Guest', x + scale(22), y + scale(15), width - scale(44), scale(45), scale(34), '#182E28', 1, 500);
  };
  const photo = (x, y, width, height, radius = scale(25)) => {
    rect(x, y, width, height, settings.theme === 'white' ? '#E1EFF4' : '#224C45', radius);
    if (settings.guestImage) commands.push({ type: 'image', asset: 'guest', x, y, width, height, radius });
    else {
      // The brand symbol is the empty-photo treatment; no generated guest or fake portrait.
      mark(x + width * 0.31, y + height * 0.27, Math.min(width * 0.44, height * 0.45), '#D6FF62');
    }
  };

  if (format.id !== 'overlay') {
    rect(0, 0, w, h, palette.background);
    if (settings.theme === 'sky') {
      commands.push({ type: 'image', asset: 'sky', x: 0, y: 0, width: w, height: h, radius: 0 });
      rect(0, 0, w, h, '#00364D', 0, { opacity: 0.30 });
    }
    if (settings.theme === 'dark') rect(w * 0.77, 0, w * 0.23, h, '#18372F');
  }

  if (format.id === 'overlay') {
    const labelWidth = scale(780);
    rect(scale(92), h - scale(255), labelWidth, scale(156), '#132B26', scale(20));
    rect(scale(92), h - scale(255), scale(10), scale(156), '#D6FF62', scale(4));
    text(settings.guestName || 'Guest', scale(130), h - scale(230), labelWidth - scale(76), scale(64), scale(48), '#FFFFFF', 1, 500);
    caption(settings.podcastTitle, scale(130), h - scale(162), labelWidth - scale(76), '#D6FF62', scale(23));
  } else if (['single', 'double', 'screen'].includes(format.id)) {
    brand(scale(72), scale(43), scale(42));
    text(settings.podcastTitle, scale(390), scale(48), scale(1130), scale(58), scale(34), palette.ink, 1, 450);
    caption(episode, scale(1580), scale(55), scale(265));
    if (format.id === 'single') {
      window(scale(72), scale(148), scale(1776), scale(762));
      name(settings.guestName, scale(94), scale(932), scale(630));
      text(settings.episodeTitle, scale(785), scale(935), scale(1040), scale(72), scale(32), palette.ink, 2, 450);
    } else if (format.id === 'double') {
      window(scale(72), scale(195), scale(870), scale(662));
      window(scale(978), scale(195), scale(870), scale(662));
      name(settings.hostName || 'Host', scale(94), scale(878), scale(630));
      name(settings.guestName, scale(1000), scale(878), scale(630));
      text(settings.episodeTitle, scale(94), scale(988), scale(1732), scale(48), scale(29), palette.ink, 1, 450);
    } else {
      window(scale(72), scale(178), scale(1310), scale(737));
      window(scale(1414), scale(178), scale(434), scale(546));
      name(settings.guestName, scale(1414), scale(746), scale(434));
      text(settings.episodeTitle, scale(94), scale(946), scale(1690), scale(72), scale(33), palette.ink, 2, 450);
    }
  } else if (format.id === 'thumbnail') {
    brand(scale(92), scale(82));
    caption(`${episode}  /  ${settings.podcastTitle}`, scale(92), scale(240), scale(1070));
    text(settings.episodeTitle, scale(84), scale(326), scale(1080), scale(465), scale(119), palette.ink, 4);
    photo(scale(1290), scale(206), scale(538), scale(608), scale(27));
    rect(scale(1228), scale(755), scale(600), scale(116), '#D6FF62', scale(17));
    text(settings.guestName || 'Guest', scale(1260), scale(779), scale(534), scale(70), scale(48), '#182E28', 1, 500);
    footer();
  } else if (format.id === 'title') {
    brand(scale(92), scale(82));
    caption(`${settings.podcastTitle}  /  ${episode}`, scale(92), scale(255), scale(1600));
    text(settings.episodeTitle, scale(83), scale(354), scale(1695), scale(401), scale(145), palette.ink, 3);
    rect(scale(92), scale(830), scale(18), scale(52), '#D6FF62', scale(4));
    text(`With ${settings.guestName || 'Guest'}`, scale(136), scale(830), scale(1450), scale(65), scale(42), palette.ink, 1, 450);
    footer();
  } else {
    const social = format.id === 'social';
    brand(scale(112), scale(110), scale(65));
    caption(`${episode}  /  ${social ? 'NEW EPISODE' : 'PODCAST'}`, scale(112), scale(280), scale(1670), palette.muted, scale(29));
    const titleHeight = social ? scale(525) : scale(540);
    const titleEnd = scale(399) + text(settings.episodeTitle, scale(104), scale(399), scale(1700), titleHeight, scale(146), palette.ink, 4);
    if (settings.guestImage) {
      const photoY = Math.max(titleEnd + scale(68), social ? scale(950) : scale(1020));
      const photoHeight = h - photoY - scale(310);
      photo(scale(112), photoY, scale(1696), photoHeight, scale(28));
      name(settings.guestName, scale(150), photoY + photoHeight - scale(112), scale(1050));
    } else {
      rect(scale(112), social ? scale(1100) : scale(1130), scale(1696), social ? scale(700) : scale(420), palette.panel, scale(30));
      mark(scale(172), social ? scale(1200) : scale(1220), scale(103), '#D6FF62');
      text(`With ${settings.guestName || 'Guest'}`, scale(330), social ? scale(1200) : scale(1230), scale(1380), scale(140), scale(72), palette.panelInk, 2, 500);
      if (social) text(settings.description, scale(172), scale(1460), scale(1550), scale(252), scale(47), palette.panelInk, 4, 400);
    }
    footer();
  }
  return { width: w, height: h, commands, settings: { ...settings }, format };
}

function roundedPath(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y); context.lineTo(x + width - r, y); context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r); context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height); context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r); context.quadraticCurveTo(x, y, x + r, y); context.closePath();
}

export function drawScene(canvas, scene, assets) {
  canvas.width = scene.width; canvas.height = scene.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Your browser does not support Canvas export. Try a current browser.');
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (const command of scene.commands) {
    context.save();
    context.globalAlpha = command.opacity ?? 1;
    if (command.type === 'rect' || command.type === 'hole') {
      roundedPath(context, command.x, command.y, command.width, command.height, command.radius);
      if (command.type === 'hole') context.globalCompositeOperation = 'destination-out';
      context.fillStyle = command.fill || '#000000'; context.fill();
    } else if (command.type === 'text') {
      context.font = font(command.size, command.weight, command.mono);
      context.fillStyle = command.color; context.textBaseline = 'alphabetic';
      context.fillText(command.value, command.x, command.y);
    } else if (command.type === 'mark') {
      context.translate(command.x, command.y); context.scale(command.width / 127, command.height / 141); context.translate(-48, -41);
      context.fillStyle = command.color; context.fill(new Path2D(MARK_PATH));
    } else if (command.type === 'line') {
      context.beginPath(); context.moveTo(command.x1, command.y1); context.lineTo(command.x2, command.y2);
      context.strokeStyle = command.color; context.lineWidth = command.width; context.stroke();
    } else if (command.type === 'image') {
      const source = assets[command.asset]?.image;
      if (!source) throw new Error(`The ${command.asset} image could not be loaded. Reload the studio and try again.`);
      roundedPath(context, command.x, command.y, command.width, command.height, command.radius); context.clip();
      const ratio = Math.max(command.width / source.naturalWidth, command.height / source.naturalHeight);
      const width = source.naturalWidth * ratio, height = source.naturalHeight * ratio;
      context.drawImage(source, command.x + (command.width - width) / 2, command.y + (command.height - height) / 2, width, height);
    }
    context.restore();
  }
  return canvas;
}

export function sceneToSVG(scene, assets) {
  const definitions = [];
  const holes = scene.commands.filter((command) => command.type === 'hole');
  if (holes.length) definitions.push(`<mask id="video-windows"><rect width="100%" height="100%" fill="white"/>${holes.map((c) => `<rect x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" rx="${c.radius}" fill="black"/>`).join('')}</mask>`);
  const body = scene.commands.map((c, index) => {
    const opacity = c.opacity === undefined ? '' : ` opacity="${c.opacity}"`;
    if (c.type === 'hole') return '';
    if (c.type === 'rect') return `<rect x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" rx="${c.radius}" fill="${c.fill}"${opacity}/>`;
    if (c.type === 'text') return `<text x="${c.x}" y="${c.y}" fill="${c.color}" font-family="${c.mono ? 'IBM Plex Mono' : 'DM Sans'}" font-size="${c.size}" font-weight="${c.weight}">${xml(c.value)}</text>`;
    if (c.type === 'mark') return `<g transform="translate(${c.x} ${c.y}) scale(${c.width / 127} ${c.height / 141}) translate(-48 -41)"><path d="${MARK_PATH}" fill="${c.color}"/></g>`;
    if (c.type === 'line') return `<line x1="${c.x1}" y1="${c.y1}" x2="${c.x2}" y2="${c.y2}" stroke="${c.color}" stroke-width="${c.width}"${opacity}/>`;
    if (c.type === 'image') {
      definitions.push(`<clipPath id="photo-${index}"><rect x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" rx="${c.radius}"/></clipPath>`);
      return `<image x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" href="${xml(assets[c.asset].data)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#photo-${index})"/>`;
    }
    return '';
  }).join('\n');
  const fontCSS = `@font-face{font-family:'DM Sans';font-style:normal;font-weight:100 1000;src:url('${assets.sans.data}') format('woff2')}@font-face{font-family:'IBM Plex Mono';font-weight:400;src:url('${assets.mono.data}') format('woff2')}`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" role="img"><title>${xml(scene.settings.episodeTitle)} — ${xml(scene.format.label)}</title><desc>Created in Recoup Brand Studio. Text and shapes are editable. Fonts and images are embedded.</desc><defs><style>${fontCSS}</style>${definitions.join('')}</defs><g${holes.length ? ' mask="url(#video-windows)"' : ''}>${body}</g></svg>`;
}

const crcTable = Array.from({ length: 256 }, (_, i) => { let n = i; for (let k = 0; k < 8; k++) n = n & 1 ? 0xEDB88320 ^ (n >>> 1) : n >>> 1; return n >>> 0; });
const crc32 = (data) => { let crc = 0xFFFFFFFF; for (const byte of data) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8); return (crc ^ 0xFFFFFFFF) >>> 0; };

// Stored ZIP entries avoid a runtime dependency and one download per asset.
export function createZip(entries) {
  const encoder = new TextEncoder();
  const output = [], central = [];
  let offset = 0;
  for (const entry of entries) {
    const name = encoder.encode(entry.name), bytes = entry.bytes instanceof Uint8Array ? entry.bytes : encoder.encode(entry.bytes);
    const crc = crc32(bytes);
    const header = new Uint8Array(30 + name.length), hv = new DataView(header.buffer);
    hv.setUint32(0, 0x04034B50, true); hv.setUint16(4, 20, true); hv.setUint16(6, 0x0800, true); hv.setUint16(12, 0x21, true);
    hv.setUint32(14, crc, true); hv.setUint32(18, bytes.length, true); hv.setUint32(22, bytes.length, true); hv.setUint16(26, name.length, true); header.set(name, 30);
    const directory = new Uint8Array(46 + name.length), dv = new DataView(directory.buffer);
    dv.setUint32(0, 0x02014B50, true); dv.setUint16(4, 20, true); dv.setUint16(6, 20, true); dv.setUint16(8, 0x0800, true); dv.setUint16(14, 0x21, true);
    dv.setUint32(16, crc, true); dv.setUint32(20, bytes.length, true); dv.setUint32(24, bytes.length, true); dv.setUint16(28, name.length, true); dv.setUint32(42, offset, true); directory.set(name, 46);
    output.push(header, bytes); central.push(directory); offset += header.length + bytes.length;
  }
  const size = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const ending = new Uint8Array(22), view = new DataView(ending.buffer);
  view.setUint32(0, 0x06054B50, true); view.setUint16(8, entries.length, true); view.setUint16(10, entries.length, true); view.setUint32(12, size, true); view.setUint32(16, offset, true);
  return new Blob([...output, ...central, ending], { type: 'application/zip' });
}

const toDataURL = (blob) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('The selected file could not be read.')); reader.readAsDataURL(blob); });
const loadImage = (data) => new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error('This image could not be opened. Choose a PNG, JPEG, or WebP image.')); image.src = data; });
const pngBlob = (canvas) => new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('PNG export failed. Try a smaller image or reload the page.')), 'image/png'));
function download(blob, filename) { const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000); }
const filename = (settings) => `recoup-ep-${(settings.episodeNumber || 'new').replace(/[^a-z0-9_-]/gi, '-').slice(0, 20)}`;
const project = (settings) => ({ schema: 'recoup-podcast-kit', version: 1, savedAt: new Date().toISOString(), settings: { ...settings } });

async function loadAssets() {
  const paths = { sky: 'environments/open-sky.webp', sans: 'fonts/dm-sans.woff2', mono: 'fonts/ibm-plex-mono.woff2', sansLicense: 'fonts/DM-Sans-LICENSE.txt', monoLicense: 'fonts/IBM-Plex-Mono-LICENSE.txt' };
  const results = await Promise.all(Object.entries(paths).map(async ([key, path]) => {
    const response = await fetch(new URL(path, ASSET_ROOT));
    if (!response.ok) throw new Error(`A local studio asset is missing: ${path}.`);
    const blob = await response.blob();
    if (key.endsWith('License')) return [key, { text: await blob.text() }];
    const data = await toDataURL(blob);
    return [key, { data, image: key === 'sky' ? await loadImage(data) : null }];
  }));
  await document.fonts.ready;
  const fonts = await Promise.all([document.fonts.load('450 48px "DM Sans"'), document.fonts.load('400 24px "IBM Plex Mono"')]);
  if (fonts.some((faces) => faces.length === 0)) throw new Error('The studio fonts could not be loaded. Reload the page before exporting.');
  return Object.fromEntries(results);
}

export function initCreator(root) {
  if (!(root instanceof HTMLElement)) throw new Error('A creator root element is required.');
  let state = { ...DEFAULTS }, assets, initialized = false, busy = false, disposed = false, photoGeneration = 0;
  let timer;
  const events = new AbortController();
  const signal = events.signal;
  root.classList.add('podcast-creator');
  root.innerHTML = `
    <div class="pc-intro"><div><span class="pc-kicker">Podcast kit creator</span><h2>One episode. Every format.</h2><p>Edit the details once. Build a matching set of covers, frames, and social artwork.</p></div><span class="pc-local-badge"><span aria-hidden="true"></span>Runs in your browser</span></div>
    <div class="pc-workspace">
      <form class="pc-controls" aria-label="Podcast artwork settings">
        <div class="pc-panel-heading"><span class="pc-step">01</span><h3>Episode details</h3></div>
        <label class="pc-field">Podcast title <input name="podcastTitle" type="text" maxlength="60" required autocomplete="off" aria-describedby="pc-title-help"><small id="pc-title-help">The Recoup Podcast. Edit this title for your artwork.</small></label>
        <div class="pc-field-row"><label class="pc-field pc-number">Episode <input name="episodeNumber" type="text" maxlength="8" autocomplete="off"></label><label class="pc-field">Guest name <input name="guestName" type="text" maxlength="60" autocomplete="off"></label></div>
        <label class="pc-field">Episode title <textarea name="episodeTitle" rows="3" maxlength="140" required aria-describedby="pc-title-count"></textarea><small id="pc-title-count" class="pc-character-count">0 / 140</small></label>
        <label class="pc-field">Host name <input name="hostName" type="text" maxlength="60" autocomplete="off"><small>Used on the two-speaker frame.</small></label>
        <details class="pc-details"><summary>Description &amp; guest photo <span aria-hidden="true">+</span></summary><div class="pc-details-body">
          <label class="pc-field">Episode description <textarea name="description" rows="4" maxlength="300"></textarea><small>Used on the social post when there is no guest photo.</small></label>
          <label class="pc-upload">Guest photo <input name="guestPhoto" type="file" accept="image/png,image/jpeg,image/webp"><span>Choose PNG, JPG, or WebP · up to 8 MB</span></label>
          <p class="pc-photo-status">No photo selected. The Recoup symbol fills the portrait area.</p><button class="pc-text-button" type="button" data-action="remove-photo" hidden>Remove photo</button>
          <p class="pc-privacy">Photos stay in this browser. Exported projects include the photo.</p>
        </div></details>
        <fieldset class="pc-theme-fieldset"><legend><span class="pc-step">02</span>Choose a theme</legend><div class="pc-themes">
          <label><input type="radio" name="theme" value="sky"><span class="pc-swatch pc-swatch-sky"></span><span>Sky</span></label>
          <label><input type="radio" name="theme" value="dark"><span class="pc-swatch pc-swatch-dark"></span><span>Dark studio</span></label>
          <label><input type="radio" name="theme" value="white"><span class="pc-swatch pc-swatch-white"></span><span>Editorial white</span></label>
        </div></fieldset>
        <div class="pc-project-actions"><button class="pc-secondary-button" type="button" data-action="save-local">Save draft here</button><button class="pc-text-button" type="button" data-action="restore-local">Restore draft</button></div>
        <p class="pc-local-help">A saved draft stays in this browser only.</p>
      </form>
      <div class="pc-preview-column">
        <div class="pc-preview-heading"><div><span class="pc-kicker">Live artwork</span><h3 class="pc-format-title">Episode thumbnail</h3></div><span class="pc-dimensions">1920 × 1080</span></div>
        <div class="pc-canvas-stage"><canvas class="pc-canvas" width="1920" height="1080" role="img" aria-label="Episode artwork preview"></canvas><p class="pc-loading">Loading local fonts and artwork…</p></div>
        <p class="pc-format-note"></p>
        <fieldset class="pc-format-fieldset"><legend class="pc-kicker">Choose a format</legend><div class="pc-formats">${FORMATS.map((format) => `<label><input type="radio" name="pc-format" value="${format.id}"><span class="pc-format-shape pc-shape-${format.id}" aria-hidden="true"></span><span>${format.short}<small>${format.ratio}</small></span></label>`).join('')}</div></fieldset>
        <div class="pc-export-bar"><div><strong>Your artwork, ready to use.</strong><span>PNG for publishing. SVG for editing.</span></div><div class="pc-export-buttons"><button class="pc-secondary-button" type="button" data-action="download-svg" disabled>Editable SVG</button><button class="pc-primary-button" type="button" data-action="download-png" disabled>Download PNG <span aria-hidden="true">↓</span></button></div></div>
        <div class="pc-kit-download"><div><h4>Get the complete episode kit</h4><p>All 8 formats as PNG + editable SVG, your project file, and fonts in one ZIP.</p></div><button class="pc-dark-button" type="button" data-action="download-kit" disabled>Download kit <span aria-hidden="true">↓</span></button></div>
        <div class="pc-file-actions"><button class="pc-text-button" type="button" data-action="save-project">Save project JSON</button><button class="pc-text-button" type="button" data-action="import-project">Open project JSON</button><input class="pc-hidden-file" name="projectFile" type="file" accept=".json,application/json" aria-label="Open project JSON"><button class="pc-text-button pc-reset" type="button" data-action="reset">Reset details</button></div>
        <p class="pc-status" role="status" aria-live="polite" aria-atomic="true">Artwork is created locally. Nothing is published or uploaded.</p>
      </div>
    </div>`;

  const form = root.querySelector('form');
  const canvas = root.querySelector('canvas');
  const status = root.querySelector('.pc-status');
  const exportButtons = [...root.querySelectorAll('[data-action^="download-"]')];
  const setStatus = (message, error = false) => { if (disposed) return; status.textContent = message; status.classList.toggle('pc-status-error', error); };
  const updateButtons = () => exportButtons.forEach((button) => { button.disabled = !initialized || busy || !state.podcastTitle.trim() || !state.episodeTitle.trim(); });
  const formatFor = (settings = state) => FORMATS.find((item) => item.id === settings.format);
  const syncForm = () => {
    Object.keys(LIMITS).forEach((key) => { form.elements[key].value = state[key]; });
    root.querySelectorAll('input[name="theme"]').forEach((input) => { input.checked = input.value === state.theme; });
    root.querySelectorAll('input[name="pc-format"]').forEach((input) => { input.checked = input.value === state.format; });
    root.querySelector('.pc-photo-status').textContent = state.guestImage ? 'Guest photo added. It is included in project exports.' : 'No photo selected. The Recoup symbol fills the portrait area.';
    root.querySelector('[data-action="remove-photo"]').hidden = !state.guestImage;
    root.querySelector('#pc-title-count').textContent = `${state.episodeTitle.length} / 140`;
  };
  const render = () => {
    if (!initialized || disposed) return;
    const currentFormat = formatFor();
    try {
      const currentScene = buildScene(state, currentFormat, canvas.getContext('2d'));
      drawScene(canvas, currentScene, assets);
      canvas.setAttribute('aria-label', `${currentFormat.label}: ${state.episodeTitle || 'Untitled episode'}, with ${state.guestName || 'Guest'}. ${state.theme} theme.`);
      canvas.style.aspectRatio = `${currentFormat.width} / ${currentFormat.height}`;
      root.querySelector('.pc-format-title').textContent = currentFormat.label;
      root.querySelector('.pc-dimensions').textContent = `${currentFormat.width} × ${currentFormat.height}`;
      root.querySelector('.pc-format-note').textContent = currentFormat.note;
      root.querySelector('.pc-canvas-stage').classList.toggle('pc-portrait-stage', currentFormat.height >= currentFormat.width);
      root.querySelector('#pc-title-count').textContent = `${state.episodeTitle.length} / 140`;
      updateButtons();
    } catch (error) { setStatus(error.message, true); exportButtons.forEach((button) => { button.disabled = true; }); }
  };
  const setBusy = (value) => { busy = value; root.setAttribute('aria-busy', String(value)); updateButtons(); };
  const ensureValid = () => {
    if (!state.podcastTitle.trim() || !state.episodeTitle.trim()) { setStatus('Add a podcast title and an episode title before exporting artwork.', true); form.reportValidity(); return false; }
    return true;
  };
  const applyProject = async (input) => {
    const next = validateProject(input);
    const ticket = ++photoGeneration;
    const image = next.guestImage ? await loadImage(next.guestImage) : null;
    if (disposed || ticket !== photoGeneration) return;
    if (image && (image.naturalWidth > 12000 || image.naturalHeight > 12000 || image.naturalWidth * image.naturalHeight > 40000000)) throw new Error('The project photo is too large. Choose an image under 40 megapixels.');
    state = next;
    if (assets) assets.guest = image ? { image, data: next.guestImage } : null;
    syncForm(); render();
  };

  root.addEventListener('input', (event) => {
    const input = event.target;
    if (Object.hasOwn(LIMITS, input.name)) {
      state[input.name] = input.value.slice(0, LIMITS[input.name]);
      clearTimeout(timer); timer = setTimeout(render, 70);
      updateButtons();
      if (!state.podcastTitle.trim() || !state.episodeTitle.trim()) setStatus('Add a podcast title and episode title to enable artwork downloads.');
    }
  }, { signal });
  root.addEventListener('change', async (event) => {
    const input = event.target;
    if (input.name === 'theme') { state.theme = input.value; render(); setStatus(`${input.closest('label').textContent.trim()} theme applied.`); }
    if (input.name === 'pc-format') { state.format = input.value; render(); }
    if (input.name === 'guestPhoto' && input.files?.[0]) {
      const file = input.files[0], ticket = ++photoGeneration;
      try {
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw new Error('Choose a PNG, JPEG, or WebP image.');
        if (file.size > MAX_IMAGE_BYTES) throw new Error('This photo is over 8 MB. Choose a smaller image.');
        const data = await toDataURL(file), image = await loadImage(data);
        if (image.naturalWidth * image.naturalHeight > 40000000 || image.naturalWidth > 12000 || image.naturalHeight > 12000) throw new Error('Choose a photo under 40 megapixels and 12,000 pixels per side.');
        const normalized = document.createElement('canvas');
        const ratio = Math.min(1, 2200 / Math.max(image.naturalWidth, image.naturalHeight));
        normalized.width = Math.round(image.naturalWidth * ratio); normalized.height = Math.round(image.naturalHeight * ratio);
        const normalizedContext = normalized.getContext('2d');
        normalizedContext.fillStyle = '#F0F7FA'; normalizedContext.fillRect(0, 0, normalized.width, normalized.height); normalizedContext.drawImage(image, 0, 0, normalized.width, normalized.height);
        const normalizedData = normalized.toDataURL('image/jpeg', 0.9);
        const normalizedImage = await loadImage(normalizedData);
        if (disposed || ticket !== photoGeneration) return;
        state.guestImage = normalizedData;
        if (assets) assets.guest = { image: normalizedImage, data: normalizedData };
        syncForm(); render(); setStatus('Guest photo added locally. The portrait is center-cropped in your artwork.');
      } catch (error) { setStatus(error.message, true); }
      input.value = '';
    }
    if (input.name === 'projectFile' && input.files?.[0]) {
      try {
        if (input.files[0].size > 12 * 1024 * 1024) throw new Error('Project files must be under 12 MB.');
        await applyProject(JSON.parse(await input.files[0].text()));
        setStatus('Project opened. Your artwork is ready to edit.');
      } catch (error) { setStatus(error instanceof SyntaxError ? 'This file is not valid JSON. Choose an exported Recoup project.' : error.message, true); }
      input.value = '';
    }
  }, { signal });
  form.addEventListener('submit', (event) => event.preventDefault(), { signal });
  root.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button || !root.contains(button)) return;
    const action = button.dataset.action;
    try {
      if (action === 'remove-photo') { photoGeneration++; state.guestImage = null; if (assets) assets.guest = null; syncForm(); render(); setStatus('Guest photo removed.'); }
      if (action === 'reset') { photoGeneration++; state = { ...DEFAULTS }; if (assets) assets.guest = null; syncForm(); render(); setStatus('Details reset to The Recoup Podcast defaults. Your saved draft is unchanged.'); }
      if (action === 'save-local') { localStorage.setItem(PROJECT_KEY, JSON.stringify(project(state))); setStatus('Draft saved in this browser. Use Save project JSON for a portable copy.'); }
      if (action === 'restore-local') { const saved = localStorage.getItem(PROJECT_KEY); if (!saved) { setStatus('No saved draft in this browser yet. Choose Save draft here first.'); return; } await applyProject(JSON.parse(saved)); setStatus('Your saved browser draft has been restored.'); }
      if (action === 'save-project') { download(new Blob([JSON.stringify(project(state), null, 2)], { type: 'application/json' }), `${filename(state)}-project.json`); setStatus('Project JSON download prepared. Keep this file to reopen your kit.'); }
      if (action === 'import-project') root.querySelector('input[name="projectFile"]').click();
      if (action.startsWith('download-')) {
        if (!initialized || busy || !ensureValid()) return;
        clearTimeout(timer); render();
        const snapshot = { ...state }, snapshotAssets = { ...assets }, selected = formatFor(snapshot);
        setBusy(true);
        if (action === 'download-png') {
          const output = document.createElement('canvas');
          drawScene(output, buildScene(snapshot, selected, output.getContext('2d')), snapshotAssets);
          download(await pngBlob(output), `${filename(snapshot)}-${selected.id}.png`);
          setStatus(`${selected.label} PNG download prepared at ${selected.width} × ${selected.height}.`);
        }
        if (action === 'download-svg') {
          const scene = buildScene(snapshot, selected, canvas.getContext('2d'));
          download(new Blob([sceneToSVG(scene, snapshotAssets)], { type: 'image/svg+xml' }), `${filename(snapshot)}-${selected.id}.svg`);
          setStatus('Editable SVG download prepared with embedded fonts and images. SVG font support varies by design app.');
        }
        if (action === 'download-kit') {
          const entries = [{ name: 'project.json', bytes: JSON.stringify(project(snapshot), null, 2) }];
          for (let index = 0; index < FORMATS.length; index++) {
            const format = FORMATS[index];
            setStatus(`Preparing the kit: ${index + 1} of ${FORMATS.length} — ${format.label}…`);
            await new Promise((resolve) => setTimeout(resolve, 0));
            const output = document.createElement('canvas'), scene = buildScene(snapshot, format, output.getContext('2d'));
            drawScene(output, scene, snapshotAssets);
            entries.push({ name: `png/${format.id}-${format.width}x${format.height}.png`, bytes: new Uint8Array(await (await pngBlob(output)).arrayBuffer()) });
            entries.push({ name: `svg/${format.id}.svg`, bytes: sceneToSVG(scene, snapshotAssets) });
            output.width = 1; output.height = 1;
          }
          for (const [key, path] of [['sans', 'DM-Sans.woff2'], ['mono', 'IBM-Plex-Mono.woff2']]) entries.push({ name: `fonts/${path}`, bytes: Uint8Array.from(atob(snapshotAssets[key].data.split(',')[1]), (char) => char.charCodeAt(0)) });
          entries.push({ name: 'fonts/DM-Sans-LICENSE.txt', bytes: snapshotAssets.sansLicense.text }, { name: 'fonts/IBM-Plex-Mono-LICENSE.txt', bytes: snapshotAssets.monoLicense.text });
          entries.push({ name: 'README.txt', bytes: 'THE RECOUP PODCAST — EPISODE KIT\n\nOpen project.json in Recoup Brand Studio to change the episode details.\nPNG: ready-to-use artwork at the dimensions in the file name.\nSVG: editable text and shapes, with images and fonts embedded. Some design apps require locally installed fonts. Included WOFF2 fonts work on the web; consult the license files for font use.\nVideo frames: place above your video tracks. Speaker windows are transparent.\nThe name label has a transparent background.\nGuest photographs are included in this private export. Check your title, spelling, permissions, and crop before publishing.\nThe Recoup Podcast is the show name. The title remains editable in the creator and project file.\nNo artwork has been published by this tool.\n' });
          download(createZip(entries), `${filename(snapshot)}-podcast-kit.zip`);
          setStatus('Complete kit download prepared: 8 PNGs, 8 editable SVGs, project JSON, fonts, and usage notes.');
        }
        setBusy(false);
      }
    } catch (error) {
      setBusy(false);
      setStatus(error.name === 'QuotaExceededError' ? 'This browser has too little storage for the draft. Save project JSON to keep a copy.' : error.name === 'SecurityError' ? 'Browser storage is unavailable. Save project JSON to keep a copy.' : error.message, true);
    }
  }, { signal });

  syncForm();
  const ready = loadAssets().then(async (loaded) => {
    if (disposed) return;
    assets = loaded;
    if (state.guestImage) assets.guest = { data: state.guestImage, image: await loadImage(state.guestImage) };
    initialized = true; root.querySelector('.pc-loading').hidden = true; render();
    return true;
  }).catch((error) => { if (!disposed) { root.querySelector('.pc-loading').textContent = 'Preview unavailable'; setStatus(error.message, true); } return false; });
  return { ready, getProject: () => project(state), destroy: () => { disposed = true; photoGeneration++; clearTimeout(timer); events.abort(); } };
}
