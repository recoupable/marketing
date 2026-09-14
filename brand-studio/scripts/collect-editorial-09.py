"""Collect the five edited covers and two proposed in-article illustrations."""
import hashlib
import json
from pathlib import Path
import struct
import zipfile

root = Path(__file__).resolve().parents[1]
assets = sum((json.loads((root / f'round-09-{suffix}.json').read_text()) for suffix in ('a', 'b', 'c')), [])
expected = [f'editorial09-p{i:02}' for i in range(1, 6)] + ['editorial09-a01', 'editorial09-a02']
assert sorted(x['id'] for x in assets) == sorted(expected), 'All seven assets are required.'
assets.sort(key=lambda x: expected.index(x['id']))
for asset in assets:
    raw = (root / asset['preview']).read_bytes()
    assert raw[:8] == b'\x89PNG\r\n\x1a\n'
    width, height = struct.unpack('>II', raw[16:24])
    assert width >= 1600 and abs(width / height - 16 / 9) < .01
    assert raw == Path(asset['generatedSource']).read_bytes(), 'Keep generated output bytes intact.'
    asset.update(width=width, height=height, sha256=hashlib.sha256(raw).hexdigest(), status='proposed')
    assert asset['category'] == 'editorial-09'
    if asset['family'] == 'thumbnail':
        asset['originalId'] = f"editorial08-p{asset['id'][-2:]}"
        assert (root / asset['originalPreview']).is_file()
    else:
        assert asset['family'] == 'article'
    asset.setdefault('typography', 'Thin editorial line drawing with short explanatory labels')
    for key in ('title', 'sampleTitle', 'description', 'prompt'):
        assert isinstance(asset[key], str) and asset[key].strip()
    for item in asset['files']:
        path = root / item['path']
        assert path.is_file()
        if path.suffix == '.txt':
            assert path.read_text().strip() == asset['prompt'].strip()
assert len({x['sha256'] for x in assets}) == 7
(root / 'editorial-09-manifest.json').write_text(json.dumps(assets, indent=2) + '\n')
archive = root / 'assets/editorial-09/recoup-editorial-refinements.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for asset in assets:
        for item in asset['files']:
            path = root / item['path']
            bundle.write(path, path.name)
        if asset['family'] == 'thumbnail':
            path = root / asset['originalPreview']
            bundle.write(path, 'originals/' + path.name)
    bundle.write(root / 'editorial-09-recipe.md', 'editorial-09-recipe.md')
    bundle.write(root / 'editorial-09-manifest.json', 'provenance.json')
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    assert len([n for n in bundle.namelist() if n.endswith('.png')]) == 12
print('Verified seven new PNGs, five comparison originals, exact prompts, and ZIP.')
