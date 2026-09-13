# Recoup documentation migration

This directory is the source of truth for the `/docs` area. Documentation is authored under `source/`; the app reads no other checkout.

## Coverage

- All 179 pages in the supplied navigation: 12 guides and 167 API reference pages.
- Six additional music operations discovered in OpenAPI and surfaced under Additional endpoints.
- 185 content routes, plus the API overview, ten downloadable specifications, and Markdown views.
- Ten OpenAPI documents, with all local schema references intact.
- The one unused source snippet is preserved in the snapshot but is not a public standalone page.

The migration imports existing documentation, not a fresh validation of API behavior. Source statements about beta status, permissions, or evolving contracts remain intact. No API requests are executed by the docs site or import scripts.

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
- Documentation examples are displayed and copyable; there is no live-request console.
- The table of contents is collected from parsed document headings. Code examples cannot create phantom sections, and repeated heading names receive distinct anchors during compilation.

`inventory.json` records source counts, additional operations, and any unresolved pointers.
