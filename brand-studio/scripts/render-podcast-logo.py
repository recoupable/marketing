#!/usr/bin/env python3
"""Export the white podcast identity with optical alignment and transparent padding."""
from pathlib import Path
import importlib.util,subprocess,re,tempfile
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/podcast-kit-daylight'
spec=importlib.util.spec_from_file_location('kit',ROOT/'scripts/render-podcast-kit-v2.py')
kit=importlib.util.module_from_spec(spec);spec.loader.exec_module(kit)
code="import {podcastLockup} from './brand-studio/podcast-scenes-v4.mjs';console.log(podcastLockup('#FFFFFF').replace(' 490) scale(', ' 482) scale('));"
logo=subprocess.check_output(['node','--input-type=module','-e',code],cwd=ROOT.parent,text=True).strip()
def svg(width,height,view):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="{view}"><defs><style>{kit.FONT_CSS}</style></defs>{logo}</svg>'
with tempfile.TemporaryDirectory() as tmp:
 p=Path(tmp)/'bounds.png'
 kit.rasterize([(svg(1920,1080,'0 0 1920 1080'),p)])
 x,y,r,b=Image.open(p).getbbox()
# Generous clear space, relative to the native 100-unit icon height.
x-=72;r+=72;y-=40;b+=40
source=svg((r-x)*3,(b-y)*3,f'{x} {y} {r-x} {b-y}')
(OUT/'recoup-podcast-white-transparent.svg').write_text(source)
kit.rasterize([(source,OUT/'recoup-podcast-white-transparent.png'),(source,OUT/'recoup-podcast-white-padded.png')])
im=Image.open(OUT/'recoup-podcast-white-transparent.png').convert('RGBA')
print('Size:',im.size,'Visible bounds:',im.getbbox(),'Corner transparency:',im.getpixel((0,0))[3])
