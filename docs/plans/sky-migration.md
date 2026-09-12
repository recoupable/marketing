# Recoup Sky → production marketing migration

Investigation: 2026-09-10. Recommendation only; no production repository edits, branch creation, push, or deployment performed.

## Recommendation

Migrate the approved Sky website into the existing `recoupable/marketing` repository on `codex/sky-marketing-redesign`, in an isolated worktree based on the latest `origin/main`. Keep the current Vercel project and `recoupable.dev` domain. Use a draft PR and its preview deployment to validate the complete new site before merging.

Bring over the complete approved presentation and content. Retain or adapt production funnel logic deliberately. Do not replace the marketing directory wholesale, transplant the Labs Git history, or maintain two production websites indefinitely.

The release should look like the Labs site, including the new homepage, services, pricing presentation, tools, case studies, navigation, motion, and responsive layouts. Existing production integrations should work underneath that presentation.

## What was verified

- `mono/.gitmodules` identifies `marketing` as a submodule of `https://github.com/recoupable/marketing.git`. It is an independent repository, not a pnpm workspace package deployed through the parent repo.
- Marketing's current local main and GitHub main are `21a20ea932b4f6390c48bcb32e00665ba24da7b0` (2026-08-30).
- GitHub production deployment `6172508329` reports success for that commit, at `https://marketing-mcya0jwpm-recoup.vercel.app`.
- The public `https://recoupable.dev` homepage still presents the previous design and Free/Starter/Pro pricing.
- Marketing's AGENTS specifies the existing Vercel project uses `recoupable/marketing` with root directory `.`. Local `.vercel/project.json` is linked to that project. The Vercel dashboard's full settings, environment values, and Stripe product configuration were not inspected.
- Marketing uses Next 16.3.0, React 19.2.8, pnpm, Tailwind, Vitest, and Privy. Labs uses Next 16.3.4, React 19.2.8, npm, plain CSS, and Node tests. This is a compatible framework migration, not a rewrite to another platform.
- All 28 existing page route patterns have counterparts among Labs' 43 page patterns. This does not prove equivalent behavior, individual blog-slug coverage, redirects, or query-parameter compatibility.
- Marketing has untracked `.gen/` content. Labs has uncommitted approved design changes. Preserve both; checkpoint Labs before importing.
- `content/STATUS.md` in marketing is dated April 5 and contains stale integration guidance. Current implementation and the newer AGENTS lead-capture rules are more reliable.

## Production behaviors that need reconciliation

| Area | Production marketing | Labs site | Migration action |
| --- | --- | --- | --- |
| Valuation | Artist search, Privy gate, valuation API call, results, analytics | Explainer linking to the app's catalog page | Preserve the functional funnel at `/valuation`, restyled in Sky. Moving it into the app is a separate product decision. |
| Paid platform checkout | `createDirectCheckoutSession` calls the API subscription-session endpoint for Starter/Pro, preserving optional auth and success attribution | Platform CTA opens the app; consulting CTAs open qualified inquiry forms | Implement the approved $99 platform purchase path against the actual subscription contract. Do not map it silently to a $19 or $99 plan. |
| Pricing | Free / $19 Starter / $99 Pro; API entitlements use free/starter/pro | $99 Platform / $999 Advisory / $9,999 Build + Partner; annual whole-dollar discount | Coordinate billing configuration and API/app entitlements for Platform. Consulting can remain clearly labeled inquiry-first offers. Preserve existing customers' subscriptions unless separately authorized. |
| Lead capture | `postCapture` → API `/api/leads`; API owns Attio, triage notes and team notifications | Newsletter uses the central API; project/contact inquiries use a direct Attio integration and `ATTIO_API_KEY` | Route new qualified forms through the central API. Preserve budgets, interest, timeline, selected plan/billing, and attribution. Extend the API schema if needed. Do not add a second CRM owner to marketing. |
| Lead schema | API supports booking and subscribe variants; booking accepts name/package/company/role/rosterSize/message | Rich nested qualification payload | Define explicit mapping and tests. Unknown Zod fields can be stripped; sending extra properties alone will not preserve them. |
| Auth | Privy provider, authenticated checkout and valuation behavior | No Privy provider | Retain auth where these funnels require it; avoid loading it into every static page if route-scoped providers suffice. Verify preview/prod app and API pairing. |
| Analytics | Plausible + Vercel Analytics + valuation/checkout custom events | Plausible and new referral logic | Preserve existing event contracts and attribution; add audit and service-plan events without dropping the old funnel events. |
| App destinations | Config currently uses `app.recoupable.dev` | Shared config uses `chat.recoupable.dev`; valuation links to `teams` | Verify the intended destination per flow and preserve catalog/checkout deep-link parameters. |
| Blog | MDX content, schema, index, feed and machine-copy registry | Imported/editorial content and new rendering | Compare every published slug, body, canonical, image and date. Preserve existing URLs and content ownership. |
| Docs | Separate `recoupable/docs` repository and `docs.recoupable.dev` | Local `/docs` renderer and imported source snapshot | Keep docs repo as the authoring source and automate snapshot sync. Decide canonical URLs and subdomain redirects explicitly; do not ship two independently edited documentation sets. |
| Legal and redirects | Terms/privacy and legacy company redirect | New legal routes/aliases; different redirects | Preserve substantive approved legal text and all existing inbound routes. Merge redirect maps rather than replacing next.config. |
| Agent-readable site | `/api/machine?path=...` backed by copy registry | Expanded agents/llms/API discovery endpoints | Preserve compatibility for the existing endpoint and ensure machine answers match the new human copy and pricing. |
| Design rules | Parent mono DESIGN mandates achromatic chrome and different fonts | Sky uses white, blue, green/lime, DM Sans and IBM Plex Mono | Add an explicit marketing-specific Sky override and local DESIGN guide. Do not change chat/admin styling as part of this release. |

