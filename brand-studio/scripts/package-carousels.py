from pathlib import Path
import json,zipfile
from PIL import Image
from reportlab.pdfgen import canvas
ROOT=Path(__file__).resolve().parents[1]
for a in json.loads((ROOT/'carousel-templates-manifest.json').read_text()):
 key=a['id'].replace('carousel-','');d=ROOT/'assets/carousels'/key
 pdf=canvas.Canvas(str(d/f'{key}.pdf'),pagesize=(540,675))
 pdf.setTitle('Recoup — '+a['title']);pdf.setAuthor('Recoup')
 preview=Image.new('RGB',(1392,1160),'#edf2f3')
 for i in range(6):
  p=d/f'{i+1:02}.jpg';im=Image.open(p);assert im.size==(1080,1350)
  pdf.drawImage(str(p),0,0,width=540,height=675);pdf.showPage()
  preview.paste(im.resize((432,540)),(24+(i%3)*456,24+(i//3)*572))
 pdf.save();preview.save(d/'preview.jpg',quality=90)
 readme=f'''# {a['title']} · Recoup carousel experiment

{a['description']}

Sample story for design review. Original illustrative copy, not a client case study.

Instagram: upload 01.jpg through 06.jpg in order. Shared canvas: 1080 × 1350 (4:5).
LinkedIn: upload {key}.pdf as one document. Six pages.
PNG files: lossless alternatives. SVG files: editable vector artwork, text outlined for reliable rendering.
Copy and layout source: brand-studio/carousel-content.json and scripts/build-carousels.py.

These templates are experiments, not approved finals.
'''
 (d/'README.md').write_text(readme)
 with zipfile.ZipFile(d/f'{key}.zip','w',zipfile.ZIP_DEFLATED) as z:
  names=[f'{i:02}.{ext}' for i in range(1,7) for ext in ['svg','png','jpg']]+['README.md',f'{key}.pdf']
  for name in names:
   p=d/name;z.write(p,p.name)
 print(key,'PDF',round((d/f'{key}.pdf').stat().st_size/1024),'KB','max JPEG',round(max(p.stat().st_size for p in d.glob('[0-9]*.jpg'))/1024),'KB')
