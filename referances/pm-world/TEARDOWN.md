# prodmgmt.world Teardown — "AI PM OS"

Reference study of how George Nurijanian (`@nurijanian`) packages an agent plugin as a standalone product. Screenshots captured 2026-06-11. See `ABOUT.md` for origin notes; the actual plugin is cloned at `github.com/sidneyswift/research`.

**Why we care:** This is the playbook for packaging a Recoup plugin for lower-tier / self-serve users — "Record Label in a Box" the way he does "Chief Product Officer in a Box."

---

## The Business in One Paragraph

A $99 one-time zip file (moving to $199/year at V2) you install into Claude Code, Claude Cowork, or Cursor. Inside: 235 PM skills, 11 guided workflows, 12 reviewer subagents, 6 MCP connectors, 150+ frameworks, and context files that act as memory. 520+ buyers at time of capture. Sold entirely through his own content flywheel — no paid ads visible.

## The Funnel

```
Build a skill
   ↓
Teach it publicly (X posts, blog guides, Substack issues — the content IS the changelog)
   ↓
SEO surfaces catch search traffic (122-tool directory, comparisons, free prompts)
   ↓
Everything CTAs to one product page → $99 zip + 30-min setup call
```

Key property: every piece of content does double duty. A new skill becomes a newsletter issue, a tweet thread, proof the product is alive, and a reason to buy before the price goes up.

---

## Page-by-Page Notes

### Landing page (`landing/1-8.png`)

| # | Section | What's working |
|---|---------|----------------|
| 1 | Hero: "One Product Manager. The Impact of 10." | Outcome-quantified headline. Tool logos (Claude Code/Cowork/Cursor) answer "will it work for me" instantly. 4.9/5 + 1,000+ customers above the fold. |
| 2 | Logo bar + pain points | "Trusted by PMs at" FAANG logos (individual buyers, not company deals — borrowed credibility). Three *quantified* pains: "3+ hours re-explaining context," "40 saved links, zero used," "∞ hrs on the wrong problems." |
| 3 | Product cards | $99 flagship + $29 skills-only downsell that's "already included" in the flagship — pure price anchoring. |
| 4 | Maker story + giant pull-quote | "I built it for myself first." Quote targets the solo-operator: "closest thing to having a CPO in the room. It challenges me instead of just agreeing." |
| 5 | Testimonial wall | ~10 cards, every one a specific outcome story (fixed an 8-point activation drop in a day, decision workflow changed a dreaded call) — zero generic praise. |
| 6 | FAQ | Pre-empts: need to code? vs ChatGPT? refund? why now? |
| 7 | Final CTA | "Use it on one real problem this week" — activation-framed, not feature-framed. Setup call included. |
| 8 | Newsletter + footer | Substack capture (3,120 subs, weekly Zoom calls). Footer is an SEO sitemap: tools directory, blog, free prompts, Claude Code/Cursor hub pages. |

### Product page `/ai-pm-os` (`product/1-15.png`)

