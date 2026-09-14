"""Validate and package full-canvas pattern studies with the preferred type."""
from pathlib import Path
import json
import re
import struct
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/editorial-15'
rows = []
for name in ['round-15-a.json', 'round-15-b.json']:
    rows.extend(json.loads((ROOT / name).read_text()))
rows.sort(key=lambda row: row['id'])
assert len(rows) == 6 and len({r['id'] for r in rows}) == 6
for row in rows:
    cover = ROOT / row['preview'].replace('.png', '.svg')
    original = ROOT / row['originalPreview'].replace('.png', '.svg')
    extract = lambda path: re.findall(r'<text\b[^>]*>.*?</text>', path.read_text())
    assert extract(cover) == extract(original), row['id']
    assert len(row['files']) == 4, row['id']
    for file in row['files']:
        path = ROOT / file['path']
        assert path.is_file(), path
        if path.suffix == '.png':
            assert struct.unpack('>II', path.read_bytes()[16:24]) == (1920, 1080), path
    row['typography'] = 'DM Sans · weight 450 · 110 px · 125 px line spacing · −4.95 px tracking'
    row['tags'] = ['Full-canvas patterns', 'Original type', row['title']]
    row['family'] = 'geometry'
    row['headline'] = 'Choose your first\nAI project.'
    row['sampleTitle'] = 'Choose your first AI project'
(ROOT / 'editorial-15-manifest.json').write_text(json.dumps(rows, indent=2) + '\n')

prefs = json.loads((ROOT / 'preferences.json').read_text())
prefs['latestRequest'] = {
    'round': '15', 'collection': 'editorial-15', 'status': 'proposed',
    'scope': 'Explore patterns covering the whole canvas and oversized forms, preserving the exact preferred typography.'
}
prefs['patternCoverageFeedback'] = {
    'source': 'User: i think your not exploring these types of options. where they take up more space',
    'direction': 'Use full-canvas repeats, oversized crops, and patterns continuing behind text. Dominant color does not mean empty space. Preserve the preferred font and sizing.',
    'references': 'Tonal repeated shapes covering a full surface; monumental nested forms occupying most of a cover. Extract coverage and scale principles without copying the reference motifs.',
    'approval': 'Round15 is proposed. Earlier favorites and review history remain unchanged.'
}
(ROOT / 'preferences.json').write_text(json.dumps(prefs, indent=2) + '\n')

with zipfile.ZipFile(OUT / 'recoup-full-canvas-patterns.zip', 'w', zipfile.ZIP_DEFLATED) as bundle:
    for row in rows:
        for file in row['files']:
            bundle.write(ROOT / file['path'], Path(file['path']).name)
    bundle.write(ROOT / 'editorial-15-manifest.json', 'manifest.json')
    bundle.write(OUT / 'pattern-recipe.md', 'pattern-recipe.md')
    for path in (ROOT / 'assets/fonts').iterdir():
        if path.suffix in ['.woff2', '.txt']:
            bundle.write(path, 'fonts/' + path.name)
print('Six covers validated: exact preferred text elements; 24 SVG/PNG exports packaged.')
