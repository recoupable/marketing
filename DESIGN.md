---
version: alpha
name: Recoup Sky
description: A white music-business website with an open blue-sky hero, dimensional working interfaces, dark green anchors, and lime calls to action.
colors:
  primary: "#007EBD"
  secondary: "#D6FF62"
  secondary-hover: "#C5F347"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#152E37"
  muted: "#586F78"
  border: "#E2E9EB"
  surface-soft: "#F0F7FA"
  surface-tray: "#F1F3F3"
  dark: "#132B26"
  on-dark: "#FFFFFF"
  on-secondary: "#182E28"
  action-disc: "#172E27"
  link: "#087BAB"
  hero-start: "#0565BB"
  hero-end: "#0075A8"
  hero-secondary-text: "#C2EDFF"
typography:
  # Display sizes below are desktop caps, not fixed sizes at every viewport.
  # Preserve the responsive formulas documented in Typography.
  display-home:
    fontFamily: DM Sans Variable
    fontSize: 76px
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: -0.055em
  display-page:
    fontFamily: DM Sans Variable
    fontSize: 68px
    fontWeight: 450
    lineHeight: 1.06
    letterSpacing: -0.055em
  heading-section:
    fontFamily: DM Sans Variable
    fontSize: 49px
    fontWeight: 450
    lineHeight: 1.1
    letterSpacing: -0.047em
  heading-card:
    fontFamily: DM Sans Variable
    fontSize: 25px
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: -0.04em
  body:
    fontFamily: DM Sans Variable
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-intro:
    fontFamily: DM Sans Variable
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body-reading:
    fontFamily: DM Sans Variable
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.8
  body-docs:
    fontFamily: DM Sans Variable
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.09em
  label-button:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 400
    letterSpacing: 0.045em
  wordmark:
    fontFamily: DM Sans Variable
    fontSize: 28px
    fontWeight: 600
    letterSpacing: -1.1px
rounded:
  input: 9px
  card: 16px
  tray: 24px
  hero: 28px
  frame: 32px
  pill: 40px
spacing:
  tray-gap: 10px
  action-gap: 12px
  column-gap: 24px
  card-inset: 30px
  heading-gap: 40px
  section-desktop: 86px
  section-tablet: 64px
  section-mobile: 57px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-button}"
    rounded: "{rounded.pill}"
  button-primary-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.on-secondary}"
  button-icon-disc:
    backgroundColor: "{colors.action-disc}"
    textColor: "{colors.on-dark}"
    size: 34px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-inset}"
  card-tray:
    backgroundColor: "{colors.surface-tray}"
    rounded: "{rounded.tray}"
    padding: "{spacing.tray-gap}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.input}"
  text-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
---

# Recoup design reference

## Overview

**Approved direction: Sky. Reviewed September 10, 2026.** This document describes the current website at `/` and its public subpages. Use it for extensions of this design. Earlier design routes and archived implementations have been removed; `/designs/sky` permanently redirects to `/`. Dated research remains historical context.

Recoup looks like a working music business opening into a bright blue sky. The opening scene gives clean, physical-feeling interface panels room to float; the rest of the site gives reports, decisions, and useful explanations room to be understood. White is the page canvas. Blue creates atmosphere. Lime marks an action or a finding. Dark green provides weight in Skills, code surfaces, and the footer.

The impression should be **capable people building useful software for the business of music**. A visitor should quickly understand who Recoup helps, what it builds, and how to start a conversation. Visual imagination belongs around the work; the work itself stays legible.

### Audience, offer, and language

- Primary buyers: music funds and catalog owners, including rights companies. Speak to investment, finance, operations, and leadership teams.
- Primary sale: AI strategy, custom systems, and team training. A known project can start with a scoped build; a roadmap is not a mandatory gate.
- Secondary paths: the Recoup platform, Recoup Skills, and Developers. API, MCP, and CLI belong together under developer access. Individual endpoints belong in `/docs`.
- Main invitation: **Get a Free Audit**, linking directly to `/start-project` with the relevant project when known. The form explains the free workflow review and separates it from paid implementation. Plan-specific inquiries preserve their selected plan and pricing. Supporting actions name their destination: **See the work**, **Explore Skills**, **Read the docs**. Use **Book a call** only when it actually opens scheduling.
- Explain a task and its output. “Statements, receipts, and the differences that need review” is more useful than “Intelligent financial orchestration.”
- Keep personality concise: “A working system. A team that can use it.” The phrase “A record label. In a box.” belongs to Skills, not the whole company.
- Do not turn internal strategy, the flywheel, or a product inventory into the homepage narrative. Do not copy generic consulting slogans from visual references.

### Homepage narrative

The hero places the “Catalog Skills V2 is here” announcement above the title, with a lime New badge and a link to `/skills`. Use DM Sans, a subtle inset shadow outline, and wrapping text for narrow screens. The headline reads “AI transformation for music rightsholders”; its supporting line is “We build AI systems you own and train your team to use them.”

The hero description leads directly into the artwork, with no CTA button row between them. The navigation retains the free-audit invitation.

Below the hero artwork, “Used by teams at” introduces the six customer logos directly on the blue hero, with no white container. Use the `-transparent.webp` exports with real alpha transparency and normal compositing; do not apply multiply blending, which darkens the artwork. Use a three-column grid on phones. This replaces the rating caption and stars; there is no separate logo section below the hero.

