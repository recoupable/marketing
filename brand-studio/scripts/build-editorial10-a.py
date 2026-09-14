#!/usr/bin/env python3
"""Two proposed editorial directions drawn from Recoup's native stepped geometry."""
from pathlib import Path
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'editorial-10'
spec = importlib.util.spec_from_file_location('recoup_vectors', ROOT / 'scripts' / 'build-assets.py')
brand = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brand)

W, H = 1920, 1080
rows = []

def export(number, title, body, headline, description, pattern_rule, gradient_rule, palette_name, feed_headline=None, sample_title='Choose your first AI project'):
    stem = f'option-{number:02d}'
    for suffix, layers in [('', body + headline), ('-art', body), ('-feed', body + (feed_headline or headline))]:
        source = brand.svg(W, H, layers, f'Recoup editorial study / {title}')
        (DEST / f'{stem}{suffix}.svg').write_text(source)
        brand.render(source, DEST / f'{stem}{suffix}.png')
    rows.append({
        'id': f'editorial10-{number:02d}', 'category': 'editorial-10', 'family': 'geometry',
        'title': title, 'sampleTitle': sample_title,
        'headline': 'Choose your first\nAI project.', 'description': description,
        'patternRule': pattern_rule, 'gradientRule': gradient_rule,
        'paletteName': palette_name,
        'preview': f'assets/editorial-10/{stem}.png',
        'artPreview': f'assets/editorial-10/{stem}-art.png',
        'feedPreview': f'assets/editorial-10/{stem}-feed.png',
        'files': [
            {'label': 'Thumbnail PNG', 'path': f'assets/editorial-10/{stem}.png'},
            {'label': 'Editable SVG', 'path': f'assets/editorial-10/{stem}.svg'},
            {'label': 'Artwork PNG', 'path': f'assets/editorial-10/{stem}-art.png'},
            {'label': 'Artwork SVG', 'path': f'assets/editorial-10/{stem}-art.svg'},
            {'label': 'Example article PNG', 'path': f'assets/editorial-10/{stem}-feed.png'},
            {'label': 'Example article SVG', 'path': f'assets/editorial-10/{stem}-feed.svg'},
        ],
        'width': W, 'height': H, 'typography': 'Actual DM Sans450',
        'status': 'proposed', 'generator': 'native SVG',
    })


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    # Broad offset blocks: the curved joins belong to filled forms rather than
    # contour lines. The blue base remains a single uninterrupted flat color.
    blue_defs = '''<defs>
      <linearGradient id="block-light" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#007EBD"/><stop offset=".62" stop-color="#218FD0"/>
        <stop offset="1" stop-color="#6ECBDC"/>
      </linearGradient>
      <linearGradient id="block-inset" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#0A72C2"/><stop offset="1" stop-color="#0757AB"/>
      </linearGradient>
    </defs>'''
    blue = brand.rect(0, 0, W, H, '#0565BB') + blue_defs
    # Rear form is cropped by the right and bottom edge; its inner curve opens
    # a stepped field of negative space instead of drawing a second brand mark.
    blue += '''<path d="M1628 382H2010V1146H1372V866C1372 794 1430 736 1502 736H1536C1587 736 1628 695 1628 644Z" fill="#094F9E"/>
      <path d="M1324 652H1494V750C1494 823 1553 882 1626 882H1826V1140H1136V988H1200C1268 988 1324 932 1324 864Z" fill="url(#block-light)"/>
      <path d="M1740 566H1968V1142H1572V1044C1572 969 1633 908 1708 908H1740Z" fill="url(#block-inset)"/>
      <path d="M1548 760H1635V838H1600C1571 838 1548 815 1548 786Z" fill="#D6FF62"/>'''
    headline = brand.text('Choose your first', 112, 210, 110, '#FFFFFF', 450) + brand.text('AI project.', 112, 335, 110, '#FFFFFF', 450)
    export(1, 'Offset blocks', blue, headline,
        'Broad blue blocks step across the lower-right area. Curved joins and one small lime inset connect the artwork to Recoup’s symbol without repeating it.',
        'Use two or three filled rectangular fragments with offset levels and a small number of generous concave or convex joins. Crop the cluster into the edge; preserve a large quiet field.',
        'Keep the base absolutely flat. Put directional cyan light inside one broad filled block, with a second tonal-blue face and one small solid lime inset.',
        'Blue / cyan / lime')

    # One asymmetric cutout entering the left edge; no corner treatment on the
    # opposite side. A low-contrast light band stays clipped inside the shape.
    notch = 'M-120 98H316V316C316 434 395 512 513 512H588V749H388C272 749 196 826 196 942V1190H-120Z'
    forest_defs = f'''<defs>
      <clipPath id="cutout-shape"><path d="{notch}"/></clipPath>
      <linearGradient id="cutout-blue" x1="0" y1="0" x2="1" y2=".35">
        <stop stop-color="#096EB2"/><stop offset=".56" stop-color="#0783C1"/><stop offset="1" stop-color="#007EBD"/>
      </linearGradient>
      <linearGradient id="cutout-light" x1="0" y1="0" x2="1" y2="0">
        <stop stop-color="#C2EDFF" stop-opacity="0"/>
        <stop offset=".5" stop-color="#C2EDFF" stop-opacity=".14"/>
        <stop offset="1" stop-color="#C2EDFF" stop-opacity="0"/>
      </linearGradient>
    </defs>'''
    forest = brand.rect(0, 0, W, H, '#132B26') + forest_defs
    forest += f'<path d="{notch}" fill="url(#cutout-blue)"/>'
    forest += '<g clip-path="url(#cutout-shape)"><path d="M-56 -60H210L540 1180H274Z" fill="url(#cutout-light)"/></g>'
    headline = brand.text('Choose your first', 690, 450, 110, '#D6FF62', 450) + brand.text('AI project.', 690, 575, 110, '#D6FF62', 450)
    export(2, 'Cutout join', forest, headline,
        'A single blue cutout enters from the left, leaving the forest field and lime headline open. Its step and curved notch use the same construction as Recoup’s mark.',
        'Start with one oversized filled shape. Use an asymmetric edge crop, a broad step and a generous curved notch. The negative space should be as deliberate as the form.',
        'Confine a subtle blue-to-cyan band to the left-hand shape. The surrounding forest and the entire right edge stay flat.',
        'Forest / blue / lime',
        feed_headline=brand.text('Connect your', 690, 450, 110, '#D6FF62', 450) + brand.text('company’s knowledge.', 690, 575, 110, '#D6FF62', 450),
        sample_title='Connect your company’s knowledge')
    (ROOT / 'round-10-a.json').write_text(json.dumps(rows, indent=2) + '\n')
    print('Built Offset blocks and Cutout join: six SVGs and six PNGs.')


if __name__ == '__main__':
    main()
