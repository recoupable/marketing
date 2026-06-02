---
updated: "2026-06-01"
---

## Now

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

- 2026-06-01: userjourney P0–P2 fixes — shelf now maps to real `recoupable/skills` folders (`music-industry-research`, `chart-metric`, `content-creation`, `release-management`, `streaming-growth`) with per-card GitHub links + one working `npx skills add recoupable/skills`; killed the IP-leak "engagements sharpen our skills" line; hero + `/consulting` FAQ now state ownership/no-train; `/company/recoup-records` rebuilt into a real dogfooding proof page; `/records` 301→`/company/recoup-records`; new `/partners` and `/trust` pages; Platform+Pricing promoted into header; Build §6 got docs/partnerships CTAs + plain-English MCP line; pull quote wired to `/audit`; `/platform` CTA no longer dumps into the chat app; X handle `recaboreal`→`recoupable`.
- 2026-06-01: Repositioning v1 — rewrote `app/page.tsx` (research+consulting storyboard), B+ nav (`lib/nav.ts` + Header → "Talk to us", removed Sign In/Up), Footer restructured (Work with us / Build / Company), `/advisory`→`/consulting` 301, new `researchUrl` config + metadata. Branch `feat/research-consulting-site`.
- 2026-04-05: YAGNI cleanup — flattened from pnpm workspace (apps/web + apps/ops) to single Next.js app at root. Deleted unused components (NavDropdown, ThemeToggle, SubscribeForm). Deleted empty ops app.
- 2026-03-30: Brand context files, copy registry, machine view API
- 2026-03-22: Restructured to pnpm workspace monorepo
- 2026-03-16: Initial scaffold (Next.js 16, Tailwind, content system, SEO pillars)

## Don't Touch

- Plausible analytics script in layout.tsx
- Theme inline script in layout.tsx (prevents flash of wrong theme)
