# User Journey Audit — v3

**Persona:** Non-technical Label GM (warm traffic)
**Date:** 2026-06-02
**Inspected:** live `http://localhost:3000` (rendered HTML) + source (`marketing/app/**`, `marketing/lib/copy/**`)
**v2 score:** 8/10 → **v3 score: 9/10**

---

## Who I am (and what I need to believe)

I run day-to-day at an indie label. I am not technical — "API," "MCP," "harness,"
"npx" mean almost nothing to me. A peer told me to look at Recoup, so I arrived warm
and willing. Before I'll book a call I need three things to be true:

1. **This is built for a real label like mine** (not a dev tool).
2. **A real human sets it up** — I will not be dropped into a terminal.
3. **The price and commitment are clear** — I want to know what I'm signing up for.

I bounce the instant a page feels engineer-only.

---

## The walk

### Landing → homepage (`/`) — *unchanged this round, and it shows*

The hero is good for me: **"Put AI to work inside your music business,"** subhead calls out
"labels, catalogs, and platforms," CTA is **"Talk to us,"** and the reassurance line —
"You own what we build. We never train on your data." — lands. The Research/Build/Partner
lanes are plain. I'm comfortable.

Then I scroll into the two spots that snagged me in v2, and **both are still here**
(homepage wasn't touched):

- **§6 "One harness, many workflows."** — The headline leads with *harness*, a word I
  don't use. Above it sit five badges: `Claude · Cursor · API · MCP · Chat`. The body
  says "bring your own agent, Recoup plugs in." There *is* now a plain-English MCP gloss
  ("the open standard that lets any agent securely call Recoup's music tools"), which
  helps — but the whole section is still framed *for the person building the agent*, not
  for me. My eyes glaze; I scroll faster.

- **§7 "The tools we build, free to install."** — A boxed, monospace code block sits dead
  center: `$ npx skills add recoupable/skills`. It's visually the heaviest thing on the
  screen — shadowed card, mono font, terminal prompt. The rescue line for me —
  *"Not technical? The same skills run inside Chat, or we'll set them up for you"* — is
  12px grey text **below** it. So my first read is still **"this is for engineers,"** and
  the "that's okay, we'll do it for you" reassurance is the thing I might miss.

**Net on homepage:** the gist still reads warm enough that I keep going to "Talk to us,"
but §6 and §7 are the two moments where a colder GM could bounce. *Confirmed: both v2
complaints persist exactly as predicted.*

### `/consulting` — *the page I actually land on, and it's the big win*

This is where a "Talk to us" click sends me, and it's been rewritten *for me*:

- **Hero:** "We implement AI inside your music business… Work directly with the team that
  builds the tools — on strategy, rollout, and custom agents. Not slide decks." Outcome
  first, zero jargon.
- **"Who we work with"** lists **Labels first**: "Modernize A&R, marketing, and catalog
  strategy — from indie imprints to majors." That's me, named.
- **FAQ answers my exact fear out loud:** *"Do I need technical people on my team? No. We
  translate between the technical and business sides… the same skills work whether your
  team lives in spreadsheets or in a terminal."* This is the single most reassuring
  sentence on the site for me.
- **Commitment is concrete:** "Sessions start at **$500**. Scope and pricing depend on
  what you need." Plus "Sessions run 60–90 minutes" and "No pitch deck required." I now
  know roughly what I'm committing to.

I would book the call from this page. Both of my original v1/v2 dealbreakers (am I dropped
into a terminal? what does it cost?) are resolved *here*.

### `/pricing` — *legible, but it hides the one number I came for*

Three clean tiers, well signposted:

- **Open — Free — "For builders & developers."** Engineer language ("MCP integrations,"
  "one-command install"), but it's explicitly flagged for builders, so I skip it without
  feeling lost. Good.
- **Chat — "From $19/mo" — "Most popular" — "For artists, managers & teams,"** "no setup
  or terminal required." Relatable and concrete.
- **Implementation — "Custom" — "For labels, catalogs & platforms" — "Talk to us."**
  This is my tier… and it gives me **no number at all.** Meanwhile `/consulting` *does*
  say "Sessions start at $500." So the one page where I go to answer "what do I pay" is
  the page that withholds the anchor the consulting page already shows. Minor, but it's a
  friction point on the exact question I came to resolve.

FAQ is strong for me — "Can I try it before I buy anything?", "How is this different from
ChatGPT?", "Do you train on our data?" all answered in plain English.

### `/company/recoup-records` — *makes me believe a real label runs this*

This is the proof I needed. "Our own label and artist run on the same tools we sell."
Four **plain-English** workflow cards — Release planning, Artist & catalog research,
Content production, Audience growth — each linking to the actual open skill on GitHub, and
the close lands hard: *"If a skill can't carry weight on our own roster, we don't publish
it — and we don't sell it."* CTA "Run this on your roster." The only techy residue is the
monospace skill folder names (`release-management`, etc.) on each card, but the titles
above them are human, so it doesn't scare me. **I believe them.**

### Quick passes on the rest

- `/trust` — "Your data and your tools stay yours." Reassuring, plain. Good.
- `/company`, `/company/about`, `/company/vision` — all plain-English, on-message.
- `/audit` — "Where could AI actually help your music business?" Scrubbed of jargon
  (no `npx`/`MCP`/`harness`). Inviting.
- `/blog` — "Building in public." Posts load fine; subscribe CTA is de-crufted (just an
  email capture, no engineer CTAs).
- `/platform`, `/developers`, `/partners` — clearly engineer/product-team pages ("The
  music layer for agents," "Build on the music layer," "Put music intelligence inside your
  product"). Not for me — but correctly signposted, so I don't wander in and bounce.
- `/privacy-policy`, `/terms-of-use` — present and fine.

### Readability (the v2 "near-unreadable" fix)

Confirmed fixed. Full body text is `--foreground` `#0a0a0a` on white (~20:1); the muted
grey is `#6b6b6b` (~5:1, passes AA). The lightest body on the homepage/consulting is
`--foreground` at 55% opacity — that's the floor, readable but not generous. No more
near-white text. **I can read everything now.**

---

## Where I'd bounce

| Likelihood | Where | Why |
|---|---|---|
| Low–Med | Homepage **§6 "One harness, many workflows"** | "Harness" + `API/MCP` badges + "bring your own agent" reads engineer-only; I skim past it. |
| Low–Med | Homepage **§7** big `$ npx skills add …` code block | Heaviest element on screen; my first read is "not for me," and the "we'll set them up" rescue is small text below it. |
| Low | **`/pricing` Implementation tier** | My tier says only "Custom / Talk to us" — no anchor, even though `/consulting` shows "$500." Mild "so what does it actually cost?" itch. |

None of these is fatal anymore — the consulting destination fully reassures me — but they
are the three moments of friction left for my persona.

---

## Link / status table

### Live pages (expect 200)

| Path | Status | GM read |
|---|---|---|
| `/` | 200 | Warm; §6/§7 still engineer-leaning mid-page |
| `/consulting` | 200 | **Excellent** — outcome-first, "no technical people," $500 anchor |
| `/platform` | 200 | Engineer page, correctly signposted (not mine) |
| `/pricing` | 200 | Legible; my tier lacks a number |
| `/developers` | 200 | Engineer page (not mine) |
| `/partners` | 200 | Product/platform page (not mine) |
| `/trust` | 200 | Reassuring, plain |
| `/company` | 200 | Plain, on-message |
| `/company/about` | 200 | Plain |
| `/company/vision` | 200 | Plain |
| `/company/recoup-records` | 200 | **Believable dogfooding proof** |
| `/blog` | 200 | "Building in public"; posts load (e.g. `/blog/ai-ar-artist-discovery` → 200) |
| `/audit` | 200 | Scrubbed, inviting |
| `/privacy-policy` | 200 | Fine |
| `/terms-of-use` | 200 | Fine |

### Orphan redirects (expect 30x, not 404) — all pass

| Path | Status | → Target |
|---|---|---|
| `/advisory` | 308 | `/consulting` |
| `/solutions` | 308 | `/platform` |
| `/results` | 308 | `/company/recoup-records` |
| `/resources` | 308 | `/developers` |
| `/calculator` | 308 | `/consulting` |
| `/playbook` | 308 | `/platform` |
| `/learn` | 308 | `/blog` |
| `/records` | 308 | `/company/recoup-records` |

---

## v2 → v3 score

**v2: 8/10 → v3: 9/10 (+1)**

**Reasoning:** v2 had already cleared my two dealbreakers (a real proof page + a no-code
on-ramp + a plain-English MCP line). v3 doesn't touch the homepage, so my two v2 complaints
persist exactly — but v3 *substantially upgrades the pages I actually land on after I click
"Talk to us."* `/consulting` now leads with the outcome, names Labels first, says out loud
"you don't need technical people," and gives a real number ("Sessions start at $500, no
pitch deck"). `/pricing` is genuinely legible with clear signposting. `/company/recoup-records`
makes the "a real label runs this" claim believable with four plain-English workflows tied
to real skills. The readability fix means I can actually read all of it.

I'm not at 10 because the **homepage Build section (§6/§7) still reads engineer-first** — the
two friction points a colder version of me could bounce on — and because the **one number I
came to `/pricing` for isn't there** for my tier. But once I reach `/consulting`, every fear
I had is answered. That's a confident "I'd book the call."

---

## Top fixes, ranked (for a non-technical GM)

1. **Reframe homepage §6 around an outcome, not "harness."** Lead with something like
   *"One system. Every music workflow."* and demote the `API/MCP` badges / "bring your own
   agent" line beneath a one-line human benefit. Keep the plain-English MCP gloss — just
   stop opening with builder vocabulary. *(Highest impact: it's the first "not for me"
   moment.)*

2. **In §7, make the no-code path the hero, the code block the secondary.** Right now the
   `$ npx skills add …` box is the visual anchor and "we'll set them up for you" is fine
   print. Flip the weight: lead the panel with "Not technical? We set this up for you /
   it runs inside Chat," and tuck the install command beneath it for the developers. Same
   facts, opposite first impression for me.

3. **Surface the `$500` anchor on `/pricing`'s Implementation tier.** Change "Custom" →
   "Custom — sessions start at $500" (matching `/consulting`). The pricing page is exactly
   where I go to answer "what do I commit," and it's the one place that currently hides the
   number the consulting page already gives me.

4. **(Minor) Humanize the recoup-records skill labels.** The monospace `release-management`
   folder names are the only techy residue on an otherwise GM-perfect proof page. Keep the
   GitHub link, but consider showing the human title only and moving the slug into the link
   target / a tooltip.
