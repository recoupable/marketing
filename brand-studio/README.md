# Recoup Brand Studio

The working library for Recoup artwork, now located at `marketing/brand-studio`.

## Open the Studio

From marketing, run `pnpm brand-studio`, then open **http://localhost:3012/brand**. This runs the actual Next.js marketing app on the original origin, preserving browser decisions. The normal marketing commands (`pnpm dev`, `pnpm build`, `pnpm start`) include the same pages.

- **/brand:** Finals, selected artwork and reusable templates.
- **/brand/experiments:** studies, alternatives, and review decisions.
- **/brand-studio:** redirects to /brand for existing bookmarks.
- **/brand/assets/**: original images, videos, logos, and ZIP downloads.

The library is a native React interface in `components/brand-studio/BrandStudio.tsx`. Its page routes are in `app/brand/`. It has its own Sky layout inside the marketing app. Analytics and theme handling remain intact. It is excluded from search indexing and the marketing sitemap. Publishing requires deploying the marketing app with the artwork included.

## Reviews and artwork

Finals / Experiments assignment is independent of Keep / Maybe / Pass. Reviews use the original `recoup-brand-review:v1` browser key; export/import decisions when changing browser or origin. Visiting /brand on port 3012 retains existing choices.

`review-board-assets.json` is the catalogue. `studio-finals.json` defines default final assets. `pnpm brand-studio:index` rebuilds the catalogue and legacy HTML; the native React interface consumes the same asset IDs and catalogue. New work belongs in Experiments until selected.

`app/brand/[...asset]/route.ts` serves browser tools and redirects media to Vercel Blob using `blob-assets.json`. Videos support seeking. Original HTML editors remain available under /brand, alongside the native React library.

## Authoring and legacy previews

Browsing requires no artwork regeneration. Rendering scripts require Python with Pillow, fontTools, numpy, and brotli; Node with sharp; and ffmpeg. Install optional rendering dependencies in this folder with `pnpm install --ignore-workspace`, and Python dependencies in a local virtual environment from `requirements.txt`. Some historical scripts refer to original input paths; existing exports are included and do not require those inputs for browsing.

`pnpm brand-studio:legacy` serves the archived standalone HTML version. Stop the Next server first if using its default port 3012. The old labs directory is a compatibility symlink to this canonical artwork folder. Artwork was relocated without re-rendering.

### Earlier podcast kit study

Open **http://localhost:3012/podcast-kit.html**, or choose **Podcast kit** in the Studio header. Compare three coordinated palette directions: blue, forest, and lime. Each has a six-second silent opening, a twelve-second background loop, solo and two-speaker frames, an editable episode thumbnail, and a clean background. All remain proposed for visual review.

Use **Play opening** to see the full logo reveal. Edit the example episode to update the frame and thumbnail text. PNG and SVG downloads reflect those changes. For speaker frames, choose **Frame + camera windows** for a still overlay, or **Labels only for moving background** to place above footage while the looping MP4 sits underneath it. The downloadable sample ZIP uses the example episode details; MP4s contain no episode-specific text. The six MP4s are 1920 × 1080, H.264, 24 fps, and silent.

The shared native-vector composition lives in `podcast-scenes.mjs`; `scripts/render-podcast-kit.py` exports the matching stills and videos to `assets/podcast-kit`. Earlier podcast assets and the original creator remain available.

## Where things live

An earlier editorial review is **http://localhost:3012/?collection=editorial-09#browse**. It contains five subtle edge-gradient edits of the selected thumbnails, a switch to compare the originals, and two illustrations shown inside sample article passages. Each new image has its exact built-in image-generation prompt and remains proposed. The reusable brief in `editorial-09-recipe.md` chooses among diagrams, charts, infographics, and metaphorical or anthropomorphic illustration according to what best explains the idea. The study ZIP includes the seven new images, five originals, prompts, and provenance.

| File / directory | Purpose |
| --- | --- |
| DESIGN-SYSTEM.md | Portable written design reference |
| assets/logos | Exact symbol and outlined wordmark; SVG and transparent PNG |
| assets/podcast | Three 1920 × 1080 backgrounds |
| assets/social | Six templates and three banner canvases |
| assets/editorial | Eight original vector cover directions |
| assets/environments | Current sky and meadow, plus a proposed listening room |
| assets/backgrounds | Original 50-image study: ten styles, five selections each |
| assets/refinements | Focused blue/lime abstractions and editorial cover proposals |
| assets/explorations-02 | Eighteen variations: six gradients, six grainy airbrush treatments, and six forest/blue/lime backgrounds |
| assets/motion | Silent 3-second intro, 3-second outro, 8-second loop; 1080p MP4 |
| assets/fonts | Local fonts and licenses |
| asset-manifest.json | Generated asset index |
| environment-manifest.json | Environment index, kept separate from generated assets |
| background-manifest.json | The selected 50 background studies, with prompts and provenance |
| background-palettes.json | Six existing core colors, sixteen proposed related tones, and color combinations |
| refinement-manifest.json | First explorations, including their generation prompts and sources |
| exploration-manifest.json | Round 02 backgrounds, with colors, noise descriptions, prompts, and original sources |
| preferences.json | Selected visual references and the user's creative feedback |
| recipes.json | Reusable prompts and composition constraints |
| decisions.json | Decisions already made in the design conversation |
| scripts/build-assets.py | Rebuilds the supplied SVG, PNG, and motion kit |
| scripts/build-announcement-v2.py | Recreates the simplified announcement after the original kit build |
| scripts/collect-backgrounds.py | Validates and collects the original 50 studies; use --complete to require all of them |
| scripts/collect-explorations.py | Validates and collects round 02; use --complete to require all eighteen |

## What is approved

The Sky identity, exact Recoup mark, direct copywriting, and podcast name come from existing decisions. **New compositions and exports are proposed for review.** Choosing a name does not approve all the artwork that uses it. A local review never publishes an asset or changes these source files.

The creator uses example episode details. Replace them before use. Its SVG exports contain editable text and shapes; local fonts may need installing in some design applications. PNG files preserve the rendered appearance. The logo SVGs use outlines, so they do not depend on fonts.

In New explorations, filter by Gradients, Grainy airbrush, or Forest + blue + lime. The headline preview adds the same editorial type over every background, with ivory, dark ink, and lime color choices. This overlay is only a viewing aid; the downloaded PNG remains text-free. Palette swatches describe generation inputs, not exact sampled output colors.

The banner names describe prepared canvases, not a guarantee of every platform’s current crop. Check the final crop where you post. The motion kit is silent and has no licensed soundtrack or sonic identity.

## Extend the system

1. Start with a recipe and an existing reference asset.
2. Keep the logo, typography, palette roles, lighting, and reading order consistent.
3. Give a new composition a unique asset ID and a proposed status. Preserve the previous version.
4. Add its files and dimensions to the appropriate manifest.
5. Review the result at its intended size, record the decision, and export the notebook.

The parent DESIGN.md remains the website’s implementation guide. This Studio is the first shared reference for broader brand applications; it does not automatically migrate product components or tokens.

## Source and provenance

The mark and base imagery were taken from the current Recoup Sky marketing implementation. Environment sources and the complete new-image prompt are recorded in assets/environments/provenance.json. The editorial covers are native vector compositions. Third-party references in Learn are inspiration links; their artwork is not distributed in this kit.

The background study and the new editorial cover explorations use built-in image generation. Their indices retain the actual prompts, reference paths, original sources, and output dimensions. The reference-only and open-color variations deliberately relax the numerical palette. Original files are preserved; none of these studies is automatically published or approved.

The generator requires Python with Pillow and fontTools, plus ffmpeg and an SVG renderer as specified in its header. Browsing the finished Studio requires no installation or build step.

## Media storage and publishing

The `recoup-brand-assets` public Blob store is connected to marketing. Original images, fonts, SVG exports, video, and ZIPs stay out of Git and deployment uploads. The local originals remain in assets/. `blob-assets.json` stores their immutable URLs, sizes, and SHA-256 hashes.

Run `pnpm brand-studio:publish-assets` after adding or changing artwork. The upload tool requires the connected store token in .env.local, skips unchanged files, verifies uploaded sizes, and checkpoints its manifest. It never deletes old objects. Commit the manifest with the catalogue and code; deploy the marketing app. Older deployments keep their original asset URLs. Do not delete a Blob object while any release still references it.

The app does not need the write token to display public artwork. Native downloads request Blob's forced-download URL. The compatibility route keeps existing /brand/assets paths usable. .vercelignore excludes the migrated media; regenerate its file list when adding original media before deployment.
