"""Build original, portable Recoup carousel experiments. Requires fonttools. Render and package with the companion scripts."""
from pathlib import Path
import json,re,html
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/carousels';OUT.mkdir(parents=True,exist_ok=True)
font=TTFont(ROOT/'assets/fonts/dm-sans.woff2')
if 'fvar' in font: font=instantiateVariableFont(font,{'wght':450},inplace=False)
glyphs=font.getGlyphSet();cmap=font.getBestCmap();upem=font['head'].unitsPerEm
logo=(ROOT.parent/'public/brand/recoup-wordmark-white.svg').read_text()
logo_paths=re.findall(r'<path\b[^>]*>',logo)
INK='#153630';BLUE='#0868CD';LIME='#D4FF61';PAPER='#F8F8EF';PALE='#BCE6F4'
def text(s,x,y,size=50,color=INK):
 out='';dx=0
 for ch in s:
  name=cmap.get(ord(ch),'space');pen=SVGPathPen(glyphs);glyphs[name].draw(pen)
  out+=f'<path d="{pen.getCommands()}" transform="translate({x+dx:.2f} {y}) scale({size/upem} {-size/upem})" fill="{color}"/>'
  dx+=(glyphs[name].width*size/upem)-size*.025
 assert x+dx<=1040, f'Text exceeds canvas: {s}, {x+dx}'
 return f'<g aria-label="{html.escape(s)}">{out}</g>'
def lines(words,x,y,size=94,color=INK,leading=1.06):return ''.join(text(s,x,y+i*size*leading,size,color) for i,s in enumerate(words))
def path(d,color=INK,width=3,fill='none',extra=''):return f'<path d="{d}" stroke="{color}" stroke-width="{width}" fill="{fill}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'
def rect(x,y,w,h,fill,r=0,stroke='none',sw=2):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def circle(x,y,r,fill,stroke='none',sw=2):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def group(body,x=0,y=0,scale=1,angle=0):return f'<g transform="translate({x} {y}) scale({scale}) rotate({angle})">{body}</g>'
def wordmark(color):return '<g transform="translate(59 40) scale(.29)">'+''.join(re.sub(r'fill="[^"]+"',f'fill="{color}"',p) for p in logo_paths)+'</g>'
def arrow(x,y,w=110,color=INK):return path(f'M{x} {y}h{w}m-18 -15 18 15-18 15',color,3)
def page(x,y,w=185,h=235,angle=0,fill=PAPER,stroke=INK):
 s=rect(6,10,w,h,stroke,8)+rect(0,0,w,h,fill,8,stroke,3)
 s+=path(f'M25 45h{w*.34} M25 77h{w-50} M25 98h{w-65} M25 119h{w-57}',stroke,3)
 s+=path(f'M25 {h-65}l25 -16 25 5 25 -30 35 -12',stroke,3)
 return group(s,x,y,1,angle)
def vinyl(x,y,r=180,stroke=INK,fill=PAPER):
 s=circle(x,y,r,fill,stroke,4)
 for f in [.89,.83,.77,.7,.63]:s+=circle(x,y,r*f,'none',stroke,1.6)
 s+=circle(x,y,r*.28,LIME,stroke,3)+circle(x,y,7,stroke)
 s+=path(f'M{x-r*.78} {y-r*.15}Q{x-r*.57} {y-r*.65} {x-r*.14} {y-r*.77}',fill,12)
 return s
STORY=json.loads((ROOT/'carousel-content.json').read_text())
CONTENT=[slide['titleLines'] for slide in STORY]
SUB=[slide['bodyLines'] for slide in STORY]
STEPS=[slide['step'] for slide in STORY]
for slide in STORY:
 assert ' '.join(slide['titleLines'])==slide['title'], 'Title line breaks must preserve the approved story'
 assert ' '.join(slide['bodyLines'])==slide['body'], 'Body line breaks must preserve the source copy'
