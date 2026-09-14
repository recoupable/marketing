#!/usr/bin/env python3
"""Build only the simplified announcement proposal and append its manifest entry.

Run: python3 scripts/build-announcement-v2.py
Uses the main generator's exact logo, embedded fonts, sky, and PNG renderer.
Preserves the original announcement and every other exported asset.
"""
import importlib.util
import json
from pathlib import Path
import sys

sys.dont_write_bytecode = True
SCRIPT = Path(__file__).resolve()
spec = importlib.util.spec_from_file_location('recoup_asset_helpers', SCRIPT.with_name('build-assets.py'))
kit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(kit)


def build_announcement_v2():
    w, h = 1080, 1350
    body = kit.backdrop('open-sky.webp', w, h)
    body += kit.rect(0, 0, w, h, kit.BLUE, extra='opacity=".12"')
    body += kit.lockup(72, 68, 51, kit.WHITE)
    body += kit.rect(72, 298, 936, 685, kit.WHITE, 28, 'filter="url(#shadow)"')
    body += kit.label('ANNOUNCEMENT', 118, 376, kit.INK, 20)
    body += kit.lines(['Your next', 'announcement.'], 118, 498, 88)
    body += kit.lines(
        ['Add what is launching, who it is for,', 'and where readers can find it.'],
        122, 725, 31, kit.INK, 1.45,
    )
    body += kit.rect(118, 847, 376, 73, kit.LIME, 37)
    body += kit.label('ADD DATE / DESTINATION', 146, 892, kit.INK, 16)
    kit.save(
        'social', 'social-announcement-v2', 'Social / Announcement v2 simplified',
        w, h, body,
        'Proposed revision after user feedback: the announcement was the strongest '
        'direction, but repeated branding and footer text felt busy. Keeps one '
        'top-left lockup, the original sky, and white content card; removes the '
        'bottom symbol, rule, and footer text. Original retained for comparison. '
        '1080 × 1350; placeholder announcement copy.',
    )
    item = kit.MANIFEST[-1]
    item['files'].append({'label': 'Editable generating source', 'path': 'scripts/build-announcement-v2.py'})
    manifest_path = kit.ROOT / 'asset-manifest.json'
    manifest = json.loads(manifest_path.read_text())
    existing_index = next((i for i, entry in enumerate(manifest) if entry['id'] == item['id']), None)
    if existing_index is None:
        manifest.append(item)
    else:
        manifest[existing_index] = item
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Updated manifest: {len(manifest)} entries; original announcement preserved.')


if __name__ == '__main__':
    build_announcement_v2()
