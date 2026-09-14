#!/usr/bin/env python3
"""Adapt the website's dimensional cards to three clean 4:1 brand banners."""
from pathlib import Path
import base64,importlib.util,json,html,zipfile,subprocess
R=Path(__file__).resolve().parents[1];O=R/'assets/linkedin-refined';O.mkdir(exist_ok=True)
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

defs=defs.replace('dy="14" stdDeviation="11"','dy="7" stdDeviation="5"')
def workcard(x,y,angle,fill,lines,c=INK):
 content=rect(0,0,188,246,fill,14,'stroke="#FFFFFF" stroke-opacity=".45" stroke-width="1.5"')
 for i,s in enumerate(lines):content+=t(s,17,113+i*31,26,c)
 return f'<g transform="translate({x} {y}) rotate({angle} 94 123)" filter="url(#shadow)">{content}</g>'
cards='<g transform="translate(1060 76) scale(.87)">'+workcard(0,22,-8,WHITE,['Royalty','reporting.'])+workcard(330,16,9,GREEN,['Investment','review.'],WHITE)+workcard(155,0,0,LIME,['Catalog','intelligence.'])+'</g>'
base=bg('azure')+brand()+cards
broad=base+headline(['AI transformation','for the music business.'],390,165,53)+t('AI strategy. Custom systems. Team training.',392,285,23,'#D2F2FF',400)
focused=base+headline(['AI transformation','for music rightsholders'],390,165,53)+t('AI strategy. Custom systems. Team training.',392,285,23,'#D2F2FF',400)
items=[('azure-music-rightsholders','Azure / music rightsholders','AI transformation for music rightsholders.',focused),('azure-music-business','17 · Azure refined / music business','The earlier broader headline, kept for comparison.',broad)]
manifest=[];renders=[]
for slug,title,description,body in items:
 s=wrap(body);(O/f'{slug}.svg').write_text(s);renders.append((s,O/f'{slug}.png'))
 manifest.append(dict(id='linkedin-'+slug,title=title,description=description,group='social',preview=f'assets/linkedin-refined/{slug}.png',files=[dict(label='PNG',path=f'assets/linkedin-refined/{slug}.png'),dict(label='Editable SVG',path=f'assets/linkedin-refined/{slug}.svg')],collection='LinkedIn / Azure refinement',current=True,tool='linkedin-banners.html#'+slug))
kit.rasterize(renders)
(R/'linkedin-refined-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(O/'README.txt').write_text('Recoup Azure refinement. Two audience headlines, same artwork. 1584 x 396 PNG and editable SVG. Lower-left kept clear for profile-photo overlap; no profile photo included.\n')
with zipfile.ZipFile(O/'recoup-linkedin-refined.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in O.iterdir():
  if p.suffix in ['.png','.svg','.txt'] and p.name!='compare.png':z.write(p,p.name)
print('Two refined banners exported.')
