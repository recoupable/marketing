# Marketing homepage — collaborative spec

> **Status:** ✅ **v1 SHIPPED** 2026-06-01 on `feat/research-consulting-site` (PR open to `marketing/main`)  
> **Last updated:** 2026-06-01 eve (H-text hero, lanes section, shelf mid-page, B+ nav)  
> **Spine:** `content/brand/positioning-brief.md`  
> **Execution:** `docs/plans/2026-06-01-research-consulting-site.md`

## v1 as-built (deltas from §5 storyboard)

The shipped homepage is a **leaner cut** of the locked storyboard — full storyboard
sections deferred to v1.1 to ship faster. Order as built:

1. Hero (H-text) · 2. Logos · 3. Lanes (Research/Build/Partner) · 4. Research split (ResearchCard)
· 5. Problem/gap · 6. Build (dark arch band) · 7. Open-tools shelf (C′) · 8. Consulting band
· 9. Anon pull quote · 10. Records proof · 11. Final CTA.

**Deferred to v1.1 (not yet built):** recent-research dated cards, themed research rails,
3 work tiles (F7). **Nav:** B+ → now B (Platform + Pricing added to header after the userjourney
audit); Sign In/Sign Up removed entirely (header → "Talk to us"; footer restructured to
Work with us / Build / Company). `/advisory` → `/consulting` 301 live.

