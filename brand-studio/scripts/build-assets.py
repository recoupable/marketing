#!/usr/bin/env python3
"""Build Recoup Brand Studio v1. Requires fontTools, Pillow, numpy, Node/sharp, ffmpeg.

Run from any directory: python3 scripts/build-assets.py [--no-motion]
SVG templates keep editable text and embedded fonts; PNGs are rendered from the
same SVG with text outlined using the bundled fonts. Logo SVGs are fully outlined.
MP4s use exact exported logo artwork, 24 fps, H.264 / yuv420p, no audio.
All proposed editorial content is illustrative, never evidence of a client result.
"""
from pathlib import Path
from io import BytesIO
import argparse, base64, html, json, math, os, subprocess
import xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
BLUE, LIME, GREEN, INK, WHITE, PALE = '#007EBD', '#D6FF62', '#132B26', '#152E37', '#FFFFFF', '#F0F7FA'
# Verbatim PageMark from components/sky/brand.tsx; keep this geometry unchanged.
MARK = 'M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z'
MANIFEST = []
FONT_CACHE = {}
IMAGE_CACHE = {}
ET.register_namespace('', 'http://www.w3.org/2000/svg')

def font(family='sans', weight=450):
    key = (family, weight)
    if key not in FONT_CACHE:
        p = ASSETS / 'fonts' / ('ibm-plex-mono.woff2' if family == 'mono' else 'dm-sans.woff2')
        f = TTFont(p)
        if 'fvar' in f: f = instantiateVariableFont(f, {'wght': weight}, inplace=True)
        FONT_CACHE[key] = f
    return FONT_CACHE[key]

def glyph_run(value, family='sans', weight=450):
    """Apply static GPOS pair kerning after variable-font instantiation."""
    f = font(family, weight)
    cmap = f.getBestCmap()
    names = [cmap.get(ord(c), '.notdef') for c in value]
    advances = [f['hmtx'][n][0] for n in names]
    # DMSans uses standard GPOS pair adjustment. This preserves its wordmark kerning.
    if 'GPOS' in f:
        table = f['GPOS'].table
        indices = set()
        for feature in table.FeatureList.FeatureRecord:
            if feature.FeatureTag == 'kern': indices.update(feature.Feature.LookupListIndex)
        for ix in indices:
            lookup = table.LookupList.Lookup[ix]
            for sub in lookup.SubTable:
                if lookup.LookupType == 9: sub = sub.ExtSubTable
                if not hasattr(sub, 'PairSet') and not hasattr(sub, 'Class1Record'): continue
                covered = sub.Coverage.glyphs
                for i in range(len(names)-1):
                    a,b = names[i:i+2]
                    if a not in covered: continue
                    val = None
                    if sub.Format == 1:
                        for pair in sub.PairSet[covered.index(a)].PairValueRecord:
                            if pair.SecondGlyph == b: val=pair.Value1; break
                    elif sub.Format == 2:
                        c1=sub.ClassDef1.classDefs.get(a,0); c2=sub.ClassDef2.classDefs.get(b,0)
                        val=sub.Class1Record[c1].Class2Record[c2].Value1
                    if val: advances[i] += getattr(val,'XAdvance',0) or 0
    return f,names,advances

def measure(value, size, weight=450, family='sans', tracking=None):
    f,names,adv=glyph_run(value,family,weight)
    tracking=(-.045*size if family=='sans' else .06*size) if tracking is None else tracking
    return sum(adv)*size/f['head'].unitsPerEm + max(0,len(names)-1)*tracking

