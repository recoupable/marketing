#!/usr/bin/env python3
"""Collect six refinements, verify original integrity, and package review assets."""
from pathlib import Path
import hashlib
import json
import struct
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
rows = sum((json.loads((ROOT / f'round-11-{part}.json').read_text()) for part in 'abc'), [])
rows.sort(key=lambda row: row['id'])
assert [row['id'] for row in rows] == [f'editorial11-{n:02d}' for n in range(1,7)]
hashes = set()
with zipfile.ZipFile(ROOT / 'assets/editorial-10/recoup-pattern-options.zip') as original_bundle:
    for row in rows:
        assert row['status'] == 'proposed' and row['generator'] == 'native SVG'
        assert len(row['files']) == 4 and len(row['changes']) >= 2
        old_path = ROOT / row['originalPreview']
        assert old_path.read_bytes() == original_bundle.read(old_path.name), 'Original changed'
        row['typography'] = 'DM Sans · 450 · 110px'
        row['sampleTitle'] = row['sampleTitle'].rstrip('.')
        row['tags'] = ['Pattern refinements', row['title'], row['sampleTitle'], row['paletteName']]
        row['recipe'] = 'editorial-11-recipe.md'
        row['bundle'] = 'assets/editorial-11/recoup-pattern-refinements.zip'
        for item in row['files']:
            path = ROOT / item['path']
            data = path.read_bytes()
            if path.suffix == '.png':
                assert data[:8] == b'\x89PNG\r\n\x1a\n'
                assert struct.unpack('>II', data[16:24]) == (1920,1080)
                hashes.add(hashlib.sha256(data).hexdigest())
            else:
                svg = ET.fromstring(data)
                assert svg.attrib['viewBox'] == '0 0 1920 1080'
        assert (ROOT / row['preview']).read_bytes() != old_path.read_bytes(), 'Refinement unchanged'
assert len(hashes) == 12
(ROOT / 'editorial-11-manifest.json').write_text(json.dumps(rows,indent=2)+'\n')
bundle = ROOT / 'assets/editorial-11/recoup-pattern-refinements.zip'
with zipfile.ZipFile(bundle,'w',zipfile.ZIP_DEFLATED) as output:
    for row in rows:
        for item in row['files']:
            output.write(ROOT/item['path'], 'refined/'+Path(item['path']).name)
        original = Path(row['originalPreview'])
        for ext in ['png','svg']:
            path = original.with_suffix('.'+ext)
            output.write(ROOT/path, 'original/'+path.name)
    for name in ['editorial-11-recipe.md','editorial-11-manifest.json']:
        output.write(ROOT/name,name)
    for path in sorted((ROOT/'assets/fonts').iterdir()):
        if path.suffix in ['.woff2','.txt']:
            output.write(path,'fonts/'+path.name)
with zipfile.ZipFile(bundle) as output:
    assert output.testzip() is None
    print(f'Validated six original/refined pairs, 12 new PNGs and 12 SVGs. Complete bundle: {len(output.namelist())} files.')
