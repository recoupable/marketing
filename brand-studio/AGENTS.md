# Brand Studio

This is the existing Recoup Sky artwork library, moved from labs. Preserve its approved DM Sans / IBM Plex Mono interface, exact Recoup symbol, and Blue sweep / Daylight artwork. The Sky design system is specified in the root [DESIGN.md](../DESIGN.md); follow it here too.

- The native Finals and Experiments pages use components/brand-studio/BrandStudio.tsx in marketing. index.html is the legacy shell only. Rebuild the shared catalogue with `python3 scripts/build-review-board.py`.
- Never reinterpret Keep as final approval. Page assignment is a separate decision.
- Keep existing asset IDs and review storage keys stable so saved notes survive.
- Preserve original artwork and downloadable kits. Do not regenerate unrelated assets when making library UI changes.
- Keep browser links relative so the Studio works at both its standalone origin and /brand in marketing.
- Use `pnpm brand-studio` from marketing for the local library. Use the parent build and route tests for integration changes.
