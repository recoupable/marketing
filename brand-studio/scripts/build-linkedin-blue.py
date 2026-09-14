#!/usr/bin/env python3
"""Adapt the website's dimensional cards to three clean 4:1 brand banners."""
from pathlib import Path
import base64,importlib.util,json,html,zipfile,subprocess
R=Path(__file__).resolve().parents[1];O=R/'assets/linkedin-blue';O.mkdir(exist_ok=True)
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
def fan(x,y,scale=1,colors=(WHITE,LIME,GREEN)):
 body=card(0,22,-8,colors[0],['Research','the artist.'],foot='01 / DISCOVER')+card(314,16,9,colors[2],['Work the','catalog.'],foot='03 / GROW',c=WHITE)+card(151,0,0,colors[1],['Plan the','release.'],foot='02 / LAUNCH')
 return f'<g transform="translate({x} {y}) scale({scale})">{body}</g>'
a=bg('azure')+brand()+headline(['AI transformation','for the music business.'],390,165,53)+t('Strategy. Systems. Team training.',392,285,23,'#D2F2FF',400)+fan(1085,67,.91)
b=bg('ice')+brand(INK)+headline(['AI strategy.','Systems. Training.'],420,163,61,INK)+t('For music funds and rightsholders.',422,293,23,INK,400)+fan(1115,66,.87,(WHITE,'#A4DCF4','#075BA7'))
c=bg('deep')+brand()+headline(['Connect your data.','Put AI to work.'],410,170,59)+t('Built for music funds and rightsholders.',412,299,24,'#C2EDFF',400)
c+=card(1080,87,-7,'#C2EDFF',['Your data.','Connected.'],label='RECOUP / SYSTEMS',foot='CATALOG / STATEMENTS',w=208,h=266)
c+=card(1300,58,6,WHITE,['Your team.','In control.'],label='RECOUP / TRAINING',foot='REVIEW / IMPROVE',w=208,h=266)
# A row of wider service cards changes the cadence of the shallow canvas.
def service(x,y,angle,fill,kicker,title,c):
 return f'<g transform="translate({x} {y}) rotate({angle} 110 74)" filter="url(#shadow)">'+rect(0,0,220,148,fill,14)+mono(kicker,20,28,c)+t(title,20,92,32,c)+'</g>'
d=bg('cobalt')+brand()+headline(['AI for the','music business.'],410,170,61)+t('From the first project to everyday work.',412,300,23,'#C2EDFF',400)
d+=service(960,157,-8,'#D8F2FF','01 / FIND THE OPPORTUNITY','Strategy.',INK)+service(1140,66,2,WHITE,'02 / BUILD THE SYSTEM','Systems.',INK)+service(1320,172,8,'#143D62','03 / HELP THE TEAM','Training.',WHITE)
# Use the approved Daylight artwork as a full-width atmosphere with an uncluttered lockup.
light='data:image/png;base64,'+base64.b64encode((R/'assets/podcast-kit-v4/daylight-background.png').read_bytes()).decode()
e=f'<image href="{light}" width="1584" height="396" preserveAspectRatio="xMidYMid slice"/>'+rect(0,0,1584,396,'#0051A5',extra='opacity=".12"')+brand()+headline(['AI transformation services'],435,173,57)+t('for music funds and rightsholders.',437,239,46,'#D6F2FF')+t('Strategy. Systems. Team training.',439,294,23,WHITE,400)
items=[('azure-playbooks','12 · Azure / playbooks','Bright blue with a compact playbook fan and a smaller wordmark.',a),('ice-playbooks','13 · Ice / blue on blue','Pale blue, dark type, and a tonal blue card family.',b),('deep-blue-work','14 · Deep blue / connected work','A deeper blue with two readable working cards.',c),('cobalt-services','15 · Cobalt / service cards','Three wide service cards step across the right side.',d),('daylight-open','16 · Daylight / open space','The approved Daylight atmosphere with a simple typographic composition.',e)]
manifest=[];renders=[]
for slug,title,description,body in items:
 s=wrap(body);(O/f'{slug}.svg').write_text(s);renders.append((s,O/f'{slug}.png'))
 manifest.append(dict(id='linkedin-'+slug,title=title,description=description,group='social',preview=f'assets/linkedin-blue/{slug}.png',files=[dict(label='PNG',path=f'assets/linkedin-blue/{slug}.png'),dict(label='Editable SVG',path=f'assets/linkedin-blue/{slug}.svg')],collection='LinkedIn / blue variations',current=True,tool='linkedin-banners.html#'+slug))
kit.rasterize(renders)
(R/'linkedin-blue-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(O/'README.txt').write_text('Five Recoup LinkedIn banners. 1584 x 396. PNG and editable SVG. Smaller wordmark and lower-left space reserved for the profile photo.\n')
with zipfile.ZipFile(O/'recoup-linkedin-blue.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in O.iterdir():
  if p.suffix in ['.png','.svg','.txt'] and p.name!='compare.png':z.write(p,p.name)
print('Five blue variations exported.')
