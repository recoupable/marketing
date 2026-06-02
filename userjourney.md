# User Journey Investigation v3 — recoupable.com (full-site re-audit)

**Date:** 2026-06-02
**Method:** Five persona **subagents**, each instructed to traverse the **entire live site** (not just the homepage) against the local dev server, read both rendered HTML (`curl localhost:3000`) and source copy (`lib/copy/*.ts`, `app/**/page.tsx`), verify every internal link's status code, and judge whether the post-deletion/rewrite round actually improved their experience vs. their v2 score. Three personas are grounded in real strategy transcripts (`strategy/transcripts/`); one is warm non-technical traffic; one is a skeptical cold visitor doing a full link/IA audit.
**Per-persona detail (v3):** `docs/userjourney/v3/*.md`. **v2:** `docs/userjourney/v2/*.md`. **v1:** `docs/userjourney/*.md`.
**Live re-check:** all 15 live pages return 200; all legacy routes (`/advisory`, `/solutions`, `/results`, `/resources`, `/calculator`, `/playbook`, `/learn`, `/records`, + `/book` variants) return single-hop **308** to sensible targets; all 5 external surfaces (`research.` / `chat.` / `developers.recoupable.com`, `github.com/recoupable/skills`, `x.com/recoupable`) return 200. Cold-visitor link audit: **41 links checked, 4 problems, zero 404s, zero redirect chains.**

---

## Scoreboard — v1 → v2 → v3

| Persona | Grounded in | v1 | v2 | v3 | Δ v2→v3 | Now |
|---|---|---|---|---|---|---|
| Catalog fund diligence buyer | `may-2026-dealguy` | 3 | 5 | **6** | +1 | Copy now names diligence; still **nothing to see** + the §9 hook still dead-ends in a quiz |
| Rights-company owner | `may-2026-seeker` | 4 | 8 | **9** | +1 | `/trust` closes the entire decision; only discoverability keeps it off 10 |
| Distribution / platform lead | `may-2026-landr` | 6 | 8 | **8** | 0 | `/partners` is good + now reachable via `/platform`; all 3 v2 blockers untouched |
| Non-technical label GM | warm traffic | 6 | 8 | **9** | +1 | Rewritten `/consulting` + `/pricing` + proof page remove every fear; homepage still engineer-y |
| Skeptical cold visitor + link audit | cold traffic | 6 | 7.5 | **8.5** | +1 | Route sprawl / stub / orphans genuinely fixed; blog titles still doubled, logos still unlinked |

**Average 7.3 → 8.1 (+0.8).** Four of five personas improved; the platform lead held flat because his three blockers all live on the one file this round deliberately didn't touch (the homepage). The big story: **this round's value was almost entirely on the destination pages and IA cleanup, not the homepage** — which is exactly why the homepage-bound complaints (platform lane, hero trust line, §9 quote) all persist.

---

## What this round accomplished (mapped to who it moved)

| Change shipped (this round) | Who it moved | Evidence |
|---|---|---|
| `/consulting` rebuilt — personal creds gone ("Platinum"/"$2.5M"/"Beyoncé"/"patent"), now names diligence + royalty intelligence, "Labels first", "$500, no pitch deck", "no terminal" | **Label GM +1**, catalog buyer | `app/consulting/page.tsx:31,33,45,122-130,243` |
| `/trust` is now essentially written for the IP buyer (org-owned private repos, scoped/revocable, offboarding, no-train) | **Rights owner +1** | `app/trust/page.tsx` |
| `/pricing`, `/developers`, `/company/*` rewritten to "research lab + implementation partner" / "music layer for agents" | label GM, rights owner | `lib/copy/pricing.ts`, `app/developers/page.tsx`, `app/company/*` |
| `/platform` CTA → `/partners` ("Talk to partnerships") | **Platform lead** (path now reachable) | `app/platform/page.tsx:121` |
| Site-wide low-contrast body-text bug fixed (pages were near-unreadable) | **Label GM**, all | `--foreground` ~20:1, muted ~5:1 AA verified |
| 11 off-brand orphan pages deleted + 308-redirected; `/resources` "Coming soon" stub gone; sitemap cleaned to 27 live URLs | **Cold visitor +1** | `next.config.ts`, `app/sitemap.ts` |
| Static-page doubled-title bug fixed (was "… \| Recoup \| Recoup") | cold visitor | confirmed single-suffix on `/consulting` etc. |
| Blog CTA de-crufted (removed "10+ platinum records" + dead "Free playbook" + `/advisory` link) | label GM, cold visitor | `components/blog/BlogCTA.tsx` |

