#!/usr/bin/env python3
"""Collect existing brand artwork without changing or deleting its source files."""
from pathlib import Path
import json,subprocess,collections
ROOT=Path(__file__).resolve().parents[1]
items=[];seen=set()
def add(id,title,group,preview,files,collection,current=False,**extra):
 if id in seen or not (ROOT/preview).is_file():return
 seen.add(id)
 files=[f for f in files if (ROOT/f['path']).is_file()]
 items.append(dict(id=id,title=title,group=group,preview=preview,files=files,collection=collection,current=current,**extra))
if (ROOT/'podcast-blue-sweep-manifest.json').exists():
    for a in json.loads((ROOT/'podcast-blue-sweep-manifest.json').read_text()):
        add(**a)
if (ROOT/'social-banner-manifest.json').exists():
    for a in json.loads((ROOT/'social-banner-manifest.json').read_text()):
        add(**a)
for a in json.loads((ROOT/'linkedin-refined-manifest.json').read_text()):
    add(**a)
for a in json.loads((ROOT/'linkedin-art-manifest.json').read_text()):
    add(**a)
for a in json.loads((ROOT/'linkedin-blue-manifest.json').read_text()):
    add(**a)
for a in json.loads((ROOT/'linkedin-website-manifest.json').read_text()):
 add(**a)
for a in json.loads((ROOT/'linkedin-options-manifest.json').read_text()):
 add(**a)
base='assets/podcast-kit-daylight/'
for f,title in [('title','Daylight folds · show identity'),('cover','Square show cover'),('solo','Solo video frame'),('duo','Two-person video frame'),('vertical','Vertical clip frame'),('thumbnail','Episode thumbnail'),('quote','Podcast quote card'),('announcement','Episode announcement'),('endcard','End card'),('badge','Blue podcast badge'),('badge-overlay','Corner badge overlay')]:
 files=[dict(label='PNG',path=base+f+'.png'),dict(label='Editable SVG',path=base+f+'.svg')]
 if f in ['solo','duo','vertical']:files += [dict(label='Name labels PNG',path=base+f+'-labels.png')]
 add('daylight-'+f,title,'podcast',base+f+('-preview' if f in ['solo','duo','vertical'] else '')+'.png',files,'Daylight kit',True,tool='podcast-kit-daylight.html?format='+f+'#preview',dark=f=='badge-overlay')
add('daylight-white-logo','White podcast logo · padded','logos',base+'recoup-podcast-white-padded.png',[dict(label='Transparent PNG',path=base+'recoup-podcast-white-padded.png'),dict(label='Editable SVG',path=base+'recoup-podcast-white-transparent.svg')],'Daylight kit',True,dark=True)
add('daylight-background','Daylight folds · clean background','backgrounds',base+'background.png',[dict(label='Landscape PNG',path=base+'background.png'),dict(label='Square PNG',path=base+'square-background.png'),dict(label='Portrait PNG',path=base+'portrait-background.png')],'Daylight kit',True)
for f,title in [('intro','Podcast opening'),('outro','Podcast closing'),('background-loop','Daylight background loop')]:
 add('daylight-'+f,title,'podcast',base+('background' if f=='background-loop' else 'title')+'.png',[dict(label='MP4',path=base+f+'.mp4')],'Daylight kit',True,video=base+f+'.mp4')
for f,title in [('choose-your-first-ai-project','Choose your first AI project'),('know-your-catalog-earnings','Know what your catalog is earning')]:
 add('daylight-blog-'+f,title,'blog','assets/daylight-blog/'+f+'.png',[dict(label='PNG',path='assets/daylight-blog/'+f+'.png'),dict(label='Editable SVG',path='assets/daylight-blog/'+f+'.svg')],'Daylight blog',True,tool='daylight-blog.html')
