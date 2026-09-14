# Navigation consolidation — September 14, 2026

The desktop menus now open on mouse hover and expand the full header surface. Products retains its three illustrated cards. Resources uses compact Docs, Blog, Lab, and About icon links plus one illustrated Work card; the redundant All resources footer is removed. A short mouse-leave delay keeps the menu reachable. Phones retain tap disclosures, with keyboard and Escape support preserved. Continued on `codex/consolidate-navigation`, PR #105.

The desktop header logo now matches the footer’s 23×28px symbol and 1.2 line height, alongside the existing 28px/600 wordmark and 11px gap. It retains dark ink; the footer and mobile icon-only layout retain their existing styles.

The shared header now has Services, Products, Resources, and Pricing. Products groups Platform, Skills, and Developers; Resources includes Work, About, Docs, Blog, and Lab. Both desktop and mobile use `lib/copy/navigation.ts`, with native dropdowns and nested mobile disclosures. The audit action and all destination pages remain available. This follows merged PR #104 on `codex/consolidate-navigation`.

Validated with a production build, focused lint, and desktop/mobile browser checks covering sibling dropdowns, link navigation, outside-click dismissal, Escape focus, and 320px reflow.

---

# Shared GTM context and tools — September 14, 2026

The shared team home is `gtm/`. Start at `gtm/AGENTS.md` and `gtm/README.md` for enterprise buyer context, the worldwide music-rights company research, Music Moneyball interviews and principles, adapted consulting playbooks, and the next engine build. Consulting originals remain in place; the import is a dated snapshot with provenance, not an automatic sync.

The old GTM app-user tools now live in the independent `gtm/engine` package. Its CRM command previews by default and requires an explicit apply option for writes. Live integration compatibility remains unverified. The account-to-draft workflow, publishing connections, and outcome tracking are next work in `gtm/BUILD_PLAN.md`. No outreach, campaign, or recurring worker was launched by this consolidation.

---

# Homepage copy simplification — September 14, 2026

Tools cards use unnumbered labels and end at their destination links. The Platform price remains visible; Skills and Developers carry usage-cost details on their linked pages.

The closing card now leads with “Recoup your team’s time.”, a short workflow invitation, and the free-audit action. Its implementation pricing note uses separate, smaller typography.

The homepage now uses shorter service, process, ownership, plan, tool, FAQ, and closing summaries. Repeated benefits, inclusions, preambles, and case-study badges are removed; card spacing follows the shorter copy. The approved hero headline and subtitle remain in place. The mission statement keeps its concise copy but has a narrower, balanced text measure and more surrounding space to separate it from the hero and services. Shared footer wording is shorter as well. Services now lead directly into case studies; the redundant “What we can build” links are removed.

Homepage summaries live in `lib/copy/home.ts`, `home-offers.ts`, and `home-case-studies.ts`; shared footer wording lives in `lib/copy/footer.ts`. The machine-readable homepage summary reuses the copy. Detailed service, pricing, and case-study pages retain their content. Homepage plan cards now say “Starting at” and select annual billing by default, displaying the monthly equivalent and full annual charge. Price calculations, plan inquiry attribution, and lead-capture behavior are unchanged.

Validated with a production build, focused lint, pricing/agent-content/internal-link tests, and desktop/mobile browser checks. Merged into main in PR #104.

---

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
