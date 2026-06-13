# WEBSITE.md — Reference Review, Site Audit & Ticket Backlog

**Date:** 2026-06-12
**Branch audited:** `feat/research-consulting-site` (PR #20, local dev)
**Sources:** `referances/{tenex,every,pm-world}/` (TEARDOWN/COPY/DESIGN/ABOUT + ~35 screenshots), live walk of `/`, `/consulting`, `/pricing`, `/platform`, `/partners`, `/trust`, `/company/recoup-records`, `/blog`, `/blog/ai-music-marketing`, `/audit` (light + dark + 390px spot-check), `userjourney.md` v3 backlog.

**TLDR:** Positioning and copy spine are reference-grade. The gaps are (1) proof density — zero stats, one anonymous quote, no visible artifacts; (2) conversion mechanics — every CTA dead-ends in `mailto:`, no newsletter capture outside `/blog`, no qualification; (3) editorial packaging — generic blog taxonomy, no named formats, no art direction. Tickets below.

---

## 1. The reference playbook

Three sites, three monetization archetypes, one identical engine:

| | pm-world | Tenex | Every |
|---|---|---|---|
| **Model** | Solo creator → $99 plugin zip | Consultancy → enterprise retainers | Media co → subscription bundle + studio + consulting |
| **Hero** | "One Product Manager. The Impact of 10." | "Win the next decade." | "The Only Subscription You Need to Stay at the Edge of AI" |
| **Proof** | 4.9/5, 1,000+ customers, 235/11/12/6 inventory | Client logos + mechanics-specific quotes | 100K builders, 16K stars, $175B AUM, Disney/FAA logos |
| **Capture** | $99 checkout + setup call | 10-field revenue-qualified form | 6-field project-size form + sitewide newsletter |
| **Recoup tier** | Self-serve plugin (future) | Enterprise consulting (now) | Membership middle (future) |

**Shared moves all three make (and we mostly don't yet):**
1. Numbers do the persuading — concrete inventory and borrowed-scale stats within the first two viewports.
2. Funnel ends in qualified capture or checkout — never a `mailto:`.
3. Newsletter as the funnel floor — named, promised, on every page.
4. One argument cut into rooms — era claim → binary → honest diagnosis → destiny CTA (Tenex's spine).
5. The company is the case study — operational war stories with receipts are the flagship content.
6. Superlatives get receipts within one viewport.
7. Anti-category positioning ("not slide decks" / "not management consultants") — we already do this.

## 2. Tactics catalog (deep pass, per reference)

### pm-world (prodmgmt.world)
- **Inventory plaque** (`product/2`): dark "AT A GLANCE" card — 235 skills / 11 workflows / 12 subagents / 6 MCPs, each row with a one-line gloss + "one /start away." Concrete inventory rendered as UI.
- **YES/NO qualifier** (`product/3`): "This is for you" pains written as confessions ("You've pasted your company context into ChatGPT for the 50th time this month") vs "Skip this if" (wants a dashboard, won't use Claude/Cursor). Disqualification reads as confidence.
- **Workflow catalog** (`product/5`): every workflow shown as a `/workflow:strategy` terminal chip + its pipeline ("problem → who it's for → what's unique → competitive position. Produces a strategy kernel"). Product UI as marketing copy.
- **Receipts table** (`product/12`): 6 numbered experience claims, ✗ alternative vs ✓ PM OS ("Sticks to your rules: re-checks every reply, even three hours in").
- **Maker story** (`landing/4`): face + "I built it for myself first… 500+ PMs use it now. I use it daily." followed by a giant solo-operator pull-quote (named, role'd: "David, Solo PM, Series A Startup").
- **Testimonial wall** (`landing/5`): ~10 cards, every one named + titled + companied (Senior PM at Qantas, CEO at Bizzy, CTO at Conqa), every quote an outcome story ("activation rate dropped 8 points… fixed it in a day").
- **Activation-framed final CTA** (`landing/7`): "Use it on one real problem this week." + setup call included.
- **Newsletter box** (`landing/8`): FREE badge, "Join 3,120 product managers," 3 checkmark promises (<30-min ideas, weekly Zoom calls, unsubscribe anytime). Footer doubles as SEO sitemap (tools directory, hub pages).
- **Quantified pains** (`landing/2`): "3+ hours re-explaining context / 40 saved links, zero used / ∞ hrs on the wrong problems."

### Tenex (tenex.co)
- **Copy spine:** era claim ("cost of intelligence → zero") → binary ("Disrupt yourself. Or be disrupted.") → honest diagnosis ("You could drive that transformation from within. Our bet is, you won't.") → destiny closer ("Stay on the right side of history." — same full-bleed muses image ending every page).
- **Proof viewport** (`landing/5`): "AI isn't scary. *Ignoring it is.*" two-beat + "Trusted by the best:" logo bar in the same screen.
- **Testimonials** (`landing/6`): client logo + mechanics in the quote ("like having an internal engineering team. I can text them whenever. 10/10"; "3x more enterprise features with Mag7-level code quality").
- **FAQ** (`landing/8`): 6 questions that kill category objections (vs dev shop? what does AI transformation mean? pricing? vs other consultancies?).
- **Qualified form** (`getstarted/1`): left side sells (3 checkmarked bullets), right side filters — 10 fields including **Annual Revenue dropdown** + service interest + "how did you hear."
- **Beliefs-as-offer** (`ai-engineering/2`): "We hire the best / We use AI (a lot) / We charge on outcomes / We pay on outcomes" — pricing mechanics presented as ideology.
- **Playbooks** (`resources/playbooks/1`): austere pixel-serif brand page housing loud YouTube-packaged thumbnails ("ONE MAN ARMY"). Brand surfaces austere; content surfaces loud — they coexist.
- **Design:** one metaphor total commitment (B&W statues + tech), one accent (taxi yellow) with three semantic duties (emphasis/hierarchy/interaction), outline-vs-fill card hierarchy, ceremony type (pixel-serif) reserved for mission statements.

### Every (every.to)
- **Verb-stamped bundle** (`landing/1`): Read / Email / Speak / Listen / Write / Organize — six postage stamps, one verb per product.
- **Product row** (`landing/3`): app screenshot + name + one outcome line + "Try it" pill ("Your AI writing assistant with taste—publish with confidence").
- **Paywall** (`landing/4`): checklist of subscriber benefits (reviews on release day / playbooks / insights / **the apps themselves**) + "Unlock the Every universe" + quiet "Maybe later."
- **Consulting banner on homepage** (`landing/12`): powder-blue full-width "Stop Planning Your AI Strategy. Start Executing It… from makers, not management consultants" — the enterprise cross-sell embedded in the editorial surface.
- **Sitewide footer capture** (`landing/12`): "What Comes Next — new ideas to help you build the future—in your inbox, every day." Email field on every page.
- **Consulting page** (`consulting/1-5`): logo bar (Disney, FAA, Ogilvy, Lionsgate) → stats plaques ($175B+ AUM / 16K+ stars / 130K+ subs) + "As seen in" → numbered How-we-work (Executive Alignment → Strategy → Train → Transformation) + productized "Executive Offsite" → "Work with builders, not followers" (writes/ships/open-sources proof pillars) → **starred, named testimonials** incl. the enablement quote ("gave us the know-how and tools to keep building without them") → form with **disqualifier** ("ready to transform, not experiment") + project-size dropdown.
- **Named beats:** Vibe Check, Context Window, Putting AI to Work — each rail a promise readers learn to seek out. Release-day velocity (model reviews day-of, camps within 72h).
- **Guides library** (`guides/1`): evergreen flagships with one consistent art-direction system (engraving + flat color blocks) + author bylines.
- **War-story formula:** confession + concrete number + replicable artifact ("How We Run a 25-Person Company on Four AI Agents — plus sample prompts").

## 3. Our site today (page-by-page state)

### Homepage `/` (`app/page.tsx`)
**Working:** hero is specific (catalog/royalties/roster) with ownership + no-train line; "Your team has Claude. It still can't do the work." gap section is reference-grade; three-lane storyboard (Research/Build/Partner); Gatsby Grace metrics card; dark "One engine" section with Terminal/Claude/ChatGPT switcher (bring-your-own-agent proof); bookshelf skills shelf with one-command install; dogfooding section; "Most music teams are still *planning*… Start executing it." closer section; dark-mode CTAs fixed (a0b6175).
**Gaps vs references:** zero stats anywhere; logo bar is a thin 35%-opacity strip, unlinked; one anonymous testimonial; no newsletter capture; no manifesto/honest-diagnosis beat; no mantra closer; every CTA funnels to `/consulting` → `mailto:`; Partner lane card still points to `/consulting` not `/partners`; §9 quote CTA still routes diligence intent to the `/audit` marketing quiz; hero trust line tiny + unlinked; "Read our research" uses external-arrow icon for an internal link (`researchUrl` is now `/blog?type=essay`).

### `/consulting`
**Working:** hero + "not slide decks"; 4 offers; 4 segments; 3 why-us pillars; "$500, no pitch deck"; 5-question FAQ.
**Gaps:** no logos, no stats, no testimonials, no disqualifier, no numbered engagement sequence; conversion = `mailto:` (`CONTACT` const, line 14).

### `/pricing` (`lib/copy/pricing.ts`)
**Working:** correct three-tier ladder (Open / Chat / Implementation) with buyer-named kickers and per-tier CTAs.
**Gaps:** a page named Pricing with zero prices; Implementation hides the $500 anchor `/consulting` already states (userjourney v3 #7); Chat tier doesn't say "free tier" until the FAQ.

### `/platform`
**Working:** "The music layer for agents" + plugins marketplace section — including the **Catalog deals plugin** ("buy-side and seller-prep diligence: data-room ingestion, royalty normalization, rights checks, IC memos, valuation analysis"). The diligence offering the userjourney audit wanted *exists here*.
**Gaps:** that catalog-deals capability is invisible from the homepage (shelf shows only the 5 open packs) and from the §9 diligence quote; marketplace plugins are prose cards, not the workflow-chip treatment that makes pm-world's catalog feel like product.

### `/partners`
**Working:** segments, three ways to plug in, commercials/data FAQ answers 5 of 6 deal questions.
**Gaps:** zero economic numbers (no rev-share %, per-run, per-seat illustration) — platform lead can't size a deal (userjourney v3 #8).

### `/trust`
**Working:** six commitments in the buyer's language; "We'll put it in writing."
**Gaps:** footer-only discoverability (not in header nav); CTAs are `mailto:`; not linked from the hero ownership line.

### `/company/recoup-records`
**Working:** 4 workflows mapped to named real skills; "If a skill can't carry weight on our own roster, we don't publish it."
**Gaps:** asserts dogfooding but shows nothing — no dates, no numbers, no artifacts. Compare Every's war-story formula (confession + number + replicable artifact).

### `/blog` + posts
**Working:** clean hub ("The agentic music industry, in the open."), 18 pieces, filters, newsletter capture on hub + post pages; post body voice is right (first-person, real numbers — "22 finished videos"); related posts. Post `<title>` doubling appears **fixed on this branch** (verified single "| Recoup" on `/blog/ai-music-marketing`).
**Gaps:** generic taxonomy (Essays/Guides/Tutorials) instead of named beats; no art direction on cards; no author byline block on post pages; end-of-post CTA is a bare text link.

### `/audit`
**Working:** 7-question readiness quiz, "FREE — TAKES 2 MINUTES," trust chips under the fold.
**Gaps:** absent from `sitemap.ts`; only fragile inbound links; results screen captures no email (lead magnet without capture); content mismatch with the homepage diligence quote that links to it.

### Cross-cutting
- **Conversion infrastructure exists but is unused for conversion:** `lib/attio.ts` (contacts + UTM + lifecycle) powers only the newsletter form; the actual sales path is `mailto:`.
- **Two unresolved trust-page entry points:** `/company` soft-orphan (only via child back-links).
- **Recoup vs Recoupable** brand suffix inconsistency in older post frontmatter (sweep needed).
- **Mobile:** 390px spot check looked sane (H1 wraps to 5 lines, hamburger collapses); full pass still owed — browser-resize tooling made the check inconclusive.

## 4. Gap analysis (ranked)

1. **No proof numbers anywhere** — references put inventory/scale stats in viewport 1-2; we have zero. (Highest impact, cheapest fix.)
2. **Conversion path = `mailto:`** — no form, no qualification, no attribution, despite Attio infra existing.
3. **Testimonial poverty** — one anonymous quote vs walls of named, outcome-specific stories.
4. **No artifact proof** — diligence buyer (our highest-value persona, stuck at 6/10 in userjourney v3) still has nothing to *see*.
5. **No newsletter on the main funnel** — the "still researching" majority has no low-commitment next step outside `/blog`.
6. **No era claim / honest diagnosis / mantra closer** — the argument is implicit; Tenex proves making it explicit is the brand.
7. **Editorial packaging** — beats unnamed, cards text-only, no release-day velocity format.
8. **Price anchor inconsistency** — `/pricing` hides what `/consulting` states.

## 5. Ticket backlog (atomic)

Legend: `[REF]` = reference-derived, `[UJ]` = carried from userjourney v3 backlog. Each ticket is independently shippable.

**Status: all 37 tickets implemented (2026-06-13).** Build green; 28 Playwright e2e tests pass on desktop + mobile. Key new files: `components/marketing/*` (ContactForm, NewsletterSignup, StatsStrip, LogoBar, Testimonials, ReceiptsTable, MantraClose), `lib/{track,beats,authors,faqJsonLd}.ts`, `lib/copy/{stats,testimonials,consultingFaq,receipts,diligence}.ts`, `app/diligence/`, `app/api/contact/`, `app/opengraph-image.tsx`, `e2e/marketing.spec.ts`.

### P0 — quick wins (≤ half-day each)

- [x] **W-01** Partner lane card → `/partners` (was `/consulting`). [UJ]
- [x] **W-02** §9 quote CTA retargeted to `/diligence` (the sample report), not the audit quiz. [UJ]
- [x] **W-03** `/trust` added to header nav (`lib/nav.ts`). [UJ]
- [x] **W-04** Hero ownership line enlarged (13/14px, 60%) and linked to `/trust`. [UJ]
- [x] **W-05** `/pricing` Implementation tier shows "From $500 / session"; Chat tier now states the free tier on the card. [UJ]
- [x] **W-06** Swept all 15 posts — brand suffixes stripped from `seo.title`, "Recoupable" → no double suffix. e2e asserts no doubling. [UJ]
- [x] **W-07** Homepage stats strip (`StatsStrip` + `HOMEPAGE_STATS`) after the gap section. [REF]
- [x] **W-08** Logo bar upgraded → shared `LogoBar` (larger, hover-reveal, count caption). [REF/UJ]
- [x] **W-09** Sitewide `NewsletterSignup` in the footer (named newsletter + 3 promises → Attio). [REF]
- [x] **W-10** `MantraClose` line above homepage + consulting closers (one shared component). [REF]
- [x] **W-11** `/company` added to footer; `/company`, `/audit`, `/diligence` in sitemap; `/audit` also linked in footer. [UJ]
- [x] **W-12** Internal research links use `ArrowRight` (not `ArrowUpRight`).

### P1 — structural conversion (the big four + support)

- [x] **W-13** `ContactForm` (name, work email, company, org-type, project-size, message) → `POST /api/contact` → `createAttioLead` with UTM. Live on `/consulting#contact`, `/partners#contact`, `/trust#contact`; mailto kept as fallback. [REF]
- [x] **W-14** Disqualifier line ("ready to transform, not experiment") above the form. [REF]
- [x] **W-15** `/diligence` — redacted sample report (income summary, top tracks, flags, IC-memo excerpt). Linked from §10 quote, shelf teaser, `/partners` catalog segment. [UJ #6]
- [x] **W-16** Marketplace teaser card in the homepage Build section surfaces the catalog-deals workflow. [UJ]
- [x] **W-17** Consulting credibility block (LogoBar + StatsStrip) between hero and offers. [REF]
- [x] **W-18** `Testimonials` component reads `lib/copy/testimonials` (real quotes only — one cleared; renders centered). Placed on homepage + consulting. Two more named quotes still to collect (noted in file). [REF]
- [x] **W-19** Homepage manifesto interlude (honest-diagnosis: "Our bet is you won't"). [REF]
- [x] **W-20** Recoup Records operational log (dated entries w/ numbers, skill links). [REF]
- [x] **W-21** `/partners` pricing answer now states $0.50–$2 per run + 15–25% rev-share band. [UJ #7]
- [x] **W-22** Named "Owned Build" track on `/trust`; trust CTAs point at its `#contact` form (source `trust-owned-build`). [UJ #8]
- [x] **W-23** Build section rebalanced — marketplace teaser + "done for you" line co-equal with the `npx` install. [UJ #9]
- [x] **W-24** `/audit` already captures email pre-results; added `Audit Completed` Plausible event. [REF]
- [x] **W-25** `ReceiptsTable` (5 ✗/✓ rows) on `/platform`. [REF]

### P2 — editorial & brand system

- [x] **W-26** Editorial beats (`lib/beats.ts`) — Release Radar / Label Ops / Catalog Files / Agent Diaries / Vibe Check; all 19 pieces mapped; beat kicker + color accent render on cards. [REF]
- [x] **W-27** Vibe-check standing template + process at `content/templates/vibe-check.md`; `series` frontmatter field added to the schema + `beatForSlug`. [REF]
- [x] **W-28** Card art-direction: per-beat color accent bar + colored kicker on `ContentCard` (lightweight system, applies to all cards). [REF]
- [x] **W-29** `AuthorByline` (avatar, name, role, X link) on post pages via `lib/authors.ts`. [REF]
- [x] **W-30** Workflow chips (`/workflow:diligence` etc.) on `/platform` marketplace plugin cards. [REF]
- [x] **W-31** Verb stamps (Research / Track / Create / Release / Grow) on the shelf pack covers. [REF]
- [x] **W-32** Ceremony closer: dark inverted-room CTA + mantra on homepage/consulting. Bespoke heritage illustration still deferred (design asset). [REF]
- [x] **W-33** Homepage objection strip ("Questions worth answering first.") from shared `homepageFaq`. [REF]

### P3 — QA, SEO, measurement

- [x] **W-34** Mobile QA via Playwright `mobile` project (iPhone 13 / WebKit) — 14 mobile tests pass across hero, form, diligence, pricing, platform, blog, newsletter.
- [x] **W-35** FAQ JSON-LD (`buildFaqJsonLd`) on `/consulting`, `/pricing`, `/partners`.
- [x] **W-36** Branded default OG image via `app/opengraph-image.tsx` (applies to all routes lacking their own; blog posts still override with covers).
- [x] **W-37** Plausible events via `lib/track.ts`: Contact Form Submitted, Newsletter Subscribed, Audit Completed, Skills Install Clicked. (Register matching goals in the Plausible dashboard.)

### Test ideas (after W-07/W-13 land — don't assume, measure)

- **T-01** Hero H1: current vs outcome-quantified ("A label team of ten. Headcount of one.") vs era-stakes ("The next decade of music belongs to AI-native teams.").
- **T-02** Hero kicker: "Building the agentic music industry" vs buyer-spectrum framing ("For labels going from tool-curious to AI-native").
- **T-03** Primary CTA label: "Talk to us" vs value-framed ("Plan my first build" / "Get a working session").
- **T-04** Manifesto interlude (W-19) on vs off — watch scroll depth + consulting CTR.

---

## Maintenance

This file is the consolidated website backlog (supersedes the open items in `userjourney.md` — they're folded in as `[UJ]` tickets). When a ticket ships: check it off here, note the commit, and keep `content/STATUS.md` as the session-level state. Re-run the persona audit (`docs/userjourney/`) after the P1 block lands.
