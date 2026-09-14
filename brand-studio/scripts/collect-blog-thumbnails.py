"""Verify the twelve requested thumbnail files and package their original PNGs."""
import hashlib
import json
import struct
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
assets = [a for part in 'abc' for a in json.loads((root/f'round-06-blog-{part}.json').read_text())]
headlines = [
    'Royalty reports.\nReady for review.', 'Know your\ncatalog.',
    'CHECK THE\nSOURCE.', 'Investment review.\nStart with the sources.',
    'Make room\nfor human judgment.', 'One catalog.\nConnected data.',
    'YOUR NEXT\nAI PROJECT.', 'Teach your team.\nBuild confidence.',
    'Less copying.\nMore reviewing.', 'WHAT CHANGED\nIN YOUR CATALOG?',
    'AI agents.\nClear responsibilities.', 'Your tools.\nWorking together.',
]
type_styles = ['bold','editorial','capitals','mixed','highlight','editorial','capitals','mixed','bold','capitals','mixed','mono']
expected = {f'blog06-{i:02}' for i in range(1,13)}
assert len(assets) == 12 and {a['id'] for a in assets} == expected, 'Need all twelve distinct thumbnails'
hashes = set()
for asset in assets:
    index = int(asset['id'][-2:])-1
    assert asset['headline'] == headlines[index], f'Unexpected headline: {asset["id"]}'
    assert asset['category'] == 'blog-thumbnails' and asset['status'] == 'proposed'
    assert asset['palette'] in ['blue-lime','forest-blue']
    for key in ['title','description','prompt','source','referenced_image_paths','typography']:
        assert asset.get(key), f'Missing {key}: {asset["id"]}'
    data = (root/asset['preview']).read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    dimensions = struct.unpack('>II',data[16:24])
    assert dimensions == (asset['width'],asset['height'])
    assert abs(dimensions[0]/dimensions[1]-16/9) < .025, 'Cover needs a landscape 16:9 composition'
    assert data == Path(asset['source']).read_bytes(), 'Preserve the generated original'
    digest = hashlib.sha256(data).hexdigest()
    assert digest not in hashes, 'Duplicate thumbnail'
    hashes.add(digest)
    for ref in asset['referenced_image_paths']:
        assert Path(ref).is_file(), 'Missing reference'
    for file in asset['files']:
        assert (root/file['path']).is_file(), 'Missing download'
    asset['typeStyle'] = type_styles[index]
    asset['sampleTitle'] = asset['headline'].replace('\n',' ')

assets.sort(key=lambda a:a['id'])
destination = root/'blog-thumbnails-manifest.json'
temporary = destination.with_suffix('.tmp')
temporary.write_text(json.dumps(assets,indent=2)+'\n')
temporary.replace(destination)
bundle = root/'assets/blog-thumbnails/recoup-blog-thumbnails.zip'
with zipfile.ZipFile(bundle.with_suffix('.tmp'),'w',compression=zipfile.ZIP_STORED) as archive:
    for asset in assets:
        source = root/asset['preview']
        archive.write(source,arcname=source.name)
bundle.with_suffix('.tmp').replace(bundle)
print('Verified 12 distinct original PNGs, expected headline metadata, six text treatments, references, dimensions, and downloads. Packaged all twelve.')
