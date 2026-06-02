# User Journey — Rights-Company Owner (Org-Owned Skills)

> First-visit walkthrough of recoupable.com, in character. Analysis only — read against the actual source files. Quotes are verbatim from the rendered copy.

## Who I am

I run a music-rights and publishing company — a large catalog of songs, sync licensing, royalty streams. I'm a serious operator and I'm already deep on AI: I put my whole company on Claude Team after running an internal "Claude strategy class," and we're building our own agentic layer over our proprietary royalty database. My finance lead is a power user who's already authoring reusable skills. My hard line: **I will not adopt third-party tools that train on my proprietary data, or that I'd customize but never own.** I want an **org-owned skills/plugins repository** my teams share, plus a "house manager" role to maintain it. I care about governance, who-owns-what when an employee leaves, cross-team skill sharing, wrapping our internal systems as MCP, and build-vs-buy on infra.

## What I want (one sentence)

Proof that Recoup will build **org-owned skills and agents inside my own stack — on my proprietary data, owned by me, governed by my company** — delivered as a legible consulting engagement that's clearly different from a generic AI consultancy.

## 5-second test

Eyebrow: "Building the agentic music industry." H1: **"Put AI to work inside your music business."** Sub: "Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack."

**Verdict of the first 5 seconds:** Warm, not hot. "Custom agents that run in your stack" is exactly the phrase that makes me keep scrolling — it implies my infra, my environment. But "Put AI to work inside your music business" reads like generic enablement, and nothing here yet says *I own it* or *your data stays yours*. I'm intrigued, not reassured. For a buyer whose entire objection is ownership and data-governance, the hero whispers where it needs to say it out loud.

---

## Section-by-section

### Header (chrome)
- **Thinking:** Minimal nav — "Research" (external), "Consulting," and a black "Talk to us" pill (→/consulting). Clean. Confident. Reads like a firm, not a SaaS dashboard.
- **Narrative so far:** Two doors: read what they think, or talk to them. As a consulting-shaped buyer, that suits me — I'm here to talk, not to self-serve a free trial.
- **Friction:** "Talk to us" and "Consulting" both go to the same place, so the header is effectively one CTA twice. No "Platform"/"Developers" up top means if I wanted to vet the tech depth first (I do), I have to hunt in the footer.
- **Works:** Restraint signals seniority. No "Sign up free" noise.
- **Doesn't:** Nothing addresses ownership/governance, and there's no "for catalogs/rights" entry point in the nav.

### 1. Hero
- **Thinking:** "the custom agents that run in your stack" — good. That's the build-in-my-environment promise. "research lab and implementation partner" frames them as a firm that builds, not a vendor that licenses. CTAs: **"Talk to us"**→/consulting, **"Read our research"**→research (external).
- **Narrative so far:** They build custom agents in my environment and publish what they learn. Promising shape.
- **Friction:** "in your stack" is doing a LOT of unspoken work. Does "your stack" mean *my* Claude org, *my* cloud, *my* data — or their hosted platform that I point at my stack? Ambiguous, and that ambiguity is the whole ballgame for me.
- **Works:** "implementation partner," "custom agents," "in your stack" — all on-message for a consulting buyer.
- **Doesn't:** No "you own it." No "we don't train on your data." No "org-owned skills." The exact words I'm scanning for are absent.

### 2. Logos — "Used by teams at"
- **Thinking:** Social proof bar. I'd glance for a peer — another catalog, a publisher, a rights org.
- **Friction:** Logos render via `/api/customer-logos/<slug>` — **needs live verification (parent will check)** for which logos actually show and whether any are catalog/publishing peers. From source I only see the mechanism, not the names.
- **Works:** "Used by teams at" is the right, modest claim.
- **Doesn't:** If these are artist/label logos and not rights/publishing peers, it won't move me. I need to see *my kind* of company.

### 3. Lanes — Research / Build / Partner
- **Thinking:** "Research in public. Tools in the open. Implementation with your team." Three cards: Research→research (external), Build "See the tools"→/platform, Partner "Talk to us"→/consulting.
- **Narrative so far:** Clear operating model. Build lane: "Open skills, plugins, and an API so your team can put music intelligence into Claude, Cursor, and your own stack." Partner lane: "custom agents built for your roster and workflows."
- **Friction:** "for your roster and workflows" is label/artist language. I'm a **catalog/rights** owner — "roster" subtly tells me I'm not the core ICP. And "open skills" again raises but doesn't answer the ownership question: open ≠ mine.
- **Works:** The Build lane naming ("skills, plugins, API," "your own stack," Claude/Cursor) is precisely my mental model. This is the most encouraging block so far.
- **Doesn't:** No bridge from "open skills we publish" to "private, org-owned skills we'd build for you."

