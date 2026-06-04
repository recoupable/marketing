# Re-Audit — Non-Technical Label GM / Operator (warm referral)

**Score: 8/10** (v1 was 6/10 — **improved**)

The two things that almost lost me in v1 — the empty proof page and the
"no way in unless you have an engineer" feeling — are both fixed. I read all
the way to the bottom this time without thinking "this isn't for me." There's
still one dark, developer-looking section in the middle I scrolled past fast,
but it no longer scared me off because the page kept giving me plain-language
exits.

---

## Narrative (section by section, my plain-language voice)

**1. Hero** (`app/page.tsx` §1, lines 215–246) — "Put AI to work inside your
music business." Good. That's about *me* and my business, not about code. The
line under it says "research lab and implementation partner for labels,
catalogs, and platforms — from strategy to the custom agents that run in your
stack." "Run in your stack" is a little techie but I get the gist. The button
says **"Talk to us"** — that's a human, that's what I want. And right under it:
"You own what we build. We never train on your data." That reassures me before
I even worry about it.

**2. Logos** (§2, lines 252–267) — "Used by teams at." Other people use this.
Good, I'm warm traffic, this backs up my referral.

**3. How we work — Research / Build / Partner** (§3, lines 273–302) — Three
cards. "Partner: We implement it with you… strategy, rollout, and custom agents
built for your roster and workflows" → **Talk to us**. That's my lane. The
"Build" card mentions "Claude, Cursor, and your own stack" — not for me, but
it's one card, I move on.

**4. Research** (§4) — Fine, they publish what they learn. Builds trust, not
where I'll spend time.

**5. The gap** (§5, lines 334–353) — "Your team has Claude. It still can't do
the work." Then three plain points: no music context, no safe access, no music
workflows. This is the clearest "why I'd need them" on the whole page. I nod.

**6. Build — "One harness, many workflows"** (§6, lines 360–398) — **This is
the section I scrolled past.** Dark background, a row of pills (Claude, Cursor,
API, MCP, Chat), the word "harness" in the headline (I don't know what a harness
is), and the buttons are "Read the API docs" and "Talk to partnerships." This
still reads like it was built for my engineer, not me. **BUT** — new this time —
there's a sentence that actually explains the scary acronym: "MCP is the open
standard that lets any agent… securely call Recoup's music tools without custom
glue code" (lines 374–376). I appreciate that someone tried to translate it.
I still skim, but I'm not scared off.

