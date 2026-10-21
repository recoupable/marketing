# Recoup Marketing

Recoup's public website, documentation, blog and website assistant, built with
Next.js, React and Tailwind CSS. Start with [AGENTS.md](AGENTS.md),
[content/STATUS.md](content/STATUS.md) and the
[current product/source guide](content/brand/product.md).

## Sources and ownership

- [DESIGN.md](DESIGN.md) owns the Marketing Sky design. The shell uses DM Sans Variable and IBM Plex Mono; font imports live in [app/layout.tsx](app/layout.tsx).
- [lib/config.ts](lib/config.ts) owns configured website/app/API/contact destinations; [lib/copy/navigation.ts](lib/copy/navigation.ts) owns the menu and `lib/copy/` owns shared page copy.
- [lib/pricing.ts](lib/pricing.ts) and [app/pricing](app/pricing) own displayed offers. Purchase recurrence and monthly/annual handoff verification remain in [Mono #338](https://github.com/recoupable/mono/issues/338).
- [content/blog/posts.json](content/blog/posts.json) is the published source for the website, feed and agent views. [content/posts/INDEX.md](content/posts/INDEX.md) is generated from it; legacy MDX and archived plans are historical.
- [content/docs/source](content/docs/source) is the maintained documentation input. `pnpm docs:build` generates local outputs. The separate `recoupable/docs` repository is a pinned Mintlify publication copy; host cutover is separate.
- [lib/leads/postLead.ts](lib/leads/postLead.ts) and [lib/inquiries/saveInquiry.ts](lib/inquiries/saveInquiry.ts) forward requests to API, which owns CRM storage and notifications. Marketing has no direct CRM client.
- [docs/website-agent.md](docs/website-agent.md) describes the public website assistant; authenticated platform tools have a separate access contract.
- [gtm/](gtm/README.md) holds research and independent engine tools. Start at [gtm/AGENTS.md](gtm/AGENTS.md).

`app/` holds routes/layouts, `components/sky/` the shell, `hooks/` browser behavior,
`contexts/` the Privy provider, and `public/` static assets. `brand-studio/` holds
artwork and review tools. `transcripts/` and `swipe/` are content context;
`workflows/` holds existing helpers. New platform scheduled/background jobs belong
in API Vercel Workflows under Mono's rules; existing Trigger.dev jobs are separate
retained implementations.

## Commands

Use the Node engine and pnpm version declared in [package.json](package.json).

```bash
pnpm install       # Install dependencies
pnpm dev           # Development server
pnpm build         # Required production build before committing
pnpm start         # Serve the production build
pnpm test          # Website tests
pnpm lint          # ESLint checks
pnpm format        # Prettier and lint
pnpm docs:build    # Regenerate documentation outputs
pnpm docs:check    # Verify documentation consistency
pnpm posts:build   # Regenerate the published editorial inventory
pnpm posts:check   # Reject missing, duplicate or stale inventory entries
```

Run `pnpm brand-studio` for the standalone Studio at `http://localhost:3012/brand`,
or open `/brand-studio` in the normal development server.

## Release and history

Feature branches and PRs target `main`; never push directly to `main`.
The Vercel project uses `recoupable/marketing` with root directory `.`.
The CLI package is `@recoupable/cli`, with executable `recoup`; its
[maintained guide](content/docs/source/cli.mdx) separates source from registry
and installation evidence.

The historical positioning, website-structure and typography documents under
`content/brand/` preserve earlier proposals. Current design/navigation/product
sources above take precedence. A passing build or merged PR does not establish
documentation publication, successful payments or a verified customer workflow.
