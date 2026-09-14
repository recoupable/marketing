#!/usr/bin/env python3
"""Polish two round-10 native vector studies without changing their originals."""
from pathlib import Path
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('brand_vectors', ROOT / 'scripts/build-assets.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
OUT = ROOT / 'assets/editorial-11'
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1920, 1080
FOREST, BLUE, CYAN, LIME, MINT = '#132B26', '#007EBD', '#62CEE6', '#D6FF62', '#B5EED4'


def band(path, color, width=108):
    return f'<path d="{path}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="butt" stroke-linejoin="round"/>'


def interwoven():
    # All three bends now use the same 100 px quarter-circle construction.
    # The foreground cuts remain exactly 14 px on either side of each band.
    blue = 'M1370 -110V75C1370 130.23 1414.77 175 1470 175H1590C1645.23 175 1690 219.77 1690 275V528'
    forest = 'M1140 420H1350C1405.23 420 1450 375.23 1450 320V180C1450 124.77 1494.77 80 1550 80H1870'
    cyan = 'M1830 -110V250C1830 305.23 1874.77 350 1930 350H2040'
    shapes = band(blue, BLUE)
    shapes += band(forest, '#FFFFFF', 136) + band(forest, FOREST)
    shapes += band(cyan, '#FFFFFF', 136) + band(cyan, CYAN)
    # The hidden forest end stops behind cyan, removing the old 22 px edge sliver.
    shapes += v.rect(1776, 54, 108, 52, LIME)
    return v.rect(0, 0, W, H, '#FFFFFF') + shapes


def step_ribbon(x, y, junction, top_y, end, color, thickness=126):
    """Keep the original offsets; normalize every join to the same radii."""
    t, corner = thickness, 24
    # The larger convex/concave joins use a consistent 70 px quarter-circle.
    control = 31.34
    d = (f'M{x} {y}H{junction-70}'
         f'C{junction-control} {y} {junction} {y-control} {junction} {y-70}'
         f'V{top_y+corner}Q{junction} {top_y} {junction+corner} {top_y}'
         f'H{end}V{top_y+t}H{junction+t+70}'
         f'C{junction+t+control} {top_y+t} {junction+t} {top_y+t+control} {junction+t} {top_y+t+70}'
         f'V{y+t-corner}Q{junction+t} {y+t} {junction+t-corner} {y+t}'
         f'H{x}Z')
    return f'<path d="{d}" fill="{color}"/>'


def stepped():
    wash = '<defs><linearGradient id="bottom-wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BEEBCB" stop-opacity="0"/><stop offset="1" stop-color="#BEEBCB" stop-opacity=".22"/></linearGradient></defs>'
    body = v.rect(0, 0, W, H, LIME) + wash
    body += v.rect(0, 884, W, 196, 'url(#bottom-wash)')
    body += step_ribbon(540, 1008, 1050, 736, 2050, MINT)
    body += step_ribbon(690, 1110, 1260, 844, 2050, BLUE)
    body += step_ribbon(840, 1212, 1470, 952, 2050, FOREST)
    return body


studies = [
    dict(number='04', title='Interwoven bands', paletteName='White / forest / blue',
         description='The same white composition and interwoven bands, with more consistent round bends and a clean cropped edge. The original headline position and flat palette are retained.',
         changes=['Standardized the three bends to the same radius.', 'Preserved clean, even white gaps at crossings.', 'Removed the narrow forest sliver at the right edge.'],
         patternRule='Three broad flat bands use 100 px rounded bends and consistent 14 px negative-space gaps. Keep the over-under order clear and crop hidden ends cleanly.',
         gradientRule='No gradient or grain. Pure flat colors and an uninterrupted white field.',
         body=interwoven(), baseline=670, headline=['Keep people', 'in the review.']),
    dict(number='05', title='Stepped ribbons', paletteName='Lime / mint / blue / forest',
         description='The same stepped ribbons on a dominant lime field, with a clean mint layer replacing olive. Rounded joins are consistent, and the horizontal bottom wash is quieter.',
         changes=['Replaced the olive layer with a cleaner cool mint.', 'Normalized rounded corners and concave joins.', 'Reduced the bottom wash intensity and height.'],
         patternRule='Three broad filled ribbons retain their original stepped offsets. Use matching 70 px convex/concave joins and 24 px outer corners, with no icons or repeated full logos.',
         gradientRule='A very faint, full-width tonal wash is confined to the bottom 196 px. No corner glow, overall tint, or gradient behind the headline.',
         body=stepped(), baseline=210, headline=['Turn repeated work', 'into a system.']),
]

manifest = []
for study in studies:
    stem = f"option-{study['number']}"
    art = v.svg(W, H, study['body'], study['title'] + ' — refined art only', fonts=False)
    for line in study['headline']:
        assert v.measure(line, 110, 450, tracking=-4.95) < W - 224, line
    text = ''.join(v.text(line, 112, study['baseline'] + i * 125, 110, FOREST, 450, tracking=-4.95) for i, line in enumerate(study['headline']))
    cover = v.svg(W, H, study['body'] + text, study['title'] + ' — refined editorial cover')
    for suffix, source in [('', cover), ('-art', art)]:
        (OUT / f'{stem}{suffix}.svg').write_text(source)
        v.render(source, OUT / f'{stem}{suffix}.png')
    manifest.append({
        'id': f"editorial11-{study['number']}", 'category': 'editorial-11', 'family': 'geometry',
        'title': study['title'], 'sampleTitle': ' '.join(study['headline']),
        'description': study['description'], 'changes': study['changes'],
        'patternRule': study['patternRule'], 'gradientRule': study['gradientRule'],
        'paletteName': study['paletteName'],
        'preview': f'assets/editorial-11/{stem}.png', 'artPreview': f'assets/editorial-11/{stem}-art.png',
        'originalPreview': f'assets/editorial-10/{stem}-feed.png',
        'originalId': f"editorial10-{study['number']}",
        'files': [
            {'label': 'PNG', 'path': f'assets/editorial-11/{stem}.png'},
            {'label': 'Editable SVG', 'path': f'assets/editorial-11/{stem}.svg'},
            {'label': 'Art PNG', 'path': f'assets/editorial-11/{stem}-art.png'},
            {'label': 'Art SVG', 'path': f'assets/editorial-11/{stem}-art.svg'},
        ],
        'typography': 'DM Sans450', 'status': 'proposed', 'generator': 'native SVG',
        'width': W, 'height': H,
    })
    print(f'Rendered {stem}: refined cover and text-free SVG/PNG', flush=True)
(ROOT / 'round-11-b.json').write_text(json.dumps(manifest, indent=2) + '\n')
