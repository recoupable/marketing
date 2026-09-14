# marketing

Recoup's public marketing website — Next.js 16, React 19, Tailwind CSS v4.

## Structure

- `app/` — Pages, layouts, API routes (Next.js App Router)
- `components/` — React components (layout, blog, home)
- `lib/` — Site logic (posts, SEO, Attio CRM, config, copy registry)
- `contexts/` — React context providers (theme, human/machine view)
- `brand-studio/` — Finals, Experiments, podcast/social kits, and editable artwork; available at `/brand`
- `public/` — Static assets (brand logos, icons, images)
- `content/` — Brand docs, SEO plans, blog posts (MDX), status
- `transcripts/` — Call transcripts for voice-of-customer context
- `swipe/` — Reference copy, designs, competitor notes, trends
- `workflows/` — Shared non-UI automation for funnels, sync, reporting
- [`gtm/`](gtm/README.md) — Shared GTM context, company research, Music Moneyball corpus, playbooks, and engine tools; agents start at [`gtm/AGENTS.md`](gtm/AGENTS.md)

## Commands

```bash
pnpm install   # Install dependencies
pnpm dev       # Dev server (Turbopack)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Fix lint issues
pnpm format    # Prettier + lint
```

## Vercel

Deploy as a Vercel project with:

- Repository: `recoupable/marketing`
- Root Directory: `.`

Run `pnpm brand-studio` for the standalone Studio at `http://localhost:3012/brand`, or open `/brand-studio` in the normal marketing dev server.
