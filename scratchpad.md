# Scratchpad — research + consulting site repositioning

> **Session:** 2026-06-01  
> **Status:** deep planning — **no implementation** until `plan.md` §9 locked  
> **Branch (dev):** `feat/agent-layer-positioning` (local :3001)  
> **Branch (prod):** `main` → [recoupable.com](https://recoupable.com)  
> **Spec:** `plan.md` (updated from this file)

---

## Where the truth lives

| Doc | Purpose |
|-----|---------|
| **`scratchpad.md`** | **This file** — session learnings, evidence, working defaults |
| **`plan.md`** | Collaborative spec — sections, storyboard, copy stubs, implementation gate |
| `content/brand/positioning-brief.md` | Durable spine (research · build · partner) |
| `docs/plans/2026-06-01-research-consulting-site.md` | Phased execution after §9 locks |
| `scratchpad-2026-04-landing-audit.md` | Archived April audit (hygiene only; “skills-first” conclusion obsolete) |
| `strategy/transcripts/may-2026-*.md` | May 29 discovery (dealguy, LANDR, seeker) |

---

## Session goal

Reposition Recoup as **researchers, builders, and consultants** for the **agentic music industry** — not competing SaaS. Cherry-pick `main` + `feat/agent-layer-positioning`; **do not** ship either homepage wholesale. Deep plan before code; iterate with Sid.

---

## Positioning spine (locked)

**One sentence:** We research how AI is changing music businesses — and we help labels, catalogs, and operators implement it in **their** stack.

**Three lanes:**

| Lane | Job | Monetization |
|------|-----|--------------|
| **Research** | Public learnings (LinkedIn, blog) | Inbound trust |
| **Build** | Open skills, plugins, API | Credibility (+ API credits secondary) |
| **Partner** | Strategy, rollout, custom plugins | **Consulting** (primary revenue CTA) |

**We are NOT:** music SaaS competitor, “sign up and we run your label,” vendor that trains on your data, one-shot magic.

**Full brief:** `content/brand/positioning-brief.md`

---

## Discovery evidence (May 29, 2026)

All three calls **same day**, inbound via **LinkedIn** (building in public). All wanted **consulting / custom infra**, not platform signup.

| Call | File | Buyer | Takeaway |
|------|------|-------|----------|
| Catalog fund | `may-2026-dealguy.md` | Fund manager + consultant network | Staged diligence; rejects generic SaaS; Sid = consulting + tooling |
| LANDR | `may-2026-landr.md` | Platform strategy | Agentic overlay, post-distribution; **partnership**, not replacement |
| Seeker | `may-2026-seeker.md` | Enterprise label | Own plugins in Claude; org skills repo; ~1mo consulting next; rejects data-training vendors |

**Site implication:** Homepage must say **talk to us / consulting**, not **sign up for chat**.

---

## Local vs production (why they look different)

| | **`main` (prod)** | **`feat/agent-layer-positioning` (local)** |
|--|-------------------|---------------------------------------------|
| Hero | Music Intelligence + `HeroDemo` (Drake) — **broken in prod** | “Free skill packs” + **book shelf** + install terminal |
| Nav | Pricing, Advisory, Blog | Research, Skills, API, Services |
| Story | Product / chat SaaS | Developer / open-source SKU |
| Gap | ~35 commits on feature branch; PR #17 not merged | 1 local commit ahead of origin |

**Plan:** New branch `feat/research-consulting-site` from **`main`**, cherry-pick assets — not merge feature branch as-is.

---

## Sid decisions (locked)

| # | Decision |
|---|----------|
| 1 | Primary CTA: **`/consulting`** (Talk to us) |
| 2 | **`/advisory` → `/consulting`** (301) |
| 3 | Case studies **anonymized** until permission (no Rostrum/Seeker names on site) |
| 4 | **Cherry-pick** feature branch — keep animation + shelf; **records not books** |
| 5 | **HeroDemo:** drop from hero (broken prod); builder signal via shelf + architecture |
| 6 | **Deep plan first** — `plan.md` + this scratchpad |
| 7 | Reference site: **[every.to](https://every.to/)** — analyzed below |

---

## Reference: [Every](https://every.to/) (2026-06-01)

**Why it fits:** Same shape as us — **editorial + products + consulting** — but subscription-first. We invert priority: **consulting + research lead**, build supports.

### Steal

- **“Built by Every”** → **“Built by Recoup”** record shelf (interactive, not 6 static product cards)
- **Recent essays** with dates near top → proves active lab
- **Themed research rails** (eyebrow + cards + arrow) — music themes, not “Dispatches from AI”
- **Consulting in nav** + full-width consulting band (*makers who ship*, not McKinsey)
- **Every Studio** → our Build lane (architecture + tools links)
- **Trust line** → logo strip (F2)
- **Section rhythm:** headline → 3–4 cards → read more; long calm scroll

### Reject

- Subscription hero + Subscribe CTAs everywhere
- Paywall / “unlock universe” modals
- 6+ products as equal homepage identity
- Generalist “edge of AI” (we stay **music-only**)
- Sign Up prominent in header (reads chat SaaS)

### Every → Recoup page arc

```text
Hero (positioning + CTAs) → logos → Built by Recoup (shelf) → recent posts
→ problem → research rails → build (arch + tools) → 3 work tiles
→ consulting band → anonymized quote → Recoup Records proof → final CTA
```

---

## Flywheel — the real planning problem (2026-06-01)

**Correction:** Record sleeves were **one optional visual** (cherry-pick from feature branch), **not** decided as hero. Every’s stamps are something different.

### What Every actually does (from screenshots + site)

| Layer | What it is | Example |
|-------|------------|---------|
| **Stamps (hero-adjacent)** | **Branches of the flywheel** — how value shows up | Read · Email · Speak · Listen · Write · Organize |
| **Products** | **Point solutions** — one job each | Cora (email), Sparkle (Mac files), Spiral (writing), Monologue (voice), Proof (docs), Plus One (Slack agent) |
| **“Explore the Every universe”** | Menu linking **every entry point** | Read article, Discord, podcast, *Use Cora*, *Use Sparkle*, …, create team |
| **Editorial** | Feeds the flywheel | Essays, rails, studio |
| **Consulting** | Monetizes execution | Nav + band |
| **Open / skills** | Implied in products + content | Not the same as one stamp per GitHub repo |

Stamps ≠ product grid. Stamps = **modes of the business**. Products hang off the universe menu.

### What Recoup has today (honest inventory)

| Asset | What it actually does | Every analogue | Problem for “one stamp = one thing” |
|-------|---------------------|----------------|-------------------------------------|
| **Research** (LinkedIn, blog) | Inbound, trust | Read / Listen / editorial | ✅ maps cleanly |
| **Open skills / plugins** | Modular packs (diligence, operator, content…) | Spiral, skills repos — but **many packs**, not one | ✅ stamp per **pack** OR one stamp **Install** |
| **Chat platform** | Research, content, plans, agents — **broad** | No single Cora — closer to “the whole universe” | ❌ one stamp oversells or undersells |
| **API** | Research, content, credits — **broad** | Infrastructure, not a user-facing “product” | ❌ same |
| **Consulting** | Strategy, custom plugins, rollout | Consulting band | ✅ maps cleanly |
| **Recoup Records** | Dogfood / proof | Their “we ship products” proof | ✅ proof, not necessarily a stamp |

**Revenue truth (`customers.md`):** Consulting + manual delivery wins today; chat alone = mediocre adoption. Site must sell **partner + research**, not “sign up for chat.”

### Current flywheel (as it works now)

```text
        ┌─────────────┐
        │  RESEARCH   │  LinkedIn / blog → discovery calls
        └──────┬──────┘
               ▼
   ┌───────────┴───────────┐
   │                       │
   ▼                       ▼
┌──────────┐        ┌─────────────┐
│  BUILD   │        │  PARTNER    │  ← money (consulting, custom plugins)
│ skills   │        │ consulting  │
│ API      │        └─────────────┘
│ chat*    │
└──────────┘
   * chat = cred + demo + some B2C; not primary enterprise path
```

### Aspirational flywheel (possible future — do not promise on site)

- **More point surfaces?** (e.g. finance plugin for Seeker-shaped deals, catalog plugin for funds) — closer to Every products  
- **Platform stays harness** — skills/API call Recoup; chat is one client, not the whole story  
- **Org skills repos** — customer-owned IP (Seeker pattern)  
- **Records** — public proof lane  

Site job **now:** describe **lanes** (research · build · partner) without faking six Cora-sized SKUs.

### Positioning now vs aspire

| | **Position now (honest)** | **Aspire (later)** |
|--|---------------------------|---------------------|
| **Lead** | Research + consulting for music operators | Same, plus clearer product brands |
| **Build story** | “We publish skills & API; we implement in your stack” | Named plugins per vertical (finance, diligence, …) |
| **Chat** | “One place to try the harness” — tertiary, footer | Maybe reposition or split — TBD |
| **API** | “Primitives for builders” — developers page | Same |
| **Visual** | Stamps = **lanes** OR universe menu — **not** assumed record hero | Point products get own stamps when real |

### Three ways to use Every’s stamp / universe pattern for Recoup

| Pattern | Stamps or tiles | Best for | Risk |
|---------|-----------------|----------|------|
| **A — Lane stamps** | Research · Build · Partner (+ optional Records proof) | Consulting-first; honest about 3 businesses | Less “product wow” |
| **B — Surface stamps** | Read · Install · Chat · API · Partner | Maps entry points; “Explore Recoup” dropdown like Every | Chat/API look like narrow products (they aren’t) |
| **C — Capability stamps** | Diligence · Ops · Content · Research · Records | Matches skill packs + dogfood; **mid-page** not necessarily hero | Can feel like SKU grid if copy wrong |

**Record sleeve / book shelf** = **variant of C** (interactive install). **Every postage stamps** = **variant of A or B** (flywheel branches). **Do not conflate.**

### Hero — explicitly unset

| Option | Role of visual |
|--------|----------------|
| **H-text** | Headline + dual CTA only (no metaphor) |
| **H-stamps** | 3–6 flywheel branches (static or light hover) — like Every screenshot |
| **H-universe** | Headline + “Explore Recoup” panel (dropdown: blog, install, chat, API, consulting) |
| **H-records** | Interactive sleeves — **builder demo**, likely **below fold** if used |
| **H-split** | Copy + ResearchCard or architecture still |

**Previous default H2 (record hero) — withdrawn** until flywheel stamps are decided.

### “Explore Recoup” menu (Every universe riff) — draft links

| Label | Destination | Notes |
|-------|-------------|-------|
| Read our research | `/blog` | |
| Install skills for Claude | `/platform` or docs | |
| Try the chat harness | `chat.recoupable.com` | footer/header demoted |
| Use the API | developers / docs | |
| Talk to us | `/consulting` | primary commercial |
| See Recoup Records | `/records` | proof |

Could live: header trigger, hero secondary, or footer — **not** all three.

---

## LOCKED decisions (Sid, 2026-06-01 eve — synced to `plan.md` §0)

| Fork | Decision | Notes |
|------|----------|-------|
| **Hero** | **H-text** — copy + dual CTA, no gimmick | No stamp/record hero; reasoning: nothing to misread as a product |
| **Flywheel** | **A as a section** — Research·Build·Partner lanes lower on page | NOT a hero; no Every-style stamp/product grid |
| **Builder proof** | **C′ record shelf — mid-page, below fold** | Keeps animation; frames as "what we build," not identity |
| **Nav** | **B+** — Research + Consulting; **no Explore menu in header** | minimal nav pairs with minimal hero |
| **Open source** | **OS-B** mid-page | Skills/API support consulting story |
| **Storyboard** | **v1.0** in `plan.md` §5 | |
| **Header auth** | Sign In/Up → footer only (provisional) | still confirm |

**Why no stamp grid:** Every has 6 one-job consumer products → stamps work. Recoup's chat/API are broad harnesses + consulting is the product. A stamp grid would fake SKUs and recreate the SaaS-catalog trap.

### If we use capability tiles (mid-page, not hero) — draft labels

| id | Label | Links to |
|----|-------|----------|
| diligence | Catalog & diligence | skills pack |
| operator | Label operations | skills pack |
| content | Content & campaigns | skills pack |
| research | Artist & market research | API / skills |
| records | Recoup Records | `/records` |

### Provisional section votes (for `plan.md` §4)

**Feature branch:** F1 ✏️ F2 ✅ F3 ✅ F4 ✏️ F5 ✅ F6 🔀 F7 ✏️ F8 ✅ F9 ❌ F10 ✏️  
**Main:** M1 ❌ M2 🔀 M3 ✅ M4 ✏️ M5 ✅ (one arch) M6 ❌ M7 ✏️  
**Pages:** P1 ✅ P2 ✅ P3 ❌ redirect

### Research rail themes (draft — confirm)

1. **Catalog & diligence** — funds, data rooms, valuation  
2. **Labels & agents** — org skills, finance, rollout  
3. **Platforms & distribution** — post-release, partnerships  
4. **Building in public** — experiments, plugins, lab notes  

### Consulting band copy (draft — Every riff)

- **Headline option A:** Stop planning your AI strategy for music. Start executing it.  
- **Sub:** Training and implementation from operators who build the tools — not slide decks.  
- **CTA:** Talk to us → `/consulting`

### Hero copy (draft — H2)

- **Eyebrow:** Open lab · implementation partner  
- **H1:** Building the agentic music industry.  
- **Sub:** We publish what we learn working with labels and catalogs. We partner with teams to implement AI in Claude and their stack.  
- **Primary:** Talk to us · **Secondary:** Read our research  

### Do not ship on homepage

- HeroDemo as hero, “Free skill packs” H1, home pricing grids, subscribe modals, named quote attribution, book metaphor (use records), duplicate funnels (skills × 3).

---

## Branch / git notes

- Monorepo root may be 1 commit ahead of `origin/main` (PROGRESS/AGENTS); marketing submodule dirty separately  
- Implement on: `git checkout main && git pull && git checkout -b feat/research-consulting-site`  
- Target PR: **`marketing` → `main`** (per marketing AGENTS.md)

---

## Still open (blocks `plan.md` §9)

- [x] ~~Flywheel model~~ → **A as section** (locked)  
- [x] ~~Hero~~ → **H-text** (locked)  
- [x] ~~B+ / OS-B~~ → confirmed; **no Explore menu in header**  
- [x] ~~Research nav link~~ → **external `research.recoupable.com`** (real blog repo)  
- [x] ~~Sign In/Up~~ → **footer only**  
- [x] ~~AnnouncementBar~~ → **cut**  
- [x] ~~§4 section votes~~ → **provisional locked**  
- [ ] Final **copy wording** (§6): H1, sub, "Build"/harness copy, consulting band headline  
- [ ] Research rail theme names (draft confirmed-ish — finalize wording)  

**Route note:** internal `app/blog` + `app/resources` are now stale (research = research.recoupable.com). Redirect both → external during build. YAGNI — don't rebuild an internal blog.

---

## Scratchpad changelog

- **2026-06-01 (late):** Flywheel vs Every stamps; decoupled hero from record shelf; chat/API ≠ point products; hero unset
- **2026-06-01 (eve):** LOCKED — H-text hero, lanes (A) as section, record shelf C′ mid-page, B+ nav (no Explore menu), OS-B. Storyboard v1.0.
- **2026-06-01 (eve 2):** LOCKED — Research → external research.recoupable.com; auth footer-only; AnnouncementBar cut; §4 votes locked; stale /blog + /resources redirect → external. **Only final copy wording + rail names remain.**
- **2026-06-01 (eve 3):** Hero copy LOCKED — **option B** (partner-first: "Put AI to work inside your music business"), C's "Building the agentic music industry" kept as eyebrow/tagline. **D's tension hook moved to consulting band.** Reasoning: warm LinkedIn traffic → clarity beats cold-traffic tension hook. B-vs-D queued as first A/B test. **Only rail theme names remain before code.**  
- **2026-06-01 (eve):** Consolidated learnings; Every reference; synced to `plan.md`  
- **2026-06-01 (pm):** Sid — consulting, anonymized cases, cherry-pick records, deep plan  
- **2026-06-01:** Initial scratchpad; archived `scratchpad-2026-04-landing-audit.md`
