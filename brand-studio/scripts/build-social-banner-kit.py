#!/usr/bin/env python3
"""Platform-specific Blue sweep exports. Dimensions researched 2026-09-13.
Retains the selected vector artwork; backgrounds scale independently of type.
"""
from pathlib import Path
import importlib.util, json, html, zipfile, subprocess, shutil
R=Path(__file__).resolve().parents[1]
O=R/'assets/social-banner-kit'; O.mkdir(exist_ok=True)
spec=importlib.util.spec_from_file_location('kit',R/'scripts/render-podcast-kit-v2.py')
kit=importlib.util.module_from_spec(spec); spec.loader.exec_module(kit)
INK='#152E37'; GREEN='#132B26'; LIME='#D6FF62'; WHITE='#FFFFFF'
def t(s,x,y,size=52,c=INK,w=450):return f'<text x="{x}" y="{y}" font-family="DM Sans" font-size="{size}" font-weight="{w}" letter-spacing="{-size*.04}" fill="{c}">{html.escape(s)}</text>'

def rect(x,y,w,h,c,rx=0,extra=''):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{c}" {extra}/>'

def logo(x,y,c=INK,scale=.22):
 s=(R/'assets/logos/lockup-ink.svg').read_text();b=s[s.index('<g transform='):s.rindex('</svg>')].replace('#152E37',c)
 return f'<g transform="translate({x-74*scale} {y-57.8583*scale}) scale({scale})">{b}</g>'

def artcard(x,y,angle,fill,lines,kind,c=INK):
 content=rect(0,0,188,246,fill,14,'stroke="#FFFFFF" stroke-opacity=".5" stroke-width="1.5"')
 # Small top illustrations describe the work without invented data or metrics.
 if kind=='report':
  content+=rect(18,26,48,51,'none',5,f'stroke="{c}" stroke-opacity=".45" stroke-width="1.3"')
  for j,w in enumerate([26,19,28]):content+=rect(26,36+j*10,w,3,'#007EBD',1, 'opacity=".75"')
 elif kind=='catalog':
  for j in range(3):content+=rect(20+j*14,29+j*6,39,42,'none',5,f'stroke="{c}" stroke-width="1.3" opacity="{.3+j*.25}"')
  content+=f'<circle cx="67" cy="61" r="9" fill="{c}"/><circle cx="67" cy="61" r="2" fill="{fill}"/>'
 else:
  content+=rect(19,27,43,52,'none',5,'stroke="#B9D6CE" stroke-width="1.2"')
  content+='<path d="M28 42h23 M28 51h15" stroke="#B9D6CE" stroke-width="2"/>'
  content+='<circle cx="62" cy="69" r="13" fill="#D6FF62"/><path d="m56 69 4 4 8-9" stroke="#132B26" stroke-width="2" fill="none"/>'
 for i,s in enumerate(lines):content+=t(s,17,125+i*31,26,c)
 content+=f'<path d="M18 185H170" stroke="{c}" stroke-opacity=".14"/>'
 if kind=='report':
  for j,w in enumerate([114,90,132]):content+=rect(18,198+j*9,w,2,c,1,'opacity=".15"')
 elif kind=='catalog':
  for j in range(8):content+=rect(18+j*19,199,12,21,c,2,f'opacity="{.08+(j%3)*.04}"')
 else:
  content+=f'<path d="M18 202h68 M18 214h106" stroke="{c}" stroke-opacity=".2" stroke-width="2"/>'
 return f'<g transform="translate({x} {y}) rotate({angle} 94 123)" filter="url(#shadow)">{content}</g>'

DEFS=f'''<style>{kit.FONT_CSS}</style><filter id="shadow" x="-40%" y="-30%" width="185%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#102B31" flood-opacity=".2"/></filter><linearGradient id="azure" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#075CC5"/><stop offset="1" stop-color="#169AD7"/></linearGradient><linearGradient id="lightplane" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#A9EFFF" stop-opacity="0"/><stop offset="1" stop-color="#A9EFFF" stop-opacity=".35"/></linearGradient>'''