def outline(value,x,y,size=48,fill=INK,weight=450,family='sans',tracking=None,anchor='start'):
    tracking=(-.045*size if family=='sans' else .06*size) if tracking is None else tracking
    f,names,adv=glyph_run(value,family,weight)
    scale=size/f['head'].unitsPerEm
    width=sum(adv)*scale+max(0,len(names)-1)*tracking
    if anchor=='middle': x-=width/2
    elif anchor=='end': x-=width
    result=[]; glyphs=f.getGlyphSet()
    for name,advance in zip(names,adv):
        pen=SVGPathPen(glyphs); glyphs[name].draw(pen)
        if pen.getCommands(): result.append(f'<path d="{pen.getCommands()}" transform="translate({x:.4f} {y:.4f}) scale({scale:.6f} {-scale:.6f})"/>')
        x+=advance*scale+tracking
    return f'<g fill="{fill}" aria-label="{html.escape(value,quote=True)}">'+''.join(result)+'</g>'

def text(value,x,y,size=48,fill=INK,weight=450,family='sans',tracking=None,anchor='start'):
    tracking=(-.045*size if family=='sans' else .06*size) if tracking is None else tracking
    name='IBM Plex Mono' if family=='mono' else 'DM Sans'
    return f'<text x="{x}" y="{y}" font-family="{name}" font-size="{size}" font-weight="{weight}" letter-spacing="{tracking}" text-anchor="{anchor}" fill="{fill}">{html.escape(value)}</text>'

def lines(values,x,y,size=80,fill=INK,leading=1.04,weight=450):
    return ''.join(text(v,x,y+i*size*leading,size,fill,weight) for i,v in enumerate(values))

def rect(x,y,w,h,fill=WHITE,r=0,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" {extra}/>'

def line(x1,y1,x2,y2,color=INK,width=2,extra=''):
    return f'<path d="M{x1} {y1}H{x2}" stroke="{color}" stroke-width="{width}" {extra}/>' if y1==y2 else f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}" stroke-width="{width}" {extra}/>'

def mark(x,y,h=100,color=INK):
    s=h/141
    return f'<g transform="translate({x} {y}) scale({s}) translate(-48 -41)"><path d="{MARK}" fill="{color}"/></g>'

def lockup(x,y,h=56,color=INK):
    # Footer brand: 23x28 symbol, 11px gap, 28px wordmark, -1.1px tracking.
    # SVG preserveAspectRatio centers the 127:141 path within the 23x28 box.
    scale=h/28; actual_h=141*23/127
    symbol=mark(x,y+(28-actual_h)/2*scale,actual_h*scale,color)
    # Font ascent+descent centers the line box. Baseline from CSS metrics.
    return symbol+outline('Recoup',x+34*scale,y+23.548*scale,28*scale,color,600,tracking=-1.1*scale)

FONT_CSS=''
def svg(w,h,body,title='Recoup editable artwork',fonts=True):
    global FONT_CSS
    if not FONT_CSS:
        for name,file in [('DM Sans','dm-sans.woff2'),('IBM Plex Mono','ibm-plex-mono.woff2')]:
            data=base64.b64encode((ASSETS/'fonts'/file).read_bytes()).decode()
            FONT_CSS+=f'@font-face{{font-family:"{name}";src:url(data:font/woff2;base64,{data}) format("woff2");font-weight:100 1000;}}'
    defs='''<defs><filter id="shadow" x="-30%" y="-30%" width="170%" height="190%"><feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#152E37" flood-opacity=".13"/></filter><linearGradient id="matte" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFFFFF" stop-opacity=".08"/><stop offset="1" stop-color="#132B26" stop-opacity=".02"/></linearGradient></defs>'''
    style=f'<style>{FONT_CSS}</style>' if fonts else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><title>{html.escape(title)}</title>{style}{defs}{body}</svg>'

def image_data(path):
    p=Path(path)
    # librsvg does not decode embedded WebP consistently. Store the original
    # decoded pixels as PNG inside SVG, so exports remain self-contained.
    if p not in IMAGE_CACHE:
        stream=BytesIO(); Image.open(p).save(stream,format='PNG')
        IMAGE_CACHE[p]='data:image/png;base64,'+base64.b64encode(stream.getvalue()).decode()
    return IMAGE_CACHE[p]

def backdrop(name,w,h,opacity=1):
    return f'<image href="{image_data(ASSETS/"environments"/name)}" x="0" y="0" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice" opacity="{opacity}"/>'

