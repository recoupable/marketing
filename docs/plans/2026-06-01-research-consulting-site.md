# Marketing site — research + consulting repositioning

> **For agents:** Read `marketing/plan.md` first (collaborative spec). Read `scratchpad.md` for session state. **Do not implement** until `plan.md` §9 (Spec locked) is complete.  
> **Created:** 2026-06-01  
> **Goal:** Reposition recoupable.com as researchers, builders, and consultants for the agentic music industry — cherry-picking from `main` and `feat/agent-layer-positioning`, not merging either homepage as-is.

**Architecture:** Single Next.js app at `marketing/` root (workspace migration was reverted per `content/STATUS.md`). Copy lives in `lib/copy/` where possible; pages in `app/`. Vercel deploys from repo root on `main`.

**Tech stack:** Next.js 16, React 19, Tailwind, `lib/config.ts`, Plausible (do not remove).

---

## 0. Context summary

### Problem

| Surface | Message today | Buyer hears |
|---------|---------------|-------------|
| **Production (`main`)** | Music Intelligence + live Drake demo | Another AI music **product** / chat SaaS |
| **Local (`feat/agent-layer-positioning`)** | Free skill packs + install commands | Developer **tools** company / open-source SKU |
| **`positioning.md`** | "Run your entire music business with agents" | Platform competitor |

### Evidence (May 29, 2026 — three calls, same day)

All inbound via **LinkedIn** (building in public). All converged on **consulting / custom infrastructure**, not platform signup.

| Call | File | Buyer type | Key takeaway |
|------|------|------------|--------------|
| Catalog fund manager | `strategy/transcripts/may-2026-dealguy.md` | Fund + solo consultant | Wants staged diligence, rejects generic SaaS; Sid = consulting + tooling |
| LANDR | `strategy/transcripts/may-2026-landr.md` | Platform/partner | Needs agentic overlay + post-dist promotion; partnership not replacement |
| Seeker | `strategy/transcripts/may-2026-seeker.md` | Enterprise ($10k/mo) | Own plugins in Claude; Darren finance skills → org repo; next month engagement |

Supporting: `strategy/customers.md` (adoption gap, deal shapes), `scratchpad-2026-04-landing-audit.md` (UX/copy hygiene).

### Strategic outcome

Visitors should think: **"These people research AI in music and help serious operators implement it — I should talk to them."**  
Not: **"I should sign up for their app."**

---

## 1. Positioning (locked for plan)

Full copy in `content/brand/positioning-brief.md`.

**Spine:** Research how AI changes music businesses; partner to implement in **their** stack.

**Lanes:**

```text
Research  →  inbound (blog, LinkedIn mirror)
Build     →  credibility (open tools, API, plugins)
Partner   →  revenue (consulting, rollout, custom plugins)
```

**Primary CTA:** `/consulting` (Talk to us)  
**Secondary CTA:** Research/blog  
**Tertiary:** Docs / platform (demoted)

---

## 2. Information architecture

### Proposed sitemap (changes from today)

| Path | Action | Role |
|------|--------|------|
| `/` | **Rewrite** | Research + partner positioning |
| `/consulting` | **Elevate** | Primary commercial page (merge advisory copy if needed) |
| `/advisory` | **Redirect 301** → `/consulting` | Remove duplicate |
| `/blog` or `/resources` | Keep | "Research" nav target |
| `/platform` | **Demote** | Open tools — not hero story |
| `/pricing` | **Reframe or demote** | API/credits secondary; consulting = custom quote |
| `/developers` | Keep | Technical audience |
| `/company`, `/records` | Keep | Trust |

### Proposed header nav

```ts
// lib/nav.ts — target state
[
  { label: "Research", href: "/blog" },      // or /resources — pick one
  { label: "Partner", href: "/consulting" }, // or "Work"
  // Company link in footer only, or add if needed
]
```

Sign In / Sign Up: **demote or remove from header** for this positioning pass if they imply chat SaaS — confirm with Sid (open question).

### Homepage section order (target)