def background(w,h):
    return rect(0,0,w,h,'url(#azure)')+f'''<g transform="scale({w/1584} {h/396})"><path d="M-50 410C180 180 700 550 1584 75V396H-50Z" fill="url(#lightplane)"/><path d="M-50 410C180 180 700 550 1584 75" fill="none" stroke="#C2EDFF" stroke-width="1.5" opacity=".26"/><path d="M1130 -100C960 30 1190 170 1710 65" stroke="#0B4E92" stroke-width="100" fill="none" opacity=".15"/></g>'''

def fan(x,y,s=1,words=True):
    labels=[['Royalty','reporting.'],['Investment','review.'],['Catalog','intelligence.']] if words else [[],[],[]]
    return f'<g transform="translate({x} {y}) scale({s})">'+artcard(0,22,-8,WHITE,labels[0],'report')+artcard(330,16,9,GREEN,labels[1],'review',WHITE)+artcard(155,0,0,LIME,labels[2],'catalog')+'</g>'

def copy(x,y,size,sub_y,sub_size,lines=None):
    lines=lines or ['AI transformation','for music rightsholders']
    return ''.join(t(line,x,y+i*(size+7),size,WHITE) for i,line in enumerate(lines))+t('AI strategy. Custom systems. Team training.',x+2,sub_y,sub_size,'#D2F2FF',400)

def scene(w,h,l,c,f,view=None,words=True):
    vw,vh=view or (w,h)
    body=background(vw,vh)
    if (w,h)==(2560,1440):
        # A second sweep crosses the visible channel strip; the TV field stays continuous.
        body+='<path d="M-100 930C420 780 1100 1170 2660 650V1440H-100Z" fill="url(#lightplane)"/><path d="M-100 930C420 780 1100 1170 2660 650" stroke="#C2EDFF" stroke-width="1.5" opacity=".26" fill="none"/>'
    if f: body+=fan(*f,words=words)
    if l: body+=logo(l[0],l[1],WHITE,l[2])
    if c: body+=copy(*c)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {vw} {vh}"><defs>{DEFS}</defs>{body}</svg>'

items=[]; renders=[]
def add(slug,title,w,h,svg,note,source,spec,kind='Cover',limit=None):
    (O/f'{slug}.svg').write_text(svg)
    renders.append((svg,O/f'{slug}.png'))
    items.append(dict(id='social-kit-'+slug,slug=slug,title=title,width=w,height=h,description=note,source=source,spec=spec,kind=kind,limit=limit,group='social',preview=f'assets/social-banner-kit/{slug}.png',files=[dict(label='PNG',path=f'assets/social-banner-kit/{slug}.png'),dict(label='Editable SVG',path=f'assets/social-banner-kit/{slug}.svg')],collection='Blue sweep / '+('companion posts' if kind=='Companion' else 'platform kit'),current=True,tool=f'social-banner-kit.html#{slug}'))