def headline(n,x=72,y=300,size=84,color=INK):return lines(CONTENT[n],x,y,size,color,1.08)
def footer(n,color):return path('M72 1250H1008',color,1,extra='opacity=".35"')+text('WORK, RECONSIDERED',72,1292,21,color)+text(f'{n+1:02} / 06',910,1292,22,color)
def defs():return '<defs><linearGradient id="blue" x2=".5" y2="1"><stop stop-color="#0754B5"/><stop offset="1" stop-color="#129ADE"/></linearGradient><linearGradient id="light" x2="1" y2="1"><stop stop-color="#D1F6FF" stop-opacity=".18"/><stop offset="1" stop-color="#67E2FA" stop-opacity=".65"/></linearGradient></defs>'
def blue(n):
 s=rect(0,0,1080,1350,'url(#blue)')
 s+=path('M-200 1080Q200 780 710 1000T1400 600V1400H-200Z','none',0,'url(#light)')
 s+=path('M-50 1130Q450 900 1160 1090',PALE,1.3,extra='opacity=".4"')
 s+=wordmark(PAPER)+text(STEPS[n],72,205,24,PALE)
 s+=headline(n,color=PAPER)+lines(SUB[n],74,720,34,PALE,1.22)
 if n==0:
  s+=group(vinyl(0,0,196,PAPER,BLUE),752,1030,1,-12)
  s+=path('M360 1080C300 890 560 790 644 874',PAPER,4)+path('M619 857l31 17-29 21',PAPER,4)
  s+=text('A monthly ritual.',84,1138,30,PAPER)
 elif n==1:
  s+=page(120,920,150,205,-14)+page(451,848,150,205,7)+page(787,984,150,205,-4)
  s+=path('M240 866Q340 780 456 873M604 1015Q670 1160 775 1090',PALE,3,extra='stroke-dasharray="6 11"')
 elif n==2:
  s+=page(80,964,130,178,-12)+page(83,950,130,178,6)+arrow(290,1045,100,PAPER)
  s+=rect(450,900,510,274,'#0A60BC',24,PALE,2)
  s+=circle(520,976,20,LIME)+text('One shared starting point',559,985,28,PAPER)
  s+=path('M496 1020H914M496 1070H840M496 1120H880',PALE,3)
 elif n==3:
  s+=page(127,875,215,285,-8)+arrow(405,1030,134,PAPER)
  s+=circle(778,1018,146,LIME)+path('M712 1016l46 44 91-104',INK,9)
  s+=text('DRAFT',142,1210,22,PAPER)+text('HUMAN REVIEW',681,1210,22,PAPER)
 elif n==4:
  s+=path('M220 910C200 745 825 745 847 910M847 1035C847 1190 220 1190 220 1035',PAPER,4)
  s+=path('M822 889l27 27 22-30M193 1059l26-28 26 26',PAPER,4)
  for x,label,num in [(155,'Try','01'),(470,'Check','02'),(785,'Adjust','03')]:
   s+=circle(x+65,964,80,LIME if num=='02' else '#0C6BCC',PAPER,2)+text(num,x+36,980,44,INK if num=='02' else PAPER)+text(label,x+10,1095,32,PAPER)
 else:
  s+=path('M150 1110C155 910 835 875 925 1030C1005 1190 151 1240 135 1080',LIME,5)
  s+=text('Build on it.',276,1100,80,PAPER)+path('M888 1090l30-66 22 67',LIME,5)
 return s+footer(n,PAPER)
def paper(n):
 s=rect(0,0,1080,1350,PAPER)+wordmark(INK)+text(STEPS[n],770,94,22,INK)
 s+=path('M72 145H1008',INK,1)
 if n==0:
  s+=headline(n,y=275)+lines(SUB[n],76,700,34)
  s+=rect(520,766,575,500,PALE)+group(vinyl(0,0,224),693,1037,1,-12)
  s+=text('A FIELD NOTE',75,925,22)+path('M76 948H314',INK,1)+lines(['For music','rightsholders.'],75,999,32)
 elif n==1:
  s+=headline(n,y=275)
  for x,y,a in [(88,605,-12),(423,697,7),(766,602,12)]:s+=page(x,y,182,252,a)
  s+=path('M220 938Q485 1036 825 910',BLUE,4)+path('M798 904l33 2-13 31',BLUE,4)
  s+=lines(SUB[n],72,1120,42)
 elif n==2:
  s+=headline(n,y=275)
  s+=circle(838,820,220,PALE)
  for x,y,a in [(520,638,-12),(559,625,-3),(600,630,7)]:s+=page(x,y,225,280,a)
  s+=path('M180 780C390 740 200 970 476 979',BLUE,4)+path('M456 960l26 19-30 13',BLUE,4)
  s+=lines(SUB[n],72,1105,42)
 elif n==3:
  s+=headline(n,y=275)
  s+=page(118,609,234,315,-10)+arrow(408,795,151)
  s+=circle(800,787,167,LIME,INK,3)+path('M717 786l52 48 100-111',INK,7)
  s+=text('Draft',158,1030,30)+text('Review',745,1030,30)+lines(SUB[n],72,1135,36)
 elif n==4:
  s+=headline(n,y=275)
  for i,(a,b) in enumerate([('01','Try it on real work.'),('02','Check what comes back.'),('03','Fix the gaps together.')]):
   y=663+i*162;s+=text(a,75,y,30,BLUE)+text(b,174,y,47)+path(f'M72 {y+42}H1008',INK,1)
  s+=text('Then run it again.',72,1185,36,BLUE)
 else:
  s+=circle(1130,510,300,LIME)
  s+=headline(n,y=335)+lines(SUB[n],75,885,39)
  s+=text('Build on it.',74,1155,72,BLUE)+arrow(800,1125,175,BLUE)
 return s+footer(n,INK)
