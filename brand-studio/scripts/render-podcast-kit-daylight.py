#!/usr/bin/env python3
"""Package the approved Daylight artwork as portable podcast templates."""
from pathlib import Path
import base64, importlib.util, json, shutil, subprocess, zipfile, argparse
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/podcast-kit-daylight'
spec=importlib.util.spec_from_file_location('kit',ROOT/'scripts/render-podcast-kit-v2.py')
kit=importlib.util.module_from_spec(spec);spec.loader.exec_module(kit)
FORMATS=['badge','badge-overlay','title','cover','thumbnail','solo','duo','vertical','quote','announcement','endcard','background','square-background','portrait-background']

def stills():
    OUT.mkdir(parents=True,exist_ok=True)
    shutil.copy2(ROOT/'assets/podcast-kit-v4/daylight-background.png',OUT/'daylight-background.png')
    bg='data:image/png;base64,'+base64.b64encode((OUT/'daylight-background.png').read_bytes()).decode()
    settings=[dict(format=f) for f in FORMATS]
    settings += [dict(format=f,labelsOnly=True) for f in ['solo','duo','vertical']]
    settings += [dict(format=f,preview=True) for f in ['solo','duo','vertical']]
    settings += [dict(format='title',identityOnly=True)]
    for s in settings:s['backgroundHref']=bg
    code="import {renderDaylightSVG} from './brand-studio/podcast-scenes-daylight.mjs';import fs from 'node:fs';for(const s of JSON.parse(fs.readFileSync(0,'utf8')))console.log(JSON.stringify(renderDaylightSVG(s)));"
    result=subprocess.run(['node','--input-type=module','-e',code],cwd=ROOT.parent,input=json.dumps(settings),text=True,capture_output=True,check=True)
    renders=[]
    for s,line in zip(settings,result.stdout.splitlines()):
        source=json.loads(line)
        stem=s['format']+('-labels' if s.get('labelsOnly') else '-preview' if s.get('preview') else '-identity' if s.get('identityOnly') else '')
        (OUT/(stem+'.svg')).write_text(source.replace('<style></style>','<style>'+kit.FONT_CSS+'</style>'))
        renders.append((source,OUT/(stem+'.png')))
    kit.rasterize(renders)
    # Preserve the approved cover pixels exactly, rather than rerendering it.
    shutil.copy2(ROOT/'assets/podcast-kit-v4/daylight.png',OUT/'title.png')
    print('Stills and transparent camera overlays rendered.',flush=True)

def motion():
    ffmpeg=shutil.which('ffmpeg')
    for mode,seconds in [('intro',6),('outro',5),('background-loop',12)]:
        args=[ffmpeg,'-hide_banner','-loglevel','error','-y','-loop','1','-framerate','24','-i',str(OUT/'background.png')]
        # Periodic movement returns to the starting position after 12 seconds.
        base="[0:v]scale=2020:1136,crop=1920:1080:x='50+22*sin(2*PI*t/12)':y='28+12*sin(2*PI*t/12)',setsar=1[bg]"
        if mode!='background-loop':
            args+=['-loop','1','-framerate','24','-i',str(OUT/'title-identity.png')]
            fade="fade=t=in:st=0.35:d=1:alpha=1" if mode=='intro' else "fade=t=in:st=0:d=0.55:alpha=1,fade=t=out:st=3.8:d=1.2:alpha=1"
            graph=base+f';[1:v]format=rgba,{fade}[logo];[bg][logo]overlay=0:0:shortest=1[out]'
        else:graph=base+';[bg]null[out]'
        args+=['-filter_complex',graph,'-map','[out]','-t',str(seconds),'-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/(mode+'.mp4'))]
        subprocess.run(args,check=True)
        print(f'{mode}: {seconds}s, silent, 24fps.',flush=True)

def package():
    shutil.copy2(ROOT/'podcast-kit-daylight-guide.md',OUT/'READ-ME.md')
    with zipfile.ZipFile(OUT/'recoup-podcast-daylight-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(OUT.iterdir()):
            if p.suffix in ['.png','.svg','.mp4','.md']:z.write(p,p.name)
        for p in (ROOT/'assets/fonts').iterdir():z.write(p,'fonts/'+p.name)
    print('Download package ready.',flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stills',action='store_true');p.add_argument('--motion',action='store_true');p.add_argument('--package',action='store_true');a=p.parse_args()
    if a.stills:stills()
    if a.motion:motion()
    if a.package:package()
