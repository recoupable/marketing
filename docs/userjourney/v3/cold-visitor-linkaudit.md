# Cold Visitor + Link Audit — recoupable.com (v3)

**Persona:** Skeptical cold visitor (clicked an ad/link, no context) who also happens to be a meticulous link/IA auditor — the person who finds the cracks.
**Method:** Live inspection of `http://localhost:3000` (latest code) + source review of `marketing/app/**`, `lib/nav.ts`, `components/layout/*`, `next.config.ts`, `app/sitemap.ts`.
**Date:** 2026-06-02
**Prior score (v2):** 7.5/10 → **New score (v3): 8.5/10**

---

## 1. The 5-Second Test (homepage)

**Verdict: PASS — clearer than most B2B sites.**

In the first 5 seconds I see, in order:
1. Eyebrow: "Building the agentic music industry"
2. H1: **"Put AI to work inside your music business."**
3. Subhead: "Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack."
4. Two CTAs: **Talk to us** (primary) / **Read our research** (secondary)
5. Trust line: "You own what we build. We never train on your data."

**What is it?** AI implementation for music companies. **Who's it for?** Labels, catalogs, platforms. Both answered above the fold. The "research lab + implementation partner" framing matches the actual product (not self-serve SaaS), so the skeptic in me isn't bait-and-switched later. The trust line preempts the #1 objection (data/IP) immediately. This is a strong hero.

**5-second nitpicks:** "agentic music industry" is jargon that a cold non-technical label exec may not parse, but the plain-English subhead rescues it. The dual CTA is good (one for buyers, one for skeptics who want proof before talking).

---

## 2. Narrative walkthrough

I land cold and the hero passes. I scroll: a **"Used by teams at"** logo row (Atlantic, Warner, 300, Rostrum, Fat Beats, ONErpm, Duetti, Big Ass Kids). As a skeptic, my instinct is to click a logo to verify the relationship — **but the logos aren't links** (they're `<img>` inside a `<span>`, no `<a>` wrapper, no `href`). That's the one v2 complaint that's still completely open (the homepage was deliberately not touched this round).

Down the page: a clean Research / Build / Partner triad, an honest "Your team has Claude. It still can't do the work." problem section, an architecture diagram, an interactive open-source **skills shelf** with a real install command (`npx skills add recoupable/skills`) and per-card GitHub deep links, a consulting band, an anonymized pull quote linking to **/audit**, and a "we run our own labels" proof section linking to **/company/recoup-records**. Every internal link I clicked resolved 200; every external link (research, chat, docs, GitHub, X) resolved 200.

I went hunting for the v2 cracks — duplicate routes, "coming soon" stubs, orphaned pages. **Most are gone.** The route sprawl has been collapsed into clean 308 redirects (verified below). The `/resources` "Coming soon" stub is dead and redirects to `/developers`. But I found one real remaining crack: **blog post `<title>` tags still double the brand** (e.g. `… | Recoup | Recoup`), which is the exact v2 doubled-title bug — it was fixed on the static pages but not on the 13 blog posts.

---

## 3. Complete link / status audit table

Every internal href across global chrome (header + footer, present on all pages) and the homepage body, plus all redirect routes. Status verified via `curl -s -o /dev/null -w "%{http_code}"`.

### 3a. Header (`lib/nav.ts` + `Header.tsx`)

| Link text | href | Status | Destination | Verdict |
|---|---|---|---|---|
| (logo) | `/` | 200 | — | OK |
| Research | `https://research.recoupable.com` | 200 (ext) | — | OK (opens new tab) |
| Platform | `/platform` | 200 | — | OK |
| Pricing | `/pricing` | 200 | — | OK |
| Consulting | `/consulting` | 200 | — | OK |
| Talk to us (button) | `/consulting` | 200 | — | OK |

> **Header gap:** `/trust` is **NOT** in the header nav. Only Research, Platform, Pricing, Consulting. (Confirmed in `lib/nav.ts`.)

### 3b. Footer (`Footer.tsx`)

