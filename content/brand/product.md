# Product and source guide

Updated October 20, 2026 against Marketing source `296b8501`. This is contributor
context for the current website. Source implementation or documented capability
is separate from a completed customer workflow, payment or provider operation.

## What the website presents

Recoup helps people who create, own and invest in music put AI to work. The site
presents Advisory, Build and Training services alongside Recoup Platform,
open-source Skills and developer access. Use the maintained
[homepage copy](../../lib/copy/home.ts), [offers](../../lib/copy/home-offers.ts)
and [navigation](../../lib/copy/navigation.ts) for current names and destinations.
Historical brand strategy does not prescribe a replacement hero or menu.

## Current sources and owners

| Subject | Maintained source | Responsibility |
| --- | --- | --- |
| Website, app, API and contact destinations | [`lib/config.ts`](../../lib/config.ts) | Marketing; preserve configured environment selection |
| Navigation and homepage | [`lib/copy/navigation.ts`](../../lib/copy/navigation.ts), [`lib/copy/home.ts`](../../lib/copy/home.ts) | Marketing; align human and Markdown copy |
| Marketing design and fonts | [`DESIGN.md`](../../DESIGN.md), [`app/globals.css`](../../app/globals.css), [`app/layout.tsx`](../../app/layout.tsx) | Sky design; DM Sans Variable and IBM Plex Mono |
| Published articles and planning inventory | [`content/blog/posts.json`](../blog/posts.json), [`content/posts/INDEX.md`](../posts/INDEX.md) | Editorial; generate the index after approved source changes |
| Public platform contracts | [recoupable/docs-site](https://github.com/recoupable/docs-site) | Author in docs-site; API owns behavior |
| CLI identity and setup | [Maintained CLI guide](https://docs.recoupable.dev/cli) | `@recoupable/cli` package, `recoup` executable; verify registry and installed versions separately |
| Public website assistant | [`docs/website-agent.md`](../../docs/website-agent.md) | Marketing; public website tools are separate from authenticated platform access |
| Lead and inquiry delivery | [`lib/leads/postLead.ts`](../../lib/leads/postLead.ts), [`lib/inquiries/saveInquiry.ts`](../../lib/inquiries/saveInquiry.ts) | Marketing forwards to API; API owns CRM storage/notifications |
| GTM research and tools | [`gtm/AGENTS.md`](../../gtm/AGENTS.md) | Repository context and independent engine, not automatically public content |

The application, API, shared Skills, database and existing workers are separate
repositories in Mono. Follow their owning instructions. Existing Trigger.dev
jobs remain supported implementations; new platform scheduled/background work
belongs in Vercel Workflows inside API under
[Mono's architecture rules](https://github.com/recoupable/mono/blob/main/AGENTS.md).
Do not infer identical availability across local skills, API, workers and clients.

## Pricing and purchase evidence

Displayed offers and billing calculations live in
[`lib/pricing.ts`](../../lib/pricing.ts), with page wording in
[`app/pricing`](../../app/pricing). Read those sources instead of maintaining
another price table here. Marketing service offers and the platform's
Free/Starter/Pro entitlement contract are separate concepts; consult the
[credits and plans guide](../docs/source/credits.mdx) for the latter.

Displayed monthly/annual offers do not verify Stripe intervals, checkout,
renewal or entitlements. The product/release owner's outstanding offer decision
and authorized purchase verification remain in
[Mono #338](https://github.com/recoupable/mono/issues/338). Marketing copy alone
does not establish completion of those journeys.

## History and release claims

The older [positioning](positioning.md), [website structure report](website-structure-report.md)
and [typography guide](typography.md) preserve earlier decisions. They do not
override the active Marketing sources above. Keep quantitative customer stories
and production claims tied to dated evidence and approval; this guide does not
restate an unverified experiment count or fixed package version.

Before claiming a capability works, name its release and the specific deployed,
packaged, installed or customer behavior actually checked. Use
[epic #318](https://github.com/recoupable/mono/issues/318) and its existing feature
tickets for remaining verification. A passing build establishes source
compatibility; publication and original customer journeys have separate checks.