The homepage follows this order: full AI transformation offer → customer logos → short statement about what adoption takes → three ways to engage → three clearly labeled case studies → engagement process → ownership → advisory and build options → separate self-serve software links → buying FAQ → free-audit invitation → footer.

`SkyServices` presents three buying paths: AI advisory, AI transformation, and custom builds. Its left-hand heading reads “Choose the help your team needs”; three compact cards sit on the right, each with a title, one summary, and a descriptive link. The transformation partnership receives lime emphasis. Small, text-free symbols support the titles; avoid large mock interfaces competing with the offer copy. A sticky desktop introduction becomes normal document flow on tablets and phones. The offers lead directly into the case-study cards, which illustrate the work and link to the full stories. Do not repeat those topics in a separate “What we can build” link block. Homepage summaries live in `lib/copy/home-offers.ts`; detailed definitions in `lib/service-offers.ts` continue to drive `/services`. Keep audience qualifiers and inclusion lists on that deeper page. Training is part of the transformation engagement. Preserve the existing services-page strategy, build, and enable anchors. Reuse `sky-services.css`; cards use the shared scroll entrance controller.

After the case studies, `SkyPartnership` presents four compact numbered cards below a single start-to-finish headline. Each step has one short sentence; no repeated introduction or audit CTA is needed. Cards show discovery, roadmap, build, and launch/adoption; four columns become two on tablets and one on phones. Services explain what clients buy; the process explains how work unfolds.

`HomeCaseStudies` is a dark-green portfolio section with a featured royalty-reporting project above two supporting investment and catalog stories. Each pairs the reusable `CaseArt` output illustration with its audience, literal project title, one concise outcome summary, and a case-study link. Omit redundant capability badges and numbered audience prefixes. Preserve analyst review and source-checking details in the summaries and artwork, along with the anonymization disclosure. The featured project pairs art and copy horizontally on desktop; all projects stack on phones. Use `home-case-studies.css` for this section. Do not use an individual report to explain the entire transformation offer. The full interactive royalty and investment walkthroughs remain on `/operations` and `/acquisitions`. Preserve homepage anchors `#case-studies`, `#work`, `#royalty-example`, `#acquisition-example`, `#services`, and `#tools`; example anchors lead to their case-study previews.

On phones, service cards and project previews stack with concise 14–16px body text, readable headings, and normal document flow. Do not replace the service overview with a long technical brief. Mobile review should assess reading burden and hierarchy, not only overflow.

`SkyEngagements` uses two complete comparison cards: pale Advisory for teams implementing themselves and dark-green Build + Partner for hands-on delivery. Each card shows one summary distinguishing who implements, a “Starting at” label above the prominent price, billing terms, and a direct plan inquiry. Build + Partner retains the scope note. Detailed inclusions stay on `/pricing`. Annual billing is selected by default on the homepage, with the monthly equivalent and full annual charge visible; accessible native radios switch billing periods and preserve the selection in the project form. Keep a clear “Compare all plans” link below, followed by a distinct self-serve tools section. The navigation, services, and closing banner retain free-audit invitations. Stack complete cards at mobile widths.

Engagement prices use `planPrice` from `lib/pricing.ts`, never duplicated price constants. Software is explicitly a separate self-serve option. `SkySoftwareStrip` in `sky-tools.tsx` presents a featured Platform card with an illustrative artist workspace, followed by open-source Skills and Developer tools cards with playbook and connection artwork. Use unnumbered card labels from `homeCopy.tools`, retain the shared platform price, and explain that consulting is not required. Each card ends with its destination link; Skills and Developers explain usage costs on their own pages. Decorative illustrations are hidden from assistive technology; actual actions sit in the card copy. Reuse `sky-tools.css` and stack all three paths on mobile. The primary CTA is **Get a Free Audit**, including the closing banner. Ownership language applies to custom systems; explain repository control, documentation, training, and agreed licenses/dependencies rather than implying ownership of third-party platforms.

### How to use this file

The front matter records the core palette and component values; the sections below explain placement and responsive behavior. It is a design reference, not a generated stylesheet or an instruction to replace existing CSS. Names here are semantic documentation names, not a claim that identically named CSS variables exist.

Start with [the shared Sky components](components/sky/page-ui.tsx) and [their stylesheet](components/sky/site.css). For homepage work, use [the route and metadata](app/page.tsx), [the homepage](components/home/home-page.tsx), [its composition](components/home/sky-content.tsx), and their imported modules. The [research notes](docs/design/2026-09-10-design-md-research.md) record the original review; their earlier source paths predate the cleanup.

If the rendered page and this file diverge, identify the relevant selector and update the implementation and documentation together. A documented accessibility requirement takes precedence over copying an existing visual defect. Do not silently adopt a new theme to resolve a mismatch.

## Colors

Use the palette by role. The primary blue is an environmental brand color; it does not mean every primary button should be blue.