```text
1. Hero — positioning + primary CTA (consulting) + secondary (research)
2. Logos — social proof (keep from main)
3. Problem — labels/catalogs stuck in spreadsheets + generic AI
4. How we work — 3 lanes (Research / Build / Partner) — NOT 6 product SKUs
5. Proof — ONE block: demo OR case (not bento + use cases duplicate)
6. Selected work — 2–3 tiles (diligence, finance rollout, promotion) — optional anonymized
7. Pull quote — real buyer pain (catalog diligence); validate quote source
8. Final CTA — Talk to us + Read research
9. Footer — open tools links (skills, docs, API)
```

**Explicitly cut from feature branch homepage:** book-shelf skill packs hero, OPEN SOURCE announcement bar as lead, 2-card pricing as mid-funnel sales beat.

**Explicitly cut from main homepage:** Music Intelligence + HeroDemo as **entire** story (demo may return as one proof block only).

---

## 3. Cherry-pick matrix

| Asset | Source branch | Use? | Where |
|-------|---------------|------|-------|
| `HeroDemo` | `main` | **Maybe** | Proof section only — shows capability without "signup for platform" |
| Customer logo strip | both | **Yes** | Below hero |
| `AnnouncementBar` | feature | **No** (lead) | Footer or `/platform` only if open-source secondary |
| Book-shelf hero | feature | **No** | Conflicts with consulting-first |
| Bento visual components | feature | **Adapt** | 3 "work" tiles (diligence, ops, content) — not 6 skills |
| `app/consulting/page.tsx` | both (similar) | **Yes** | Primary commercial — refresh copy from brief |
| `lib/customerLogos.ts` + API route | feature | **Yes** | Keep infrastructure |
| Nav Research/Skills/API/Services | feature | **Partial** | Research yes; Skills/API → footer |
| Nav Pricing/Advisory/Blog | main | **Partial** | Blog yes; pricing demoted |
| Pull quote + Problem sections | feature | **Yes** | After rewrite for new spine |
| Proof / mission (own labels) | feature | **Adapt** | "We run experiments on our own roster" — supporting, not lead |
| `lib/copy/` registry | main | **Extend** | Single source for human + machine views |

---

## 4. Implementation phases

### Phase 0 — Docs & branch (no UI) — ~1 session

**Files:**
- Create: `content/brand/positioning-brief.md` ✅
- Create: `docs/plans/2026-06-01-research-consulting-site.md` ✅
- Create: `scratchpad.md` ✅
- Archive: `scratchpad-2026-04-landing-audit.md` ✅
- Update: `content/STATUS.md` — focus = repositioning; link to plan
- Update: `content/brand/positioning.md` — align with brief OR add banner "superseded by positioning-brief.md"

**Git:**
```bash
cd marketing
git checkout main
git pull origin main
git checkout -b feat/research-consulting-site
```

**Acceptance:** Plan + brief readable; scratchpad open questions listed.

---

### Phase 1 — Copy & nav skeleton — ~1 session

**Do not redesign visuals yet.** Wire truth in copy registry first.

**Files:**
- Modify: `lib/nav.ts` — new nav per §2
- Modify: `lib/copy/home.ts` (or equivalent) — hero, problem, three lanes, CTAs
- Modify: `content/brand/positioning.md` — sync with brief
- Add: `app/advisory/route.ts` or `next.config` redirect → `/consulting`

**Draft hero copy (starting point — edit with Sid):**

- **Eyebrow:** Research & implementation
- **H1:** Building the agentic music industry.
- **Sub:** We publish what we learn working with labels and catalogs. We partner with teams to implement AI in Claude and their stack — not another platform to migrate to.
- **Primary button:** Talk to us → `/consulting`
- **Secondary:** Read our research → `/blog`

**Acceptance:** `pnpm build` passes; nav reflects new IA; no book-shelf or Music Intelligence strings in `lib/copy`.

---

### Phase 2 — Homepage restructure — ~2 sessions

**Files:**
- Modify: `app/page.tsx` — section order per §2; remove duplicate pillars/pricing/use-cases
- Cherry-pick: logo section from `main` or feature
- Optional: extract bento cards → `components/home/WorkTile.tsx` (3 tiles max)
- Modify: `components/layout/Header.tsx` — CTA buttons per open questions
- Modify: `components/layout/Footer.tsx` — open tools links

**From `main` (if approved):**
- Port `HeroDemo` into collapsible or below-fold "See it work" — label as research demo, not product signup

**Acceptance:**
- One primary CTA throughout
- No section repeats same three offers
- Lighthouse: no new hydration errors (fix dev overlay issue if still present)
- `pnpm build` + `pnpm lint`

