---
updated: "2026-06-02"
---

## Now

- **userjourney v3 re-audit DONE** (2026-06-02) — 5 persona **subagents** traversed the *entire* live site (not just homepage) + audited every link. Avg score **7.3 → 8.1**: catalog buyer 5→6, rights owner 8→9, platform lead 8→8, label GM 8→9, cold visitor 7.5→8.5. **NEW bugs to fix (P0):** blog post titles still doubled (`… | Recoup | Recoup` — `buildPostMetadata`, not static-page path), `/pricing` hides the "$500" anchor that `/consulting` shows, `/company` soft-orphan + `/audit` missing from sitemap. **Persisting (homepage untouched):** Partner lane→`/consulting`, §9 quote→`/audit` mismatch, `/trust` not in header nav, unlinked logos, no visible diligence artifact. Full backlog in `userjourney.md`; per-persona reports in `docs/userjourney/v3/`. No code changed in this pass.
- **Full visual traversal DONE** (2026-06-02) — manually screenshotted + read every page section in-browser (not just source). Rebuilt `/consulting` (killed personal credentials + unreadable `--muted` body text), rewrote `/platform` + `/pricing` + `/developers` + `/company/*` to the homepage design system & company-first copy, fixed the site-wide `text-[var(--muted)]` low-contrast bug (→ `--muted-foreground`, 25 instances), scrubbed `/audit`, and redirected 8 off-brand SaaS-era orphans (`/solutions`, `/results`, `/resources`, `/calculator`, `/advisory/book`, `/playbook`, `/learn`). `pnpm build` green. On `feat/research-consulting-site`.
- **userjourney v2 re-audit DONE** (2026-06-02) — same 5 personas re-walked the post-fix site. Avg score **5.0 → 7.3**; every persona improved (rights owner +4, others +2/+1.5). Remaining v2 backlog (3 near-free P0s) in `userjourney.md`: re-point homepage Partner lane → `/partners`, fix §9 pull-quote→`/audit` mismatch, put `/trust` in header nav. Per-persona detail in `docs/userjourney/v2/`.
- **userjourney fixes (P0–P2) SHIPPED** (2026-06-01) on **`feat/research-consulting-site`** — real open-tools shelf (live GitHub skills + working install), built-out `/company/recoup-records` proof page, ownership/no-train messaging, new `/partners` + `/trust` pages, Platform+Pricing in header. See `userjourney.md` for the audit + fix log.
- **Repositioning v1 SHIPPED** (2026-06-01) on **`feat/research-consulting-site`** — PR open to `marketing/main`. Research + consulting for the agentic music industry.
- Website still live on **`marketing/main`** → recoupable.com (old Music Intelligence hero) **until PR merges**
- Old WIP **`feat/agent-layer-positioning`** (skill-packs hero) — superseded by the new branch; do not merge
- Blog, consulting page, platform, pricing, legal pages exist
- Plausible + theme inline script — do not remove

## Focus

**Active:** Review + merge `feat/research-consulting-site` PR. Then deploy to recoupable.com.

**Next (v1.1, deferred from storyboard):** recent-research dated cards, themed research rails, 3 work tiles. Reconcile stale `/blog` + `/resources` routes vs external `research.recoupable.com`.

**Paused:** SEO blog volume.

**Context files:**
- `plan.md` — collaborative spec (v1 as-built deltas at top)
- `docs/plans/2026-06-01-research-consulting-site.md` — execution doc
- `content/brand/positioning-brief.md` — positioning spine
- `scratchpad-2026-04-landing-audit.md` — archived April homepage audit

## Recently Changed

- 2026-06-02: userjourney **v3 re-audit** — 5 persona subagents walked the whole site + ran a 41-link audit (4 problems, 0×404). Avg 7.3→8.1; rights owner & label GM now 9 (the rewritten `/trust`, `/consulting`, `/pricing`, proof page converted them), platform lead flat at 8 (his 3 blockers all live on the untouched homepage). Surfaced NEW verified bugs: blog-post title doubling, `/pricing`↔`/consulting` price inconsistency, `/company` soft-orphan, `/audit` absent from sitemap. Backlog + per-persona reports in `userjourney.md` / `docs/userjourney/v3/`. No code changed.
- 2026-06-02: **Full visual traversal + fixes** — screenshotted/read every page section in-browser. `/consulting` rebuilt to design system + company-first copy (removed "10+ Platinum Records"/"$2.5M"/personal-credential framing); `/platform`, `/pricing`, `/developers`, `/company`, `/company/about`, `/company/vision` rewritten to "research lab + implementation partner" / "music layer for agents"; site-wide low-contrast fix (`text-[var(--muted)]`→`text-[var(--muted-foreground)]`, 25×) on `/trust`, `/partners`, `/advisory*`; `/audit` scrubbed (no personal creds, no hardcoded prices, CTAs → `/consulting`/`/platform`/`/pricing`); 8 orphan redirects in `next.config.ts` (`/solutions`→`/platform`, `/results`→`/company/recoup-records`, `/resources`→`/developers`, `/calculator`+`/advisory/book`→`/consulting`, `/playbook`→`/platform`, `/learn`→`/blog`). `pnpm build` green.
- 2026-06-02: userjourney **v2 re-audit** — 5 personas re-scored the post-fix site (avg 5.0→7.3). Wins confirmed: rights owner 4→8 (ownership/no-train/`/trust` closed the core objection), label GM 6→8 (real proof page + no-code on-ramp), platform 6→8 (`/partners` answers the deal), cold visitor 6→7.5 (dead-ends gone). Laggard: catalog buyer 3→5 (no visible diligence sample; §9 quote→`/audit` is a content mismatch). New backlog written to `userjourney.md`; per-persona reports in `docs/userjourney/v2/`. No code changed in this pass.
- 2026-06-01: userjourney P0–P2 fixes — shelf now maps to real `recoupable/skills` folders (`music-industry-research`, `chart-metric`, `content-creation`, `release-management`, `streaming-growth`) with per-card GitHub links + one working `npx skills add recoupable/skills`; killed the IP-leak "engagements sharpen our skills" line; hero + `/consulting` FAQ now state ownership/no-train; `/company/recoup-records` rebuilt into a real dogfooding proof page; `/records` 301→`/company/recoup-records`; new `/partners` and `/trust` pages; Platform+Pricing promoted into header; Build §6 got docs/partnerships CTAs + plain-English MCP line; pull quote wired to `/audit`; `/platform` CTA no longer dumps into the chat app; X handle `recaboreal`→`recoupable`.
- 2026-06-01: Repositioning v1 — rewrote `app/page.tsx` (research+consulting storyboard), B+ nav (`lib/nav.ts` + Header → "Talk to us", removed Sign In/Up), Footer restructured (Work with us / Build / Company), `/advisory`→`/consulting` 301, new `researchUrl` config + metadata. Branch `feat/research-consulting-site`.
- 2026-04-05: YAGNI cleanup — flattened from pnpm workspace (apps/web + apps/ops) to single Next.js app at root. Deleted unused components (NavDropdown, ThemeToggle, SubscribeForm). Deleted empty ops app.
- 2026-03-30: Brand context files, copy registry, machine view API
- 2026-03-22: Restructured to pnpm workspace monorepo
- 2026-03-16: Initial scaffold (Next.js 16, Tailwind, content system, SEO pillars)

## Don't Touch

- Plausible analytics script in layout.tsx
- Theme inline script in layout.tsx (prevents flash of wrong theme)