add('linkedin-personal','LinkedIn · personal',1584,396,(R/'assets/linkedin-art/blue-sweep.svg').read_text(),'Your selected banner, preserved exactly. Lower-left stays clear for the profile photo.','https://www.linkedin.com/help/linkedin/answer/a568217/?lang=en-US','Recommended 1584 × 396; JPG or PNG; under 8 MB.',limit=8_000_000)
add('linkedin-company','LinkedIn · company Page',4200,700,scene(4200,700,(88,45,.14),(535,138,48,258,22),(1510,47,.88),view=(2100,350)),'A wider, shallower layout for the company Page. Main message and cards move inward from the edges.','https://www.linkedin.com/help/linkedin/answer/a563309?hcppcid=search','Current Page recommendation 4200 × 700; PNG or JPEG; maximum 3 MB.',limit=3_000_000)
add('youtube','YouTube · channel',2560,1440,scene(2560,1440,(625,551,.16),(625,692,57,837,25),(1490,581,.94)),'Upload the full image. Logo, headline, subline, and cards sit inside a centered 1540 × 420 area; preview the narrow crop below.','https://support.google.com/youtube/answer/10456525?hl=en','Recommended 2560 × 1440; minimum 2048 × 1152; text/logo safe area 1235 × 338 at minimum size; maximum 6 MB.',limit=6_000_000)
for slug,title,url,spec,limit in [
 ('x','X · header','https://help.x.com/articles/166743','Recommended 1500 × 500. Up to 60 px at the top and bottom can crop.',None),
 ('bluesky','Bluesky · header','https://github.com/bluesky-social/social-app/blob/main/src/view/com/util/UserBanner.tsx','Official app uses a 3:1 crop. 1500 × 500 is our export choice, not a published mandatory pixel size.',1_000_000),
 ('mastodon','Mastodon · header','https://docs.joinmastodon.org/user/profile/','Headers are downscaled to 1500 × 500; maximum 2 MB. Instance rules can vary.',2_000_000)]:
    add(slug,title,1500,500,scene(1500,500,(65,84,.13),(350,208,49,332,21),(1000,139,.79)),'A deeper blue field, with the headline away from the lower-left avatar and the top/bottom crop zones.',url,spec,limit=limit)
add('facebook','Facebook · cover',1702,630,scene(1702,630,(395,114,.14),(395,253,48,376,21),(1058,187,.65)),'A 2× export of the 851 × 315 cover canvas. Important content is concentrated in the middle; use Facebook’s final repositioning preview.','https://www.facebook.com/help/125379114252045','851 × 315 guidance corroborated by a secondary source; Meta help was login-gated during research. Exported at 1702 × 630.','Cover')
add('twitch','Twitch · profile banner',1200,480,scene(1200,480,(60,62,.13),(60,191,43,309,20),(760,117,.72)),'Left-weighted typography follows Twitch’s guidance. Channel UI and browser width can change how much of the banner is visible.','https://help.twitch.tv/s/article/channel-page-setup?language=en_US','Recommended 1200 × 480; graphics concentrated on the left.')
for slug,title,w,h,url,spec,limit in [
 ('pinterest','Pinterest · business cover',1600,900,'https://help.pinterest.com/en/business/article/personalize-your-profile','Business profile cover: minimum 800 × 450, recommended 16:9. Our export is 1600 × 900.',None),
 ('tumblr','Tumblr · header',2048,1152,'https://help.tumblr.com/knowledge-base/appearance-options/','Ideal 2048 × 1152, 16:9; maximum 10 MB.',10_000_000)]:
    add(slug,title,w,h,scene(w,h,(100,182,.17),(100,337,60,491,25),(1010,287,.97),view=(1600,900)),'A spacious landscape composition with the same card details and blue sweep.',url,spec,limit=limit)
for slug,title,w in [('reddit-desktop','Reddit · community desktop',2144),('reddit-mobile','Reddit · community mobile',2160)]:
    add(slug,title,w,256,scene(w,256,(88,96,.17),(420,114,42,177,23,['AI transformation for music rightsholders']),(1682,22,.70)),'Community artwork, not a personal profile header. The shallow format uses one headline line and a compact card group.','https://support.reddithelp.com/hc/en-us/articles/15484339588884-Banner','Desktop minimum 1072 × 128; mobile minimum 1080 × 128. These exports are 2× the respective minimums.')