---

### Phase 3 — Consulting page pass — ~1 session

**Files:**
- Modify: `app/consulting/page.tsx` — align with Seeker/dealguy language: org skills, diligence, finance workflows, 3–6 month engagements
- Add offerings row: Strategy · Implementation · Rollout (map to real deal shapes in `customers.md`)

**Acceptance:** Page stands alone as landing page for LinkedIn inbound; metadata title/description updated.

---

### Phase 4 — Demote platform/pricing — ~0.5 session

**Files:**
- Modify: `app/platform/page.tsx` intro — "open tools from our lab"
- Modify: `app/pricing/page.tsx` — frame API as builder path; link to consulting for enterprise
- Modify: `lib/nav.ts` footerNav — Skills/Docs/API

**Acceptance:** No conflicting "main product is signup" message on `/platform` or `/pricing`.

---

### Phase 5 — STATUS, SEO, machine view — ~0.5 session

**Files:**
- Update: `content/STATUS.md`
- Modify: `lib/seo.ts` / page metadata for `/`
- Verify: machine-readable copy path still syncs (`lib/copy/`)

**Acceptance:** Homepage meta 50–60 char title reflects new positioning; `content/STATUS.md` updated.

---

### Phase 6 — PR & deploy — ~0.5 session

**Target:** PR to `marketing` **`main`** (per `marketing/AGENTS.md` — PRs target main, not mono `test`).

**Checklist:**
- [ ] `pnpm build` / `pnpm lint`
- [ ] Visual check: light + dark mode
- [ ] Compare local vs acceptance criteria in §5
- [ ] Do **not** merge old `feat/agent-layer-positioning` wholesale — close or cherry-pick commits as needed
- [ ] Update mono submodule pointer in monorepo after marketing PR merges

---

## 5. Acceptance criteria (definition of done)

1. **Positioning:** First-time visitor describes Recoup as research/consulting for music operators, not app signup.
2. **CTA:** Primary button goes to `/consulting` (or mailto/cal — confirm).
3. **No SaaS signals:** Hero is not Music Intelligence, not skill-packs bookshelf, not Drake demo as full-page story.
4. **No duplicate funnels:** Skills/API/services appear once (footer or single "Build" section).
5. **Evidence-backed copy:** At least one diligence/catalog line and one "own your stack" line on homepage or consulting.
6. **Docs:** `positioning-brief.md` + `scratchpad.md` + this plan still accurate post-ship.
7. **Build:** Production build green.

---

## 6. Out of scope (this project)

- Rewriting entire blog or adding new posts
- New case study PDFs or named logos without legal approval
- Changing chat app onboarding
- API/docs content overhaul
- Merging `feat/agent-layer-positioning` branch automatically
- Monorepo `PROGRESS.md` only — update when work completes

---

## 7. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Conflicts with investor deck (platform narrative) | Brief notes dual story: public site = consulting inbound; deck may differ — flag to Sid |
| Seeker/Rostrum named without approval | Anonymize until approved |
| Removing Sign Up hurts B2C | Keep footer link to chat; measure later |
| HeroDemo implies old product | Frame as "research demo"; optional |
| Two branches diverge further | New branch from `main`; cherry-pick with explicit matrix §3 |

---

## 8. Future agent checklist

When resuming work:

1. Read `marketing/scratchpad.md` (open questions).
2. Read `content/brand/positioning-brief.md`.
3. Read this plan — note current phase in scratchpad.
4. `git -C marketing branch --show-current` should be `feat/research-consulting-site` during implementation.
5. Do not execute Phase 2+ until scratchpad open questions checked off.

---

## 9. Reference — commit / branch commands

```bash
# See what's on each branch (homepage hero strings)
cd marketing
git show main:app/page.tsx | head -n 150
git show feat/agent-layer-positioning:app/page.tsx | head -n 150

# Cherry-pick a specific file from feature branch
git checkout feat/agent-layer-positioning -- components/layout/AnnouncementBar.tsx

# Dev server
pnpm dev   # usually :3000 or :3001
```

---

## 10. Mono repo note

Submodule `marketing` on monorepo `main` may still point at old SHA. After marketing PR merges, bump pointer in mono + `PROGRESS.md` entry.