| Role | Value | Application |
| --- | --- | --- |
| Canvas / surface | `#FFFFFF` | Body, page frame, reading areas, cards. Keep the outside background white. |
| Sky blue | `#007EBD` | Homepage brand reference and sky environment. The actual hero includes an image and overlay. |
| Lime | `#D6FF62` | Main CTA, selected emphasis, a decisive finding. Always pair text with dark ink. |
| Ink | `#152E37` | Default subpage headings and body text. |
| Muted ink | `#586F78` | Supporting paragraphs and useful metadata on white. |
| Pale blue | `#F0F7FA` | Light hero, supporting context, quiet tool surfaces. |
| Tray gray | `#F1F3F3` | Group related white cards; not an alternate full-page background. |
| Border | `#E2E9EB` | Separators and subtle containment. Not sufficient alone to identify an interactive control. |
| Dark green | `#132B26` | Footer and selected product/technical surfaces. |
| Text-link blue | `#087BAB` | Existing `.sp-text-link` color on white, with an underline. |
| Blue hero stops | `#0565BB` → `#0075A8` | Shared subpage gradient at 135 degrees. |

Homepage modules retain nearby values: `.sky-page` uses ink `#142E3A`; `.sky-content` uses `#132A34`, muted `#566B76`, and trays sometimes use `#F2F3F3`. Reuse the scoped module. For new public subpages, start from the shared `.sky-site` family; do not proliferate more near-duplicates.

### Contrast and meaning

Calculated solid-color pairs: ink on white **14.21:1**, muted on white **5.30:1**, CTA ink on lime **12.56:1**, and text-link blue on white **4.74:1**. These are pair checks, not a site accessibility certification.

Two existing values need care: white on `#007EBD` is **4.45:1**, and `#087FB9` on white is **4.42:1**. Neither meets the 4.5:1 normal-text threshold. Do not use them as approved small-text pairs. Prefer the existing darker text-link color for new inline links; check image and gradient text at its actual position. Lime on white is only **1.15:1**: it is a fill or decorative accent, not readable text or a standalone focus indicator there.

Use text as well as color for state: **Needs review**, **Matches**, **Draft**, **Saved**, or a specific error. Lime may draw attention to an exception; it must not imply that every highlighted number is a success. Preserve real customer-logo colors and proportions.

## Typography

Use **DM Sans Variable** for headings, body, and the wordmark, and **IBM Plex Mono 400** for compact labels, code, and technical metadata. Both are locally loaded in [the root layout](app/layout.tsx). The logo reads **Recoup**, capital R, weight **600**. Use the existing symbol and wordmark components. The footer uses `FooterBrand` from `components/sky/brand.tsx`, with a 23×28px symbol, 11px gap, and a 28px/600 wordmark (26px on phones). The desktop header matches those proportions and the footer’s 1.2 line height, using dark ink on white. Header-only logo rules must be scoped to `.ss-header`; its sizing variables and mobile icon-only layout must never affect the footer.

Headings feel open and assured: weights 450–500, close tracking, short lines. Body copy is regular, easy to scan, and substantially looser than headings. Monospace is an accent, not the body voice. Do not bring back Syne, decorative serifs, or the typewriter treatment from earlier studies.

| Role | Current responsive rule / detail |
| --- | --- |
| Homepage H1 | `clamp(46px, 5.5vw, 76px)`, 450, 1.05 line height, `-.055em`. At ≤760px: `clamp(39px, 8.5vw, 61px)`, 1.08. At ≤370px: 35px. |
| Subpage H1 | `clamp(44px, 4.7vw, 68px)`, 450, 1.06, `-.055em`; reuse the shared mobile overrides. |
| Shared section H2 | `clamp(34px, 3.6vw, 49px)`, 450, 1.1, `-.047em`. Homepage examples have deliberate 500-weight variants. |
| Card H3 | 25px, 500, 1.18, `-.04em`. Avoid treating every card as another hero. |
| Intro / body | Intro 18px; paragraphs typically 15–17px, line height 1.55–1.75. |
| Blog reading | 18px / 1.8, approximately 730px maximum reading width; 17px on mobile. |
| Docs reading | 14px / 1.8, increasing to 16px at ≤800px, with its own navigation and code scale. |
| Kicker | IBM Plex Mono 400, 11px / 1.6, uppercase, `.09em`. Short category labels only. |
| Wordmark | Shared across headers: 28px / 600, `-1.1px`, with a 20×24px symbol. 24px at ≤900px, 22px at ≤370px. Symbol is 17×20px at ≤760px. |

Use sentence case in ordinary copy. Reserve uppercase for short kickers and CTA labels. Use tabular numerals in financial comparisons. Preserve natural wrapping; remove desktop-only line breaks on small screens. A section heading should carry one idea without relying on its paragraph to explain what it means.

Tiny 6–10px text exists inside miniature hero artwork. Treat it as visual detail with an accessible parent link and a readable full example elsewhere. It is not a minimum for working controls, disclosures, or information the visitor needs to decide. For new functional UI, prefer 14–16px and leave room to wrap.

On phones, shared action labels and homepage buttons use 12px text with fixed-size arrow circles and at least 48px height. Stack actions when their labels need more room; do not shrink text to keep them on one line. Use 16px for form inputs.

Documentation tables scroll within the reading column. Preserve technical identifiers on one line; use at least 520px table width, or 640px when cells contain code. Show the sideways-scroll hint only when content overflows. Code blocks follow the same hint rule. Below 1200px, long articles offer a collapsed “On this page” menu with 44px links.

## Layout

### Page rhythm

The current homepage order is recorded under **Homepage narrative** above. Section order is not a quota of required sections for every page.

