#!/usr/bin/env python3
"""Extract the approved title as reusable vector layers for the motion renderer."""
from pathlib import Path
import importlib.util,json,xml.etree.ElementTree as ET,shutil
R=Path(__file__).resolve().parents[1];O=R/'assets/podcast-kit-blue-sweep'
s=importlib.util.spec_from_file_location('v',R/'scripts/render-podcast-kit-v2.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
# Outline once, before frame rendering, so motion never depends on installed fonts.
source=v.vectors.outlines_for_render((O/'title.svg').read_text())
ET.register_namespace('','http://www.w3.org/2000/svg')
root=ET.fromstring(source);ns={'s':'http://www.w3.org/2000/svg'}
def text(el):return ET.tostring(el,encoding='unicode').replace(' xmlns="http://www.w3.org/2000/svg"','')
defs=root.find('s:defs',ns)
for style in list(defs):
 if style.tag.endswith('style'):defs.remove(style)
body=root.find('s:g',ns);lockup=next(e for e in list(body) if e.attrib.get('aria-label')=='Recoup Podcast')
parts=list(lockup);assert len(parts)==3
background=''.join(text(e) for e in body if e is not lockup)
config=dict(width=1920,height=1080,fps=30,duration=5.5,defs=text(defs),background=background,icon=text(parts[0]),recoup=text(parts[1]),podcast=text(parts[2]),final=''.join(text(e) for e in body))
(O/'motion-source/layers.json').write_text(json.dumps(config))
# Keep the previous opening available without adding it to the current kit.
archive=R/'assets/podcast-kit-blue-sweep-archive';archive.mkdir(exist_ok=True)
if not (archive/'intro-fade.mp4').exists():shutil.copy2(O/'intro.mp4',archive/'intro-fade.mp4')
print('Approved logo layers prepared.')
