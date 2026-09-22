## Workflow result clarity — September 21, 2026

Kept the simple sky intro and single “Get my free AI plan” button; removed the interactive landing preview. All three questions remain inside the questionnaire. Starter plans now describe tangible deliverables (report columns, review queues, shortlists and source-linked checklists), separately from implementation steps. The result page leads with the deliverable and first action before setup details. Eleven focused tests pass. Git remains blocked by the unaccepted Xcode license; changes are local.

## Preview before contact capture — September 20, 2026

The contact screen now reveals the generated task title and output description before asking for name/email. The full brief adds inputs, steps and a first test. Starter mode remains labeled.

## Tangible automation brief — September 20, 2026

Intro now offers a one-page brief: Know what to automate first. Final multi-select asks which concrete deliverables the team would use. Generation adds a required output description with example structure and a 350-word instruction; result and download include it. Legacy outcome labels migrate on restore. Also corrected the answer summary to show each question's own selections. Eleven focused tests pass.

## Animated workflow intro — September 20, 2026

Added a minimal sky intro using the homepage artwork and original mark: Less busywork. More music. One Start action opens the compact questionnaire. Staggered entrance and question transitions respect reduced motion. Existing saved interviews resume; Start again returns to the intro. Mobile 390×844 and start navigation verified.

## Minimal mobile workflow funnel — September 20, 2026

Removed visible introductory heading/subtitle, workflow label, progress bar and shared site header/footer from /workflow-plan. Small Recoup home link, question count, compact choices and full-width mobile primary action remain. First question and all five choices fit at 390×844 without scrolling.

## Generation before contact capture — September 20, 2026

Three answers trigger real plan generation with a dedicated loading screen, then a ready/contact screen. Lead capture unlocks the result. Signed, expiring generated-plan tokens support optional Resend delivery with idempotency and rate limiting; requires RESEND_API_KEY and WORKFLOW_PLAN_EMAIL_FROM. When unconfigured, copy promises on-page viewing only. Eleven offline tests pass; no live email sent.

## Workflow contact capture — September 20, 2026

After three selection questions, visitors enter name and email before generation. Uses the existing lead endpoint with /workflow-plan source and structured answers; capture failures preserve input and block generation. Contact details stay out of AI requests and analytics. Nine offline tests cover workflow validation and lead receipts. No live test lead submitted.

## Multiple desired outcomes — September 20, 2026

The final question now allows multiple selections, including Help me decide alongside specific outcomes. All selections are validated, sent to generation and included in downloaded plans. Prior single-choice drafts migrate without losing the selection.

## No-typing workflow interview — September 20, 2026

Replaced the final free-text answer with six single-choice priorities, including Help me decide. All three interview steps now use selections. Removed the process-writing instruction from the data-use note.

## Shorter workflow interview — September 20, 2026

Removed the current-process question and API requirement. Three questions remain: workflows, information sources, desired result. Existing drafts migrate to the corresponding step. Seven focused tests, lint and production build passed locally.

## Workflow multi-select — September 20, 2026

Question one now supports multiple checked workflows and an explicit Continue button. All choices reach generation and the downloaded brief; saved single-choice drafts migrate on restore. Multi-workflow starter plans compare candidates rather than silently choosing the first. Production build, seven focused tests, TypeScript and browser selection/navigation passed locally.

## Lead-magnet simplification — September 20, 2026

Removed the welcome screen and explanatory sidebar. The page opens directly on question one; selecting a workflow advances immediately. Single centered column, with the data-use note retained before generation. Production build and browser navigation verified locally.

# Workflow-plan lead magnet — September 20, 2026

Local implementation at `/workflow-plan`: four questions, AI SDK structured plan generation, optional plan follow-ups, a clearly labeled starter fallback, download and existing inquiry handoff. Resources, sitemap and machine summaries updated. Production build and focused tests pass; browser flow and brief handoff verified without submitting a lead. Not deployed; Git/PR blocked by the machine’s unaccepted Xcode license. See `docs/plans/workflow-plan-lead-magnet.md` for configuration and release requirements.

---

# Four article corrections — September 14, 2026

Corrected attribution and clarified the work in the ownership, quarterly-report, cross-team rollout and board-reporting articles. Removed the drafting-agent anecdote previously written as the author’s experience. The board article now has an evidence-labeled comparison table. The quarterly-report title names the demonstrated task. Existing article URLs remain stable.

---

# Deal Ingestion Skill article revision — September 14, 2026

Rewrote the investment-memo article around Recoup and the client's one-session customization of the existing free Deal Ingestion Skill. Clarified the firm's ownership of its customized version, added the public skill and Build links, and replaced the cover/archive/social image with a Higgsfield illustration and editable ‘Your own AI deal skill’ headline. The article URL and white-background inline artwork remain unchanged.