Give each section a clear job. The two work examples earn their space by showing different outputs. Services explain what an engagement delivers. Tools offer secondary paths after the consulting value is understood. Avoid repeatedly reintroducing AI transformation in different words.

### Containers and spacing

| Context | Current geometry |
| --- | --- |
| Homepage | White page, 32px outer padding, 1480px maximum frame, 10px inset. At ≥1600px outer padding becomes 54px. |
| Homepage mobile | At ≤760px: 12px page padding and 6px inset; at ≤370px: 8px outer padding. |
| Public subpages | 1320px maximum content; side gutter `clamp(18px, 3.6vw, 60px)`, reduced to 16px at ≤600px. |
| Shared hero | `80px clamp(28px, 5vw, 76px)` padding. At ≤600px: 46px 23px. Split variant uses its existing grid and padding overrides. |
| Shared sections | 86px top spacing; 64px at ≤800px; 57px at ≤600px. Heading group ends 40px above content, reduced to 28px at ≤600px. |
| Homepage sections | Base block padding `clamp(64px, 7.5vw, 112px)` and inline `clamp(24px, 6.5vw, 104px)`; work and closing modules deliberately override it. |
| Related cards | 10px tray inset and gap, usually 30px card padding. Use the content-specific grid. |
| Playbook / legal readers | 1040px outer shell, 220px contents rail, 48–56px gap, approximately 72ch article measure. Body text is 17px with generous line height; mobile contents collapse or move above the article. |

This is a component-led spacing system. There is no implemented universal eight-point scale; do not round all existing measurements to invent one.

### Responsive behavior

- Hero interfaces become a horizontal, scrollable row at ≤760px. Remove the desktop perspective; preserve readable card proportions and visible scroll affordance.
- The royalty workspace becomes one column at ≤900px. A visible **View [source] details** link moves the visitor to the selected source inspector. Selection alone does not scroll the page. At ≤600px its paper rotation and finding tilt disappear. The report comes before its finding and source detail.
- All navigation collapses at ≤900px. Top-level links share DM Sans 14px / 500, sentence case, with `-.01em` tracking; groups are centered independently of the logo and contact action. Shared geometry lives in `components/sky/navigation.css`. Keep dropdown text readable and separate from the compact top-level label styling.
- The four top-level items are **Services, Products, Resources, Pricing**, followed by the audit action. Products contains Platform, Skills, and Developers. Resources contains Work, About, Docs, Blog, All resources, and Lab. Desktop and mobile share `headerNavigation` in `lib/copy/navigation.ts`; mobile uses nested disclosures. Only one sibling dropdown opens at a time. Links close the menus; Escape closes the innermost menu and restores focus to its visible summary.
- Docs have a 246px sidebar and a 160px page contents column inside a 1440px shell. The contents column disappears at ≤1200px; the sidebar becomes a toggle at ≤800px.
- Reflow meaningful content down to 320 CSS pixels. Contain horizontal scrolling inside code, genuinely two-dimensional tables, or the intentional card gallery; do not make the whole page scroll sideways.
- Prefer a natural document scroll. No scroll hijacking, mandatory long transitions, or animation required to reach the next section.

### Page families

| Family | Apply the identity this way |
| --- | --- |
| Services / platform / Skills | Shared header, blue or pale hero, a concrete visual or output, useful detail, clear next action. |
| Reporting / investment | Reuse the working example, its selection state, and evidence disclosures. Give the result more space than decorative chrome. |
| Blog | Article imagery and clear titles; quieter reading layout, byline/date, readable links. Do not inject floating panels into article paragraphs. |
| Docs / Developers | Search, navigation, hierarchy, endpoint labels, selectable code, source links. Color supports orientation; no scenic background behind instructions. |
| Contact / readiness / ROI | Explain the next step, show labeled inputs, preserve entered data, and make results or errors visible. Avoid a decorative hero that pushes the task away. |
| Pricing | Compact white introduction, billing control, three comparable paid plans, then Enterprise and usage-based developer access. Let prices and the level of human support lead. |
| Privacy / terms | Calm white reading surface and logical headings. Preserve legal text and effective dates. |
| For agents | Use the shared light hero and readable tool/search sections. Human-readable controls remain useful independently of agent support. |

The September 10 full-site pass establishes several deliberate variations within Sky. Advisory shows a roadmap artifact; Build shows source information becoming a usable report and uses editorial capability rows. Resources and Developers use linked indexes so the visitor can reach a task quickly. Demo and case-study directories show a readable excerpt of the actual working example before linking to it. These patterns are preferable to adding another equal-card grid.

The blog archive uses six illustrated entries, followed by a compact two-column reading list (one column on phones). Filtered results use the reading list throughout. Keep every article discoverable without requiring large decorative art for every title. Informative figures retain their natural width up to the reading column; offer a full-size image link for detailed screenshots. On phones, the service comparison stacks both approaches under each criterion instead of hiding a column offscreen.

## Elevation & Depth

Depth shows a relationship: a report with supporting records, a selected finding, or several playbooks belonging to one product. Use different scale, overlap, paper edges, and restrained shadows to make that relationship apparent. Ordinary prose and tables do not need theatrical framing.

### Existing elevation recipes

