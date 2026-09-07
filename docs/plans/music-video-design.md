# Music video offer design

This record covers the implemented `/music-videos` surface in `app/music-videos/page.tsx` and `components/music-videos/`, styled with inline Tailwind utilities. It inherits the monorepo [DESIGN.md](../../../DESIGN.md); `app/globals.css` remains the source for theme values.

**Approved revision, 2026-09-07:** The owner approved [v2 in issue #2075](https://github.com/recoupable/app/issues/2075#issuecomment-5574038951) and requested implementation in marketing#89. [Editable designs](../../design/music-videos/index.html) are the current visual reference. The original prose record and v1 visuals were added after initial implementation; v2 was designed and approved before its implementation.

## Purpose and hierarchy

Lead with “A music video. Less than $10.” and a free skill download, alongside “Make it in Recoup.” A dedicated file section explains the workflow and repeats the download. Published artist films lead into the self-serve process, then a separate custom-production offer and released-song brief. FAQs explain paid generation, plan scope and the current generated-song limitation. The closing section repeats download/product actions.

## Layout and visual language

Desktop content caps at 1200px with 32px side padding. Reserve 64px for the fixed header before hero spacing; mobile headings must never intersect it. The hero uses asymmetric columns, a 3:4 film image and 48px gap. Skill, proof and custom-request sections use two columns; process uses three.

At 760px and below, grids become single columns, page padding becomes 24px, hero image is 4:5, and hero/closing actions stack. Primary actions are at least 52px high. Pixel headlines, semantic light/dark tokens and existing artist posters carry the design. Shared header/footer remain the existing site components.

## Copy and assets

All runtime copy is in `lib/copy/music-videos.ts`, including machine-readable output. The free ZIP contains the unchanged public `recoup-music-video` skill and its reference from skills commit `f3ac97fb14f179e6000ca5ee5a0fd8bf6b2edd74`. Download intent and product clicks are measured separately from accepted quote requests. The less-than-$10 line applies to self-serve generation; plan fees, extra takes and custom production are explicitly separate.

## Accessible states

Controls have visible keyboard focus. Form fields have labels, required constraints, and associated brief guidance. Submission disables the button and changes its text; failures retain entries and announce an alert. Accepted requests replace the form with a focused status message. Native details/summary provides FAQ interaction. Buttons, principal text links, and FAQ summaries have generous target heights. No page animation is introduced.
