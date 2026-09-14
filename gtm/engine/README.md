# Existing account tools

This package contains the useful command-line tools brought over from `mono/gtm`. It works with existing Recoup app accounts. It does not yet discover music companies, find executive contacts, run advertisements, send email, or connect campaign activity to sales.

Start with the parent GTM directory for the customer profile, company research, industry principles, and work the team should build next. Keep account operations here separate from prospect research: an app account is not automatically a qualified company or permission to send marketing.

## Inspect it safely

Use Node 24 or later. Starting from the marketing repository root, install this package separately from the website:

```sh
cd gtm/engine
pnpm --ignore-workspace install --frozen-lockfile
pnpm export-users -- --help
pnpm sync-attio -- --help
pnpm dashboard -- --help
pnpm test
pnpm build
```

`--help` runs before credential loading or network calls. You can also inspect help and run the offline tests without installing dependencies:

```sh
node --experimental-strip-types scripts/syncAttio.ts --help
node --experimental-strip-types --test tests/*.test.ts
```

To run an account-data command, copy `.env.example` to `.env` in this directory and provide an authorized Recoup admin token. The file is ignored by Git. The API base currently follows the imported package's `/api` convention; verify the environment and route before using it. Do not put credentials into research files, commands, or shared agent prompts.

## Commands and effects

| Command | What it does |
|---|---|
| `pnpm export-users` | Reads live account data and writes a CSV under this directory's ignored `exports/`. Optional `--email-only` and `--segment` filters. |
| `pnpm dashboard` | Reads live account data and writes an HTML report under ignored `exports/`. Charts load Chart.js from a public CDN. |
| `pnpm sync-attio` | Reads live account data and previews aggregate counts. Does not write to Attio and does not need its key. |
| `pnpm sync-attio -- --dry-run` | Explicit form of the same preview. It still reads live Recoup accounts. |
| `pnpm sync-attio -- --apply` | Explicitly requests live Attio writes. Requires both credentials. The legacy Attio request needs verification before use. |

All commands accept `--help`. Unknown or conflicting flags fail before accessing accounts. CRM preview and normal error logs omit contact addresses. Applying a sync returns a failing process status if any contact fails. The export files do contain account information; keep them out of the public repository. Repeating an export for the same date and segment replaces that file.

## What the numbers mean

`lib/recoupApi.ts` reads `/admins/privy?period=all`. `lib/segmentation.ts` assigns `new` to accounts created within seven days. Otherwise it assigns `active`, `dormant`, or `churned` using the last linked-account verification time and the thirty- and ninety-day boundaries defined in that file.

Those are inherited grouping rules. Verification time is not evidence of a product action, paid retention, or actual churn. A recent signup is in `new`, not also in `active`. Email extraction only reads an explicit email linked account and may miss addresses stored on an OAuth account. The dashboard does not read revenue, campaigns, product events, or Plausible; the Plausible variables in the imported example are unused.

## Legacy material and integration gaps

The files in `sequences/` are **historical drafts, not approved current campaigns**. They do not send or schedule anything. Their old app links, feature claims, performance claims, testimonials, and cadence assumptions must be checked or rewritten before use. The package cannot evaluate the artist/chat conditions or fill all the placeholders those drafts describe. There is no unsubscribe, suppression, or delivery tracking implementation.

The old CRM command submits only an email address. It does not transfer attribution, company details, qualification, signup dates, or segments. Its request puts `matching_attribute` in the JSON body. The existing Recoup API helper, `api/lib/attio/assertPersonByEmail.ts` in the mono checkout, instead puts it in the URL query. This migration preserves that legacy request for review; **live compatibility has not been verified**. Do not treat `--apply` as proof that the integration is ready.

The marketing website already sends captured form submissions through `lib/leads/postLead.ts` to the central Recoup API. That API owns CRM storage and sales notifications. The imported script is a separate operator tool; it should not become another browser-side Attio client, and the form endpoint should not be used as a silent bulk import.

Other inherited gaps include direct CSV joining without escaping, no validated API response shape, no client timeout/retry, and no checkpoint for interrupted syncs. These are explicit follow-up tasks, not capabilities delivered by the consolidation.

## Where to build next

1. Turn the parent directory's sourced company research into a repeatable account-selection step, keeping the evidence and a reason for each choice.
2. Add an offline example that produces a prioritized company list and reviewable campaign drafts. Save the inputs, output, and run result so the next person can repeat it.
3. Add separate records for companies, people, campaigns, and observed outcomes. Do not reuse the app-account recency labels as sales qualification.
4. Repair and test the chosen CRM integration against its documented contract. Keep preview and apply as separate actions; do not reintroduce default writes.
5. Add outbound or advertising connections only when the campaign, recipients, provider, and permission to take that action are explicit. Draft templates alone do not authorize sending.

## Source and changes

Imported from the tracked runtime in `mono/gtm` at commit `57b45f03e92c27079af366b6bd76f7693d5946d3`. Original files: `lib/`, `scripts/`, `sequences/`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, and the placeholder `.env.example`. Credentials, exports, installed dependencies, and untracked research were not imported.

This consolidation adds help before data access, strict flag parsing, preview by default, an explicit apply flag, aggregate logging, failed-sync exit status, directory-relative environment/output locations, and offline tests. `pnpm build` now typechecks instead of returning a no-op message. Legacy draft text and API assumptions are preserved and labeled. No live service calls were made during migration.