| Link text | href | Status | Destination | Verdict |
|---|---|---|---|---|
| Consulting | `/consulting` | 200 | — | OK |
| Research | `https://research.recoupable.com` | 200 (ext) | — | OK (no external icon) |
| Recoup Records | `/company/recoup-records` | 200 | — | OK |
| Contact | `mailto:hi@recoupable.com` | n/a | — | OK |
| Platform | `/platform` | 200 | — | OK |
| Partners | `/partners` | 200 | — | OK |
| Developers | `/developers` | 200 | — | OK |
| API Docs | `https://developers.recoupable.com` | 200 (ext) | — | OK |
| Pricing | `/pricing` | 200 | — | OK |
| About | `/company/about` | 200 | — | OK |
| Vision | `/company/vision` | 200 | — | OK |
| Trust & Governance | `/trust` | 200 | — | OK |
| Open app | `https://chat.recoupable.com` | 200 (ext) | — | OK |
| Privacy | `/privacy-policy` | 200 | — | OK |
| Terms | `/terms-of-use` | 200 | — | OK |
| 𝕏 / IG / in / YT | social URLs | 200 (ext) | — | OK |

### 3c. Homepage body (`app/page.tsx`)

| Link text | href | Status | Destination | Verdict |
|---|---|---|---|---|
| Talk to us (hero) | `/consulting` | 200 | — | OK |
| Read our research (hero) | `https://research.recoupable.com` | 200 (ext) | — | OK |
| Read our research (lane) | `https://research.recoupable.com` | 200 (ext) | — | OK |
| See the tools (lane) | `/platform` | 200 | — | OK |
| Talk to us (lane) | `/consulting` | 200 | — | OK |
| Read the latest (research) | `https://research.recoupable.com` | 200 (ext) | — | OK |
| Read the API docs | `https://developers.recoupable.com` | 200 (ext) | — | OK |
| Talk to partnerships | `/partners` | 200 | — | OK |
| we never train on your data | `/trust` | 200 | — | OK |
| View on GitHub (skill card) | `github.com/recoupable/skills/tree/main/skills/<skill>` | 200 (ext) | — | OK |
| Browse all skills | `github.com/recoupable/skills` | 200 (ext) | — | OK |
| Chat | `https://chat.recoupable.com` | 200 (ext) | — | OK |
| we'll set them up for you | `/consulting` | 200 | — | OK |
| Talk to us (consulting band) | `/consulting` | 200 | — | OK |
| See what an AI readiness audit surfaces | `/audit` | 200 | — | OK (only inbound link to /audit) |
| See how we dogfood | `/company/recoup-records` | 200 | — | OK |
| Talk to us (final CTA) | `/consulting` | 200 | — | OK |
| Read our research (final CTA) | `https://research.recoupable.com` | 200 (ext) | — | OK |
| **Customer logos** (×8) | **none** | n/a | — | **Unlinked `<img>` — not clickable** |

### 3d. Redirects (`next.config.ts`) — should be 308, NOT 404

| Source | Status | → Destination | Lands on | Verdict |
|---|---|---|---|---|
| `/advisory` | 308 | `/consulting` | 200 | OK |
| `/advisory/book` | 308 | `/consulting` | 200 | OK |
| `/solutions` | 308 | `/platform` | 200 | OK |
| `/results` | 308 | `/company/recoup-records` | 200 | OK |
| `/resources` | 308 | `/developers` | 200 | OK (stub gone) |
| `/calculator` | 308 | `/consulting` | 200 | OK |
| `/playbook` | 308 | `/platform` | 200 | OK |
| `/playbook/download` | 308 | `/platform` | 200 | OK |
| `/learn` | 308 | `/blog` | 200 | OK |
| `/learn/demos` | 308 | `/blog` | 200 | OK |
| `/records` | 308 | `/company/recoup-records` | 200 | OK |
| `/company/recoupable-records` | 308 | `/company/recoup-records` | 200 | OK (bonus, not in brief) |

**All 12 redirects are single-hop 308s landing directly on a 200 page. No redirect chains, no redirect-to-redirect, no 404s.**

### 3e. Live pages traversed (all 200)

`/`, `/consulting`, `/platform`, `/pricing`, `/developers`, `/partners`, `/trust`, `/company`, `/company/about`, `/company/vision`, `/company/recoup-records`, `/blog`, `/blog/<post>` (×13 published), `/audit`, `/privacy-policy`, `/terms-of-use` — **all return 200.**

### 3f. External links (all reachable)

