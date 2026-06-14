# Tenex Design System — Reference Notes

Extracted from screenshots 2026-06-11. Cross-reference: our own `DESIGN.md` at repo root (Recoup shares several of these instincts — pixel display type, achromatic chrome, restrained accent color).

---

## The Core Concept

**Antiquity meets AI.** Greek/Roman statuary — the most exhausted symbol of "timeless wisdom" — photographed in B&W and put to work with modern technology: a Hercules checking his phone, a bust wearing a VR headset, four muses huddled around a laptop, founders rendered as marble busts. One visual joke, executed with total consistency, that encodes the entire pitch: *old institutions, new tools; adapt or become a museum piece.*

The lesson is not "use statues." It's: **pick one metaphor that contains your argument and commit everything to it.**

## Palette

| Role | Color | Usage |
|------|-------|-------|
| Ground | Near-black `#0A0A0A`-ish | Every page. Not dark mode — a void. Occasionally warmed by a faint yellow-olive gradient glow at the edges. |
| Signal | Taxi yellow `~#F5E04A`-`#FFD400` | The only color. Keyword highlights, flagship offer card, callout boxes, ticker tape, full-screen menu, submit buttons, checkmarks. |
| Paper | White | Headlines, body, testimonial cards, secondary CTAs, statue imagery. |
| Greyscale | B&W photography | All imagery is desaturated. No exceptions in brand surfaces (only playbook thumbnails break this, deliberately — they're "YouTube content," a different surface). |

Rules visible in the work:
- **One accent, three duties:** yellow = emphasis (inline words), hierarchy (the one card that matters), interaction (CTAs). Never decoration.
- **Color ratio:** roughly 90% black / 7% white / 3% yellow per viewport. The scarcity is what makes the yellow loud.
- **Inverted rooms:** menu and "why you need us" cards flip to solid yellow with black text — the accent becomes an environment, which feels like an event because it's rare.

## Typography

Four distinct voices (compare Recoup's four-font system):

1. **Pixel-serif display** — a classical serif that's been bitmapped/aliased ("Win the next decade.", "AI Transformation", "Playbooks", founder names, "ultrathink" wordmark). The thesis in one typeface: antiquity, digitized. Used for heroes, mission statements, names — moments of ceremony.
2. **Grotesque sans, heavy** — workhorse for section headlines ("Questions? We have answers", "What we believe", "Come make history") and UI. Tight, modern, neutral.
3. **Grotesque sans, regular** — body copy, card text, FAQ rows. Highly legible on black.
4. **Serif italic (true, not pixelated)** — inline emphasis inside sans headlines: "Disrupt yourself.", "Ignoring it is." Adds editorial bite mid-sentence; reads like a raised eyebrow.

Patterns:
- **Mixed-type sentences:** sans for the setup, serif/yellow for the payoff. ("You have a choice. *Disrupt yourself.*")
- **Inline color as semantic emphasis:** the yellow word is always the *concept being sold* — "**Tenex** helps you shift...", "Your **AI transformation partner**", "**Real stories**, real results", "**Our mission**...".
- **Ghost-text scroll reveal:** body copy fades from white → grey → invisible mid-paragraph ("We don't care about today. We care about the next..."), turning scrolling into a reveal mechanic.

## Layout & Composition

- **Asymmetric editorial grid:** big left-rail statement ("Tenex helps you shift from AI-absent to AI-native") with stacked content cards on the right. Generous black negative space is the main layout material.
- **Cards on the void:** thin 1px white-outlined cards float on black; the flagship offer gets the solid-yellow fill. Outline = available; fill = important.
- **Crop-mark corners + faint grid:** small `⌐ ¬` corner ticks and a barely-visible background grid give a blueprint/spec-sheet feel — "we are builders" rendered as set dressing.
- **Diagonal ticker tape:** the "Built by builders, trusted by leaders" marquee runs at a slight angle in serif on yellow — breaks the rectilinear rhythm exactly once per page.
- **Statue placement:** statues bleed off edges and sit *behind* or *beside* type, never in neat containers. The hero statue is centered with the headline running *through* it (text over image, image over void).
- **One illustration system for offers:** white line-art icons (brain, hammer, armillary sphere) on offer cards; B&W photographic *stone objects* (brain sculpture, antique hammer) on the deep-dive pages. Same metaphor, two fidelities.

## Motion & Interaction (inferred from stills)

- Scroll-fade text reveals (the ghost paragraphs).
- Marquee/ticker animation on the yellow tape.
- Card carousels with simple chevron next-arrows.
- CTA buttons: white chip with black text + tiny ↗ external-arrow glyph in a black square — consistent affordance everywhere ("Learn more ↗", "Get Started ⧉", "Bio ⧉", "Apply ⧉").

## Surface-Specific Breaks

- **Playbook thumbnails** intentionally violate the system: full color, founder's face, yellow highlight-bar captions ("ONE MAN ARMY", "It feels like cheating"), app icons. They're built for YouTube's attention economy, not the brand's gallery. **Lesson: brand surfaces and content surfaces have different jobs — let content packaging be loud even when the brand is austere.** The yellow highlight bars keep them on-family.
- **Forms** stay on black with white input fields — qualification feels serious, not friendly.

## What Recoup Should Take

1. **Commit to one loaded metaphor.** Tenex = statues + AI. Recoup's equivalent space: classical *music-industry* iconography (tape machines, vinyl masters, mixing desks, orchestra/choir statuary) meets agents. Our pixel font (Geist Pixel Square) already rhymes with their pixel-serif move — same "heritage, digitized" trick.
2. **One accent color doing semantic work.** We're already achromatic-chrome; the discipline to make the accent *mean something* (the thing being sold, the one card that matters) is the upgrade.
3. **Outline vs fill as hierarchy.** Cheap, effective: every offer outlined, the flagship filled.
4. **Ceremony type vs work type.** Reserve the pixel/display face for mission-level statements only — scarcity keeps it sacred.
5. **Blueprint set dressing** (crop marks, faint grids) as a subtle "built by builders" signal.
6. **Let content thumbnails be louder than the brand site.** Austere brand, clickable content — they coexist.
