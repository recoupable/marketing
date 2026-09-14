# Recoup Podcast — Daylight kit

The approved original Daylight folds artwork, with the white, one-line Recoup Podcast identity. No green was added. Recoup uses DM Sans 600; Podcast uses DM Sans 300. The Recoup icon retains its exact vector geometry.

## Start here

Open `http://localhost:3012/podcast-kit-daylight.html` while the local Brand Studio is running. Choose a template, enter episode details, and download PNG or SVG. The ZIP contains the default example versions; exports from the editor contain your current text.

The title, guest names, and quote are examples. Replace them before publishing. No guest photos, footage, actual quotations, episode metadata, music, or voice recordings are included.

## Files

| File | Size | Use |
| --- | --- | --- |
| title.png / title.svg | 1920 × 1080 | Approved opening card; PNG matches the selected original exactly |
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
| daylight-background.png | 1672 × 941 | Original approved background source |
| title-identity | 1920 × 1080 | Transparent white identity for custom motion |
| *-preview | Same as frame | Reference previews with gray camera placeholders; do not use as overlays |

All stills include PNG and editable SVG. SVGs embed the background and fonts so they can travel without broken image links. PNG lettering is rendered from the same bundled fonts. Some design editors may require installing the included fonts to edit SVG text accurately. The 3000-pixel cover is an upscale of the approved 1672 × 941 artwork, not newly generated high-resolution art; the lettering remains crisp vector text in the SVG.

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

- intro.mp4: 6 seconds. Identity fades in, then holds.
- outro.mp4: 5 seconds. Identity appears, holds, then fades out; the background remains blue.
- background-loop.mp4: 12 seconds. A gentle periodic camera drift across the blue artwork, designed to loop. No lettering.

All motion is silent H.264, 1920 × 1080, 24 fps. Add your music or voice separately. The identity stays stationary while the background moves. Use the still title card when motion is unnecessary or a reduced-motion presentation is needed.

## Keep it consistent

Use the original blue/cyan background. Keep the identity white and on one line. Preserve the heavier Recoup wordmark and lighter Podcast lettering. Crop the background for the destination rather than stretching it. Leave the middle open; episode content and faces should be the focus. Use short headlines and review the template at actual viewing size after changing text.

Font files and their supplied licenses are included in `fonts/`.

## Podcast corner badge

`badge.png` and `badge.svg` are 1200 × 288 with transparent rounded corners. Use them at 300 × 72 in a 1920 × 1080 video. The fill is #1088EF, the median blue sampled from the approved landscape background at x1560–1824, y180–270. The white identity retains the approved icon and font weights. The rectangle has a 13-pixel corner radius at the suggested display size.

`badge-overlay.png` and `.svg` are 1920 × 1080 transparent overlays with the badge at x1524, y210. This puts it 32 pixels inside the right and top edges of the solo camera opening. Place this layer above footage. Use the standalone badge when positioning it in a different layout.
