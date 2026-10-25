# Documentation authoring and transition

Application registration preflight is a pending source contract for
`POST /api/applications/registration/validate` and standard MCP
`validate_application_registration`. Keep it distinct from a registry or activation:
the validator returns `persisted: false` and `origins_verified: false`, with no
application ID or token. Authentication happens first and can retain its existing
account-provisioning effects. Proposed-origin matching is not ownership proof.
Delegated OAuth excludes the tool. The reference, navigation, specification and
generated AI text must move together; release waits for the accepted API revision
and the normal source-pin/publication sequence.

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
exports with synthetic service leaves. The read-failure repair did not itself
change admission. The subsequent API #1128/#1129 release rejects running/pending
POSTs with 409 and unresolved admission with retryable 503 before accepting a
new turn; GET retains empty or terminal finish-only 200 SSE. The coordinated
admission/lifecycle fixture below covers that successor without introducing a
queue or automatic resend.

The selected Stop 200/502/503/504 schemas and pending-start example are frozen
through the same producer. API `publishedChatStop.test.ts` calls the canonical
route under mocked service leaves. A pending start has no cancellable run ID:
503 retains its reservation and does not acknowledge a successful Stop. Publish
only after the matching server repair is released, then refresh the actual API
source pin. This narrow correction does not accept the separate POST admission,
client recovery or disconnect-policy changes.

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

Catalog-case continuation uses the same Context exports and fixture producer.
`save_catalog_case`, `read_catalog_case` and `list_catalog_cases` are standard-only
MCP operations, excluded from the delegated table. Their source schemas retain
customer assertions, revision/idempotency rules and withdrawn-evidence projections;
keep `ContextCatalogCaseResponse` and `ContextCatalogCasesResponse` connected to
the 200 response union. The API HTTP/MCP example pairs are synthetic artifact
operations, not provider execution. Update `mcp.mdx` with this bounded source scope
and keep deployment verification separate from contract checks.

## CLI guide compatibility

The `cli-guide` job in `.github/workflows/documentation-contract.yml` builds the
immutable CLI #28 merge and runs its existing published-command guard against
this PR's `content/docs/source/cli.mdx`. Marketing owns candidate-guide failures;
CLI owns command behavior and the guard. The check covers email/song/cost-estimate examples,
`--chat-id` request mapping, and rejection of retired `--room-id` before dispatch.
Requests are intercepted with synthetic credentials and never forwarded to an API.
Cost-estimate examples must use GET without a body and preserve their default or
explicit query flags. These checks do not verify real prices or create content.

For intentional command changes, release and review the CLI guard first, then
update the workflow's exact CLI commit pin and the maintained guide together.
Run the same check locally from that CLI checkout after `pnpm build`:

```sh
RECOUP_CLI_REFERENCE_PATH=/absolute/path/to/marketing/content/docs/source/cli.mdx \
  pnpm exec vitest run __tests__/publishedCommands.test.ts
```

This checks candidate documentation against compiled source, not an npm artifact,
every CLI command, live authentication or customer behavior. CLI publication and
isolated installed-artifact acceptance remain with mono#355/#361; package-family
support and propagation policy remain with mono#352. A source version bump is not
proof of publication. Retained Docs continues to copy the accepted Marketing guide
through the existing provenance workflow.

## Chat admission and reader lifecycle companions

API #1128 is merged as `8f48a2a1d51264f2ae34a0f21db05bcaeed806ce`, with successful production deployment of that runtime. API #1129 is merged as `971f396bab61b86411199264073aaf436cbbee5b`; the inventory pins this actual contract merge, not a preview candidate. Marketing #230 succeeds Marketing #209 and remains subject to final checks, independent review and merge approval. Retained Docs copies wait for the actual Marketing merge. Existing failed-read and pending-Stop contracts remain intact. Scope is admission 409/retryable 503, exact-single optional query opt-in on POST and reconnect GET, retained manual recovery, and authenticated server Stop distinctions. Source/deployment evidence does not prove authenticated hosted send/reconnect/Stop or real provider cancellation; those acceptance checks and private deployment access remain separate.

## Workflow trailing-message deletion

API #1155 merged as `4d63f9c2248c28f0fc0974f59fb3a8f4650ee063` supplies the
Workflow-only deletion runtime. Its published-contract companion updates fixtures
and tests only; the final inventory must pin that companion's actual merge before
Marketing publication. `DELETE /api/chats/{id}/messages/trailing` requires caller
quiescence, rejects every observed occupied slot with 409, and deletes the inclusive
`created_at,id` suffix within the owned chat. Null-slot and successful-Stop observations
do not prove outstanding writers are drained. 200 means statement success, including
zero affected rows, without a durable-absence or concurrent edit/resend guarantee.
Refresh history after an unknown outcome before deciding further action.

The shared fixture freezes query declarations, bounded narrative and selected
response schemas/examples. Run `python3 scripts/test_response_contracts.py` and API
`publishedChatTrailingDelete.test.ts` with the generated fixture, along with the
existing contract suite. The runtime's existing route-builder and disposable SQL
tests are separate evidence; this publication does not add writer fencing or close
the stronger API #636 requirement. Retained Docs waits for Marketing's actual merge.
