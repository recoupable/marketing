# AGENTS.md

This is the Recoup marketing site — public website, blog, SEO pages,
subscribe flow, CRM integration, and shared content/context for the full
marketing funnel.

## Shared GTM workspace

For enterprise audience research, sales/content methods, or GTM tooling, start at
[`gtm/AGENTS.md`](gtm/AGENTS.md). It consolidates the old GTM runtime and selected
consulting research into this repository. Build new GTM workflows under `gtm/engine/`,
an independent Node package with its own install and checks. This repository is public;
private runtime data and credentials must remain outside Git. GTM research is repository
context, not an automatically published website section.

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
agent/            — Public website assistant: Eve instructions, tools, session state and visitor evidence/confirmation hooks
components/website-agent/ — Company header, chat turns, source findings, question composer and streaming report artifacts
lib/website-agent/ — Public website reading, source validation, conversation helpers, fixed scorecard rubric and report-readiness schemas
lib/docs/         — Documentation helpers (llms.txt sections, llms-full corpus, markdown negotiation)
proxy.ts          — Request proxy (Next 16 successor to middleware): serves /docs/* as markdown on Accept: text/markdown or a .md suffix
public/           — Static assets (brand/, icons/, images/)
content/blog/posts.json — Published blog source for pages, feed, metadata and machine discovery
content/posts/    — Legacy MDX sources and historical post index
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
- Public website agent runtime, local checks, discovery requirements and spending boundaries: `docs/website-agent.md`. Research may continue while a question waits. Keep `publish_plan`'s completeness and visitor-confirmed recap checks when changing the audit flow; a fixed number of answers is not report readiness.
- Website-agent structured responses stream through `hooks/useStreamingMessages.ts`. Keep source verification, brief confirmation, and final-result-only downloads when modifying partial response views. Initial AI setup choices live in `lib/website-agent/aiSetupQuestion.ts`.
- Question tools include a short `message` that streams in the conversation before the question appears in the composer. `getConversationTurns` uses Eve's received-message and step events to keep earlier conversation in place when the visitor answers during research; preserve this event-based ordering and reload behavior.

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
3. Prepare drafts outside `content/blog/posts.json`; every entry in that file is public when deployed. After publishing approval, add a post matching `BlogPost` in `lib/blog.ts`.
4. Use `coverImage` for the article hero/social image and `thumbnailImage` for approved archive artwork. Store local delivery assets in `public/images/blog/<slug>/`; body image URLs must start with `/images/`. Omit duplicate H1/hero images, private frontmatter and source paths from the public body. Preserve the existing featured entry unless asked to replace it.
5. Run `pnpm build` and the blog/metadata checks. Update `content/posts/INDEX.md` and `content/STATUS.md`.

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
- **Page copy:** `lib/copy/` — single source for human pages and machine (markdown) view; edit copy there only so both stay in sync. Homepage summaries live in `home.ts`, `home-offers.ts`, and `home-case-studies.ts`; keep detailed offer and pricing data intact for the destination pages. Shared footer copy lives in `footer.ts`.
- NEVER hardcode brand values — import `siteConfig` from `lib/config.ts`, the only site configuration module (origin, app URL, docs path, GitHub URLs, contact email, booking link; `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, and `NEXT_PUBLIC_BOOKING_URL` are read there)

## Integrations

- **Lead capture:** one browser client, `lib/leads/postLead.ts`, posts to `POST /api/leads` on the Recoup api, which owns Attio storage, the triage note, and the Telegram page (chat#1800). Subscribe surfaces call it through `lib/marketing-subscribe.ts`; the music-video quote form calls it directly. Inquiry forms post to the same-origin `/api/inquiries` proxy (`lib/inquiries/`), which validates `source` against `lib/inquiry/inquirySourceSchema.ts`, de-duplicates, forwards `kind: booking`, and returns `{ ok: true, submission_id }`. Marketing holds no Attio client and no `ATTIO_API_KEY`. The api base is `siteConfig.apiUrl` (`lib/config.
- **Attribution:** one store, `lib/attribution/` (`recoup:acquisition:v1` in sessionStorage, first + latest tagged visit). Forms read it with `currentReferralAttribution()`; CRM notes render it via `describeAcquisitionTags()` as `source=x; medium=y; campaign=z` (no underscores, Attio notes are markdown). App links go through `lib/appLink.ts` / `<AppLink>` and carry `utm_source=marketing&utm_medium=<placement>&utm_campaign=sky`, the visitor's own tags winning.
- **Analytics:** Vercel Web Analytics (`<Analytics />` in `app/layout.tsx`); custom events go through `lib/analytics/trackEvent.ts` only, and props never carry visitor details. Funnel events: `cta_clicked {cta, placement, plan?}` (`<TrackedLink>`), `pricing_billing_toggled {billing}`, `inquiry_started {source, plan?}`, `inquiry_submitted {source, plan?, budget?, timeline?, company_type?, submission_id}`, `inquiry_failed {source, reason: validation|network|rejected|timeout}`, `subscribe_submitted {source}`, `audit_completed {score}`, `roi_calculated {recommended_plan}`, `podcast_platform_clicked {platform}`, `podcast_episode_clicked {slug, platform}`, `podcast_guest_requested {placement}`.

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

API reference pages render an in-page playground under the Request section (`components/docs/playground`, pure logic in `lib/docs/playground`). It sends requests to `siteConfig.apiUrl` from the browser; the visitor's api key lives in `sessionStorage` only (`recoup:docs:api-key`) and is masked in the generated curl. Multipart uploads and event-stream endpoints show the curl and a terminal note instead of a Send button.

The footer's `FooterSignup` (`components/sky/footer-signup.tsx`, email only, `source: /footer`) and the resources, playbook, and blog `SubscribeCard` (`components/marketing-migration/subscribe-card.tsx`, name + email) are presentational wrappers over `hooks/useSubscribeForm.ts`. The hook owns the hydration guard, the single in-flight submit, the status/error state, the `subscribeToRecoup` call (`lib/marketing-subscribe.ts`, `kind: subscribe` through the central lead API with acquisition tags), the focus move onto the confirmation, and the `subscribe_submitted` event.

## Documentation (`/docs`)

- Source of truth: `content/docs/source` (MDX pages, `docs.json` navigation, `api-reference/openapi/*.json`). Edit there; the `recoupable/docs` repository is not read.
- After editing, run `pnpm docs:build` and commit the generated `content/docs/inventory.json`, `manifest.json`, and `navigation.json` together with the source change. `scripts/__tests__/build-docs.test.ts` fails when they drift.
- `pnpm docs:check` validates route coverage, schema references, guide links, and request examples.

## Agent discovery

- `/llms.txt`, `/llms-full.txt`, `/agents.md`, `/agents/catalog.json`, and `/agent-api/v1/*` are built from `lib/agent-content.ts` and `lib/agent-discovery.ts`. Documentation descriptions pass through `lib/resolve-description-links.ts` so docs-root links carry the `/docs` prefix everywhere they are published.
- `/api/machine` is a permanent redirect to `/llms.txt`.
- Legacy URLs (`/company/about`, `/company/recoup-records`, `/company/recoupable-records`, `/learn`, `/build/start`, `/advisory/book`) are 308 rules in `next.config.ts`; add new aliases there, not as redirecting page files.

## Shared navigation

The header has four primary items: Services, Products, Resources, and Pricing. Menu destinations live in `lib/copy/navigation.ts`; `components/sky/header-nav-items.tsx` renders them for both desktop and mobile. Keep changes in this shared configuration so the two navigation layouts stay aligned.

Dropdown presentation lives in `components/sky/navigation-panels.css`. Products uses three decorative SVG illustrations from `nav-product-art.tsx`; Resources pairs compact icon links with one illustrated Work card from `nav-work-art.tsx`. Desktop panels extend the full header width without a gap. `site-header.tsx` opens them on fine-pointer mouse hover and delays closing by 180ms when leaving the header. Mobile keeps tap disclosures and hides the artwork. Preserve keyboard, Escape focus return, and outside dismissal.

## Platform and ownership previews

The `/platform` hero uses `components/platform/PlatformChatPreview.tsx` and its scoped stylesheet. It is a static workspace preview with a short release-planning exchange and document output. Keep mock controls unfocusable; do not add a visible illustrative/fictional caption. The real app action uses `AppLink` for attribution. Platform copy lives in `lib/copy/platform.ts`, shared by the page, preview, metadata, and machine-readable summary. Describe Platform as the ready-to-use, hosted AI workspace for music teams. Its heading sequence explains chat over artists/catalogs/releases, built-in tools, hosting and open source, alternatives for existing agents, and custom services. Public app source links use `siteConfig.platformSourceUrl`; Skills and API/MCP links lead to their own product pages. The unboxed `PlatformContextArt` is decorative. `PlatformToolsDemo` is the only interactive product illustration: native buttons with `aria-pressed` switch local research/content/recurring examples in a polite live region. Keep the rest of the page server-rendered, keep copy in the shared module, and do not imply that the demo schedules real tasks. Preserve the contrasting layout sequence: open collection artwork, dark tools showcase, hosting and source composition, aligned alternative-path cards, and compact split FAQ. Do not reintroduce repeated pale panels or the duplicate closing CTA.

The homepage ownership section uses `components/home/sky-ownership.tsx` and `sky-narrative.css`: a blue panel with three unnumbered deliverables, visually distinct from the pale process section. Its copy and ownership terms remain in `lib/copy/home.ts`.

## Homepage announcement

The hero announcement links to `/skills` and reads “Catalog Skills V2 is here.” Its copy lives in `components/home/sky-hero.tsx`; the New badge, hover, and link styling live in `components/home/sky.css`. See `DESIGN.md` for presentation guidance.

## Brand Studio

The native Next.js library lives at `/brand` (Finals) and `/brand/experiments`. `components/brand-studio/BrandStudio.tsx` owns the React UI; `brand-studio/` owns the asset catalogue, original media, and legacy authoring tools. Preserve its approved DM Sans / IBM Plex Mono Sky styling and exact artwork. SiteFrame omits marketing chrome only for /brand routes; shared analytics stay intact.

- `pnpm brand-studio` runs the marketing app on port 3012. Open http://localhost:3012/brand.
- `pnpm dev`, `pnpm build`, and `pnpm start` include the same pages. No separate site is required.
- `/brand-studio` redirects to `/brand`; legacy kit HTML is served under /brand through the media route.
- `pnpm brand-studio:index` rebuilds review-board-assets.json, retaining asset IDs. studio-finals.json sets defaults.
- The review storage key stays recoup-brand-review:v1. Page assignment stays independent of Keep / Maybe / Pass. Export/import reviews across origins.
- /brand is excluded from indexing and the marketing sitemap. It is not access-controlled.
- Run `pnpm test lib/brand-studio/__tests__` and `pnpm build` after integration changes.

Recoup Platform is the public name of the hosted product; retain `/platform` and the `platform` pricing identifier. After the artist/catalog/release composition, the open editorial audience section explains use without a custom build, music-specific operations, and branded artist/client portals. Keep these reasons in `platformCopy.audience` so headline-only readers and machine summaries receive the same narrative. Product navigation, homepage software links, footer, and pricing use Recoup Platform.

The Platform page ending pairs the hosting headline with a blue source illustration linking directly to the public app repository. Alternative-agent and custom-build options use aligned white/dark-green cards in one shared frame. Keep the FAQ compact, source links keyboard accessible, and all three areas stacked on phones.

Platform section spacing uses roughly 100–140px on desktop and 70–100px on phones. Apply the shared `data-reveal`/`data-reveal-group` hooks to headings, artwork, audience reasons, tool choices, and ending content. Keep the hero immediate and avoid nested reveals; the shared controller handles reduced motion, anchor navigation, and focused controls.

Services uses the same three-option illustrated dropdown as Products, with Advisory (`/advisory`), Build (`/build`), and Training (`/training`). Service artwork lives in `nav-service-art.tsx`. Desktop and mobile use shared navigation data and native disclosures. Training copy is shared with machine summaries through `lib/copy/training.ts`; its inquiry action uses the existing Team training workflow.

## Podcast

`/podcast` lists the Recoup Podcast episodes from `content/podcast/episodes.json` (validated by `lib/podcast/episodeSchema.ts`; `readEpisodes.ts` keeps the file order, which is the page order). Each card shows the wide cover from `public/podcast/`, the duration, the title with the guest, and one action: Watch now when a YouTube link exists, otherwise Listen now (`episodeAction.ts`). The page and its components are styled with Tailwind utilities (no page stylesheet); heading and paragraph type utilities carry `!` because `app/globals.css` sets unlayered `h1`/`h2`/`h3`/`p` rules that outrank the utilities layer. The show sidebar (`components/podcast/`) carries the title card, platform links from `siteConfig.podcast`, the shared subscribe form under the `/podcast` source, and the guest invitation to `/start-project?workflow=Podcast%20guest` (`GuestInviteLink`, reports `podcast_guest_requested`), which preselects the `Podcast guest` interest and swaps the page and form copy to an invitation without the qualification block (`lib/inquiry/startProjectCopy.ts`, `inquiryLabels` guest mode). Episodes come first in the DOM; the desktop grid places the sidebar on the left. Copy lives in `lib/copy/podcast.ts`, shared with the agent summary in `lib/agent-content/podcastPages.ts`. Podcast replaces About in the Resources dropdown; About stays in the footer. Add an episode by inserting it where it should appear in the JSON and dropping its cover in `public/podcast/`.

## Blog thumbnails

`app/blog/article-art.tsx` assigns a distinct editorial SVG composition to each illustrated article slug. `BlogArt` retains the featured decision guide and the original Skills cover. Never assign art by list position or rotate generic themes. When adding a post, review its thumbnail against the article and extend the mapping; `tests/blog-thumbnails.test.tsx` checks complete coverage and unique compositions. See `docs/blog-thumbnail-audit.md` for the September 2026 audit.

The blog archive renders every result in the same thumbnail grid, without search/category controls. Preserve thumbnails throughout the list; do not reintroduce a separate text-only archive after the first six entries.

The blog uses the compact, email-only SubscribeCard beside the blog intro on desktop and below the intro on mobile, always before the featured article. Other subscribe surfaces retain their existing fields. All variants share useSubscribeForm for submission, attribution, error state, and confirmation focus. Blog browsing goes straight from the section heading to the full thumbnail grid without filters or a result count.

## Footer navigation

`lib/copy/footer.ts` owns footer link groups: Products, Services, Resources, and Company. Keep the project action and email signup above navigation, with RSS and legal links in the bottom row. The shared footer uses four columns on desktop and two on phones.

## Readiness inquiry handoff

The readiness result action takes visitors to `/contact?brief=readiness`. Only that explicit handoff automatically applies the reviewed browser draft to the inquiry form. It confirms that the answers are included and requires contact details and a separate Send action. Generic agent and calculator drafts retain the manual import step. Missing or expired readiness drafts show a recovery message. Do not submit an inquiry during preview testing.

## Workflow-plan lead magnet

`/workflow-plan` and `/ask` now use the public Eve agent in `agent/`, streamed through `/api/website-agent`. The UI is in `components/website-agent/`: AI Elements for conversation, input, activity, sources, suggestions and report artifacts; shadcn Message Scroller for user-turn anchoring; JSON Render for validated reports. Keep research inside its transcript turn and compact questions inside the input, with the input fixed by the flex layout rather than an overlay. Preserve stopping, steering, source disclosure and download behavior. See `docs/website-agent.md` for configuration, access boundaries and validation. The old `components/workflow-plan/`, `lib/workflow-plan/` and `/api/workflow-plan` interview remain for compatibility. Do not claim email delivery or deployed behavior from local verification.

## AI Scorecard

`/workflow-plan` leads with a five-area AI Scorecard; shared offer copy is in `lib/copy/ai-scorecard.ts`. `record_assessment` stores quoted visitor evidence, `review_scorecard` displays the actual profile, and `publish_scorecard` requires a visitor-confirmed unchanged snapshot. Ratings use `scorecardRubric.ts` and `getAssessmentProfile.ts`: missing context is unscored, never a zero. Public peer examples require read-source quotes and must never become invented percentiles or industry averages. Keep the fixed JSON Render catalog, real streaming, final-only downloads, and the separate implementation-plan gates. See `docs/website-agent.md`.

Follow `getAssessmentFocus` / `record_assessment.nextQuestion` through the current setup before asking desired improvements. Save evidence before choosing the next question; keep goals separate from existing measured results, preserve volunteered priorities, and skip topics already answered. Company identity shares the compact top navigation row; do not reintroduce a separate fixed company card above the conversation.
