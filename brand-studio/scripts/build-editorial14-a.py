#!/usr/bin/env python3
"""Three graphic pattern proposals preserving the exact round10 typography."""
from pathlib import Path
import importlib.util
import json
import math
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'editorial-14'
spec = importlib.util.spec_from_file_location('recoup_vectors', ROOT / 'scripts' / 'build-assets.py')
brand = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brand)
W, H = 1920, 1080
rows = []


def exact_headline(source_number):
    source = (ROOT / f'assets/editorial-10/option-{source_number:02d}.svg').read_text()
    elements = re.findall(r'<text\b[\s\S]*?</text>', source)
    assert len(elements) == 2
    return ''.join(elements)


def export(number, source_number, title, body, description, rule, light, palette):
    stem = f'option-{number:02d}'
    headline = exact_headline(source_number)
    for suffix, layers in [('', body + headline), ('-art', body)]:
        source = brand.svg(W, H, layers, f'Recoup graphic pattern proposal / {title}')
        ET.fromstring(source)
        if not suffix:
            assert ''.join(re.findall(r'<text\b[\s\S]*?</text>', source)) == headline
        (DEST / f'{stem}{suffix}.svg').write_text(source)
        brand.render(source, DEST / f'{stem}{suffix}.png')
    rows.append({
        'id': f'editorial14-{number:02d}', 'category': 'editorial-14', 'family': 'geometry',
        'title': title, 'sampleTitle': 'Choose your first AI project',
        'headline': 'Choose your first\nAI project.',
        'description': description, 'patternRule': rule, 'gradientRule': light,
        'paletteName': palette,
        'preview': f'assets/editorial-14/{stem}.png',
        'artPreview': f'assets/editorial-14/{stem}-art.png',
        'originalPreview': f'assets/editorial-10/option-{source_number:02d}.png',
        'files': [
            {'label': 'Thumbnail PNG', 'path': f'assets/editorial-14/{stem}.png'},
            {'label': 'Editable SVG', 'path': f'assets/editorial-14/{stem}.svg'},
            {'label': 'Artwork PNG', 'path': f'assets/editorial-14/{stem}-art.png'},
            {'label': 'Artwork SVG', 'path': f'assets/editorial-14/{stem}-art.svg'},
        ],
        'width': W, 'height': H, 'typography': 'Exact round10 DM Sans 450',
        'status': 'proposed', 'generator': 'native SVG',
    })


def polar(radius, angle):
    angle = math.radians(angle)
    return (1760 + radius * math.cos(angle), 1190 + radius * math.sin(angle))


def pt(point):
    return f'{point[0]:.2f} {point[1]:.2f}'


def blade(angle, radius, width, color):
    a = polar(70, angle - 3)
    b = polar(radius - 38, angle - width / 2)
    c = polar(radius, angle - width / 2 + 2)
    d = polar(radius, angle + width / 2 - 2)
    e = polar(radius - 35, angle + width / 2)
    f = polar(70, angle + 3)
    # Broad convex outer ends and tapering roots produce a fan silhouette,
    # rather than repeated narrow lines or a radial dot pattern.
    return (f'<path d="M{pt(a)}L{pt(b)}Q{pt(polar(radius,angle-width/2))} {pt(c)}'
            f'L{pt(d)}Q{pt(polar(radius,angle+width/2))} {pt(e)}L{pt(f)}Z" fill="{color}"/>')


def loop(cx, cy, rx, ry, thickness, color, angle):
    path = (f'M{cx-rx} {cy}a{rx} {ry} 0 1 0 {rx*2} 0a{rx} {ry} 0 1 0 {-rx*2} 0Z'
            f'M{cx-rx+thickness} {cy}a{rx-thickness} {ry-thickness} 0 1 0 {(rx-thickness)*2} 0'
            f'a{rx-thickness} {ry-thickness} 0 1 0 {-(rx-thickness)*2} 0Z')
    return f'<path d="{path}" fill="{color}" fill-rule="evenodd" transform="rotate({angle} {cx} {cy})"/>'