### 4. Research — "We learn in the open, with real operators."
- **Thinking:** "Catalog diligence, label operations, agent rollouts — we publish what actually works (and what doesn't)." The ResearchCard shows artist analytics (Gatsby Grace: monthly listeners, followers, top cities, playlists).
- **Narrative so far:** They name "catalog diligence" — that's me. Good signal that they live in my world.
- **Friction:** The card itself is **artist-growth analytics** (listeners, saves, playlists), not catalog/royalty/diligence. The headline promises my world; the visual shows the artist-marketing world. Mild whiplash.
- **Works:** "with real operators" + "what doesn't" earns credibility. I trust people who publish failures.
- **Doesn't:** Nothing about data handling in research engagements — do they publish using client data? I'd want that addressed before I let them "learn in the open" near my catalog.

### 5. Problem — "Your team has Claude. It still can't do the work."
- **Thinking:** This is *literally my situation*. Three columns: **"No music context"** ("doesn't know your roster, catalog, or deal terms"), **"No safe access"** ("can't touch Drive, royalty data, or distributors on its own"), **"No music workflows"** ("Diligence, A&R, content ops — none of it built in").
- **Narrative so far:** They get it. "No safe access… royalty data" and "doesn't know your… deal terms" is exactly the gap I'm closing internally right now.
- **Friction:** This is *diagnosis without a stance on safety*. "Safe access" names the fear but the page never closes the loop with *how* they make access safe (permissions, no-training, ownership). It pokes the bruise and walks away.
- **Works:** Best-targeted section on the page. The "royalty data" and "deal terms" specificity tells me this was written by someone who's been in the room.
- **Doesn't:** "Safe" is asserted, never defined. For me, "safe" = my data isn't trained on and I own the result. Say it.

### 6. Build — "One harness, many workflows." (dark)
- **Thinking:** Chips: Claude / Cursor / API / MCP / Chat. "Chat is a hosted workspace. The API and open skills are how you embed music intelligence in Claude, Cursor, and your own tools — **bring your own agent, Recoup plugs in.**" ArchitectureDiagram cycles Terminal / Claude Cowork / ChatGPT views running a "Research Billie Eilish / create a 12-piece content batch" demo.
- **Narrative so far:** "Bring your own agent, Recoup plugs in" is the strongest single line for me — it implies I keep my Claude org and my control; they're a layer, not a destination. MCP on the chip list tells me they speak my "wrap internal systems as MCP" language.
- **Friction:** The *demo* is artist content generation (Billie Eilish, Reels/TikTok). For a rights/publishing buyer that's the wrong worked example — I want to see "audit this catalog / reconcile these royalties / surface sync-license exposure," not a content batch. The infra story is right; the proof scene is off-persona.
- **Works:** Claude + Cursor + MCP + "bring your own agent" = they architect the way I think. This is where I lean in technically.
- **Doesn't:** "Plugs in" to *what*, exactly, on *whose* infrastructure? And again — no ownership/no-training statement on the one section where I'm evaluating the trust boundary.

### 7. Open tools shelf — "The tools we build, free to install."
- **Thinking:** Five packs, each `npx skills add recoupable/<x>`: diligence, ar, content, operator, fan. Tagline: "Every engagement sharpens the open skills we ship. Pick a pack, install in seconds, see how we work." `recoupable/diligence` = "Skills, agents, and templates for catalog audits and deal rooms."
- **Narrative so far:** This is the most *me* thing on the site. A `diligence` pack for "catalog audits and deal rooms" installed via `npx skills add` is exactly the artifact I want — and it proves they actually ship skills, not slides.
- **Friction (the big one):** These are **their** open skills. My entire thesis is **org-owned, private skills built on my proprietary data that I own.** The shelf proves they can build skills *in public* — it does NOT signal "we'll build *your* private skills, in *your* repo, owned by *you*, that don't leak to the open shelf." In fact "Every engagement sharpens the open skills we ship" actively *alarms* me: it sounds like work I pay for flows back into your public packs. That's the opposite of what I need to hear.
- **Works:** Tangible proof of competence. `npx skills add recoupable/diligence` is a credibility flex I respect. **Needs live verification (parent will check)** that these packs actually resolve/install.
- **Doesn't:** No "private/org-owned" counterpart. No "your engagement skills stay yours and are not published." This section is simultaneously the most convincing (they build skills) and the most worrying (do mine become theirs?).

