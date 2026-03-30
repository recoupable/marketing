# AGENTS.md

This is the Recoupable marketing workspace — public website, internal
marketing apps, shared content/context, CRM integration, and the foundations
for the full marketing funnel.

## You Are Allowed To Improve This System

If you find a better way to organize files, schemas, processes, or code —
do it. Update this file to reflect your changes. The only rule: run
`pnpm build` after changes. If it passes, ship it. If your change breaks
something, fix it in the same commit.

## First Steps (Every Session)

1. Read `content/STATUS.md` — current state, focus, what changed, what not to touch
2. Read this file (you're doing it now)
3. Read the context file relevant to your task (see Context Files below)
4. **React/Next.js:** When writing or refactoring components, pages, or data fetching, read and follow **Vercel React best practices** (monorepo: `.agent/skills/vercel-react-best-practices/SKILL.md`; full guide: that folder’s `AGENTS.md`). Prioritize: no barrel imports, no async waterfalls, minimal RSC payload, safe localStorage usage.
5. **UI / Frontend design:** When building or refining UI (components, pages, layouts, styling, animations), use the **Impeccable** skills in the monorepo `.agents/skills/`. Read the relevant skill before implementing—especially `frontend-design/SKILL.md` for visual design, plus `animate`, `colorize`, `delight`, `polish`, and `adapt` as needed. See https://github.com/pbakaus/impeccable for the full set.

## Build Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Public website dev server (apps/web)
pnpm dev:web    # Public website dev server
pnpm dev:ops    # Internal marketing ops dev server
pnpm build      # Public website production build (MUST pass before committing)
pnpm build:ops  # Internal app production build
pnpm lint       # Fix public website lint issues
pnpm format     # Run prettier
```

## Git Workflow

- Feature branches only — NEVER push to main
- PRs target main — `gh pr create --base main`
- Commit and push after every task

## Architecture

```
apps/web/         — Public Next.js website, blog, SEO pages, subscribe flow
apps/ops/         — Internal Next.js app for private marketing workflows
content/posts/    — MDX blog posts (one file = one post)
content/brand/    — Brand context files (read before creating content)
content/seo/      — SEO strategy + keyword targets
content/email/    — Email drip sequence templates for trial onboarding (NOT code — plain text copy)
content/STATUS.md — Current state snapshot (read FIRST every session)
transcripts/      — Call transcripts (eng, customers, leads) for positioning/copy context
swipe/            — Reference material (copy, designs, competitors, complaints, trends)
workflows/        — Shared non-UI automation for funnels, sync, and reporting
docs/plans/       — Architecture and implementation plans
apps/web/lib/     — Public site logic (posts.ts, seo.ts, attio.ts, config.ts)
apps/web/components/ — Public site React components (layout/, blog/, ui/)
apps/web/public/brand/ — Logos, word marks, profile/hero image
apps/web/public/icons/ — Favicons + PWA icons
apps/web/lib/copy/ — Markdown versions of key pages for "Machine" view
```

## Deployment

- Public Vercel project: repo `recoupable/marketing`, root directory `apps/web`
- Internal Vercel project: optional separate project with root directory `apps/ops`
- Keep public and internal apps as separate deployments, even though they live in
  the same repo

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

## Email Drip Sequence

- **Path:** `content/email/`
- **Purpose:** Plain-text email templates for the free trial onboarding drip campaign. These are **copy documents** — not code, not HTML templates, not blog posts about email.
- **Overview:** `content/email/sequence-overview.md` — the full 30-day sequence plan, timing, and principles
- **What they are:** Each file is one email in the trial onboarding sequence, with the template copy, personalization instructions, and design decision notes
- **What they are NOT:** These are not automated email templates (no HTML/MJML/React Email). They are not marketing content about email. They are not part of the website build.
- **When to read:** If working on trial user communication, onboarding emails, or drip campaign automation
- **Automation:** When ready to automate sending, build that logic in `workflows/` and reference these templates as the source of truth for copy

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

- **Single place to edit:** `apps/web/app/globals.css` — the `[data-theme="dark"]` block overrides the same CSS variables (--background, --foreground, --muted, --border, --brand, etc.). Change dark colors only there.
- **Toggle:** Header (sun/moon icon). Preference is stored in `localStorage` key `recoupable-theme:v1` and respected on load; falls back to `prefers-color-scheme` when no stored value.
- **No flash:** An inline script in `apps/web/app/layout.tsx` sets `data-theme` on `<html>` before first paint. Keep its logic in sync with `apps/web/contexts/ThemeContext.tsx` (storage key and fallback).

## Brand

- **Brand assets** (see `apps/web/public/brand/README.md`): logo mark `icon-lightmode.svg` / `icon-darkmode.svg`, word mark `wordmark-lightmode.svg` / `wordmark-darkmode.svg`, profile/hero `pfp-sky-bg.png`. Use in UI as `/brand/<filename>`.
- **Favicons / PWA icons:** `apps/web/public/icons/` (see that folder’s README)
- **Page copy:** `apps/web/lib/copy/` — single source for human pages and machine (markdown) view; edit copy there only so both stay in sync.
- NEVER hardcode brand values — import from `apps/web/lib/config.ts`

## Integrations

- **Attio CRM:** `apps/web/lib/attio.ts` — contacts with UTM attribution + lifecycle stage
- **Analytics:** Plausible script in `apps/web/app/layout.tsx` — do NOT remove

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