| Use | Existing CSS recipe |
| --- | --- |
| Quiet card | `0 3px 7px #17334206` |
| Navigation dropdown | `0 8px 12px #16394908, 0 24px 50px #16394918` |
| Floating hero panel | `2px 3px 0 #c7e8f4, 0 16px 30px #00446a29, inset 0 0 0 1px #dce8ed` |
| Royalty report | `0 22px 36px -17px #19384445, 0 3px 9px #17364012, 0 0 0 1px #e1e6e8` |

Use the actual component instead of pasting these recipes into every card. Hero glass is reserved for translucent connection/build panels and the secondary hero action; reporting and long-form surfaces remain opaque. A report can have a slight paper tilt on desktop. Active input forms should remain upright.

### Surface finish

Selected colored cards and interface illustrations share [materials.css](components/sky/materials.css): faint stationary grain, a broad upper-left light, and a very slight diagonal shade. Blue reads as softly lit enamel; dark green is matte; lime retains its original hue; printed sheets get a quieter paper finish. Preserve the component's base color and any existing glass or photographic background. This is a surface treatment, not a new palette.

The reusable 160px [grain tile](public/images/sky/surface-grain.svg) is a monochrome SVG with 12% alpha, blended into backgrounds with `soft-light`. It never overlays text, changes element opacity, or intercepts input. Lighting layers are strongest on saturated blue and lightest on paper (the paper shade is under 2% alpha). Keep the effect subtle at normal viewing size. Use existing scoped material selectors rather than adding texture to every card. The page canvas, customer logos, forms, tables, documentation, and article text remain clean. No animated noise, whole-element filters, or extra blending layers above content. Decorative material tokens switch off for printing and forced colors.

### Imagery and interface art

| Asset / source | Intended use |
| --- | --- |
| `public/images/sky/hero-sky.webp` | Open sky with clouds concentrated below the copy. Decorative background, empty alt. |
| `public/images/sky/contact-meadow.webp` | Closing invitation with text in the clear area and a readability overlay. |
| `public/images/customers/*.webp` | Actual supplied logos, natural colors and aspect ratios; caption “Used by teams at.” |
| `public/images/sky/catalog-library.webp`, `music-team.webp`, `engineering-desk.webp` | Available editorial illustrations, not customer evidence. Use only when the article warrants photography. |
| `app/blog/blog-art.tsx` | Existing illustrated article-cover vocabulary; inspect it before commissioning more imagery. |

The current interface art is primarily HTML/CSS/SVG, with selectable text, actual controls where relevant, and purposeful content. Generated assets supply environments or editorial scenes; they do not supply illegible fake dashboards. Keep generated portraits separate from customer quotations. Asset provenance is in [sky-assets.json](docs/sky-assets.json).

Do not return to records-as-black-holes, robot cities, mascots, or landscapes embedded in every interface. Those were explorations. This direction gets its music specificity from the work, language, assets, and products.

### Motion

Existing feedback transitions are about 160–260ms. Shared buttons lift 2px on hover; homepage buttons 3px. Hero panels bob 7px over 8 seconds, with staggered timing, and pause on hover or `:focus-visible`. These are restrained secondary motion, not an instruction to animate all content.

Respect `prefers-reduced-motion`: the current Sky scopes disable their motion. New components must also provide a stationary readable state. Interaction results should appear promptly and never depend on completing an animation.

Scroll introductions use `ScrollMotion` in the shared site frame. Add `data-reveal` to a compact heading or visual, or `data-reveal-group` to a card container whose direct children can enter independently. Never nest reveal targets or animate a whole tall section. Offscreen targets are held at their transparent first frame until they enter the viewport’s reading area (a 10% bottom inset). Entries fade and move 22px over 800ms (16px / 650ms on mobile), with group delays capped at 240ms (135ms on mobile). Hovering does not cancel the entrance. Homepage coverage includes hero panels below the fold, logos, service copy and artwork, case studies, process steps, ownership, pricing options, software links, FAQs, and footer columns. Initial viewport content, navigated anchors, focused controls, and dynamic results stay immediate. The controller uses native browser animations; content is visible without JavaScript, and reduced-motion changes and printing cancel active entries. Use individual `translate`, preserving existing artwork rotations. Fine-pointer card hovers lift at most 3px; touch layouts remain stationary.

The homepage statement has its own reading interval between the customer logos and services: content-based spacing of 144–208px above and 160–232px below on desktop. On phones, use 112px above and 128px below without forcing a viewport height. Keep normal scrolling and compact print spacing.

The homepage statement between the customer logos and services is a deliberate exception: large centered text reveals word by word as the reader scrolls, from low opacity and a 5px blur to crisp type. It uses `SkyStatement`, not a nested `data-reveal`. The reveal follows scroll position in both directions, including on restored page positions. It starts when the paragraph enters the bottom 90% of the viewport and finishes when its last line reaches roughly 55% of the viewport. It does not pin the page, and only listens for scrolling while the paragraph intersects the viewport. The closing thought uses Sky blue. Screen readers receive one continuous paragraph; reduced motion, printing, and JavaScript-free rendering show the complete text. Changing the motion preference at runtime updates the current reveal state.

### Transformation comparison

The earlier comparison treatment, now removed from the homepage sequence, led with the outcome: a raised Sky-blue “With Recoup” panel on the left and a quieter, slightly recessed “Before” panel on the right. Three matched items cover connected information, repeatable work, and team capability. Keep their order identical in both lists. The blue panel uses the existing blue hero stops and restrained surface grain, with lime check icons. On mobile, stack the outcome first and remove the vertical offset. Use compact row reveals, not a fade of the entire tall panel. Avoid decorative ROI gauges or unsupported performance numbers.

