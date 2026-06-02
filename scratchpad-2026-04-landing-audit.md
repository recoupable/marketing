# Landing page review — fresh eyes

_What the page is currently saying vs. what a first-time visitor actually receives. Top-to-bottom walkthrough flagging every repeat and every orphan sentence._

---

## TL;DR — the two structural problems

1. **The page sells the same three things twice.** The "Three pillars" section (Stat bar + Skills/API/Services blocks early on) and the "Pricing" section near the bottom are the same offer with different makeup. The reader sees Skills/API/Services twice — once dressed up as "pillars," once as "pricing." Both have CTAs. Both feel like the main thing.

2. **The bento and the Use Cases are the same three capabilities back-to-back.** Research, Diligence, and Content each appear in the bento (as small cards with mini-visuals) and then again immediately below as full-width detail sections with the exact same headlines, the exact same stats, and the same numbers. By the time the reader reaches the third Use Case, they've seen the Fat Beats stat three times.

These two problems alone account for ~40% of the page's vertical real estate.

---

## Repeats — section by section, with line refs

### REPEAT 1 — Three pillars (l.231–292) vs. Pricing (l.705–771)

Same offering, twice.

| Concept | Three pillars (l.252–274) | Pricing (l.717–770) |
|---|---|---|
| Skills | "Open source · All skills, plugins, and agents. MIT licensed. Install in any agent your team uses." → "Browse skills" | "Open source · Free · All skills, plugins, and agents · Install in any agent · MIT licensed · Community support" → "Install free" |
| API | "Pay as you go · Real-time music data and intelligence. Top up credits. Used by every skill." → "Get an API key" | "Pay as you go · $20 starter · Top up credits anytime · Real-time music data · Per-call transparency · No subscription required · Used by your skills" → "Get an API key" |
| Services | "White glove · Custom skills built against your roster. Embedded with your team. 3–6 month engagements." → "Talk to us" | "White glove · Custom · Custom skills for your roster · Embedded with your team · Integrates with your stack · 3–6 month engagements · Direct line to Sid" → "Talk to us" |

→ **Pick one.** Either the early pillars stay (and pricing becomes a tighter sidebar) or pricing stays (and the early "pillars" get demoted to a 1-line summary or deleted entirely).

### REPEAT 2 — Bento (l.383–565) vs. Use Cases (l.568–675)

Same three capabilities, twice, three sections apart.

| Capability | Bento card (l.481–528) | Use Case detail (l.577–675) |
|---|---|---|
| Research | "50+ sources, one call. Streams to fan psychology." | "Know everything about any artist. Streams, audience, playlists, socials. 50+ sources, one call." |
| Diligence | "Deal rooms to 80% pass. Weeks of analyst work → minutes." + the $1.8M/$2.4M/$3.1M readout | "Deal room to 80% pass. Parses files, flags conflicts, models the deal. Minutes, not weeks." + the SAME $1.8M/$2.4M/$3.1M readout in a fuller dashboard |
| Content | "Videos, images, captions, press. 22 finished videos in 2 hours at Fat Beats." | "Content you'd hire a team for. Fat Beats: 22 finished videos in 2 hours." |

→ **Pick one.** Either the bento is the at-a-glance scan and the Use Cases get deleted, or the Use Cases stay as the deep-dive and the bento drops the Research/Diligence/Content tiles. Both can't live — the reader hits déjà vu by section 7b.

Specific worst-case: the **$1.8M / $2.4M / $3.1M** numbers appear in the bento Diligence card (l.511–514) and then again, identically, in the Q4 publishing catalog mock immediately below (l.624–626). Two visualizations of the same fake data, one after the other.

### REPEAT 3 — The "22 videos in 2 hours at Fat Beats" stat is on the page three times

1. Stat bar (l.241): `22 / 2h — VIDEOS AT FAT BEATS`
2. Bento Content card (l.419): `22 finished videos in 2 hours at Fat Beats. One prompt, dozens of assets.`
3. Use Case Content (l.670): `Fat Beats: 22 finished videos in 2 hours.`

→ Use it once. Strongest placement: the Use Case if it stays, or the stat bar if it doesn't. Not all three.

### REPEAT 4 — Gatsby Grace is treated as a stranger and then as our own artist

- **Bento Artist context (l.433):** "Gatsby Grace · 12.4k monthly · indie-pop / bedroom-pop / intimate" — reads as an illustrative mock, like a customer's artist.
- **Proof section (l.696):** "Recoup Records and Gatsby Grace run on our own skills every day" — now it's our artist.

→ The reader thinks they're seeing a customer demo, then later finds out it's a self-portrait. Either lean into "this is our roster" in the bento card (e.g. a small "Recoup Records artist" tag) or pick a different illustrative name in the bento.

### REPEAT 5 — Two distinct mission/proof beats in one section (l.681–702)

Inside section 7d the eyebrow flips from "Our mission" to "The proof" mid-section. That's two sections crammed into one container with two H2/H3 pairs. Visually it reads as a single section that contradicts itself ("here's our mission… and also here's our proof…").