def outlines_for_render(source):
    root=ET.fromstring(source)
    def visit(parent):
        for i,el in enumerate(list(parent)):
            if el.tag.endswith('}text'):
                a=el.attrib
                fragment=outline(''.join(el.itertext()),float(a['x']),float(a['y']),float(a.get('font-size',48)),a.get('fill',INK),int(a.get('font-weight',450)),'mono' if 'Mono' in a.get('font-family','') else 'sans',float(a.get('letter-spacing',0)),a.get('text-anchor','start'))
                replacement=ET.fromstring(fragment)
                parent.remove(el); parent.insert(i,replacement)
            else: visit(el)
    visit(root)
    return ET.tostring(root,encoding='unicode')

def render(source,output):
    prepared=outlines_for_render(source)
    code="const sharp=require('sharp'); let b=[]; process.stdin.on('data',d=>b.push(d)); process.stdin.on('end',()=>sharp(Buffer.concat(b),{limitInputPixels:false}).png().toFile(process.argv[1]).catch(e=>{console.error(e);process.exit(1)}));"
    subprocess.run(['node','-e',code,str(output)],input=prepared.encode(),cwd=ROOT.parent,check=True,capture_output=True)

def save(category,id,title,w,h,body,description,recipe=None,fonts=True):
    directory=ASSETS/category; directory.mkdir(parents=True,exist_ok=True)
    s=svg(w,h,body,title,fonts)
    sp=directory/f'{id}.svg'; pp=directory/f'{id}.png'
    sp.write_text(s); render(s,pp)
    item={'id':id,'title':title,'category':category,'status':'proposed','description':description,'preview':str(pp.relative_to(ROOT)),'files':[{'label':'Editable SVG' if fonts else 'Outlined SVG','path':str(sp.relative_to(ROOT))},{'label':'PNG','path':str(pp.relative_to(ROOT))}],'width':w,'height':h}
    if recipe: item['recipeId']=recipe
    MANIFEST.append(item)
    print(f'Built {category}/{id}',flush=True)

def label(value,x,y,color=INK,size=21):
    return text(value.upper(),x,y,size,color,400,'mono',tracking=size*.08)

def footer(w,h,color=INK,note='EDITABLE TEMPLATE'):
    return line(72,h-130,w-72,h-130,color,1,extra='opacity=".22"')+label(note,72,h-74,color,18)+mark(w-111,h-108,44,color)

def page(x,y,w,h,title,rows=4,color=WHITE,angle=0):
    body=rect(x,y,w,h,color,14,'filter="url(#shadow)"')+label(title,x+35,y+54,INK,18)
    body+=line(x+35,y+80,x+w-35,y+80,INK,1,extra='opacity=".16"')
    for n in range(rows):
        yy=y+122+n*48
        body+=rect(x+35,yy,w-110-(n%3)*32,7,INK,3,'opacity=".17"')
        body+=rect(x+35,yy+17,w-145-(n%2)*24,5,INK,2,'opacity=".08"')
    return f'<g transform="rotate({angle} {x+w/2} {y+h/2})">{body}</g>'

def build_logos():
    for name,color in [('ink',INK),('white',WHITE),('blue',BLUE),('lime',LIME)]:
        save('logos',f'symbol-{name}',f'Recoup symbol / {name}',384,424,mark(38,41,342,color),'Exact current PageMark geometry. Transparent background; proposed production export.',fonts=False)
        save('logos',f'lockup-{name}',f'Recoup lockup / {name}',1280,320,lockup(74,48,224,color),'Current symbol plus outlined DM Sans 600, original 11px gap and -1.1px tracking scaled together. Transparent background; proposed production export.',fonts=False)

