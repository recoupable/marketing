# AGENTS.md

This is the Recoupable marketing GTM engine — website, blog, content system,
CRM integration, and the foundations for a full marketing funnel.

## You Are Allowed To Improve This System

If you find a better way to organize files, schemas, processes, or code —
do it. Update this file to reflect your changes. The only rule: run
`pnpm build` after changes. If it passes, ship it. If your change breaks
something, fix it in the same commit.

## First Steps (Every Session)

1. Read `content/STATUS.md` — current state, focus, what changed, what not to touch
2. Read this file (you're doing it now)
3. Read the context file relevant to your task (see Context Files below)

## Build Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Dev server
pnpm build      # Production build (MUST pass before committing)
pnpm lint       # Fix lint issues
pnpm format     # Run prettier
```

## Git Workflow

- Feature branches only — NEVER push to main
- PRs target main — `gh pr create --base main`
- Commit and push after every task

## Architecture

```
app/              — Next.js pages + API routes
content/posts/    — MDX blog posts (one file = one post)
content/brand/    — Brand context files (read before creating content)
content/seo/      — SEO strategy + keyword targets
content/STATUS.md — Current state snapshot (read FIRST every session)
swipe/            — Reference material (copy, designs, competitors, complaints, trends)
lib/              — Business logic (posts.ts, seo.ts, attio.ts, config.ts)
components/       — React components (layout/, blog/, ui/)
public/brand/     — Logos, fonts, favicon
```

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

## Brand

- Colors: primary `#345A5D` (defined in `lib/config.ts`)
- Logos: `public/brand/logo.svg`, `public/brand/logo-dark.svg`
- NEVER hardcode brand values — import from `lib/config.ts`

## Integrations

- **Attio CRM:** `lib/attio.ts` — contacts with UTM attribution + lifecycle stage
- **Analytics:** Plausible script in `app/layout.tsx` — do NOT remove

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