def loop_accent():
    def ellipse_point(rx, ry, angle):
        return (1710 + rx * math.cos(math.radians(angle)),
                220 + ry * math.sin(math.radians(angle)))
    a, b = 102, 132
    return (f'<path d="M{pt(ellipse_point(250,345,a))}A250 345 0 0 1 {pt(ellipse_point(250,345,b))}'
            f'L{pt(ellipse_point(168,263,b))}A168 263 0 0 0 {pt(ellipse_point(168,263,a))}Z" '
            'fill="#D6FF62" transform="rotate(24 1710 220)"/>')


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    fan = brand.rect(0, 0, W, H, '#0565BB')
    for angle, radius, width, color in [
        (-174,760,15,'#084E96'), (-154,840,16,'#168FCC'),
        (-134,820,16,'#65CBE0'), (-114,880,17,'#D6FF62'),
        (-94,850,16,'#007EBD'), (-74,800,15,'#63C7DD'),
        (-54,740,15,'#0A4D91'),
    ]:
        fan += blade(angle, radius, width, color)
    export(1, 1, 'Kinetic fan', fan,
        'Broad colored blades open from a point below the frame. Different lengths and deliberate gaps give the silhouette movement while the blue field stays quiet.',
        'Use six or seven broad tapered blades, with gently rounded ends and irregular lengths. Crop the point of convergence below the frame; preserve space around the headline.',
        'Flat color throughout. Depth comes from the sequence of blue, cyan, and one lime blade, rather than a background glow.',
        'Blue / cyan / lime')

    white = brand.rect(0, 0, W, H, '#FFFFFF')
    forest_loop = loop(1590, 165, 385, 220, 84, '#132B26', -30)
    blue_loop = loop(1710, 220, 250, 345, 82, '#007EBD', 24)
    white += '<defs><clipPath id="e14-overpass"><rect x="1340" y="305" width="390" height="340"/></clipPath></defs>'
    white += forest_loop + blue_loop + loop_accent()
    white += '<g clip-path="url(#e14-overpass)">' + forest_loop + '</g>'
    export(2, 4, 'Woven loop', white,
        'Two broad loops weave through one another above the headline. The cropped curves and small lime crossing give the composition a playful, sculptural rhythm.',
        'Pair two generous asymmetric elliptical ribbons. Give each a different angle and proportion; weave one crossing over and one under. Keep the lower-left headline area open.',
        'Flat forest and blue ribbons with a small lime crossing. White space provides the contrast; no gradient or shadow.',
        'White / forest / blue / lime')

    rhythm = brand.rect(0, 0, W, H, '#F0F7FA')
    rhythm += '<g transform="translate(1550 850) rotate(-40)">'
    for x,y,width,color in [
        (-255,-300,380,'#132B26'), (-420,-160,710,'#007EBD'),
        (-230,-20,530,'#36B4D7'), (-380,120,770,'#0565BB'),
        (-110,260,560,'#D6FF62'), (-250,400,490,'#132B26'),
    ]:
        rhythm += brand.rect(x,y,width,94,color,47)
    rhythm += '</g>'
    export(3, 3, 'Slanted rhythm', rhythm,
        'Bold angled capsules rise through the edge in uneven lengths. Their spacing and staggered ends create a graphic rhythm without becoming a diagram or interface.',
        'Use broad parallel capsules at one decisive angle. Vary their lengths and end positions; keep the gaps even and let the frame crop the final bars.',
        'Flat pale blue base and solid colored capsules. One lime bar breaks the blue-and-forest sequence; no gradient.',
        'Pale blue / blue / forest / lime')
    (ROOT / 'round-14-a.json').write_text(json.dumps(rows, indent=2) + '\n')
    print('Built three new pattern covers and three artworks with exact original headline XML.')


if __name__ == '__main__':
    main()