def build_podcast():
    w,h=1920,1080
    sky=backdrop('open-sky.webp',w,h)+rect(0,0,w,220,BLUE,extra='opacity=".12"')
    sky+=lockup(84,67,66,WHITE)+label('THE RECOUP PODCAST',1834,120,WHITE,26).replace('text-anchor="start"','text-anchor="end"')
    sky+=line(84,974,1836,974,WHITE,1,extra='opacity=".7"')+label('MUSIC · BUSINESS · AI',84,1021,INK,21)
    save('podcast','podcast-open-sky','The Recoup Podcast / Open sky',w,h,sky,'The Recoup Podcast. 1920 × 1080 background with open center for camera or episode content. Uses the existing Sky environment unchanged. Proposed layout.')
    studio=rect(0,0,w,h,GREEN)+rect(0,0,w,h,'url(#matte)')
    for xx in [1260,1376,1492,1608,1724,1840]: studio+=rect(xx,0,52,h,WHITE,extra='opacity=".016"')
    studio+=lockup(84,67,66,WHITE)+rect(1736,77,100,13,LIME,6)
    studio+=line(84,974,1836,974,WHITE,1,extra='opacity=".18"')+label('THE RECOUP PODCAST',84,1021,WHITE,21)
    save('podcast','podcast-dark-studio','The Recoup Podcast / Dark studio',w,h,studio,'The Recoup Podcast. 1920 × 1080 matte dark-green studio with quiet upper-left light and open camera area. Proposed layout.')
    editorial=rect(0,0,w,h,WHITE)+rect(0,0,40,h,BLUE)+lockup(108,67,66,INK)
    editorial+=label('THE RECOUP PODCAST',1810,120,INK,20).replace('text-anchor="start"','text-anchor="end"')
    editorial+=line(108,974,1812,974,INK,1,extra='opacity=".2"')+label('MUSIC · BUSINESS · AI',108,1021,INK,21)+rect(1698,1000,114,18,LIME,9)
    save('podcast','podcast-editorial-white','The Recoup Podcast / Editorial white',w,h,editorial,'The Recoup Podcast. 1920 × 1080 clean editorial background with blue spine and open center. Proposed layout.')