---

# Podcast page — September 14, 2026

`/podcast` is live on the branch for recoupable/app#2082: the Recoup Podcast show sidebar (title card, platform links to the Spotify show, Apple Podcasts and the YouTube playlist, subscribe, guest invitation) beside a two-column grid of six seeded episodes with covers and Watch now actions; episodes first on phones. Podcast replaces About in the Resources dropdown. Copy in `lib/copy/podcast.ts`, episodes in `content/podcast/episodes.json`, events `podcast_platform_clicked`, `podcast_episode_clicked`, and `podcast_guest_requested`. Styled with Tailwind utilities; og:image is the title card.

---

# Five executive articles — September 14, 2026

Added five approved articles covering workflow ownership, royalty exports, investment memo examples, cross-team adoption and board reporting. All use the clarified titles, reviewed Recoup thumbnails and white-background inline illustrations (19 WebP images). Editorial revisions distinguish estimates from measurements, proposed rollouts from observed outcomes, and saved instructions from tested workflows. Public copies omit private source metadata.

`content/blog/posts.json` now contains 31 posts. The original executive guide remains featured; the five new articles lead the dated archive. `thumbnailImage` explicitly selects approved archive artwork, preserving older posts' custom illustrations. Image cards use the approved 16:9 proportions to keep thumbnail text and illustrations uncropped. The same published list supplies article pages, RSS, sitemap and machine discovery.

---

# Services navigation and pages — September 14, 2026

Services now opens an illustrated three-option menu: Advisory, Build, and Training. The existing Advisory and Build pages have clearer service headlines; Training is a dedicated page covering practical work, output review, reusable methods, engagement format, and FAQs. Training links into the existing inquiry flow and is included in public routes, sitemap, footer, and machine summaries.

# Recoup Platform positioning and homepage ownership — September 14, 2026

The hosted product uses the restored name Recoup Platform across the product menu, homepage software links, footer, and pricing. The `/platform` URL and pricing identifiers remain stable. A new audience section follows the artist/catalog/release composition: no development team required, music-specific AI, and branded artist/client portals.

The Platform page leads with “A ready-to-use AI workspace for music teams.” Its title-only narrative distinguishes the hosted app from using Recoup tools in an existing agent or commissioning a custom system. The page explains chat over artists, catalogs, and releases; built-in research/content/recurring tools; cloud hosting and open source; Skills/API/MCP alternatives; and bespoke services. The public app source links to `recoupable/app` through `siteConfig.platformSourceUrl`.

Platform sections now have more vertical separation and use the shared scroll fade-in treatment on headings, artwork, and content groups. Reduced-motion preferences and anchor navigation use the existing shared behavior.

The Platform page now replaces repeated pale panels with a floating artist/catalog/release composition, a dark interactive tool showcase, a hosting statement paired with a linked public-source illustration, aligned white/dark alternative-path cards, and a compact split FAQ. Research, content, and recurring-work buttons switch local examples. The redundant onboarding checklist, feature-card tray, and separate closing banner are removed. The compact hero preview retains one release-planning exchange and a campaign-plan document. No visible illustrative caption, redundant labels, or tag lists. The attributed Open Recoup actions and shared plan price remain. Page copy, metadata, and the machine-readable summary share `lib/copy/platform.ts`.

The homepage “Built by Recoup. Owned by you.” section now has a blue surface, lime headline emphasis, and three unnumbered deliverable columns. It follows the pale numbered process section with a distinct composition. Ownership copy and terms remain shared and unchanged.

Production build, focused lint, and 31 pricing, agent-content, agent-discovery, and marketing-funnel tests pass. Desktop and narrow-phone layouts were checked for overflow and readable text. The hero preview has no interactive mock controls. The tool showcase uses native pressed-state buttons with an accessible live output region; its examples do not run real tasks. Changes are on `codex/platform-chat-hero` in PR #109 for review.

---

# Navigation consolidation — September 14, 2026

The desktop menus now open on mouse hover and expand the full header surface. Products retains its three illustrated cards. Resources uses compact Docs, Blog, Lab, and About icon links plus one illustrated Work card; the redundant All resources footer is removed. A short mouse-leave delay keeps the menu reachable. Phones retain tap disclosures, with keyboard and Escape support preserved. Continued on `codex/consolidate-navigation`, PR #105.

The desktop header logo now matches the footer’s 23×28px symbol and 1.2 line height, alongside the existing 28px/600 wordmark and 11px gap. It retains dark ink; the footer and mobile icon-only layout retain their existing styles.

