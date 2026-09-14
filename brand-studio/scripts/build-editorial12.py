#!/usr/bin/env python3
"""Three visible, controlled treatments of the liked native Offset blocks cover."""
from pathlib import Path
import importlib.util
import json
import struct
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/editorial-12'
spec = importlib.util.spec_from_file_location('brand_vectors', ROOT/'scripts/build-assets.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)

# Verbatim source geometry from the liked round10 version.
BACK = 'M1628 382H2010V1146H1372V866C1372 794 1430 736 1502 736H1536C1587 736 1628 695 1628 644Z'
MID = 'M1324 652H1494V750C1494 823 1553 882 1626 882H1826V1140H1136V988H1200C1268 988 1324 932 1324 864Z'
FRONT = 'M1740 566H1968V1142H1572V1044C1572 969 1633 908 1708 908H1740Z'
LIME = 'M1548 760H1635V838H1600C1571 838 1548 815 1548 786Z'

def path(d, fill, extra=''):
    return f'<path d="{d}" fill="{fill}" {extra}/>'

def original_motif():
    defs = '''<defs>
      <linearGradient id="original-light" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#007EBD"/><stop offset=".62" stop-color="#218FD0"/><stop offset="1" stop-color="#6ECBDC"/>
      </linearGradient>
      <linearGradient id="original-inset" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#0A72C2"/><stop offset="1" stop-color="#0757AB"/>
      </linearGradient>
    </defs>'''
    return defs + path(BACK,'#094F9E') + path(MID,'url(#original-light)') + path(FRONT,'url(#original-inset)') + path(LIME,'#D6FF62')

def dimensional():
    defs = '''<defs>
      <linearGradient id="depth-back" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#218ABF"/><stop offset=".45" stop-color="#0758A2"/><stop offset="1" stop-color="#093F79"/>
      </linearGradient>
      <linearGradient id="depth-middle" x1="0" y1="0" x2=".65" y2="1">
        <stop stop-color="#B2ECF5"/><stop offset=".34" stop-color="#5CCBEB"/><stop offset="1" stop-color="#027EB7"/>
      </linearGradient>
      <linearGradient id="depth-front" x1="0" y1="0" x2=".4" y2="1">
        <stop stop-color="#57C5E4"/><stop offset=".32" stop-color="#148FC7"/><stop offset="1" stop-color="#06559E"/>
      </linearGradient>
      <linearGradient id="depth-rim" x1="0" y1="0" x2=".4" y2="1">
        <stop stop-color="#DCF7FF" stop-opacity=".78"/><stop offset=".6" stop-color="#DCF7FF" stop-opacity="0"/>
      </linearGradient>
      <filter id="depth-shadow" x="-35%" y="-30%" width="180%" height="180%" color-interpolation-filters="sRGB">
        <feDropShadow dx="-22" dy="28" stdDeviation="20" flood-color="#062D53" flood-opacity=".42"/>
      </filter>
    </defs>'''
    layers = path(BACK,'url(#depth-back)')
    layers += path(MID,'url(#depth-middle)','filter="url(#depth-shadow)"')
    layers += path(FRONT,'url(#depth-front)','filter="url(#depth-shadow)"')
    layers += '<path d="M1324 727V652H1482 M1740 641V566H1919" fill="none" stroke="#DCF7FF" stroke-opacity=".5" stroke-width="3"/>'
    layers += path(LIME,'#D6FF62')
    return defs + layers

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    variants = [
      ('Stronger contrast',
       path(BACK,'#132B26') + path(MID,'#C2EDFF') + path(FRONT,'#007EBD') + path(LIME,'#D6FF62'),
       'The same crop, with a pale cyan middle shape and a forest back shape.',
       ['Pale cyan and forest create clear separation.', 'The background, crop, and headline match the original.'],
       'Flat color. The difference comes from the light and dark values of the filled shapes.'),
      ('Dimensional surfaces', dimensional(),
       'The same crop, with broad light across the faces and shadows at their overlaps.',
       ['Lighter upper faces make the layers more distinct.', 'Shadows at the overlaps add visible depth.'],
       'Directional gradients belong to the shape faces. Restrained rims and overlap shadows separate the layers.'),
      ('Bolder crop', '<g transform="translate(-1152 -648) scale(1.6)">'+original_motif()+'</g>',
       'The original motif is enlarged and cropped more tightly into the right and lower edges.',
       ['The pattern is visibly larger and enters from the top edge.', 'The original colors, finish, and headline stay the same.'],
       'Use the original tonal blue gradients. Only the motif scale and crop change.'),
    ]
    headline = v.lines(['Choose your first','AI project.'],112,210,110,'#FFFFFF',125/110,450)
    manifest = []
    for n,(title,motif,description,changes,light) in enumerate(variants,1):
        stem = f'option-{n:02d}'
        body = v.rect(0,0,1920,1080,'#0565BB') + motif
        for suffix,content in [('',body+headline),('-art',body)]:
            source = v.svg(1920,1080,content,f'Recoup / {title} / comparison')
            ET.fromstring(source)
            (OUT/f'{stem}{suffix}.svg').write_text(source)
            v.render(source,OUT/f'{stem}{suffix}.png')
            data=(OUT/f'{stem}{suffix}.png').read_bytes()
            assert struct.unpack('>II',data[16:24]) == (1920,1080)
        manifest.append({
            'id':f'editorial12-{n:02d}','category':'editorial-12','family':'geometry',
            'title':title,'sampleTitle':'Choose your first AI project',
            'description':description,'changes':changes,
            'preview':f'assets/editorial-12/{stem}.png','artPreview':f'assets/editorial-12/{stem}-art.png',
            'originalPreview':'assets/editorial-10/option-01-feed.png','originalId':'editorial10-01',
            'patternRule':'Preserve the liked Offset blocks geometry. Change one main variable: contrast, depth, or crop.',
            'gradientRule':light,'paletteName':'Blue / cyan / lime'+(' / forest' if n==1 else ''),
            'typography':'DM Sans · 450 · 110px','width':1920,'height':1080,
            'status':'proposed','generator':'native SVG',
            'files':[{'label':f'{label} {ext.upper()}','path':f'assets/editorial-12/{stem}{suffix}.{ext}'}
                     for suffix,label in [('',title),('-art','Artwork without text')] for ext in ['png','svg']],
            'tags':[title,'Visible differences','Offset blocks'],
        })
    (ROOT/'editorial-12-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    with zipfile.ZipFile(OUT/'recoup-visible-differences.zip','w',zipfile.ZIP_DEFLATED) as bundle:
        for row in manifest:
            for file in row['files']: bundle.write(ROOT/file['path'],Path(file['path']).name)
        for ext in ['png','svg']:
            p=ROOT/f'assets/editorial-10/option-01-feed.{ext}'
            bundle.write(p,f'original.{ext}')
        bundle.write(ROOT/'editorial-12-manifest.json','editorial-12-manifest.json')
        for p in (ROOT/'assets/fonts').iterdir():
            if p.suffix in ['.woff2','.txt']: bundle.write(p,'fonts/'+p.name)
    print('Built three visible alternatives, each with cover and text-free SVG/PNG.')

if __name__ == '__main__': main()
