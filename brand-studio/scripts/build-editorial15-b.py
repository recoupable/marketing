"""Full-surface pattern studies with unchanged preferred headline elements."""
from pathlib import Path
import importlib.util
import json
import re
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/editorial-15'
OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('vectors',ROOT/'scripts/build-assets.py')
v=importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
W,H=1920,1080

def p(d,fill,extra=''):
    return f'<path d="{d}" fill="{fill}" {extra}/>'

def nested_planes():
    defs='''<defs>
      <linearGradient id="nested-lime" x1="0" y1="0" x2="1" y2=".7">
        <stop stop-color="#E7FFAF"/><stop offset="1" stop-color="#D6FF62"/>
      </linearGradient>
      <linearGradient id="nested-mint" x1="0" y1="0" x2=".8" y2="1">
        <stop stop-color="#D6FF62"/><stop offset="1" stop-color="#B5EAB4"/>
      </linearGradient>
    </defs>'''
    body=v.rect(0,0,W,H,'#F0FFD7')+defs
    # Off-axis rounded trapezoids; every layer is larger than the artwork.
    body+=p('M-340 1390L270 -70Q326 -190 510 -194L2370 -270L2470 1440Z','#E9FFB5')
    body+=p('M-42 1390L540 68Q590 -38 728 -28L2370 52L2470 1440Z','url(#nested-lime)')
    body+=p('M296 1390L884 252Q935 160 1060 184L2370 426L2470 1440Z','#C6F56C')
    body+=p('M638 1390L1190 447Q1238 367 1344 393L2370 676L2470 1440Z','url(#nested-mint)')
    body+=p('M1040 1390L1555 672Q1586 621 1654 648L2370 951L2470 1440Z','#A2DDB2')
    return body

def paper_inset():
    defs='''<defs>
      <pattern id="print-tiles" x="-54" y="-37" width="416" height="416" patternUnits="userSpaceOnUse" patternTransform="rotate(-9)">
        <rect width="416" height="416" fill="#0565BB"/>
        <path d="M0 0H194V194H0Z M208 208H402V402H208Z" fill="#007EBD"/>
        <path d="M0 0H194V82C194 151 151 194 82 194H0Z M208 208H402V290C402 359 359 402 290 402H208Z" fill="#48B4D4"/>
        <path d="M208 0H402V194H320C251 194 208 151 208 82Z M0 208H194V402H112C43 402 0 359 0 290Z" fill="#084E91"/>
        <path d="M233 26H375V166H316C264 166 233 135 233 82Z M25 234H168V374H108C57 374 25 343 25 290Z" fill="#007EBD"/>
      </pattern>
    </defs>'''
    body=defs+v.rect(0,0,W,H,'url(#print-tiles)')
    body+=p('M1610 85L1775 59L1801 224L1733 235C1672 245 1640 219 1630 158Z','#D6FF62')
    # One reading panel, 17% of the frame. Pattern remains visible on all sides.
    body+=v.rect(68,528,1008,370,'#FFFFFF',12)
    return body

def broad_sweep():
    defs='''<defs>
      <linearGradient id="sweep-lit" x1="0" y1="0" x2=".8" y2="1">
        <stop stop-color="#42B7D6"/><stop offset=".48" stop-color="#007EBD"/><stop offset="1" stop-color="#07569E"/>
      </linearGradient>
      <linearGradient id="sweep-deep" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#075FA8"/><stop offset="1" stop-color="#064B8B"/>
      </linearGradient>
    </defs>'''
    body=v.rect(0,0,W,H,'#0565BB')+defs
    fills=['#0B4F8D','url(#sweep-lit)','#137EAF','url(#sweep-deep)','#046DAC','#084D89','#0074B1']
    for i,fill in enumerate(fills):
        x=-970+i*450
        d=f'M{x} -180H{x+322}C{x+380} 276 {x+600} 679 {x+980} 1250H{x+596}C{x+286} 692 {x+118} 300 {x} -180Z'
        body+=p(d,fill)
    body+=p('M190 -60H268L309 85L237 107Z','#D6FF62')
    return body

studies=[
 (4,'Monumental layers',5,nested_planes(),'Lime / pale lime / mint',
  'Huge angled layers extend beyond the frame. Their scale turns the entire cover into the pattern.',
  'Use several off-axis rounded trapezoids, each larger than the canvas. Change the inset and angle subtly between layers.',
  'Pale lime gives the headline contrast. Soft lime-to-mint transitions belong to two broad inner layers.',
  'Oversized forms occupy most of the canvas and extend across all four edges; the headline sits directly on the artwork.'),
 (5,'Pattern under paper',4,paper_inset(),'Blue / cyan / forest blue / white',
  'A dense blue tile field fills the cover, with a small white panel giving the headline its own place.',
  'Repeat alternating curved tile shapes at a slight angle. Keep the pattern large enough to read as shapes at thumbnail size.',
  'Use flat blue and cyan values for the field, one lime accent, and a solid white reading panel.',
  'Pattern covers the whole canvas. A reading panel covers about 18%, leaving an active surface around every side.'),
 (6,'Broad sweep',6,broad_sweep(),'Blue / deep blue / cyan / lime',
  'Wide directional bands sweep across the full frame, shifting in width and color as they pass behind the headline.',
  'Use broad filled bands spanning top to bottom, with a gradual bend across the composition. Avoid thin contour lines.',
  'Alternate deep and medium blue faces. A cyan transition appears in one band; dark blue remains beneath the white text.',
  'Bands span the whole canvas, including behind the type. There is no separate empty field or corner ornament.'),
]
rows=[]
for n,title,original,body,palette,description,pattern,light,coverage in studies:
    original_path=ROOT/f'assets/editorial-10/option-{original:02d}.svg'
    text_nodes=re.findall(r'<text\b[^>]*>.*?</text>',original_path.read_text())
    assert len(text_nodes)==2
    for suffix,content in [('',body+''.join(text_nodes)),('-art',body)]:
        source=v.svg(W,H,content,f'Recoup / {title}',fonts=not suffix)
        ET.fromstring(source)
        assert re.findall(r'<text\b[^>]*>.*?</text>',source)==([] if suffix else text_nodes)
        (OUT/f'option-{n:02d}{suffix}.svg').write_text(source)
        v.render(source,OUT/f'option-{n:02d}{suffix}.png')
    rows.append({
      'id':f'editorial15-{n:02d}','category':'editorial-15','title':title,
      'description':description,'patternRule':pattern,'gradientRule':light,'coverageRule':coverage,
      'paletteName':palette,'preview':f'assets/editorial-15/option-{n:02d}.png',
      'artPreview':f'assets/editorial-15/option-{n:02d}-art.png',
      'originalPreview':f'assets/editorial-10/option-{original:02d}.png',
      'typography':'DM Sans · weight 450 · 110 px · 125 px line spacing · −4.95 px tracking',
      'sampleTitle':'Choose your first AI project.','width':W,'height':H,'status':'proposed','generator':'native SVG',
      'files':[{'label':label+' '+ext.upper(),'path':f'assets/editorial-15/option-{n:02d}{suffix}.{ext}'}
        for suffix,label in [('', 'Thumbnail'),('-art','Pattern only')] for ext in ['png','svg']],
    })
(ROOT/'round-15-b.json').write_text(json.dumps(rows,indent=2)+'\n')
print('Built full-surface studies 04–06 with unchanged preferred text.')