| URL | Status |
|---|---|
| `research.recoupable.com` | 200 |
| `chat.recoupable.com` | 200 |
| `developers.recoupable.com` | 200 |
| `github.com/recoupable/skills` | 200 |
| `x.com/recoupable` | 200 |

---

## 4. Sitemap check (`/sitemap.xml`)

**14 static + 13 published posts = 27 URLs.** Cross-checked every entry: **all return 200; none are redirected or dead.** The four pages the brief said were added are present: `/consulting`, `/pricing`, `/partners`, `/trust`. No redirected URLs (e.g. `/solutions`, `/resources`, `/results`) leaked into the sitemap.

**Two minor sitemap notes:**
- **`/audit` is a live (200) page that is NOT in the sitemap.** It's reachable only from one homepage body link. This is likely intentional (a lead-gen page you don't want indexed/diluting), but per a strict "sitemap shouldn't miss live pages" reading, it's a live page omitted. Decide deliberately: index it or `noindex` it.
- The 2 unpublished MDX drafts (`ai-replacing-music-marketing-teams`, `how-much-does-ai-music-marketing-cost`) correctly return **404** and are correctly **excluded** from the sitemap. No leakage. Good hygiene.

---

## 5. Orphan check

A page is an "orphan" if nothing in nav/footer/body links to it.

| Page | Inbound links | Orphan status |
|---|---|---|
| `/company` | Only back-links from its own children (`/company/about`, `/company/vision`, `/company/recoup-records` each link "← Company"). **Not in header, not in footer, not on homepage.** | **Soft orphan** — a cold visitor can only reach the company hub if they're already on a `/company/*` child. In sitemap, so crawlers find it, but humans browsing the chrome can't. |
| `/audit` | One inbound link (homepage pull-quote section only). Not in nav/footer. | **Semi-orphan** — single point of entry, and not in sitemap. Fragile: if that one homepage section changes, the page is unreachable. |
| `/company/about`, `/company/vision`, `/company/recoup-records` | Footer (+ recoup-records from homepage) | OK |
| `/trust` | Footer + homepage body + `/consulting` (×2) | OK (well-linked, but missing from header) |
| All others | nav/footer | OK |

No hard orphans (every live page has ≥1 inbound link). The `/company` hub being unreachable from global chrome is the most notable IA gap.

---

## 6. v2 → v3: complaint-by-complaint

| v2 complaint | v3 status | Evidence |
|---|---|---|
| **(1) Route sprawl** — `/solutions≈/platform`, `/audit≈/calculator`, and `/learn÷/resources÷/results÷/playbook÷/blog` cluster | **FIXED** | `/solutions`, `/calculator`, `/resources`, `/results`, `/playbook`, `/learn` all now 308-redirect to canonical pages. The content cluster collapsed to one surface (`/blog`). 11/11 off-brand routes gone. |
| **(2) `/resources` "Coming soon." stub** | **FIXED** | `/resources` → 308 → `/developers` (200). Stub deleted. |
| **(3) Orphaned strong pages** (`/results`, `/advisory/book`) | **FIXED** (by deletion) | Both now redirect into live pages; no longer dangling. (Note: a *new* soft-orphan appeared — `/company` — see §5.) |
| **(4) Customer logos unlinked** | **NOT FIXED** | Logos are `<img>` in `<span>`, no `<a>`/href (`app/page.tsx` §2 LOGOS; `lib/customerLogos.ts` has no URL field). Homepage was intentionally not changed this round. |
| **Doubled page-title bug** (`… \| Recoup \| Recoup`) | **PARTIALLY FIXED** | Static pages now single-suffix (e.g. `Consulting — … \| Recoup`). **Blog posts still doubled** — see §7. |
| **Sitemap cleanup** | **FIXED** | Only 200 pages; redirected URLs dropped; `/consulting /pricing /partners /trust` added. |
| **Low-contrast body text** | **FIXED (code-level)** | `--muted-foreground` is `#6b6b6b` on `#fff` (light) / `#a0a0a0` on `#0a0a0a` (dark); body copy uses `--foreground` at 50–60% opacity. Reasonable contrast; full WCAG ratio not measured via curl. |

---

## 7. Remaining + new issues (evidence-based)

