## Reviewed documentation contracts on current main — October 21, 2026

The maintained docs now combine the reviewed stored-comments, plan/balance,
Sites lifecycle, catalog-range and headless-chat corrections with current main.
Contributor guidance identifies the authoritative source and available tooling.
Existing release-pack direction state and official plugin delivery remain intact.
API runtime behavior is unchanged by this documentation companion. Shared
fixtures are regenerated from these maintained sources, preserving the newer
Content contract rather than copying an older example record over it.

API #1068's pagination repair and #1067's coordinated fixture are now merged.
The inventory pins the actual API merge
`db3cdd16c7225d2090ca74a1a06df8914c6fc379`; regeneration preserves all four
contract sections and the current release-pack Content source. The API source
matches its independently accepted revision. This Marketing revision has its
own checks, normal production build and exact source review; source parity does
not prove publication or a real customer task. Retained Docs must follow the
actual Marketing merge. Manual retained-host repair remains deferred.

## Published editorial inventory — October 20, 2026

`content/posts/INDEX.md` is now generated from the same 32 approved source entries
used by the blog, feed and agent content, restoring the 14 omitted article links.
Dates, titles, categories and publication status come from `content/blog/posts.json`.
Run `pnpm posts:build` after changing approved publication source; CI's
`pnpm posts:check` rejects drift and duplicate slugs. The former index and topic
gaps are preserved as dated history under `content/posts/archive/`; they do not
assert current gaps. Article copy, publication approvals and public routes are
unchanged. Source inventory is distinct from a fresh live publication check.

## Stored fan comment dates — October 20, 2026

The ArtistFan response now documents optional nullable `last_comment_at`, from
API #1057's actual merge `e51d4ed9`. A matching stored comment supplies its date;
missing or mismatched evidence returns null. Profile refresh dates and generic
engagement times are not substituted. This supports a report's Last heard
column without promising live data, complete history or restored GET /api/comments.

The known/unknown response example and resolved schema are frozen into the
shared API fixture. Four provider-free contract cases exercise the actual route
with real validation/projection under mocked access/storage, including array
joins and mismatched evidence. All 77 fan/contract cases, 484 website tests,
14 producer checks and 11 docs checks pass. Existing authentication, artist
access, ordering, pagination and relationship duplicates remain unchanged.
Source and publication review are separate from a live weekly report; no customer
comments, provider request or production write were used.

The refreshed branch preserves current Marketing #196/#198 and the corrected
billing-guide null paragraph. A standards check reproduced another mismatch:
OpenAPI 3.1's JSON Schema rejects null when the new field uses only string plus
legacy nullable. The field now uses string/null types; the standard validator
accepts both documented states and rejects numbers. A focused API companion
updates the fixture and adds a guard without the older nullable extension.
API #1061 is merged as `52a2e218bffdea2b69c0f8a8ba075202b08754d0` after
independent review. The inventory now references that actual release, with the
accepted schema and both fixtures unchanged. Final narrow review and Marketing
publication remain; retained fan docs must follow the actual Marketing merge.
The billing publication from actual #198 remains separate.

## Billing guide null-card correction — October 20, 2026

The saved-card guide now agrees with the corrected Accounts schema: a null card
describes the current lookup, not whether a card was ever saved or whether other
cards remain. It no longer infers the next purchase path from that result alone.
Two regressions cover the maintained guide/schema and generated guide, failing
against the former history claim. Docs #385 remains on hold until this source
correction is reviewed/merged and the publication is regenerated from that actual
merge. The earlier source-copy PASS verified parity, not this semantic omission.
No payment behavior, API fixture, host control or customer billing operation changes.

## Agent discovery contract follow-up — October 20, 2026

The fresh audit confirms the deployed OpenAPI Markdown fallback now passes.
The remaining discovery follow-up exposes the authoritative authentication guide
at `/auth.md`, makes the website API's existing major version explicit in the
OpenAPI server URL and machine-readable policy, and retains typed errors and
enforced quota headers on unsupported tool/batch methods. The conventional
`/api/v1` namespace redirects to the existing public API, whose base URL now
serves its specification through the same quota. Published operation
URLs, IDs, request shapes, quotas, and authentication permissions are unchanged.
The main agent indexes also link the published Python SDK.
JSON and Markdown API responses expose the existing retirement policy with an
RFC 9745 `rel="deprecation"` link. No deprecation or sunset date is announced.
Production publication and fresh audit results for this follow-up remain pending.

## Card removal contract alignment — October 20, 2026

