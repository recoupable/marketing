# Public company operating model

Route: `/atlas`. The page explains Recoup's operating model, not a deployed-feature inventory. It contains 16 company areas, model components, relationships and selected company workflows. Search, area/workflow navigation, keyboard-accessible graph selection, connection traversal, zoom/pan and URL hashes share the same local snapshot. No backend, credentials or model API is required.

## Source and update boundary

Use the maintained private atlas's explicit privacy-checked public exporter first. Never copy its folder, private graph, research pages, pipeline or Git history into Marketing. Run `python3 scripts/project-company-map.py /path/to/public-export/graph/atlas.json` against that public export. The projector selects conceptual records and explicit company workflow IDs, never implementation status or evidence. Domain IDs and graph endpoints are retained for traceability. The public schema omits source locators, current implementation, findings, tickets and private research.

The current projection retains model summaries, operating rules and field names. It is not the complete technical contract library or competitor research catalog. Edges express conceptual relationships, not deployed database foreign keys. Do not turn snapshot counts into product availability claims. Model-level proposed language is removed only in this public projection; the maintained research remains unchanged. Business concepts such as proposed deals and approvals keep their meaning.

Source snapshot: Business commit ff3e8ab0 (2026-10-15 projection). Upstream export passed its content-boundary audit. Keep export receipts in the private Business task folder. No private raw export is committed here.

## Checks

- `pnpm exec vitest run lib/company-map/__tests__`
- `pnpm build`
- Review desktop and narrow layouts, search/no-results, hash navigation/back, relationship traversal, workflow navigation and zoom reset.
- Verify the upstream content-boundary audit on each refresh; the local field and locator checks supplement that audit.

Public copy is in `lib/copy/company-map.ts`; the route is included in Resources, the sitemap and the agent-content summary registry. No production deployment is implied by a local preview.

## Local verification — 2026-10-15

Production build passed under Node 24 using only the existing public Privy app ID required by the unrelated valuation route. No auth environment file was copied. All three public-model boundary, graph integrity and all-area/workflow label-layout tests passed; browser verification covered area selection, component/relationship traversal, royalty search, acquisition workflow, zoom/reset and a narrow viewport with equal document/viewport width. This is local evidence; the feature is not merged or deployed.

The default view now displays 212 core components from a 215-component model with 1,346 total connections in a circular field. Selecting a component preserves the full view and highlights its connections; double-click opens its area. Area/workflow filters remain available, and All components resets the graph. Zoom is centered and supports up to 8x. Layout checks include the complete graph.

Public wording is maintained in `lib/company-map/public-copy.json` and applied by the projector. Technical names remain searchable and visible in details. Internal research-lead records are excluded; the 215-component model includes three digital-asset specialist topics reachable through their own workflow, area filters and search. The default map shows 212 core components.

Publication uses `/atlas`; `/company-map` permanently redirects. `public-records.json` explicitly lists reviewed node, edge and workflow IDs; new source records require public review before inclusion.

Reviewed relationship wording is maintained by ID in `public-copy.json`. Source contracts connect to qualified adapters through one generic relationship; refreshes must not publish a source-provider inventory.

## Hover rendering stability — October 15, 2026

Hover/focus previews now render incident connections in an isolated decorative component, leaving the base graph unchanged. A translucent node outline replaces the SVG blur filter. Preview connections and selected connections fade in, with reduced-motion support. Selection retains graph-wide emphasis and the details panel. Connection hit regions activate only for selected endpoints; native SVG edge tooltips are removed.

Validation: five model/layout tests and the production build passed. Local browser checks verified focus previews, selection details, active connections, overview reset, and no console errors. The reported cross-browser blank raster regions during ordinary pointer hover have not been reproduced with the available browser controls; this is a targeted mitigation pending manual hover confirmation, not a verified root-cause resolution.

## Forecasting and machine learning model

Adds seven conceptual records and five workflows for permitted datasets, reusable prediction inputs, scalable processing, model versions, historical backtests, uncertainty and ongoing monitoring. These extend the operating model; they do not establish deployed training or prediction services. The projection passed the upstream content-boundary audit and retains only reviewed model records.

Validation for this extension: all five public model/layout tests and the Next.js production build passed. No existing public records changed. Publication remains pending review and merge.

## AI model training lifecycle

Adds eight model-training components and six workflows covering LLM, audio/music, image, video, multimodal and world-model objectives; eligible corpora; pretraining and continued training; fine-tuning/adapters; preference optimization and reinforcement learning; simulation; modality-specific evaluation; and serving releases. Existing compute plans gain training hardware, distributed execution, checkpoint and cost fields. This is operating-model design, not a statement that these services are deployed.

Training extension validation: privacy export, all five public model/layout tests and production build passed. Eight nodes and six workflows added; only the existing compute-plan fields changed. No existing records removed. Pending review/merge.
