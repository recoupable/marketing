#!/usr/bin/env python3
"""Small surface and geometry refinements to the liked Recoup cover studies."""
from pathlib import Path
import importlib.util
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'editorial-11'
spec = importlib.util.spec_from_file_location('recoup_vectors', ROOT / 'scripts' / 'build-assets.py')
brand = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brand)

W, H = 1920, 1080
rows = []


def export(number, title, body, copy, position, color, sample_title, description,
           changes, pattern_rule, gradient_rule, palette_name):
    stem = f'option-{number:02d}'
    x, y = position
    for value in copy:
        assert x + brand.measure(value, 110, 450) <= W - 128, value
    headline = ''.join(brand.text(value, x, y + i * 125, 110, color, 450)
                       for i, value in enumerate(copy))
    for suffix, layers in [('', body + headline), ('-art', body)]:
        source = brand.svg(W, H, layers, f'Recoup editorial refinement / {title}')
        ET.fromstring(source)
        (DEST / f'{stem}{suffix}.svg').write_text(source)
        brand.render(source, DEST / f'{stem}{suffix}.png')
    rows.append({
        'id': f'editorial11-{number:02d}', 'category': 'editorial-11', 'family': 'geometry',
        'title': title, 'sampleTitle': sample_title, 'headline': '\n'.join(copy),
        'description': description, 'changes': changes,
        'patternRule': pattern_rule, 'gradientRule': gradient_rule, 'paletteName': palette_name,
        'preview': f'assets/editorial-11/{stem}.png',
        'artPreview': f'assets/editorial-11/{stem}-art.png',
        'originalPreview': f'assets/editorial-10/{stem}-feed.png',
        'originalId': f'editorial10-{number:02d}',
        'files': [
            {'label': 'Thumbnail PNG', 'path': f'assets/editorial-11/{stem}.png'},
            {'label': 'Editable SVG', 'path': f'assets/editorial-11/{stem}.svg'},
            {'label': 'Artwork PNG', 'path': f'assets/editorial-11/{stem}-art.png'},
            {'label': 'Artwork SVG', 'path': f'assets/editorial-11/{stem}-art.svg'},
        ],
        'width': W, 'height': H, 'typography': 'Actual DM Sans 450',
        'status': 'proposed', 'generator': 'native SVG',
    })


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    lit_block = ('M1324 652H1494V754C1494 824.692 1551.308 882 1622 882H1826V1140'
                 'H1136V992H1196C1266.692 992 1324 934.692 1324 864Z')
    blue_defs = f'''<defs>
      <linearGradient id="e11-block-light" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#007EBD"/><stop offset=".62" stop-color="#218FD0"/>
        <stop offset="1" stop-color="#6ECBDC"/>
      </linearGradient>
      <linearGradient id="e11-block-inset" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#0A72C2"/><stop offset="1" stop-color="#0757AB"/>
      </linearGradient>
      <clipPath id="e11-lit-block"><path d="{lit_block}"/></clipPath>
      <filter id="e11-block-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="11"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </defs>'''
    blue = brand.rect(0, 0, W, H, '#0565BB') + blue_defs
    blue += '''<path d="M1628 382H2010V1146H1372V864C1372 793.308 1429.308 736 1500 736H1532C1585.019 736 1628 693.019 1628 640Z" fill="#094F9E"/>'''
    blue += f'<path d="{lit_block}" fill="url(#e11-block-light)"/>'
    blue += '''<g clip-path="url(#e11-lit-block)" opacity=".022"><rect x="1100" y="620" width="760" height="540" filter="url(#e11-block-grain)"/></g>
      <path d="M1740 566H1968V1142H1572V1036C1572 965.308 1629.308 908 1700 908H1740Z" fill="url(#e11-block-inset)"/>
      <path d="M1548 760H1635V838H1596C1569.490 838 1548 816.510 1548 790Z" fill="#D6FF62"/>'''
    export(1, 'Offset blocks', blue, ['Choose your first', 'AI project.'], (112, 210), '#FFFFFF',
        'Choose your first AI project',
        'The same offset blue composition, with consistent curved joins and a very fine texture confined to the lit block.',
        ['Matched the curved joins.', 'Added fine grain inside the lit cyan block.', 'Kept the blue field, lime inset, and headline crisp.'],
        'Build the offset fragments from generous circular joins, using a 128-pixel large radius and smaller related radii. Preserve the quiet field and asymmetric crop.',
        'The blue background remains flat. Directional cyan light and low-opacity fine grain belong only to one filled block; the front face uses a tonal-blue transition.',
        'Blue / cyan / lime')

    notch = 'M-120 98H316V316C316 434 395 512 513 512H588V749H388C272 749 196 826 196 942V1190H-120Z'
    forest_defs = '''<defs>
      <linearGradient id="e11-cutout-blue" gradientUnits="userSpaceOnUse" x1="-90" y1="0" x2="650" y2="0">
        <stop stop-color="#096EB2"/>
        <stop offset=".25" stop-color="#188AC3"/>
        <stop offset=".47" stop-color="#269ACD"/>
        <stop offset=".73" stop-color="#1188C0"/>
        <stop offset="1" stop-color="#007EBD"/>
      </linearGradient>
    </defs>'''
    forest = brand.rect(0, 0, W, H, '#132B26') + forest_defs
    forest += f'<path d="{notch}" fill="url(#e11-cutout-blue)"/>'
    export(2, 'Cutout join', forest, ['Connect your', 'company’s knowledge.'], (690, 450), '#D6FF62',
        'Connect your company’s knowledge',
        'The same blue cutout and forest field, with a broad light transition replacing the visible diagonal stripe.',
        ['Removed the hard diagonal highlight layer.', 'Spread the light smoothly across the blue cutout.', 'Preserved the open forest field and lime headline.'],
        'Use one oversized asymmetric cutout with a broad step and a generous notch. Let the negative space carry the headline and retain the original crop.',
        'A broad horizontal blue-to-cyan transition stays inside the left cutout. The forest field remains completely flat; no grain or corner glow.',
        'Forest / blue / lime')
    (ROOT / 'round-11-a.json').write_text(json.dumps(rows, indent=2) + '\n')
    print('Built two refined covers and two text-free artworks as SVG and PNG.')


if __name__ == '__main__':
    main()
