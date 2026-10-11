# Recoup documentation migration

This directory is the source of truth for the `/docs` area. Documentation is authored under `source/`; the app reads no other checkout.

## Coverage

- All 218 pages in the supplied navigation: 18 guides and 200 API reference pages.
- Ten additional operations discovered in OpenAPI and surfaced under Additional endpoints, including six music operations and four player runtime operations.
- 228 content routes (including 210 API reference pages), plus the API overview, twelve downloadable specifications, and Markdown views.
- Twelve OpenAPI documents, with all local schema references intact.
- The one unused source snippet is preserved in the snapshot but is not a public standalone page.

The migration preserves source documentation; contract checks and recorded live evidence establish which behavior has been verified. Import scripts do not execute API requests. The request playground sends a request only when a reader supplies credentials and explicitly runs it.

## Edit and rebuild

Edit the MDX pages, `docs.json`, or the OpenAPI files under `source/`, then regenerate the derived files and commit them with the source change:

```bash
pnpm docs:build
```

`scripts/__tests__/build-docs.test.ts` rebuilds into a temporary directory and fails when `inventory.json`, `manifest.json`, or `navigation.json` differ from the committed files.

Validate route coverage, schema references, guide links, and generated request examples:

```bash
pnpm docs:check
```

The build compiles only allowlisted presentation components. It rejects imports, executable expressions, spread attributes, and unknown MDX components. Full source OpenAPI files stay intact; the UI adds grouped parameters, expandable nested schemas, response states, copyable requests, and specification downloads. The frontmatter method/path pointers are resolved against their named OpenAPI document; pointers without a file name are matched across the supplied documents.

## Routing and intentional adjustments

- `index.mdx` becomes `/docs`.
- Other navigation paths retain their original hierarchy under `/docs/`.
- `/docs/api-reference` is the complete endpoint index.
- `/docs/spec/<name>.json` downloads the original specification.
- `/docs/raw/<page>.md` provides readable Markdown and operation metadata.
- The outdated `sandboxes/file` guide link resolves to the documented `sandboxes/get-file` page.
- The old combined OpenAPI GitHub link now points to the API overview; each endpoint offers its current split specification.
- Cards use a separate title link so links inside their descriptions do not create invalid nested anchors.
- Documentation examples are displayed and copyable. The request playground lets readers run supported operations with their own credentials.
- The table of contents is collected from parsed document headings. Code examples cannot create phantom sections, and repeated heading names receive distinct anchors during compilation.

`inventory.json` records source counts, additional operations, and any unresolved pointers.