The billing guide and Accounts reference describe the released selected-card
policy: disable automatic purchases before removing one card, preserve other
saved cards, and explain manual purchases, in-progress charges, 400/404/500 and
partial-failure recovery. The nullable card schema describes only the current
lookup, never saved-card history or all-card absence. The public source is
unchanged from independently accepted Marketing `b2bf8839`.

The API inventory now references actual #1056 merge
`098ebde771bf4588415ca448a3476428e60930b9`, replacing the preview-only commit.
All shared fixtures remain unchanged and match that released API. Current
operation-name documentation from #188 and the Python SDK record are preserved.
This narrow release-reference update requires final checks and UI delta review.
After the actual Marketing merge, generate retained Docs from that merge and
verify publication. Hosting repair/cutover stays deferred; no billing call occurs.

## OpenAPI Markdown fallback — October 20, 2026

The agent audit sampled `/openapi.json.md`, which had no matching Markdown route.
Added a static Markdown representation generated from the same complete website
OpenAPI document, with links between formats. The JSON contract remains unchanged.
The response test and hosted readiness audit verify the fenced schema matches the
JSON endpoint exactly.

## Python registry release — October 20, 2026

The MIT-licensed `recoupable` 0.1.0 SDK is published on PyPI from Marketing
`d7933440`. The main-only GitHub `pypi` environment uses trusted publishing.
The release workflow passed its build, strict metadata validation, and SDK tests.
A separate clean registry installation verified the wheel's SHA-256, official
project links, MIT metadata, imports, and all 14 tests. The SDK guide and release
instructions now link to the published package; their site publication follows
the coordinated OpenAPI release.

## Context contract release reference — October 20, 2026

Refreshed the API inventory from the actual #1049 merge `090f9880`, preserving
the posting contracts and the separately classified standard-only evidence tools.
Current Marketing main is integrated with both status records retained. The API
source reference is released; this Marketing publication and hosted customer
attachment/readback acceptance remain separate pending steps.

All 482 tests, 14 contract-producer checks, 11 docs checks, TypeScript, lint and
the local production build pass. The build uses a synthetic public sign-in ID;
it does not verify sign-in or a hosted customer operation.

## Agent task selection — October 19, 2026

The root index and agent instructions share explicit when-to-use guidance for
workflow discovery, readiness and ROI scenarios, implementation briefs, and
authenticated platform operations. The retained documentation index links
directly to these instructions. Tool behavior and account permissions are unchanged.

## Retained-host agent discovery — October 19, 2026

Added a compact custom Mintlify `llms.txt` with a link to the complete maintained
page index and full documentation text. The public website API guide documents
its existing batch endpoint, shared hosted quota, versioned paths, and MCP
connection separately from authenticated music-platform access.

## Public MCP discovery branding — October 19, 2026

The public MCP manifest and handshake share the site's existing 192-pixel Recoup
icon, display title, version, and website link. This metadata update preserves
the five public tools and the separate authenticated platform MCP.

## Platform OpenAPI operation names — October 20, 2026

Added stable operation IDs to the platform's split OpenAPI specifications so
agents and client generators can name every documented operation. Existing IDs,
HTTP paths, request and response schemas, authentication, and availability
annotations are preserved. API PR #1051 is merged at `8edd0bf7` and updates the
documentation fixture hashes without changing runtime behavior. The inventory
now references that released commit. The latest reconciliation preserves the
released Context evidence contracts, all five existing operation IDs, and all
non-ID schema content. All 483 website tests, 14 contract-producer checks,
documentation generation/checks, and the inventory and shared-fixture checks pass.
The API companion passes all 51 contract tests, response-contract type checks,
lint and formatting. The local production build is blocked by worker-port
permissions; the hosted preview build remains a publication gate for the
refreshed Marketing source. Marketing/Docs publication and rescoring remain pending.

## SDK discovery and Go release — October 19, 2026

Go SDK v0.1.0 is published from Marketing `7c93a8f` and indexed on pkg.go.dev.
A clean module-proxy download resolved that exact commit and passed race tests.
The SDK guide adds branded installation examples, package links, authentication
and response guidance to the docs navigation and agent discovery files. Python
remains available from a pinned source revision while PyPI setup is pending.

## Official Python and Go clients — October 19, 2026