### 8. Consulting band — "…still planning their AI strategy. Start executing it."
- **Thinking:** "Training and implementation from operators who build the tools — not slide decks. We work with labels, catalogs, and platforms inside their own stack." CTA "Talk to us"→/consulting.
- **Narrative so far:** "operators who build the tools — not slide decks" is the right differentiator against McKinsey-type AI consultancies. "catalogs… inside their own stack" finally names *catalogs* in the consulting pitch. Good.
- **Friction:** Still no mention of ownership, governance, who-owns-what-when-an-employee-leaves, or data-privacy. This is the band that should carry my objection-killers and it doesn't.
- **Works:** Clear, confident, anti-slideware. The tension hook lands.
- **Doesn't:** Doesn't differentiate on the dimension *I* care about (ownership/governance), only on the build-vs-talk dimension.

### 9. Pull quote — "Catalog diligence is one of the biggest pain points I have…"
- **Thinking:** "Cut it down to minutes and it changes how we buy." — "Catalog fund operator."
- **Narrative so far:** A peer voice, finally. Catalog diligence in minutes is a real wedge.
- **Friction:** Anonymized "Catalog fund operator" — I get why, but for a six-figure-trust decision I want a name, a logo, or at least a verifiable case. Anonymized quotes read as aspirational.
- **Works:** It's *my* pain (diligence) in *my* peer's mouth. Resonant.
- **Doesn't:** Speaks to diligence-as-a-service (buy-side), not to my actual ask (org-owned skills my whole company runs). Adjacent, not on-target.

### 10. Proof — "We run our own labels."
- **Thinking:** "Recoup Records and our artist Gatsby Grace use these same tools every day… Every skill we publish earns its keep on a real roster first." CTA "See how we dogfood"→/company/recoup-records.
- **Narrative so far:** Dogfooding is genuine proof of competence and conviction.
- **Friction:** Their dogfood is a **label/artist roster** — release plans, playlist pitching. It proves the artist-marketing use case, not the **rights/royalty/catalog-governance** use case I'm buying. It reassures a label GM, not a publishing exec.
- **Works:** "earns its keep on a real roster first" is a strong integrity claim.
- **Doesn't:** Wrong proof for my segment. I'd want "we run our own catalog ops / diligence / royalty workflows on this."

### 11. Final CTA — "Let's build it in your stack."
- **Thinking:** "in your stack" again. CTAs "Talk to us"→/consulting and "Read our research" (external).
- **Narrative so far:** Consistent close. The repetition of "in your stack" is the throughline I like most.
- **Friction:** It's the fourth identical "Talk to us"→/consulting. By now I want a *different* next step for a technical/governance buyer — e.g. "See how ownership & data handling works" — not the same email door.
- **Works:** Tight, confident, on-message.
- **Doesn't:** Still never says "you own it" / "we don't train on your data." Last chance to land my objection — missed.

### Footer (chrome)
- **Thinking:** Three columns — Work with us (Consulting, Research, Recoup Records, Contact), Build (Platform, Developers, API Docs, Pricing), Company (About, Vision, Open app). Tagline: "Research, open tools, and hands-on implementation for the agentic music industry."
- **Narrative so far:** This is where the technical-evaluation doors live. As a build-vs-buy buyer I'd dive into Platform + Developers + Pricing here.
- **Friction:** **Pricing** is footer-only — I'd want it more accessible. No "Security," "Trust," "Data," or "Governance" link anywhere, which for my buyer profile is a conspicuous hole.
- **Works:** Complete, well-organized; Developers/API/Docs present for my technical due diligence.
- **Doesn't:** No trust/security/ownership destination to click. That's the page I most want and it doesn't exist.

---

## Links I clicked (expectation vs reality)

| Link | Where | Expectation | Reality | Flag |
|---|---|---|---|---|
| "Talk to us" / Header pill | →/consulting | Scoped consulting offer addressing ownership/governance | Consulting page exists; strong founder creds, but generic AI-strategy framing | **Mismatched to my need** |
| "Read our research" | →research.recoupable.com (external) | Field notes incl. governance/data handling | Can't verify content | **Needs live verification (parent will check)** |
| Lane: "See the tools" | →/platform | How org-owned skills work, ownership model | Thin: "Agents/Workflows/Integrations/Data Layer/API," CTA "Get started"→chat.recoupable.com | **Dead-endy / mismatched** |
| `npx skills add recoupable/diligence` (×5) | shelf | Installable diligence skill pack | Source shows the command only | **Needs live verification (parent will check)** |
| Consulting band "Talk to us" | →/consulting | (same as header) | (same) | Duplicate of #1 |
| Proof "See how we dogfood" | →/company/recoup-records | Catalog/rights dogfooding | Copy is label/artist dogfooding ("the label… every release, marketing push") | **Mismatched to my segment** |
| Footer → /developers | footer | API/MCP/CLI depth for my eng team | "API / CLI / Docs / Use Cases," CTA "View docs" (external) | OK but shallow |
| Footer → /company/about | footer | Trust, team, governance posture | "platform for autonomous music businesses… for artists, labels, distributors, developers" + contact emails | **Thin; no rights/publishing, no governance** |
| Footer → /company/vision | footer | Where ownership/agentic future is going | "Music businesses are going autonomous… Not a chatbot. Not a tool. The system that runs music businesses through agents." | Vision-y; **no ownership/data stance** |
| Footer → /pricing | footer | Engagement pricing | (not read here; consulting page says "Sessions start at $500") | $500 reads *too small* for an enterprise build — see objections |

