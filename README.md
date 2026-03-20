# marketing

Recoupable's marketing workspace.

## Apps

- `apps/web` — public-facing marketing website, blog, SEO pages, and lead capture
- `apps/ops` — internal marketing operations app for private tools and workflows

## Shared Context

- `content/` — brand docs, SEO plans, post sources, and status
- `transcripts/` — call transcripts for voice-of-customer context
- `swipe/` — reference copy, designs, competitor notes, and trends
- `workflows/` — shared non-UI automation for funnels, syncs, and reporting

## Commands

```bash
pnpm install
pnpm dev       # runs the public website in apps/web
pnpm dev:web
pnpm dev:ops
pnpm build     # builds the public website in apps/web
pnpm build:ops
```

## Vercel

Deploy the public website as a Vercel project with:

- Repository: `recoupable/marketing`
- Root Directory: `apps/web`

If you later deploy the internal app separately, create a second Vercel project
pointed at `apps/ops`.
