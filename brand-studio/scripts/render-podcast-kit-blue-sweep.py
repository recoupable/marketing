#!/usr/bin/env python3
"""Render the Blue sweep podcast templates, motion, and downloadable kit."""
from pathlib import Path
import importlib.util,json,shutil,subprocess,zipfile,argparse
from PIL import Image
R=Path(__file__).resolve().parents[1];O=R/'assets/podcast-kit-blue-sweep';O.mkdir(exist_ok=True)
spec=importlib.util.spec_from_file_location('kit',R/'scripts/render-podcast-kit-v2.py');kit=importlib.util.module_from_spec(spec);spec.loader.exec_module(kit)
FORMATS=['badge','badge-overlay','title','cover','thumbnail','solo','duo','vertical','quote','announcement','endcard','background','square-background','portrait-background']

def stills():
 settings=[dict(format=f) for f in FORMATS]+[dict(format=f,labelsOnly=True) for f in ['solo','duo','vertical']]+[dict(format=f,preview=True) for f in ['solo','duo','vertical']]+[dict(format='title',identityOnly=True)]
 code="import {renderBlueSweepSVG} from './brand-studio/podcast-scenes-blue-sweep.mjs';import fs from 'node:fs';for(const s of JSON.parse(fs.readFileSync(0,'utf8')))console.log(JSON.stringify(renderBlueSweepSVG(s)));"
 result=subprocess.run(['node','--input-type=module','-e',code],cwd=R.parent,input=json.dumps(settings),text=True,capture_output=True,check=True)
 renders=[]
 for s,line in zip(settings,result.stdout.splitlines()):
  source=json.loads(line).replace('<style></style>','<style>'+kit.FONT_CSS+'</style>')
  stem=s['format']+('-labels' if s.get('labelsOnly') else '-preview' if s.get('preview') else '-identity' if s.get('identityOnly') else '')
  (O/(stem+'.svg')).write_text(source);renders.append((source,O/(stem+'.png')))
 # Carry forward the padded transparent logo and optical icon lift exactly.
 for name,color in [('white','#FFFFFF'),('ink','#152E37')]:
  source=(R/'assets/podcast-kit-daylight/recoup-podcast-white-transparent.svg').read_text().replace('#FFFFFF',color)
  stem='recoup-podcast-'+name+'-transparent';(O/(stem+'.svg')).write_text(source);renders.append((source,O/(stem+'.png')))
 kit.rasterize(renders)
 # Validate actual alpha openings, standalone logo padding, and opaque backgrounds.
 for fmt,points in {'solo':[(100,250),(960,540)],'duo':[(200,300),(1200,300)],'vertical':[(540,600),(540,1500)]}.items():
  im=Image.open(O/(fmt+'.png')).convert('RGBA')
  assert all(im.getpixel(p)[3]==0 for p in points),fmt
  assert im.getpixel((10,10))[3]==255,fmt
  assert Image.open(O/(fmt+'-labels.png')).convert('RGBA').getpixel((0,0))[3]==0
 for name in ['white','ink']:
  im=Image.open(O/f'recoup-podcast-{name}-transparent.png').convert('RGBA');x,y,right,bottom=im.getbbox()
  assert min(x,y,im.width-right,im.height-bottom)>0
 assert Image.open(O/'cover.png').size==(3000,3000)
 print('23 PNG/SVG pairs rendered; camera alpha, logo padding, and cover dimensions checked.',flush=True)

def motion():
 spec=importlib.util.spec_from_file_location('daylight',R/'scripts/render-podcast-kit-daylight.py');daylight=importlib.util.module_from_spec(spec);spec.loader.exec_module(daylight)
 daylight.OUT=O;daylight.motion()
 intro()

def intro():
 subprocess.run(['python3',str(R/'scripts/prepare-podcast-intro.py')],check=True)
 for args in [[],['--alpha']]:
  subprocess.run(['node',str(R/'scripts/render-podcast-intro.mjs'),*args],check=True)
 shutil.copy2(O/'intro-connection.mp4',O/'intro.mp4')
 shutil.copy2(R/'podcast-intro-motion.mjs',O/'motion-source/podcast-intro-motion.mjs')

