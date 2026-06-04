# User Journey v2 — Rights-Company Owner (Org-Owned Skills)

> Re-audit of recoupable.com after a round of fixes, in character. READ-ONLY analysis against actual source. Quotes are verbatim from the rendered copy. v1 baseline scored **4/10** (see `../rights-owner-skills.md`).

## Who I am

Owner/operator of a mid-size rights company — I administer and own catalogs, royalty streams, sync. I want AI agents in-house. My #1 concern is **ownership and control**: skills/agents in MY org's private repos, owned by my team even after employees leave, scoped/revocable access, and an ironclad guarantee my proprietary catalog/royalty data is **never** trained on or folded into anyone's public packs.

## What I wanted v1 to fix (my 4 complaints)

1. Infra language was dead-on, but the page never said "you own it" or "we don't train on your data."
2. No governance/trust page existed.
3. The shelf line *"Every engagement sharpens the open skills we ship"* read like IP leakage.
4. No story about fenced **private, org-owned** skill repos.

---

## Score: 8/10 (v1 was 4/10 — substantially improved)

All four of my v1 complaints are addressed with real copy and a real page. I crossed the line from "intrigued, won't trust the site" to "reassured enough to start a serious conversation." It's not a 9–10 because there's still no distinct **private-build engagement path** (the only door is the generic $500 consulting page), the demos/dogfooding are still artist-marketing not catalog/royalty, and the trust story lives below the fold — not in the top nav where my buyer profile looks first.

---

## Narrative (section-by-section)

### Header / nav (`lib/nav.ts`)
Nav is now `Research · Platform · Pricing · Consulting`. Platform and Pricing got promoted — good for technical due diligence; I can vet the tech without scrolling. **But there is still no Trust/Governance/Security entry in the top nav.** For a buyer whose entire objection is governance, that's the one door I reach for first and it isn't on the marquee.

### 1. Hero (`app/page.tsx` §1, lines 215–246)
H1 unchanged: *"Put AI to work inside your music business."* Sub still: *"…from strategy to the custom agents that run in your stack."* The decisive change is line 242–244:

> "You own what we build. We never train on your data."

This is exactly the sentence whose absence dropped me to 4/10. It is now stated above the fold. **Caveat:** it's rendered at `text-[12px] text-(--foreground)/40` — tiny, ~40% opacity, and **not linked to `/trust`**. The single most important sentence for my decision is the quietest line in the hero and is a dead end. It says the thing; it whispers it.

### 2–5. Logos / Lanes / Research / Problem
Largely as v1. Lanes (lines 162–187) still say *"custom agents built for your roster and workflows"* — "roster" is still label/artist language, not rights/publishing. The Problem section (lines 334–354) still names my exact gap (*"can't touch Drive, royalty data, or distributors"*, *"doesn't know your… deal terms"*) — best-targeted block on the page — and still asserts "No safe access" without resolving it inline, though now `/trust` exists to close that loop elsewhere.

### 7. Open tools shelf (`app/page.tsx` §7, lines 404–497) — **the big fix**
The alarming v1 tagline is **gone**. New copy (lines 411–417):

> "Open-source skills our own agents run every day. Install them into Claude, Cursor, or your own stack in seconds. **Your private work stays yours** — [we never train on your data](/trust)."

The "we never train on your data" fragment is a live link to `/trust`. So the section that most worried me in v1 (felt like my paid work feeds their public packs) now explicitly fences private work AND routes me to the governance page. This is the cleanest single improvement.

### 8–11. Consulting band / quote / proof / final CTA
Still solid, still consulting-first. Proof section (lines 540–553) still dogfoods a **label/artist** roster (Recoup Records, Gatsby Grace, release plans, playlist pitching) — wrong proof for rights/royalty governance. Final CTA (line 564) still *"Let's build it in your stack."* with the same `/consulting` door.

### `/trust` (`app/trust/page.tsx`) — **the page that didn't exist in v1**
H1: *"Your data and your tools stay yours."* Intro literally names my buyer: *"For labels, catalogs, and rights owners, the first question is always the same: who owns this, and is my proprietary data safe?"* Six principles (lines 15–40) hit all five of my asks:

| My ask | `/trust` principle |
|---|---|
| (a) I own built assets | "You own what we build" — *"Agents, skills, and workflows built in your engagement are yours… not locked inside our platform."* |
| (b) No training on my data | "We never train on your data" — *"…never used to train models, and never fold into the open skills we publish."* |
| (c) Org-owned / private repos | "Org-owned skill repositories" — *"Custom skills can live in a private repo your organization owns… kept separate."* |
| (d) Scoped / revocable access | "Access is scoped and revocable" — *"…you can revoke that access at any time. Nothing connects itself."* |
| (e) Offboarding ownership | "Offboarding keeps your ownership intact" — *"…the skills, repos, and agents stay with your organization. No knowledge walks out the door."* |

Footer CTA: "Talk to us" → `/consulting` plus a "Email us a requirement" mailto with *"We'll put it in writing before any engagement starts."* For my profile, this page is the difference-maker.

### `/consulting` (`app/consulting/page.tsx`)
New FAQ entry (lines 67–70) directly answers me:

> "Who owns what we build — and do you train on our data? **You do.** The agents, skills, and workflows we build in your engagement are yours, and they live in your stack or a repo your organization controls. We never train models on your catalog, royalty, or proprietary data, and your private work is never folded into the open skills we publish."

