# User Journey — Skeptical Cold Visitor + Link/IA Audit

_Source under test: `marketing/app/page.tsx` + `components/layout/Header.tsx` + `components/layout/Footer.tsx` + `lib/nav.ts` + `lib/config.ts`. Analysis only, no live requests. External links + `npx`/CLI packages flagged "verify-external" (parent will check)._

---

## 5-second test (what / who / why-trust — in character)

I land cold. Headline: **"Put AI to work inside your music business."** Eyebrow: "Building the agentic music industry." Subhead: "Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack."

- **WHAT — PASS (just).** I can tell it's "AI for music companies, done with/for you." "Research lab and implementation partner" is concrete enough. The buzzword "agentic music industry" in the eyebrow makes me wince, but the H1 + subhead recover it.
- **WHO — PASS.** "labels, catalogs, and platforms" is explicit. I know in 3 seconds whether I'm in the room. (If I'm an indie artist or a developer, less so — see info scent.)
- **WHY-TRUST — PARTIAL/FAIL.** Within 5s I see a logo row ("Used by teams at" Atlantic, Warner, 300, Rostrum…) — that's the strongest signal. But it's logo-soup with no links/case studies, the testimonial later is anonymous ("Catalog fund operator"), and the proof is "we run our own labels" rather than "here's what we did for a client." Trust is the weak leg.

**Verdict on the 5-second test: marginal PASS.** What/who land fast; trust is asserted, not evidenced.

---

## Section-by-section skeptic read

### Header
- **Thinking:** Three things only — Research (opens off-site), Consulting, and a black "Talk to us" pill. Clean. But where's the product? Pricing? Anything for a developer?
- **Narrative so far:** "This is a boutique consultancy that also publishes research."
- **Friction:** As a self-serve / product-curious visitor I have no header path to Platform, Developers, or Pricing — they're footer-only. I'd have to scroll the whole page to discover them.
- **Works:** Minimalism reads premium and consulting-first; "Talk to us" is unambiguous.
- **Doesn't:** "Build" — a third of the stated positioning — has **zero header presence.**

### 1. Hero
- **Thinking:** Good H1, real subhead, two CTAs. "Talk to us" (primary) and "Read our research" (secondary, opens new tab).
- **Narrative:** "Consulting first, research as proof." Consistent with header.
- **Friction:** Both CTAs point me off the buying path for product/self-serve — there's no "See the product" or "Try it." If I'm not ready to talk to a human, I have nowhere to go but an external research site.
- **Works:** Copy is specific, not generic AI fluff.
- **Doesn't:** No third, lower-commitment CTA for browsers who aren't ready to book a call.

### 2. Logos ("Used by teams at")
- **Thinking:** Atlantic, Warner, 300, Rostrum, Fat Beats, ONErpm, Duetti, Big Ass Kids. Heavy hitters — if real, this is the best asset on the page.
- **Friction:** **None of the logos are links.** No case study, no "see the work." A skeptic assumes logos = "someone here once used a free tool," not "paying customer." Unverifiable.
- **Works:** Recognizable names create instant credibility scent.
- **Doesn't:** Zero substantiation; `/results` exists but isn't linked from here (or anywhere on the page).

### 3. Lanes — Research / Build / Partner
- **Thinking:** Nice tri-fold of the positioning. Research → research site; Build "See the tools" → `/platform`; Partner "Talk to us" → `/consulting`.
- **Friction:** "See the tools" promises **tools** (the lane copy literally says "Open skills, plugins, and an API … Claude, Cursor, and your own stack"). `/platform` is abstract prose ("Agents, Workflows, Integrations, Data Layer, API & CLI") with **no mention of open skills, plugins, Claude, Cursor, or `npx`** and a "Get started" CTA into the chat app. Anchor over-promises vs. destination. **Mild→moderate mismatch.**
- **Works:** Three clear verbs (Research / Build / Partner) map to three audiences.
- **Doesn't:** The "Build" lane is the one most likely to interest a technical buyer, and it lands on the thinnest page.

