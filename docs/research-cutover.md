# Research cutover — `research.recoupable.com` → `recoupable.com/research`

**Why:** Research used to live on its own subdomain (the `blog/` submodule app).
We consolidated it into the marketing app at `/research` so it shares the
marketing design system and so its SEO authority compounds onto the primary
domain (`recoupable.com`) instead of a separate subdomain.

The content itself is unchanged — same two pipelines:

1. **Paragraph-synced essays** — body lives on paragraph.com, fetched live (ISR
   1h). Card metadata cached in `marketing/lib/research.ts`.
2. **In-repo MDX** — authored in `marketing/content/research/*.mdx`.

## URL map (301, permanent)

Slugs are preserved 1:1, so the redirect is a clean prefix swap
(`/blog/*` → `/research/*`).

| Old (research.recoupable.com)                              | New (recoupable.com)                                       |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| `/`                                                        | `https://recoupable.com/research`                          |
| `/blog`                                                    | `https://recoupable.com/research`                          |
| `/blog/install-marketplace-claude-desktop`                 | `https://recoupable.com/research/install-marketplace-claude-desktop` |
| `/blog/open-labels`                                        | `https://recoupable.com/research/open-labels`              |
| `/blog/sandbox-for-record-labels`                          | `https://recoupable.com/research/sandbox-for-record-labels`|
| `/blog/recoup-in-2026`                                     | `https://recoupable.com/research/recoup-in-2026`           |
| `/blog/:slug` (any future Paragraph post)                  | `https://recoupable.com/research/:slug`                    |

## How the redirects are implemented

The 301s live in the old research app's config:
`blog/next.config.mjs` → `redirects()`. As long as `research.recoupable.com`
keeps pointing at that deployment, every old URL 301s to its `/research`
counterpart. No DNS change is strictly required, but see options below.

## Cutover checklist

1. **Marketing app** — already live: `/research`, `/research/[slug]`, nav +
   footer link, sitemap entries, reciprocal blog↔research cross-links. ✅
2. **Deploy `blog/`** with the new `redirects()` so the subdomain starts
   301ing. (Keep the deployment alive — do not delete the project — so the
   redirects keep serving.)
3. **Verify** a few old URLs return `301` → the new location:
   ```bash
   curl -sI https://research.recoupable.com/blog/open-labels | grep -i location
   # → location: https://recoupable.com/research/open-labels
   ```
4. **Search Console** — add/confirm `recoupable.com`, submit the updated
   sitemap (`https://recoupable.com/sitemap.xml`, which now includes
   `/research` + each essay). Use the Change of Address tool if you want to
   accelerate consolidation of the subdomain into the root domain.
5. **Backlinks** — update any internal/external links pointing at
   `research.recoupable.com` where you control them (social bios, docs, READMEs).

## Optional: retire the subdomain entirely later

Once Google has recrawled and the new URLs are indexed (typically a few weeks),
you can either:

- **Keep** the `blog/` deployment indefinitely as a thin redirect shim (lowest
  risk), or
- **Replace** the DNS/Vercel config for `research.recoupable.com` with a
  platform-level redirect to `https://recoupable.com/research` and archive the
  `blog/` submodule.

Prefer keeping the redirect shim until Search Console shows the old URLs
dropping out of the index and the new ones fully indexed.

## New Paragraph essays after cutover

Add a row to `PARAGRAPH_RESEARCH` in `marketing/lib/research.ts` with the
`paragraphId`, `slug`, and card metadata. The detail page fetches the body live.
(Authoring still happens in paragraph.com — workflow unchanged.)
