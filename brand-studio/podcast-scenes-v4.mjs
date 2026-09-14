/** One exact horizontal identity over independently art-directed backgrounds. */
export const STUDIES = [
  {id:'current',name:'Soft current',description:'Broad flowing bands, deep forest, and pools of teal light.',ink:'#D6FF62'},
  {id:'refraction',name:'Blue refraction',description:'A loose blue lattice moving in and out of focus.',ink:'#FFFFFF'},
  {id:'orbits',name:'Lime apertures',description:'Oversized elliptical forms and soft lime shadows.',ink:'#132B26'},
  {id:'woven',name:'Woven light',description:'Large woven shapes with emerald and cyan light.',ink:'#D6FF62'},
  {id:'contour',name:'Ice contours',description:'Pale sculpted curves, translucent edges, and an airy center.',ink:'#152E37'},
  {id:'interference',name:'Blue interference',description:'Fine repeated ribbons gather into broad optical forms.',ink:'#FFFFFF'},
  {id:'sky',name:'Painted sky',description:'Homepage blue with soft painted clouds, luminous edges, and fine grain.',ink:'#FFFFFF'},
  {id:'sky-print',name:'Cloud print',description:'A cobalt field and oversized cloud silhouette with soft, powdery edges.',ink:'#FFFFFF'},
  {id:'daylight',name:'Daylight folds',description:'Broad translucent blue planes, soft cyan light, and fine printed grain.',ink:'#FFFFFF'},
  {id:'blue-exposure',name:'Blue exposure',description:'An oversized sweep of light crossing a deep blue field.',ink:'#FFFFFF'},
  {id:'glass-original',name:'Glass / Original',description:'The selected blue-and-lime glass artwork with colors inverted inside the icon and lettering.',ink:'#132B26',identity:'inverted'},
  {id:'glass-blue',name:'Glass / Blue dominant',description:'Deeper blue glass, a diffused lime reflection, and white lettering.',ink:'#FFFFFF'},
  {id:'glass-lime',name:'Glass / Lime light',description:'Luminous lime glass with blue reflections and deep forest lettering.',ink:'#132B26'},
  {id:'daylight-refined',name:'Daylight folds / Refined',description:'Deep blue folds and cool edge light with the Recoup identity in lime.',ink:'#D6FF62'},
].map(s=>({...s,background:`assets/podcast-kit-v4/${s.id}-background.png`}));

const MARK='M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z';
const xml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));

export function podcastLockup(ink='#D6FF62'){
  // Exact bundled-font advances; separate text runs survive portable PNG outlining.
  const size=96, symbolHeight=100, symbolWidth=127/141*symbolHeight;
  const iconGap=40, wordGap=26.88;
  const recoupWidth=3.4375714285714287*size, podcastWidth=3.46*size;
  const x=(1920-symbolWidth-iconGap-recoupWidth-wordGap-podcastWidth)/2;
  const textX=x+symbolWidth+iconGap;
  return `<g aria-label="Recoup Podcast" fill="${ink}"><g transform="translate(${x} 490) scale(${symbolHeight/141}) translate(-48 -41)"><path d="${MARK}"/></g><text x="${textX}" y="566" font-family="DM Sans" font-size="${size}" font-weight="600" letter-spacing="${-1.1/28*size}" fill="${ink}">Recoup</text><text x="${textX+recoupWidth+wordGap}" y="566" font-family="DM Sans" font-size="${size}" font-weight="300" letter-spacing="${-.04*size}" fill="${ink}">Podcast</text></g>`;
}

export function renderPodcastArtworkSVG({study='current',fontCSS='',backgroundHref,backgroundOnly=false}={}){
  const s=STUDIES.find(s=>s.id===study)||STUDIES[0];
  const href=backgroundHref||s.background;
  const background=`<image href="${xml(href)}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>`;
  const inverted=s.identity==='inverted'&&!backgroundOnly;
  const maskId=`${s.id}-identity-mask`, filterId=`${s.id}-invert`;
  // Invert in sRGB so each channel is exactly 255 minus the background channel.
  // A vector mask preserves the exact mark and editable lettering across exports.
  const effects=inverted?`<filter id="${filterId}" x="0" y="0" width="1920" height="1080" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope="-1" intercept="1"/><feFuncG type="linear" slope="-1" intercept="1"/><feFuncB type="linear" slope="-1" intercept="1"/></feComponentTransfer></filter><mask id="${maskId}" x="0" y="0" width="1920" height="1080" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">${podcastLockup('#FFFFFF')}</mask>`:'';
  const identity=backgroundOnly?'':inverted?`<g mask="url(#${maskId})"><g filter="url(#${filterId})">${background}</g></g>`:podcastLockup(s.ink);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" role="img"><title>${xml(`Recoup Podcast — ${s.name}`)}</title><defs><style>${fontCSS}</style>${effects}</defs>${background}${identity}</svg>`;
}
