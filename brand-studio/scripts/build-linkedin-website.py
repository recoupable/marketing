#!/usr/bin/env python3
"""Adapt the website's dimensional cards to three clean 4:1 brand banners."""
from pathlib import Path
import base64,importlib.util,json,html,zipfile,subprocess
R=Path(__file__).resolve().parents[1];O=R/'assets/linkedin-website';O.mkdir(exist_ok=True)
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
# Compress the atmosphere, not the website UI. Show the actual skills as readable objects.
a=f'<image href="{sky}" width="1584" height="396" preserveAspectRatio="none"/>'+rect(0,0,1584,396,'#0565BB',extra='opacity=".17"')+logo(70,47,WHITE,.22)+t('AI transformation',418,167,58,WHITE)+t('for the music business.',418,232,54,'#D5F1FF')+t('Strategy. Systems. Team training.',420,292,25,WHITE,400)+f'<g transform="translate(1102 68) scale(.9)">{skills(0,0)}</g>'
# Directly use the white/lime/forest balance of the user's playbook screenshot.
b=rect(0,0,1584,396,'#FAFBF4')+'<ellipse cx="1280" cy="270" rx="360" ry="200" fill="url(#glow)"/>'+logo(70,47,INK,.22)+t('AI strategy.',425,162,66)+t('Systems. Training.',425,233,66)+t('For music funds and rightsholders.',427,292,24,INK,400)+f'<g transform="translate(1100 67) scale(.9)">{skills(0,0)}</g>'
# Two working surfaces, at different depths, give a second take on the website hero.
back=card(1250,62,8,WHITE,['Catalog','review.'],label='CATALOG INTELLIGENCE',foot='MUSIC / IN CONTEXT',w=235,h=280,tx=90)
glassbody=rect(0,0,226,278,'url(#glass)',18,'stroke="#DDF9FF" stroke-width="2"')+t('Your data.',22,51,30)+t('Connected.',22,84,30)+'<path d="M240 98 C140 80 184 210 65 256 M225 132 C128 164 200 240 164 300" stroke="white" stroke-width="1.2" fill="none" opacity=".7"/>'+rect(20,126,177,43,WHITE,21)+t('Catalog',48,154,19)+rect(29,192,177,43,WHITE,21)+t('Statements',48,220,19)+mono('ONE PLACE TO WORK',22,259)
front=f'<g transform="translate(1085 91) rotate(-7 113 139)" filter="url(#shadow)">{glassbody}</g>'
c=rect(0,0,1584,396,GREEN)+'<ellipse cx="1270" cy="270" rx="365" ry="210" fill="url(#glow)"/>'+logo(70,47,WHITE,.22)+t('Make AI part of',425,145,56,WHITE)+t('how your music',425,207,56,WHITE)+t('company works.',425,269,56,LIME)+back+front
items=[('sky-cards','09 · Sky / music playbooks','The website’s blue sky and white, lime, and forest playbooks, composed for a wide banner.',a),('skills-cards','10 · Paper / skills in focus','The same layered playbook language as the website, with a concrete service headline.',b),('connected-cards','11 · Forest / connected work','Translucent data and catalog cards show the work behind the service.',c)]
manifest=[];renders=[]
for slug,title,description,body in items:
 s=wrap(body);(O/f'{slug}.svg').write_text(s);renders.append((s,O/f'{slug}.png'))
 manifest.append(dict(id='linkedin-'+slug,title=title,description=description,group='social',preview=f'assets/linkedin-website/{slug}.png',files=[dict(label='PNG',path=f'assets/linkedin-website/{slug}.png'),dict(label='Editable SVG',path=f'assets/linkedin-website/{slug}.svg')],collection='LinkedIn / website direction',current=True,tool='linkedin-banners.html#'+slug))
kit.rasterize(renders)
(R/'linkedin-website-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(O/'README.txt').write_text('Three website-inspired Recoup LinkedIn banners. 1584 x 396, clean PNG and editable SVG. Exact Recoup logo and bundled fonts. Website sky asset and dimensional playbook/data compositions adapted from the current website and supplied screenshots. Essential content stays outside the lower-left. No profile-photo mockup is included.\n')
with zipfile.ZipFile(O/'recoup-linkedin-website.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in O.iterdir():
  if p.suffix in ['.png','.svg','.txt'] and p.name != 'compare.png':z.write(p,p.name)
print('Three website-inspired banners exported.')