def build_social():
    w,h=1080,1350
    b=rect(0,0,w,h,PALE)+lockup(72,68,51,INK)+label('INSIGHT',72,259)
    b+=lines(['Start with','the workflow.'],72,383,107)+lines(['Choose one recurring task.', 'Find the inputs, output, and reviewer.'],76,637,31,INK,1.45)
    b+=rect(72,801,936,294,WHITE,22)+label('A USEFUL FIRST QUESTION',108,855,INK,19)+lines(['What does your team','repeat every week?'],108,936,64,INK,1.08)+footer(w,h,note='SAMPLE INSIGHT · REPLACE BEFORE PUBLISHING')
    save('social','social-insight','Social / Insight',w,h,b,'1080 × 1350 editable insight layout. Demonstration copy; replace with reviewed content.','insight')
    b=rect(0,0,w,h,GREEN)+lockup(72,68,51,WHITE)+label('QUOTE',72,260,WHITE)
    b+=text('“',63,478,248,LIME)+lines(['Add the exact','quote here.'],72,594,105,WHITE,1.1)
    b+=line(76,909,152,909,LIME,5)+text('Speaker name',76,981,39,WHITE,500)+text('Role or episode',76,1033,28,WHITE,400,tracking=-.4)+footer(w,h,WHITE,'QUOTE TEMPLATE · CONFIRM ATTRIBUTION')
    save('social','social-quote','Social / Quote',w,h,b,'1080 × 1350 quote template. Placeholder only; no endorsement or quotation is asserted.','quote')
    b=backdrop('open-sky.webp',w,h)+rect(0,0,w,h,BLUE,extra='opacity=".12"')+lockup(72,68,51,WHITE)
    b+=rect(72,298,936,685,WHITE,28,'filter="url(#shadow)"')+label('ANNOUNCEMENT',118,376,INK,20)
    b+=lines(['Your next','announcement.'],118,498,88)+lines(['Add what is launching, who it is for,', 'and where readers can find it.'],122,725,31,INK,1.45)
    b+=rect(118,847,376,73,LIME,37)+label('ADD DATE / DESTINATION',146,892,INK,16)+footer(w,h,INK,'ANNOUNCEMENT TEMPLATE')
    save('social','social-announcement','Social / Announcement',w,h,b,'1080 × 1350 announcement template using the existing Sky environment. Placeholder launch and destination.','announcement')
    b=rect(0,0,w,h,WHITE)+lockup(72,68,51,INK)+label('CASE STUDY',72,251)
    b+=lines(['Name the work.','Show the result.'],72,371,93)
    for yy,num,heading,copy in [(681,'01','The problem','Describe the original task.'),(831,'02','What we built','Describe the delivered system.'),(981,'03','The result','Use a documented outcome.')]:
        b+=line(72,yy-36,1008,yy-36,INK,1,extra='opacity=".2"')+label(num,72,yy+5,INK,22)+text(heading,147,yy+5,37,INK,500)+text(copy,147,yy+55,27,INK,400,tracking=-.3)
    b+=footer(w,h,note='CASE STUDY TEMPLATE · NO CLIENT RESULT IMPLIED')
    save('social','social-case-study','Social / Case study',w,h,b,'1080 × 1350 case study framework. All outcome fields are placeholders; add source-backed work only.','case-study')
    b=rect(0,0,w,h,PALE)+lockup(72,68,51,INK)+label('CAROUSEL / 01 OF 05',72,260)
    b+=lines(['Choose your','first AI project.'],72,380,96)
    for i,(title,sub) in enumerate([('A repeated task','Enough repetition to be useful.'),('Available inputs','Information your team can access.'),('A clear reviewer','Someone who can check the result.')]):
        yy=661+i*155
        b+=rect(72,yy,936,129,WHITE,16)+label(str(i+1).zfill(2),105,yy+52,INK,23)+text(title,174,yy+51,36,INK,500)+text(sub,174,yy+94,25,INK,400,tracking=-.2)
    b+=footer(w,h,note='CAROUSEL TEMPLATE · EDIT SLIDE NUMBER')
    save('social','social-carousel','Social / Carousel',w,h,b,'1080 × 1350 editable carousel opener with three example selection criteria. Duplicate and update slide numbers.','carousel')
    w,h=1080,1920
    b=rect(0,0,w,h,GREEN)+lockup(72,67,50,WHITE)+label('THE RECOUP PODCAST',72,225,WHITE)
    b+=lines(['Episode title','goes here.'],72,338,83,WHITE,1.07)
    b+=rect(72,535,936,961,PALE,24)+rect(462,920,156,156,WHITE,78)+f'<path d="M523 965L568 998L523 1031Z" fill="{INK}"/>'
    b+=label('REPLACE WITH VIDEO',540,1130,INK,19).replace('text-anchor="start"','text-anchor="middle"')
    b+=text('Speaker name / guest',72,1607,39,WHITE,500)+text('Add a short caption or takeaway.',72,1661,29,WHITE,400,tracking=-.4)+footer(w,h,WHITE,'VERTICAL CLIP · 1080 × 1920')
    save('social','social-podcast-clip','The Recoup Podcast / Vertical clip',w,h,b,'The Recoup Podcast. 1080 × 1920 editable vertical clip frame with explicit video and speaker placeholders. Canvas dimensions only; platform crop varies.','podcast-clip')
    for id,title,w,h in [('banner-linkedin','LinkedIn banner',1584,396),('banner-youtube','YouTube banner',2560,1440),('banner-x','X banner',1500,500)]:
        b=rect(0,0,w,h,GREEN)
        if id=='banner-youtube':
            b+=lockup(938,637,89,WHITE)+label('MUSIC · BUSINESS · AI',1280,793,WHITE,24).replace('text-anchor="start"','text-anchor="middle"')
            b+=rect(80,80,48,13,LIME,6)+label('YOUTUBE / 2560 × 1440',80,h-68,WHITE,21)
        else:
            b+=lockup(77,72,65,WHITE)+lines(['AI for the business of music.'],77,h-111,58,WHITE)+label(f'{title.upper()} / {w} × {h}',w-70,99,WHITE,15).replace('text-anchor="start"','text-anchor="end"')+rect(w-169,h-105,100,13,LIME,6)
        save('social',id,title+f' / {w} × {h}',w,h,b,f'Editable {w} × {h} working canvas. Target dimensions are labeled. Verify current platform crop and profile overlays before publication; no universal safe-area claim.')

