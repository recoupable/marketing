# User Journey v2 — Distribution / Creator-Tools Platform Lead (Integration / Partnership)

> Re-audit of recoupable.com in character, evaluating an **integration/partnership**, not advisory.
> Source files read top-to-bottom. v1 baseline scored **6/10**. This pass scores below.

## Score: 8/10 — improved (+2 vs v1)

The single biggest v1 complaint — "there's no path for me, every door is consulting" — is largely fixed. A real `/partners` page now exists and answers 5 of my 6 deal-questions directly, including the one I said was deal-defining: who pays for tokens. `/platform`'s CTA no longer dumps me in the consumer chat app, and the Build section finally has a CTA plus a plain-English MCP line. What keeps this off a 9: the homepage **"Partner" lane still routes to `/consulting`** (the most intuitive door for me is still the wrong one), there's no header entry for partners, and the commercials are qualitative — still no numbers to size a deal.

---

## Narrative (section by section)

### Header (chrome)
Nav is now `Research · Platform · Pricing · Consulting` (`marketing/lib/nav.ts:11-16`), with the black "Talk to us" button still hardwired to `/consulting` (`marketing/components/layout/Header.tsx:72-77`). Progress over v1 (Platform + Pricing are promoted), but **there is still no "Partners" item in the header.** As a partner-evaluator my fastest path is Platform → scroll → "Talk to partnerships," a two-hop. The default button still says "talk to a consultant," not "talk to partnerships."

### 1. Hero
Unchanged from v1: eyebrow "Building the agentic music industry" (still the line that makes me lean in), H1 "Put AI to work inside your music business" (still subtly recasts me as an operator), sub names "labels, catalogs, and platforms … custom agents that run in your stack" (`marketing/app/page.tsx:226-233`). Both CTAs still soft for me (`/consulting` + research). Vocabulary fit remains best-in-class.

### 3. Lanes — Research / Build / Partner
The Build card "See the tools" → `/platform` is still the right door and on-message. **The problem child:** the card literally labeled **"Partner"** ("We implement it with you … custom agents built for your roster and workflows") **still links to `/consulting`** (`marketing/app/page.tsx:179-186`, `LANES[2].href`). The new `/partners` page exists but the homepage lane named "Partner" doesn't point to it. See the judgment call below — this is my top remaining gripe.

### 6. Build — "One harness, many workflows" (my lane)
Two v1 dead-ends are fixed here:
- **CTA now exists** (`marketing/app/page.tsx:381-396`): "Read the API docs" → docs + **"Talk to partnerships" → `/partners`.** The best partner content on the page now has somewhere to click.
- **MCP is now explained in plain English** (`marketing/app/page.tsx:374-376`): "MCP is the open standard that lets any agent — Claude, Cursor, or one you built — securely call Recoup's music tools without custom glue code." That directly answers my v1 top-3 question ("is there an MCP server I can point our agents at?").

### NEW — `/partners` (the page I came for)
`marketing/app/partners/page.tsx`. Judged hard against my six requirements:
- **(a) Embed/OEM** — ✅ "Embed / OEM: Run Recoup agents behind your own UI and brand. Your users never leave your product; you keep the customer relationship and the data boundary." (`models[0]`, lines 36-39).
- **(b) API & MCP** — ✅ "Call the Recoup API directly, or connect over MCP so any agent … can use our music tools with no custom glue code." (`models[1]`, lines 41-44).
- **(c) Co-built agents** — ✅ "We build the workflows with your team … then hand them off into a repo your organization controls." (`models[2]`, lines 46-49).
- **(d) Commercials (rev-share/usage)** — ✅ qualitatively: "Usage-based by default … For embed/OEM deals we also do rev-share or platform licensing. We scope it to your volume on the first call; nothing here is a fixed public tier." (`commercials[0]`, lines 53-56). **No numbers/ranges.**
- **(e) Who pays for tokens** — ✅ the answer I demanded in v1: "Your choice. You can bring your own model keys and pay providers directly, fold usage into your existing plans, or have us meter and bill it back. We're transparent about per-run cost either way." (`commercials[1]`, lines 57-60).
- **(f) Who it's for** — ✅ "Distributors & DSPs," "Creator & artist tools," "Catalog & rights platforms" (`audiences`, lines 16-32) — that's my segment, named explicitly.
- **Bonus:** agent-discovery answered — "agents can discover and call your integration the way they discover any tool … you show up where your customers' agents already work" (`commercials[3]`, lines 65-68). That's my discoverability/funnel thesis, addressed.
- CTAs are partnership-specific mailto (`mailto:…?subject=Partnership%20Inquiry`, lines 95-99, 170-175) + "Read the API docs."

This page is genuinely built for me. It reads as infrastructure-partner, not advisory.

### `/platform` + copy
CTA **fixed**: `platformCopy.ctaHref = "/partners"`, label "Talk to partnerships" (`marketing/lib/copy/platform.ts:41-42`), rendered at `marketing/app/platform/page.tsx:48-55`. In v1 this CTA was "Get started → chat.recoupable.com" (the consumer app) — my single biggest v1 letdown. Now `/platform` hands off to `/partners`. The five blurbs (Agents/Workflows/Integrations/Data Layer/API & CLI) are still thin and product-overview-flavored, but the exit is correct.

### `/pricing`
Still consumer/enterprise SaaS tiers: Plus $19 / Pro $99 / **Partner "Custom" "For labels & enterprises"** (25,000+ chats/mo, seats, SLA, custom integrations) (`marketing/lib/copy/pricing.ts:74-94`). The "Partner" tier is still an **enterprise label seat plan**, not an embed/rev-share deal, and the page never cross-links to `/partners`. The naming collision from v1 persists: "Partner" means a label enterprise plan here, and a platform integration over on `/partners`.

