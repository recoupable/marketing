/** Recoup podcast backgrounds. Native geometry, with a restrained 12-second loop. */

const WIDTH = 1920;
const HEIGHT = 1080;
const themes = new Set(['cut', 'weave', 'layer']);

function normalizeTheme(theme) {
  return themes.has(theme) ? theme : 'cut';
}

export function patternDefs(theme) {
  switch (normalizeTheme(theme)) {
    case 'weave':
      return `
        <clipPath id="weave-medium-region"><path d="M0 0H1920V1080H1510V590L0 240Z"/></clipPath>
        <clipPath id="weave-small-region"><path d="M0 700L590 515L945 1080H0Z"/></clipPath>`;
    case 'layer':
      return `
        <clipPath id="layer-medium-region"><path d="M1920 0H1580V230Q1580 390 1420 390H960Q800 390 800 550V1080H1920Z"/></clipPath>
        <clipPath id="layer-small-region"><path d="M1920 1080H1250V880Q1250 730 1400 730H1640Q1790 730 1790 580V460H1920Z"/></clipPath>`;
    default:
      return `
        <linearGradient id="cut-face-light" gradientUnits="userSpaceOnUse" x1="850" y1="790" x2="1700" y2="80">
          <stop stop-color="#0876B6"/><stop offset="1" stop-color="#1688BC"/>
        </linearGradient>
        <linearGradient id="cut-lower-plane" gradientUnits="userSpaceOnUse" x1="0" y1="900" x2="1920" y2="1150">
          <stop stop-color="#0F7FB8"/><stop offset="1" stop-color="#086BB1"/>
        </linearGradient>
        <clipPath id="cut-medium-region"><path d="M0 0H520L1010 1080H0Z"/></clipPath>
        <clipPath id="cut-small-region"><path d="M1260 1080L1600 390H2050V1150Z"/></clipPath>`;
  }
}

function rect(x, y, width, height, fill) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}"/>`;
}

function cutField(phase, coverage) {
  const drift = (Math.sin(phase) * 7).toFixed(3);
  const lift = (Math.sin(phase + Math.PI / 3) * 5).toFixed(3);
  const planes = `
    <path d="M-200 -120H1560L610 1180H-200Z" fill="#0755A6"/>
    <path d="M-160 -120H450L1650 1180H1180Z" fill="#0864B3"/>
    <path d="M1560 -120H2140V1180H610Z" fill="#137FB8"/>
    <path d="M1560 -120H1950L1000 1180H610Z" fill="url(#cut-face-light)" transform="translate(${drift} 0)"/>
    <path d="M-140 930L780 710L2010 990V1220H-140Z" fill="url(#cut-lower-plane)" transform="translate(0 ${lift})"/>
    ${coverage === 'large' ? `<path d="M1566 902L1700 932L1697 945L1563 915Z" fill="#D6FF62" transform="translate(0 ${lift})"/>` : ''}`;
  if (coverage === 'large') return planes;
  if (coverage === 'medium') {
    // Different framing from the small treatment: broad facets enter from left.
    return `<g clip-path="url(#cut-medium-region)">
      <g transform="translate(-530 -60) scale(1.45)">${planes}</g>
      <path d="M145 690L286 709L284 721L143 702Z" fill="#D6FF62" transform="translate(0 ${lift})"/>
    </g>`;
  }
  return `<g clip-path="url(#cut-small-region)">
    <g transform="translate(480 55) scale(.91)">${planes}</g>
    <path d="M1610 832L1727 858L1724 870L1607 844Z" fill="#D6FF62" transform="translate(0 ${lift})"/>
  </g>`;
}

function splitCapsule(x, y, accent, drift) {
  const right = accent ? '#1C4B56' : '#1D4035';
  return `<g transform="translate(${x} ${y}) rotate(-35)">
    <path d="M-12 -145H-138A145 145 0 0 0 -138 145H-12Z" fill="#17382F"/>
    <path d="M12 -145H138A145 145 0 0 1 138 145H12Z" fill="${right}" transform="translate(${drift} 0)"/>
  </g>`;
}

function weaveField(phase, coverage) {
  let pattern = '';
  for (let row = 0; row < 6; row += 1) {
    const y = -160 + row * 340;
    for (let col = 0; col < 7; col += 1) {
      const x = -300 + col * 460 + (row % 2 ? 230 : 0);
      const accent = (row === 3 && col === 4) || (row === 1 && col === 1);
      const drift = accent ? (Math.sin(phase + row) * 5).toFixed(3) : '0';
      pattern += splitCapsule(x, y, accent, drift);
    }
  }
  if (coverage === 'large') return pattern;
  if (coverage === 'medium') {
    return `<g clip-path="url(#weave-medium-region)">${pattern}</g>`;
  }
  return `<g clip-path="url(#weave-small-region)">
    <g transform="translate(-110 40) scale(.9)">${pattern}</g>
  </g>`;
}

function layerField(phase, coverage) {
  const rise = (Math.sin(phase) * 8).toFixed(3);
  const shift = (Math.sin(phase + Math.PI / 2) * 6).toFixed(3);
  const forms = `
    <path d="M-160 -140H1130V135Q1130 275 1270 275H2080V1240H-160Z" fill="#E0FF91"/>
    <path d="M-100 110H620Q780 110 780 270V430Q780 590 940 590H2090V1260H-100Z" fill="#C6EC72" transform="translate(0 ${rise})"/>
    <path d="M-150 930H420Q580 930 580 770V610Q580 450 740 450H1380Q1540 450 1540 290V-130H2100V1250H-150Z" fill="#ABE0AE"/>
    <path d="M1710 -120H2100V1230H1310V1060Q1310 900 1470 900H1550Q1710 900 1710 740Z" fill="#5DBBD0" transform="translate(${shift} 0)"/>`;
  if (coverage === 'large') return forms;
  if (coverage === 'medium') {
    return `<g clip-path="url(#layer-medium-region)">
      <g transform="translate(240 -90)">${forms}</g>
    </g>`;
  }
  return `<g clip-path="url(#layer-small-region)">
    <g transform="translate(550 280) scale(.75)">${forms}</g>
  </g>`;
}

/** SVG body, including a base fill; all coordinates use a 1920 × 1080 canvas. */
export function patternField(theme, time = 3, { coverage = 'medium', width = WIDTH, height = HEIGHT } = {}) {
  const id = normalizeTheme(theme);
  const size = ['small', 'medium', 'large'].includes(coverage) ? coverage : 'medium';
  const phase = ((Number.isFinite(time) ? time : 3) % 12) * Math.PI / 6;
  const safeWidth = Number.isFinite(width) && width > 0 ? width : WIDTH;
  const safeHeight = Number.isFinite(height) && height > 0 ? height : HEIGHT;
  const base = id === 'weave' ? '#132B26' : id === 'layer' ? '#D6FF62' : '#0565BB';
  const geometry = id === 'weave' ? weaveField(phase, size) : id === 'layer' ? layerField(phase, size) : cutField(phase, size);
  return `<g transform="scale(${safeWidth / WIDTH} ${safeHeight / HEIGHT})">${rect(0, 0, WIDTH, HEIGHT, base)}${geometry}</g>`;
}
