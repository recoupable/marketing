"""Verify the separate background and transparent illustration studies."""
import hashlib
import json
import struct
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
parts = ['round-05-backgrounds-a.json', 'round-05-backgrounds-b.json', 'round-05-illustrations.json']
assets = [asset for part in parts for asset in json.loads((root/part).read_text())]
# Keep the first renders and their provenance; select the reviewed style repairs
# by stable identity so saved combinations pick up the clearer illustration.
by_id = {asset['id']: asset for asset in assets}
for part in ['round-05-paper-repair.json', 'round-05-airbrush-repair.json']:
    for asset in json.loads((root/part).read_text()):
        assert asset['id'] in by_id, 'Repair must replace an existing study'
        by_id[asset['id']] = asset
assets = list(by_id.values())
families = ['fine-grain', 'glass', 'airbrush']
colors = ['blue-major', 'lime-major', 'reverse', 'inverted']
subjects = ['record', 'book']
styles = ['ink', 'paper', 'airbrush', 'glass']
expected = {f'style05-bg-{f}-{c}' for f in families for c in colors} | {f'style05-art-{s}-{t}' for s in subjects for t in styles}
assert len(assets) == 20 and {a['id'] for a in assets} == expected, 'Need 12 backgrounds and 8 illustrations'
hashes = set()
def luminance(rgb):
    linear = [v/255/12.92 if v/255 <= .04045 else ((v/255+.055)/1.055)**2.4 for v in rgb]
    return sum(v*w for v,w in zip(linear,[.2126,.7152,.0722]))

inks = {'ivory':luminance((248,250,245)), 'forest':luminance((19,43,38))}
def suggested_ink(image, top, bottom):
    # Evaluate the actual image behind the default headline area, rather than
    # assuming every colorway has the same brightness distribution.
    points = [image.getpixel((int(image.width*x/100),int(image.height*y/100)))[:3] for x in range(7,54,3) for y in range(top,bottom,3)]
    scores = {}
    for name,ink in inks.items():
        ratios = sorted((max(luminance(pixel),ink)+.05)/(min(luminance(pixel),ink)+.05) for pixel in points)
        scores[name] = ratios[len(ratios)//5]
    return max(scores,key=scores.get)

for a in assets:
    assert a['status'] == 'proposed'
    for key in ['prompt', 'source', 'preview', 'title', 'description']:
        assert a.get(key), f'Missing {key}: {a["id"]}'
    path = root/a['preview']
    data = path.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    assert struct.unpack('>II',data[16:24]) == (a['width'],a['height'])
    assert data == Path(a['source']).read_bytes(), 'Original was changed'
    digest = hashlib.sha256(data).hexdigest()
    assert digest not in hashes, 'Duplicate output'
    hashes.add(digest)
    if a['kind'] == 'background':
        image = Image.open(path).convert('RGB')
        a['suggestedInk'] = {style:suggested_ink(image,45 if style=='caption' else 18,86 if style=='caption' else 68) for style in ['bold','stacked','editorial','highlight','caption']}
    if a['kind'] == 'illustration':
        image = Image.open(path)
        assert 'A' in image.getbands(), 'Illustration needs a true alpha channel'
        alpha = image.getchannel('A')
        extrema = alpha.getextrema()
        assert extrema[0] == 0 and extrema[1] > 0, 'Illustration must have transparency and visible art'
        a['hasAlpha'] = True

assets.sort(key=lambda a:a['id'])
destination=root/'style-lab-manifest.json'
temporary=destination.with_suffix('.tmp')
temporary.write_text(json.dumps(assets,indent=2)+'\n')
temporary.replace(destination)
print('Verified 12 backgrounds, 8 transparent illustrations, dimensions, prompts, and unchanged originals.')