Prepared MIT-licensed Python and Go clients for platform JSON endpoints. Both
support API keys or existing Bearer tokens, account identification, bounded
responses, typed errors, explicit timeouts, and credential-safe redirect handling.
Streaming, multipart, OAuth login, and generated method coverage remain outside
the initial release. Empty successful responses are accepted; advertised streams
are rejected before body reads. HTTP errors retain status and Retry-After even
when their bodies exceed the cap. Configuration rejects invalid origins and
unreadable response limits; error messages and Go formatting redact credentials.

Fourteen installed-wheel Python tests, strict distribution metadata validation,
Ruff, Go race tests, and Go vet pass, including accepted empty writes, delayed
streams, deep JSON, timeout/no-write-retry and malformed-response regressions.
PyPI account/trusted publisher setup and registry publication remain pending.
The Go module needs its reviewed release tag after merge. The manual OIDC
publishing workflow and SDK CI are ready; source availability is not publication.

## Agent readiness recovery and discovery — October 19, 2026

Addressed the 71/100 Is Agentic baseline with recoverable Markdown 404s, JSON API fallback errors and a named error schema, platform OAuth metadata aliases and a Streamable HTTP MCP manifest, current OAuth connection guidance, organization contact/address metadata, and a page-first heading outline. Website tools remain anonymous; platform access still requires consent and account membership.

All 465 tests, TypeScript, scoped lint, and the production build pass. The local production server passed all 638 Markdown requests across 319 pages, including 32 blogs. `scripts/audit-agent-readiness.mjs` verifies recovery responses, exact live issuer/resource redirects, the manifest, schemas, CORS, public Markdown downloads, raw heading/dialog order, and organization metadata. Browser checks confirm dialog appearance, opening, tablet artwork visibility, and Escape focus return. Production release and Is Agentic rescoring remain pending.

## Retained evidence association contracts — October 19, 2026

Review follow-up restores field guidance, connects the evidence models to the
response union, reuses the receipt schema in pages, and documents duplicate and
cursor behavior. Focused producer modules and drift checks keep these declarations
aligned with the API; other legacy results retain their existing object fallback.

Prepared a canonical Context contract companion for the current-main API candidate.
It documents three evidence-linking actions, separates standard-only tools from
delegated connections, and freezes exact receipt/page schemas in both fixture
copies. It also preserves the merged supporting-text receipt boundary: metadata
only, no verified file origin, and no added delegated disclosure. The producer now
rejects an evidence action in both tool maps; fixture checks catch classification
and response drift. API #1049 is merged and its database prerequisite is verified.
Marketing publication and independent release review remain pending. This source
work performs no migration or hosted write.

## Public MCP, batching, and compact discovery — October 19, 2026

The anonymous website MCP at `/mcp` exposes the five existing public tools through
Streamable HTTP. `/agent-api/v1/batch` accepts up to ten independent operations
with ordered per-item receipts and a 16 KB total request bound. The manifest,
catalog, OpenAPI and agent guides describe the shipped interfaces and keep
account-bearing platform tools separate. Hosted calls use the Vercel SDK rule
`recoup-public-tools` (120 requests per 60 seconds per IP per region), with policy
headers, recoverable 429s and fail-closed configuration errors.

The root `/llms.txt` is 16,015 characters; the complete documentation link index
is 19,673 characters at `/docs/llms.txt`. Full documentation remains available at
`/llms-full.txt`. Organization metadata includes the verified Recoup LinkedIn
profile. The canonical domain remains recoupable.dev.

All 482 tests, repository lint, TypeScript and production build pass. Ten real-client
MCP scenarios, a 2024-protocol handshake, a mixed-success batch and the readiness
HTTP audit pass against the local production build. The hosted preview passed all ten MCP scenarios and returned 429 with Retry-After
when the shared quota was exhausted. Review also added discovery-file negotiation
coverage and a shared bounded JSON reader. Final review and the next scan remain pending. The prior PR #185
produced a live 100/100 scan; that scan's public saved snapshot was still stale.

## Guarded Git file contracts — October 19, 2026

Documented versioned file reads, observed-SHA updates, canonical paths, returned
encoding, conflict-only and mixed failures, partial-success receipts and explicit
retry behavior. The API/Marketing fixtures freeze the copyable requests and
response schemas; declaration checks also catch removal of selected optional fields.
All 460 Marketing tests, response-contract and inventory Python checks, docs
generation/checks and the local production build pass. The API companion's
44 contract tests pass without provider
or customer writes. The API test/fixture companions are merged; Marketing and the
retained Docs copy still need final-head review and publication. Client adoption,
live-sandbox atomicity
and hosted save/access acceptance remain separate; no production behavior is
inferred from this documentation change.

## Full homepage Markdown — October 17, 2026

