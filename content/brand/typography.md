# Typography Guide

> Updated: 2026-03-30

## Design Principle

Recoup uses a **four-font system** where each typeface represents a layer of the brand:

| Font | Represents | Feeling |
|------|-----------|---------|
| Instrument Serif | The Music | Editorial, emotional, warm |
| Plus Jakarta Sans | The Business | Structured, bold, geometric |
| Geist | The Technology | Modern, clean, systematic |
| Geist Pixel | The Machine | Lo-fi, retro-tech, AI texture |

These four layers mirror the core tension of the product: **music × business × technology × AI**.

---

## Font Stack

### 1. Instrument Serif — Display / Editorial

**Source:** [Google Fonts](https://fonts.google.com/specimen/Instrument+Serif)
**Weights:** 400 (Regular), 400 Italic
**CSS Variable:** `--font-display`

**Role:** Hero headlines, page titles, pull quotes, editorial moments.

The **italic variant** is the signature style — used in the LinkedIn/YouTube banners ("Meet your new AI record label."). Italic creates movement and musicality. Use it for the single most important headline on each page.

Regular (upright) works for section headers where you want authority without the editorial flair.

**Why this font:**
- High-contrast strokes = premium, record-label feel
- Matches established social brand identity
- Distinct from every competitor (they all use sans-serif)

### 2. Plus Jakarta Sans — Subheadings / UI

**Source:** [Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
**Weights:** 500 (Medium), 600 (SemiBold), 700 (Bold)
**CSS Variable:** `--font-ui`

**Role:** H3 subheadings, buttons, CTAs, navigation labels, card titles, form labels.

Plus Jakarta Sans is geometric and confident. The bold weight commands attention without competing with Instrument Serif. It's the "workhorse" — everything that needs to feel clickable, structured, or actionable uses this font.

**Why this font:**
- Geometric but warm (not cold like Inter or Helvetica)
- Bold weights have strong presence for buttons/CTAs
- Pairs well with both serif (Instrument) and sans (Geist) without clashing

### 3. Geist — Body / Content

**Source:** [geist npm package](https://www.npmjs.com/package/geist) or [Vercel](https://vercel.com/font)
**Weights:** 400 (Regular), 500 (Medium)
**CSS Variable:** `--font-body`

**Role:** Body paragraphs, descriptions, long-form content, metadata, captions.

Geist is Vercel's typeface — optimized for screen readability. It's neutral enough to disappear into content (which is what body text should do) while feeling modern and sharp. The slightly narrower letterforms give pages a clean, efficient density.

**Why this font:**
- Purpose-built for web interfaces and readability
- Ships with Next.js ecosystem (fast loading, no external requests)
- Neutral enough to let Instrument Serif and Plus Jakarta shine

### 4. Geist Pixel — Accents / Tech Texture

**Source:** Custom / local font files
**Weights:** 400
**CSS Variable:** `--font-pixel`

**Role:** Terminal output, AI status labels, tech badges, code-adjacent decorations, loading states, small accent text.

Geist Pixel is the "personality" font — used sparingly to add machine texture. It says "this is built by engineers" without being cheesy. A little goes a long way.

**Where to use it:**
- Terminal/console components
- "AGENT ACTIVE" or "PROCESSING" status labels
- Version numbers or build IDs
- Small decorative tech moments (e.g., a grid overlay label)

**Where NOT to use it:**
- Headlines (too small and low-contrast at large sizes)
- Body copy (unreadable in paragraphs)
- Navigation (confusing as UI text)

---

## Type Scale

All sizes use `clamp()` for fluid responsiveness.

| Class | Size | Line Height | Tracking | Font | Used For |
|-------|------|-------------|----------|------|----------|
| `text-display` | `clamp(2.25rem, 5vw + 1.5rem, 3.5rem)` | 1.1 | -0.02em | Instrument Serif | Hero headlines |
| `text-section` | `clamp(1.75rem, 3vw + 1rem, 2.5rem)` | 1.15 | -0.015em | Instrument Serif | Section headers |
| `text-subtitle` | `clamp(1.25rem, 2vw + 0.75rem, 1.5rem)` | 1.3 | -0.01em | Plus Jakarta Sans | Subsection headers |
| `text-lead` | `clamp(1.125rem, 1.5vw + 0.75rem, 1.25rem)` | 1.5 | 0 | Geist | Intro paragraphs, subheaders |
| `text-body` | `clamp(1rem, 0.5vw + 0.9rem, 1.0625rem)` | 1.6 | 0 | Geist | Paragraphs, descriptions |
| `text-small` | `0.875rem` | 1.5 | 0.01em | Geist or Plus Jakarta | Captions, metadata |
| `text-xs` | `0.75rem` | 1.4 | 0.02em | Geist or Geist Pixel | Tags, badges, fine print |
| `text-pixel` | `0.6875rem` | 1.3 | 0.05em | Geist Pixel | Status labels, tech accents |

---

## Hierarchy Map

This is how the four fonts layer on a typical page, from top to bottom:

```
┌─────────────────────────────────────────────┐
│  NAV: Plus Jakarta Sans 500                 │  ← clickable, structured
├─────────────────────────────────────────────┤
│                                             │
│  HERO HEADLINE: Instrument Serif Italic     │  ← emotional, editorial
│                                             │
│  Subheader: Geist 400                       │  ← readable, neutral
│                                             │
│  [CTA Button: Plus Jakarta Sans 600]        │  ← bold, actionable
│                                             │
├─────────────────────────────────────────────┤
│  SECTION TITLE: Instrument Serif 400        │  ← authoritative
│                                             │
│  Body paragraph in Geist 400. This is       │
│  where most content lives. Clean and        │
│  readable at any size.                      │
│                                             │
│  Card Title: Plus Jakarta Sans 600          │  ← structured
│  Card body: Geist 400                       │
│                                             │
│  ┌─ AGENT STATUS ─────────────────────┐     │
│  │  ● ACTIVE  Geist Pixel             │     │  ← tech texture
│  └────────────────────────────────────┘     │
│                                             │
├─────────────────────────────────────────────┤
│  FOOTER: Geist 400 / Plus Jakarta 500      │
└─────────────────────────────────────────────┘
```

---

## Usage Rules

### Headlines (H1–H2): Instrument Serif

- **H1 (hero):** Italic, `text-display` — one per page, the emotional anchor
- **H2 (sections):** Regular (upright), `text-section` — marks major content shifts

### Subheadings (H3–H4): Plus Jakarta Sans

- **H3:** SemiBold 600, `text-subtitle` — card titles, feature names
- **H4:** Medium 500, `text-lead` — sub-sections within cards or content blocks

### Body: Geist

- **Paragraphs:** Regular 400, `text-body`
- **Emphasized text:** Medium 500 (inline bold alternative)
- **Captions/metadata:** Regular 400, `text-small`

### Buttons & CTAs: Plus Jakarta Sans

- **Primary CTA:** SemiBold 600, `text-body`, sentence case
- **Secondary button:** Medium 500, `text-small`, sentence case
- **Tertiary/link-style:** Geist 500 with underline

### Navigation: Plus Jakarta Sans

- Medium 500, `text-small`
- No serif in nav — keep it functional

### Tech Accents: Geist Pixel

- Always `text-pixel` or `text-xs` — never larger than 0.875rem
- Uppercase with wide tracking (`letter-spacing: 0.05em–0.1em`)
- Use for labels, not sentences

---

## Color Application

With black accents (replacing the original `#345A5D` teal):

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Headlines | `#000000` | `#FAFAFA` |
| Body text | `#1A1A1A` | `#E5E5E5` |
| Muted text | `#6B6B6B` | `#999999` |
| Links | `#000000` underline | `#FFFFFF` underline |
| Accent/brand | `#000000` | `#FFFFFF` |
| Pixel text | `#6B6B6B` | `#666666` |

---

## Implementation

### Next.js — `layout.tsx`

```tsx
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

// Geist Sans — via geist npm package
// Variable: GeistSans.variable → --font-geist-sans

// Geist Pixel — load from local font files
const geistPixel = localFont({
  src: "../public/fonts/GeistPixel.woff2",
  variable: "--font-pixel",
  display: "swap",
});
```

### CSS — `globals.css`

```css
body {
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}

h1, h2 {
  font-family: var(--font-display), Georgia, serif;
}

h3, h4, h5, h6 {
  font-family: var(--font-ui), system-ui, sans-serif;
}

.font-pixel {
  font-family: var(--font-pixel), "Courier New", monospace;
}
```

### Tailwind Shortcuts

```html
<!-- Hero: Instrument Serif Italic -->
<h1 class="font-[family-name:var(--font-display)] italic text-display">
  Meet your new AI record label.
</h1>

<!-- Section: Instrument Serif Regular -->
<h2 class="font-[family-name:var(--font-display)] text-section">
  How It Works
</h2>

<!-- Subheading: Plus Jakarta Sans -->
<h3 class="font-[family-name:var(--font-ui)] font-semibold text-subtitle">
  Content Creation
</h3>

<!-- Body: Geist (default, no class needed) -->
<p class="text-body">
  Deploy agents that handle your releases, marketing, and growth.
</p>

<!-- Tech accent: Geist Pixel -->
<span class="font-pixel text-pixel uppercase tracking-widest text-[var(--muted-foreground)]">
  Agent Active
</span>
```

---

## Pairing Rationale

**Why four fonts works here (when it usually doesn't):**

Most sites should stick to 2 fonts. Recoup gets away with 4 because each serves a non-overlapping role:

1. **Instrument Serif** never appears below H2 — it's the "voice" of the brand
2. **Plus Jakarta Sans** handles everything that's clickable or structural — the "hands"
3. **Geist** is invisible infrastructure — the "body" that carries content
4. **Geist Pixel** is seasoning — sprinkled in tiny doses for texture, never for meaning

If you removed any one of these, the hierarchy would collapse or the personality would flatten. That's the test: every font is load-bearing.

---

## Don'ts

- **Don't use Instrument Serif below H2** — it loses impact when overused
- **Don't use Instrument Serif in all-caps** — it wasn't designed for it
- **Don't use Geist Pixel for readable content** — it's decorative, not functional
- **Don't use Geist Pixel larger than ~14px** — it looks broken at scale
- **Don't mix Plus Jakarta and Geist in the same line** — pick one per context
- **Don't add a fifth font** — four is already the maximum; a fifth would create noise
- **Don't use Instrument Serif for buttons** — serif buttons feel indecisive

---

## Font Files

| Font | Source | Variable |
|------|--------|----------|
| Instrument Serif | Google Fonts (via `next/font/google`) | `--font-display` |
| Plus Jakarta Sans | Google Fonts (via `next/font/google`) | `--font-ui` |
| Geist Sans | `geist` npm package | `--font-geist-sans` |
| Geist Pixel | Local files in `public/fonts/` | `--font-pixel` |

### File Locations

| Asset | Path |
|-------|------|
| This guide | `marketing/content/brand/typography.md` |
| Font loading | `marketing/apps/web/app/layout.tsx` |
| CSS variables & scale | `marketing/apps/web/app/globals.css` |
| Local font files | `marketing/apps/web/public/fonts/` |
| Brand logos | `marketing/apps/web/public/brand/` |
| Illustration style | `marketing/apps/web/public/Recoup-Illustration-Style-Guide.txt` |
