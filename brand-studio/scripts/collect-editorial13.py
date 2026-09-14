"""Publish the six generated concepts without modifying their image pixels."""
from pathlib import Path
import json
import shutil
import struct
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/editorial-13'
OUT.mkdir(parents=True, exist_ok=True)
specs = json.loads((ROOT/'editorial-13-prompts.json').read_text())
sources = json.loads((ROOT/'round-13-sources.json').read_text())
manifest = []
for item in specs:
    n = item['n']
    stem = f'option-{n:02d}'
    image = OUT/f'{stem}.png'
    source = Path(sources[str(n)])
    shutil.copyfile(source, image)
    assert source.read_bytes() == image.read_bytes()
    png = image.read_bytes()
    assert png[:8] == b'\x89PNG\r\n\x1a\n'
    width, height = struct.unpack('>II', png[16:24])
    assert abs(width/height - 16/9) < .02
    prompt = OUT/f'{stem}-prompt.txt'
    prompt_text = item['prompt']
    if item.get('generationHistory'):
        prompt_text = '\n\n'.join(
            f"{step['mode'].upper()} PASS\n" +
            (f"Reference: {Path(step['reference']).name}\n" if step.get('reference') else '') +
            step['prompt'] for step in item['generationHistory'])
    prompt.write_text(prompt_text+'\n')
    manifest.append({
        **item, 'prompt':prompt_text, 'id':f'editorial13-{n:02d}', 'category':'editorial-13',
        'description':item['principle'],
        'preview':f'assets/editorial-13/{stem}.png',
        'width':width, 'height':height, 'status':'proposed',
        'generator':'built-in image generation',
        'typography':item['typography']+' · generated concept lettering',
        'tags':['Fresh editorial experiments', item['title'], item['paletteName']],
        'files':[
            {'label':'Thumbnail PNG', 'path':f'assets/editorial-13/{stem}.png'},
            {'label':'Generation prompt', 'path':f'assets/editorial-13/{stem}-prompt.txt'},
        ],
    })
(ROOT/'editorial-13-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
preferences = json.loads((ROOT/'preferences.json').read_text())
preferences['latestRequest'] = {
    'round':'13', 'collection':'editorial-13', 'status':'proposed',
    'scope':'Six fresh editorial experiments using the principles from the supplied Duetti references, with freedom to explore beyond curved blocks.',
}
preferences['editorialExperimentFeedback'] = {
    'source':'Explicit user request, September 11, 2026',
    'instructions':['Extract principles from references without copying.',
                    'Do not stick to curved blocks. Experiment and have fun.'],
    'preserve':'Earlier favorites remain available. These experiments are not approved.',
}
(ROOT/'preferences.json').write_text(json.dumps(preferences,indent=2)+'\n')
with zipfile.ZipFile(OUT/'recoup-editorial-experiments.zip','w',zipfile.ZIP_DEFLATED) as bundle:
    for item in manifest:
        for f in item['files']:
            bundle.write(ROOT/f['path'],Path(f['path']).name)
    bundle.write(ROOT/'editorial-13-prompts.json','prompts.json')
    bundle.write(ROOT/'editorial-13-manifest.json','manifest.json')
    bundle.write(OUT/'creative-notes.md','creative-notes.md')
    bundle.write(OUT/'option-05-initial.png','option-05-initial.png')
print(f'Published {len(manifest)} untouched generated covers and their prompts.')
for item in manifest:
    print(item['id'],item['width'],item['height'],item['title'])