---

## Remaining findings (ranked by impact)

### 1. Still nothing to *see* for the highest-value buyer. *(catalog buyer — unchanged)*
No sample diligence/income output exists anywhere — no income summary, top tracks, vintage, or royalty trend, not on `/consulting`, `/audit`, or `/company/recoup-records` (whose dogfood proof is release/content, not diligence). The copy now *says* "diligence" twice, but a diligence buyer scores on proof, not adjectives. This single gap is why he sits at 6 while everyone else is 8.5–9.

### 2. The §9 pull-quote → `/audit` bait-and-switch is intact. *(catalog buyer — verified, unchanged)*
The homepage's catalog-diligence testimonial still has CTA "See what an AI readiness audit surfaces" → `/audit` (`app/page.tsx:530`), which is still a **marketing-ops** quiz whose only catalog option is "Catalog marketing (back catalog)" (`lib/copy/audit.ts:82`) — the opposite of acquisition diligence. Raising his exact pain and routing him somewhere unrelated is worse than a dead-end.

### 3. NEW — the "agentic catalog diligence" skill the LinkedIn hook advertised isn't on the shelf. *(catalog buyer)*
The five open-tools packs (`app/page.tsx:34-70`) are Research / ChartMetrics / Content / Release / Growth — **no catalog/diligence/valuation skill**. The buyer literally can't find or `npx skills add` the thing the post advertised; `/diligence`, `/catalog`, `/catalog-diligence` all 404. The acquisition hook and the product shelf are out of sync.

### 4. The homepage Partner lane still funnels platforms into `/consulting`. *(platform lead — verified, unchanged)*
`app/page.tsx` `LANES` Partner card → `href:"/consulting"` (rendered homepage: 8× `/consulting` vs 2× `/partners`). The most intuitively-labeled door sends a DSP into advisory that doesn't even list platforms, while the purpose-built `/partners` sits a scroll/footer-click away. Highest-leverage one-line fix; every platform pass has named it.

