#!/usr/bin/env python3
"""Adapt the website's dimensional cards to three clean 4:1 brand banners."""
from pathlib import Path
import base64,importlib.util,json,html,zipfile,subprocess
R=Path(__file__).resolve().parents[1];O=R/'assets/linkedin-art';O.mkdir(exist_ok=True)
spec=importlib.util.spec_from_file_location('kit',R/'scripts/render-podcast-kit-v2.py');kit=importlib.util.module_from_spec(spec);spec.loader.exec_module(kit)
INK='#152E37';GREEN='#132B26';LIME='#D6FF62';WHITE='#FFFFFF'
def t(s,x,y,size=52,c=INK,w=450):return f'<text x="{x}" y="{y}" font-family="DM Sans" font-size="{size}" font-weight="{w}" letter-spacing="{-size*.04}" fill="{c}">{html.escape(s)}</text>'
def mono(s,x,y,c=INK):return f'<text x="{x}" y="{y}" font-family="IBM Plex Mono" font-size="9" letter-spacing=".6" fill="{c}">{html.escape(s)}</text>'
def rect(x,y,w,h,c,rx=0,extra=''):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{c}" {extra}/>'
def logo(x,y,c=INK,scale=.22):
 s=(R/'assets/logos/lockup-ink.svg').read_text();b=s[s.index('<g transform='):s.rindex('</svg>')].replace('#152E37',c)
 return f'<g transform="translate({x-74*scale} {y-57.8583*scale}) scale({scale})">{b}</g>'
def card(x,y,angle,fill,lines,label='RECOUP SKILLS',foot='',c=INK,w=178,h=246,tx=18):
 content=rect(0,0,w,h,fill,14,'stroke="#FFFFFF" stroke-opacity=".55" stroke-width="1.5"')+mono(label,18,28,c)
 for i,s in enumerate(lines):content+=t(s,tx,108+i*31,29,c)
 content+=mono(foot,18,h-24,c)
 return f'<g transform="translate({x} {y}) rotate({angle} {w/2} {h/2})"><g filter="url(#shadow)">{content}</g></g>'
def skills(x,y):return card(x,y+17,-10,WHITE,['Research','the artist.'],foot='01 / DISCOVER')+card(x+324,y+18,11,GREEN,['Work the','catalog.'],foot='03 / GROW',c=WHITE)+card(x+145,y-7,1,LIME,['Plan the','release.'],foot='02 / LAUNCH')
sky='data:image/png;base64,'+base64.b64encode(subprocess.check_output(['node','-e',"require('sharp')('public/images/sky/hero-sky.webp').png().toBuffer().then(b=>process.stdout.write(b))"],cwd=R.parent)).decode()
defs=f'''<style>{kit.FONT_CSS}</style><filter id="shadow" x="-40%" y="-30%" width="185%" height="180%"><feDropShadow dx="0" dy="14" stdDeviation="11" flood-color="#102B31" flood-opacity=".2"/></filter><radialGradient id="glow"><stop stop-color="#D6FF62" stop-opacity=".24"/><stop offset="1" stop-color="#D6FF62" stop-opacity="0"/></radialGradient><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#E5F8FF" stop-opacity=".95"/><stop offset="1" stop-color="#A1D9EA" stop-opacity=".9"/></linearGradient>'''
def wrap(b):return f'<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396"><defs>{defs}</defs>{b}</svg>'

def grad(name,start,end,x1='0',y1='0',x2='1',y2='1'):
 return f'<linearGradient id="{name}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"><stop stop-color="{start}"/><stop offset="1" stop-color="{end}"/></linearGradient>'
defs+=grad('azure','#075CC5','#169AD7')+grad('ice','#EFF9FD','#BDE8F6')+grad('deep','#073B76','#086CBD')+grad('cobalt','#0769D4','#0648AC')
def bg(name):return rect(0,0,1584,396,f'url(#{name})')
def brand(c=WHITE):return logo(68,44,c,.13)
def headline(lines,x,y,size,c=WHITE):return ''.join(t(line,x,y+i*(size+7),size,c) for i,line in enumerate(lines))


defs=defs.replace('dy="14" stdDeviation="11"','dy="8" stdDeviation="6"')
defs+='''<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".10"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter><linearGradient id="lightplane" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#A9EFFF" stop-opacity="0"/><stop offset="1" stop-color="#A9EFFF" stop-opacity=".35"/></linearGradient><pattern id="microgrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#C2EDFF" stroke-width=".6" opacity=".22"/></pattern>'''
def artcard(x,y,angle,fill,lines,kind,c=INK):
 content=rect(0,0,188,246,fill,14,'stroke="#FFFFFF" stroke-opacity=".5" stroke-width="1.5"')
 # Small top illustrations describe the work without invented data or metrics.
 if kind=='report':
  content+=rect(18,26,48,51,'none',5,f'stroke="{c}" stroke-opacity=".45" stroke-width="1.3"')
  for j,w in enumerate([26,19,28]):content+=rect(26,36+j*10,w,3,'#007EBD',1, 'opacity=".75"')
 elif kind=='catalog':
  for j in range(3):content+=rect(20+j*14,29+j*6,39,42,'none',5,f'stroke="{c}" stroke-width="1.3" opacity="{.3+j*.25}"')
  content+=f'<circle cx="67" cy="61" r="9" fill="{c}"/><circle cx="67" cy="61" r="2" fill="{fill}"/>'
 else:
  content+=rect(19,27,43,52,'none',5,'stroke="#B9D6CE" stroke-width="1.2"')
  content+='<path d="M28 42h23 M28 51h15" stroke="#B9D6CE" stroke-width="2"/>'
  content+='<circle cx="62" cy="69" r="13" fill="#D6FF62"/><path d="m56 69 4 4 8-9" stroke="#132B26" stroke-width="2" fill="none"/>'
 for i,s in enumerate(lines):content+=t(s,17,125+i*31,26,c)
 content+=f'<path d="M18 185H170" stroke="{c}" stroke-opacity=".14"/>'
 if kind=='report':
  for j,w in enumerate([114,90,132]):content+=rect(18,198+j*9,w,2,c,1,'opacity=".15"')
 elif kind=='catalog':
  for j in range(8):content+=rect(18+j*19,199,12,21,c,2,f'opacity="{.08+(j%3)*.04}"')
 else:
  content+=f'<path d="M18 202h68 M18 214h106" stroke="{c}" stroke-opacity=".2" stroke-width="2"/>'
 return f'<g transform="translate({x} {y}) rotate({angle} 94 123)" filter="url(#shadow)">{content}</g>'