→ Split them, or just keep "The proof — We run our own labels" and drop the "Make every music business AI-native" mission paragraph (it's restated functionally by the proof anyway).

---

## Orphan sentences — lines that don't survive out of context

Reading each line in isolation. If a first-time visitor scrolls in, lands on this line, and bounces, do they know what it means?

### Hero (l.193)
**"AI research and tools for the music industry."**
- Ambiguous. "AI research" can read two ways: (a) we research AI, (b) we do research using AI for music. The reader can't tell which.

### Architecture pills (l.302)
**`Claude · Codex · Cursor · Slack · MCP · API`**
- Mixed registers. Claude, Codex, Cursor, Slack are products. MCP, API are protocols. The list reads like "Honda, Toyota, Ford, gasoline, road" — three of one kind and two of another.

### Architecture subhead (l.310)
**"One install. Available in any agent — including the ones your team will adopt next."**
- "The ones your team will adopt next" is hand-wavy. It doesn't promise anything specific; it suggests forward-compatibility but doesn't earn it. Out of context this reads like marketing filler.

### Pull quote (l.325)
**"Catalog diligence is one of the biggest pain points I have. If we can cut that into five minutes, this is really interesting."**
- "Five minutes" appears nowhere else on the page. Bento says "minutes." Use Case says "minutes, not weeks." Nobody promises five minutes specifically.
- "If we can" and "really interesting" are hedge-language. As a testimonial, this is a prospect's wishful thinking, not a customer outcome. A reader who reads testimonials carefully will register this as "they don't have a real one yet."

### Problem card (l.347)
**"No safe access — Can't touch Drive, royalties, distributors."**
- "Drive" out of context could be a hard drive, a vehicle, a music distributor (Drive Music). Should be "Google Drive" or "your shared drive" if that's what's meant.

### Problem card (l.348)
**"No music workflows — Diligence, content, A&R — none of it built in."**
- "A&R" is industry jargon. Insiders know it. Investors and engineering buyers might not. The page never spells it out.

### How it works step 2 (l.369)
**"Wire it up — Connect your roster, catalog, and the tools your team already pays for."**
- "Tools your team already pays for" is intentionally vague but reads as a hand-wave. Which tools? The page never says. Spotify for Artists? Sound Royalties? DSPs? Google Drive? Without one concrete example, this is filler.

### Bento Artist context (l.447)
**"A living folder per artist. Bio, sound, comparables, sacred rules — updated as your roster grows."**
- **"Sacred rules"** is the worst offender on the page. What is a sacred rule for an artist? Out of context this sounds vaguely religious. It's almost certainly an internal term for an artist's hard creative constraints, but a reader has no way to decode it.

### Bento Catalog data (l.477)
**"Splits, royalties, deal terms. Every track, every right, in one place your agent can read."**
- "In one place your agent can read" — the value isn't that the agent can read it, it's that you don't have to. The phrasing centers the agent, not the user.

### Bento Research (l.500)
**"50+ sources, one call. Streams to fan psychology."**
- "Streams to fan psychology" is so compressed it stops being a sentence. It's meant to mean "from streaming data through to fan psychology" but it reads like a directive ("send streams to fan psychology dept").

### Bento Diligence (l.525)
**"Deal rooms to 80% pass."**
- "80% pass" is unexplained jargon. Pass rate? Diligence coverage? Confidence interval? The page never tells you. Bento says "deal rooms" (plural), Use Case says "deal room" (singular) — also inconsistent.

### Bento Guardrails (l.559)
**"Acts inside each user's permissions."**
- Awkward construction. "Acts inside permissions" is corporate-grade phrasing for "respects your role." Plain language is faster.

### Use Cases section header (l.571–575)
**Just the eyebrow "USE CASES" with no headline.**
- A 100px+ tall section containing one label and nothing else. Visually orphaned. Either give it a real H2 or remove the section and let the first Use Case (Research) carry the eyebrow itself.

### Use Case Diligence dashboard (l.617–619)
**"Q4 publishing catalog · Ready"**
- "Ready" as a status pill is ambiguous. Ready for what? Acquisition? Diligence completed? The mock looks like a deal dashboard but doesn't tell the reader what state it's in or what they're being asked to imagine doing with it.

### Mission (l.687–688)
**"Make every music business AI-native. Skills are free so anyone can start. The API and services exist for teams ready to ship faster."**
- "AI-native" is jargon. "Ship faster" is software-engineer language — a label exec doesn't ship; they release, drop, put out, send out.

### Proof (l.695–700)
**"Recoup Records and Gatsby Grace run on our own skills every day."** — "Run on our own skills" reads weirdly. Did we mean "use" or "are powered by"?
**"The work goes into campaigns, not slides."** — Contrasting Recoup against… who? Competitors that produce slides instead of campaigns? Without a named foil, this is a swing at air.
**"Every skill in this site has shipped against a real roster before it shipped here."** — "Shipped here" means shipped to the site. Confusing — you ship to production, not to a marketing page.

### Pricing API card (l.744)
**"$20 starter"**
- $20 per what? Per month? Per credit pack? Per call? The subhead says "Pay as you go" and the price says "starter" — those are two different pricing models.

### Pricing Services card (l.763)
**"Direct line to Sid"**
- Who is Sid? The page never introduces a founder. If Sid is the value prop, name him with a role at least once before the pricing card. If "direct line to the founder" is what we mean, write that.

### Final CTA (l.785–795)
- Headline: **"One command. Music AI, installed."** → strong.
- Code line: `$ npx skills add recoupable/skills` → exactly right.
- Button: **"Get started free"** → but the link is `siteConfig.appUrl` (the chat app), not the install command. The reader is set up to copy/paste a command and then handed a button that opens an app. Pick a lane: either the CTA is the install command (button = "Copy install command") or the CTA is the app (kill the command line and just say "Launch Recoup").

---

## Identity drift — what is Recoup, by section?

Tracking what the page implicitly claims Recoup is, as you scroll:

| Section | Implied identity |
|---|---|
| Hero | "AI research and tools for the music industry" — research + tools company |
| Architecture | "Bring your own agent. Recoup plugs in." — integration layer / middleware |
| Problem | "Your team has Claude. It still can't do the work." — context layer for general-purpose AI |
| Bento | "Six skills we ship to your agent." — a skills library |
| Use Cases | Research / Diligence / Content — a feature-rich product |
| Mission | "Make every music business AI-native." — a movement / vision |
| Proof | "We run our own labels." — a vertically-integrated operator |
| Pricing | "Three ways in." — a 3-tier SaaS-ish offering |

The reader hits eight different framings of what Recoup is in fifteen scrolling sections. The pillars try to unify it ("we're Skills + API + Services") but then the next ten sections only talk about Skills.

→ **Question to resolve before any rewrite:** which one of these is the spine? I'd argue "Skills you install in your agent" is what every supporting section is actually demonstrating. If that's the spine, the API and Services should be paragraphs at the bottom of the page, not a top-of-funnel pillar trio.

---

## Stat clutter

The page throws a lot of numbers at the reader without a hierarchy. Right now:

- Stat bar: `9` `50+` `40+` `22 / 2h`
- Bento Diligence: `$1.8M / $2.4M / $3.1M`
- Bento Content: `22 in 2 hours`
- Use Case Diligence: `$1.8M / $2.4M / $3.1M` (again), `147 songs`, `3 conflicts`, `12 missing ledgers`, `14% concentration`
- Use Case Content: `22 in 2 hours` (again)
- Pull quote: `five minutes`
- Pricing API: `$20 starter`

→ The reader can't tell which numbers are "the headline numbers" (real customer outcomes) vs. "illustrative mock numbers" (demo dashboards). Both are presented at equal weight. The $1.8M/$2.4M/$3.1M is fake mock data; the `9 labels` is real. They look the same on the page.

---

## Recommended cuts and merges

In priority order:

1. **Delete the Use Cases trio (l.568–675) OR delete the bento's Research/Diligence/Content cards.** They tell the same story. The bento is shorter; the Use Cases have richer visuals. Pick whichever you'd rather keep.
2. **Demote the "Three pillars" section to a 1-line summary** ("Open source skills · pay-as-you-go API · custom builds") and let the actual Pricing section near the bottom do the selling. Or kill pricing entirely if you'd rather sell Skills/API/Services upfront.
3. **Move the pull quote** to right before or right after the Problem section, not between Architecture and Problem. Architecture is the "how it works," Problem is the "why you need it" — the testimonial belongs alongside the why.
4. **Split or simplify section 7d** (the section with both Mission and Proof). Keep Proof. Drop Mission, or make it a single line at the very end.
5. **Delete the orphan "USE CASES" eyebrow section (l.571–575)** regardless of what happens to the Use Cases below it. An eyebrow with no headline is a UI bug.
6. **Replace orphan jargon** with plain language: "sacred rules" → "creative constraints" or specific examples; "80% pass" → spell out what the metric is; "A&R" → say "talent scouting" or expand on first use; "Drive" → "Google Drive"; "ship" → "release" / "put out."
7. **Resolve the Gatsby Grace identity.** Either flag her as a Recoup Records artist in the bento card, or use a fake name there and save Gatsby Grace exclusively for the Proof section.
8. **Fix the final CTA mismatch.** The install command and the "Get started free" button should lead to the same outcome, not two different ones.

---

## One-paragraph recommended page order

Hero → Logos → Problem (the gap) → Architecture (here's how we fit in) → Pull quote (a buyer felt this pain) → How it works → Bento (six things we ship) → Proof (we run our own labels — that's why it works) → Pricing (three ways in) → Final CTA. That cuts the Use Cases section entirely, moves the pull quote next to the problem it validates, makes Proof a closer instead of a mid-page detour, and lets Pricing be the single sales beat instead of the second one.