### 5. `/trust` is invisible in the nav; the decisive hero trust line is tiny + unlinked. *(rights owner, catalog buyer — unchanged)*
`/trust` — the page that closes the IP-sensitive *and* the licensed-fund buyer — is footer-only (`lib/nav.ts` = Research/Platform/Pricing/Consulting; `Footer.tsx:33`). On the homepage the ownership line is still `text-[12px]/40%` and unlinked (`app/page.tsx:242-244`). (Note: `/consulting` and the homepage shelf *do* link to `/trust` — `consulting/page.tsx:122`, `app/page.tsx:412` — so it's discoverable mid-funnel, just not where these buyers first look.)

### 6. NEW — blog post `<title>` tags still double the brand. *(cold visitor — verified)*
`/blog/ai-music-marketing` renders `… | Recoup | Recoup`; other posts render `… | Recoupable | Recoup` (also a Recoup/Recoupable inconsistency). The static-page title bug was fixed last round, but **blog posts use a different path** (`buildPostMetadata` returns frontmatter `seo.title` — which already ends in a brand suffix — and the layout template `"%s | Recoup"` appends a second one). The fix from last round didn't reach the content surface.

### 7. NEW — `/pricing` hides the one number a GM came for. *(label GM)*
`/consulting` states "Sessions start at **$500**" (`consulting/page.tsx:243`), but the matching `/pricing` tier (Implementation) shows only "Custom / Talk to us" (`lib/copy/pricing.ts:77-90`). The page a buyer checks *for price* withholds the anchor the consulting page already gives — an avoidable inconsistency.

### 8. `/partners` commercials are still 100% qualitative. *(platform lead — unchanged)*
`/partners` answers 5 of 6 deal questions (embed/OEM vs API vs co-built, who-pays-for-tokens, no-training, agent discovery, who keeps the customer) but has **zero numbers** — no rev-share %, per-run, or per-seat — so a platform can't size a deal without a call.

### 9. NEW — `/company` is a soft-orphan; `/audit` is missing from the sitemap. *(cold visitor)*
After IA consolidation, `/company` is reachable only via its children's back-links (not in header/footer/homepage). `/audit` is live with one fragile inbound link and is omitted from `sitemap.ts`. Customer logos remain unlinked (v2 #4, untouched) — a skeptic still can't click Atlantic/Warner to verify.

---

## Verified bugs / mismatches (live-checked, not opinion)

| Item | Status | Evidence |
|---|---|---|
| 11 off-brand orphan routes | ✅ **Fixed** | all 308 single-hop → live targets (`/solutions→/platform`, `/results→/company/recoup-records`, `/resources→/developers`, …) |
| `/resources` "Coming soon" stub | ✅ **Fixed** | page deleted; route 308 → `/developers` |
| Static-page doubled `<title>` | ✅ **Fixed** | `/consulting` = "… \| Recoup" (single) |
| Sitemap advertised redirected URLs | ✅ **Fixed** | 27 URLs, all 200; adds `/consulting /pricing /partners /trust` |
| Low-contrast body text | ✅ **Fixed** | `--muted-foreground` ~5:1 AA verified |
| **Blog post `<title>` doubling** | ⚠️ **Open (NEW, verified)** | `/blog/ai-music-marketing` = "… \| Recoup \| Recoup"; `buildPostMetadata` + layout template stack |
| **Recoup vs Recoupable** in blog titles | ⚠️ **Open (NEW)** | some posts say "Recoupable", template says "Recoup" |
| **§9 pull-quote → `/audit` content mismatch** | ⚠️ **Open** | `app/page.tsx:530` → `/audit` marketing quiz (`lib/copy/audit.ts:82`) |
| **Homepage "Partner" lane → `/consulting`** | ⚠️ **Open (decision)** | `app/page.tsx` LANES |
| **`/trust` not in header nav** | ⚠️ **Open** | `lib/nav.ts` (footer-only) |
| **`/pricing` Implementation tier hides $500** | ⚠️ **Open (NEW)** | `lib/copy/pricing.ts:77-90` vs `consulting/page.tsx:243` |
| `/company` soft-orphan / `/audit` not in sitemap | ⚠️ **Open (NEW)** | reachable only via child back-links; `sitemap.ts` |
| Customer logos unlinked | ⚠️ **Open** | `app/page.tsx` logo `<img>` has no `<a>`/URL |
| No broken internal routes / no redirect chains | ✅ | 41 links audited, 0×404 |

---

## Prioritized backlog v3 (next round)

### P0 — cheap, high-leverage, do first
1. **Fix the blog post title doubling** (NEW). In `buildPostMetadata` (or the post frontmatter), stop appending the brand so the layout template doesn't stack a second suffix; standardize on "Recoup". One change fixes every post.
2. **Re-point the homepage "Partner" lane** (`app/page.tsx` LANES) `/consulting` → `/partners`. One line; named by every platform pass since v1.
3. **Fix the §9 pull-quote CTA** — retarget to a diligence artifact, or swap the testimonial so quote and CTA match. Today it sends diligence intent to a marketing-ops quiz.
4. **Put `/trust` in the header nav** and link/enlarge the homepage hero ownership line to `/trust`.
5. **Surface the $500 anchor on `/pricing`** (NEW) so the Implementation tier doesn't read "Custom" while `/consulting` already says "$500".

### P1 — structural conversion
6. **Give the catalog buyer something to see** — a real (even anonymized) diligence/income sample on a dedicated `/diligence` (or `/catalog`) page, linked from the §9 quote and the homepage Lanes; and put the **catalog-diligence skill** the LinkedIn hook advertised onto the open-tools shelf.
7. **Add one illustrative economic number to `/partners`** (rev-share %, per-run, or per-seat) so a platform can size a deal.
8. **Add a named org-owned build track** distinct from the generic consulting funnel, and point `/trust` CTAs at it instead of "Talk to us".
9. **Rebalance homepage §6/§7** — lead Build with an outcome before "harness"; make the "we'll set them up for you" no-code line at least as prominent as the `npx` block.

### P2 — IA polish
10. **Add `/company` to nav or footer** (soft-orphan) and **add `/audit` to the sitemap** (or fold `/audit` into a clearer funnel home).
11. **Link the customer logos** (per-logo URLs) and **attribute the pull quote** (needs a real name/permission, not just code).

---

## Per-persona summaries (v3)

- **Catalog fund buyer (5→6)** — `docs/userjourney/v3/catalog-fund-buyer.md`. Copy finally speaks his language (diligence + royalty intelligence on `/consulting`/`/partners`; `/trust` nails the licensed-fund no-train objection) but the conversion-defining gap is untouched: **nothing to see**, the §9 hook still dead-ends in `/audit`, and the catalog-diligence skill he came for isn't on the shelf. *Convert with: a visible diligence artifact + a catalog skill on the shelf.*
- **Rights owner (8→9)** — `docs/userjourney/v3/rights-owner-skills.md`. `/trust` shipped the one page that closes his entire decision — org-owned private repos, scoped/revocable, offboarding, no-train — in his exact words. Held back only by discoverability: `/trust` not in nav, homepage hero line tiny/unlinked, org-owned track still a card inside generic consulting. *Convert with: Trust in nav + a named org-owned track.*
- **Platform lead (8→8)** — `docs/userjourney/v3/platform-partner.md`. `/partners` answers 5/6 deal questions and is now reachable via `/platform`, but all three v2 blockers persist because they live on the untouched homepage + the numberless commercials: Partner lane → `/consulting`, no Partners nav entry, zero economic numbers. *Convert with: re-point the lane, add a Partners nav item, add one rev-share number.*
- **Label GM (8→9)** — `docs/userjourney/v3/label-gm.md`. The pages he actually lands on after "Talk to us" now answer every fear: `/consulting` says "no terminal… a real person… $500, no pitch deck" and lists Labels first; `/company/recoup-records` makes "a real label runs this" believable; the readability fix removed the near-white text. Held back by the engineer-y homepage §6/§7 and the `/pricing`-vs-`/consulting` price gap. *Convert with: outcome-first Build copy + the $500 anchor on `/pricing`.*
- **Cold visitor + link audit (7.5→8.5)** — `docs/userjourney/v3/cold-visitor-linkaudit.md`. 5-second test now a clean pass; route sprawl, the `/resources` stub, and orphaned strong pages are genuinely fixed (11/11 clean 308s, sitemap cleaned). Held back by the blog-title doubling (the v2 bug surviving on the content surface), unlinked logos, and a new `/company` soft-orphan. *Improve with: fix blog titles, link logos, re-home `/company`.*

---

## One-line takeaway
Average rose **7.3 → 8.1**: the destination-page rewrites and IA deletion converted the **label GM (9)** and pushed the **rights owner to 9** (his entire objection now lives, fully answered, on `/trust`). The ceiling is now two things, both known: the **homepage** — every unmoved complaint (platform Partner lane, §9 diligence→quiz bait-and-switch, tiny hero trust line) is on the one file this round didn't touch — and **proof for the catalog buyer**, who still can't *see* a diligence output or even find the catalog skill the ad promised. Five cheap P0s (fix blog titles, re-point the Partner lane, fix the §9 CTA, Trust in nav, surface $500 on `/pricing`) plus one real artifact (a visible diligence sample) close most of what's left.