"Catalog Owners" is listed as a first-class audience (line 49). Good. But the offer framing is unchanged — "1:1 Strategy Sessions," "Team Training," *"Sessions start at $500"* (line 164) — still reads solo-advisor, not enterprise org-owned build.

### `/partners` (`app/partners/page.tsx`)
"Co-built agents" model (lines 46–49): *"…then hand them off into a repo your organization controls."* Plus a no-train answer (lines 62–64). Reinforces the ownership story for the platform/embed buyer.

---

## What's fixed since v1 (with citations)

1. **Ownership + no-training now stated above the fold.** `app/page.tsx:242–244` — *"You own what we build. We never train on your data."* Resolves v1 objection #1.
2. **The IP-leakage line is deleted.** v1's *"Every engagement sharpens the open skills we ship"* no longer exists anywhere in `app/page.tsx`; replaced by *"Your private work stays yours"* at `app/page.tsx:411–417`. Resolves v1 objection #2.
3. **A real Trust & Governance page exists and covers all five asks.** `app/trust/page.tsx:15–40` — ownership, no-train, private org-owned repos, scoped/revocable access, offboarding ownership. Resolves v1 objections #2 and #4.
4. **`/trust` is reachable from footer and body.** Footer "Company" column links it (`components/layout/Footer.tsx:33`); the shelf links it inline (`app/page.tsx:413`). Resolves the "no page to click" hole.
5. **Consulting now answers ownership/no-train explicitly** (`app/consulting/page.tsx:67–70`), and **Partners promises hand-off into a repo I control** (`app/partners/page.tsx:46–49, 62–64`).
6. **"Private org-owned repo" is actually promised, not just "open."** `app/trust/page.tsx:25–26` and `app/partners/page.tsx:48` both say a repo my organization owns/controls — the exact thing missing in v1.

---

## What's STILL broken or missing for me (ranked)

1. **No distinct private-build engagement path / CTA.** Every ownership promise routes me to the same generic `/consulting` page that opens with "1:1 Strategy Sessions" and *"Sessions start at $500"* (`app/consulting/page.tsx:164`). I'm buying a multi-month, org-owned build on proprietary infra; there is no visible "Private / org-owned skills implementation" track (scope → build-in-your-stack → handover & ownership → optional maintainer/"house manager" retainer). The promise exists; the *offer* to buy it doesn't.
2. **Trust is buried below the nav.** `/trust` is only reachable by scrolling to the shelf or the footer. It's not in `lib/nav.ts`. My #1 concern should be one click from the marquee, not a treasure hunt.
3. **The hero ownership line is whispered and unlinked.** `app/page.tsx:242` is `text-[12px]` at 40% opacity and is plain text, not a link to `/trust`. The most decision-critical sentence on the site is the least prominent and doesn't take me to the proof.
4. **`/trust` is promises-in-prose, not a legible mechanism.** It tells me the right things but shows no artifact — no open-repo-vs-private-repo diagram, no mention of a maintainer/"house manager" role, no sample DPA/no-train clause, no contract language I can forward to legal. For a six-figure trust decision I want to *see* the boundary, not just be told it holds.
5. **Worked examples still off-persona.** Demos and dogfooding remain artist content + release marketing (Billie Eilish content batch in the architecture demo; Gatsby Grace growth in `app/page.tsx:546–548`). I still see almost nothing modeling catalog audit / royalty reconciliation / sync-exposure governance — my actual workflows.
6. **Segment mirror still soft.** Homepage lanes still say "roster" (`app/page.tsx:182`). "Rights owners / publishers" is centered on `/trust` but not on the homepage. "Catalogs" is included; never the hero word.

---

## Link / route issues

- **All routes resolve.** Every page in the task's route list has a matching `app/**/page.tsx` (verified via file tree): `/`, `/advisory`, `/advisory/book`, `/audit`, `/blog`, `/calculator`, `/company`, `/company/about`, `/company/recoup-records`, `/company/vision`, `/consulting`, `/developers`, `/learn`, `/learn/demos`, `/partners`, `/platform`, `/playbook`, `/playbook/download`, `/pricing`, `/privacy-policy`, `/resources`, `/results`, `/solutions`, `/terms-of-use`, `/trust`.
- **No broken internal links** found in the homepage, footer, nav, trust, consulting, or partners files. The shelf's `/trust` inline link, footer `/trust` link, and all CTA targets point at existing routes.
- **v1's `/records` vs `/company/recoup-records` concern appears resolved:** only `/company/recoup-records` exists as a page now; the Proof CTA targets it correctly (`app/page.tsx:549`).
- **Gap, not a break:** `/trust` is absent from `lib/nav.ts` (top nav). Reachable but not surfaced where my persona looks first.

---

## One thing that would convert me

Put a **"Trust & Ownership"** (or "Governance") link in the top nav (`lib/nav.ts`) **and** turn the hero's *"You own what we build. We never train on your data."* into a prominent, linked element pointing to `/trust` — then add a named **"Private, org-owned build"** engagement track + CTA on `/consulting` (scope → build-in-your-stack → handover & ownership → maintainer retainer) so there's an obvious door to buy the exact thing `/trust` promises. The guarantees are finally written down; make them one click from the fold and give me a way to actually start the private engagement, and I'm in.
