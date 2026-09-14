#!/usr/bin/env python3
"""Add the exact one-line Recoup identity to the generated backgrounds."""
from pathlib import Path
import base64
import importlib.util
import json
import subprocess
import zipfile
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
OUTPUT=ROOT/'assets'/'podcast-kit-v4'
spec=importlib.util.spec_from_file_location('podcast_exports',ROOT/'scripts'/'render-podcast-kit-v2.py')
exports=importlib.util.module_from_spec(spec);spec.loader.exec_module(exports)

def main():
    OUTPUT.mkdir(parents=True,exist_ok=True)
    code="""import {STUDIES,renderPodcastArtworkSVG} from './brand-studio/podcast-scenes-v4.mjs';import fs from 'node:fs';
for(const s of STUDIES){const data='data:image/png;base64,'+fs.readFileSync('brand-studio/'+s.background).toString('base64');console.log(JSON.stringify({id:s.id,name:s.name,svg:renderPodcastArtworkSVG({study:s.id,backgroundHref:data})}));}"""
    result=subprocess.run(['node','--input-type=module','-e',code],cwd=ROOT.parent,text=True,capture_output=True,check=True)
    artworks=[json.loads(line) for line in result.stdout.splitlines()]
    renders=[]
    for art in artworks:
        editable=art['svg'].replace('<style></style>','<style>'+exports.FONT_CSS+'</style>')
        (OUTPUT/(art['id']+'.svg')).write_text(editable)
        renders.append((art['svg'],OUTPUT/(art['id']+'.png')))
    exports.rasterize(renders)
    row_count=(len(artworks)+1)//2
    sheet=Image.new('RGB',(1600,22+row_count*476),'#FFFFFF');draw=ImageDraw.Draw(sheet)
    for i,art in enumerate(artworks):
        x,y=24+i%2*788,24+i//2*476
        thumb=Image.open(OUTPUT/(art['id']+'.png')).convert('RGB');thumb.thumbnail((764,430))
        sheet.paste(thumb,(x,y));draw.text((x,y+440),f"{i+1:02d} / {art['name']}",fill='#152E37')
    sheet.save(OUTPUT/'all-options.png')
    (OUTPUT/'READ-ME.txt').write_text((ROOT/'podcast-kit-v4-guide.md').read_text())
    with zipfile.ZipFile(OUTPUT/'recoup-podcast-atmosphere.zip','w',zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(OUTPUT.iterdir()):
            if path.suffix in ['.png','.svg','.txt','.md']:archive.write(path,path.name)
        for path in (ROOT/'assets'/'fonts').iterdir():archive.write(path,'fonts/'+path.name)
    print(f'Rendered {len(artworks)} 1920x1080 title cards, {len(artworks)} self-contained SVGs, contact sheet and ZIP.')

if __name__=='__main__':main()