### `/consulting`
"Who This Is For" = Labels, Distributors, Management Companies, Catalog Owners (`marketing/app/consulting/page.tsx:45-50`). **Platforms / creator tools still omitted.** That's fine *if* the homepage stops sending platform-leads here — but it doesn't (see below). This is still a $500-session advisory page about Sidney.

### Footer
"Build" column now includes **Partners → `/partners`** alongside Platform, Developers, API Docs, Pricing (`marketing/components/layout/Footer.tsx:18-27`). So `/partners` is reachable from the footer. Still no "Partners" in the header.

---

## What's fixed since v1 (with sources)

1. **`/partners` exists and is strong.** New file `marketing/app/partners/page.tsx` covers embed/OEM, API+MCP, co-built agents, usage/rev-share commercials, who-pays-for-tokens, and my exact audience segments. Directly resolves v1 fix #1, #4, and most of #5.
2. **`/platform` CTA fixed.** `marketing/lib/copy/platform.ts:41-42` → "Talk to partnerships" → `/partners`, not the consumer chat app. Resolves v1's "biggest letdown."
3. **Build §6 has a CTA.** `marketing/app/page.tsx:381-396` adds "Read the API docs" + "Talk to partnerships → /partners." Resolves v1 fix #2 (the dead-end).
4. **MCP explained in plain English.** `marketing/app/page.tsx:374-376`. Resolves the v1 "MCP is a chip but never explained" complaint.
5. **Footer surfaces Partners.** `marketing/components/layout/Footer.tsx:20` adds `/partners` to the Build column.
6. **Token economics now answered (qualitatively).** `/partners` `commercials[1]` gives the three real options (BYO keys / fold into plans / meter & bill back). This was my v1 deal-defining gap.

---

## What's STILL broken or missing for me (ranked)

1. **The homepage "Partner" lane routes to `/consulting`, not `/partners`** (`marketing/app/page.tsx:183`). This is the headline problem. The card is literally titled "Partner" and says "custom agents built for your roster and workflows" — the most intuitive door for someone in my seat — and it drops me onto a 1:1 advisory page about Sidney that doesn't even list platforms in "Who This Is For." The correct destination now exists; the most-obvious link still points at the wrong one. A platform lead skimming the homepage gets funneled into consulting and may never discover `/partners` unless they happen to scroll the Build dark-band CTA or dig into the footer. **Fix is one line.**
2. **No quantified commercials.** `/partners` says "usage-based … rev-share or platform licensing … transparent about per-run cost" but gives **zero numbers** — no rev-share %, no per-run cost example, no volume tiers. I can't size a deal or build a business case without a call. "Nothing here is a fixed public tier" is honest, but even an illustrative worked example ("at ~X runs/mo, here's the rough split") would let me model it before reaching out.
3. **No header entry for partners.** `marketing/lib/nav.ts` has no "Partners," and the primary "Talk to us" button still → `/consulting`. My path is Platform→scroll→partners, or footer. For a B2B partner motion, partners deserves a first-class signpost.
4. **`/pricing` "Partner" tier still collides.** `marketing/lib/copy/pricing.ts:74-94` is an enterprise label seat plan, not embed/rev-share, and doesn't link to `/partners`. If I land on /pricing first I'll misread "Partner" as a seat plan. Add a "Building a product on Recoup? See Partners →" pointer.
5. **No platform/OEM proof.** Still zero peer logos or case studies — homepage logos are labels/catalogs/distributors (`marketing/lib/customerLogos` via `page.tsx:255-265`), and the only quote is a "Catalog fund operator." "Who else like me has embedded this?" is unanswered. One platform/OEM logo or a two-line integration story on `/partners` would do a lot.
6. **Channel-conflict neutrality not addressed for partners.** Homepage §10 still leads with "We run our own labels." `/partners` reassures on data ("stays inside your boundary," "never train") but not on competitive neutrality. Minor, but I'd ask it on the call.

---

## Link / route issues

- **Misroute (not a 404, but wrong target):** homepage "Partner" lane → `/consulting` instead of `/partners` (`marketing/app/page.tsx:183`). Content mismatch: the link's label/intent ("Partner") doesn't match its destination (personal advisory). This is the most important routing fix on the site for my persona.
- **Minor — unused import:** `marketing/app/partners/page.tsx:2` imports `Link` from `next/link` but the page only uses `<a>` tags. Harmless functionally; likely an ESLint `no-unused-vars` warning that could fail a strict `pnpm build`/lint. Worth removing.
- **No broken internal links found.** All referenced routes (`/partners`, `/platform`, `/pricing`, `/consulting`, `/developers`, `/company/recoup-records`, `/trust`, `/audit`) exist in the allowed route list. Footer + nav targets all resolve.
- Cross-link gap (not broken, just missing): `/pricing` and `/platform`'s body don't point platform-leads to `/partners`; only `/platform`'s footer CTA does.

---

## One thing that would convert me

**Re-point the homepage "Partner" lane to `/partners` and add even a single illustrative commercial example on that page.** Right now the page that answers all my questions exists but the most natural link on the homepage bypasses it for a consulting page that doesn't list platforms. Fix that one `href`, and put one number on the table (a rev-share band or a per-run cost example), and I stop "taking a consulting call against the grain" — I email partnerships with a concrete integration in mind.
