"""Validate and bundle the paired illustration and pattern cover study."""
import hashlib
import json
from pathlib import Path
import struct
import zipfile

root = Path(__file__).resolve().parents[1]
assets = sum((json.loads((root / f'round-08-{suffix}.json').read_text()) for suffix in ('a', 'b')), [])
expected = [f'editorial08-{family}{i:02}' for i in range(1, 6) for family in ('i', 'p')]
assert sorted(asset['id'] for asset in assets) == sorted(expected), 'All ten exports must be ready'
assets.sort(key=lambda asset: expected.index(asset['id']))
palette_names = ['Blue', 'Forest', 'Pale blue', 'White', 'Lime']
sample_titles = ['Choose your first AI project', 'Connect your company’s knowledge', 'Build systems your team can trust', 'Keep people in the review', 'Turn repeated work into a system']
seen = set()
for asset in assets:
    index = int(asset['id'][-2:]) - 1
    asset['paletteName'] = palette_names[index]
    asset['sampleTitle'] = sample_titles[index]
    raw = (root / asset['preview']).read_bytes()
    assert raw[:8] == b'\x89PNG\r\n\x1a\n'
    width, height = struct.unpack('>II', raw[16:24])
    assert (width, height) == (asset['width'], asset['height'])
    assert width >= 1600 and abs(width / height - 16 / 9) < .01
    assert raw == Path(asset['generatedSource']).read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    assert digest not in seen
    seen.add(digest)
    assert asset['status'] == 'proposed' and asset['category'] == 'editorial-08'
    assert asset['family'] == ('illustration' if '-i' in asset['id'] else 'pattern')
    for key in ('title', 'description', 'typography', 'prompt'):
        assert isinstance(asset[key], str) and asset[key].strip()
    for item in asset['files']:
        path = root / item['path']
        assert path.is_file()
        if path.suffix == '.txt':
            assert path.read_text().strip() == asset['prompt'].strip()
    asset['sha256'] = digest
    asset['generator'] = 'image_gen (built-in)'

manifest = root / 'editorial-08-manifest.json'
pending = manifest.with_suffix('.tmp')
pending.write_text(json.dumps(assets, indent=2) + '\n')
pending.replace(manifest)
archive = root / 'assets/editorial-08/recoup-editorial-system.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as bundle:
    for asset in assets:
        for item in asset['files']:
            path = root / item['path']
            bundle.write(path, path.name)
    bundle.write(root / 'editorial-08-recipe.md', 'editorial-08-recipe.md')
with zipfile.ZipFile(archive) as bundle:
    assert len([name for name in bundle.namelist() if name.endswith('.png')]) == 10
    assert bundle.testzip() is None
    for asset in assets:
        assert hashlib.sha256(bundle.read(Path(asset['preview']).name)).hexdigest() == asset['sha256']
print('Ten unique PNGs, exact prompts, paired ordering, and downloadable ZIP verified.')