### REMAINING (the doubled-title bug lives on in blog posts)
The v2 title fix was applied to static pages but **not** to the 13 blog posts. Root cause: `lib/seo.ts` `buildPostMetadata` returns `title` as a **plain string** (`const title = post.seo.title || post.title; … return { title }`), so the root layout's `titleTemplate: "%s | Recoup"` appends a second brand suffix. Since each post's frontmatter `seo.title` already ends in a brand suffix, every post doubles it:

- `/blog/ai-music-marketing` → `How AI is Changing Music Marketing in 2026 | Recoup | Recoup` ← **exact v2 bug**
- `/blog/ai-for-record-labels` → `AI for Record Labels: Cut Costs, Scale Marketing | Recoupable | Recoup`
- `/blog/how-labels-use-ai` → `How Labels Use AI in 2026: Real Workflows | Recoupable | Recoup`

This also introduces a **brand inconsistency** (`Recoupable` vs `Recoup`) because frontmatter suffixes were authored inconsistently.

**Fix (one of):** (a) return `title: { absolute: post.seo.title || post.title }` from `buildPostMetadata` so the template doesn't append; **and** (b) strip the brand suffix from all `seo.title` frontmatter so there's a single source of truth.

### NEW issues
1. **`/company` is a soft orphan** — reachable only from its own children's back-links, not from header/footer/homepage. Add it to the footer "Company" column (or make the footer "Company" heading link to it).
2. **`/audit` is a semi-orphan + not in sitemap** — single inbound link, no nav/footer entry, omitted from sitemap. It's a real, polished page; either promote it (e.g., a CTA in nav/footer or `/consulting`) or consciously `noindex` it.

### REGRESSIONS
- None in routing/links. The only "regression-adjacent" item is the **soft-orphaning of `/company`** as a side effect of consolidating IA — but it's far less severe than the v2 orphaning of strong pages, since `/company` is a hub of already-linked children.

### Anchor-text / destination mismatches
- None material. "Research" (header + footer) points to the `research.` subdomain as intended; footer "Research" lacks an external-tab indicator but the header one opens a new tab — minor inconsistency, not a mismatch.

---

## 8. Score: 8.5 / 10 (v2 was 7.5)

**Why up a point:** The IA route sprawl that dragged v2 — duplicate-intent routes, the `/learn÷/resources÷/results÷/playbook` content cluster, the `/resources` "Coming soon" stub, and the orphaned strong pages — is **genuinely resolved** with clean, single-hop 308s and a cleaned sitemap. A cold visitor now can't stumble into a dead page, a stub, or a redirect chain. The 5-second test is strong and honest. 41 internal/external link checks, zero 404s on live routes, zero redirect chains.

**Why not higher:** Two avoidable cracks a sharp visitor *will* find — (1) the **doubled brand in every blog `<title>`** (the same bug class v2 was dinged for, now hiding in the content surface, plus a Recoup/Recoupable inconsistency), and (2) the **`/company` soft-orphan** and **`/audit` semi-orphan + sitemap omission**. And the **unlinked customer logos** remain the single biggest trust-credibility miss on the highest-traffic page: you name-drop Atlantic and Warner but give a skeptic nothing to click to verify it.

---

## 9. Top fixes, ranked

1. **Fix the blog `<title>` doubling** (high impact, low effort) — return `title: { absolute }` in `buildPostMetadata` and strip brand suffixes from `seo.title` frontmatter. Kills 13 doubled titles + the Recoup/Recoupable inconsistency in one stroke. This is the same bug v2 flagged; closing it fully matters.
2. **Make customer logos credible** (high trust impact) — at minimum, add a `url` to `CustomerLogo` and wrap each in an `<a>` (case study, the label's site, or `/company/recoup-records`). An unclickable Atlantic/Warner row reads as decoration to a skeptic.
3. **De-orphan `/company`** (medium) — add it to the footer Company column or link the column heading. Right now the company hub is invisible to anyone not already inside `/company/*`.
4. **Decide `/audit`'s fate** (medium) — it has one fragile inbound link and isn't in the sitemap. Either promote it (nav/footer/`/consulting` CTA + add to sitemap) or `noindex` it on purpose. Don't leave it half-reachable.
5. **Put `/trust` in the header nav** (low/optional) — "you own what we build, we never train on your data" is a top-3 objection for this buyer; trust currently lives only in the footer + a couple body links. Promoting it would reinforce the core promise where buyers look first.