cards='<g transform="translate(1060 76) scale(.87)">'+artcard(0,22,-8,WHITE,['Royalty','reporting.'],'report')+artcard(330,16,9,GREEN,['Investment','review.'],'review',WHITE)+artcard(155,0,0,LIME,['Catalog','intelligence.'],'catalog')+'</g>'
copy=brand()+headline(['AI transformation','for music rightsholders'],390,165,53)+t('AI strategy. Custom systems. Team training.',392,285,23,'#D2F2FF',400)
# Each option changes the framing, not the approved copy or logo.
a=bg('azure')+cards+copy
planes='''<path d="M-100 325 315 0H510L18 396H-100Z" fill="#C2EDFF" opacity=".075"/><path d="M1000 396 1410 0H1584V396Z" fill="url(#lightplane)"/><path d="M965 396 1375 0" stroke="#C2EDFF" opacity=".22"/><path d="M1045 396 1455 0" stroke="#FFFFFF" opacity=".09"/>'''
b=bg('azure')+planes+cards+copy
# Enlarged record-like rings provide a music cue; the type remains on calm blue.
rings=''
for rr in [78,104,138,180,230,288]:rings+=f'<circle cx="30" cy="423" r="{rr}" fill="none" stroke="#A2E5FF" stroke-width="{12 if rr==180 else 1.2}" opacity="{.13 if rr==180 else .22}"/>'
rings+='<circle cx="30" cy="423" r="52" fill="#163D68" opacity=".35"/>'
c=bg('azure')+rings+rect(1010,0,574,396,'url(#microgrid)')+'<path d="M1010 43H1518" stroke="#C2EDFF" opacity=".25"/>'+cards+copy
# One large translucent sweep gives a different sense of depth across the canvas.
sweep='''<path d="M-50 410C180 180 700 550 1584 75V396H-50Z" fill="url(#lightplane)"/><path d="M-50 410C180 180 700 550 1584 75" fill="none" stroke="#C2EDFF" stroke-width="1.5" opacity=".26"/><path d="M1130 -100C960 30 1190 170 1710 65" stroke="#0B4E92" stroke-width="100" fill="none" opacity=".15"/>'''
d=bg('azure')+sweep+cards+copy
# Fine grain is confined to the background so logo and typography stay crisp.
# Use visible geometry rather than a global grain filter at this export size.
items=[('card-details','01 · Working cards','Small report, catalog, and review illustrations add detail to the cards.',a),('light-planes','02 · Light planes','Large translucent planes frame the composition with a sharper editorial edge.',b),('catalog-press','03 · Catalog press','Cropped record rings and a fine grid add a music and print reference.',c),('blue-sweep','04 · Blue sweep','A broad translucent sweep brings movement through the blue field.',d)]
manifest=[];renders=[]
for slug,title,description,body in items:
 s=wrap(body);(O/f'{slug}.svg').write_text(s);renders.append((s,O/f'{slug}.png'))
 manifest.append(dict(id='linkedin-art-'+slug,title=title,description=description,group='social',preview=f'assets/linkedin-art/{slug}.png',files=[dict(label='PNG',path=f'assets/linkedin-art/{slug}.png'),dict(label='Editable SVG',path=f'assets/linkedin-art/{slug}.svg')],collection='LinkedIn / art details',current=True,tool='linkedin-banners.html#art-'+slug))
kit.rasterize(renders)
(R/'linkedin-art-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(O/'README.txt').write_text('Recoup LinkedIn art variations. Four new directions plus the selected original. 1584 x 396. PNG and editable SVG. Card graphics are illustrative, with no numeric performance claims.\n')
with zipfile.ZipFile(O/'recoup-linkedin-art.zip','w',zipfile.ZIP_DEFLATED) as z:
 for slug,*_ in items:
  for ext in ['png','svg']:z.write(O/f'{slug}.{ext}',f'{slug}.{ext}')
 for ext in ['png','svg']:z.write(R/f'assets/linkedin-refined/azure-music-rightsholders.{ext}',f'original.{ext}')
 z.write(O/'README.txt','README.txt')
print('Four artwork variations exported.')