def build_editorial():
    w,h=1600,1000
    def base(title,kicker,color=PALE,ink=INK):
        return rect(0,0,w,h,color)+label(kicker,76,93,ink,26 if color==BLUE else 20)+lines(title,76,198,82,ink,1.04)+lockup(76,891,46,ink)
    # 1 — A readable report connected to a source sheet.
    b=base(['How to review','royalty statements.'],'OPERATIONS / FIELD NOTES')
    b+=page(890,272,480,545,'SOURCE STATEMENT',6,WHITE,9)+page(658,401,490,454,'ROYALTY REVIEW',4,WHITE,-7)
    b+=rect(712,610,388,83,LIME,9)+label('CHECK THE DIFFERENCE',738,659,INK,17)
    save('editorial','editorial-royalty-review','Editorial / Royalty review',w,h,b,'Original vector cover: two physical-feeling documents and a review note. Educational title; no financial result implied.')
    # 2 — Transparent input and review logic, not invented financial charts.
    b=base(['Build an investment','review your team can check.'],'INVESTMENT / METHODS',GREEN,WHITE)
    b+=page(833,337,535,547,'INVESTMENT REVIEW',6,WHITE,5)
    b+=rect(632,452,380,179,LIME,15,'filter="url(#shadow)"')+label('SOURCE / QUESTION',665,499,INK,18)+lines(['What supports','this assumption?'],665,554,42)
    save('editorial','editorial-investment-review','Editorial / Investment review',w,h,b,'Original vector cover: a review document and a concrete diligence question. No fabricated investment performance.')
    # 3 — Ordered catalog index cards.
    b=base(['Make catalog data','easier to find.'],'CATALOG / PRACTICE',WHITE)
    for i,(name,col) in enumerate([('SOURCE FILES',PALE),('MATCHED RECORDS',BLUE),('CATALOG INDEX',GREEN)]):
        x=699+i*152; y=400+i*91
        b+=rect(x,y-29,197,42,col,12)+rect(x,y,470,240,col,17,'filter="url(#shadow)"')
        c=INK if i==0 else WHITE
        b+=label(name,x+33,y+57,c,24 if i==1 else 17)+line(x+33,y+90,x+433,y+90,c,1,extra='opacity=".22"')
        for n in range(3): b+=rect(x+33,y+124+n*29,278-n*31,6,c,3,'opacity=".28"')
    save('editorial','editorial-catalog-index','Editorial / Catalog index',w,h,b,'Original vector cover: sorted folders make the catalog task visible. No invented artist or client records.')
    # 4 — A workflow with concrete labels and a human review stage.
    b=base(['Map the work','before automating it.'],'AI STRATEGY / WORKFLOW',PALE)
    for i,(title,sub,col) in enumerate([('Collect','INPUTS',WHITE),('Prepare','DRAFT',BLUE),('Review','HUMAN',LIME)]):
        x=210+i*434; y=520+(34 if i==1 else 0)
        if i<2: b+=line(x+327,y+118,x+421,y+118,INK,2)
        b+=rect(x,y,327,235,col,23,'filter="url(#shadow)"')
        c=WHITE if i==1 else INK
        b+=label(sub,x+34,y+56,c,24 if i==1 else 19)+text(title,x+31,y+157,54,c)
    save('editorial','editorial-workflow','Editorial / Workflow mapping',w,h,b,'Original vector cover: collect, prepare, and review stages. Concrete labels describe the work.')
    # 5 — Quiet training notebook, tabbed and useful.
    b=base(['Write the playbook','your team will use.'],'TEAM TRAINING / PLAYBOOKS',BLUE,WHITE)
    b+=rect(832,334,83,531,LIME,14)+page(702,335,607,527,'TEAM PLAYBOOK',5,WHITE,-5)
    b+=rect(739,695,468,90,PALE,8)+text('How to check the output',764,750,36)
    for i in range(7): b+=f'<circle cx="718" cy="{394+i*61}" r="9" fill="{GREEN}"/>'
    save('editorial','editorial-team-playbook','Editorial / Team playbook',w,h,b,'Original vector cover: a working notebook with explicit review instructions. Proposed artwork.')
    # 6 — Source comparison as marked rows; no numerical success theater.
    b=base(['Trace every answer','back to its source.'],'DATA / SOURCE REVIEW',WHITE)
    b+=page(523,453,442,380,'ORIGINAL RECORD',3,PALE,-7)+page(1001,354,442,478,'REVIEWED ANSWER',5,WHITE,6)
    b+=line(860,654,1111,568,BLUE,8)+f'<circle cx="860" cy="654" r="16" fill="{LIME}"/>'+f'<circle cx="1111" cy="568" r="16" fill="{LIME}"/>'
    b+=rect(549,746,576,85,GREEN,14)+label('KEEP THE EVIDENCE ATTACHED',582,797,WHITE,20)
    save('editorial','editorial-source-trace','Editorial / Source trace',w,h,b,'Original vector cover: source and answer sheets connected by a visible reference. No fictional citations.')
    # 7 — Tools represented as working cards and a real review queue.
    b=base(['Connect the tools','your team already uses.'],'CUSTOM SYSTEMS / CONNECTIONS',GREEN,WHITE)
    for i,(lab,xx,yy) in enumerate([('FILES',748,399),('NOTES',1227,399),('REVIEW QUEUE',862,680)]):
        width=268 if i<2 else 498
        b+=rect(xx,yy,width,166,WHITE if i<2 else LIME,18,'filter="url(#shadow)"')+label(lab,xx+28,yy+50,INK,20)
        b+=rect(xx+28,yy+92,width-91,7,INK,3,'opacity=".22"')+rect(xx+28,yy+113,width-126,5,INK,2,'opacity=".1"')
    b+=f'<path d="M882 565V617H1111V680M1361 565V617H1111" fill="none" stroke="{WHITE}" stroke-width="3" stroke-opacity=".6"/>'
    save('editorial','editorial-connected-tools','Editorial / Connected tools',w,h,b,'Original vector cover: files and notes flow into a review queue. No third-party marks or unsupported integration claims.')
    # 8 — Clear release checklist rather than a decorative abstract slogan.
    b=base(['Put a reviewer','in the release plan.'],'OPERATIONS / RELEASES',PALE)
    b+=page(791,298,560,565,'RELEASE CHECKLIST',0,WHITE,4)
    for i,t in enumerate(['Confirm the source','Review the draft','Approve the final file','Record what changed']):
        yy=435+i*88
        b+=rect(844,yy-25,31,31,LIME if i<3 else PALE,5)+text(t,899,yy,30,INK,400,tracking=-.6)
        if i<3: b+=f'<path d="M852 {yy-11}l6 6 11-14" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    save('editorial','editorial-release-review','Editorial / Release review',w,h,b,'Original vector cover: a release checklist with an explicit reviewer and change record. Educational example, not a completed client checklist.')

