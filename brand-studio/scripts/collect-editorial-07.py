"""Collect the ten reviewed exports without changing generated image bytes."""
import hashlib
import json
from pathlib import Path
import struct
import zipfile

root = Path(__file__).resolve().parents[1]
assets = []
for suffix in ('a', 'b', 'c'):
    assets.extend(json.loads((root / f'round-07-{suffix}.json').read_text()))
assets.sort(key=lambda asset: asset['id'])
assert [asset['id'] for asset in assets] == [f'editorial07-{i:02}' for i in range(1, 11)]

hashes = set()
for asset in assets:
    path = root / asset['preview']
    raw = path.read_bytes()
    assert raw[:8] == b'\x89PNG\r\n\x1a\n', path
    width, height = struct.unpack('>II', raw[16:24])
    assert (width, height) == (asset['width'], asset['height'])
    assert abs(width / height - 16 / 9) < .01
    assert width >= 1600
    assert raw == Path(asset['generatedSource']).read_bytes(), 'Export differs from generated source'
    digest = hashlib.sha256(raw).hexdigest()
    assert digest not in hashes, 'Duplicate image'
    hashes.add(digest)
    assert asset['status'] == 'proposed' and asset['category'] == 'editorial-07'
    for key in ('title', 'sampleTitle', 'description', 'typography', 'prompt'):
        assert isinstance(asset[key], str) and asset[key].strip(), (asset['id'], key)
    for item in asset['files']:
        download = root / item['path']
        assert download.is_file(), download
        if download.suffix == '.txt':
            assert download.read_text().strip() == asset['prompt'].strip()
    asset['sha256'] = digest
    asset['generator'] = 'image_gen (built-in)'

manifest = root / 'editorial-07-manifest.json'
temporary = manifest.with_suffix('.tmp')
temporary.write_text(json.dumps(assets, indent=2) + '\n')
temporary.replace(manifest)

archive = root / 'assets/editorial-07/recoup-editorial-directions.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as bundle:
    for asset in assets:
        for item in asset['files']:
            path = root / item['path']
            bundle.write(path, path.name)
    bundle.write(root / 'editorial-07-recipe.md', 'editorial-07-recipe.md')

with zipfile.ZipFile(archive) as bundle:
    assert len([name for name in bundle.namelist() if name.endswith('.png')]) == 10
    assert bundle.testzip() is None
    for asset in assets:
        assert hashlib.sha256(bundle.read(Path(asset['preview']).name)).hexdigest() == asset['sha256']

print(f'Collected {len(assets)} unique, unchanged PNGs with exact prompts; ZIP verified.')