| # | Section | What's working |
|---|---------|----------------|
| 1 | Hero | "Chief Product Officer in a Box." Price card shows `V2.2-BETA · updated 10 days ago` — a zip file framed as living software. |
| 2 | "An operating system, by the numbers" | 235 skills / 11 workflows / 12 subagents / 6 MCPs. Concrete inventory > vague "AI-powered" claims. |
| 3 | YES/NO qualifier | "This is for you / Skip this if" — explicitly disqualifies bad-fit buyers (wants a dashboard, won't use Claude/Cursor). Filters refunds, builds trust. |
| 4 | Testimonial interstitial | JTBD synthesis "half-day → 20 minutes." |
| 5 | Workflow catalog | All 11 slash commands with their pipelines spelled out (`/workflow:strategy`, `:opportunity`, `:research`, `:prd`, `:stakeholder`, `:meeting`, `:decisions`, `:review`, `:coaching`...). Feels like product UI, not marketing copy. |
| 6 | Memory system | "Capture → Grow → Recall → Compound." Demo: plain-language update distilled into tagged DECISION / STAKEHOLDER / RISK records. |
| 7 | Daily drip + trust | One context question per session, tapering as it learns. "Confirmation-gated, sensitivity-flagged, stored in files you control" — privacy as a feature. |
| 8 | Subagents + MCPs | "A standing review board" — 12 reviewers (engineering, design, exec, legal, UX research, devil's advocate, customer voice, PRD strengths/flaws) + 6 live connectors (Lenny's Podcast, Notion, Linear, Atlassian, GitHub, Perplexity). |
| 9 | Mid-page CTA + testimonial repeat | Catches scrollers. |
| 10 | Stack picker | Claude Code vs Cowork vs Cursor comparison — removes the "which tool do I need" bounce. |
| 11 | Competitor dunk | Split-screen: "vibe-coded prompt pack" chat vs PM OS terminal auto-routing skills. Mocks course-seller email funnels ("Email 4 of 10 — still on the fence?"). |
| 12 | "Receipts" table | 6 experience claims, ✗ alternative vs ✓ PM OS ("Sticks to your rules: re-checks every reply, even three hours in"). |
| 13 | Founder letter | "Why I built PM OS," signed, personal promise. |
| 14 | Deep FAQ | 15 questions: data privacy, per-seat licensing, delivery/updates, "what if I never use it." |
| 15 | Closer | "Stop Asking ChatGPT for PM Advice." 520+ bought. Setup call repeated. |

### Tools directory (`tools/1-3.png`)

- 122 curated AI tools across 10 PM-job categories, Free/Paid/Freemium filters.
- Featured comparisons ("Claude Code vs Cursor") + hub pages ("Claude Code for PMs", "Cursor for PMs").
- This is the SEO flywheel: evergreen search traffic → product CTA in the persistent top banner.

### Blog (`blog/1.png`)

- 15 long-form keyword-targeted guides: "Complete PRD Template Guide: 15 Templates," "How to Use Claude Code: Complete Tutorial for PMs (2026)," "AI for Product Managers."
- Demonstrates expertise, ranks for tool-adjacent searches, links down-funnel.

### Newsletter (`newsletter/1.png`)

- Substack: "Becoming Top PMs Together."
- Every issue is a skill drop: `/problem-first`, `/goal for Product Managers`, "PM OS v2: The Memory Loop," "I Built 3 Claude Code Commands to 10x My PM Work."
- The newsletter IS the product changelog — retention for buyers, conversion for readers.

---

## Tactics Worth Stealing

1. **Versioning + urgency on a static download.** "V2.2-BETA, updated 10 days ago" + persistent "$99 lifetime before V2 goes $199/yr" banner on every page. Creates both liveness and a deadline.
2. **Concrete inventory numbers.** 235/11/12/6 does the persuasion work. Count what's in our plugin and lead with it.
3. **Included setup call.** Kills the "bought it, never installed it" refund path and creates a testimonial-harvesting touchpoint.
4. **YES/NO qualification section.** Disqualifying bad-fit buyers reads as confidence and cuts support load.
5. **Outcome-specific testimonials.** Every quote is a story with a metric or a moment. (His `/testimonial` skill automates collection — it pulls customer info from agent memory, drafts the testimonial, appends to his Google Sheet.)
6. **Content = changelog = funnel.** Each new skill ships as a newsletter issue + tweet + proof of momentum.
7. **Downsell as anchor.** $29 skills-only product exists mostly to make $99 feel complete.
8. **SEO directory as top-of-funnel.** A curated tool directory is cheap to build, ranks well, and every page carries the product banner.

## Plugin Mechanics Worth Stealing (from `ABOUT.md` + the repo)

- **`/testimonial` skill** — automated social-proof collection from agent memory → his Google Sheet.
- **Context gate** — blocks workflows from running until the user has provided enough context (drives activation quality).
- **`/tidy` skill** — scheduled daily cleanup of stale files/data in the workspace.
- **Opinionated scaffold** — assumes one specific local directory, sets up the workspace on first `/start`.

---

## Recoup Translation: "Record Label in a Box"

| PM OS element | Recoup equivalent |
|---------------|-------------------|
| "Chief Product Officer in a Box" | "Record Label in a Box" (we already had this framing) |
| 235 PM skills | Recoup skills (artist research, fan segments, release planning...) |
| `/workflow:strategy`, `:prd`, `:stakeholder` | `/workflow:release`, `:fan-research`, `:pitch`, `:rollout`, `:sync` |
| 12-reviewer board (eng, legal, devil's advocate) | Label-role board: A&R, radio promo, sync licensing, music attorney, tour manager, devil's advocate |
| 6 MCPs (Linear, Notion, GitHub, Lenny's Podcast) | Recoup API MCPs: Spotify/streaming data, Chartmetric, socials, email |
| Memory: DECISION/STAKEHOLDER/RISK | Artist context: RELEASE / PARTNER / BUDGET / FAN-INSIGHT records |
| Daily drip question | "Who's the toughest gatekeeper on your current release, and why?" |
| Audience: solo PM with no senior team | Solo artist manager / indie label with no department heads |
| Lenny's Podcast MCP | Music-industry knowledge source on tap |

**Pricing model to test:** $99 one-time lifetime for early adopters → subscription at V2. Skills-only downsell at ~$29. Target: non-enterprise, self-serve tier that the main platform doesn't capture.

**Decided:**
- **Sidney plays the George role.** The funnel runs on his personal teaching voice — skills taught publicly under his accounts, product sold under his name.
- **Zip download, not `npx skills add`.** These are plugins (skills + workflows + subagents + MCP config + scaffold), not bare skills — a paid zip keeps the product gated, versionable ("V2.2 — updated 10 days ago"), and installable across Claude Code/Cowork/Cursor the same way PM OS does it. The public `recoupable/skills` repo stays the free top-of-funnel.

- **Self-contained vs API-connected: both.** `marketing/skills` already holds plugins + skills where some are Recoup-API-linked and some are standalone — the v1 combination plugin will likely mix both.

**⚠️ NEXT DECISION (important):**
- **What does the v1 combination plugin look like?** Which skills/workflows/subagents/MCPs from `marketing/skills` make the cut, what's the self-contained vs API-linked mix, and what's the install/auth story for the API-linked pieces. This defines the actual product — decide before any sales page work.