## Shapes

Use soft rectangular frames with smaller inner corners and pill actions. The shared family is 9px inputs, 16px cards, 24px trays, 28px heroes, and a 32px outside frame. Existing homepage variants use a 23px hero inside its frame; mobile uses 24px / 18px. Nested corners should feel related, not like the same radius repeatedly pasted inward.

Circles have jobs: the Recoup action disc, a small status dot, or a compact product symbol. Arcs may support a specific illustration; do not scatter ornamental orbital diagrams across unrelated sections.

Use the existing `PageMark` SVG. Never redraw the logo, stretch it, substitute a letter, or lowercase the wordmark. White is for dark/blue surfaces; ink is for white. Keep the symbol and text aligned at the existing gap.

Use `SkyArrow` for directional icons: 24×24 viewBox, 2px stroke, rounded caps and joins. Its parent controls displayed size, typically 17–20px. Do not replace it with a font glyph or a long hairline arrow. The dark circular disc stays centered inside the pill; the icon must not stretch to fill it.

Shared page buttons, text links, and documentation use 17px arrows; the homepage uses 20px. Component rules must take precedence over page defaults. Mobile navigation and copy controls have 44px tap targets. Menus switch from bars to a close icon when open; dropdown chevrons point upward. At widths of 370px or less, stack homepage hero actions and keep their labels on one line.

## Components

### Reuse map

| Need | Existing implementation |
| --- | --- |
| Public-page shell | [SiteFrame](components/site-frame.tsx), [SkySiteHeader](components/sky/site-header.tsx), [SkySiteFooter](components/sky/site-footer.tsx) |
| Hero / section / action / closing CTA | `PageHero`, `PageSection`, `PageButton`, `PageCTA` in [page-ui.tsx](components/sky/page-ui.tsx) |
| Logo and arrows | [PageMark](components/sky/brand.tsx), [SkyArrow](components/sky/arrow.tsx) |
| Hero scene | [SkyHeroCards](components/home/sky-hero-cards.tsx) and [its content styling](components/home/sky-hero-cards.css) |
| Problem-to-outcome comparison | [SkyTransformation](components/home/sky-transformation.tsx) |
| Source-linked report | [SkyRoyaltyExample](components/home/sky-royalty-example.tsx) and [shared data logic](lib/sky-royalty-example.ts) |
| Diligence composition | [SkyInvestmentExample](components/home/sky-investment-example.tsx) |
| Engagements / tools | [SkyPartnership and SkyTools](components/home/sky-partnership.tsx) |
| Articles / reading | [blog-art.tsx](app/blog/blog-art.tsx), [blog.css](app/blog/blog.css), [docs.css](app/docs/docs.css) |
| Inquiry and agent handoff | [InquiryForm](components/inquiry-form.tsx), [browser-agent-tools.tsx](components/agents/browser-agent-tools.tsx) |

`SiteFrame` adds the public header, main landmark, and footer on every route, `/` included. Pages never add a second shell, header, footer, or main landmark. The homepage composition (`components/home`) lives inside the main landmark supplied by `SiteFrame`.

### Actions and navigation

At ≤900px, both headers use a left hamburger, a centered Recoup symbol without the wordmark, and a right **Free Audit** CTA. Keep the symbol centered with equal flexible outer columns and a 44px center column. The logo and menu have 44px touch targets; the audit CTA has a 44px minimum height. Mobile menus open below the header, scroll within the viewport, and close on selection, outside tap, or Escape. Desktop keeps the full wordmark and **Get a Free Audit** label. Shared rules live in `components/sky/navigation.css`.

The shared primary `PageButton` is a lime pill with dark text, minimum height 48px, padding `7px 7px 7px 21px`, and a 34px dark icon disc. At ≤600px its minimum height becomes 46px and left padding becomes 16px. The secondary variant is translucent/outlined with an unfilled arrow area. Use a dark text-link for quieter actions on white. Follow existing header styles rather than turning every nav link into a CTA.

Use anchors for destinations and buttons for local changes. Name what happens. Preserve keyboard access, visible focus, current-page state, and a click/tap-operated tools menu. Where several equal items need actions, subordinate their links to the section's main next step rather than filling the screen with lime.

### Cards and work examples

Choose the arrangement from the content:

- **Simple parallel services:** restrained cards in a gray tray. Current partnership columns are `1fr 1.38fr 1fr`, not three mechanically equal boxes.
- **Complementary products:** the current tools tray combines a tall dark Skills card, a white platform card, and a pale-blue developer card. Different scale communicates different roles.
- **Royalty review:** a larger report at left; a lime finding and a source inspector at right. Select a payment source to update the detail. Show the totals, the exception, its records, and the question that follows.
- **Investment review:** inputs lead to a diligence draft with source excerpts and a seller question. The team capability panel explains adoption alongside the output.

Do not invent arbitrary metrics, random charts, excessive pills, nested toolbars, or six versions of the same card. Every substantial interface visual should answer: **What work is happening? What comes out? What can I inspect or do next?**

