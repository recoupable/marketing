#!/usr/bin/env python3
"""Render two proposed Recoup brand-pattern studies from native vectors."""
from pathlib import Path
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('brand_vectors', ROOT / 'scripts/build-assets.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
OUT = ROOT / 'assets/editorial-10'
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1920, 1080
FOREST, BLUE, CYAN, LIME = '#132B26', '#007EBD', '#62CEE6', '#D6FF62'
HEADLINE = ['Choose your first', 'AI project.']


def band(path, color, width=108):
    return f'<path d="{path}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="butt" stroke-linejoin="round"/>'


def interwoven():
    # Three broad paths weave through the upper-right. The white cuts are
    # structural gaps, making the crossing order visible without shadows.
    blue = 'M1370 -110V75C1370 140 1405 175 1470 175H1590C1655 175 1690 210 1690 275V528'
    forest = 'M1140 420H1350C1415 420 1450 385 1450 320V180C1450 115 1485 80 1550 80H2020'
    cyan = 'M1830 -110V250C1830 315 1865 350 1930 350H2040'
    shapes = band(blue, BLUE)
    shapes += band(forest, '#FFFFFF', 136) + band(forest, FOREST)
    shapes += band(cyan, '#FFFFFF', 136) + band(cyan, CYAN)
    # One small colored interval emphasizes the overpassing band.
    shapes += v.rect(1776, 54, 108, 52, LIME)
    return v.rect(0, 0, W, H, '#FFFFFF') + shapes


def step_ribbon(x, y, junction, top_y, end, color, thickness=126):
    """A filled offset band with opposing convex and concave joins."""
    t = thickness
    d = (f'M{x} {y}H{junction-70}'
         f'C{junction-20} {y} {junction} {y-25} {junction} {y-70}'
         f'V{top_y+20}Q{junction} {top_y} {junction+20} {top_y}'
         f'H{end}V{top_y+t}H{junction+t+70}'
         f'C{junction+t+20} {top_y+t} {junction+t} {top_y+t+25} {junction+t} {top_y+t+70}'
         f'V{y+t-20}Q{junction+t} {y+t} {junction+t-20} {y+t}'
         f'H{x}Z')
    return f'<path d="{d}" fill="{color}"/>'


def stepped():
    wash = '<defs><linearGradient id="bottom-wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BEEBCB" stop-opacity="0"/><stop offset="1" stop-color="#BEEBCB" stop-opacity=".38"/></linearGradient></defs>'
    body = v.rect(0, 0, W, H, LIME) + wash
    body += v.rect(0, 840, W, 240, 'url(#bottom-wash)')
    body += step_ribbon(540, 1008, 1050, 736, 2050, '#BADF53')
    body += step_ribbon(690, 1110, 1260, 844, 2050, BLUE)
    body += step_ribbon(840, 1212, 1470, 952, 2050, FOREST)
    return body


studies = [
    dict(number='04', title='Interwoven bands', paletteName='White / forest / blue',
         description='Three broad bands cross at the upper-right, with negative-space cuts and one lime interval. The headline sits in the open white field below.',
         patternRule='Use two or three broad flat bands, roughly 100 px wide, with rounded bends and visible over-under gaps. Borrow the Recoup mark’s connection geometry without repeating the full mark.',
         gradientRule='No gradient. Pure flat colors and an uninterrupted white field.',
         body=interwoven(), baseline=670, feed=['Keep people', 'in the review.']),
    dict(number='05', title='Stepped ribbons', paletteName='Lime / forest / blue',
         description='Broad filled ribbons step across the lower edge of a dominant lime field. A faint horizontal wash sits below the artwork, leaving the headline area flat.',
         patternRule='Build three filled offset ribbons from rectangular runs connected by soft convex and concave joins. Crop them across the bottom, varying their offset and palette rather than using thin repeated contours.',
         gradientRule='A low-intensity, full-width tonal wash in the bottom 240 px only. No corner glow, radial bloom, or tint behind the headline.',
         body=stepped(), baseline=210, feed=['Turn repeated work', 'into a system.']),
]

manifest = []
for study in studies:
    stem = f"option-{study['number']}"
    art = v.svg(W, H, study['body'], study['title'] + ' — art only', fonts=False)
    def cover_for(headline, label):
        for line in headline:
            assert v.measure(line, 110, 450, tracking=-4.95) < W - 224, line
        copy = ''.join(v.text(line, 112, study['baseline'] + i * 125, 110, FOREST, 450, tracking=-4.95) for i, line in enumerate(headline))
        return v.svg(W, H, study['body'] + copy, study['title'] + label)
    cover = cover_for(HEADLINE, ' — editorial cover')
    feed = cover_for(study['feed'], ' — example article')
    for suffix, source in [('', cover), ('-art', art), ('-feed', feed)]:
        (OUT / f'{stem}{suffix}.svg').write_text(source)
        v.render(source, OUT / f'{stem}{suffix}.png')
    manifest.append({
        'id': f"editorial10-{study['number']}", 'category': 'editorial-10', 'family': 'geometry',
        'title': study['title'], 'sampleTitle': ' '.join(study['feed']),
        'controlledTitle': 'Choose your first AI project.',
        'description': study['description'], 'patternRule': study['patternRule'],
        'gradientRule': study['gradientRule'], 'paletteName': study['paletteName'],
        'preview': f'assets/editorial-10/{stem}.png', 'artPreview': f'assets/editorial-10/{stem}-art.png',
        'feedPreview': f'assets/editorial-10/{stem}-feed.png',
        'files': [
            {'label': 'PNG', 'path': f'assets/editorial-10/{stem}.png'},
            {'label': 'Editable SVG', 'path': f'assets/editorial-10/{stem}.svg'},
            {'label': 'Art PNG', 'path': f'assets/editorial-10/{stem}-art.png'},
            {'label': 'Art SVG', 'path': f'assets/editorial-10/{stem}-art.svg'},
            {'label': 'Example article PNG', 'path': f'assets/editorial-10/{stem}-feed.png'},
            {'label': 'Example article SVG', 'path': f'assets/editorial-10/{stem}-feed.svg'},
        ],
        'typography': 'Actual DM Sans450', 'status': 'proposed', 'generator': 'native SVG',
        'width': W, 'height': H,
    })
    print(f'Rendered {stem}: controlled cover, example article, and text-free SVG/PNG', flush=True)
(ROOT / 'round-10-b.json').write_text(json.dumps(manifest, indent=2) + '\n')