The shared header now has Services, Products, Resources, and Pricing. Products groups Platform, Skills, and Developers; Resources includes Work, About, Docs, Blog, and Lab. Both desktop and mobile use `lib/copy/navigation.ts`, with native dropdowns and nested mobile disclosures. The audit action and all destination pages remain available. This follows merged PR #104 on `codex/consolidate-navigation`.

Validated with a production build, focused lint, and desktop/mobile browser checks covering sibling dropdowns, link navigation, outside-click dismissal, Escape focus, and 320px reflow.

---

# Shared GTM context and tools — September 14, 2026

The shared team home is `gtm/`. Start at `gtm/AGENTS.md` and `gtm/README.md` for enterprise buyer context, the worldwide music-rights company research, Music Moneyball interviews and principles, adapted consulting playbooks, and the next engine build. Consulting originals remain in place; the import is a dated snapshot with provenance, not an automatic sync.

The old GTM app-user tools now live in the independent `gtm/engine` package. Its CRM command previews by default and requires an explicit apply option for writes. Live integration compatibility remains unverified. The account-to-draft workflow, publishing connections, and outcome tracking are next work in `gtm/BUILD_PLAN.md`. No outreach, campaign, or recurring worker was launched by this consolidation.

---

# Homepage copy simplification — September 14, 2026

Tools cards use unnumbered labels and end at their destination links. The Platform price remains visible; Skills and Developers carry usage-cost details on their linked pages.

The closing card now leads with “Recoup your team’s time.”, a short workflow invitation, and the free-audit action. Its implementation pricing note uses separate, smaller typography.

The homepage now uses shorter service, process, ownership, plan, tool, FAQ, and closing summaries. Repeated benefits, inclusions, preambles, and case-study badges are removed; card spacing follows the shorter copy. The approved hero headline and subtitle remain in place. The mission statement keeps its concise copy but has a narrower, balanced text measure and more surrounding space to separate it from the hero and services. Shared footer wording is shorter as well. Services now lead directly into case studies; the redundant “What we can build” links are removed.

Homepage summaries live in `lib/copy/home.ts`, `home-offers.ts`, and `home-case-studies.ts`; shared footer wording lives in `lib/copy/footer.ts`. The machine-readable homepage summary reuses the copy. Detailed service, pricing, and case-study pages retain their content. Homepage plan cards now say “Starting at” and select annual billing by default, displaying the monthly equivalent and full annual charge. Price calculations, plan inquiry attribution, and lead-capture behavior are unchanged.

Validated with a production build, focused lint, pricing/agent-content/internal-link tests, and desktop/mobile browser checks. Merged into main in PR #104.

---

# Sky preview migration — September 10, 2026

The approved Labs site is migrated on `codex/sky-marketing-redesign`. Read `DESIGN.md` and `docs/plans/sky-migration.md` for current UI conventions and production release dependencies. The historical status below predates this redesign. Pricing is now $99 / $999 / $9,999 monthly; checkout provisioning is a production launch gate.

---

---
updated: "2026-04-05"
---

## Now

- Website live: homepage, platform, solutions, developers, learn, company, legal pages
- 1 blog post published (ai-music-marketing)
- Blog system working: MDX parsing, RSS feed, sitemap, JSON-LD
- Subscribe flow: POST /api/subscribe -> Attio CRM
- Vercel Web Analytics active in layout; custom events via lib/analytics/trackEvent.ts

## Focus

Content: publish more blog posts targeting SEO pillars. Wire up the nav menu (lib/nav.ts exists but Header doesn't consume it yet).

## Recently Changed

- 2026-04-05: YAGNI cleanup — flattened from pnpm workspace (apps/web + apps/ops) to single Next.js app at root. Deleted unused components (NavDropdown, ThemeToggle, SubscribeForm). Deleted empty ops app.
- 2026-03-30: Brand context files, copy registry, machine view API
- 2026-03-22: Restructured to pnpm workspace monorepo
- 2026-03-16: Initial scaffold (Next.js 16, Tailwind, content system, SEO pillars)

## Don't Touch
## Stable agent conversation — September 21, 2026

Rebuilt `/workflow-plan` and `/ask` around stable user turns. Thinking and observed research remain beneath the corresponding message; the compact question and reply input stay at the bottom. Official AI Elements now provide prompt input, activity, sources, suggestions, message actions and report artifacts, with shadcn scrolling and the existing JSON report renderer. Corrected duplicate prose after structured results and response ordering for follow-ups sent during research. Seeker/WMG live browser checks, mobile layout, stopping and actual report download verified. TypeScript, scoped lint, all 353 tests and the production build pass locally. See `docs/website-agent.md`; production has not been deployed or verified.