def package():
 guide=(R/'podcast-kit-blue-sweep-guide.md').read_text();(O/'READ-ME.md').write_text(guide)
 with zipfile.ZipFile(O/'recoup-podcast-blue-sweep-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
  for p in sorted(O.iterdir()):
   if p.suffix in ['.png','.svg','.mp4','.mov','.md']:z.write(p,p.name)
  for ext in ['png','svg']:
   logo=O/f'recoup-podcast-white-transparent.{ext}'
   z.write(logo,'Logos/'+logo.name)
  for p in (O/'motion-source').glob('*'):
   if p.suffix in ['.mjs','.json','.md']:z.write(p,'motion-source/'+p.name)
  z.write(R/'podcast-intro-direction.md','OPENING-DIRECTION.md')
  for p in (R/'assets/fonts').iterdir():z.write(p,'fonts/'+p.name)
  for name in ['podcast-scenes-blue-sweep.mjs','podcast-scenes-v4.mjs']:
   z.write(R/name,'source/'+name)
 entries=[]
 labels={'title':'Show title','cover':'Square show cover','thumbnail':'Episode thumbnail','solo':'Solo video frame','duo':'Two-person video frame','vertical':'Vertical clip frame','quote':'Quote card','announcement':'Episode announcement','endcard':'End card','background':'Landscape background','square-background':'Square background','portrait-background':'Portrait background','badge':'Podcast badge','badge-overlay':'Corner badge overlay'}
 for f in FORMATS:
  files=[dict(label='PNG',path=f'assets/podcast-kit-blue-sweep/{f}.png'),dict(label='Editable SVG',path=f'assets/podcast-kit-blue-sweep/{f}.svg')]
  camera=f in ['solo','duo','vertical']
  if camera:files.append(dict(label='Name labels PNG',path=f'assets/podcast-kit-blue-sweep/{f}-labels.png'))
  entries.append(dict(id='blue-sweep-podcast-'+f,title=labels[f],description='Blue sweep podcast kit. '+('Transparent camera openings; separate name labels.' if camera else 'Episode text is editable in the kit.'),group='podcast',preview=f'assets/podcast-kit-blue-sweep/{f}'+('-preview' if camera else '')+'.png',files=files,collection='Blue sweep / podcast kit',current=True,tool='podcast-kit-blue-sweep.html?format='+f+'#preview'))
 for f in ['intro','outro','background-loop']:
  entries.append(dict(id='blue-sweep-podcast-'+f,title='Opening · Connection pass' if f=='intro' else f.replace('-',' ').capitalize(),description='Silent 1080p motion. '+('5.5-second symbol reveal, docking, and wordmark reveal.' if f=='intro' else ''),group='podcast',preview=f'assets/podcast-kit-blue-sweep/{"background" if f=="background-loop" else "title"}.png',files=[dict(label='MP4',path=f'assets/podcast-kit-blue-sweep/{f}.mp4')],video='assets/podcast-kit-blue-sweep/intro-connection.mp4' if f=='intro' else f'assets/podcast-kit-blue-sweep/{f}.mp4',collection='Blue sweep / podcast kit',current=True,tool='podcast-kit-blue-sweep.html#motion'))
 (R/'podcast-blue-sweep-manifest.json').write_text(json.dumps(entries,indent=2)+'\n')
 with zipfile.ZipFile(O/'recoup-podcast-blue-sweep-kit.zip') as z:assert z.testzip() is None
 print('Kit packaged and Studio manifest ready.',flush=True)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stills',action='store_true');p.add_argument('--motion',action='store_true');p.add_argument('--intro',action='store_true');p.add_argument('--package',action='store_true');a=p.parse_args()
 if a.stills:stills()
 if a.motion:motion()
 elif a.intro:intro()
 if a.package:package()