Work examples demonstrate a method; they are not customer results. Keep them under “What we help build,” preserve source and draft context, and do not attach customer logos to made-up financial data. Do not reintroduce repetitive synthetic/example-data badges throughout the interface. The owner replaced the hero rating and stars with the customer-logo strip on September 12, 2026. Do not reintroduce the rating caption or stars; ratings, performance promises, and testimonials need their own supporting source.

### Pricing and plan selection

The unified `/pricing` page groups Platform, Advisory, and Build + Partner in one dimensional comparison tray. Use an equal reading order: plan and audience, price and billing terms, action, concrete inclusions, scope note. Depth comes from subtle borders, raised icon tiles, and a pale-blue emphasis for the build partner. Enterprise and API/MCP sit in shorter, distinct cards beneath the subscriptions. Keep “Start free” and unsupported popularity labels out of this paid-plan comparison.

Use the shared definitions in `lib/pricing.ts` for prices and the 20% annual discount. Monthly is the initial selection. Native radio controls expose billing state; annual prices show both the monthly equivalent and the full yearly charge. Keep the currency explicit and use tabular numerals. Stack whole cards on mobile and preserve readable amounts, terms, and buttons at 320px. Do not make buyers swipe to discover the other plans.

Pricing is a main-navigation destination for software and services. Advisory, build, and enterprise actions carry an allowlisted plan and billing period to `/start-project`. The form displays the choice and retains it independently of the editable brief. Choosing a plan does not charge a card or create a subscription. The platform action opens the existing app; it is not a newly provisioned checkout. Usage charges have their own documentation and are outside the annual subscription discount.

### Forms, disclosures, and states

Inputs use white fills, 1px borders, 9px corners, visible labels, and explanatory text where needed. Inquiries use the existing form rather than a new disconnected mock. The form is disabled before hydration, with a no-JavaScript email path. A pending state must preserve the brief; an error must explain what can be done next; a success state must match the actual saved-inquiry receipt. Email-draft fallback is not a confirmed sent inquiry: expose the complete prepared message with copy and manual-selection options.

Functional fields and placeholders are 16px, labels and meaningful handoff notes are at least 14px, and input borders use a visible blue-gray rather than the decorative tray separator. All inquiry email fallbacks stay on the review screen until the visitor explicitly opens or copies the draft; do not launch the mail application automatically.

ROI inputs pair exploratory sliders with exact numeric fields. Invalid or blank assumptions suppress the calculation and handoff until corrected. The ROI and readiness tools offer an explicit action to carry a summary to the inquiry; the visitor chooses whether to apply it and can edit before sending. Use the existing one-hour session draft mechanism, with selectable text if storage is unavailable. Do not put the brief into query parameters. General inquiries start at **Not sure yet**; known projects can start with **Custom systems**.

The fuller `/start-project` inquiry uses three visible groups: company, work, and budget/timing. Role, phone, website, and tools/providers are optional. Budget is an initial project range in USD, with **Not decided yet** available; timing means desired start, with **Just exploring** available. These are qualification answers, not published prices or a delivery promise. Reuse `InquiryForm` with `qualified` and the shared qualification validator so CRM notes and email/copy fallbacks retain the same answers. In email mode, **Prepare email brief** displays the unsent message before the visitor chooses to open or copy it. `/build/start`, contact and the footers link to this page.

Use native disclosure patterns for source excerpts and FAQs. Keep controls keyboard-operable and expose selection/expanded state. A highlighted source row must update the corresponding content. Provide empty search results and a next step instead of a blank card.

Agents use the same public content and utilities as visitors. A prepared brief remains editable and unsent until the visitor takes the next action; browser tool success should produce a visible result. Do not add a decorative chat bubble or claim automatic access to someone's private account or agent memory.

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| Keep the white canvas, blue atmosphere, lime actions, and dark green anchors. | Combine Sky with the older orange/cream theme or a new automatic dark mode. |
| Make the outcome readable before inviting exploration. | Hide the main value in tiny panels, motion, or abstract copy. |
| Use depth for source/result relationships and a few focal scenes. | Put illustrations in every interface or turn every section into a bento grid. |
| Reuse shared components and inspect their responsive states. | Create a new button, arrow, header, or footer for each page. |
| Give products their own useful paths. | Make consulting buyers decode the whole API/platform inventory. |
| Preserve source-backed claims and explicit completion states. | Convert logos, decorative stars, illustrative numbers, or draft generation into false proof. |

### Review before calling a page complete

1. Can a new visitor identify the audience, offer, concrete output, and next action from the heading and first paragraph?
2. Does the page use the right family: marketing, work example, reading, or a task form? Is every visual doing useful work?
3. Check actual desktop and mobile renderings, keyboard focus, open disclosures, long titles, empty/error states, and reduced motion. Aim for 44px practical touch targets; meet WCAG 2.2's 24px minimum or its applicable spacing/other exceptions. Keep content usable at 320 CSS pixels and with text enlargement.
4. Check normal-text contrast at 4.5:1, large text at 3:1, and required control/state indicators at 3:1. Check actual backgrounds and overlays, not just palette swatches. Do not use color alone to explain a state.
5. Confirm that controls and source links work. Screenshots alone do not verify the reporting, inquiry, or agent journeys.
6. Compare any new value with this document and its source component. Update both when an intentional design decision changes; preserve a short dated note in the research record.

### Known implementation drift