def build_motion():
    directory=ASSETS/'motion'; directory.mkdir(parents=True,exist_ok=True)
    w,h,fps=1920,1080,24
    yy,xx=np.mgrid[0:h,0:w]
    glow=np.maximum(0,1-np.sqrt(((xx-180)/1900)**2+((yy-80)/1250)**2))*.045
    c=np.array([19,43,38]); base=np.uint8(c+(255-c)*glow[:,:,None]); base_image=Image.fromarray(base,'RGB')
    logo=Image.open(ASSETS/'logos'/'lockup-white.png').convert('RGBA')
    logo=logo.crop(logo.getbbox())
    logo.thumbnail((720,180),Image.Resampling.LANCZOS)
    ffmpeg=os.environ.get('FFMPEG','/opt/homebrew/bin/ffmpeg')
    def encode(id,title,seconds,make_frame,description):
        path=directory/f'{id}.mp4'
        command=[ffmpeg,'-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(path)]
        proc=subprocess.Popen(command,stdin=subprocess.PIPE,stderr=subprocess.PIPE)
        for f in range(seconds*fps):
            frame=make_frame(f/fps)
            if f==min(seconds*fps-1,fps): frame.save(directory/f'{id}-poster.png')
            proc.stdin.write(frame.tobytes())
        proc.stdin.close(); error=proc.stderr.read(); result=proc.wait()
        if result: raise RuntimeError(error.decode())
        MANIFEST.append({'id':id,'title':title,'category':'motion','status':'proposed','description':description,'preview':f'assets/motion/{id}-poster.png','files':[{'label':'MP4 · H.264','path':f'assets/motion/{id}.mp4'},{'label':'Poster PNG','path':f'assets/motion/{id}-poster.png'},{'label':'Editable generating source','path':'scripts/build-assets.py'}],'width':w,'height':h})
        print(f'Built motion/{id}',flush=True)
    def ease(n): n=min(1,max(0,n)); return n*n*(3-2*n)
    def intro(t):
        frame=base_image.copy(); alpha=ease((t-.15)/.7)
        l=logo.copy(); l.putalpha(l.getchannel('A').point(lambda v:int(v*alpha)))
        frame.paste(l,((w-l.width)//2,(h-l.height)//2+round(14*(1-alpha))),l); return frame
    def outro(t):
        frame=base_image.copy(); alpha=1-ease((t-1.8)/.85)
        l=logo.copy(); l.putalpha(l.getchannel('A').point(lambda v:int(v*alpha)))
        frame.paste(l,((w-l.width)//2,(h-l.height)//2),l); return frame
    encode('logo-intro','Logo intro / 3 seconds',3,intro,'1920 × 1080, 24 fps, 3 seconds, silent H.264 MP4. Exact outlined lockup fades in over matte dark green. Proposed motion; editable generator included.')
    encode('logo-outro','Logo outro / 3 seconds',3,outro,'1920 × 1080, 24 fps, 3 seconds, silent H.264 MP4. Matching lockup holds and fades to dark green. Proposed motion; editable generator included.')
    sky=Image.open(ASSETS/'environments'/'open-sky.webp').convert('RGB').resize((1984,1122),Image.Resampling.LANCZOS)
    def loop(t):
        # Sinusoidal position and velocity repeat at eight seconds: no jump cut.
        x=32+round(20*math.sin(2*math.pi*t/8)); y=21+round(7*math.cos(2*math.pi*t/8))
        return sky.crop((x,y,x+w,y+h))
    encode('sky-background-loop','Sky background loop / 8 seconds',8,loop,'1920 × 1080, 24 fps, 8 seconds, silent H.264 loop. Existing sky drifts subtly on a repeating path. Use the still background for reduced-motion viewing.')

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--no-motion',action='store_true'); args=parser.parse_args()
    build_logos(); build_podcast(); build_social(); build_editorial()
    if not args.no_motion: build_motion()
    elif (ROOT/'asset-manifest.json').exists():
        # A still-only rebuild must not remove the already exported motion kit.
        MANIFEST.extend(item for item in json.loads((ROOT/'asset-manifest.json').read_text()) if item['category']=='motion')
    (ROOT/'asset-manifest.json').write_text(json.dumps(MANIFEST,indent=2)+'\n')
    print(f'Exported {len(MANIFEST)} assets and manifest to {ROOT}',flush=True)

if __name__=='__main__': main()
