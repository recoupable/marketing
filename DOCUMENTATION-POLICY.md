# Documentation authoring and transition

`content/docs/source` is the maintained authoring tree. Keep request and
response descriptions in its split OpenAPI files. Reconcile with implementation
before copying. Run `pnpm docs:build`, `pnpm docs:check`, and `pnpm build`; commit the
generated docs artifacts. Update the static product/MCP summaries too.

`pnpm docs:build` also generates `content/docs/source/llms-full.txt` through the
same complete-operation Markdown renderer as the website. Do not hand-edit it.
It retains response descriptions, schemas and local references that the retained
host's automatic aggregate can omit. The documented Mintlify custom-file mechanism
serves this source-controlled file at `/llms-full.txt`; normal provenance sync and
checks include it. This is a publication file, not a hosting or cutover change.
`--out <dir>` redirects this derived file alongside the JSON snapshots for checks.
Generated links use the canonical website origin, independent of preview settings.

The separate Docs host remains a compatibility publication during the transition.
Its copy is generated from a pinned Marketing commit with path hashes recorded in
`SOURCE-PROVENANCE.json`; do not author the same guide independently in Docs.
Its `docs.json` theme/host settings remain host-specific, while navigation mirrors
the maintained tree. Commercial services and Free/Starter/Pro technical values
are explained together rather than silently substituting one for the other.

This PR prepares content and provenance. Marketing#101 owns host cutover; DNS,
old-host archival and redirects require the package-25 compatibility checks.
Preserve marketing#124 Sites work and newer Docs changes before that cutover.

`content/docs/contracts` records the dated deployed/source/installed baseline and
method/path dispositions. Refresh with `python3 scripts/refresh-contract-inventory.py
--api /path/to/api`. Static inventory is not a verified scope-specific MCP catalog
or a claim that every documented feature is live. CI checks the committed inventory
and specification hashes against its pinned API source revision; it detects stale
source records, while runtime and per-host verification remain separate.

Release API validation/lipsync first, then the existing Tasks worker, then updated
instructions. Verify selected-clip audio and perceptual lip alignment before
closing mono#348. Refresh OAuth in each supported host; a source test does not
replace tool discovery/readback/refresh/revoke evidence.

The Artist Profile and Projects error components are imported from the API's
`lib/contracts/generated/error-responses.json`, generated from its typed response
constructors. Keep endpoint narrative, including which 401 message field to read,
in this tree. Projects uses `AuthenticationError` only for 401; its other errors and
Artist Profile use the required `error` envelope. Do not hand-edit these generated
components: `python3 scripts/build-contract-examples.py --api /path/to/api` imports them and
freezes resolved response schemas by method, path and HTTP status for API tests.
The check mode rejects drift from the pinned API artifact. It covers selected error
responses, not every operation or hosted authentication.

The same fixture freezes selected Research/Sessions 500 responses for failed
chat reads. API `publishedChatReadFailures.test.ts` calls eight canonical route
exports with synthetic service leaves. It also retains the existing POST 200
resume behavior and GET finish-only 200 SSE; this does not accept a newly
submitted turn on the POST resume path. No new submission conflict/retry,
queue, disconnect or client behavior is implied by the read-failure repair.

For coordinated changes, regenerate the API artifact and the two fixture copies:
Marketing's `content/docs/contracts/example-cases.json` and API's
`lib/contracts/fixtures/published-docs.json`. Run the API contract tests and
`pnpm typecheck:response-contracts`, then commit API. From Marketing run:

```sh
python3 scripts/refresh-contract-inventory.py --api /path/to/api
python3 scripts/refresh-contract-inventory.py --api /path/to/api --check
python3 scripts/build-contract-examples.py --api /path/to/api --check
python3 scripts/test_response_contracts.py
pnpm docs:build
pnpm docs:check
pnpm test
pnpm build
```

Commit Marketing, then prepare the Docs copy with
`python3 scripts/sync-legacy-docs.py --target /path/to/docs`. In Docs run
`python3 scripts/check_source.py --source /path/to/marketing` to verify its source pin.
The API fixture uses source-file hashes; this avoids a circular commit dependency.
These checks do not authorize merge or deployment.

