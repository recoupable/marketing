"""Validate and package six pattern studies with their preferred typography."""
from pathlib import Path
import json
import re
import struct
import zipfile

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/editorial-14'
rows=[]
for name in ['round-14-a.json','round-14-b.json']:
    rows.extend(json.loads((ROOT/name).read_text()))
rows.sort(key=lambda row:row['id'])
assert len(rows)==6 and len({r['id'] for r in rows})==6
for row in rows:
    cover=ROOT/row['preview'].replace('.png','.svg')
    original=ROOT/row['originalPreview'].replace('.png','.svg')
    extract=lambda path:re.findall(r'<text\b[^>]*>.*?</text>',path.read_text())
    assert extract(cover)==extract(original),row['id']
    for file in row['files']:
        path=ROOT/file['path']
        assert path.is_file(),path
        if path.suffix=='.png':
            assert struct.unpack('>II',path.read_bytes()[16:24])==(1920,1080),path
    row['typography']='DM Sans · weight 450 · 110 px · 125 px line spacing · −4.95 px tracking'
    row['tags']=['Dynamic patterns','Original type',row['title']]
(ROOT/'editorial-14-manifest.json').write_text(json.dumps(rows,indent=2)+'\n')

prefs=json.loads((ROOT/'preferences.json').read_text())
prefs['latestRequest']={'round':'14','collection':'editorial-14','status':'proposed',
    'scope':'Keep the exact preferred round10 font, text sizes, and spacing. Explore six more fun and dynamic native pattern directions.'}
prefs['favoriteTypography']={
    'source':'Explicit user feedback with round10 screenshot, September 11, 2026',
    'font':'DM Sans','weight':450,'sizeAt1920':110,'lineSpacing':125,'tracking':-4.95,
    'instruction':'Preserve this typography for subsequent thumbnail pattern experiments.'}
prefs['patternEnergyFeedback']={
    'source':'User: i like these fonts and text sizes. but the patterns can be more fun and dynamic.',
    'direction':'Keep typography exact; explore rotation, overlaps, irregular rhythms, and stronger crops. Do not limit the geometry to curved blocks.',
    'approval':'Round14 is proposed for review. The preferred type does not imply approval of the new patterns.'}
(ROOT/'preferences.json').write_text(json.dumps(prefs,indent=2)+'\n')

with zipfile.ZipFile(OUT/'recoup-dynamic-patterns.zip','w',zipfile.ZIP_DEFLATED) as bundle:
    for row in rows:
        for file in row['files']:
            bundle.write(ROOT/file['path'],Path(file['path']).name)
    bundle.write(ROOT/'editorial-14-manifest.json','manifest.json')
    bundle.write(OUT/'pattern-recipe.md','pattern-recipe.md')
    for path in (ROOT/'assets/fonts').iterdir():
        if path.suffix in ['.woff2','.txt']:bundle.write(path,'fonts/'+path.name)
print('Six covers validated: all text elements exactly match their preferred originals; 24 SVG/PNG exports packaged.')
