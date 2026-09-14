#!/usr/bin/env python3
"""Render the centered podcast identity in six palettes and three corner patterns."""
from pathlib import Path
import importlib.util
import json
import subprocess
import zipfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'assets' / 'podcast-kit-v3'
spec = importlib.util.spec_from_file_location('podcast_exports', ROOT / 'scripts' / 'render-podcast-kit-v2.py')
exports = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exports)

def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    code = """import {PALETTES,PATTERNS,renderPodcastStudySVG} from './brand-studio/podcast-scenes-v3.mjs';
for(const pattern of PATTERNS)for(const palette of PALETTES){console.log(JSON.stringify({id:palette.id+'-'+pattern.id,name:palette.name,pattern:pattern.name,svg:renderPodcastStudySVG({palette:palette.id,pattern:pattern.id})}));}"""
    result = subprocess.run(['node', '--input-type=module', '-e', code], cwd=ROOT.parent, text=True, capture_output=True, check=True)
    artworks = [json.loads(line) for line in result.stdout.splitlines()]
    renders = []
    for art in artworks:
        (OUTPUT / (art['id'] + '.svg')).write_text(art['svg'].replace('<style></style>', '<style>' + exports.FONT_CSS + '</style>'))
        renders.append((art['svg'], OUTPUT / (art['id'] + '.png')))
    exports.rasterize(renders)
    # A portable contact sheet shows all choices at a useful review size.
    sheet = Image.new('RGB', (1440, 1584), '#FFFFFF')
    draw = ImageDraw.Draw(sheet)
    for i, art in enumerate(artworks):
        x, y = 24 + i % 3 * 472, 24 + i // 3 * 260
        thumbnail = Image.open(OUTPUT / (art['id'] + '.png')).convert('RGB')
        thumbnail.thumbnail((448, 252))
        # Smaller views make room for a caption without cropping any artwork.
        thumbnail = thumbnail.resize((416, 234))
        sheet.paste(thumbnail, (x, y))
        draw.text((x, y + 238), f"{art['name']} / {art['pattern']}", fill='#152E37')
    sheet.save(OUTPUT / 'all-options.png')
    (OUTPUT / 'READ-ME.txt').write_text((ROOT / 'podcast-kit-v3-guide.md').read_text())
    with zipfile.ZipFile(OUTPUT / 'recoup-podcast-color-studies.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
        for file in sorted(OUTPUT.iterdir()):
            if file.suffix in ['.png', '.svg', '.txt']:
                archive.write(file, file.name)
        for file in (ROOT / 'assets' / 'fonts').iterdir():
            archive.write(file, 'fonts/' + file.name)
    print('Rendered 18 title cards, 18 editable SVGs, a contact sheet, and the complete ZIP.')

if __name__ == '__main__':
    main()
