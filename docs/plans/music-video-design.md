# Music video offer design

This record covers the implemented `/music-videos` surface in `app/music-videos/page.tsx` and `music-videos.css`. It inherits the monorepo [DESIGN.md](../../../DESIGN.md); `app/globals.css` remains the source for theme values.

**Process correction, 2026-09-07:** This prose record was committed after implementation. Editable [visual designs](../../design/music-videos/index.html) and their [review notes](../../design/music-videos/README.md) were added afterward in response to review; they are not evidence that the original work followed the design-first procedure. The visual designs propose reserving the fixed header's 64px before hero spacing. Design review remains pending.

## Purpose and hierarchy

Independent artists see approved films, understand the collaborative process, and request a quote for their released song. The primary action, “Get a quote for my song,” anchors to the request form. The page proceeds through hero, two films, deliverables, three process steps, request form, and expandable questions. Film links open the published YouTube videos.

## Layout

Desktop content is capped at 1200px with 32px side padding. The asymmetric hero pairs copy with a 3:4 film image. Films, offer, and request use two columns; process uses three. Section separators use shadow boundaries and generous spacing.

At 760px and below, these layouts and paired form fields become single columns, side padding becomes 24px, and sections use 48px vertical padding. The hero image becomes 4:5; process numbers sit beside their descriptions. Gallery images remain 4:3 crops.

## Brand and imagery

Geist Pixel Square supplies H1/H2 and process numbers. Existing Geist Sans body typography and Plus Jakarta Sans UI typography continue. Theme-aware `--foreground`, `--muted-foreground`, `--background`, `--muted`, `--primary`, `--primary-foreground`, `--border`, `--ring`, and `--radius` provide chrome. Input shadow boundaries use `--muted-foreground`. Film imagery supplies color; the hero caption has a dark gradient for readability.

Public images are `public/images/music-videos/{movamos-el-mundo,letal-xlug}.png`. Originals and approval pointers are recorded in [music-video-offer.md](music-video-offer.md): marketing workspace `content/tomas-mika/thumbs/cover-movamos.png` and `content/letal-xlug/video/thumbs/cover-letal-xlug.png`. Titles, alt text, and film URLs live in `lib/copy/music-videos.ts`.

## Accessible states

Controls have visible keyboard focus. Form fields have labels, required constraints, and associated brief guidance. Submission disables the button and changes its text; failures retain entries and announce an alert. Accepted requests replace the form with a focused status message. Native details/summary provides FAQ interaction. Buttons, principal text links, and FAQ summaries have generous target heights. No page animation is introduced.
