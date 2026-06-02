# User Journey Investigation — recoupable.com (v1 research+consulting site)

**Date:** 2026-06-01
**Method:** Five agents each role-played a prospective customer and walked the homepage section-by-section (Hero → Logos → Lanes → Research → Problem → Build → Open-tools shelf → Consulting → Pull quote → Proof → Final CTA), following the CTAs they'd realistically click and auditing every link. Three personas are grounded in real strategy transcripts (`strategy/transcripts/`); two cover warm non-technical traffic and skeptical cold traffic.
**Per-persona detail:** `docs/userjourney/*.md`. **Live link checks:** `docs/userjourney/_link-verification.md`.

---

## ✅ Fixes applied (2026-06-01, `feat/research-consulting-site`)

All P0, plus the structural P1 work and the P2 trust page. Build green.

| # | Fix | Files |
|---|---|---|
| P0.1 | Open-tools shelf now maps to **real** skill folders (`music-industry-research`, `chart-metric`, `content-creation`, `release-management`, `streaming-growth`); one working install `npx skills add recoupable/skills`; each card deep-links to its GitHub folder + "Browse all skills" | `app/page.tsx`, `lib/copy/company.ts` |
| P0.2 | `/company/recoup-records` rebuilt into a real dogfooding proof page (what runs on it, each tied to a real skill — no fabricated metrics); `/records` 301→`/company/recoup-records` | `app/company/recoup-records/page.tsx`, `lib/copy/company.ts`, `next.config.ts`, deleted `app/records/page.tsx` |
| P0.3 | X handle `recaboreal`→`recoupable` | `lib/config.ts` |
| P0.4 | Ownership + no-train stated in hero + `/consulting` FAQ; killed "Every engagement sharpens the open skills we ship" | `app/page.tsx`, `app/consulting/page.tsx` |
| P1.5 | Platform + Pricing promoted into header; Build §6 got docs + partnerships CTAs and a plain-English MCP line | `lib/nav.ts`, `app/page.tsx` |
| P1.6 | Pull quote wired to `/audit` | `app/page.tsx` |
| P1.7 | No-code on-ramp (Chat / "we'll set them up for you") added so non-technical buyers aren't bounced by `npx` | `app/page.tsx` |
| P1.8 | New `/partners` page (embed/OEM, API+MCP, co-built, usage/rev-share, who-pays-for-tokens); `/platform` CTA → `/partners` instead of chat app; footer Partners link | `app/partners/page.tsx`, `lib/copy/platform.ts`, `components/layout/Footer.tsx` |
| P2.10 | New `/trust` governance page (own-it, no-train, org-owned repos, scoped/revocable access, offboarding); footer link; linked from shelf copy | `app/trust/page.tsx`, `components/layout/Footer.tsx`, `app/page.tsx` |