## Branch and implementation sequence

1. Checkpoint the full approved Labs state, including currently untracked new components. Record the source commit in the migration PR.
2. Fetch marketing main and create `codex/sky-marketing-redesign` in an isolated worktree. Run Git from the marketing repository, not from mono. A new branch in mono alone will not contain the website changes.
3. Keep marketing's root `app/`, `components/`, and `lib/` convention and pnpm lockfile. Map Labs' `src/` contents deliberately. Do not leave competing root `app/` and `src/app/` trees. Add only needed fonts/MDX dependencies; align Next and eslint-config-next on the same version.
4. Port the Sky shell, shared components, homepage and static pages, then the restyled production funnels. Retain repository content/transcripts/workflows, useful tests, and environment contracts. Exclude `.git`, `.next`, `node_modules`, `.env*`, `.vercel`, temporary screenshots, and local tooling artifacts from file transfer.
5. Reconcile lead capture and pricing integrations in focused commits. If API changes are required, use a separate API PR and backward-compatible contracts; release backend support before the dependent frontend.
6. Reconcile active marketing PRs before merging. Particularly: #89 music-video offer and quote form (incorporated into this branch; see `music-video-offer.md`), #90 analysis caps, #88 pricing/signed-in state, #78 attribution, #66 customer-claim corrections, and valuation/share work. Do not blindly merge their old layouts or discard their business logic.
7. Open a draft marketing PR and use the existing project's preview environment. Confirm preview authentication domains, test API routing, test billing, restricted/noindex indexing, and controlled test lead destinations before exercising integrations.
8. Review the whole preview as a release candidate. Then merge the marketing PR through the normal production path. Record and retain the previous known-good deployment for rollback.
9. Verify the production domain after release, not only the preview: routing, metadata, assets, analytics and approved smoke tests. Update mono's marketing submodule pointer in a separate parent-repository PR after the marketing commit is merged.
10. Continue production marketing work in the marketing repo. Keep Labs as a reference or future experiment environment; do not maintain duplicate authoritative production implementations.

## Release checks

- All existing URLs, blog slugs, important query strings, downloads and redirects accounted for.
- Desktop and 320/390px visual pass, keyboard navigation, reduced motion and no-JavaScript content checks.
- Production build, lint, retained Vitest tests and relevant imported Labs tests pass.
- Valuation: artist selection, authentication, request, result, error/retry and attribution verified against the preview API.
- Lead capture: test submission persists all qualifying fields and attribution exactly once, including backend triage/notification verification through controlled test infrastructure.
- Checkout: advertised plan, charge, annual total, credits/entitlements, login association and success/cancel destinations agree. No production charges for testing.
- Preview indexing blocked; production canonicals, sitemap, RSS, structured data and agent-readable pages reflect the final content.
- Docs snapshot, canonical ownership and redirect policy explicit.
- Vercel Analytics retained (Plausible removed in recoupable/app#2081 row B; no account existed); expected funnel events still fire.
- Customer logos, ratings, case studies and outcome claims checked for permission/evidence before publication.
- No local credentials, generated scratch files, `.gen/` contents or experimental routes included accidentally.
- Production deployment and rollback target recorded; pending PR conflicts resolved.

## Sources and evidence locations

- Production: https://recoupable.dev/
- Repository: https://github.com/recoupable/marketing
- Deployment status: https://api.github.com/repos/recoupable/marketing/deployments/6172508329/statuses
- Vercel environments: https://vercel.com/docs/deployments/environments
- Marketing: `AGENTS.md`, `next.config.ts`, `lib/config.ts`, `lib/postCapture.ts`, `lib/pricing/entitlements.ts`, `lib/checkout/createDirectCheckoutSession.ts`, `hooks/useCatalogValuation.ts`, `app/layout.tsx`.
- API: `lib/leads/validatePostLeadsBody.ts`, `lib/plans/`, `app/api/subscriptions/sessions/route.ts`.
- Labs: `src/lib/pricing.ts`, `src/lib/inquiries.ts`, `src/lib/marketing-subscribe.ts`, `src/app/valuation/page.tsx`, `scripts/import-docs.mjs`, `next.config.ts`.

## Preview implementation receipt

- Source: Labs checkpoint `8b25760`; target branch `codex/sky-marketing-redesign`, based on marketing main `21a20ea`.
- Root App Router migration; approved Sky design and shared pricing (99 / 999 / 9999 monthly, 79 / 799 / 7999 annual monthly equivalents).
- Lead forms post through the central API. Budget, timing, attribution, selected plan, and audit/ROI inquiry context remain in the submitted brief; no marketing Attio credentials are required. Newsletter uses the same central API.
- Valuation retains Spotify search, route-scoped Privy email login, credits-based API valuation, and the app report handoff.
- Vercel Analytics retained (Plausible removed in recoupable/app#2081 row B). All existing MDX blog slugs are represented in the migrated blog snapshot. Content, transcripts, and workflows are preserved.
- Legacy machine endpoint derives content from the new public content registry. Legacy redirects retained; previews disallow indexing.
- Production release remains gated on provisioning the new platform billing plan and entitlements, verifying live lead delivery, confirming valuation auth/credit behavior, and reconciling the open pricing/funnel PRs listed above. The preview does not create new Stripe products or charge through legacy plan IDs.
- Audit and ROI results stay ungated as approved in Labs; explicit inquiry handoffs carry their results into the lead form.
- Docs are a versioned snapshot, not a live dependency on a sibling checkout. The docs subdomain is unchanged.
