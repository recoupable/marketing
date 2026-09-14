#!/usr/bin/env python3
"""Two native editorial layouts using the approved Daylight background."""
from pathlib import Path
import base64,importlib.util,zipfile
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets/daylight-blog';OUT.mkdir(exist_ok=True)
spec=importlib.util.spec_from_file_location('kit',ROOT/'scripts/render-podcast-kit-v2.py');kit=importlib.util.module_from_spec(spec);spec.loader.exec_module(kit)
bg='data:image/png;base64,'+base64.b64encode((ROOT/'assets/podcast-kit-daylight/daylight-background.png').read_bytes()).decode()
def text(v,x,y,c):return f'<text x="{x}" y="{y}" font-family="DM Sans" font-size="110" font-weight="450" letter-spacing="-4.95" fill="{c}">{v}</text>'
def svg(body):return f'<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><style>{kit.FONT_CSS}</style></defs>{body}</svg>'
items=[
 ('choose-your-first-ai-project',svg(f'<image href="{bg}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>'+text('Choose your first',120,235,'#FFFFFF')+text('AI project.',120,360,'#FFFFFF'))),
 ('know-your-catalog-earnings',svg('<defs><clipPath id="art"><rect x="1120" y="0" width="800" height="1080"/></clipPath></defs><rect width="1920" height="1080" fill="#F0F7FA"/>'+f'<g clip-path="url(#art)"><image href="{bg}" x="650" y="-80" width="2200" height="1240" preserveAspectRatio="xMidYMid slice"/></g>'+text('Know what',120,560,'#152E37')+text('your catalog',120,685,'#152E37')+text('is earning.',120,810,'#152E37')))
]
for name,s in items:(OUT/(name+'.svg')).write_text(s)
kit.rasterize([(s,OUT/(name+'.png')) for name,s in items])
with zipfile.ZipFile(OUT/'recoup-daylight-blog-thumbnails.zip','w',zipfile.ZIP_DEFLATED) as z:
 for name,_ in items:
  for ext in ['png','svg']:z.write(OUT/(name+'.'+ext),name+'.'+ext)
print('Two 1920 × 1080 PNGs and editable SVGs exported.')
