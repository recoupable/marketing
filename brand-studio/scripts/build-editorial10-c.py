#!/usr/bin/env python3
"""Two native Recoup studies: overlapping panels and a blurred symbol imprint."""
from pathlib import Path
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'editorial-10'
spec = importlib.util.spec_from_file_location('brand_vectors', ROOT / 'scripts' / 'build-assets.py')
brand = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brand)
ROWS = []

def headline(values, x, y, color):
    for value in values:
        assert x + brand.measure(value, 110, 450) < 1820, value
    return brand.lines(values, x, y, 110, color, 125/110, 450)

def export(number, title, body, layout, sample, description, pattern_rule, gradient_rule, palette):
    stem = f'option-{number:02d}'
    x, y, color = layout
    for suffix, copy in [('', ['Choose your first', 'AI project.']), ('-art', []), ('-feed', sample)]:
        source = brand.svg(1920, 1080, body + headline(copy, x, y, color), f'Recoup editorial study / {title}')
        (DEST / f'{stem}{suffix}.svg').write_text(source)
        brand.render(source, DEST / f'{stem}{suffix}.png')
    ROWS.append({
        'id': f'editorial10-{number:02d}', 'category': 'editorial-10', 'family': 'geometry',
        'title': title, 'sampleTitle': ' '.join(sample).rstrip('.'),
        'headline': 'Choose your first\nAI project.', 'description': description,
        'patternRule': pattern_rule, 'gradientRule': gradient_rule, 'paletteName': palette,
        'preview': f'assets/editorial-10/{stem}.png',
        'artPreview': f'assets/editorial-10/{stem}-art.png',
        'feedPreview': f'assets/editorial-10/{stem}-feed.png',
        'files': [{'label': label, 'path': f'assets/editorial-10/{stem}{suffix}.{ext}'}
                  for suffix, name in [('', 'Thumbnail'), ('-art', 'Artwork'), ('-feed', 'Example article')]
                  for ext, label in [('png', f'{name} PNG'), ('svg', f'{name} editable SVG')]],
        'width': 1920, 'height': 1080, 'typography': 'Actual DM Sans 450',
        'status': 'proposed', 'generator': 'native SVG',
    })

def main():
    DEST.mkdir(parents=True, exist_ok=True)
    # Physical overlap is conveyed by modest value changes, not fake interface cards.
    panels = brand.rect(0, 0, 1920, 1080, '#F0F7FA') + '''<defs>
      <linearGradient id="panels-rear" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#D7EBF0"/><stop offset="1" stop-color="#C8E4EF"/>
      </linearGradient>
      <linearGradient id="panels-mid" x1="0" y1="0" x2="1" y2=".8">
        <stop stop-color="#B9DBEB"/><stop offset="1" stop-color="#75BCD9"/>
      </linearGradient>
      <linearGradient id="panels-front" x1="0" y1="0" x2=".5" y2="1">
        <stop stop-color="#168DC2"/><stop offset="1" stop-color="#0565BB"/>
      </linearGradient>
    </defs>'''
    panels += brand.rect(1290, 376, 880, 820, 'url(#panels-rear)', 72)
    panels += brand.rect(1150, 538, 840, 700, 'url(#panels-mid)', 72)
    panels += brand.rect(1008, 708, 850, 530, 'url(#panels-front)', 72)
    panels += brand.rect(1335, 742, 150, 8, '#D6FF62', 4)
    export(3, 'Layered panels', panels, (112, 210, '#152E37'),
           ['Build systems', 'your team can trust.'],
           'Three broad panels overlap at different heights, extending the rounded surfaces used on the Recoup website.',
           'Use generous rounded rectangles, stepped overlap, and a deliberate edge crop. Keep them empty so the structure carries the image.',
           'Light travels down the panels. The pale background stays flat; each layer has a different tonal range.',
           'Pale blue / blue / lime')

    # Reuse the exact approved symbol as one defocused, cropped impression.
    imprint = brand.rect(0, 0, 1920, 1080, '#0565BB') + '''<defs>
      <linearGradient id="imprint-light" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#0F73BC"/><stop offset=".48" stop-color="#168AC3"/>
        <stop offset=".85" stop-color="#81D6D8"/><stop offset="1" stop-color="#C2EDFF"/>
      </linearGradient>
      <filter id="imprint-blur" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="28"/>
      </filter>
    </defs>'''
    imprint += '<g filter="url(#imprint-blur)" opacity=".66">' + brand.mark(-168, -72, 1010, 'url(#imprint-light)') + '</g>'
    export(6, 'Soft imprint', imprint, (820, 795, '#FFFFFF'),
           ['Give your team', 'a clear starting point.'],
           'One enlarged, blurred impression of the Recoup symbol carries soft light through the blue field. The headline sits clear of it.',
           'Use one cropped impression of the exact Recoup mark. Blur its edges enough to read as atmosphere; keep the rest of the composition quiet.',
           'A diffuse cyan highlight lives within the left-hand imprint. The lower-right title area is an even blue.',
           'Blue / diffused cyan')
    (ROOT / 'round-10-c.json').write_text(json.dumps(ROWS, indent=2) + '\n')
    print('Built Layered panels and Soft imprint: six SVGs and six PNGs.')

if __name__ == '__main__':
    main()
