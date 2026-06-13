# DESIGN-AUDIT.md — Visual & UI Audit: References vs. Recoup

**Date:** 2026-06-13
**Scope:** Pure visual/UI design — typography, color, imagery, depth, layout, motion, craft. (Conversion/copy/IA is covered separately in `WEBSITE.md`.)
**Compared:** `referances/{tenex,every,pm-world}` (DESIGN/TEARDOWN docs + ~35 screenshots) vs. our live site on `feat/research-consulting-site` (home, consulting, platform, pricing, blog, diligence, trust — light + dark, desktop + mobile).
**Our system of record:** root `DESIGN.md` + `app/globals.css`.

---

## TL;DR

Our design is **typographically strong and architecturally clean, but visually skeletal.** We have a genuine signature (the Geist Pixel display font) and reference-grade fundamentals (shadow-as-border, whitespace, dark inverted closers, light+dark modes). What separates the three references from us is **not** layout or type discipline — it's three things we have **none** of:

1. **A committed imagery / illustration world** (Every's engravings, Tenex's statues, pm-world's paintings + faces). Ours is 100% type + outlined cards on white. It reads elegant but template-like — like a beautiful wireframe, not a finished brand.
2. **One semantic accent color.** Each reference commits to exactly one (Tenex taxi-yellow, Every powder-blue, pm-world warm-amber) doing emphasis + hierarchy + interaction. We are fully achromatic, so nothing pops, CTAs don't pull the eye, and every card reads at the same weight.
3. **Human presence + emphasis hierarchy.** References use faces (founders, customer avatars), highlighted numbers, and outline-vs-fill card hierarchy. Ours has no faces and uniform card weight.

Close those three and we move from "clean dev-tool template" to "art-directed brand." Everything below is the detail.

---

## 1. Reference design profiles

### Tenex — "manifesto poster"
- **Core concept:** one loaded metaphor (B&W Greek statuary using modern tech), total commitment. The visual joke *is* the argument.
- **Palette:** near-black void / white / **one** taxi-yellow accent at ~3% of the viewport. Yellow does three jobs: inline keyword emphasis, the one flagship card (filled yellow), and CTAs.
- **Type:** pixel-serif display reserved for *ceremony* (hero, mission, names); heavy grotesque sans for section headers; serif italic for mid-sentence "raised eyebrow" emphasis.
- **Craft:** crop-mark corners + faint blueprint grid ("built by builders" set-dressing), diagonal yellow ticker tape (breaks the rectilinear grid exactly once), statues bleed off-edge *behind* type, inverted solid-yellow rooms (menu, "why you need us").
- **Motion:** ghost-text scroll reveal (paragraphs fade white→grey→invisible), marquee ticker.

### Every — "literary magazine for the future"
- **Core concept:** one **illustration system** that can draw anything — 19th-c. engraving + collage + limited flat-color blocks (cobalt, acid yellow, magenta, kraft) over B&W line art. Halftone/scratchboard texture. Anti-gradient, anti-3D-render — the opposite of generic AI-startup aesthetics.
- **Palette:** black ground / cream text / **one** powder-blue action color. Color otherwise lives *only inside artwork frames*. (Same "achromatic chrome" rule we claim — but they prove it at scale because the content frames carry all the color.)
- **Type:** serif masthead + headlines (bookish, publication-grade); the swash-italic letter tic (one initial letter swashes per headline — "Socrates as a 𝒮ervice") = a cheap, systematized, instantly-recognizable signature; all-caps grotesque kickers name every beat.
- **Craft:** postage-stamp product series (one verb per stamp, perforated edges); stats as engraved plaques with tiny medal/star/envelope icons; persistent "Explore the Every universe" cross-sell widget; per-story commissioned art.

### pm-world — "warm, approachable operator tool"
- **Core concept:** friendly, light, low-intimidation. Warm grays/taupe/cream, soft shadows, rounded everything.
- **Palette:** warm off-white ground / brown-black text / **one** warm amber-brown accent (buttons, the highlighted "10", the "$500" highlight box).
- **Type:** clean humanist sans throughout; key numbers get a literal highlighter-marker box (the "10", "$500 skill") — playful emphasis on the number that sells.
- **Craft:** faces everywhere (founder photo, ~10 customer avatars); each testimonial card has its own abstract generative painting as a background; a dark "AT A GLANCE" inventory card with big numbers in circles; sticky urgency promo bar; SEO-sitemap footer.

---

## 2. Our design profile (as built)

- **Concept:** "Vercel-grade minimalism with music-industry soul." Achromatic chrome; color is meant to come from content.
- **Palette:** pure black/white achromatic, both light + dark modes. The only defined accent (`--sky #e8f1f8`) is **barely used**. Status greens/ambers exist but appear only in the diligence flags.
- **Type:** four-font system — **Geist Pixel Square** (H1 + every section H2 + all numbers), Plus Jakarta Sans (UI/cards/nav), Geist Sans (body), Instrument Serif italic (editorial emphasis words). The pixel font is a real, ownable signature.
- **Craft:** shadow-as-border on all cards; dot-grid hero background (masked radial); dark `radial-gradient` "engine" section + dark CTA closers; generous section spacing.
- **Imagery:** **none.** No photography, no illustration, no faces, no iconography beyond Lucide arrows. Blog cards are text-only (now with a thin per-beat color bar). Logo bar is monochrome SVGs.
- **Motion:** scroll-reveal fade-up on sections; CTA soft-pulse glow; the interactive bookshelf + agent-engine demo (genuinely nice, more interactive than any reference's static screenshots). A large library of CSS animations (glitch, scanline, symbol-rain, cell-split) is **defined in `globals.css` but unused** on these pages.

---

## 3. Dimension-by-dimension comparison

| Dimension | Tenex | Every | pm-world | **Recoup (ours)** | Verdict |
|---|---|---|---|---|---|
| **Signature element** | Statues | Engraving system | Faces + paintings | **Pixel font** | ✅ Ours is real & ownable |
| **Imagery / illustration** | B&W photo, committed | Full commissioned system | Paintings + photos | **None** | ❌ Biggest gap |
| **Accent color** | 1 (yellow), semantic | 1 (powder blue), semantic | 1 (amber), semantic | **0** (achromatic) | ❌ Flat hierarchy |
| **Human presence (faces)** | Statue "people" + bios | Columnist photos | Founder + avatars | **None** | ❌ Missing trust signal |
| **Card hierarchy** | Outline vs filled flagship | Story-size hierarchy | Highlighted/featured | **All identical** | ❌ Nothing stands out |
| **Display type discipline** | Reserved for ceremony | Reserved for masthead | n/a (one sans) | **Pixel on everything** | ⚠️ Risk of monotony |
| **Number / stat craft** | Receipts w/ ✓/✗ | Plaques + heraldry icons | Highlighted, circled | **Plain pixel plaques** | ⚠️ Functional, not crafted |
| **Motion signature** | Ghost-text + ticker | Carousels + paywall | Sticky bar | **Scroll-fade only** | ⚠️ No memorable beat |
| **Depth / shadow** | Cards-on-void | Editorial flat | Soft warm shadow | **Shadow-as-border** | ✅ Reference-grade |
| **Whitespace / rhythm** | Generous | Newspaper-dense | Generous | **Generous** | ✅ Strong |
| **Light + dark mode** | Dark only | Dark only | Light only | **Both** | ✅ Ahead of references |
| **Interactivity** | Static | Static | Static | **Bookshelf + live demo** | ✅ A real strength |
| **Warmth / texture** | Cold (intentional) | Textured (halftone) | Warm | **Clinical white** | ⚠️ Can feel sterile |

---

## 4. What's missing in ours (ranked by impact)

1. **An imagery system — full stop.** Every reference has a committed visual world; we have type on white. This is *the* reason ours can read as a high-quality template rather than a brand. No hero image, no section art, no blog covers, no spot illustration, no texture.
2. **One semantic accent color.** Without it, the eye has no anchor: the primary CTA, the "recommended" plan, the key stat, and a body link all compete at the same achromatic weight. References prove one disciplined accent reads as *more* intentional, not less.
3. **Emphasis hierarchy between cards.** Our gap cards, lane cards, offer cards, stat plaques, and skill cards are all "outline + shadow, equal weight." Nothing signals *this is the one that matters.* References fill/colour/enlarge the flagship.
4. **Faces & human presence.** No founder portrait, no customer avatars, no people anywhere. All three references lean on faces for trust (pm-world avatars, Every columnists, Tenex founder busts). We added one byline avatar on blog posts — that's it.
5. **Crafted numbers.** Our stats are honest but plain. References make numbers *designed objects* — heraldry icons (Every), highlighter boxes (pm-world), ✓/✗ receipts (Tenex/pm-world). Our new receipts table is the closest we get; extend that energy.
6. **A signature motion beat.** We have one generic scroll-fade. References each have a memorable motion moment (ghost-text reveal, ticker tape). Ironically we have a *huge* unused animation library in `globals.css`.
7. **Blog/research art direction.** Cards are text-only. Every's hub looks like a magazine because every card has commissioned art in one style; ours looks like a changelog.
8. **Texture / warmth in light mode.** Pure `#fff` reads clinical next to Every's halftone paper and pm-world's warm cream. A whisper of grain or a warmer off-white on alternating sections would add craft.

---

## 5. What's more professional in the references

- **Art direction consistency (Every).** One illustration language across hundreds of surfaces is the single biggest "this is a serious company" signal. It's also the hardest to fake and the most defensible.
- **Metaphor commitment (Tenex).** Picking one image and running it through every page (statues on the hero, on the team page as busts, on the closer as muses) makes the brand feel *authored*.
- **Accent discipline.** One color used only for meaning (not decoration) looks more expensive than either "rainbow" or "no color." We're at "no color," which reads as unfinished rather than restrained — because we lack the content-color that's supposed to compensate (we have no album art / artist imagery on the marketing site, unlike the chat product the achromatic rule was written for).
- **Faces + heraldry.** Avatars, portraits, medal/star iconography on stats — small human/craft details that compound into "trustworthy."
- **Emphasis mechanics.** Highlighted numbers, filled flagship cards, "recommended" treatments — they guide the eye; ours leaves the eye to wander.

## 6. What we already do as well or better

- **The pixel display font** is a legitimately distinctive signature — Tenex's own design notes call out that this "heritage, digitized" move is exactly what they do with pixel-serif. Keep it; it's our equity.
- **Shadow-as-border, whitespace, fluid type, dark inverted closers** are all reference-grade.
- **Light + dark mode** — every reference is single-mode; we ship both cleanly.
- **Interactivity** — the bookshelf skill-switcher and the live agent-engine demo are more engaging than any static reference screenshot. Lean into this; it's a moat the references don't have.

---

## 7. Improvement roadmap (prioritized, with concrete specs)

Tickets are `D-##` to keep them separate from the `W-##` conversion backlog in `WEBSITE.md`.

### Tier 1 — the three that close the gap

- [ ] **D-01 — Commit to ONE illustration system.** Pick the lane and apply it relentlessly. Recommended: **engraving + flat-color-block** (Every's proven approach) on *music-heritage* subjects — vinyl presses, tape machines, mixing desks, orchestral/operatic busts — collaged with agents/terminals. It rhymes with our pixel "heritage, digitized" thesis. Apply to, in order: (1) blog/research card covers, (2) hero backdrop or a hero spot illustration, (3) section dividers, (4) `opengraph-image`, (5) 404/empty states. *This is 60% of the gap.* Generate with a single locked prompt/style so all assets are siblings.
- [ ] **D-02 — Introduce one semantic accent.** Define `--accent` (a single hue — test a Recoup blue `~#2563eb`, or a warmer signal). Rule, in writing in DESIGN.md: accent is allowed on exactly three things — the **primary CTA**, the **one card/plan that matters**, and **key inline numbers/links**. Chrome stays achromatic. Wire it into the existing `--sky`/`--brand` token slots so it's swappable.
- [ ] **D-03 — Card emphasis hierarchy.** Establish outline = available, **accent-filled = important.** Apply to: the recommended pricing tier (already inverts — make it the accent), the "Partner/Owned Build" path, the flagship skill on the shelf, and the diligence CTA. One filled card per section maximum.

### Tier 2 — human + craft

- [ ] **D-04 — Add faces.** Founder portrait on `/consulting` ("work directly with the team") and `/company/about`; customer avatars on testimonials once names are cleared (W-18); keep the blog byline avatar. Use the real `pfp-sky-bg.png` and commissioned/photographed team shots.
- [ ] **D-05 — Crafted stats.** Add a tiny line/pixel icon per stat plaque (Every's heraldry move) and an accent underline on the single most important number per page (pm-world's highlighter). Extend the receipts table styling as the house "comparison" component.
- [ ] **D-06 — Reserve the pixel font for ceremony (test).** Today pixel is on H1 *and* every section H2 — risk of monotony and slightly "techy-template" feel. Test: keep pixel for H1 + final CTA + numbers; move mid-page section H2s to Plus Jakarta Sans bold (tight tracking). Measure whether the hero/H1 reads *more* special when it's not repeated 8×. (Judgment call — this is our signature, so A/B it rather than assume.)

### Tier 3 — motion & texture

- [ ] **D-07 — One signature motion beat.** Either a ghost-text scroll reveal on the manifesto section (Tenex), or a slow marquee ticker ("Built by music people, run by agents") once per page. We already have the keyframes in `globals.css` — wire one in tastefully; delete the unused glitch/scanline/symbol-rain animations or actually use them (dead CSS is its own debt).
- [ ] **D-08 — Light-mode warmth/texture.** Shift the lightest sections from `#fff` to a warm off-white, and/or add a barely-there paper-grain or halftone texture on the dark sections. Small move, big "crafted" payoff.
- [ ] **D-09 — Blog hub art direction.** Once D-01 exists, generate per-post covers in the one style; upgrade `ContentCard` from color-bar to a real cover image. Turns the hub from changelog into magazine.

### Tier 4 — system hygiene

- [ ] **D-10 — Reconcile DESIGN.md vs reality.** `globals.css` base rule sets `h1,h2 { font-family: --font-display (Instrument Serif) }`, but every page overrides with `.font-pixel`. DESIGN.md says H1/H2 = pixel. Make the base rule match the intent (default headings to pixel) so a forgotten class doesn't silently render serif.
- [ ] **D-11 — Prune dead animation CSS.** ~200 lines of unused keyframes (glitch, scanline, cell-split, symbol-rain, border-trace) inflate the stylesheet and confuse the system. Use or remove.
- [ ] **D-12 — Document the imagery + accent rules in DESIGN.md** once D-01/D-02 land, so the system stays coherent as it grows.

---

## 8. The one-paragraph answer

Our UI is **clean, fast, and typographically distinctive, but visually under-dressed** next to the references. Tenex looks authored because it commits to one metaphor; Every looks like a real publication because it commits to one illustration system; pm-world feels human because it uses faces, warmth, and highlighted numbers. We have the bones they have (whitespace, shadow-as-border, a signature font, *and* dark mode + interactivity they lack) — we're missing the **skin**: imagery, one accent color, emphasis hierarchy, and human presence. Adding those four (Tier 1 + D-04) is what turns a sharp template into a brand.