Replaced the 215-word homepage summary with the complete 914-word editorial document, generated from the same hero, service, case-study, process, ownership, tool, and FAQ copy as the Human page. Both billing options reuse the pricing calculations and inquiry links. Agent mode, `/index.md`, content negotiation, discovery metadata, and the paginated reader share this full entry.

All 459 tests, scoped ESLint, and the production build pass. An HTML-to-Markdown audit verified all 184 editorial text fragments and 23 links rendered by the Human homepage; Human text and link destinations match current production. The Markdown document contains 25 links because it also includes the two monthly inquiry links alongside the default annual choices. Browser checks confirmed the full document through its final FAQ/closing sections, Copied feedback, returning to Human mode, and identical toggle bounds. Preview is local; publication is pending PR review and merge.

## Markdown merge checks — October 17, 2026

Preserved Brand Studio Markdown downloads during page negotiation, honored explicit Markdown refusal before falling back to plain text, and added the shared CORS preflight handler. Human-mode printing retains the header. Route coverage now includes all JavaScript and TypeScript page extensions. All 455 tests, scoped lint, and the production build pass. HTTP checks passed for 20 Studio Markdown assets, three negotiated HTML routes, four explicit Markdown URLs, and CORS preflight. Merge remains pending checks on this commit.

## Agent navigation palette — October 16, 2026

The Agent header is transparent over the forest-green document canvas, with white navigation text and the existing logo rendered in white. Desktop dropdowns and the mobile menu share the dark palette; lime actions retain dark labels and the selected mode remains a white tab. No header or toggle dimensions changed. The production build and TypeScript pass. Browser checks confirmed transparent header/white logo colors, readable desktop and mobile menus, no mobile horizontal overflow, and identical desktop toggle bounds across modes. The local preview is updated; publication remains pending PR review and merge.

## Stable Human / Agent toggle — October 16, 2026

Kept the shared header mounted in both views and removed the second toggle from the Markdown toolbar. Agent content starts below the measured header; only the human body/footer becomes hidden and inert. The page reserves its scrollbar gutter to prevent horizontal movement while scrolling is locked. Desktop and mobile browser measurements confirmed identical toggle and button bounds before and after switching; Escape returns focus to Human. The production build and all 454 tests pass, and scoped lint has no errors. Updated the local preview; publication remains pending PR review and merge.

## Markdown for every page — October 16, 2026

Added missing page documents, including the blog archive, resource/company/tool pages, plugin pages, podcast episodes, the complete playbook reader, and the API overview. Every published page has a direct Markdown URL and accepts `Accept: text/markdown`; the Agent switch reads the same complete response. Blog articles remain generated from the published source, and podcast documents include their published transcripts. Marketing overviews retain explicit summary labels.

`tests/page-markdown.test.ts` guards actual route and published-content coverage. The production build, TypeScript, and all 454 tests pass. Lint has no errors (39 pre-existing warnings outside this change). A local production-server audit passed 638 Markdown requests across 319 pages, including all 32 articles, plus HTML negotiation, HEAD, and unknown-page checks. Browser verification covered the archive and full article Agent views, Copy Markdown, and returning to Human mode. Publication is pending PR review and merge.

## Company operating model explorer — October 15, 2026

Added `/atlas` with circular company-area and workflow exploration, component search, operating rules, fields, clickable connections and shareable hashes. Derived from the privacy-checked atlas public export with a narrower model-only field allowlist. Resources navigation, sitemap and agent summary included. Verification and publication state: see the feature PR and `docs/company-map.md`; no production claim.

## Usage pagination and social billing contracts — October 13, 2026

Documented opaque timestamp/ID usage cursors, preserved microsecond precision, legacy cursor compatibility, cost/ID tie ordering and nullable response fields. Human API references now display property examples that were already present in Markdown and OpenAPI. Both social scrape references now show the same per-profile micro-dollar prices and corrected insufficient-credit examples; artist-wide billing describes the upfront balance gate and debit for started runs. Added a docs check for unresolved OpenAPI security schemes and shared usage/price fixtures tested against API helpers. All 441 Marketing tests, docs generation and contract checks pass. Coordinated API/Marketing/Docs PRs and final preview/publication checks remain required; no paid scrape or historical billing discrepancy is asserted. Mintlify routing/cutover repair remains deferred.

## Recoup contract reconciliation — October 11, 2026

