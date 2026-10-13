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

`scripts/build-contract-examples.py --api /path/to/api` freezes examples and
important contract claims for API tests, including Context's public request union.
Run `pnpm exec vitest run lib/contracts/__tests__` from the API checkout. To export
the current provider-neutral Context schemas without calling services, set
`RECOUP_CONTEXT_SCHEMA_OUTPUT=/tmp/context-requests.json` while running
`lib/contracts/__tests__/contextContract.test.ts`; use that union in `context.json`,
retain semantic restrictions in descriptions, and refresh the shared fixture.
Set `RECOUP_CONTEXT_MCP_OUTPUT=/tmp/context-mcp.json` in the same test to export
the static delegated names and permission annotations; retain the discovery caveat.
Record actions omitted from the reference explicitly until their provider-neutral
public contract is stable; omission is not an API access restriction. Exported schemas do not prove hosted workflow acceptance.