### 4. Research ("We learn in the open")
- **Thinking:** "Read the latest" → external research site. Beside it, `ResearchCard` showing "Gatsby Grace" with 45,200 listeners, top cities, 14 playlist placements.
- **Friction:** Card looks like a sample/illustrative dashboard, not a published research artifact, so "Read the latest" + a fake-looking metric card is a slight credibility wobble. All research lives off-site (3rd external hop to the same domain).
- **Works:** "Published in public, not behind a sales call" is a good trust line for a skeptic.
- **Doesn't:** No on-page proof of an actual research piece (title, date, excerpt).

### 5. Problem ("Your team has Claude. It still can't do the work.")
- **Thinking:** This is the best section for me. Sharp, concrete, no links (correct — it's a tension beat).
- **Narrative:** "They understand why my off-the-shelf AI fails on music work."
- **Works:** Three crisp gaps (no music context / no safe access / no workflows). Believable.
- **Doesn't:** Nothing. Leave it.

### 6. Build (dark; Claude/Cursor/API/MCP/Chat; ArchitectureDiagram)
- **Thinking:** Chips + a tabbed Terminal/Claude/ChatGPT demo. The terminal shows `npm install -g @recoupable/cli` and `recoup research "Billie Eilish"` → 98.2M listeners.
- **Friction:** **No links in this entire section** — it's the most "product/dev" moment on the page and there's nothing to click (no Developers, no docs, no CLI link). "Billie Eilish 98.2M" is obviously illustrative; a skeptic clocks it as a mockup. `@recoupable/cli` is a claimed package (verify-external).
- **Works:** Showing the same job inside Terminal + Claude + ChatGPT communicates "bring your own agent" well.
- **Doesn't:** Dead-ends the most motivated technical visitor — no path to `/developers` or `developers.recoupable.com` right here.

### 7. Open tools shelf (5 packs, each `npx skills add recoupable/<x>`)
- **Thinking:** Interactive book spines (Diligence, A&R, Content, Operator, Fan), each with an install command shown as text.
- **Friction:** **This is the worst dead-end on the page.** The install strings are **plain, non-clickable text.** There is **no link to the skills repo / GitHub / a "browse all skills" page.** The whole "we ship in the open" proof has **no destination** — I can't click through to verify a single one exists. The five `npx skills add recoupable/*` commands are all verify-external.
- **Works:** Concept (free, installable, see how we work) is exactly what a skeptic wants.
- **Doesn't:** Gives me a reason to trust, then no way to act on or verify it.

### 8. Consulting band
- **Thinking:** "Most teams are planning their AI strategy. Start executing it." CTA "Talk to us" → `/consulting`. Fine.
- **Friction:** Third "Talk to us" → `/consulting` on the page; the CTA repetition is heavy and all roads lead to one email-a-human action.
- **Works:** Strong execution-vs-planning framing.
- **Doesn't:** No pricing/scope hint here; I have to guess what "talk to us" costs (footer Pricing says $19/mo product; consulting page says "from $500" — see trust gaps).

### 9. Pull quote (anonymized)
- **Thinking:** "Catalog diligence … cut it down to minutes … changes how we buy." — "Catalog fund operator."
- **Friction:** Anonymous. As a skeptic I discount unattributed quotes heavily. AND it names **catalog diligence** as the #1 pain — but there's **no link anywhere to a diligence/audit tool** (the `Agentic Diligence` pack is unclickable; `/audit` + `/calculator` exist but aren't linked).
- **Works:** The pain ("diligence takes forever") is real and specific.
- **Doesn't:** Names a pain, offers no path to the cure.

### 10. Proof ("We run our own labels.")
- **Thinking:** "Recoup Records and our artist Gatsby Grace use these same tools…" CTA "See how we dogfood" → `/company/recoup-records`.
- **Friction:** Destination is real and on-message (good), but it's a short prose page — "dogfood" promise is only partly delivered (no metrics/receipts). There's also a near-empty `/records` "Coming soon" page that duplicates this concept (not linked, but an IA smell).
- **Works:** Anchor ("See how we dogfood") matches destination intent. Honest framing.
- **Doesn't:** Dogfooding claim would land harder with numbers.

### 11. Final CTA ("Let's build it in your stack.")
- **Thinking:** "Talk to us" → `/consulting`; "Read our research" → external. Same two CTAs as the hero.
- **Works:** Clean closer, strong line.
- **Doesn't:** Identical CTA pair to the hero = the entire page funnels to exactly two actions (book a call / read off-site). No product/self-serve exit.

### Footer
- **Thinking:** Here's everything that was missing from the header — Platform, Developers, API Docs, Pricing, About, Vision, Open app, socials.
- **Friction:** The footer is doing the navigation job the header refuses to. A product/dev/pricing visitor must reach the bottom of a long page to discover these exist.
- **Works:** Complete, well-grouped (Work with us / Build / Company), legal + social present.
- **Doesn't:** Footer-only is fine for /privacy, not for **Pricing, Platform, Developers** — those are demand-capture pages.

---

## FULL LINK AUDIT TABLE

| Location | Anchor text | Destination | Int/Ext | Status | Note |
|---|---|---|---|---|---|
| Header | (logo) | `/` | Internal | OK | Home self-link from home; fine |
| Header nav | Research | `research.recoupable.com` | External | verify-external | Opens new tab; anchor matches |
| Header nav | Consulting | `/consulting` | Internal | OK | Route exists; content matches |
| Header (right) | Talk to us | `/consulting` | Internal | OK | — |
| Header (mobile) | Research / Consulting / Talk to us | same as above | both | OK / verify-external | Mirrors desktop |
| Hero | Talk to us | `/consulting` | Internal | OK | — |
| Hero | Read our research | `research.recoupable.com` | External | verify-external | New tab |
| Logos | (8 customer logos) | — | — | dead-end | **Not linked** — images only, no proof path |
| Lane: Research | Read our research | `research.recoupable.com` | External | verify-external | — |
| Lane: Build | See the tools | `/platform` | Internal | mismatch | Lane promises open skills/plugins/Claude/Cursor; `/platform` is abstract infra prose, no skills/`npx` |
| Lane: Partner | Talk to us | `/consulting` | Internal | OK | — |
| Research §4 | Read the latest | `research.recoupable.com` | External | verify-external | — |
| Build §6 (chips) | Claude/Cursor/API/MCP/Chat | — | — | dead-end | Spans, not links; no path to `/developers` or docs here |
| Build §6 (demo) | `@recoupable/cli`, `recoup research` | (text in terminal mock) | External | verify-external | Claimed npm package shown as text, not a link |
| Open shelf §7 | `npx skills add recoupable/diligence` | (text) | External | verify-external + dead-end | **Non-clickable; no repo/GitHub/browse link** |
| Open shelf §7 | `npx skills add recoupable/ar` | (text) | External | verify-external + dead-end | same |
| Open shelf §7 | `npx skills add recoupable/content` | (text) | External | verify-external + dead-end | same |
| Open shelf §7 | `npx skills add recoupable/operator` | (text) | External | verify-external + dead-end | same |
| Open shelf §7 | `npx skills add recoupable/fan` | (text) | External | verify-external + dead-end | same |
| Consulting band §8 | Talk to us | `/consulting` | Internal | OK | — |
| Proof §10 | See how we dogfood | `/company/recoup-records` | Internal | OK | Route exists; anchor matches intent |
| Final CTA §11 | Talk to us | `/consulting` | Internal | OK | — |
| Final CTA §11 | Read our research | `research.recoupable.com` | External | verify-external | — |
| Footer | (logo) | `/` | Internal | OK | — |
| Footer social | 𝕏 | `x.com/recaboreal` | External | verify-external | Handle `recaboreal` ≠ "recoupable" — **possible inconsistency**, confirm intended |
| Footer social | IG | `instagram.com/recoupable` | External | verify-external | Consistent handle |
| Footer social | in | `linkedin.com/company/recoupable` | External | verify-external | Consistent |
| Footer social | YT | `youtube.com/@recoupable` | External | verify-external | Consistent |
| Footer: Work with us | Consulting | `/consulting` | Internal | OK | — |
| Footer: Work with us | Research | `research.recoupable.com` | External | verify-external | — |
| Footer: Work with us | Recoup Records | `/company/recoup-records` | Internal | OK | Matches proof section target |
| Footer: Work with us | Contact | `mailto:hi@recoupable.com` | External | verify-external | Matches config |
| Footer: Build | Platform | `/platform` | Internal | OK | Route exists |
| Footer: Build | Developers | `/developers` | Internal | OK | Route exists; **footer-only** |
| Footer: Build | API Docs | `developers.recoupable.com` | External | verify-external | — |
| Footer: Build | Pricing | `/pricing` | Internal | OK | Route exists; **footer-only** |
| Footer: Company | About | `/company/about` | Internal | OK | — |
| Footer: Company | Vision | `/company/vision` | Internal | OK | — |
| Footer: Company | Open app | `chat.recoupable.com` | External | verify-external | Only path to the actual app on the whole page |
| Footer bottom | Privacy | `/privacy-policy` | Internal | OK | — |
| Footer bottom | Terms | `/terms-of-use` | Internal | OK | — |

**No broken internal routes found.** Every internal `href` on the homepage + chrome resolves to a page that exists. The problems are **dead-ends** (logos, chips, the entire open-tools shelf), **one anchor/content mismatch** (`See the tools` → `/platform`), and **information architecture** (below).

---

## Duplicate / overlapping routes (which to consolidate)

These routes exist but are **not linked from the homepage or chrome** (orphans). Each pair/cluster overlaps and should be consolidated to one canonical URL:

| Cluster | Routes | Recommendation |
|---|---|---|
| Recoup Records | `/records` ("Coming soon" stub) **vs** `/company/recoup-records` (real page) | Canonical = `/company/recoup-records` (homepage already uses it). **Redirect `/records` → `/company/recoup-records`** and delete the stub. |
| Diligence / value tool | `/audit` **vs** `/calculator` | Likely the same "catalog audit / ROI" job. Pick one (suggest `/audit`), redirect the other, and **link it from the page** (the pull quote begs for it). |
| Product surface | `/platform` **vs** `/solutions` | Feature-led vs audience-led versions of the same product story. `/platform` is the one linked — make it canonical, fold `/solutions` in or redirect. |
| Consulting | `/advisory` (→ redirects `/consulting`) + `/advisory/book` **vs** `/consulting` | `/consulting` is canonical and already used. Confirm `/advisory/book` still has a purpose or fold into consulting CTA. |
| Content / resources | `/learn` (+ `/learn/demos`, `/learn/use-cases`, `/learn/playbooks`) **vs** `/resources` **vs** `/results` **vs** `/playbook` (+ `/playbook/download`) **vs** `/blog` | Multiple content hubs, none surfaced in nav/footer. Pick **one** content home (suggest `/learn`), redirect the rest, and add it to nav so research/proof isn't 100% off-site. |

---

## Header nav vs footer-only info scent (≤2-click reachability)

Header = **Research (external), Consulting, Talk to us** only. Platform, Developers, Pricing, Company are **footer-only**.

| Audience | Wants | Path from homepage | ≤2 clicks? | Verdict |
|---|---|---|---|---|
| **Catalog buyer** (the lead pull quote) | A diligence/audit tool or proof | Only "Talk to us" → `/consulting`. `/audit` + `/calculator` exist but are **unlinked anywhere**. The "Agentic Diligence" pack is non-clickable text. | **No** (the actual tool is unreachable) | **FAIL** — names the pain, hides the cure |
| **Platform / product buyer** | Product + pricing | Lane "See the tools" → `/platform` (1 click, but mismatched page); Pricing only via footer (1 click) | Yes, technically | **WEAK** — reachable but buried + mismatched |
| **Label** | Consulting + proof | "Talk to us" → `/consulting` (1); "See how we dogfood" → `/company/recoup-records` (1) | Yes | **PASS** |
| **Developer** | API / CLI / docs | Build §6 has **no link**; must scroll to footer → Developers or API Docs (1 click) | Yes, but only via footer | **WEAK** — the dev-heavy section dead-ends; no header path |

Net: the page serves the **label/consulting** buyer well and the **product/developer/self-serve** visitor poorly. For a company positioned as "research + consulting + **build**," the "build" audience has the worst info scent.

---

## Missing links the page should have

1. **Open-tools shelf → a real destination.** Add a "Browse all skills on GitHub" / repo link (and make the `npx` strings copyable). Right now the central builder-proof has zero click-through.
2. **Header: a "Build" / "Platform" entry** (and ideally "Pricing"). Don't bury the whole product story in the footer.
3. **Build §6 → `/developers` + `developers.recoupable.com`.** The most technical section on the page has no developer link.
4. **A diligence/audit landing link** (from the pull quote and/or the Diligence pack) → `/audit`. The #1 named pain currently has no path.
5. **Logos → `/results`** (or case studies). Turn logo-soup into provable social proof.
6. **A low-commitment product CTA in the body** ("Open the app" / "Try it" → `chat.recoupable.com`) — currently the app is reachable only from the footer.
7. **An on-page link to a real research post** (not only the external homepage) so the research pillar has an in-context proof point.

## Trust-signal gaps

- **Unlinked logos** — strongest asset, zero substantiation, no case study behind any of them.
- **Anonymous testimonial** ("Catalog fund operator") — skeptics discount unattributed quotes; no company, no name, no result number.
- **Illustrative demos read as mockups** — `Gatsby Grace` 45,200 listeners and `Billie Eilish` 98.2M in the terminal are clearly sample data; without a "sample" label they slightly undercut credibility.
- **Proof = "we run our own labels"** but `/company/recoup-records` carries no metrics/receipts; "dogfood" is asserted, not shown.
- **No founder/team on the homepage** — Sidney's strong credentials (platinum records, patent, Beyoncé/Nicki) live on `/consulting`, invisible to a cold scanner.
- **Pricing ambiguity** — footer `/pricing` says product from **$19/mo**; `/consulting` says sessions **from $500**. Two business models, no reconciliation or cross-link; a skeptic can't tell what they're buying.
- **Unverifiable "open" claims** — five `npx skills add recoupable/*` packs + `@recoupable/cli`; if any don't resolve, the "in the open" credibility collapses (verify-external).

---

## Verdict (would a cold visitor stay?)

**Likelihood to stay & engage: 6 / 10.**

A skeptical cold visitor who is a **label or consulting buyer** orients in ~5 seconds (clear what/who), respects the logo row, and will plausibly click "Talk to us" or skim the research — they stay. A **product, developer, or self-serve / catalog-diligence** visitor hits the page's structural problems fast: the whole funnel collapses into "book a call / read off-site," the build/dev/pricing surface is buried in the footer, the open-tools shelf and demos are dead-ends, and the one named pain (catalog diligence) has no clickable cure. Clean design and sharp copy keep it from being worse; the buried IA and unverifiable/anonymous proof keep it from being better.

---

## Top 5 fixes (ranked)

1. **(Conversion) Give the open-tools shelf + Build section real destinations.** Make `npx` commands copyable and add a "Browse all skills (GitHub)" link; link Build §6 to `/developers` + API docs. This is the single biggest dead-end and it's sitting on the page's best "show, don't tell" moment.
2. **(Clarity/IA) Promote Platform + Pricing into the header.** A "research + consulting + build" company should not hide its entire build/product/pricing story in the footer. Add at minimum a "Build/Platform" nav item; consider "Pricing."
3. **(Positioning/Conversion) Surface the catalog-diligence path.** The pull quote names diligence as the #1 pain — link it to a real `/audit` landing and/or the Diligence pack. Don't name the pain and hide the cure.
4. **(IA hygiene) Consolidate duplicate routes.** Redirect `/records` → `/company/recoup-records`; pick one of `/platform` vs `/solutions` and one of `/audit` vs `/calculator`; collapse the `/learn` / `/resources` / `/results` / `/playbook` / `/blog` content sprawl into one hub and surface it.
5. **(Trust) Make proof provable.** Link logos to `/results`/case studies, attribute (or strengthen) the testimonial, label demo data as illustrative, add metrics to the Recoup Records page, and reconcile the $19/mo vs $500 pricing story so a skeptic knows exactly what they'd buy.