**Duplicate/circular notes:** Header "Consulting" and "Talk to us" are the same destination; the homepage fires "Talk to us"→/consulting **four** times. The Proof CTA goes to `/company/recoup-records` while a separate `/records` route also exists — **potential duplicate/competing route** a careful visitor could trip over. **Missing links I actively wanted and could not find anywhere:** an explicit **"You own it"**, **"We don't train on your data,"** **org-owned/private skills**, **governance / offboarding (who-owns-what when an employee leaves)**, and a **Security/Trust** page.

---

## Objections that would make me bounce

1. **Ownership is never stated.** Nowhere does the site say "you own the skills/agents we build." For a buyer whose #1 rule is "I won't customize something I never own," silence reads as "you don't own it."
2. **"Every engagement sharpens the open skills we ship."** This actively implies my paid, proprietary work feeds *their public* packs. That's a dealbreaker phrasing for me unless explicitly fenced.
3. **No data-training / data-handling statement.** "Safe access… royalty data" names my fear but never says "we don't train on your data, it stays in your environment." Naming the fear without resolving it makes it worse.
4. **No governance / org-owned-repo / offboarding story.** My core ask — a company-owned skills repository, a "house manager," who-owns-what when an employee leaves, cross-team sharing — appears nowhere. The product they show is "open skills" + "hosted Chat," not "your private, governed repo."
5. **Wrong worked examples for rights/publishing.** Demos and dogfooding are artist content + release marketing (Billie Eilish content batch, Gatsby Grace growth). I see almost nothing modeling catalog/royalty/sync governance at scale.
6. **Consulting page feels generic + underpriced for my scope.** "$500 sessions," "1:1 Strategy Sessions," "Team Training" reads like solo-advisor packaging. I'm buying a *build* engagement on proprietary infra; this framing makes me doubt they do enterprise-grade, owned builds.
7. **No segment mirror.** "roster," "labels, catalogs, and platforms" — "catalogs" is included but never *centered*. I never see "publishers / rights owners / royalty teams" as a first-class audience.

## Verdict (convert?)

**Likelihood: 4/10.** I would *not* bounce — the DNA is right and several lines ("custom agents that run in your stack," "bring your own agent, Recoup plugs in," MCP, the `diligence` skill pack, "operators who build the tools — not slide decks") are precisely tuned to how I think, so I'd probably send a short, *skeptical* email to hi@recoupable.com to test them. But I would NOT be convinced by the site itself. It proves they build **open** skills and run **label/artist** ops; it does not make the **org-owned, on-your-data, you-own-it, governed** promise explicit — which is the entire decision for me. The "engagements sharpen our open skills" line and the absence of any ownership/data/governance language leave my single biggest fear *louder* after reading than before. High intrigue, low trust-close.

## Top 5 fixes (ranked)

1. **State ownership + no-training explicitly, above the fold and on /consulting.** Add a line like: "We build private, org-owned skills and agents in *your* environment, on *your* data — you own them, we don't train on them, they're never published." This single change likely moves me from 4 to 7.
2. **Reframe or fence the "open shelf."** Pair "The tools we build, free to install" with a clear "And we build *private*, org-owned skill repositories for clients — your engagement work stays yours." Kill or qualify "Every engagement sharpens the open skills we ship" so it can't be read as "your IP feeds our public packs."
3. **Add a Governance/Trust destination** (and a footer link): data handling, no-train guarantee, org-owned skill repos, cross-team sharing, and **offboarding / who-owns-what when an employee leaves.** Right now there is no page to click for the thing I care about most.
4. **Swap one demo + one proof point to rights/catalog.** Replace the Billie Eilish content-batch demo (or add a tab) with a catalog/royalty/diligence worked example, and add a catalog/publishing dogfooding or named "Catalog fund operator" proof. Make "publishers / rights owners" a first-class audience word.
5. **Re-tier the consulting offer for owned builds.** Keep the $500 entry call, but add a visible "Custom build / org-owned skills implementation" track (scoping → build-in-your-stack → handover & ownership → optional 'house manager' retainer) so the page reads enterprise-build, not solo-advisor. Differentiate explicitly from generic AI consultancies on *ownership*, not just *"we build, not slides."*
