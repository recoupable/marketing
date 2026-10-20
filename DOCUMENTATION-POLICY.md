# Documentation authoring and transition

`content/docs/source` is the maintained authoring tree. Keep request and
response descriptions in its split OpenAPI files. Reconcile with implementation
before copying. Run `pnpm docs:build`, `pnpm docs:check`, and `pnpm build`; commit the
generated docs artifacts. Update the static product/MCP summaries too.

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
union, and page items reuse the receipt component. Other Context actions retain
their existing object fallback; this does not make every legacy result typed.
Record actions omitted from the reference explicitly until their provider-neutral
public contract is stable; omission is not an API access restriction. Exported schemas do not prove hosted workflow acceptance.
