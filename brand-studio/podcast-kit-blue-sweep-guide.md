# Recoup Podcast — Blue sweep kit

The selected Blue sweep visual direction, with the white, one-line Recoup Podcast identity. The background is native vector artwork. Recoup uses DM Sans 600; Podcast uses DM Sans 300. The Recoup icon retains its exact vector geometry.

## Start here

Open `http://localhost:3012/podcast-kit-blue-sweep.html` while the local Brand Studio is running. Choose a template, enter episode details, and download PNG or SVG. Add line breaks to control the headline composition. The ZIP contains the default example versions; exports from the editor contain your current text.

The title, guest names, and quote are examples. Replace them before publishing. No guest photos, footage, actual quotations, episode metadata, music, or voice recordings are included.

## Files

| File | Size | Use |
| --- | --- | --- |
| title.png / title.svg | 1920 × 1080 | Blue sweep opening card |
| cover | 3000 × 3000 | Square show cover, one-line identity |
| thumbnail | 1920 × 1080 | Editable episode thumbnail |
| solo / duo | 1920 × 1080 | Transparent camera frames |
| vertical | 1080 × 1920 | Transparent clip frame |
| solo-labels / duo-labels / vertical-labels | Same as frame | Separate transparent name labels |
| quote / announcement | 1080 × 1350 | Social templates |
| endcard | 1920 × 1080 | Closing card with open space for two recommendations |
| background | 1920 × 1080 | Clean landscape background |
| square-background | 3000 × 3000 | Clean square crop |
| portrait-background | 1080 × 1920 | Clean portrait crop |
| title-identity | 1920 × 1080 | Transparent white identity for custom motion |
| *-preview | Same as frame | Reference previews with gray camera placeholders; do not use as overlays |

All stills include PNG and editable SVG. SVGs contain vector backgrounds and embedded fonts, with no external image dependencies. PNG lettering is rendered from the same bundled fonts. Some design editors may require installing the included fonts to edit SVG text accurately. The cover and its background are rendered at 3000 × 3000 from vectors. No background upscaling is required.

Video frames have clean blue headers without a wordmark or episode title. Use the separate podcast badge for corner branding.

## Place your footage

Layer order, from bottom to top:
1. Footage, cropped to the camera opening.
2. Frame PNG (camera areas are transparent).
3. Name labels PNG.
4. Your captions, when applicable.

Coordinates below are pixels from the top-left of the canvas. Each opening has a 20-pixel corner radius.

| Frame | Camera | X | Y | Width | Height |
| --- | --- | --- | --- | --- | --- |
| Solo | Main | 64 | 178 | 1792 | 802 |
| Duo | Host | 64 | 218 | 876 | 704 |
| Duo | Guest | 980 | 218 | 876 | 704 |
| Vertical | Main | 48 | 330 | 984 | 1260 |

Keep faces within the camera openings. In the vertical frame, reserve the lower blue area around y=1630–1720 for short captions; the episode number sits at y=1778. Platform interface overlays vary, so check the final clip in its destination before publishing.

The end card leaves room for recommendation images at roughly (180, 495, 672, 378) and (1068, 495, 672, 378). Those images are added in your editor or on the destination platform.

## Motion

- intro-connection.mp4 (also intro.mp4): 5.5 seconds at 30 fps. Opposing blue planes expose the large Recoup symbol; it glides into the lockup as the wordmark reveals. The approved title holds completely still from 3.55s to the end.
- intro-logo-transparent.mov: the same symbol/wordmark animation on transparency, in ProRes 4444. Place above your own background or footage in a video editor; browser previews may not display alpha correctly.
- outro.mp4: 5 seconds. Identity appears, holds, then fades out; the background remains blue.
- background-loop.mp4: 12 seconds. A gentle periodic camera drift across the blue artwork, designed to loop. No lettering.

All motion is silent, 1920 × 1080. Opening MP4: H.264, 30 fps. Closing and background loop: H.264, 24 fps. Transparent logo MOV: ProRes 4444, 30 fps. Add your music or voice separately. The opening animates the identity before a stationary final hold; the closing keeps the identity stationary. Use the still title card when motion is unnecessary or a reduced-motion presentation is needed.

## Keep it consistent

Use the Blue sweep blue/cyan background. Keep the identity white and on one line. Preserve the heavier Recoup wordmark and lighter Podcast lettering. Recompose the sweep for the destination; keep the identity proportions fixed. Leave the middle open; episode content and faces should be the focus. Use short headlines and review the template at actual viewing size after changing text.

Font files and their supplied licenses are included in `fonts/`.

## Podcast corner badge

`badge.png` and `badge.svg` are 1200 × 288 with transparent rounded corners. Use them at 300 × 72 in a 1920 × 1080 video. The solid fill is #1179C9, chosen to sit close to the blue in the upper-right frame area. The white identity retains the approved icon and font weights. The rectangle has a 13-pixel corner radius at the suggested display size.

`badge-overlay.png` and `.svg` are 1920 × 1080 transparent overlays with the badge at x1524, y210. This puts it 32 pixels inside the right and top edges of the solo camera opening. Place this layer above footage. Use the standalone badge when positioning it in a different layout.

## Transparent identities

Find the white podcast logo in `Logos/recoup-podcast-white-transparent.png`, with a matching SVG in the same folder. The PNG is 2880 × 558 pixels with a genuine transparent background and pure white artwork. Clear space is 217 pixels left, 216 right, 120 above, and 122 below. Keep this padding when placing the logo over footage or a background.

`recoup-podcast-white-transparent` and `recoup-podcast-ink-transparent` include PNG and SVG. Both have generous transparent padding and the previously approved optical lift of the icon. Use white over blue or dark footage and ink over light surfaces. The logo is not baked into camera frames.
