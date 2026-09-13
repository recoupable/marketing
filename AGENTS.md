# AGENTS.md

This is the Recoup marketing site — public website, blog, SEO pages,
subscribe flow, CRM integration, and shared content/context for the full
marketing funnel.

## You Are Allowed To Improve This System

If you find a better way to organize files, schemas, processes, or code —
do it. Update this file to reflect your changes. The only rule: run
`pnpm build` after changes. If it passes, ship it. If your change breaks
something, fix it in the same commit.

## First Steps (Every Session)

1. Read `content/STATUS.md` — current state, focus, what changed, what not to touch
2. Read this file (you're doing it now)
3. Read the context file relevant to your task (see Context Files below)
4. **React/Next.js:** When writing or refactoring components, pages, or data fetching, read and follow **Vercel React best practices** (monorepo: `.agent/skills/vercel-react-best-practices/SKILL.md`; full guide: that folder's `AGENTS.md`). Prioritize: no barrel imports, no async waterfalls, minimal RSC payload, safe localStorage usage.
5. **UI / Frontend design:** When building or refining UI (components, pages, layouts, styling, animations), use the **Impeccable** skills in the monorepo `.agents/skills/`. Read the relevant skill before implementing—especially `frontend-design/SKILL.md` for visual design, plus `animate`, `colorize`, `delight`, `polish`, and `adapt` as needed. See https://github.com/pbakaus/impeccable for the full set.

## Build Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Dev server (Turbopack)
pnpm build      # Production build (MUST pass before committing)
pnpm start      # Start production server
pnpm lint       # Fix lint issues
pnpm format     # Run prettier + lint
```

## Git Workflow

- Feature branches only — NEVER push to main
- PRs target main — `gh pr create --base main`
- Commit and push after every task

## Architecture

```
app/              — Next.js App Router pages, layouts, API routes
components/       — React components: sky/ (SiteFrame shell, SkySiteHeader, SkySiteFooter, FooterSignup), home/, inquiry/, interactive/, analytics/
hooks/            — Shared React hooks (useInquirySubmit.ts, useVideoRequestSubmit.ts, useSubscribeForm.ts)
contexts/         — React context providers (Privy auth)
lib/              — Site logic: config.ts (siteConfig), seo.ts, one-export directories (agent-content/, agent-discovery/, agent-tools/, catalog-demo/, attribution/, leads/, inquiries/), copy/
lib/docs/         — Documentation helpers (llms.txt sections, llms-full corpus, markdown negotiation)
proxy.ts          — Request proxy (Next 16 successor to middleware): serves /docs/* as markdown on Accept: text/markdown or a .md suffix
public/           — Static assets (brand/, icons/, images/)
content/posts/    — MDX blog posts (one file = one post)
content/brand/    — Brand context files (read before creating content)
content/seo/      — SEO strategy + keyword targets
content/STATUS.md — Current state snapshot (read FIRST every session)
transcripts/      — Call transcripts (eng, customers, leads) for positioning/copy context
swipe/            — Reference material (copy, designs, competitors, complaints, trends)
workflows/        — Shared non-UI automation for funnels, sync, and reporting
docs/plans/       — Architecture and implementation plans
```

## Deployment

- Vercel project: repo `recoupable/marketing`, root directory `.`

## Transcripts folder

- **Path:** `transcripts/`
- **Purpose:** Store call transcripts (engineering, customers, leads) for **context for marketing work** — positioning, copy, GTM funnels, assets, videos, lead magnets, blogs, posts.

When working on marketing copy, positioning, or GTM assets, **read relevant transcripts** for voice-of-customer, pain language, proof points, and decisions.

**Naming convention: `subject-date.md`**

All transcript files must use: `<subject>-<YYYY-MM-DD>.md` (e.g. `customer-acme-2026-03-18.md`, `eng-standup-sweets-sid-2026-03-18.md`). Subject = short lowercase slug; date = ISO. This keeps the most recent obvious and makes `grep` across transcripts easy.

**When the user gives you a transcript:** Create a new file in `transcripts/`, name it `subject-date.md`, paste the transcript, commit. See `transcripts/README.md` for details.

## Swipe File (Reference Collection)

Raw research material that informs content, positioning, and copy. One markdown file per item.

```
swipe/copy/         — Good copy you've seen (headlines, hooks, CTAs)
swipe/designs/      — Screenshots and visual references
swipe/competitors/  — What competitors say and do
swipe/complaints/   — Real pain points from Reddit, forums, reviews
swipe/trends/       — Industry data and market insights
```

When adding to swipe, use a descriptive filename (e.g., `reddit-artists-hate-posting.md`).
Read relevant swipe files before writing copy — real language > made-up language.

## Context Files (Read Before Creating Content)

```
content/brand/website-structure-report.md — Positioning, hero, landing structure, nav (read for site/copy changes)
content/brand/positioning.md — What we are, for whom, differentiators
content/brand/voice.md       — How we sound (with WHY on each rule)
content/brand/founder.md     — Sidney's story (for thought leadership)
content/brand/product.md     — Features, stats (check updated date)
content/brand/audience.md    — Customer personas (structured format)
content/brand/examples.md    — Approved + rejected copy with reasons
content/seo/pillars.md       — Topic clusters, target keywords
content/posts/INDEX.md       — Published posts + topic gaps
```

## Adding a Blog Post

1. Read `content/STATUS.md` + `content/posts/INDEX.md` (check gaps)
2. Read `content/brand/voice.md` + relevant context files
3. Create `content/posts/[slug].mdx` with ALL frontmatter fields
4. Set `status: "draft"` — run `pnpm build` to validate schema
5. Update `content/posts/INDEX.md`

## Content Types

| Type | Description | JSON-LD |
|------|-------------|---------|
| `article` | Thought leadership | Article |
| `case-study` | Social proof | Article |
| `tutorial` | Step-by-step how-to | HowTo |
| `announcement` | Product news | NewsArticle |
| `pillar` | Comprehensive guide | Article |

## SEO Rules

- Every page: unique title (50-60 chars) + description (120-160 chars)
- Every post: JSON-LD structured data + canonical URL
- H1 = post title. Use H2-H4. Never skip heading levels.
- Images: always include descriptive alt text
- Internal links: 3-5 related posts per post

## Dark mode

- **Single place to edit:** `app/globals.css` — the `[data-theme="dark"]` block overrides the same CSS variables (--background, --foreground, --muted, --border, --brand, etc.). Change dark colors only there.
- **Toggle:** Header (sun/moon icon). Preference is stored in `localStorage` key `recoupable-theme:v1` and respected on load; falls back to `prefers-color-scheme` when no stored value.
- **No flash:** An inline script in `app/layout.tsx` sets `data-theme` on `<html>` before first paint. Keep its logic in sync with `contexts/ThemeContext.tsx` (storage key and fallback).

## Brand

- **Brand assets** (see `public/brand/README.md`): logo mark `icon-lightmode.svg` / `icon-darkmode.svg`, word mark `wordmark-lightmode.svg` / `wordmark-darkmode.svg`, profile/hero `pfp-sky-bg.png`. Use in UI as `/brand/<filename>`.
- **Favicons / PWA icons:** `public/icons/` (see that folder's README)
- **Page copy:** `lib/copy/` — single source for human pages and machine (markdown) view; edit copy there only so both stay in sync.
- NEVER hardcode brand values — import `siteConfig` from `lib/config.ts`, the only site configuration module (origin, app URL, docs path, GitHub URLs, contact email, booking link; `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, and `NEXT_PUBLIC_BOOKING_URL` are read there)

## Integrations

- **Lead capture:** one browser client, `lib/leads/postLead.ts`, posts to `POST /api/leads` on the Recoup api, which owns Attio storage, the triage note, and the Telegram page (chat#1800). Subscribe surfaces call it through `lib/marketing-subscribe.ts`; the music-video quote form calls it directly. Inquiry forms post to the same-origin `/api/inquiries` proxy (`lib/inquiries/`), which validates `source` against `lib/inquiry/inquirySourceSchema.ts`, de-duplicates, forwards `kind: booking`, and returns `{ ok: true, submission_id }`. Marketing holds no Attio client and no `ATTIO_API_KEY`. The api base is `siteConfig.apiUrl` (`lib/config.
- **Attribution:** one store, `lib/attribution/` (`recoup:acquisition:v1` in sessionStorage, first + latest tagged visit). Forms read it with `currentReferralAttribution()`; CRM notes render it via `describeAcquisitionTags()` as `source=x; medium=y; campaign=z` (no underscores, Attio notes are markdown). App links go through `lib/appLink.ts` / `<AppLink>` and carry `utm_source=marketing&utm_medium=<placement>&utm_campaign=sky`, the visitor's own tags winning.
- **Analytics:** Vercel Web Analytics (`<Analytics />` in `app/layout.tsx`); custom events go through `lib/analytics/trackEvent.ts` only, and props never carry visitor details. Funnel events: `cta_clicked {cta, placement, plan?}` (`<TrackedLink>`), `pricing_billing_toggled {billing}`, `inquiry_started {source, plan?}`, `inquiry_submitted {source, plan?, budget?, timeline?, company_type?, submission_id}`, `inquiry_failed {source, reason: validation|network|rejected|timeout}`, `subscribe_submitted {source}`, `audit_completed {score}`, `roi_calculated {recommended_plan}`.

## Code Principles

- SRP: one function per file
- DRY: no duplication
- KISS: simple > clever
- Zod for all validation
- Comments explain WHY, not WHAT
- No console.log in production

## Updating This File

When you add files, integrations, commands, or context:
- Update the relevant section of this file
- Commit the AGENTS.md update with your code changes
- This file must always reflect the current state of the repo

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sky migration (September 2026)

Read `DESIGN.md` before UI changes. The approved Sky design applies to this marketing repository only. Current site components live in `components/sky`. `components/site-frame.tsx` wraps every route, `/` included, in the single header (`components/sky/site-header.tsx`, `SkySiteHeader`) and single footer (`components/sky/site-footer.tsx`, `SkySiteFooter`); pages never add their own header, footer, or main landmark; blog and docs snapshots live in `content/blog` and `content/docs`. Retained production integrations include `/api/leads` on the central API, route-scoped Privy authentication for valuation, and Vercel Analytics.

Personality should come through in the directness and confidence of the writing. It shouldn’t depend on making ordinary things sound more abstract.

- Bad: “Activate your operational intelligence.” Good: “Connect your data and automate recurring reports.”
- Bad: “The plan. The systems. The people who use them.” Good: “AI strategy, custom systems, and team training.”
- Bad: “Unlock the next chapter.” Good: “Get a plan for your first AI project.”

The `/music-videos` offer retains PR #89’s copy, artist films, skill download, attribution, and quote capture. Offer copy lives in `lib/copy/music-videos.ts`; form and attribution logic live in `components/music-videos` and `lib/music-videos`. Keep the human page and agent content aligned. See `docs/plans/music-video-offer.md` for the funnel contract and integration receipt.

The footer's `FooterSignup` (`components/sky/footer-signup.tsx`, email only, `source: /footer`) and the resources, playbook, and blog `SubscribeCard` (`components/marketing-migration/subscribe-card.tsx`, name + email) are presentational wrappers over `hooks/useSubscribeForm.ts`. The hook owns the hydration guard, the single in-flight submit, the status/error state, the `subscribeToRecoup` call (`lib/marketing-subscribe.ts`, `kind: subscribe` through the central lead API with acquisition tags), the focus move onto the confirmation, and the `subscribe_submitted` event.

## Documentation (`/docs`)

- Source of truth: `content/docs/source` (MDX pages, `docs.json` navigation, `api-reference/openapi/*.json`). Edit there; the `recoupable/docs` repository is not read.
- After editing, run `pnpm docs:build` and commit the generated `content/docs/inventory.json`, `manifest.json`, and `navigation.json` together with the source change. `scripts/__tests__/build-docs.test.ts` fails when they drift.
- `pnpm docs:check` validates route coverage, schema references, guide links, and request examples.

## Agent discovery

- `/llms.txt`, `/llms-full.txt`, `/agents.md`, `/agents/catalog.json`, and `/agent-api/v1/*` are built from `lib/agent-content.ts` and `lib/agent-discovery.ts`. Documentation descriptions pass through `lib/resolve-description-links.ts` so docs-root links carry the `/docs` prefix everywhere they are published.
- `/api/machine` is a permanent redirect to `/llms.txt`.
- Legacy URLs (`/company/about`, `/company/recoup-records`, `/company/recoupable-records`, `/learn`, `/build/start`, `/advisory/book`) are 308 rules in `next.config.ts`; add new aliases there, not as redirecting page files.
