#!/usr/bin/env python3
"""Refine existing panel and imprint vectors; preserve the round10 originals."""
from pathlib import Path
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets/editorial-11'
spec = importlib.util.spec_from_file_location('brand_vectors', ROOT / 'scripts/build-assets.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
rows = []

def export(number, title, body, headline, position, description, changes, rule, light, palette):
    stem = f'option-{number:02d}'
    x, y, color = position
    for text in headline:
        assert x + v.measure(text, 110, 450) <= 1792, text
    copy = v.lines(headline, x, y, 110, color, 125/110, 450)
    for suffix, content in [('', body + copy), ('-art', body)]:
        source = v.svg(1920, 1080, content, f'Recoup / {title} / refinement')
        (DEST / f'{stem}{suffix}.svg').write_text(source)
        v.render(source, DEST / f'{stem}{suffix}.png')
    rows.append({
        'id': f'editorial11-{number:02d}', 'category': 'editorial-11', 'family': 'geometry',
        'title': title, 'sampleTitle': ' '.join(headline).rstrip('.'),
        'description': description, 'changes': changes,
        'patternRule': rule, 'gradientRule': light, 'paletteName': palette,
        'preview': f'assets/editorial-11/{stem}.png', 'artPreview': f'assets/editorial-11/{stem}-art.png',
        'originalPreview': f'assets/editorial-10/{stem}-feed.png', 'originalId': f'editorial10-{number:02d}',
        'files': [{'label': f'{name} {ext.upper()}', 'path': f'assets/editorial-11/{stem}{suffix}.{ext}'}
                  for suffix, name in [('', 'Refined cover'), ('-art', 'Artwork without text')]
                  for ext in ['png', 'svg']],
        'width': 1920, 'height': 1080, 'typography': 'DM Sans · 450 · 110px',
        'status': 'proposed', 'generator': 'native SVG',
    })

def main():
    DEST.mkdir(parents=True, exist_ok=True)
    panels = v.rect(0, 0, 1920, 1080, '#F0F7FA') + '''<defs>
      <linearGradient id="panels-rear" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#DBEFF3"/><stop offset="1" stop-color="#CAE6EE"/>
      </linearGradient>
      <linearGradient id="panels-mid" x1="0" y1="0" x2="1" y2=".8">
        <stop stop-color="#BFE3EF"/><stop offset="1" stop-color="#78C3DC"/>
      </linearGradient>
      <linearGradient id="panels-front" x1="0" y1="0" x2=".5" y2="1">
        <stop stop-color="#1795C7"/><stop offset=".6" stop-color="#0B80BB"/><stop offset="1" stop-color="#0565BB"/>
      </linearGradient>
      <linearGradient id="panel-rim" x1="0" y1="0" x2=".8" y2="1">
        <stop stop-color="#FFFFFF" stop-opacity=".45"/><stop offset=".65" stop-color="#FFFFFF" stop-opacity="0"/>
      </linearGradient>
    </defs>'''
    for x, y, w, h, fill in [(1290,376,880,820,'panels-rear'),(1150,538,840,700,'panels-mid'),(1008,708,850,530,'panels-front')]:
        panels += v.rect(x,y,w,h,f'url(#{fill})',90, 'stroke="url(#panel-rim)" stroke-width="2"')
    export(3, 'Layered panels', panels, ['Build systems', 'your team can trust.'], (112,210,'#152E37'),
           'The same overlapping panels, with a quieter surface and cleaner separation between the layers.',
           ['Removed the lime dash.', 'Matched the corner radii.', 'Cleaner blue layers with a faint edge highlight.'],
           'Three empty rounded surfaces with the same 90px corner radius and stepped overlaps. Keep the structure abstract, with no interface controls.',
           'A pale flat field surrounds translucent-looking blue layers. Each layer carries its own restrained directional light.',
           'Pale blue / blue')

    imprint = v.rect(0,0,1920,1080,'#0565BB') + '''<defs>
      <linearGradient id="imprint-light" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#0F73BC"/><stop offset=".48" stop-color="#168AC3"/>
        <stop offset=".85" stop-color="#81D6D8"/><stop offset="1" stop-color="#C2EDFF"/>
      </linearGradient>
      <filter id="imprint-blur" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="36"/>
      </filter>
      <filter id="imprint-edge" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="9 20"/>
      </filter>
      <linearGradient id="edge-fade" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="white"/><stop offset=".28" stop-color="white"/>
        <stop offset=".70" stop-color="black"/>
      </linearGradient>
      <mask id="imprint-edge-mask" x="-300" y="-200" width="1500" height="1400" maskUnits="userSpaceOnUse">
        <rect x="-300" y="-200" width="1500" height="1400" fill="url(#edge-fade)"/>
      </mask>
    </defs>'''
    shape = v.mark(-168,-72,1010,'url(#imprint-light)')
    imprint += '<g filter="url(#imprint-blur)" opacity=".54">'+shape+'</g>'
    imprint += '<g mask="url(#imprint-edge-mask)"><g filter="url(#imprint-edge)" opacity=".23">'+shape+'</g></g>'
    export(6, 'Soft imprint', imprint, ['Give your team', 'a clear starting point.'], (720,770,'#FFFFFF'),
           'The same soft symbol impression, with more controlled diffusion and extra room around the headline.',
           ['A clearer upper edge fades into softer light.', 'Moved the headline left and slightly upward.', 'Kept the blue field and typography unchanged.'],
           'Use the exact mark as one enlarged, softly cropped impression. Keep a minimum 128px text inset and adjust the title block before reducing its size.',
           'The upper edge has more definition while the lower impression diffuses into blue. The title area remains flat.',
           'Blue / diffused cyan')
    (ROOT/'round-11-c.json').write_text(json.dumps(rows,indent=2)+'\n')
    print('Built refined panels and imprint: four PNGs and four SVGs.')

if __name__ == '__main__':
    main()
