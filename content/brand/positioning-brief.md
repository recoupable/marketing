# Positioning brief — research, build, partner

> **Created:** 2026-06-01  
> **Status:** draft — approved for planning; update `positioning.md` when site copy ships  
> **Evidence:** `strategy/transcripts/may-2026-dealguy.md`, `may-2026-landr.md`, `may-2026-seeker.md`; `strategy/customers.md`; Sid/Sweets Apr 10 transcript  

---

## Why this exists

`content/brand/positioning.md` (Mar 2026) still says **"platform that enables autonomous music businesses."** Discovery calls and revenue (May 2026) show buyers want **consulting + custom AI infrastructure**, inbound from **LinkedIn learnings**, and reject generic SaaS / vendor tools that train on their data.

---

## One-sentence spine (external)

**We research how AI is changing music businesses — and we help labels, catalogs, and operators implement it inside their own stack.**

---

## What we are

| Lane | What it means | How we monetize | Proof |
|------|----------------|-----------------|-------|
| **Research** | Public learnings from building in the trenches (LinkedIn, blog) | Inbound trust | Posts, essays, demos of experiments |
| **Build** | Open skills, plugins, API — generalized tooling | Credits/API; credibility | GitHub, docs, catalog plugin, etc. |
| **Partner** | Strategy + rollout: org skills/plugins, workflows, governance | **Consulting** (primary) | Seeker finance rollout, fund diligence, custom plugins |

We are a **lab + implementation partner**, not a competing end-user SaaS.

---

## Who it's for (priority)

1. **Catalog funds / acquirers / diligence** — data rooms, stage-1 screening, proprietary curves, seller chaos (dealguy call).
2. **Labels & catalog companies** — org-wide Claude adoption, finance/royalty workflows, own the IP (Seeker pattern).
3. **Platforms & distributors** — agentic overlay, post-release guidance, internal AI (LANDR pattern) — **partnership**, not displacement.

Secondary: solo analysts/consultants who want tailored infrastructure (referral network).

**Deprioritize on homepage:** aspirational bedroom producers, "replace your team" artist pitch.

---

## What we are NOT (say explicitly on site)

- Not another **music SaaS** competing with LANDR, distributors, or label software.
- Not **"sign up and we run your business"** — web app is deprioritized vs agents in Claude/Cowork.
- Not a **vendor data platform** that trains on your statements (Seeker rejected Balthazar-style pitches).
- Not **one-shot magic** — staged workflows, human review, feedback loops (dealguy, LANDR).

---

## Buyer language to reuse (from transcripts)

**Catalog / fund (dealguy):**
- "Nothing's quick" in traditional valuation; seller data is messy.
- Wants tools for **data aggregation**, not replacing judgment.
- Rejects SaaS that outputs wrong format; wants **tailored infrastructure**.
- Sid on call: "Mostly a **Consulting** company… services… **AI strategy and build out their tooling**."

**LANDR:**
- "Agentic overlay" to navigate broad product; **post-distribution promotion** gap.
- Trust fragile — AI slop, wrong expectations.
- Artists need **easing in**; world-building > generic output.

**Seeker (Evan):**
- "**Own it or plugins in Claude**" — won't license others' trained tools.
- Finance (Darren) building prompts → needs **org-wide Seeker skills repo**.
- Next engagement: package Darren's workflows into **Seeker finance plugin**, ~1 month.
- "**Heartbeats/Iris**" = source of truth; skills call APIs, not duplicate web UIs for everything.

**Strategy / customers.md (supporting):**
- Adoption gap: Sid manual → great; product alone → mediocre → **consulting is the delivery model today**.
- Seeker deal shape: $5k infrastructure + $5k strategy/build per month.
- Rostrum: enterprise support hours + custom builds; agency replacement narrative.

---

## Messaging hierarchy (homepage)

1. **Headline:** Research + implementation for the agentic music industry (plain language).
2. **Subhead:** We publish what we learn building for labels and catalogs; we partner with teams to implement it in Claude and their stack.
3. **Proof:** One strong demo or case (not three repeating stats).
4. **CTA primary:** Talk to us (`/consulting`).
5. **CTA secondary:** Read research (`/blog` or `/resources`).
6. **CTA tertiary:** Explore open tools (`/platform`, docs) — footer or lower fold.

---

## Nav (proposed)

| Label | Href | Notes |
|-------|------|-------|
| Research | `/blog` or `/resources` | Align with LinkedIn funnel |
| Work | `/consulting` or new `/work` | Case studies + offerings |
| Company | `/company` | Optional |

Remove or demote: **Skills**, **API** as top-level nav items (move to footer / developers).

Merge: `/advisory` → `/consulting` (301).

---

## Copy rules (from archived landing audit)

Keep enforcing:

- No stat repeated 3× (e.g. Fat Beats 22 videos).
- No duplicate "three ways in" (pillars + pricing).
- Replace jargon: sacred rules, 80% pass, "ship," vague "Drive."
- One CTA lane: don't show install command + "Get started" → different destinations without hierarchy.
- Testimonials: no hedge-only quotes ("if we can… five minutes") unless labeled prospect voice.

---

## Competitive framing (for enterprise reader)

- **Acquire-friendly:** We help you build **your** tooling and IP; we're not asking you to migrate to our platform.
- **Consult-for-build:** Labels/catalogs hire us to design agentic ops while their team keeps building internally.
- **Open source:** Proof of capability, not the enterprise SKU.

---

## Files to update when executing

- `content/brand/positioning.md` — replace platform-first copy with this brief.
- `content/STATUS.md` — focus + don't touch during repositioning.
- `lib/nav.ts`, `lib/copy/*`, `app/page.tsx`, `app/consulting/page.tsx`
- `content/brand/voice.md` — add "consulting partner" tone examples.

---

## Related transcripts (full paths)

```
strategy/transcripts/may-2026-dealguy.md
strategy/transcripts/may-2026-landr.md
strategy/transcripts/may-2026-seeker.md
strategy/transcripts/sid-sweets-2026-04-10.md   # tooling vs platform, Cowork
strategy/customers.md
```