add('discord-profile','Discord · profile banner',1360,480,scene(1360,480,(310,80,.13),(310,199,44,322,20),(932,141,.65)),'Keeps the lower-left clear for the avatar. Requires a Nitro account with profile banner access.','https://support.discord.com/hc/en-us/articles/4403147417623-Custom-Profiles','Minimum 680 × 240; maximum 10 MB. Exported at 1360 × 480.',limit=10_000_000)
add('discord-server','Discord · server banner',960,540,scene(960,540,None,None,(370,170,.96),words=False),'Art-only: blue sweep and report/catalog/review illustrations. No text or logo; the top remains quiet for the server name.','https://support.discord.com/hc/en-us/articles/360028716472','Minimum 960 × 540, 16:9. Keep top 48 px clear; avoid logos and text. Requires an eligible boosted or partnered server.')
add('soundcloud','SoundCloud · header',2480,520,scene(2480,520,None,None,(1640,65,1.27),words=False),'Art-only, following SoundCloud’s recommendation to avoid text in headers. The music-business illustrations carry the brand.','https://help.soundcloud.com/hc/en-us/articles/115003450007-Profile-image-and-header','At least 2480 × 520; JPG or PNG; maximum 2 MB.',limit=2_000_000)
# These are post/video canvases, not purported profile-header upload slots.
add('instagram-threads','Instagram / Threads · portrait post',1080,1350,scene(1080,1350,(92,133,.19),(92,344,59,498,23),(230,766,1.35)),'Companion post artwork in a chosen 4:5 canvas. This is not a profile banner.','', 'Chosen 1080 × 1350 post canvas; not a profile-header specification.','Companion')
add('tiktok-reels','TikTok / Reels · vertical cover',1080,1920,scene(1080,1920,(92,408,.19),(92,619,59,773,23),(185,1004,1.35)),'Companion video-cover artwork in a chosen 9:16 canvas. Keep the final app’s captions and controls in mind when positioning.','', 'Chosen 1080 × 1920 video-cover canvas; not a profile-header specification.','Companion')

kit.rasterize(renders)
# Preserve the approved personal PNG byte-for-byte as well as its source SVG.
shutil.copyfile(R/'assets/linkedin-art/blue-sweep.png',O/'linkedin-personal.png')
P=O/'previews';P.mkdir(exist_ok=True)
code="""const sharp=require('sharp');const fs=require('fs');const p=process.argv[1];(async()=>{
 await sharp(p+'/youtube.png').extract({left:510,top:510,width:1540,height:420}).png().toFile(p+'/previews/youtube-center.png');
 await sharp(p+'/youtube.png').extract({left:0,top:510,width:2560,height:420}).png().toFile(p+'/previews/youtube-desktop.png');
 const a=JSON.parse(fs.readFileSync(p+'/manifest.json')); let rows=[];
 for(const x of a){const f=p+'/'+x.slug+'.png';const m=await sharp(f).metadata();rows.push({slug:x.slug,width:m.width,height:m.height,bytes:fs.statSync(f).size});}
 fs.writeFileSync(p+'/validation.json',JSON.stringify(rows,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});"""
(O/'manifest.json').write_text(json.dumps(items,indent=2)+'\n')
subprocess.run(['node','-e',code,str(O)],cwd=R.parent,check=True)
checks=json.loads((O/'validation.json').read_text())
for a,c in zip(items,checks):
    assert (a['width'],a['height'])==(c['width'],c['height']),a['slug']
    assert not a['limit'] or c['bytes']<a['limit'],(a['slug'],c['bytes'],a['limit'])
    a['bytes']=c['bytes']
(R/'social-banner-manifest.json').write_text(json.dumps(items,indent=2)+'\n')

# Cite the research alongside every exported size, including deliberate choices.
guide='''# Recoup · Blue sweep social banner kit

Researched and exported 13 September 2026. All measurements are pixels.

17 layouts: 15 cover/header exports for 12 platforms, plus two companion canvases for Instagram, Threads, TikTok, and Reels. PNGs are the upload assets; SVGs retain editable typography and embedded fonts. No profile photos, outer frames, or crop guides are baked into the upload files.

## Dimensions and sources

| Platform / format | Export | Research / requirements | Source |
| --- | --- | --- | --- |
'''
for a in items:
    src=f"[Official source]({a['source']})" if a['source'] else 'Chosen artwork canvas'
    if a['slug']=='facebook':src='[Meta help (login-gated)](https://www.facebook.com/help/125379114252045) · [Secondary corroboration](https://socialmagnum.com/blog/facebook-cover-photo-size)'
    guide+=f"| {a['title']} | {a['width']} × {a['height']} | {a['spec']} | {src} |\n"