Restored 15 artist and track research references under Recoup branding. Public examples use opaque research IDs or ISRC/Spotify/Apple Music identifiers; Recoup owns the data connections. Kept coverage, history, billing and error limits explicit. Added a publication guard against vendor names and credential-operation notes. Canonical documentation and the retained Docs host publish from one committed source. Auth, creative/lipsync, billing and headless fixes remain coordinated through mono#318; merge, deployed artifact inspection and fresh OAuth host checks are still required.

## Release-player guide clarity — October 10, 2026

Rewrote the public guide around creating, publishing, sharing, embedding and measuring a player. Removed deployment variables, migration instructions, internal rollout history and component/skill roadmap notes. Kept subscription behavior, secure embed handoff, workspace ownership, consent and reporting limits. Publication pending review and merge.

## Release-player documentation — October 10, 2026

Added the shipped release-player guide and seven API operations to the marketing site’s documentation source. Covers sharing/embedding, publication and revisions, Spotify playlist browsing, Free-account playback policy, anonymous Apple sessions, organization-owned fan relationships and player activity limits. Generated website and agent indexes include these pages. The shared component library and dedicated building skill remain proposed. The production build, docs checks and agent-index parity tests pass; local served guide, Markdown, OpenAPI and LLM indexes are verified. Marketing publication is pending PR merge and production verification.

## Private purchase-link downloads — October 10, 2026

Checkout returns directly to the plugin download with a private purchase link. The same link is emailed after verified payment. Downloads verify the paid Stripe session and active subscription server-side; no second sign-in or app redirect. Rebuilt customer bundle.2 with updated instructions. Checkout remains disabled pending private storage and an end-to-end test purchase.

## Download card polish — October 10, 2026

Shortened the post-payment download copy, replaced the repeated file row with a compact layered plugin graphic, and reduced setup instructions to one line. Desktop/mobile reviewed; download and authentication behavior unchanged.

## One-download plugin delivery — October 10, 2026

Removed the AI picker and install steps from the website. Setup is now a single authenticated download; one ZIP contains the customer plugin, official Codex/Claude/Cursor manifests and START HERE.html. Checkout tags plugin purchases for the companion API webhook email. No payment or email delivery has been tested live; checkout remains disabled.

## Compact plugin setup — October 10, 2026

Redesigned setup as one split installation panel with a compact product summary, app selector, numbered steps and copyable commands. Inline commands stay inline; compatibility details are collapsed. Preserved subscription checks and download authentication.

## Shipped plugin delivery — October 9, 2026

Replaced the homegrown 31-skill preview package with the official customer release `plugin-v2026.1008.2` (34 skills + MCP), verified against its published SHA-256 and staged unchanged. Setup now presents Codex, Claude Code and Cursor installation followed by the bundled Recoup connection. Removed individual skill-upload and manual API-key setup instructions. ChatGPT distribution remains submission/review pending per the release manifest; private storage and payment verification still gate checkout.

## Plugin fulfillment implementation — October 8, 2026

Added `/label-in-a-box/setup`, email sign-in, server-verified private downloads, and on-demand Starter checkout through the existing Recoup API. Added a deterministic allowlisted ZIP builder from a pinned public Skills commit with individual Claude skill archives, manifest hashes, and license. No Stripe objects or live subscriptions changed. Payment activation stays off: private artifact hosting and live client/payment verification remain outstanding. ChatGPT authentication is explicitly unsupported pending verification; setup does not claim a successful payment from URL parameters.

## Starter plugin subscription — October 8, 2026

Changed the label-kit offer to $19/month, including Recoup Starter access, $20 monthly usage credits, and ongoing skill updates. Updated hero CTA, receipt, preview dialog, onboarding copy, metadata, and FAQs. Legacy one-time checkout configuration cannot activate this offer. Checkout remains preview-only pending verified subscription fulfillment and plugin delivery; no Stripe objects changed.

## Compact role examples — October 8, 2026

Replaced the oversized audience document mockups with a compact role selector, one example request, and three concrete deliverables per role. Removed redundant headings, outcome chips, and illustrative sheets. Verified artist, manager and label switching and 320px layout; production build and scoped lint pass.

## Audio-to-business motion graphic — October 8, 2026

Replaced the sequential chat list with an illustrative audio-file drag/drop, typed prompt, send, and four-panel business reveal. The send shifts the canvas from cream to dark green with a single light burst, radial accents, and staggered expanding cards. Keeps explicit playback controls and static reduced-motion output; no actual file upload or AI work is performed.

## Animated plugin conversation — October 8, 2026

