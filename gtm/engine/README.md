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
| `pnpm sync-attio -- --apply` | Explicitly requests live Attio writes. Requires both credentials. The request contract has offline coverage; live integration still needs a controlled verification. |

All commands accept `--help`. Unknown or conflicting flags fail before accessing accounts. CRM preview and normal error logs omit contact addresses. Applying a sync returns a failing process status if any contact fails. The export files do contain account information; keep them out of the public repository. Repeating an export for the same date and segment replaces that file.

## What the numbers mean

`lib/recoupApi.ts` reads `/admins/privy?period=all`. `lib/segmentation.ts` assigns `new` to accounts created within seven days. Otherwise it assigns `active`, `dormant`, or `churned` using the last linked-account verification time and the thirty- and ninety-day boundaries defined in that file.

Those are inherited grouping rules. Verification time is not evidence of a product action, paid retention, or actual churn. A recent signup is in `new`, not also in `active`. Email extraction only reads an explicit email linked account and may miss addresses stored on an OAuth account. The dashboard does not read revenue, campaigns, product events, or Plausible; the Plausible variables in the imported example are unused.

## Legacy material and integration gaps

The files in `sequences/` are **historical drafts, not approved current campaigns**. They do not send or schedule anything. Their old app links, feature claims, performance claims, testimonials, and cadence assumptions must be checked or rewritten before use. The package cannot evaluate the artist/chat conditions or fill all the placeholders those drafts describe. There is no unsubscribe, suppression, or delivery tracking implementation.

The CRM command submits only a normalized email address. It does not transfer attribution, company details, qualification, signup dates, or segments. `lib/upsertAttioContact.ts` sends `matching_attribute=email_addresses` in the query string, matching the maintained central API helper (`api/lib/attio/assertPersonByEmail.ts` in Mono), with offline request fixtures. It requires a returned record ID, bounds requests to 30 seconds, and reports uncertain writes without automatic retries. **Live compatibility has not been verified**.

This maintained writer cannot replay merged company IDs: it builds an explicit email-only payload and ignores additional source fields. It neither creates companies nor consumes reconciliation receipts. Do not restore historical name-only company import scripts or pass cached company IDs into this writer. Any future company writer must resolve the private merge map, verify the destination still exists and fail for review on missing or ambiguous identities; it must not create a replacement from a name alone. Attio email sync, workspace workflows, the central API and external integrations require separate review.

The marketing website already sends captured form submissions through `lib/leads/postLead.ts` to the central Recoup API. That API owns CRM storage and sales notifications. The imported script is a separate operator tool; it should not become another browser-side Attio client, and the form endpoint should not be used as a silent bulk import.

Other inherited gaps include direct CSV joining without escaping, no automatic retry and no checkpoint for interrupted syncs. These are explicit follow-up tasks, not capabilities delivered by the consolidation.

## Where to build next

1. Turn the parent directory's sourced company research into a repeatable account-selection step, keeping the evidence and a reason for each choice.
2. Add an offline example that produces a prioritized company list and reviewable campaign drafts. Save the inputs, output, and run result so the next person can repeat it.
3. Add separate records for companies, people, campaigns, and observed outcomes. Do not reuse the app-account recency labels as sales qualification.
4. Repair and test the chosen CRM integration against its documented contract. Keep preview and apply as separate actions; do not reintroduce default writes.
5. Add outbound or advertising connections only when the campaign, recipients, provider, and permission to take that action are explicit. Draft templates alone do not authorize sending.

## Source and changes

Imported from the tracked runtime in `mono/gtm` at commit `57b45f03e92c27079af366b6bd76f7693d5946d3`. Original files: `lib/`, `scripts/`, `sequences/`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, and the placeholder `.env.example`. Credentials, exports, installed dependencies, and untracked research were not imported.

This consolidation adds help before data access, strict flag parsing, preview by default, an explicit apply flag, aggregate logging, failed-sync exit status, directory-relative environment/output locations, and offline tests. `pnpm build` now typechecks instead of returning a no-op message. Legacy draft text and API assumptions are preserved and labeled. No live service calls were made during migration.

## Recover enrichment after a timeout

`pnpm recover-enrichment --checkpoint exports/enrichment-recovery.json` previews an existing job manifest without reading credentials or using the network. Add `--apply` to retrieve pending jobs, using `PARALLEL_API_KEY` from the operator environment. This deliberately uses the provider result API because Recoup currently returns a provider run ID on a research timeout without exposing its own recovery route. It is an operator workaround, not a public API fix.

Use a private checkpoint in this engine's ignored `exports/` or `runs/` directory:

```json
{"version":1,"records":[{"id":"local-contact-reference","run_id":"trun_existing_run","status":"pending"}]}
```

Import run IDs from saved Recoup timeout responses; do not guess IDs or resubmit an uncertain request. A network failure without a run ID requires investigation, not automatic retry. This command only uses GET on existing runs, never starts research or writes Attio. Completed and failed records are skipped. Each retrieved result is atomically saved with restricted file permissions; the checkpoint lock prevents simultaneous operators overwriting each other. A crash may leave a lock that requires confirming the prior process has ended before removal.

Output includes professional research plus the provider's original field evidence and confidence. Completed research is not a verified identity or a qualified lead. Review conflicts and shared mailboxes before any separate CRM write. Logs contain aggregate progress only. HTTP/network errors remain pending for a later retrieval attempt; consult `last_error` in the private checkpoint. Do not put live checkpoints in fixtures or Git, and do not run this with browser-exposed credentials.

## Required private import exclusions

The sync command loads `exports/crm-import-exclusions.json`, or the path in `CRM_IMPORT_EXCLUSIONS_FILE`, before fetching accounts. Missing or invalid registries stop imports. Format: `{"exclusions":[{"email":"alias@example.invalid"}]}`. Keep the registry outside Git. Matching ignores case and surrounding whitespace, but does not fold aliases or exclude entire domains. Both preview and apply filter the same contacts. This protects the local import command, not separate website/API writers. Platform accounts stay unchanged.
