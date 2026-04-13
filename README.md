# marketing

Recoupable's public marketing website — Next.js 16, React 19, Tailwind CSS v4.

## Structure

- `app/` — Pages, layouts, API routes (Next.js App Router)
- `components/` — React components (layout, blog, home)
- `lib/` — Site logic (posts, SEO, Attio CRM, config, copy registry)
- `contexts/` — React context providers (theme, human/machine view)
- `public/` — Static assets (brand logos, icons, images)
- `content/` — Brand docs, SEO plans, blog posts (MDX), status
- `transcripts/` — Call transcripts for voice-of-customer context
- `swipe/` — Reference copy, designs, competitor notes, trends
- `workflows/` — Shared non-UI automation for funnels, sync, reporting

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
