#!/usr/bin/env python3
"""Assemble and validate the six native-vector editorial proposals."""
from pathlib import Path
import hashlib
import json
import struct
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
rows = sum((json.loads((ROOT / f'round-10-{part}.json').read_text()) for part in 'abc'), [])
rows.sort(key=lambda row: row['id'])
assert [row['id'] for row in rows] == [f'editorial10-{n:02d}' for n in range(1, 7)]
digests = set()
for row in rows:
    assert row['status'] == 'proposed' and row['generator'] == 'native SVG'
    assert len(row['files']) == 6
    row['typography'] = 'DM Sans · 450 · 110px'
    row['recipe'] = 'editorial-10-recipe.md'
    row['tags'] = ['Recoup pattern options', row['title'], row['paletteName']]
    for item in row['files']:
        path = ROOT / item['path']
        data = path.read_bytes()
        if path.suffix == '.png':
            assert data[:8] == b'\x89PNG\r\n\x1a\n'
            assert struct.unpack('>II', data[16:24]) == (1920, 1080)
            digests.add(hashlib.sha256(data).hexdigest())
        else:
            svg = ET.fromstring(data)
            assert svg.attrib['viewBox'] == '0 0 1920 1080'
    row['bundle'] = 'assets/editorial-10/recoup-pattern-options.zip'
assert len(digests) == 17  # option01 example intentionally equals the controlled headline
(ROOT / 'editorial-10-manifest.json').write_text(json.dumps(rows, indent=2) + '\n')
bundle = ROOT / 'assets/editorial-10/recoup-pattern-options.zip'
with zipfile.ZipFile(bundle, 'w', zipfile.ZIP_DEFLATED) as output:
    for row in rows:
        for item in row['files']:
            output.write(ROOT / item['path'], Path(item['path']).name)
    for name in ['editorial-10-recipe.md', 'editorial-10-manifest.json']:
        output.write(ROOT / name, name)
    for name in ['dm-sans.woff2', 'ibm-plex-mono.woff2']:
        output.write(ROOT / 'assets/fonts' / name, f'fonts/{name}')
    for path in sorted((ROOT / 'assets/fonts').glob('*LICENSE.txt')):
        output.write(path, f'fonts/{path.name}')
with zipfile.ZipFile(bundle) as output:
    assert output.testzip() is None
    print(f'Validated six options, 18 PNGs, 18 editable SVGs; bundle contains {len(output.namelist())} files.')