order=['editorial-15','editorial-14','editorial-10','asset','editorial-13','editorial-12','editorial-11','editorial-09','editorial-08','editorial-07','blog-thumbnails','layered-editorial','editorial-lab','style-lab','refinement','exploration','background','environment']
names={'editorial-15':'Large patterns','editorial-14':'Dynamic patterns','editorial-10':'Original pattern directions','editorial-13':'Editorial experiments','editorial-12':'Contrast studies','editorial-11':'Subtle refinements','editorial-09':'Edge gradients','editorial-08':'Illustration and pattern pairs','editorial-07':'Photography studies','blog-thumbnails':'Early illustrated thumbnails','layered-editorial':'Layered illustrations','editorial-lab':'First editorial directions','style-lab':'Illustration styles','refinement':'First refinements','exploration':'Color and texture','background':'Background studies','environment':'Website environments','asset':'Original studio'}
for name in order:
 data=json.loads((ROOT/(name+'-manifest.json')).read_text())
 if isinstance(data,dict):data=data.get('assets',[])
 for a in data:
  cat=a.get('category','');id=a.get('id');preview=a.get('preview')
  if not id or not preview:continue
  group='blog'
  if cat=='logos':group='logos'
  elif cat in ['podcast','motion']:group='podcast'
  elif cat=='social':group='social'
  elif name in ['background','environment','exploration','refinement']:group='backgrounds'
  elif name in ['style-lab','layered-editorial'] or id.startswith('editorial08-i') or a.get('family')=='article':group='illustrations'
  add(id,a['title'],group,preview,a.get('files',[]),names[name],name in ['editorial-10','editorial-14','editorial-15'] or cat=='logos',dark=cat=='logos' and ('white' in id or 'lime' in id),tool='explore.html?collection='+('style-lab' if name=='style-lab' else cat or name)+'#browse')
code="import {STUDIES} from './brand-studio/podcast-scenes-v4.mjs';console.log(JSON.stringify(STUDIES));"
for a in json.loads(subprocess.check_output(['node','--input-type=module','-e',code],cwd=ROOT.parent,text=True)):
 if a['id']=='daylight':continue
 f=a['id'];add('podcast-v4-'+f,a['name'],'podcast',f'assets/podcast-kit-v4/{f}.png',[dict(label='PNG',path=f'assets/podcast-kit-v4/{f}.png'),dict(label='Background',path=a['background'])],'Podcast background studies',False,tool='podcast-kit-v4.html?study='+f+'#preview')
for f,title in [('cut','Cut and shift'),('weave','Woven shapes'),('layer','Open overlap')]:
 add('podcast-v2-'+f,title,'podcast',f'assets/podcast-kit-v2/{f}-intro.png',[dict(label='PNG',path=f'assets/podcast-kit-v2/{f}-intro.png')],'Earlier podcast kit',False,tool='podcast-kit-v2.html?direction='+f)
add('blue-sweep-podcast-white-logo','White podcast logo · padded','logos','assets/podcast-kit-blue-sweep/recoup-podcast-white-transparent.png',[dict(label='Transparent PNG',path='assets/podcast-kit-blue-sweep/recoup-podcast-white-transparent.png'),dict(label='Editable SVG',path='assets/podcast-kit-blue-sweep/recoup-podcast-white-transparent.svg')],'Blue sweep / podcast kit',True,dark=True,tool='podcast-kit-blue-sweep.html')
final_ids=set(json.loads((ROOT/'studio-finals.json').read_text())['assetIds'])
assert final_ids <= seen, 'A selected final is missing from the asset index'
for a in items:a['stage']='final' if a['id'] in final_ids else 'experiment'
previous={}
p=ROOT/'review-board-assets.json'
if p.exists():previous={a['id']:a['code'] for a in json.loads(p.read_text())}
prefix={'podcast':'P','blog':'B','logos':'L','backgrounds':'BG','illustrations':'I','social':'S'};used=set(previous.values());counts=collections.Counter()
for a in items:
 if a['id'] in previous:a['code']=previous[a['id']];continue
 k=prefix[a['group']]
 while True:
  counts[k]+=1;v=f'{k}{counts[k]:02}'
  if v not in used:break
 used.add(v);a['code']=v
p.write_text(json.dumps(items,indent=2)+'\n')
print(len(items),'assets;',sum(a['current'] for a in items),'recent / foundation assets;',dict(collections.Counter(a['group'] for a in items)))

# The two library pages share the same shell and behavior.
shell=(ROOT/'index.html').read_text()
for page,label in [('finals','Finals'),('experiments','Experiments')]:
 (ROOT/(page+'.html')).write_text(shell.replace('Recoup Brand Studio — Finals', 'Recoup Brand Studio — '+label))
