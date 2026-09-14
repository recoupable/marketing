// Shared native-vector scenes for the proposed podcast identity study.
// The same geometry is used by the live preview, still exports, and intro videos.
export const THEMES = [
  { id: 'blue', name: 'Blue / light drift', description: 'Deep Recoup blue, white type, and a quiet wash of lime at the edge.', bg: '#0565BB', ink: '#FFFFFF', accent: '#D6FF62', glow: '#55D6EF', muted: '#C2EDFF' },
  { id: 'forest', name: 'Forest / after hours', description: 'Forest green, lime type, and a restrained blue edge.', bg: '#132B26', ink: '#D6FF62', accent: '#D6FF62', glow: '#007EBD', muted: '#BAD0C6' },
  { id: 'lime', name: 'Lime / full color', description: 'A bright lime field with dark green type and a pale blue edge.', bg: '#D6FF62', ink: '#132B26', accent: '#007EBD', glow: '#C2EDFF', muted: '#395344' },
];

export const FORMATS = [
  { id: 'intro', label: 'Animated opening' },
  { id: 'solo', label: 'One speaker' },
  { id: 'duo', label: 'Two speakers' },
  { id: 'thumbnail', label: 'Episode thumbnail' },
  { id: 'background', label: 'Clean background' },
];

export const CAMERA_WINDOWS = {
  solo: [{ x: 48, y: 118, width: 1824, height: 874, radius: 22 }],
  duo: [{ x: 48, y: 194, width: 894, height: 718, radius: 20 }, { x: 978, y: 194, width: 894, height: 718, radius: 20 }],
};