**7. The tools we build, free to install** (§7, lines 404–497) — A nice shelf
of "books" (Music Research, Chart Metrics, Content Creation, Release Management,
Streaming Growth). These names are *exactly* my work — release management,
content, A&R research. Then there's a black code box: `$ npx skills add
recoupable/skills`. My eye lands on that and my stomach drops a little — "do I
need a developer?" Then I read the line below it: **"Not technical? The same
skills run inside Chat, or we'll set them up for you"** (lines 476–494), linking
to Chat and to Consulting. *That* is the rescue. It tells me there's a no-code
way in and a real person who'll do it. That line saved this section for me.

**8. Consulting band** (§8, lines 503–516) — "Most music teams are still
planning their AI strategy. Start executing it… Training and implementation from
operators who build the tools — not slide decks. We work with labels…" →
**Talk to us**. Speaks my language. "Labels" called out by name.

**9. Pull quote** (§9) — A catalog fund operator quote about diligence. Real
voice, not for me specifically, but credible.

**10. The proof — "We run our own labels"** (§10, lines 540–553) — "Recoup
Records and our artist Gatsby Grace use these same tools every day — to write
release plans, audit catalogs, pitch playlists, and run the business." This is
the proof I wanted in v1 and didn't get. Link: "See how we dogfood." ("Dogfood"
is mild jargon, but it's just the link text.)

**11. Final CTA** (§11) — "Let's build it in your stack." → Talk to us. Closes
on the human path again.

**Proof page — `/company/recoup-records`** (`app/company/recoup-records/page.tsx`
+ copy in `lib/copy/company.ts` lines 55–83) — **This went from a 3-sentence
stub to a real page.** Subtitle: "Our own label and artist run on the same tools
we sell." Then a "What runs on it" grid of four real cards — **Release planning,
Artist & catalog research, Content production, Audience growth** — each in plain
language ("timelines, assets, and the checklist of who does what before drop
day"). Closing line: "If a skill can't carry weight on our own roster, we don't
publish it — and we don't sell it." Buttons: **"Run this on your roster"** →
Consulting. This convinces me. They actually run a label with this.

**Consulting page — `/consulting`** — Still the strongest page for me. "$500"
is right there (lines 163–166). The FAQ "Do I need technical expertise on my
team? **No.**" (lines 72–74). "Who This Is For: **Labels**" (line 46).
Credentials (10+ platinum, $2.5M D2F, patent, 1000+ artists). Ownership answer
("You do… we never train on your data"). "No pitch deck required."

**Pricing — `/pricing`** — Clear three tiers: Plus **$19/mo**, Pro **$99/mo**,
Partner **Custom / Talk to us** (the label tier). "AI credits" is explained in
the FAQ. Cost is legible.

---

## What's fixed since v1 (with sources)

1. **The proof page is now real.** v1 was a 3-sentence stub showing nothing.
   Now `lib/copy/company.ts` (lines 55–83) drives a "What runs on it" grid on
   `app/company/recoup-records/page.tsx` showing four concrete label workflows
   (release planning, artist/catalog research, content, audience growth) with a
   named artist (Gatsby Grace). It finally shows *what runs on Recoup Records*.

2. **There's now a no-code on-ramp in the shelf.** `app/page.tsx` lines 476–494:
   "Not technical? The same skills run inside Chat, or we'll set them up for
   you." — links to Chat and `/consulting`. In v1 the packs were all `npx` with
   no path for someone like me. This is the single most important fix.

3. **MCP is explained in plain English.** `app/page.tsx` lines 374–376 now spells
   out what MCP is ("the open standard that lets any agent… securely call
   Recoup's music tools without custom glue code"). The acronym wall is still
   there visually, but at least one line translates it.

4. **Consulting is reachable from everywhere.** Header nav (`lib/nav.ts`) and
   footer (`Footer.tsx` "Work with us") both surface Consulting + the proof page,
   so the human path is never more than one click away.

---

## What's STILL confusing or off-putting for me (ranked)

1. **The Build §6 dark "harness" section** (`app/page.tsx` lines 360–398). Still
   the most developer-looking thing on the page: the word "harness" (undefined),
   the Claude/Cursor/API/MCP/Chat pills, and CTAs that are literally "Read the
   API docs" and "Talk to partnerships." Nothing here is aimed at me. The plain
   MCP line helps, but the whole section still signals "for your engineer." I
   scroll fast and hope the next section is mine.

2. **The `npx` command is still the visual centerpiece of §7** (lines 458–463).
   The black `$ npx skills add recoupable/skills` box is big and bold; the
   "Not technical?" rescue line is small and sits *below* the command and the
   "Browse all skills" link (lines 465–494). I see the scary command first and
   the reassurance second. Flip the order or make the no-code line bigger so the
   first thing a non-technical buyer reads is "we'll set it up for you," not the
   terminal command.

3. **The cost story lives in two places.** Consulting ("$500", `/consulting`)
   and platform pricing ($19/$99/Custom, `/pricing`) are separate pages, and the
   homepage never names a price. To answer "what does this cost me?" I have to
   click into two different pages. A one-line "starts at $500, we set it up for
   you" near the proof/consulting band would answer it in place.

4. **Small jargon texture I shrug at but notice:** "dogfood" (§10 link), "in your
   stack" (hero + final CTA), and the mono-font skill slugs like
   `release-management` on the proof page. None are dealbreakers, but they're
   little reminders this was written by technical people.

5. **No "a real person will help you" promise high on the page.** The reassurance
   I respond to most ("we'll set them up for you," "talk to a human") only shows
   up two-thirds down, buried under the install command. Earlier traffic might
   bounce before reaching it.

---

## Link / route issues

I checked every internal link against the list of routes that exist. **No 404s
or mismatches found.**

- Homepage links resolve: `/consulting`, `/platform`, `/partners`, `/audit`,
  `/trust`, `/company/recoup-records` — all exist.
- External links (research.recoupable.com, developers.recoupable.com,
  chat.recoupable.com, GitHub) are correctly marked external.
- Footer (`Footer.tsx`): every link — `/consulting`, `/company/recoup-records`,
  `/platform`, `/partners`, `/developers`, `/pricing`, `/company/about`,
  `/company/vision`, `/trust` — resolves to a real route.
- Header (`lib/nav.ts`): Research / Platform / Pricing / Consulting — all good.
- Proof page back-link `/company` exists.

Minor note (not a bug): `/audit` is linked from the homepage pull quote but isn't
in the header or footer, so it's a bit buried. Not a broken link, just a
discoverability gap.

---

## The one thing that would convert me

**Lead with the human + outcome promise where I can't miss it, instead of burying
it under a terminal command.** Take the line that already rescued me —
*"Not technical? The same skills run inside Chat, or we'll set them up for you"* —
and pair it with the Recoup Records proof and the "$500 to start" near the top of
the page (or at least move it *above* the `npx` box in §7). The moment I see
"real label, real artist, real release plans — and a real person will set it up
on your roster for $500," I stop wondering whether this is for engineers and
start wondering when I can book the call.
