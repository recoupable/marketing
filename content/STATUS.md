# Sky preview migration — September 10, 2026

The approved Labs site is migrated on `codex/sky-marketing-redesign`. Read `DESIGN.md` and `docs/plans/sky-migration.md` for current UI conventions and production release dependencies. The historical status below predates this redesign. Pricing is now $99 / $999 / $9,999 monthly; checkout provisioning is a production launch gate.

---

---
updated: "2026-04-05"
---

## Now

- Website live: homepage, platform, solutions, developers, learn, company, legal pages
- 1 blog post published (ai-music-marketing)
- Blog system working: MDX parsing, RSS feed, sitemap, JSON-LD
- Subscribe flow: POST /api/subscribe -> Attio CRM
- Vercel Web Analytics active in layout; custom events via lib/analytics/trackEvent.ts

## Focus

Content: publish more blog posts targeting SEO pillars. Wire up the nav menu (lib/nav.ts exists but Header doesn't consume it yet).

## Recently Changed

- 2026-04-05: YAGNI cleanup — flattened from pnpm workspace (apps/web + apps/ops) to single Next.js app at root. Deleted unused components (NavDropdown, ThemeToggle, SubscribeForm). Deleted empty ops app.
- 2026-03-30: Brand context files, copy registry, machine view API
- 2026-03-22: Restructured to pnpm workspace monorepo
- 2026-03-16: Initial scaffold (Next.js 16, Tailwind, content system, SEO pillars)

## Don't Touch

- Theme inline script in layout.tsx (prevents flash of wrong theme)
