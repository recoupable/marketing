"""Additional art directions for the shared, title-first carousel narrative."""
import math

def extra_directions(a):
 text,lines,path,rect,circle,group,page,vinyl,arrow,wordmark,footer,headline=[a[k] for k in ['text','lines','path','rect','circle','group','page','vinyl','arrow','wordmark','footer','headline']]
 INK,BLUE,LIME,PAPER,PALE=[a[k] for k in ['INK','BLUE','LIME','PAPER','PALE']]
 CONTENT,SUB,STEPS=[a[k] for k in ['CONTENT','SUB','STEPS']]
 def check(x,y,r=85,fg=INK,bg=LIME):return circle(x,y,r,bg,fg,3)+path(f'M{x-r*.45} {y}l{r*.3} {r*.28} {r*.62} {-r*.65}',INK if fg==PALE and bg==LIME else fg,5)
 def sheet(x,y,w=150,h=200,fg=INK,bg=PAPER,angle=0):
  s=rect(0,0,w,h,bg,4,fg,2)+path(f'M22 38h{w*.45}M22 66h{w-44}M22 89h{w-58}M22 112h{w-44}',fg,2)
  s+=path(f'M22 {h-35}l25 -12 26 7 33 -35',fg,3)
  return group(s,x,y,1,angle)
 def stamp(n,fg=INK,bg=PAPER,connector=None):
  c=connector or fg
  if n==0:return vinyl(320,190,156,fg,bg)+path('M79 231C22 0 351-76 474 31',c,4)+path('M447 27l33 7-8-31',c,4)
  if n==1:return sheet(40,85,135,190,fg,bg,-14)+sheet(226,9,135,190,fg,bg,7)+sheet(429,92,135,190,fg,bg,12)+path('M166 76Q212 2 267 25M373 195Q423 323 473 274',c,2,extra='stroke-dasharray="4 9"')
  if n==2:
   s=sheet(30,85,125,175,fg,bg,-9)+sheet(54,91,125,175,fg,bg,5)+arrow(218,180,80,c)+rect(365,30,238,272,bg,9,fg,3)
   return s+circle(406,77,12,LIME)+path('M397 120h166M397 157h144M397 194h166M397 231h125',fg,3)
  if n==3:return sheet(39,56,165,235,fg,bg,-8)+arrow(246,180,88,c)+check(493,178,104,fg,LIME)
  if n==4:
   s=path('M112 139C112-16 525-16 525 139M525 243C525 386 112 386 112 243',c,3)+path('M505 116l22 24 18-24M92 266l20-24 21 24',c,3)
   for x,num in [(112,'1'),(317,'2'),(525,'3')]:s+=circle(x,190,61,LIME if num=='2' else bg,fg,2)+text(num,x-15,207,48,INK if num=='2' and fg==PALE else fg)
   return s
  s=sheet(80,66,164,229,fg,bg,-7)+sheet(294,49,164,229,fg,bg,8)
  return s+path('M150 326Q532 390 585 122',c,4)+path('M566 133l24-24 13 31',c,4)
 def dots(x,y,w,h,fg,step=18,r=1.7):
  return ''.join(circle(xx,yy,r,fg) for xx in range(x,x+w,step) for yy in range(y,y+h,step))
 def label(n,fg=INK):return wordmark(fg)+text(STEPS[n],72,191,22,fg)
 def press(n):
  s=rect(0,0,1080,1350,PAPER)+label(n,BLUE)+headline(n,y=300,size=85,color=BLUE)
  s+=rect(0,697,1080,540,BLUE)+dots(720,713,360,504,PALE,17,1.4)
  s+=group(stamp(n,BLUE,PAPER,PAPER),175,820,1.12,-3 if n%2 else 0)
  s+=rect(48,686,984,100,PAPER)+lines(SUB[n],72,724,30,BLUE,1.22)
  return s+footer(n,BLUE)
 def margin(n):
  s=rect(0,0,1080,1350,'#FFFEF8')+wordmark(INK)+path('M126 158V1219',PALE,2)
  s+=text(f'{n+1:02}',68,232,28,BLUE)+headline(n,x=168,y=290,size=76)
  y=290+(len(CONTENT[n])-1)*76*1.08+22
  s+=path(f'M168 {y}Q470 {y-14} 877 {y+5}',BLUE,4)
  s+=group(stamp(n,INK,'#FFFEF8'),240,711,1.02,0)
  s+=path('M170 738C140 760 159 782 174 798M160 1045Q110 1110 176 1132',BLUE,3)
  s+=lines(SUB[n],168,1145,32,INK,1.22)
  return s+footer(n,INK)
 def torn(x,y,w,h,fill,seed=0):
  bottom=' '.join(f'{x+i*w/16:.1f},{y+h+math.sin(i*2.17+seed)*9:.1f}' for i in range(16,-1,-1))
  return f'<polygon points="{x},{y} {x+w},{y} {bottom}" fill="{fill}"/>'
 def collage(n):
  s=rect(0,0,1080,1350,'#DDEEF0')
  s+=group(torn(-110,785,940,640,BLUE,n),angle=-9)+group(torn(590,830,640,690,INK,n+2),angle=8)
  s+=circle(962,902,270,LIME)+torn(40,180,986,501,PAPER,n)+label(n,INK)
  # Label sits on the paper; all four title lines are printed as one coherent block.
  s+=rect(52,156,959,50,PAPER)+text(STEPS[n],72,190,22,INK)+headline(n,y=295,size=83)
  s+=group(stamp(n,INK,PAPER,PAPER),185,846,.95,-4 if n%2 else 4)
  s+=group(rect(0,0,832,113,PAPER)+lines(SUB[n],22,43,32,INK,1.2),75,711,1,-2)
  return s+rect(0,1236,1080,114,'#DDEEF0')+footer(n,INK)
 def night(n):
  s='<defs><radialGradient id="nightGlow"><stop stop-color="#167C93"/><stop offset="1" stop-color="#122E29"/></radialGradient></defs>'
  s+=rect(0,0,1080,1350,'#122E29')+circle(777,963,530,'url(#nightGlow)')+label(n,LIME)
  for j in range(7):s+=path(f'M-100 {810+j*43}C260 {980+j*20} 785 {624+j*53} 1220 {782+j*52}','#275A53',1.2)
  s+=headline(n,y=311,size=84,color=PAPER)+lines(SUB[n],74,732,34,PALE,1.22)
  s+=group(stamp(n,PALE,'#153932'),185,850,1.03)
  return s+footer(n,PALE)
 def index(n):
  s=rect(0,0,1080,1350,'#F4F3E8')+wordmark(INK)+path('M72 151H1008',INK,1)
  for j in range(6):s+=rect(72+j*157,174,145,12,LIME if j==n else '#D6DFD2',2)
  s+=text('THE REPORTING FILE',72,235,22,INK)+text(f'NOTE {n+1:02}',848,235,22,BLUE)
  s+=headline(n,y=347,size=83)
  s+=rect(72,750,936,428,PAPER,12,INK,1.4)+rect(72,750,142,428,INK,12)
  s+=text(str(n+1),107,863,91,LIME)+group(stamp(n,INK,PAPER),286,792,.91)
  s+=lines(SUB[n],236,1136,27,INK,1.15)
  return s+footer(n,INK)
 def blueprint(n):
  s=rect(0,0,1080,1350,'#E3F2F8')
  for x in range(0,1081,60):s+=path(f'M{x} 755V1237','#CADFEB',1)
  for y in range(755,1240,60):s+=path(f'M0 {y}H1080','#CADFEB',1)
  s+=label(n,BLUE)+headline(n,y=304,size=83,color=BLUE)+lines(SUB[n],74,702,33,INK,1.22)
  s+=group(stamp(n,BLUE,'#E3F2F8'),157,850,1.14)
  s+=path('M94 812V1210M72 836H1008M1008 812V1210M72 1190H1034',BLUE,1)
  for x,y in [(94,836),(1008,836),(94,1190),(1008,1190)]:s+=circle(x,y,5,PAPER,BLUE,1)
  return s+footer(n,BLUE)
 def spotlight(n):
  s=rect(0,0,1080,1350,BLUE)+label(n,PAPER)+headline(n,y=301,size=84,color=PAPER)
  s+=circle(770,1170,440,PAPER)+circle(-18,913,184,LIME)
  s+=lines(SUB[n],74,715,33,PAPER,1.22)
  # One enlarged object, or one simple relationship, takes over the lower canvas.
  if n==0:s+=vinyl(765,1133,261,BLUE,PAPER)
  elif n==1:s+=group(sheet(0,0,227,307,BLUE,PAPER,-12),531,897)+group(sheet(0,0,227,307,BLUE,PAPER,9),728,871)
  elif n==2:
   for i in range(4):s+=path(f'M{370+i*155} 820Q{460+i*140} 990 771 1083',BLUE,4)
   s+=circle(770,1105,107,BLUE)+circle(770,1105,31,LIME)
  elif n==3:s+=check(774,1108,207,BLUE,LIME)
  elif n==4:
   for x,y,num in [(637,1000,'1'),(873,1055,'2'),(708,1150,'3')]:s+=circle(x,y,73,BLUE)+text(num,x-17,y+20,55,PAPER)
  else:s+=path('M587 1190C479 896 910 838 967 1100',BLUE,11)+path('M919 1094l49 21 19-61',BLUE,11)
  return s+rect(0,1237,1080,113,BLUE)+footer(n,PAPER)
 def field(n):
  s=rect(0,0,1080,1350,'#F0F2E4')+label(n,INK)+headline(n,y=300,size=84,color=INK)
  s+=lines(SUB[n],74,722,33,INK,1.22)
  # Contours are an abstract landscape: the route progresses from scattered starts to a repeatable path.
  for j in range(18):
   y=785+j*27
   s+=path(f'M-120 {y}C170 {y-140} 358 {y+120} 618 {y+35}S931 {y-128} 1190 {y+36}','#BDCFB0',1.3)
  route=['M125 1027C184 854 505 867 625 1014S890 1163 944 937','M155 1070Q229 810 470 958T914 1025','M158 943Q370 1140 550 1000T948 935','M141 1100Q379 987 550 947T943 1104','M242 1040C201 796 916 825 866 1055S230 1235 242 1040','M126 1092Q390 883 622 989T950 982'][n]
  s+=path(route,BLUE,5)
  for x,y in [(155,1040),(550,980),(907,1015)]:s+=circle(x,y,18,PAPER,BLUE,3)
  s+=circle([155,155,550,550,907,907][n],[1040,1040,980,980,1015,1015][n],11,LIME)
  return s+rect(0,1237,1080,113,'#F0F2E4')+footer(n,INK)
 return [
  ('cobalt-press','Cobalt press','A two-color print edition: cobalt ink, warm paper and oversized editorial illustrations.',press),
  ('margin-notes','Margin notes','A working notebook with blue annotations, generous margins and understated ink drawings.',margin),
  ('cut-paper','Cut paper','Layered paper cutouts, torn edges and a consistent blue, lime and forest palette.',collage),
  ('night-shift','Night shift','Deep forest, a restrained pool of blue light and luminous line illustrations.',night),
  ('catalog-index','Catalog index','An orderly reference file: indexed tabs, numbered panels and concise visual explanations.',index),
  ('blueprint','Blueprint','Pale blue construction paper, fine guide lines and clear diagrams in blue ink.',blueprint),
  ('spotlight','Spotlight','A bold blue poster with one enlarged visual idea in a cropped cream spotlight.',spotlight),
  ('field-guide','Field guide','Soft botanical greens and contour drawings turn the story into a simple visual journey.',field),
 ]
