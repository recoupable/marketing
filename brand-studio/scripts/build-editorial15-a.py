#!/usr/bin/env python3
"""Full-surface graphic patterns with unchanged round10 headline elements."""
from pathlib import Path
import importlib.util
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'editorial-15'
spec = importlib.util.spec_from_file_location('recoup_vectors', ROOT / 'scripts' / 'build-assets.py')
brand = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brand)
W, H = 1920, 1080
rows = []


def export(number, source_number, title, body, description, rule, light, coverage, palette):
    stem = f'option-{number:02d}'
    original = (ROOT / f'assets/editorial-10/option-{source_number:02d}.svg').read_text()
    headline = ''.join(re.findall(r'<text\b[\s\S]*?</text>', original))
    assert headline
    for suffix, layers in [('', body + headline), ('-art', body)]:
        source = brand.svg(W, H, layers, f'Recoup full-surface pattern proposal / {title}')
        ET.fromstring(source)
        if not suffix:
            assert ''.join(re.findall(r'<text\b[\s\S]*?</text>', source)) == headline
        (DEST / f'{stem}{suffix}.svg').write_text(source)
        brand.render(source, DEST / f'{stem}{suffix}.png')
    rows.append({
        'id': f'editorial15-{number:02d}', 'category': 'editorial-15', 'family': 'geometry',
        'title': title, 'sampleTitle': 'Choose your first AI project',
        'headline': 'Choose your first\nAI project.',
        'description': description, 'patternRule': rule, 'gradientRule': light,
        'coverageRule': coverage, 'paletteName': palette,
        'preview': f'assets/editorial-15/{stem}.png',
        'artPreview': f'assets/editorial-15/{stem}-art.png',
        'originalPreview': f'assets/editorial-10/option-{source_number:02d}.png',
        'files': [
            {'label': 'Thumbnail PNG', 'path': f'assets/editorial-15/{stem}.png'},
            {'label': 'Editable SVG', 'path': f'assets/editorial-15/{stem}.svg'},
            {'label': 'Artwork PNG', 'path': f'assets/editorial-15/{stem}-art.png'},
            {'label': 'Artwork SVG', 'path': f'assets/editorial-15/{stem}-art.svg'},
        ],
        'width': W, 'height': H, 'typography': 'Exact round10 DM Sans 450',
        'status': 'proposed', 'generator': 'native SVG',
    })


def split_capsule(x, y, angle, accent=False):
    # The two convex halves share a capsule silhouette with a quiet central gap.
    left = '#16392F'
    right = '#1E4438' if not accent else '#16536A'
    return (f'<g transform="translate({x} {y}) rotate({angle})">'
            f'<path d="M-12 -145H-138A145 145 0 0 0 -138 145H-12Z" fill="{left}"/>'
            f'<path d="M12 -145H138A145 145 0 0 1 138 145H12Z" fill="{right}"/>'
            '</g>')


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    repeat = brand.rect(0, 0, W, H, '#132B26')
    for row, y in enumerate(range(-160, 1441, 340)):
        for col, x in enumerate(range(-300, 2461, 460)):
            repeat += split_capsule(x + (230 if row % 2 else 0), y, -35,
                                    accent=(row == 3 and col == 4))
    export(1, 2, 'Tonal repeat', repeat,
        'Large split capsules repeat across the entire forest canvas. Alternating green halves build a continuous surface behind the lime headline, with one blue inflection.',
        'Repeat a broad split capsule on staggered rows. Keep both halves in close forest tones; use the shape of their join and the row offset to create rhythm across the full image.',
        'Flat tonal colors. One capsule half shifts toward blue; the headline provides the main lime contrast.',
        'The repeat fills all four edges and continues behind the headline. Dominant forest color means a tonal surface, not empty space.',
        'Forest / tonal green / blue / lime type')

    planes = brand.rect(0, 0, W, H, '#0565BB')
    planes += '''<defs>
      <linearGradient id="e15-fold-light" gradientUnits="userSpaceOnUse" x1="900" y1="700" x2="1650" y2="100">
        <stop stop-color="#007EBD"/><stop offset="1" stop-color="#51B7D5"/>
      </linearGradient>
      <linearGradient id="e15-lower-plane" gradientUnits="userSpaceOnUse" x1="0" y1="900" x2="1920" y2="1150">
        <stop stop-color="#168BC5"/><stop offset="1" stop-color="#007EBD"/>
      </linearGradient>
    </defs>
      <path d="M-200 -120H1560L610 1180H-200Z" fill="#0755A6"/>
      <path d="M-160 -120H450L1650 1180H1180Z" fill="#0864B3"/>
      <path d="M1560 -120H2140V1180H610Z" fill="#7BD3E6"/>
      <path d="M1560 -120H1950L1000 1180H610Z" fill="url(#e15-fold-light)"/>
      <path d="M-140 930L780 710L2010 990V1220H-140Z" fill="url(#e15-lower-plane)"/>
      <path d="M779 710L987 757L981 770L773 723Z" fill="#D6FF62"/>'''
    export(2, 1, 'Oversized planes', planes,
        'Monumental folded planes span the canvas. Dark blue surfaces support the headline while a broad cyan face and a low crossing plane make the artwork feel dimensional.',
        'Use a few huge overlapping diagonal planes that extend beyond the frame. Vary their angle and width, and let a second direction interrupt the dominant fold. Keep dark blue behind white text.',
        'Light follows two defined faces. Other planes stay flat; a narrow lime edge marks one fold without creating a background glow.',
        'Defined planes occupy the full surface, including behind the headline. Pattern structure reaches every edge; no isolated corner object.',
        'Deep blue / blue / cyan / small lime edge')

    woven = brand.rect(0, 0, W, H, '#F0F7FA')
    woven += '<g transform="translate(960 540) rotate(-35)">'
    width, pitch = 200, 320
    cols = list(range(-6, 7))
    bands = list(range(-6, 7))
    def vertical_color(i):
        return '#007EBD' if i == 2 else '#8ACBDD' if i == 1 else '#D4E8EC'
    for i in cols:
        woven += brand.rect(i*pitch, -2400, width, 4800, vertical_color(i))
    for j in bands:
        woven += brand.rect(-2600, j*pitch, 5200, width, '#E3F0F3')
    for i in cols:
        for j in bands:
            if (i+j) % 2 == 0:
                # Extend through each exposed gap so no antialiased join sits
                # halfway along a continuous colored strand.
                woven += brand.rect(i*pitch, j*pitch-(pitch-width), width,
                                    2*pitch-width, vertical_color(i))
    woven += '</g>'
    export(3, 3, 'Woven field', woven,
        'Wide diagonal bands weave over and under across the full pale canvas. Two blue strands enter on the right while the softer weave continues behind the headline.',
        'Build a large twill from two sets of broad intersecting bands, alternating which strand passes above. Continue the structure through all edges, with a few stronger strands away from the headline.',
        'Flat pale tones throughout the weave. Two blue strands supply the stronger color change; no corner gradient or lighting overlay.',
        'The woven structure occupies every edge and extends under the text. Pale tonal contrast keeps the headline readable while the pattern covers most of the frame.',
        'Pale blue / tonal blue-white / cyan / blue')
    (ROOT / 'round-15-a.json').write_text(json.dumps(rows, indent=2) + '\n')
    print('Built three full-surface patterns with unchanged round10 headline XML.')


if __name__ == '__main__':
    main()