guide+='''
## Crop decisions

- **YouTube:** the official safe area is 1235 × 338 at the 2048 × 1152 minimum. Scaling by 1.25 gives 1543.75 × 422.5 on our 2560 × 1440 export. We use a slightly smaller centered 1540 × 420 region (x510–2050, y510–930) for every essential element. `previews/youtube-center.png` and `previews/youtube-desktop.png` are crop previews, not uploads. Upload `youtube.png`.
- **LinkedIn personal:** this is the exact approved Blue sweep export, including the lower-left clear area. Company Page covers use a separate 6:1 composition. LinkedIn notes that crops vary with device and window size.
- **X:** key content stays outside the top and bottom 60-pixel crop bands. [Official cropping guidance](https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo).
- **Facebook:** the official help page required sign-in during research. The 851 × 315 guidance was corroborated through a secondary source and doubled for export. Keep the platform’s upload preview as the final check; do not interpret this as verified on every Page/profile layout.
- **SoundCloud and Discord server:** art-only versions follow the platforms’ own advice to avoid text/logos. The top 48 pixels of the Discord server artwork contain only blue background.
- **Reddit:** separate desktop and mobile community banners, each twice the official minimum dimensions. These are not personal-profile headers.
- **Companions:** Instagram/Threads and TikTok/Reels artwork are post/video-cover canvases, not conventional profile banners. Final thumbnails and interface overlays depend on where they are used.

## Files and use

Each named PNG has a matching SVG source. Open SVGs in a vector editor; use the supplied PNG if font handling differs. Review the intended platform and account type before uploading: Pinterest business cover, Discord Nitro profile banner, eligible Discord server banner, and Reddit community banner are distinct features.

Pixel dimensions and applicable documented byte limits were checked locally. Crop previews are simulations based on the documented geometry, not screenshots of uploaded accounts. No social accounts were changed. Final platform previews may permit repositioning and can differ by device, account type, or UI update.
'''
(O/'SIZE-GUIDE.md').write_text(guide)

cards=[]
for a in items:
    slug=a['slug']; base='assets/social-banner-kit/'
    special=''
    if slug=='youtube':special=f'''<details open><summary>Phone / central crop</summary><img src="{base}previews/youtube-center.png" alt="YouTube central safe area preview"><p>All text and card details remain inside this strip. Upload the full 2560 × 1440 file above.</p></details>'''
    src=f'<a href="{html.escape(a["source"])}" target="_blank" rel="noreferrer">Source ↗</a>' if a['source'] else '<span>Companion artwork</span>'
    cards.append(f'''<article id="{slug}" data-kind="{a['kind']}"><div class="meta"><span>{a['kind'].upper()} / {a['width']} × {a['height']}</span><span>{a['bytes']/1024:.0f} KB</span></div><h2>{html.escape(a['title'])}</h2><a class="art" href="{base}{slug}.png" target="_blank"><img src="{base}{slug}.png" alt="{html.escape(a['title'])} — Blue sweep" loading="lazy" width="{a['width']}" height="{a['height']}"></a>{special}<p>{html.escape(a['description'])}</p><footer><a href="{base}{slug}.png" download>PNG ↓</a><a href="{base}{slug}.svg" download>Editable SVG ↓</a>{src}</footer></article>''')
