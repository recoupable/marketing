# Public company operating model

Route: `/company-map`. The page explains Recoup's operating model, not a deployed-feature inventory. It contains 16 company areas, model components, relationships and selected company workflows. Search, area/workflow navigation, keyboard-accessible graph selection, connection traversal, zoom/pan and URL hashes share the same local snapshot. No backend, credentials or model API is required.

## Source and update boundary

Use the maintained private atlas's explicit privacy-checked public exporter first. Never copy its folder, private graph, research pages, pipeline or Git history into Marketing. Run `python3 scripts/project-company-map.py /path/to/public-export/graph/atlas.json` against that public export. The projector selects conceptual records and explicit company workflow IDs, never implementation status or evidence. Domain IDs and graph endpoints are retained for traceability. The public schema omits source locators, current implementation, findings, tickets and private research.

The current projection retains model summaries, operating rules and field names. It is not the complete technical contract library or competitor research catalog. Edges express conceptual relationships, not deployed database foreign keys. Do not turn snapshot counts into product availability claims. Model-level proposed language is removed only in this public projection; the maintained research remains unchanged. Business concepts such as proposed deals and approvals keep their meaning.

Source snapshot: Business commit 3917e06e (2026-10-15 projection). Upstream export passed its content-boundary audit. Keep export receipts in the private Business task folder. No private raw export is committed here.

## Checks

- `pnpm exec vitest run lib/company-map/__tests__`
- `pnpm build`
- Review desktop and narrow layouts, search/no-results, hash navigation/back, relationship traversal, workflow navigation and zoom reset.
- Verify the upstream content-boundary audit on each refresh; the local field and locator checks supplement that audit.

Public copy is in `lib/copy/company-map.ts`; the route is included in Resources, the sitemap and the agent-content summary registry. No production deployment is implied by a local preview.

## Local verification — 2026-10-15

Production build passed under Node 24 using only the existing public Privy app ID required by the unrelated valuation route. No auth environment file was copied. All three public-model boundary, graph integrity and all-area/workflow label-layout tests passed; browser verification covered area selection, component/relationship traversal, royalty search, acquisition workflow, zoom/reset and a narrow viewport with equal document/viewport width. This is local evidence; the feature is not merged or deployed.