The same export freezes the guarded-file query/upload examples and resolved
GET 200 / POST 200, 409 and 500 schemas in `guardedGitFiles`. The API's
`publishedSandboxFiles.test.ts` checks those examples against the real validators,
GET export and upload response builder under mocked service boundaries. This
does not prove hosted Git writes, sandbox atomicity or adoption by existing clients.

`python3 scripts/build-contract-examples.py --api /path/to/api` freezes examples and
important contract claims for API tests, including Context's public request union.
Run `pnpm exec vitest run lib/contracts/__tests__` from the API checkout. To export
the current provider-neutral Context schemas without calling services, set
`RECOUP_CONTEXT_SCHEMA_OUTPUT=/tmp/context-requests.json` while running
`lib/contracts/__tests__/contextContract.test.ts`; use that union in `context.json`,
retain semantic restrictions in descriptions, and refresh the shared fixture.
Set `RECOUP_CONTEXT_MCP_OUTPUT=/tmp/context-mcp.json` in the same test to export
the static delegated names and permission annotations; retain the discovery caveat.
Set `RECOUP_CONTEXT_STANDARD_MCP_OUTPUT=/tmp/context-standard-mcp.json` to export the separately classified
standard-only evidence tools and `RECOUP_CONTEXT_EVIDENCE_OUTPUT=/tmp/context-evidence.json` for their
receipt/page response schemas. Keep those tools out of the delegated table.
The shared fixture checks both classifications and exact response declarations.
Preserve authored field descriptions when updating exported request shapes;
they explain pilot URL restrictions, workspace checks and brief limits beyond JSON
syntax. Evidence receipt/page components must be referenced by the 200 response
union, and page items reuse the receipt component. Every Context action maps to
its own success status and named response model through
`x-recoup-context-responses`. Keep the status unions limited to those references;
a generic object fallback must not hide a missing or invalid action response.
Persisted request JSON and saved execution metadata remain flexible where the
source contract explicitly allows it; documenting envelopes does not tighten runtime validation.
Record actions omitted from the reference explicitly until their provider-neutral
public contract is stable; omission is not an API access restriction. Exported schemas do not prove hosted workflow acceptance.

Catalog lookup planning uses the same request/mapping export. Its request accepts
all six public/legacy module values; examples prefer the three public names. Keep
the complete `ContextCatalogPlanningResponse` connected to the 200 response union.
Set `RECOUP_CONTEXT_CATALOG_PLANNING_OUTPUT=/tmp/context-catalog-planning.json`
when running API `catalogPlanningContract.test.ts` to export the planning request,
complete response schema, fixture reference and delegated tool mapping. Preserve
authored descriptions while comparing the underlying schema structure.
The shared Context fixture's `responseSchemas.catalogPlanning` resolves the API
exported response; `responseReferences.plan_catalog_members` points to it inside
the fixture. Its `catalogPlanning` section freezes the three request examples and
four response examples, including the empty page. Validate actual planning results against this schema directly;
the generic result branch for other actions cannot establish planning correctness.
Preserve raw response modules, executor names, stable keys and `collectionPermitted:
false`. This remains planning only and does not authorize collection, spending or
hosted customer acceptance. Standard-only evidence classifications remain separate.

Export all Context success models/statuses with
`RECOUP_CONTEXT_RESPONSES_OUTPUT=/tmp/context-responses.json` while running API
`contextResponseCatalog.test.ts`. Export the remaining actions' synthetic HTTP/MCP
example pairs with `RECOUP_CONTEXT_EXAMPLES_OUTPUT=/tmp/context-examples.json`
while running `contextOperationExamples.test.ts`. Import those actual source
exports into the canonical specification, retaining authored descriptions and the
established planning/evidence examples. The producer freezes all models,
action/status references and `operationExamples` into both Context fixtures;
the API suite must compare the published pairs with its actual processor results.
Validate each response against its specific named model. A successful alternative
in the overall status union is not sufficient. The 202 ingestion/verification
examples use mocked dispatch; the other specific ingestion actions retain 200.
Readiness flags, nullable saved source URLs, unknown historical JSON, delegated
material-evidence exclusions and existing error behavior remain unchanged.
Use the public saved-context planner's output rather than the wider low-level
planner types. Brief document constraints follow the compiler's actual selector;
do not advertise evidence states or coverage that it excludes.