**Not done (needs real assets, not code):** attributed testimonial to replace the anonymous catalog-fund quote (P2.9 — won't fabricate); catalog/royalty demo outputs (P2.9); linking customer logos (no per-logo URLs); broader content-route consolidation `/learn`÷`/resources`÷`/results`÷`/playbook`÷`/blog` and `/platform`÷`/solutions` (P2.11 — left to avoid breaking inbound links).

---

## Verdict scoreboard

| Persona | Grounded in | Convert? | Stays / bounces |
|---|---|---|---|
| Catalog fund diligence buyer | `may-2026-dealguy` | **3/10** | Reads value, bounces — no way to try or own the tool |
| Rights-company owner (org-owned skills) | `may-2026-seeker` | **4/10** | Intrigued, not closed — ownership/no-training never stated |
| Distribution / creator-tools platform lead | `may-2026-landr` | **6/10** | Vocabulary fits, but no platform/partnership path |
| Non-technical label GM / operator | warm traffic | **6/10** | Nearly lost mid-page; `/consulting` rescues it |
| Skeptical cold visitor + link/IA audit | cold traffic | **6/10** | Label/consulting buyers stay; product/dev/diligence bounce |

**Pattern:** the **consulting buyer** (label/operator who wants a person in the room) converts. The **highest-value self-identifying buyers** — catalog funds and rights owners, the exact people quoted on the page — score lowest because the page raises their pain, then gives them nowhere to go and never addresses ownership/data.

---

## The 7 cross-cutting findings (ranked by impact)

### 1. The site preaches "tools in the open" — but you can't touch a single tool. *(all 5 personas)*
The "Build" pillar is one of three core promises, yet every tool on the page is a dead-end:
- The **open-tools shelf** install commands (`npx skills add recoupable/diligence|ar|content|operator|fan`) are **plain non-clickable text** *and* **all five 404** (verified live — the real repo is `recoupable/skills`, and those pack names don't exist). A developer or technical operator who copy-pastes any command hits a wall on first contact.
- The **Build §6** chips (Claude/Cursor/API/MCP/Chat) and `ArchitectureDiagram` have **no CTA** — beautiful dead-end.
- The **customer logos** are unlinked.

This is the single biggest credibility leak: the page's best "show, don't tell" proof can't be acted on or verified. **Fix is mostly free** (see P0).

### 2. Every road leads to `/consulting`; there is no self-serve or per-audience path. *(catalog buyer, platform, cold visitor)*
Five CTAs ("Talk to us" ×3, both hero/final) all collapse into a single $500, 1:1 page. There's no "try it on a sample," no product trial, and **the highest-intent journeys have no destination**: the lead pull quote is about catalog diligence, but `/audit` and `/calculator` exist and aren't linked anywhere, and the "Agentic Diligence" pack (the LinkedIn "catalog plugin" people came for) has no detail page.

### 3. Ownership + "we don't train on your data" is never said — and one line actively scares IP-sensitive buyers. *(rights owner, catalog buyer)*
For catalog funds and rights owners, *who owns it* and *is my proprietary data safe* is the **whole decision** (explicit in both transcripts). The page never says "you own it" or "we never train on your data," has no governance/trust page, and the shelf line **"Every engagement sharpens the open skills we ship"** reads like *my paid, proprietary work feeds your public packs.* The Problem section even raises "royalty data" access without ever reassuring on it.

### 4. A jargon wall in the middle splits the audience. *(label GM, catalog buyer)*
Build §6 + the shelf lean on `harness`, `MCP`, `CLI`, `Cursor`, `npx`, "in your stack," "dogfood." This delights the platform/dev persona and alienates the non-technical label GM and the one-week-into-Claude catalog buyer. The page tries to serve both in one column and loses the non-technical half. Lead with **outcomes** ("12 ready-to-post assets in 2m 14s"); route the dev material to a clearly-labeled "For developers" lane.

### 5. "Platforms" is in the copy but has no path. *(platform partner)*
The hero names "labels, catalogs, **and platforms**," but a platform evaluating an *integration/partnership* finds: `/platform` is thin infra prose whose CTA dumps them into the **consumer chat app**, `/consulting` "Who This Is For" omits platforms, and there's no partner/embed/rev-share/token-economics story or "who pays for tokens" answer.

### 6. Proof is thin, anonymous, and mismatched to the buyers. *(all)*
The "Catalog fund operator" pull quote is word-for-word the dealguy's pain — but **anonymous with no proof behind it**. The demos are **artist-content** (Billie Eilish content batches, Gatsby Grace follower growth), not the **income / top-tracks / vintage / royalty** proof the catalog & rights buyers need. And the "Proof — We run our own labels" CTA lands on `/company/recoup-records`, a **3-sentence stub** that *says* "real proof" and shows none.

### 7. IA sprawl, footer-only info scent, and duplicate routes. *(cold visitor, platform)*
Header is Research/Consulting/Talk-to-us only — **Platform, Developers, and Pricing are footer-only**, so product/dev/self-serve visitors must scroll the entire page. No broken *internal* routes, but orphan/duplicate routes to consolidate: `/records` vs `/company/recoup-records`, `/audit` vs `/calculator`, `/platform` vs `/solutions`, and a `/learn` / `/resources` / `/results` / `/playbook` / `/blog` content sprawl.

---

## Verified bugs (live-checked, not opinion)

| Bug | Evidence | Where |
|---|---|---|
| **All 5 shelf install commands 404** | `recoupable/diligence,ar,content,operator,fan` → 404; only `recoupable/skills` → 200 | `app/page.tsx` §7 `SKILL_PACKS` |
| **Proof page is an empty stub** | `app/company/recoup-records/page.tsx` = 43 lines, no artifacts | Proof §10 CTA target |
| **Duplicate orphan route** | `app/records/page.tsx` = 22 lines, literally "Coming soon." | vs `/company/recoup-records` |
| **X/Twitter handle typo** | config = `x.com/recaboreal` (IG/LI/YT all `recoupable`) | `lib/config.ts:26` (footer social) |
| External domains OK | research./chat./developers.recoupable.com all 200 | — |
| No broken internal routes | every internal `href` resolves to a real route | — |

---

## Prioritized fix backlog

### P0 — credibility blockers, cheap, do first
1. **Make the open-tools shelf real.** Point installs at the real repo (`npx skills add recoupable/skills`) or to real skill names (e.g. Diligence→`music-industry-research`, A&R→`chart-metric`/`streaming-growth`, Content→`content-creation`/`short-video`, Operator→`release-management`/`artist-workspace`, Fan→`streaming-growth`); verify each command before shipping; make each card click through to GitHub / a "browse skills" page. *(`app/page.tsx` §7)*
2. **Fill or remove the proof page.** Put real Recoup Records / Gatsby Grace artifacts on `/company/recoup-records`; delete or 301 `/records`. *(`app/company/recoup-records/page.tsx`, `app/records/page.tsx`)*
3. **Fix the X handle** `recaboreal` → `recoupable`. *(`lib/config.ts`)*
4. **State ownership + no-training** in the hero and on `/consulting`; **kill or qualify** "Every engagement sharpens the open skills we ship." *(`app/page.tsx` hero/§7, `app/consulting/page.tsx`)*

### P1 — structural conversion
5. **Promote Platform + Pricing into the header**; give Build §6 a CTA (docs / "Talk to partnerships") and one plain-English line explaining MCP. *(`lib/nav.ts`, `app/page.tsx` §6)*
6. **Wire the diligence/audit journey** from the pull quote and Lanes to a real `/audit` (or `/calculator`) landing with a sample income-summary output. *(`app/page.tsx` §3/§9, `/audit`)*
7. **De-jargon the buyer path; lead with outcomes**; split an explicit "For developers" lane so non-technical buyers aren't bounced by `npx`/CLI. *(`app/page.tsx` §6/§7)*
8. **Ship a "For platforms / Partners" path** — nav + page covering embed/OEM, rev-share/usage pricing, the agent-discovery funnel, and "who pays for tokens"; route the "Partner" lane and "build it in your stack" CTA there; fix `/platform`'s chat-app CTA. *(new page, `app/platform/page.tsx`, `app/page.tsx`)*

### P2 — trust & positioning polish
9. Replace the anonymous quote with **attributed proof**; link the logos; add **catalog/royalty demos** (not just artist content) for the high-value buyers.
10. Add a **Governance/Trust page** (data handling, no-train guarantee, org-owned repos, employee-offboarding ownership) linked in footer. *(rights-owner ask)*
11. **Consolidate route sprawl:** `/platform` vs `/solutions`, and `/learn` / `/resources` / `/results` / `/playbook` / `/blog`.

---

## Per-persona summaries

- **Catalog fund diligence buyer (3/10)** — `docs/userjourney/catalog-fund-buyer.md`. The thing she came for (Agentic Diligence) is an un-clickable, broken command; "See the tools" → `/platform` pushes the hosted SaaS she's skeptical of; no ownership/no-training reassurance; demos are artist content, not income. Wants: a real diligence page with sample output + a no-terminal install path.
- **Rights-company owner (4/10)** — `docs/userjourney/rights-owner-skills.md`. Infra language is dead-on, but no "you own it / we don't train on your data," no governance page, and "engagements sharpen our open skills" reads like IP leakage. Wants: fenced **private** org-owned skill repos + a trust page.
- **Platform / creator-tools lead (6/10)** — `docs/userjourney/platform-partner.md`. Best vocabulary fit of any music-AI site, but built for labels buying advisory, not platforms negotiating an integration. Wants: a real partners path + token/rev-share economics.
- **Label GM / operator (6/10)** — `docs/userjourney/label-gm.md`. Build section nearly bounces a non-technical buyer; `/consulting` ("Do I need technical expertise? No.", "$500", "Who This Is For: Labels") rescues it. Wants: a filled proof page + no-code on-ramp for the packs.
- **Cold visitor + link audit (6/10)** — `docs/userjourney/cold-visitor-linkaudit.md`. 5-second test marginal pass (what/who clear; trust weak). Full link table inside; biggest issues are dead-end shelf/Build/logos, the `/platform` anchor↔content mismatch, footer-only info scent, and duplicate routes.

---

## One-line takeaway
The repositioning **lands** ("research lab + implementation partner for the agentic music industry" is legible and distinctive), but the page **raises high-value buyers' pain and then strands them**: the open tools are broken/dead-ends, every path funnels to one consulting page, ownership/data fears go unanswered, and the proof is thin. Fix the four P0 bugs this week; the P1 structural work is what turns the catalog/rights/platform buyers from "intrigued" into leads.