**userjourney fixes layered on (2026-06-01):** shelf now uses real `recoupable/skills` folders with
GitHub links + a working install; `/company/recoup-records` is a real proof page (`/records` 301'd in);
ownership/no-train in hero + `/consulting` + new `/trust` page; new `/partners` page; pull quote → `/audit`;
`/platform` CTA → `/partners`; X handle fixed. Full log in `userjourney.md` → "Fixes applied".

---

## How we work on this together

1. Read **`scratchpad.md`** for consolidated session context.  
2. Edit votes / defaults here or in scratchpad; agent keeps both in sync.  
3. Nothing ships until **§9 Spec locked** is fully checked.  
4. Then: `feat/research-consulting-site` from `marketing/main` per execution doc.

---

## 0. Locked decisions (Sid, 2026-06-01 eve)

| Area | Decision | Status |
|------|----------|--------|
| **Hero** | **H-text** — headline + sub + dual CTA, no interactive gimmick | ☑ locked |
| **Flywheel** | **A as a section** — Research · Build · Partner lanes lower on page, NOT the hero | ☑ locked |
| **Builder proof** | **C′ record shelf — mid-page, below fold** ("what we build," not the identity) | ☑ locked |
| **Nav** | **B+** — Research + Consulting in header; Platform/API/Skills/Records/Company/Legal in footer; no header Pricing/Sign Up; no Explore menu in header | ☑ locked |
| **Open source** | **OS-B** mid-page (skills/API/GitHub links) | ☑ locked |
| **Cases** | Anonymized quotes / tiles until permission | ☑ locked |
| **Advisory** | 301 → `/consulting` | ☑ locked |
| **Reference** | [every.to](https://every.to/) — borrow rhythm, NOT stamp/product grid | ☑ noted |

**Rationale:** Recoup sells expertise + implementation (consulting), proven by research + open tools. Chat/API are broad harnesses, not point products — so no Every-style stamp grid (would fake SKUs we don't have). Lead with words + "Talk to us"; shelf survives as mid-page builder proof.

---

## 1. Reference site — [Every](https://every.to/)

| Field | Value |
|-------|--------|
| **URL** | https://every.to/ |
| **Reviewed** | 2026-06-01 ✓ |
| **Why it fits** | Editorial + product studio + **consulting** — same three-lane shape; they lead subscription, we lead **consulting + research** |

### Steal → Recoup

| Every | Recoup |
|-------|--------|
| Built by Every (product row) | **Built by Recoup** — interactive **record shelf** |
| Recent essays + dates | Latest blog cards (3–4) |
| Themed rails + arrow | Music research rails (§1.1) |
| Consulting in nav + execution band | B+ nav + §5 consulting band |
| Every Studio | Architecture + OS-B tools |
| Trust under hero | Logo strip F2 |

### Reject

Subscription hero, subscribe modals, 6-product grid as identity, generalist AI positioning, prominent Sign Up.

### Research rail themes (draft)

1. Catalog & diligence  
2. Labels & agents  
3. Platforms & distribution  
4. Building in public  

→ `/blog` or `/resources` (pick one for nav).

### Every → Recoup arc

```text
Hero + CTAs → logos → [FLYWHEEL VISUAL TBD] → recent research → problem
→ research rails → build (arch + tools) → capability tiles OR 3 work tiles
→ consulting band → quote (anon) → Records proof → final CTA
```

### 1.1 Flywheel — Every stamps vs Recoup reality

**Key insight (Sid, 2026-06-01):** Every’s **stamps** (Read, Email, Speak, Listen, Write, Organize) are **branches of their flywheel**, not their product grid. Products (Cora, Sparkle, …) are **one-job apps** listed in **“Explore the Every universe.”** Recoup is different: **chat** and **API** each do **many** things; **skills** are modular open source.

| Recoup today | Role | Position on site **now** |
|--------------|------|---------------------------|
| **Research** | LinkedIn, blog → inbound | Lead with editorial |
| **Build** | Skills/plugins, API, chat harness | “Primitives + open tools”; chat/API = **broad**, not Cora-style |
| **Partner** | Consulting, custom plugins | Primary CTA |
| **Records** | Dogfood proof | Proof lane, not a product SKU |

**Aspire (later, don’t over-promise):** More named vertical plugins (finance, diligence); platform stays harness; org-owned skills repos (Seeker pattern).

#### Three visual patterns (pick before hero)

| ID | Pattern | Stamps / UI | Hero? |
|----|---------|-------------|-------|
| **A** | **Lane stamps** | Research · Build · Partner | Optional hero |
| **B** | **Surface stamps** | Read · Install · Chat · API · Partner + **Explore Recoup** menu (Every universe) | Hero or header |
| **C** | **Capability tiles** | Diligence · Ops · Content · Research · Records | Usually **mid-page** |
| **C′** | Record sleeve (feature branch) | Interactive install per pack | **Below fold** — builder demo, not flywheel definition |

**Withdrawn assumption:** record sleeves = hero. Every postage stamps ≠ book/skill shelf unless we **define stamps as flywheel branches** (A or B).

#### How to talk about chat + API (copy principle)

- **Not:** “Recoup for email” / six fake point products.  
- **Yes:** “A music AI **harness** — skills and API for your stack; chat when you want a hosted workspace; consulting when you want us in the room.”

Draft **Explore Recoup** links: research · install skills · chat (tertiary) · API · consulting · Records.

Full diagrams: `scratchpad.md` § Flywheel.

---

## 2. Decisions locked (Sid)

| Topic | Call |
|-------|------|
| Primary CTA | `/consulting` |
| `/advisory` | → `/consulting` (301) |
| Case studies | Anonymized until permission |
| Feature branch | Cherry-pick; **records not books** |
| HeroDemo | Not hero (broken prod); builder via shelf/arch |
| Process | Plan before code |
| Reference | [every.to](https://every.to/) |

---

## 3. Design forks

### 3A. Navigation

| Option | Header |
|--------|--------|
| A | Logo + Talk to us only |
| **B+ (default)** | Research · Consulting · [Talk to us] |
| C | Footer-only links |
| D | In-page anchors |

**B+ detail (LOCKED):** Research → **`https://research.recoupable.com`** (external); Consulting → `/consulting`; primary CTA `Talk to us` → `/consulting`. Footer: Platform, Docs/API, Skills/GitHub, Records, Company, Legal, **Sign in / Sign up**. No header auth. No AnnouncementBar.

### 3B. Hero — **unset** (depends on §1.1 flywheel)

| ID | Pattern | When |
|----|---------|------|
| **H-text** | Copy + CTAs only | Clearest consulting-first |
| **H-stamps** | 3–6 **flywheel** branches (A or B) — Every postage style | After lanes/surfaces defined |
| **H-universe** | Headline + “Explore Recoup” dropdown (Every menu) | Surfaces without faking point products |
| **H-records** | Interactive record/skill sleeves | **Mid-page builder proof** — not default hero |
| **H-split** | Copy + ResearchCard / architecture | |
| ~~H2~~ | ~~Record shelf as hero~~ | **Withdrawn** pending flywheel decision |

Capability pack table (for **C / C′ mid-page**, if used): diligence, operator, content, research, records → see `scratchpad.md`.

### 3C. Open source — default **OS-B**

Mid-page Build links (skills, API, GitHub); light install under shelf; full detail on `/platform`.

---

## 4. Section catalog — provisional votes

Legend: ✅ keep · ✏️ rewrite · ❌ cut · 🔀 merge

### Feature branch (`feat/agent-layer-positioning`)

| # | Section | Vote |
|---|---------|------|
| F1 | Hero + shelf | ✏️ → record shelf, new copy |
| F2 | Logos | ✅ |
| F3 | Problem / gap | ✅ |
| F4 | Pull quote | ✏️ anonymize |
| F5 | Architecture | ✅ |
| F6 | How it works 3-step | 🔀 merge or cut |
| F7 | Bento 6-pack | ✏️ → 3 work tiles |
| F8 | Proof / Records | ✅ + link `/records` |
| F9 | Home pricing 2-col | ❌ |
| F10 | Final CTA | ✏️ consulting + research |

### Production (`main`)

| # | Section | Vote |
|---|---------|------|
| M1 | Hero + HeroDemo | ❌ as hero |
| M2 | Text logos | 🔀 use F2 API logos |
| M3 | Research split + ResearchCard | ✅ (not hero) |
| M4 | Content split | ✏️ one tile or cut |
| M5 | Architecture | ✅ (one of F5/M5) |
| M6 | 3-col pricing | ❌ on home |
| M7 | Final CTA | ✏️ match F10 |

### Other pages

| # | Source | Vote |
|---|--------|------|
| P1 | `/consulting` | ✅ refresh + home band |
| P2 | `/records` | ✅ shelf + proof destination |
| P3 | `/advisory` | ❌ redirect |

---

## 5. Homepage storyboard v1.0 — LOCKED

```text
┌─────────────────────────────────────────────────────────┐
│  Logo          Research      Consulting      [Talk to us]│  ← B+ nav, no Explore menu
├─────────────────────────────────────────────────────────┤
│  HERO (H-text)                                          │
│    Eyebrow · H1 · Sub · [Talk to us] [Read our research] │
│  LOGOS (F2)                                            │
│  LANES — Research · Build · Partner (plain 3-col section)│  ← flywheel A as section
├─────────────────────────────────────────────────────────┤
│  RECENT RESEARCH — dated cards (3–4)                     │
│  PROBLEM — gap (F3)                                    │
│  RESEARCH RAILS — themed                               │
│  BUILD — Architecture + honest harness copy + OS-B links │
│  RECORD SHELF — interactive builder proof (C′, below fold)│  ← shelf lives here
│  WORK — 3 tiles (F7 ✏️)                                │
│  CONSULTING BAND                                       │
│  QUOTE (anon) + RECORDS PROOF (F8 → /records)          │
│  FINAL CTA — consulting + research                      │
└─────────────────────────────────────────────────────────┘
```

**Exclude:** HeroDemo as hero, interactive gimmick in hero, Explore menu in header, subscription CTAs, home pricing, Sign Up header, “Free skill packs” as identity, stamp/product grid, pretending chat/API are single-purpose Coras.

---

## 6. Copy stubs

### Hero — **LOCKED (option B, partner-first)**

- **Eyebrow:** Building the agentic music industry *(C's line kept as tagline)*  
- **H1:** Put AI to work inside your music business.  
- **Sub:** Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack.  
- **CTAs:** Talk to us (→ `/consulting`) · Read our research (→ `research.recoupable.com`)  
- **Rationale:** warm LinkedIn traffic needs clarity (what + who), not a cold-traffic tension hook. See scratchpad changelog.  
- **A/B test (later):** B vs D hero, measure `Talk to us` clicks.  

### Build / harness (honest chat + API)

- **Headline:** One harness, many workflows.  
- **Sub:** Chat is a hosted workspace. API and skills are how you embed music intelligence in Claude, Cursor, and your own tools.  
- **Not:** six separate product names implying one job each (unless we ship them later).  

### Consulting band — **LOCKED (D's tension lives here)**

- **Headline:** Most music teams are still *planning* their AI strategy. Start executing it.  
- **Sub:** Training and implementation from operators who build the tools — not slide decks. We work with labels, catalogs, and platforms in their own stack.  
- **CTA:** Talk to us → `/consulting`  
- **Note:** this is the home for the "stop planning / pattern-interrupt" energy (moved out of hero).  

### Pull quote (F4)

> “Catalog diligence is one of the biggest pain points I have. Cut it down to minutes and it changes how we buy.”  
> — Catalog fund operator  

### Proof (F8)

“We run our own labels” — fifth sleeve is **Recoup Records** (real roster).

### Three lanes (if standalone section needed)

| Lane | Headline | Line |
|------|----------|------|
| Research | What we’re learning in public | Essays from operator work |
| Build | What we ship in the open | Skills, plugins, API |
| Partner | When you need us in the room | Strategy, rollout, custom plugins |

*v0.2 merges lanes into rails + band — standalone block optional.*

---

## 7. Visual / design

- **Keep:** DESIGN.md — Geist Pixel, shadow-as-border, `useReveal`, dark arch band, achromatic chrome  
- **Change:** `Book` → `Record` (vinyl sleeve, label sticker, same motion)  
- **Every:** section rhythm (eyebrow, headline, card row, arrow) — not their typography  

---

## 8. Cherry-pick map (at implementation)

| Asset | Branch | Action |
|-------|--------|--------|
| Shelf + SKILL_PACKS + motion | feature | → `Record` |
| useReveal, layouts | feature | keep |
| ArchitectureDiagram | feature/main | one |
| ResearchCard, ContentGrid | main | if M3/M4 kept |
| HeroDemo | main | no hero; optional modal later |
| CUSTOMER_LOGOS + API | feature | keep |
| AnnouncementBar | feature | cut unless Sid wants |
| consulting page | either | refresh |
| lib/nav.ts | rewrite | B+ |

---

## 9. Spec locked checklist

- [x] Reference site reviewed ([Every](https://every.to/))  
- [x] Flywheel pattern — **A as a section** (lanes), shelf C′ mid-page  
- [x] Nav — **B+**, no Explore menu in header  
- [x] Hero — **H-text**  
- [x] Open source — **OS-B**  
- [x] Storyboard v1.0 approved (§5)  
- [x] §4 votes — **provisional set locked**  
- [x] Research link — **external `https://research.recoupable.com`** (Research nav + "Read our research" CTA)  
- [x] Sign In / Sign Up — **footer only**, not in header  
- [x] AnnouncementBar — **cut**  
- [x] Copy §6 — **hero (B) + consulting band (D) locked**  
- [ ] Research rail theme names finalized (§1 draft below → confirm)  

**Remaining to lock before code:** just the 4 research-rail theme names. Everything else is specced.

Rail draft to confirm/edit: **1) Catalog & diligence · 2) Labels & agents · 3) Platforms & distribution · 4) Building in public**

**Implementation note — stale routes:** `app/blog/page.tsx` and `app/resources/page.tsx` exist internally but research now lives at `research.recoupable.com`. Reconcile during build: redirect both → external (or repurpose). Don't expand scope (YAGNI).

---

## 10. Sid confirm template

```text
Flywheel visual: A (lane stamps) / B (surface stamps + universe menu) / C (capability mid-page) / C′ (record shelf mid-page)
Hero: H-text / H-stamps / H-universe / H-records (mid only) / other: ___
Nav: B+ / Explore menu in header? Y/N
OS: OS-B / other: ___
How to describe chat+API: ok with harness copy? ___
Rails: [theme names]
§4 changes: ___
```