const MARK = 'M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z';
const xml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, Number(n) || 0));
const ease = n => { const x = clamp(n); return x * x * (3 - 2 * x); };
const rect = (x, y, w, h, fill, radius = 0, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" ${extra}/>`;
const mark = (x, y, h, color) => `<g transform="translate(${x} ${y}) scale(${h / 141}) translate(-48 -41)"><path d="${MARK}" fill="${color}"/></g>`;
const text = (value, x, y, size, color, weight = 450, tracking = -.045 * size, extra = '') => `<text x="${x}" y="${y}" font-family="DM Sans" font-size="${size}" font-weight="${weight}" letter-spacing="${tracking}" fill="${color}" ${extra}>${xml(value)}</text>`;
const mono = (value, x, y, size, color, extra = '') => `<text x="${x}" y="${y}" font-family="IBM Plex Mono" font-size="${size}" font-weight="400" letter-spacing="${size * .06}" fill="${color}" ${extra}>${xml(value)}</text>`;

// Conservative font-width estimates keep long names and unbroken titles within
// their own regions in both the browser and offline SVG renderer.
function estimatedWidth(value, size, tracking = -.045 * size) {
  let units = 0;
  for (const character of String(value)) {
    units += /[MW@%]/.test(character) ? .95 : /[ilI.,:;'!|]/.test(character) ? .28 : /[ m]/.test(character) ? (character === ' ' ? .3 : .85) : /[A-Z0-9]/.test(character) ? .72 : .62;
  }
  return units * size + Math.max(0, String(value).length - 1) * tracking;
}

function headlineLayout(input, maxWidth = 1540, maxHeight = 455) {
  const content = String(input).trim().replace(/\s+/g, ' ').slice(0, 180) || 'Untitled episode';
  for (let size = 136; size >= 30; size -= 2) {
    const rows = []; let line = '';
    for (const word of content.split(' ')) {
      const candidate = line ? line + ' ' + word : word;
      if (estimatedWidth(candidate, size) <= maxWidth) { line = candidate; continue; }
      if (line) { rows.push(line); line = ''; }
      for (const character of word) {
        if (line && estimatedWidth(line + character, size) > maxWidth) { rows.push(line); line = ''; }
        line += character;
      }
    }
    if (line) rows.push(line);
    if (rows.length > 1) {
      const last = rows.length - 1;
      while (estimatedWidth(rows[last], size) < estimatedWidth(rows[last - 1], size) * .55) {
        const preceding = rows[last - 1].split(' ');
        if (preceding.length < 3) break;
        const next = preceding.at(-1) + ' ' + rows[last];
        if (estimatedWidth(next, size) > maxWidth) break;
        preceding.pop(); rows[last - 1] = preceding.join(' '); rows[last] = next;
      }
    }
    if (rows.length <= 4 && rows.length * size * 1.06 <= maxHeight) return { rows, size };
  }
  return { rows: [content.slice(0, 90), content.slice(90)], size: 30 };
}

function fitSingle(value, x, y, maxWidth, preferred, color, weight = 450, anchor = 'start') {
  const content = String(value).trim().replace(/\s+/g, ' ');
  const size = Math.min(preferred, preferred * maxWidth / Math.max(1, estimatedWidth(content, preferred, -.02 * preferred)));
  return text(content, x, y, size, color, weight, -.02 * size, `text-anchor="${anchor}"`);
}

function showLockup(t, x = 68, y = 41, h = 40) {
  const s = h / 40;
  return mark(x, y, h, t.ink) + text('Recoup', x + 53 * s, y + 35 * s, 42 * s, t.ink, 600, -1.65 * s) + text('Podcast', x + 208 * s, y + 35 * s, 42 * s, t.ink, 450, -1.65 * s);
}

function background(t, time) {
  const phase = ((Number(time) || 0) % 12) * Math.PI * 2 / 12;
  const driftX = 14 * Math.sin(phase), driftY = 10 * Math.cos(phase);
  const lineColor = t.id === 'lime' ? '#007EBD' : t.id === 'forest' ? '#82BEE5' : '#C2EDFF';
  // A cropped ascending curve echoes the mark's connecting bend without duplicating the logo.
  return rect(0, 0, 1920, 1080, t.bg) + `<g transform="translate(${driftX.toFixed(2)} ${driftY.toFixed(2)})">
    <ellipse cx="1990" cy="1120" rx="520" ry="620" fill="url(#edge-glow)"/>
    <ellipse cx="1850" cy="1260" rx="310" ry="470" fill="url(#accent-glow)"/>
    <g fill="none" stroke="${lineColor}" stroke-width="1.5" opacity="${t.id === 'lime' ? '.18' : '.23'}">
      <path d="M1410 1190V925C1410 815 1485 750 1600 750H1715C1810 750 1860 696 1860 595V-150"/>
      <path d="M1472 1190V948C1472 856 1535 810 1629 810H1737C1843 810 1922 736 1922 620V-150"/>
      <path d="M1534 1190V990C1534 908 1592 872 1677 872H1770C1892 872 1984 781 1984 662V-150"/>
    </g>
  </g>`;
}

function intro(t, time) {
  const reveal = ease((time - 1.2) / .9);
  const markHeight = 164;
  const startX = (1920 - markHeight * 127 / 141) / 2;
  const x = startX + (562 - startX) * reveal;
  const y = 439 - 18 * reveal;
  const opacity = ease(time / .55);
  return `<g opacity="${opacity.toFixed(4)}">${mark(x, y, markHeight, t.ink)}</g>` +
    `<g opacity="${reveal.toFixed(4)}" transform="translate(${(16 * (1 - reveal)).toFixed(2)} 0)">${text('Recoup', 751, 520, 159, t.ink, 600, -6.25)}${text('Podcast', 757, 614, 79, t.ink, 450, -3.2)}</g>`;
}

function cameraPlaceholder(t, window, label) {
  const {x, y, width, height, radius} = window;
  return rect(x, y, width, height, '#E9EFED', radius) +
    `<path d="M${x + width / 2 - 28} ${y + height / 2}h56M${x + width / 2} ${y + height / 2 - 28}v56" fill="none" stroke="#A1B4AC" stroke-width="1.5"/>` +
    mono(label, x + width / 2, y + height / 2 + 72, 20, '#647C71', 'text-anchor="middle"');
}

/** Produce the exact scene displayed by the prototype. fontCSS may embed local font data for standalone exports. */
export function renderPodcastSVG({ theme = 'blue', format = 'intro', title = 'AI and the business of music', host = 'Host name', guest = 'Guest name', episode = '01', time = 3, preview = true, fontCSS = '', chromeOnly = false } = {}) {
  const t = THEMES.find(item => item.id === theme) || THEMES[0];
  const mode = FORMATS.some(item => item.id === format) ? format : 'intro';
  const windows = CAMERA_WINDOWS[mode] || [];
  const frame = !preview && windows.length && !chromeOnly;
  const safeTime = Math.max(0, Number(time) || 0);
  const mask = frame ? `<mask id="camera-mask"><rect width="1920" height="1080" fill="white"/>${windows.map(w => rect(w.x, w.y, w.width, w.height, 'black', w.radius)).join('')}</mask>` : '';
  let body = chromeOnly && windows.length ? '' : background(t, safeTime);
  if (mode === 'intro') body += intro(t, Math.min(6, safeTime));
  if (mode === 'solo' || mode === 'duo') {
    body += showLockup(t);
    body += mono(`EP. ${String(episode).trim().slice(0, 12) || '01'}`, 1847, 70, 22, t.muted, 'text-anchor="end"');
    if (preview) body += windows.map((w, i) => cameraPlaceholder(t, w, mode === 'solo' ? 'YOUR CAMERA' : i ? 'GUEST CAMERA' : 'HOST CAMERA')).join('');
    if (mode === 'solo') {
      body += fitSingle(String(host).slice(0, 55) || 'Host name', 69, 1048, 540, 27, t.ink, 500);
      body += fitSingle(String(title).slice(0, 100), 1847, 1048, 1130, 27, t.muted, 400, 'end');
    } else {
      body += fitSingle(String(host).slice(0, 55) || 'Host name', 69, 971, 828, 32, t.ink, 500);
      body += fitSingle(String(guest).slice(0, 55) || 'Guest name', 999, 971, 828, 32, t.ink, 500);
      body += fitSingle(String(title).slice(0, 100), 69, 1042, 1740, 28, t.muted, 400);
    }
  }
  if (mode === 'thumbnail') {
    body += showLockup(t, 86, 72, 48);
    body += mono(`EPISODE ${String(episode).trim().slice(0, 12) || '01'}`, 92, 296, 25, t.muted);
    const { rows, size } = headlineLayout(title);
    body += rows.map((row, i) => text(row, 84, 453 + i * size * 1.06, size, t.ink, 450, -size * .052)).join('');
    body += rect(92, 882, 70, 4, t.accent);
    body += fitSingle(String(guest).slice(0, 55) ? `With ${String(guest).slice(0, 55)}` : 'The Recoup Podcast', 92, 956, 1300, 39, t.ink);
  }
  const definitions = `<defs><style>${fontCSS}</style>
    <radialGradient id="edge-glow"><stop stop-color="${t.glow}" stop-opacity="${t.id === 'forest' ? '.57' : '.8'}"/><stop offset=".55" stop-color="${t.glow}" stop-opacity=".17"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
    <radialGradient id="accent-glow"><stop stop-color="${t.accent}" stop-opacity="${t.id === 'blue' ? '.74' : '.2'}"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>${mask}</defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" role="img"><title>${xml('The Recoup Podcast — ' + t.name + ' — ' + mode)}</title>${definitions}<g${frame ? ' mask="url(#camera-mask)"' : ''}>${body}</g></svg>`;
}
