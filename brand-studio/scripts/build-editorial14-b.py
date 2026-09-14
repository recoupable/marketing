"""Three expressive vector patterns with verbatim round10 typography."""
from pathlib import Path
import importlib.util
import re
import json
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/editorial-14'
OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('vectors',ROOT/'scripts/build-assets.py')
v=importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
W,H=1920,1080
BLUE,DEEP,FOREST,LIME,PALE='#007EBD','#0565BB','#132B26','#D6FF62','#C2EDFF'

def path(d,fill,extra=''):
    return f'<path d="{d}" fill="{fill}" {extra}/>'

def paper_turn():
    defs='''<defs>
      <linearGradient id="turn-upper" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#007EBD"/><stop offset="1" stop-color="#0565BB"/>
      </linearGradient>
      <linearGradient id="turn-side" x1="0" y1="0" x2="1" y2=".6">
        <stop stop-color="#C2EDFF"/><stop offset="1" stop-color="#77D1E8"/>
      </linearGradient>
    </defs>'''
    # Four unequal blades share a pivot; split faces imply a fold without bevels.
    body=v.rect(0,0,W,H,LIME)+defs
    body+=path('M1560 936L1780 1470L1280 1360L1390 1046Z',FOREST)
    body+=path('M1560 936L2050 706L2140 1180L1700 1080Z','url(#turn-side)')
    body+=path('M1560 936L2140 1180L1700 1080Z','#54BDDB')
    body+=path('M1560 936L1370 476L1770 540L1690 830Z','url(#turn-upper)')
    body+=path('M1560 936L1370 476L1615 662Z','#132B26')
    body+=path('M1560 936L1054 1146L1120 738L1396 788Z','#007EBD')
    body+=path('M1560 936L1054 1146L1290 934Z','#91DDF0')
    return body

def crossed_lenses():
    defs='''<defs>
      <linearGradient id="lens-first" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#0565BB"/><stop offset=".65" stop-color="#007EBD"/><stop offset="1" stop-color="#2DABCE"/>
      </linearGradient>
      <linearGradient id="lens-second" x1="0" y1="0" x2=".2" y2="1">
        <stop stop-color="#C2EDFF"/><stop offset="1" stop-color="#63C8D9"/>
      </linearGradient>
      <clipPath id="lens-a"><ellipse cx="220" cy="640" rx="210" ry="600" transform="rotate(-30 220 640)"/></clipPath>
    </defs>'''
    first='<ellipse cx="220" cy="640" rx="210" ry="600" transform="rotate(-30 220 640)" fill="url(#lens-first)"/>'
    second='<ellipse cx="150" cy="275" rx="180" ry="460" transform="rotate(35 150 275)" fill="url(#lens-second)"/>'
    overlap='<g clip-path="url(#lens-a)"><ellipse cx="150" cy="275" rx="180" ry="460" transform="rotate(35 150 275)" fill="#D6FF62"/></g>'
    return v.rect(0,0,W,H,FOREST)+defs+first+second+overlap

def switchback():
    defs='''<defs>
      <linearGradient id="switch-face" x1="0" y1="0" x2="1" y2=".4">
        <stop stop-color="#77D1E8"/><stop offset="1" stop-color="#C2EDFF"/>
      </linearGradient>
    </defs>'''
    body=v.rect(0,0,W,H,DEEP)+defs
    # A single wide folded strip; changes in direction supply motion and crop.
    body+=path('M-140 46L723 219L776 363L220 507L713 606L752 742L-99 574L-130 449L533 293L-140 159Z','url(#switch-face)')
    body+=path('M723 219L776 363L649 329L533 293Z',FOREST)
    body+=path('M220 507L713 606L752 742L569 652Z','#2BABD3')
    body+=path('M-130 449L-99 574L92 536L61 403Z',LIME)
    return body

studies=[
    (4,'Paper turn',5,paper_turn(),'Lime / blue / ice',
     'Four unequal folded shapes meet off-center, with a tight crop that makes the pattern feel mid-turn.',
     'Use unequal angular blades around one off-center pivot. Keep the form large and cropped; leave the headline field untouched.',
     'Use two quiet face gradients to distinguish the folds. The lime field is flat.'),
    (5,'Crossed lenses',2,crossed_lenses(),'Forest / blue / ice / lime',
     'Two elongated forms cross at different angles. A lime overlap creates one clear point of tension.',
     'Overlap two broad eccentric ellipses with distinct angles and proportions. Crop them heavily at the left edge.',
     'Keep forest flat. Blue and cyan shift only inside the forms; the intersection is solid lime.'),
    (6,'Switchback',6,switchback(),'Blue / ice / forest / lime',
     'A broad strip folds back across itself, with sharp changes in direction and a small lime interruption.',
     'Draw one asymmetric zigzag with unequal runs and generous width. Use filled faces rather than repeated contour lines.',
     'One pale-to-cyan transition follows the upper face. Flat dark and blue facets show where the strip turns.'),
]
manifest=[]
for n,title,original,body,palette,description,pattern,light in studies:
    original_path=ROOT/f'assets/editorial-10/option-{original:02d}.svg'
    text_nodes=re.findall(r'<text\b[^>]*>.*?</text>',original_path.read_text())
    assert len(text_nodes)==2
    for suffix,content in [('',body+''.join(text_nodes)),('-art',body)]:
        source=v.svg(W,H,content,f'Recoup / {title}',fonts=not suffix)
        ET.fromstring(source)
        assert re.findall(r'<text\b[^>]*>.*?</text>',source)==([] if suffix else text_nodes)
        (OUT/f'option-{n:02d}{suffix}.svg').write_text(source)
        v.render(source,OUT/f'option-{n:02d}{suffix}.png')
    manifest.append({
      'id':f'editorial14-{n:02d}','category':'editorial-14','title':title,
      'description':description,'patternRule':pattern,'gradientRule':light,
      'paletteName':palette,'preview':f'assets/editorial-14/option-{n:02d}.png',
      'artPreview':f'assets/editorial-14/option-{n:02d}-art.png',
      'originalPreview':f'assets/editorial-10/option-{original:02d}.png',
      'typography':'Exact DM Sans 450 · 110 px · 125 px line spacing · −4.95 px tracking',
      'sampleTitle':'Choose your first AI project.','width':W,'height':H,
      'status':'proposed','generator':'native SVG',
      'files':[{'label':label+' '+ext.upper(),'path':f'assets/editorial-14/option-{n:02d}{suffix}.{ext}'}
               for suffix,label in [('', 'Thumbnail'),('-art','Pattern only')] for ext in ['png','svg']],
    })
(ROOT/'round-14-b.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Built patterns 04–06 with the exact preferred text elements.')