page='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blue sweep · Social banner kit · Recoup</title><meta name="robots" content="noindex,nofollow"><style>
@font-face{font-family:DM;src:url('assets/fonts/dm-sans.woff2')}@font-face{font-family:Mono;src:url('assets/fonts/ibm-plex-mono.woff2')}
*{box-sizing:border-box}body{margin:0;background:#fff;color:#152E37;font-family:DM,Arial,sans-serif}main{max-width:1440px;margin:auto;padding:44px 36px 100px}a{color:#087BAB;text-underline-offset:5px}nav{display:flex;justify-content:space-between;gap:24px;align-items:center}nav img{width:145px}h1{font-size:clamp(38px,5vw,66px);font-weight:500;letter-spacing:-.05em;margin:58px 0 16px}header>p{max-width:780px;font-size:21px;line-height:1.5;color:#586F78}.actions{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 42px}.button{border:1px solid #D7E4E9;padding:15px 22px;border-radius:30px;text-decoration:none;color:#152E37}.primary{background:#D6FF62;border-color:#D6FF62}.filters{display:flex;gap:10px;margin:0 0 28px}button{font:inherit;border:1px solid #D7E4E9;background:white;border-radius:25px;padding:10px 18px;cursor:pointer}button[aria-pressed=true]{background:#132B26;color:white}.grid{display:grid;grid-template-columns:1fr 1fr;gap:38px 28px}article{border:1px solid #E2E9EB;border-radius:22px;padding:22px;min-width:0;scroll-margin-top:24px}article[hidden]{display:none}.meta{display:flex;justify-content:space-between;gap:12px;font:11px Mono,monospace;color:#586F78}h2{font-size:26px;font-weight:500;letter-spacing:-.035em;margin:13px 0 22px}.art{display:block;background:#f0f7fa;border-radius:12px;overflow:hidden}.art img{width:100%;height:auto;max-height:610px;object-fit:contain;display:block}article p{font-size:16px;color:#586F78;line-height:1.6}footer{display:flex;flex-wrap:wrap;gap:22px;align-items:center;font-size:15px}footer span{color:#586F78}details{margin-top:16px}summary{cursor:pointer;margin-bottom:12px;color:#087BAB}details img{width:100%;display:block}details p{font-size:14px}.note{margin-top:38px;max-width:900px;font-size:15px;line-height:1.6;color:#586F78}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #087BAB;outline-offset:4px}@media(max-width:760px){main{padding:25px 18px 60px}.grid{grid-template-columns:1fr}article{padding:16px}h1{margin-top:40px}.meta{font-size:10px}}
</style></head><body><main><nav><a href="./?view=social"><img src="assets/logos/lockup-ink.svg" alt="Recoup"></a><a href="./?view=social">← Brand Studio</a></nav><header><h1>Blue sweep, everywhere.</h1><p>Your selected banner, composed for each platform. Small logo, clear headline, detailed cards, and room for the profile photo where it overlaps.</p><div class="actions"><a class="button primary" href="assets/social-banner-kit/recoup-social-banner-kit.zip" download>Download the full kit ↓</a><a class="button" href="assets/social-banner-kit/SIZE-GUIDE.md">Size guide & sources ↗</a></div></header><div class="filters" aria-label="Artwork filters"><button aria-pressed="true" data-filter="all">Everything</button><button aria-pressed="false" data-filter="Cover">Banners & covers</button><button aria-pressed="false" data-filter="Companion">Posts & video covers</button></div><section class="grid">'''+''.join(cards)+'''</section><p class="note">Researched 13 September 2026. 15 banner/cover layouts across 12 platforms, plus two companion canvases. Upload PNGs; SVGs are editable sources. YouTube crop previews are for checking composition. Facebook’s current help page was login-gated, so its guide includes secondary corroboration. Final cropping can vary in each platform’s uploader.</p></main><script>document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('[data-kind]').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.kind!==b.dataset.filter)}));</script></body></html>'''
(R/'social-banner-kit.html').write_text(page)
with zipfile.ZipFile(O/'recoup-social-banner-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
    for a in items:
        for ext in ['png','svg']:z.write(O/f'{a["slug"]}.{ext}',f'{a["slug"]}.{ext}')
    z.write(O/'SIZE-GUIDE.md','SIZE-GUIDE.md')
    for p in P.glob('*.png'):z.write(p,'previews/'+p.name)
print(f'Exported and validated {len(items)} layouts. Largest PNG: {max(c["bytes"] for c in checks):,} bytes.')
