#!/usr/bin/env python3
"""Render the proposed native-vector podcast kit without changing earlier studies.

Local requirements: fontTools, Node/sharp, ffmpeg. DM Sans and IBM Plex Mono
are bundled with the Studio. All MP4s are silent 1920x1080 at 24 fps.
"""
from pathlib import Path
import argparse
import base64
import functools
import importlib.util
import json
import shutil
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'assets' / 'podcast-kit-v2'
THEMES = ['cut', 'weave', 'layer']
FORMATS = ['intro', 'cover', 'thumbnail', 'solo', 'duo', 'vertical', 'quote', 'endcard', 'background']

spec = importlib.util.spec_from_file_location('brand_vectors', ROOT / 'scripts' / 'build-assets.py')
vectors = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vectors)
vectors.outline = functools.lru_cache(maxsize=512)(vectors.outline)

FONT_CSS = ''.join(
    '@font-face{font-family:"' + name + '";src:url(data:font/woff2;base64,'
    + base64.b64encode((ROOT / 'assets' / 'fonts' / file).read_bytes()).decode()
    + ') format("woff2");font-weight:100 1000;}'
    for name, file in [('DM Sans', 'dm-sans.woff2'), ('IBM Plex Mono', 'ibm-plex-mono.woff2')]
)

def scenes(settings):
    code = "import {renderPodcastSVG} from './brand-studio/podcast-scenes-v2.mjs';import fs from 'node:fs';for(const s of JSON.parse(fs.readFileSync(0,'utf8')))console.log(JSON.stringify(renderPodcastSVG(s)));"
    result = subprocess.run(['node', '--input-type=module', '-e', code], input=json.dumps(settings), text=True, cwd=ROOT.parent, check=True, capture_output=True)
    return [json.loads(line) for line in result.stdout.splitlines()]

def rasterize(entries):
    # Text is outlined before sharp sees it, keeping the font appearance portable.
    code = "const sharp=require('sharp');const rl=require('node:readline').createInterface({input:process.stdin});(async()=>{for await(const line of rl){const {svg,path}=JSON.parse(line);await sharp(Buffer.from(svg)).png().toFile(path);}})().catch(e=>{console.error(e);process.exitCode=1});"
    proc = subprocess.Popen(['node', '-e', code], cwd=ROOT.parent, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    for source, path in entries:
        proc.stdin.write(json.dumps({'svg': vectors.outlines_for_render(source), 'path': str(path)}) + '\n')
    proc.stdin.close()
    errors = proc.stderr.read()
    if proc.wait():
        raise RuntimeError(errors)

def stills():
    settings = [dict(theme=theme, format=fmt, time=3, preview=False) for theme in THEMES for fmt in FORMATS]
    artwork = scenes(settings)
    renders = []
    for item, source in zip(settings, artwork):
        stem = f"{item['theme']}-{item['format']}"
        editable = source.replace('<style></style>', '<style>' + FONT_CSS + '</style>')
        (OUTPUT / f'{stem}.svg').write_text(editable)
        renders.append((source, OUTPUT / f'{stem}.png'))
    overlay_settings = [dict(theme=theme, format=fmt, time=3, preview=False, chromeOnly=True) for theme in THEMES for fmt in ['solo', 'duo', 'vertical']]
    for item, source in zip(overlay_settings, scenes(overlay_settings)):
        stem = f"{item['theme']}-{item['format']}-labels"
        (OUTPUT / f'{stem}.svg').write_text(source.replace('<style></style>', '<style>' + FONT_CSS + '</style>'))
        renders.append((source, OUTPUT / f'{stem}.png'))
    preview_settings = [dict(theme=theme, format=fmt, time=3, preview=True) for theme in THEMES for fmt in ['solo', 'duo', 'vertical']]
    for item, source in zip(preview_settings, scenes(preview_settings)):
        renders.append((source, OUTPUT / f"{item['theme']}-{item['format']}-preview.png"))
    rasterize(renders)
    print('Rendered 27 PNG/SVG assets, nine transparent label overlays, and nine camera-frame previews.', flush=True)

def motion():
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        raise RuntimeError('ffmpeg is required for the silent intro videos.')
    for theme in THEMES:
        for mode, seconds in [('intro', 6), ('background', 12)]:
            with tempfile.TemporaryDirectory(prefix='recoup-podcast-') as temp:
                frames = Path(temp)
                settings = [dict(theme=theme, format=mode, preview=False, time=i / 24) for i in range(seconds * 24)]
                rasterize((source, frames / f'{i:04d}.png') for i, source in enumerate(scenes(settings)))
                subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-framerate', '24', '-i', str(frames / '%04d.png'), '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(OUTPUT / f'{theme}-{mode}.mp4')], check=True)
            print(f'Rendered {theme} {mode}: {seconds} seconds, 24 fps, silent.', flush=True)

def package():
    note = (ROOT / 'podcast-kit-v2-guide.md').read_text()
    (OUTPUT / 'READ-ME.txt').write_text(note)
    with zipfile.ZipFile(OUTPUT / 'recoup-podcast-kit-options.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
        for file in sorted(OUTPUT.iterdir()):
            if file.suffix in ['.svg', '.png', '.mp4', '.txt']:
                archive.write(file, file.name)
        for file in (ROOT / 'assets' / 'fonts').iterdir():
            archive.write(file, 'fonts/' + file.name)
    print('Packaged recoup-podcast-kit-options.zip', flush=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--no-motion', action='store_true')
    parser.add_argument('--motion-only', action='store_true')
    parser.add_argument('--package-only', action='store_true')
    args = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    if not args.motion_only and not args.package_only:
        stills()
    if not args.no_motion and not args.package_only:
        motion()
    package()
