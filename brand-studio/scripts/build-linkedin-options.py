#!/usr/bin/env python3
"""Native Recoup banner compositions; reserve x<440 for profile-photo overlap."""
from pathlib import Path
import base64, importlib.util, json, zipfile, html
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets/linkedin-options-v2';OUT.mkdir(exist_ok=True)
spec=importlib.util.spec_from_file_location('kit',ROOT/'scripts/render-podcast-kit-v2.py');kit=importlib.util.module_from_spec(spec);spec.loader.exec_module(kit)
W,H=1584,396
BLUE='#0565BB';INK='#152E37';FOREST='#132B26';LIME='#D6FF62';PALE='#F0F7FA'
def data(path):return 'data:image/png;base64,'+base64.b64encode((ROOT/path).read_bytes()).decode()
bg=data('assets/podcast-kit-daylight/daylight-background.png')
def rect(x,y,w,h,c,rx=0):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{c}"/>'
def text(s,x,y,size=70,c=INK,weight=450):return f'<text x="{x}" y="{y}" font-family="DM Sans" font-weight="{weight}" font-size="{size}" letter-spacing="{-size*.035}" fill="{c}">{html.escape(s)}</text>'
def logo(x,y,c=INK,scale=.26):
 source=(ROOT/'assets/logos/lockup-ink.svg').read_text();body=source[source.index('<g transform='):source.rindex('</svg>')].replace('#152E37',c)
 return f'<g transform="translate({x-74*scale} {y-57.8583*scale}) scale({scale})">{body}</g>'
def title(x,y,c=INK,size=70):return text('AI for the business',x,y,size,c)+text('of music.',x,y+size*1.04,size,c)
def pic(x=0,y=0,w=W,h=H):return f'<image href="{bg}" x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"/>'
def svg(body,defs=''):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><defs><style>{kit.FONT_CSS}</style>{defs}</defs>{body}</svg>'
items=[]
def add(slug,name,desc,body,defs=''):
 items.append(dict(id='linkedin-'+slug,title=name,description=desc,body=svg(body,defs)))
# One long line follows the broad horizontal movement of the Daylight artwork.
add('daylight','01 · Daylight / one clear line','A wide headline follows the folds; a small wordmark anchors the upper right.',pic()+logo(1250,58,'#FFFFFF',.21)+text('AI for the business of music.',440,236,68,'#FFFFFF'))
# Two opposing weights: a compact upper-left mark and a substantial right-edge graphic.
planes='<path d="M1265 -80 H1480 L1660 476 H1445 Z" fill="#A4DCEB"/><path d="M1410 -80 H1570 L1750 476 H1590 Z" fill="#007EBD"/>'
add('paper','02 · Paper / counterweight','Pale space and a strong blue edge balance a generous two-line headline.',rect(0,0,W,H,PALE)+planes+logo(72,52,INK,.22)+title(470,194,INK,77))
# A large short statement rather than another small logo/headline stack.
stripes=''.join(f'<path d="M{x} -60 L{x+18} -60 L{x-180} 450 L{x-198} 450 Z" fill="{LIME if i==2 else '#1673DD'}" opacity="{.9 if i==2 else .55}"/>' for i,x in enumerate(range(-40,380,66)))
add('tempo','03 · Tempo / bold statement','Large type and a smaller supporting line carry the composition; rhythm stays at the edge.',rect(0,0,W,H,'#084BC6')+stripes+logo(1270,54,LIME,.19)+text('AI for music.',465,230,116,LIME)+text('Built around your business.',473,295,37,'#FFFFFF',400))
# Graphic weight in diagonally opposite corners; avoid a hard left-column divider.
shapes='<path d="M-60 -90 H280 L510 115 H170 Z" fill="#27564B"/><path d="M-60 30 H115 L350 235 H175 Z" fill="#1C453C"/><path d="M1340 286 H1530 L1690 436 H1500 Z" fill="#176777"/><path d="M1480 256 H1590 L1725 381 H1615 Z" fill="#2D5749"/>'
add('woven','04 · Forest / diagonal balance','Oversized corner shapes balance a lime headline across an open forest field.',rect(0,0,W,H,FOREST)+shapes+logo(1265,52,'#FFFFFF',.19)+title(455,194,LIME,80))
# The large blue circle is a crop, not a repeated corner ornament.
add('lime','05 · Lime / blue punctuation','A small wordmark, a large second line, and one oversized blue crop.',rect(0,0,W,H,LIME)+'<circle cx="1530" cy="440" r="370" fill="#007EBD"/><circle cx="1580" cy="460" r="288" fill="#0565BB"/>'+logo(72,52,FOREST,.22)+text('The business of music.',440,183,66,FOREST)+text('With AI.',440,286,108,FOREST))
# Quiet composition: light on one edge, not a wave passing through the type.
add('night','06 · Night / quiet confidence','A restrained one-line message, dark blue space, and a shallow sweep of light.',rect(0,0,W,H,'#082C60')+'<path d="M-80 -50 Q780 125 1690 -70 L1690 2 Q800 204 -80 26 Z" fill="url(#light)"/>'+logo(72,80,'#FFFFFF',.21)+text('AI for the business of music.',458,245,63,'#FFFFFF'),'<linearGradient id="light" x1="0" x2="1"><stop stop-color="#0565BB"/><stop offset=".65" stop-color="#1179B7"/><stop offset="1" stop-color="#95E9F5"/></linearGradient>')
# The wordmark is the single focal point, optically centered in the available field.
add('identity','07 · Identity / open space','A large wordmark takes the lead, balanced against a generous crop of Daylight blue.',rect(0,0,W,H,PALE)+f'<g clip-path="url(#crop)">{pic(-160,-110,850,615)}</g>'+logo(680,105,INK,.47)+text('AI for the business of music.',638,284,39,INK,400),'<clipPath id="crop"><path d="M0 0 H465 L360 396 H0 Z"/></clipPath>')
# A three-part service line uses the width of the canvas; the logo lives above the PFP area.
add('services','08 · Services / typographic','A direct service line uses the full width, with a fine blue rule and restrained branding.',rect(0,0,W,H,'#FFFFFF')+logo(72,52,INK,.22)+rect(460,135,1034,2,'#B8DCE9')+text('AI strategy. Systems. Training.',460,237,62,INK)+rect(1414,309,80,12,BLUE))
manifest=[];renders=[]
for item in items:
 slug=item['id'].removeprefix('linkedin-');s=item.pop('body');(OUT/f'{slug}.svg').write_text(s);renders.append((s,OUT/f'{slug}.png'))
 manifest.append({**item,'group':'social','preview':f'assets/linkedin-options-v2/{slug}.png','files':[{'label':'PNG','path':f'assets/linkedin-options-v2/{slug}.png'},{'label':'Editable SVG','path':f'assets/linkedin-options-v2/{slug}.svg'}],'collection':'LinkedIn banner options','current':True,'tool':f'linkedin-banners.html#{slug}'})
kit.rasterize(renders)
(ROOT/'linkedin-options-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(OUT/'README.txt').write_text('Recoup LinkedIn banner options\n\nEight native-vector compositions at 1584 x 396. PNGs preserve exact typography. SVGs embed local fonts. The lower-left x=0..400, y=160..396 region contains no essential copy or logo. The upper-left remains available for compact branding. Clean banner previews only. The prior options are preserved in linkedin-options-v1. Check the final crop when uploading.\n')
with zipfile.ZipFile(OUT/'recoup-linkedin-options.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(OUT.iterdir()):
  if p.suffix in ['.png','.svg','.txt']:z.write(p,p.name)
print('Exported eight PNG/SVG banner options and a ZIP.')