The source still contains legacy global cream/orange colors and several close Sky color variants. These are not new brand tokens. The shared `--font-sans` / `--font-mono` aliases resolve to the loaded DM Sans Variable / IBM Plex Mono families; the global display font uses DM Sans Variable. Shared current-navigation and contact-back text links use `#087BAB`; decorative blues retain their role. The palette's small-text contrast caveats remain relevant elsewhere. This is not a complete CSS consolidation or accessibility certification.

The September 10 [product, design, and engineering council](docs/council/2026-09-10-product-design-engineering.md) records the inquiry, tool continuity, and report readability changes. Working report names are 15px, useful supporting information 12–14px, and source disclosures have a 44px target. Miniature hero panels retain their distinct illustration scale.

The [full-site visual review](docs/design/full-site-visual-review.md) and [page-by-page section inventory](docs/design/full-site-section-inventory.md) record the subsequent desktop, mobile, reading, and interaction pass. These dated records predate removal of the historical design routes and the move of homepage components into `components/home`; their archived route lists are not current site inventory.

### Maintenance and provenance

Read this file before new UI work. Keep one current root `DESIGN.md`; archive research separately. Recheck actual CSS and rendered examples when changing values. Update the date only after that review. Do not overwrite the application with a generated token export: this project uses scoped CSS and intentional responsive formulas.

Format reviewed against Google's current **alpha** DESIGN.md specification; alpha describes the exchange format, not Recoup's approval status. Use the eight section headings and valid token references when editing. The [research and validation record](docs/design/2026-09-10-design-md-research.md) includes primary sources, known limits, and the pinned linter command.

### Case-study reading order

Use the section heading “What we’ve built” and an explicit Case studies label. Project titles lead every card and appear before its illustration in reading order, including on mobile. Keep the artwork’s internal document titles smaller than the project title and name the document literally. Never put an abstract slogan in the largest type inside an illustration. The featured homepage card leads with its copy on the left and supporting art on the right.

### Music-video offer

`/music-videos` preserves the offer content and lead contract from PR #89 with Sky styling. Hero and films use the original published film posters, not invented proof. Keep the free skill download, paid generation-budget caveat, generated-song scope, and separately quoted released-recording service distinct. Preserve campaign events and sanitized attribution; contact information stays out of analytics.


### Homepage announcement — September 13, 2026

The hero pill announces “Catalog Skills V2 is here” and links to `/skills`. Use a small lime New badge, DM Sans text, and the shared arrow. The entire pill is a keyboard-accessible link with a minimum 44px touch target.

The hero headline reads “AI transformation” followed by “for music rightsholders.” Keep its supporting copy concise: “We build AI systems you own and train your team to use them.” Set the subtitle at 24px on desktop and 18px on mobile, with balanced wrapping and a 720px maximum desktop width.

The homepage customer row uses white-filled Fatbeats lettering with its green outline and transparent background (`fatbeats-records-white-transparent.webp`). Set “Used by teams at” to white at 68% alpha so it supports rather than competes with the logos.

Seeker uses the official stacked white logotype (`seeker-logotype-white.png`) from the Seeker client design-system assets. Preserve its transparent background and natural proportions; display at approximately 76 × 30px alongside the other customer marks.

Center customer marks in six equal desktop columns, ordered Duetti, Seeker, Warner, Atlantic, Rostrum, Fatbeats to distribute dark, light, and colored artwork. Size each logo proportionally, about 15% smaller than the original row, rather than assigning identical widths. Mobile uses three columns with a 76px width and 26px height cap.

### Navigation typography — September 13, 2026

The shared header uses DM Sans for navigation and its audit button. Desktop links are 14px / 500; the audit action is 14px / 550 with a 1.4 line height and `-.01em` tracking. Use sentence case: “Get a free audit.” On phones, “Free audit” is 13px / 550 with a minimum 44px touch target. Mobile menu links use 14px / 500. Preserve the centered navigation, wordmark geometry, lime CTA, and existing focus and menu behaviors.

### Homepage copy reduction — September 14, 2026

The homepage gives visitors enough information to choose a next step; linked service, pricing, product, and case-study pages carry the detail. Changed homepage copy lives in `lib/copy/home.ts`, `home-offers.ts`, and `home-case-studies.ts`; footer copy lives in `lib/copy/footer.ts`. The machine-readable homepage summary reuses homepage copy.

The statement is “We help the people who create, own, and invest in music put AI to work.” Preserve its word-by-word reveal and accessible plain-text equivalent, with a balanced text measure capped at 820px or 30ch. Give this statement an editorial pause: 144–208px above and 160–232px below on desktop, and 112px above / 128px below on phones. Use content-based spacing instead of a viewport-height scroll section. Ownership retains repository control, documentation, training, licenses, and separate support terms. FAQs retain practical audit, ownership, integration, data-access, and cost questions. Prices, annual billing totals, attribution, form behavior, and destination-page detail stay intact.

Shorter cards should contract with their copy. Do not leave large empty regions where descriptions, repeated benefits, or feature lists were removed. Keep readable type sizes and touch targets, including the sentence-case closing audit button.

The closing invitation reads “Recoup your team’s time.” with a balanced two-line headline, one short invitation to bring a workflow, and “Get a free audit.” Keep “Implementation scoped and priced separately.” as a quieter 12px note. Use separate description and note styles so body typography cannot override the note. All closing copy lives in `homeCopy.contact`.
