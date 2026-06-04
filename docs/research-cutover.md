# Content cutover — one unified hub at `recoupable.com/blog`

**Why:** We used to split long-form content across three places: a `blog/`
submodule app on `research.recoupable.com`, a `/research` section in the
marketing app, and a `/blog` section in the marketing app. That's redundant and
splits SEO authority. There is now **one source of truth**: `recoupable.com/blog`.

Everything — essays, guides, tutorials, updates — lives at `/blog` and is
filterable by type. The top-nav "Research" link is just a deep link to the
essays filter (`/blog?type=essay`).

## The three content pipelines (all feed `/blog`)

`lib/content.ts` is the unified data layer. It merges:

1. **Blog MDX** — `content/posts/*.mdx` (tactical guides, tutorials).
2. **Research MDX** — `content/research/*.mdx` (in-repo essays).
3. **Paragraph-synced essays** — body lives on paragraph.com, fetched live
   (ISR 1h). Card metadata is cached in `PARAGRAPH_RESEARCH` in `content.ts`.

Each entry is normalized to a `ContentEntry` and bucketed into a
`ContentCategory` (essay / guide / tutorial / update) so the index can offer one
filterable list. Pure types/constants live in `lib/content-types.ts`
(node-free) so client components can import them without pulling the server-only
loader into the browser bundle.

## URL map (301, permanent)

Slugs are preserved 1:1 across every hop.

| Old URL                                                     | New (canonical)                                  |
| ---------------------------------------------------------- | ------------------------------------------------ |
| `recoupable.com/research`                                  | `recoupable.com/blog?type=essay`                 |
| `recoupable.com/research/:slug`                            | `recoupable.com/blog/:slug`                       |
| `research.recoupable.com/` (subdomain)                     | → `/research` → `/blog?type=essay`               |
| `research.recoupable.com/blog/:slug` (subdomain)           | → `/research/:slug` → `/blog/:slug`              |

The `/research → /blog` 301s live in `next.config.ts` → `redirects()`.

## ⚠️ Redirect chain to flatten

The old subdomain (`research.recoupable.com`) still 301s to `/research` via
the retired research app deployment's `next.config.mjs` (outside this marketing
repo). Now that `/research` itself 301s to `/blog`, old
subdomain URLs hop **twice** (subdomain → `/research/:slug` → `/blog/:slug`).

To keep it a single hop, update the retired research app redirects to point
straight at the unified hub:

- `/` and `/blog` → `https://recoupable.com/blog?type=essay`
- `/blog/:slug` → `https://recoupable.com/blog/:slug`

A two-hop chain still passes link equity and works for users; flattening it is a
clean-up, not a blocker.

## Cutover checklist

1. **Marketing app** — live: unified `/blog` index with filter tabs,
   `/blog/[slug]` rendering all three pipelines, `/research → /blog` 301s, nav +
   footer + homepage + consulting links repointed, sitemap + `feed.xml` rebuilt
   off `getAllContent()`. ✅
2. **Flatten the subdomain redirects** in the retired research app deployment
   (see above), then redeploy it. Keep that deployment alive so the subdomain keeps 301ing.
3. **Verify** old URLs land on the canonical `/blog/*`:
   ```bash
   curl -sI https://recoupable.com/research/open-labels | grep -i location
   # → location: https://recoupable.com/blog/open-labels
   curl -sI https://research.recoupable.com/blog/open-labels | grep -i location
   # → location: https://recoupable.com/blog/open-labels   (after flattening)
   ```
4. **Search Console** — submit the updated sitemap
   (`https://recoupable.com/sitemap.xml`, now all under `/blog`). Use Change of
   Address to consolidate the subdomain into the root domain.
5. **Backlinks** — update any links you control that point at
   `research.recoupable.com` or `recoupable.com/research` (social bios, docs,
   READMEs) to `recoupable.com/blog`.

## New Paragraph essays after cutover

Add a row to `PARAGRAPH_RESEARCH` in `lib/content.ts` with the
`paragraphId`, `slug`, and card metadata. The detail page fetches the body live.
(Authoring still happens in paragraph.com — workflow unchanged.) New in-repo
posts go in `content/posts/*.mdx` (guides/tutorials) or `content/research/*.mdx`
(essays); category is inferred automatically.