Extracted the hero chat into a client component with a viewport-triggered, one-pass CSS sequence: request, response, four weekly steps, then release document. Added Pause/Play and Replay controls, a stable layout, and a reduced-motion static view. This remains an illustrative demo, not a live Claude connection.

## Chat-led plugin hero — October 8, 2026

Replaced the large purchase card with an illustrative Claude + Recoup release-planning conversation. Reduced headline and body sizes, restored a compact single price-bearing CTA, and kept the $99 price in preview only. The conversation is a static example, not verified plugin output or an interactive chat.

## Single hero purchase card — October 8, 2026

Replaced the label-kit hero’s illustrative output cards and standalone price/button row with one purchase card showing the plugin, $99 preview price, included files and guides, and CTA. Approved headline and subtitle remain unchanged; examples remain below the hero. Checkout stays in preview.

## Purchase-focused plugin hero — October 8, 2026

Added a user-approved $99 placeholder price, price-bearing CTA, and one-payment terms to the hero. The receipt and preview dialog share the same display price. This fallback never enables Stripe checkout; the existing configured-offer gate remains intact.

## Named-agent toolkit headline — October 8, 2026

Updated the label-kit hero to the approved “Let Claude and ChatGPT manage your music business.” headline, with their marks alongside the names and concise research/release/campaign supporting copy. Checkout and client setup verification remain pending before launch.

## Clearer toolkit offer — October 8, 2026

Simplified the hero to “AI tools for your music business.” with download/install instructions and three literal output labels: artist research, release plans, and marketing content. Removed fictional campaign titles and redundant sections. One-time Stripe checkout remains in preview pending offer configuration and fulfillment.

## Buyer-focused label kit revision — October 8, 2026

Rebuilt `/label-in-a-box` around the artist, manager, and label buyer: outcome-led hero, original campaign artwork, role-specific requests and output previews, a simpler setup story, and one-time purchase details. Applied design-visual-experiences and copywriting guidance. Assets and documents are labeled illustrations, not verified kit output. Checkout remains in preview. Production build and scoped lint pass; all three roles, image loading, purchase dialog, and desktop/390px/320px layouts were checked in the browser.

## Label kit landing-page preview — October 8, 2026

Added an unlisted, noindex `/label-in-a-box` offer for packaged Recoup Skills, MCP setup, and starter files. One-time purchase UI opens a preview dialog until a price label and Stripe Payment Link are configured. Pricing, ZIP assembly, webhook fulfillment, and private download delivery remain pending; see `docs/plans/label-in-a-box.md`. Production build, scoped ESLint, three checkout configuration tests, desktop and 390 CSS-pixel browser checks passed locally. No payment product created and no production release.

## Reporting page shared navigation — October 6, 2026

Restored the main website header, footer and Human/Agent toggle on `/royalty-reporting`. Removed the duplicate landing-only header/footer and their styles. The inquiry CTA remains in the hero.

## Inquiry layout repair — October 6, 2026

Moved compact inquiry styles into the shared component so direct landing-page visits receive full-width summary and optional rows, readable buttons, and select controls. Simplified reporting inquiry copy and stacked the layout before controls become cramped. Verified local desktop, 990px and 390px layouts and the shared start-project form; production verification follows deployment.

## Focused royalty-reporting inquiry page — October 6, 2026

Added `/royalty-reporting` with a synthetic report example, public case-study proof, and the shared inquiry form. Added creative and stable ad identifiers to bounded acquisition attribution. Two illustrative square creative assets accompany the page. See `docs/royalty-reporting-funnel.md`. Local checks are separate from production deployment and ad serving.

## 2026-10-06 — ChatGPT Ads inquiry conversion tracking

Added the supplied OpenAI pixel to the root layout and `lead_created` after validated inquiry receipts. Live marketing domains only; preview hosts, Global Privacy Control and Do Not Track skip loading. Random event IDs deduplicate repeated receipts within the page session; the content-derived receipt stays local. Form fields are not explicitly included in the event payload, and newsletter events are not sent. Ads Manager has a Project inquiry submitted conversion using Lead created. See `docs/chatgpt-ads-conversions.md` for verification and SDK matching/consent behavior. Implementation and automated checks are separate from deployment and live event receipt.

## 2026-09-29 — Concrete AI capabilities and product output