def signal(n):
 bg=[LIME,INK,PAPER,BLUE,PAPER,INK][n];fg=PAPER if n in [1,3,5] else INK
 s=rect(0,0,1080,1350,bg)+wordmark(fg)+text(STEPS[n],74,197,24,fg)
 if n==0:
  for r in range(500,79,-65):s+=circle(1095,1030,r,BLUE if r%130==70 else 'none',INK,2)
  s+=headline(n,size=88)+lines(SUB[n],75,748,36)
 elif n==1:
  for i in range(7):
   x=80+i*145;y=900+(i%2)*70
   s+=rect(x,y,95,195,BLUE if i%2 else '#2B594D',0)
   s+=path(f'M{x+22} {y+44}h48m-48 27h36',LIME,2)
  s+=headline(n,color=fg)+lines(SUB[n],74,740,35,PALE)
 elif n==2:
  s+=headline(n,size=88)
  for i in range(5):s+=path(f'M{110+i*170} 830C{110+i*170} 995 540 915 540 1080',BLUE,4)
  s+=circle(540,1100,67,INK)+circle(540,1100,19,LIME)
  s+=lines(SUB[n],74,722,35)
 elif n==3:
  s+=rect(0,750,1080,487,INK)
  s+=lines(CONTENT[n][:2],72,326,96,PAPER)
  s+=lines(CONTENT[n][2:],72,913,90,LIME)
  s+=circle(903,647,106,LIME)+path('M854 646l34 33 65-74',INK,7)
  s+=lines(SUB[n],75,1128,35,PAPER)
 elif n==4:
  s+=headline(n,size=84)
  for i,(label,col) in enumerate([('Try',BLUE),('Check',INK),('Adjust',BLUE)]):
   x=72+i*321;s+=circle(x+145,857,147,col)+text(label,x+55,871,48,PAPER)
  s+=path('M226 1070Q541 1210 867 1070',INK,3)+path('M840 1067l33-1-15 29',INK,3)
  s+=lines(SUB[n],72,635,33)
 else:
  for i in range(12):s+=path(f'M{790+i*30} -20L{590+i*30} 350',BLUE,12)
  s+=headline(n,y=455,size=86,color=PAPER)+lines(SUB[n],75,940,39,PALE)
  s+=text('Build on it.',75,1164,73,LIME)+arrow(820,1134,150,LIME)
 return s+(rect(0,1236,1080,114,bg) if n==0 else "")+footer(n,fg)
DIRECTIONS=[('blue-notes','Blue notes','Expressive blue fields, bright accents and illustrated working documents.',blue),('paper-trail','Paper trail','An editorial field note: warm paper, generous margins and crisp ink diagrams.',paper),('signal-study','Signal study','Bold scale, abstract rhythms and simple infographics that change with the story.',signal)]
manifest=[]
for key,title,desc,fn in DIRECTIONS:
 d=OUT/key;d.mkdir(exist_ok=True)
 for n in range(6):
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img"><title>{title} — {html.escape(" ".join(CONTENT[n]))}</title>{defs()}{fn(n)}</svg>'
  (d/f'{n+1:02}.svg').write_text(svg)
 manifest.append(dict(id='carousel-'+key,title=title,group='carousels',preview=f'assets/carousels/{key}/preview.jpg',files=[dict(label='LinkedIn PDF',path=f'assets/carousels/{key}/{key}.pdf'),dict(label='Full template kit',path=f'assets/carousels/{key}/{key}.zip')],collection='Social carousel templates',tool='carousels?direction='+key,description=desc))
(ROOT/'carousel-templates-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')

print('Created 18 SVG slides')
