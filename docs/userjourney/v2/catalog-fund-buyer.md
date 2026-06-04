# User Journey v2 — Catalog Fund Diligence Buyer (re-audit)

> Second visit to recoupable.com, same persona, after a round of fixes.
> Read of actual current source (`app/page.tsx`, `lib/nav.ts`, `Footer.tsx`, and the
> CTA destinations I'd click). Analysis only — no source files modified.

## Who I am (recap)

I run acquisitions at a fund that buys music catalogs / royalty streams. ~1 week
into using Claude seriously. I came back from another LinkedIn post about
"agentic catalog diligence." My decision still hinges on four things:
1. Can this actually cut catalog diligence from **weeks to minutes**?
2. Can I **SEE a real example of the output** — income summary, top tracks, vintage, royalty analysis?
3. Can I **try it without being a developer**?
4. **Who owns the work, and is my proprietary deal/royalty data safe** (never used to train models)?

---

## Score: 5/10

**v1 was 3/10 → improved by +2 (improved, but not "for me yet").**

The fixes that landed are real and two of them matter to me a lot — the broken
install command is gone, and there is finally a serious ownership / no-training
answer. But the two things my entire decision hangs on (#1 prove weeks→minutes,
#2 show me a real diligence/income output) are **still completely unmet**, and the
one CTA on the page aimed squarely at me is now a bait-and-switch. So I went from
"bounce and write them off" to "bounce but I'd reach back out" — a genuine
improvement, not a conversion.

---

## Narrative (section by section, in character)

**Header / nav (`lib/nav.ts`).** Research, Platform, Pricing, Consulting. This is
better than I remember — "Platform" and "Pricing" are now in the top nav, so as a
buyer evaluating a thing (not booking a call) I have an info scent without
scrolling the whole page. Good. Still no "Diligence" or "Catalog" entry, which is
the literal thing I came for, but at least the product door is visible now.

**§1 Hero.** H1 "Put AI to work inside your music business." Sub names "catalogs."
Same premium-consultancy wallpaper as before — "research lab and implementation
partner… custom agents that run in your stack." Two CTAs are still **Talk to us**
and **Read our research** — neither is "show me the thing." BUT: there is now a new
line directly under the buttons (line 243): *"You own what we build. We never train
on your data."* That single sentence is the first thing on this entire site that
speaks to my #4 gate, and it's above the fold now. My guard drops a notch on the
first screen instead of never. That's a meaningful change.

**§2 Logos.** "Used by teams at" — same as before. Labels/distributors, Duetti is
the closest peer to my world. Fine, mild credibility. Still no fund/valuation-shop
peer.

**§3 Lanes — Research / Build / Partner.** Build lane: "We ship tools in the open"
→ "See the tools" → `/platform`. Copy still says "Open skills, plugins, and an API…
Claude, Cursor, and your own stack." "Open" + "your own stack" is the ownership
story I want, still wrapped in dev vocabulary (Cursor, API) that a one-week Claude
user can't parse. Partner lane → /consulting. Same three-lane model, still clear.

**§4 Research.** Body still names "Catalog diligence" (line 317) — good, my job is
named again. The ResearchCard beside it is still artist/audience analytics. Same
mismatch as v1: they *say* diligence, the visual proves marketing.

**§5 Problem — "Your team has Claude. It still can't do the work."** Still the most
"me" section. Three gaps now read: No music context ("roster, catalog, or **deal
terms**"), No safe access ("can't touch Drive, **royalty data**, or distributors on
its own"), No music workflows ("**Diligence**, A&R, content ops"). Royalty data,
deal terms, diligence — all named. And this time the privacy question it raises
("safe access") actually gets answered later (hero line + /trust), instead of being
left hanging like v1. Improvement.

**§6 Build (dark) — "One harness, many workflows."** Here's the biggest *quiet*
change: the old terminal demo with the broken `npm install -g @recoupable/cli` and
the Billie-Eilish content example is gone from what I read; this is now an
`ArchitectureDiagram` plus "Read the API docs" / "Talk to partnerships." Less
actively-wrong than v1 (no more content-marketing demo arguing against my use
case), but still jargon-forward — "harness," "MCP," "API," "Cursor," "hosted
workspace." As an Excel person this still reads "for engineers."

**§7 Open tools shelf — "The tools we build, free to install."** This is the section
that was broken last time, and it's genuinely fixed *mechanically*. One real
install command `npx skills add recoupable/skills` (line 462), and each shelf card
("View on GitHub", line 438) deep-links to a real skill folder. The intro even
in-lines a link to `/trust` with "we never train on your data" (lines 413–415). And
there's a non-developer escape hatch now (lines 476–493): "Not technical? The same
skills run inside Chat, or we'll set them up for you."

But here's my problem as *this* buyer: the five packs are **Music Research,
Chart Metrics, Content Creation, Release Management, Streaming Growth**. The old
"Agentic Diligence" pack — the exact thing the LinkedIn post promised, the one item
that made me lean in last time — **is gone.** The closest is "Music Research,"
described as "the groundwork for catalog and deal research" (line 38). Groundwork.
Not a diligence output. So the shelf went from "one broken link to the thing I
want" to "a working shelf that no longer contains the thing I want." That's a wash
for me, arguably a downgrade on relevance even as it's an upgrade on function.

**§8 Consulting band.** "Most music teams are still planning their AI strategy.
Start executing it." → /consulting. Same services pitch. I don't want training; I
want to run a diligence tonight.

**§9 Pull quote.** *"Catalog diligence is one of the biggest pain points I have. Cut
it down to minutes and it changes how we buy."* — attributed "**Catalog fund
operator**." This is still word-for-word my pain. Last time it was anonymous with
nothing behind it. Now there's a CTA: "See what an AI readiness audit surfaces" →
`/audit`. So I click it, expecting *finally* to see what diligence output looks
like…

**…and that's where it falls apart (see Link/route issues).** `/audit` is a generic
7-question **marketing-ops** lead quiz — role, roster size, *marketing hours per
week*, *posts created per week*, *monthly marketing budget* (`lib/copy/audit.ts`).
None of it touches catalog acquisition, income, royalty streams, or vintage. It
scores me into "Early Stage / Ready to Scale / AI-Ready Leader" and funnels me to a
**$2,500 strategy session**, a **$10,000 AI Transformation**, or the playbook. The
single highest-intent click for my persona — wired directly off *my own quote* —
delivers a marketing-spend questionnaire and a price tag. That's a bait-and-switch.

**§10 Proof — "We run our own labels."** Recoup Records + Gatsby Grace, "write
release plans, audit catalogs, pitch playlists." → /company/recoup-records, which
deep-links the same five open skills. Still label/artist-side proof. "Audit
catalogs" is one bullet among marketing tasks. Nothing here is buy-side diligence
on an acquisition. Unchanged for me.

**§11 Final CTA — "Let's build it in your stack."** Talk to us / Read our research.
Ends where it started. Still no "run a diligence on a sample catalog" door.

**Footer.** Platform, Partners, Developers, API Docs, Pricing, and importantly
**Trust & Governance** (`/trust`) now has a home. Good — though Trust is the one
page I most needed and it's footer-only.

---

## What's fixed since v1 (concrete, tied to source)

1. **The broken install command is gone (v1 complaint #1 — fixed).** §7 now uses one
   working command `npx skills add recoupable/skills` (`app/page.tsx` line 462) and
   every card deep-links a real GitHub skill folder via `View on GitHub` (line 438).
   The dead end is no longer a dead end.

2. **Ownership / no-training is finally answered — and it's strong (v1 complaint #3
   — fixed).** This was completely absent in v1. Now it appears in three places:
   - Hero, above the fold: "You own what we build. We never train on your data."
     (`page.tsx` line 243)
   - §7 shelf intro links it inline to a dedicated page (lines 413–415)
   - A full `/trust` page (`app/trust/page.tsx`) with six governance principles that
     name *my* concerns explicitly: "Your catalog, royalty figures, contracts, and
     audience data are never used to train models," org-owned private repos, scoped
     & revocable access, and offboarding that keeps ownership intact. This directly
     answers my gate #4. The /consulting FAQ repeats it (lines 67–70). This is the
     single biggest improvement for me.

3. **The §5 Problem section no longer raises privacy and abandons it.** v1 named
   "safe access… royalty data" and left it hanging; now that thread resolves at the
   hero line and /trust. Same good targeting, with a payoff.

4. **A non-developer path now exists in §7 (partial fix to v1 #6).** Lines 476–493:
   "Not technical? The same skills run inside Chat, or we'll set them up for you."
   So there are now three doors (install / Chat / consulting) instead of "cryptic CLI
   or sales call." Better — though none of these is "try a diligence on a catalog."

5. **The dangerously-wrong content demo is gone from §6.** v1's Billie-Eilish
   "8 short-form videos" terminal demo (which actively argued against my use case) is
   replaced by an architecture diagram + API-docs CTA. Less off-putting, even if
   still jargon-heavy.

6. **Product info scent improved.** Platform + Pricing are now in the top nav
   (`lib/nav.ts`), not buried in the footer like v1.

---

## What's STILL broken or missing for me (ranked)

1. **Still NO visible example of a diligence / income output (gate #2 — unmet).**
   This was my #1 ask in v1 and it's still nowhere. There is no normalized 3–4-year
   income summary, no top-earning-tracks list, no vintage curve, no royalty-trend
   chart anywhere on the site. The §4 ResearchCard shows audience analytics; §10
   proof shows release/marketing tasks. For a six-figure buy decision, I cannot
   evaluate a tool I'm never shown the output of. *(§4 ResearchCard; §10 Proof;
   `app/page.tsx`.)*

2. **The "agentic catalog diligence" capability I came for has no home — and the one
   pack that addressed it was removed.** v1 at least had an "Agentic Diligence" shelf
   pack ("catalog audits and deal rooms"). The current `SKILL_PACKS`
   (`page.tsx` lines 34–70) are research / chart-metric / content / release / growth.
   "Catalog diligence" now survives only as passing phrases (§4 line 317; §5 line 345;
   §9 quote). No `/diligence` or `/catalog` page, no walkthrough, no named skill I can
   install. The thing the LinkedIn post sold me literally does not exist as a
   destination. *(§3 Build lane → /platform; §7 shelf packs.)*

3. **The §9 pull-quote CTA is a bait-and-switch (most damaging single issue).**
   "See what an AI readiness audit surfaces" → `/audit` promises diligence insight and
   delivers a marketing-ops quiz that scores me toward $2,500 / $10,000 engagements
   (`lib/copy/audit.ts` questions + `results`; `components/audit/AuditForm.tsx`). The
   quiz never asks about catalogs, income, or royalties. Wiring this off my *own
   quote* makes the mismatch worse — it raises and then betrays exactly my
   expectation. *(§9 → /audit.)*

4. **Every primary CTA still funnels to a sales motion (v1 #6 — only partial).**
   Hero, §8, §11, /trust, and /company/recoup-records all point to `/consulting`,
   which is a Sidney-Swift services page (sessions "start at $500," "Book a Call" →
   mailto). The audit funnels to `/advisory` ($2,500) and a $10k transformation.
   There is still no self-serve "run a diligence on a sample catalog" path between
   "install generic skills" and "email us." *(§1/§8/§11 → /consulting;
   `app/consulting/page.tsx`; `lib/copy/audit.ts` results.)*

5. **Proof is still label/artist-side, not buy-side (v1 #4 — unchanged).** §10 and
   `/company/recoup-records` (`lib/copy/company.ts` `runsOn`) prove release planning,
   content, audience growth on Gatsby Grace. A label promoting its own artist is a
   different animal from a fund screening catalogs for acquisition. I need "we ran
   diligence on an acquisition and here's the output," not "we pitched a playlist."

6. **The one piece of social proof aimed at me is still anonymous AND now points
   somewhere wrong.** "Catalog fund operator" (§9) has no name, no number, no case
   study — and its CTA lands on the mismatched /audit. So my voice-of-customer beat
   carries a six-figure claim with zero evidence and a broken promise behind it.

7. **§6 Build is still jargon-walled for a one-week Claude user.** "Harness," "MCP,"
   "Cursor," "API," "hosted workspace" (lines 364–376). Plain-language framing
   ("add Recoup's catalog tools to the Claude you already have") would let me in.

---

## Link / route issues

**Good news: no internal 404s.** Every internal `href` I'd click resolves to a real
route in the provided list:
- §1/§8/§11 → `/consulting` ✓; §3 Build → `/platform` ✓; §3 Partner → `/consulting` ✓
- §6 → `/partners` ✓; §7 → `/trust` ✓ and `/consulting` ✓
- §9 → `/audit` ✓ (route resolves); §10 → `/company/recoup-records` ✓
- Footer → /consulting, /company/recoup-records, /platform, /partners, /developers,
  /pricing, /company/about, /company/vision, /trust ✓ (all valid)
- /audit results → `/playbook` ✓, `/advisory` ✓, `/pricing` ✓; /calculator → `/advisory` ✓

External links (research., chat., developers., github.com, mailto) noted, not
fetched — anchor text matches intent in each case.

**The real problem is a content mismatch, not a 404:**

- **§9 Pull quote → `/audit` — promise vs. content mismatch (high severity).** Anchor
  says "See what an AI readiness audit surfaces"; the destination is a generic
  marketing-ops lead quiz (`lib/copy/audit.ts`) that surfaces a marketing-spend score
  and a $2,500/$10,000 upsell, not a diligence/income output. For this persona it
  reads as bait-and-switch.

- **§3 Build "See the tools" → `/platform` — likely still thin for a buyer.** (Not
  re-read this pass; in v1 it was abstract feature copy with a "Get started → hosted
  app" CTA. Worth confirming it now shows catalog/diligence specifics rather than
  generic "one system that runs your music business" copy.)

- **No mismatch on the trust/ownership claims** — hero line, §7 inline link, and
  /trust are all consistent. Clean.

---

## One thing that would convert me

**Put a real, visible sample diligence output on the page** — an actual catalog
income summary generated by the agent: 3–4 years of income, top-earning tracks,
vintage curve, royalty trend, and risk flags — ideally as a live "run it on a sample
catalog (or upload a messy royalty statement)" interactive in the slot where /audit
currently sits, with the **weeks → minutes** timing called out on the artifact
itself. That single thing answers gate #1 (prove the speed) and gate #2 (show the
output) at once, turns the §9 quote from a claim into evidence, and gives me a
self-serve door that isn't a $500 call. Show me the money output, not a marketing
quiz.