Sharpened custom AI intake copy with titled capabilities and a clearer discussion of scope and starting point. Added a compact preview linking to the existing real weekly report from the Recoup platform (originally published in #82 using public streaming data). It is labeled as platform output, not a custom client case study. Form fields and submission behavior are unchanged. This revision is local until PR #139 is merged and deployed.

## 2026-09-29 — Custom AI system positioning

Replaced the software/consultation-led pitch with “Your business. Your AI.” and a concrete offer to build a custom AI system around company knowledge, tools and workflows. Removed the case-study block. The form says “Let’s build your AI system” and “Start my AI project,” while retaining the email conversation as the next step.

## 2026-09-29 — Consultation offer

Reframed custom platform intake around choosing the right first build. Added three consultation topics and the existing published royalty-reporting example, with a clear consultation request heading, email scheduling explanation and matching success copy. The compact fields, validation, plan context and delivery paths stay intact.

## 2026-09-29 — Tighter project intake

Custom systems intake now leads with “Build your platform.” and a short email follow-up explanation. Removed the repeated form heading and required-field explainer, tightened spacing, shortened budget/timing labels, and changed the action to “Send inquiry” with a forward arrow. Explicit Custom systems links show the submitted project type with a keyboard-accessible Change button; general intake keeps the dropdown.

## 2026-09-29 — Intake polish

Removed the note beneath the compact project intake submit button. Native dropdowns now use an inset chevron and dedicated right padding so arrows and selected values stay clear of the edge; forced-color mode retains the system arrow.

## 2026-09-29 — Shorter project intake

Removed audit language from project intake, metadata and agent-readable content. The form now shows six fields, with optional company and note in a disclosure. Budget and timing require an explicit choice; current tools remain optional. Submission and email recovery retain all answers and selected plan context, recording an email domain only as an unverified research hint. Podcast and other inquiry validation remain separate.

## Get Started navigation dialog — September 29, 2026

Replaced the header and mobile-menu audit CTA with Get Started and the existing arrow. Both open a native modal with Try Our Platform (attributed app link) and Build Your Platform (`/start-project?workflow=Custom%20systems`, with Custom systems preselected) cards. Cards sit side by side on desktop and stack on phones. Platform uses Sky blue and Build uses forest green, with white text, trailing lime forward-arrow discs and shadow/arrow hover feedback that respects reduced motion while keeping the cards level. The shorter “Get started with Recoup.” heading, concrete descriptions and 20% smaller illustrations make the dialog more compact. Desktop arrows align at the bottom right; mobile arrows center on the trailing edge. Each card remains one link. Escape, close button, backdrop dismissal, background inertness, and focus return are preserved. Production build (Node 24 with the existing public Privy app ID), TypeScript, scoped lint, and desktop/390px browser checks passed locally. Not deployed.

## AI workflow handoff article — September 28, 2026

Published the reviewed “Your AI lives in one person's head” revision at its existing URL, with active Recoup service framing, a catalog-report handoff example, and an inquiry CTA. Retained the reviewed cover and three inline illustrations. Publication date is September 28, 2026, as confirmed by Sidney. Removed the separate modification date.

## Established methods in present tense — September 27, 2026

Updated catalog-reporting copy and excerpt to describe Recoup’s working method in present tense. Preserved the illustrative numbers/output and review conditions. Reframed rollout advice as a recommendation, without claiming planned department work has happened.

## Catalog reporting article — September 27, 2026

Prepared the approved article on agent-assisted catalog reporting for publication, with a Recoup CTA, existing cover and three reviewed inline diagrams. Kept the featured blog entry unchanged. Public body excludes private source metadata. Deployment verification is recorded with the publication receipt in Business.

## Compact mobile mode placement — September 23, 2026

Removed the View as label and placed the Human / Agent toggle beside Pricing in the mobile menu. Expandable sections and the audit CTA remain full width. Desktop and mode behavior are unchanged.

## Lighter navigation and viewing toggle — September 23, 2026

Kept Human / Agent as a compact neutral segmented toggle with a white selected tab so the lime audit CTA remains prominent. Mobile keeps it in a View as row inside the hamburger menu. Removed the hamburger/close icon background while preserving its 44px target. Simplified mobile navigation with thin section dividers, unboxed nested links, smaller descriptions and lighter panel shadow. Verified the expanded mobile menu and desktop mode switching locally; production build and TypeScript pass. Not deployed.

## Mobile viewing mode in navigation — September 23, 2026

Moved the Human / Agent switch inside the hamburger menu at the existing 900px mobile breakpoint and removed its standalone mobile header row. Desktop placement remains unchanged. Returning from Agent mode focuses a visible toggle or the hamburger when the menu is closed. Verified the mobile menu and mode round trip locally; production build and scoped lint pass.

## Recoup-branded viewing control — September 22, 2026

Moved Human / Agent from the floating bottom overlay into the site header so it cannot cover hero content or customer logos. The responsive header reserves a second row on smaller screens. The same control appears in the Agent document toolbar. Uses Recoup Sky rounded pills, DM Sans controls, forest green and lime accents; document text stays IBM Plex Mono. Focus follows the active mode and returns to the Human control without scrolling.

## Human / Agent viewing mode — September 22, 2026

Added a fixed bottom Human / Agent toggle to the shared marketing shell, excluding Brand Studio and the focused /ask and /workflow-plan flows. Agent mode dissolves into a dark, selectable Markdown document using the existing public content API and its summary/full labels. Reads all continuation chunks, supports copy/retry/Escape and reduced motion, and preserves the mounted human page and scroll position. Mode resets on route changes.

Production build, TypeScript and scoped lint pass. Live desktop and narrow-layout checks verified content, copy feedback, Escape, no horizontal document overflow and identical scroll position after returning. An initial sandbox-related Turbopack failure cleared after preserving its cache and rebuilding. Not deployed.
## Specific AI setup choices and streamed responses — September 22, 2026

The opening question now distinguishes no AI use, ChatGPT / Claude Team plans, agents answering difficult catalog/business questions accurately, and agents completing full workflows autonomously. Follow-ups verify actual tools and capabilities instead of assuming them from a selection.

Questions, sourced findings and reports now render real incoming Eve tool arguments through AI Elements and JSON Render. Source verification, context review and visitor confirmation remain required; report downloads appear only after the completed result validates. Live Seeker/WMG checks covered continued research, the four choices, 390 CSS-pixel reflow, a sourced Recoup answer, and a report visibly growing before completion. See `docs/website-agent.md` for the validation receipt. The isolated preview uses port 3018; the existing 3017 checkout remains untouched.

All 385 tests, scoped lint, TypeScript, the app production build and separate Eve runtime build pass locally. Not deployed.

## Context before reports, broader research — September 22, 2026

Replaced the bare website message with a compact company header and Change action. Added native Eve/Parallel web search and independently sourced findings while the setup question remains open. Reports now require visitor-confirmed business context (team, priority, current process, problem, workload, success), actual AI/tools/data, prior attempts, a test owner and constraints. The agent presents the stored brief for review; the publishing tool blocks incomplete or unconfirmed briefs regardless of question count.

Live local checks reproduced the old cumulative-token cutoff after three short replies; raised the input allowance while retaining the $3 model-token cap. The corrected flow asked a fourth context question, then accepted a detailed synthetic scenario, showed its recap and published only after Build my report. A separate unanswered-question run opened two external articles and displayed a cited finding. Company Change/prefill and a 390 CSS-pixel layout also passed. App and Eve runtime builds, TypeScript, scoped ESLint and the automated suite pass. This is local verification, not a deployed-service claim. See `docs/website-agent.md` for readiness and search-spending boundaries.

## Question composer follows chat reference — September 22, 2026

Replaced the horizontal answer tiles with simple vertical choices, circular number markers, a quiet Question header and a shared custom-answer row with Skip/Send. Clicking an answer now selects it for review before sending; custom typing clears that choice, and the next question cannot inherit it. Local browser review covered desktop, 390px phone width, selection, custom input, collapsing and context disclosure. The conversation and research remain intact.

## Individual research page failures — September 22, 2026

Seeker's `/hiphop50` link returned HTTP 404 after four successful reads. The activity trail previously labeled that as a failure of the whole domain and the tool discarded the HTTP status. Source failures now retain safe diagnostic details and identify the specific page; recovery guidance preserves successful sources and continues relevant research. Regression coverage includes missing pages, unsupported formats, retained research and safe errors.

## Integrated question composer — September 22, 2026

Refined the question and reply field into one compact surface: evenly sized numbered answers on desktop, full-width answer rows on phones, an inline information control, Skip, and collapsible choices. Removed the separate explanation row and full-width divider, reduced the frame's visual weight, and made the disabled send control neutral. Live browser review covered desktop and a true 390 CSS-pixel phone viewport, no horizontal overflow, explanation/keyboard dismissal, collapsing choices, and Skip advancing to the next researched question.

## Research continues during context questions — September 21, 2026

Removed the website agent's instructions to stop after asking its opening question. It now follows relevant homepage links while the question waits, preserving one unanswered question and treating missing setup details as unknown. Live local WMG test checked five sources without any answer submitted; the original AI-use question remained available in the composer. See `docs/website-agent.md`.

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
