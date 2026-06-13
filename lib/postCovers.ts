/**
 * Per-post cover art (D-09 follow-up).
 *
 * Beats (lib/beats.ts) give each post a color + kicker for editorial identity,
 * but a single beat cover means every post in a beat shares one image. This map
 * gives each post its OWN topic-specific illustration — same locked style
 * (19th-century engraving + flat beat-color block) — so cards read as distinct
 * articles, not five copies of the same picture.
 *
 * Images live in /public/art/posts/<slug>.jpg. The flat color block in each
 * illustration matches the post's beat color, so the system stays coherent.
 *
 * No node imports — safe for client components.
 */

/** Slugs that have a bespoke per-post cover at /art/posts/<slug>.jpg. */
const POST_COVER_SLUGS: ReadonlySet<string> = new Set([
  // Agent Diaries (purple)
  "open-labels",
  "sandbox-for-record-labels",
  "recoup-in-2026",
  "why-artists-need-ai-agents",
  "install-marketplace-claude-desktop",
  // Vibe Check (green)
  "meta-bought-manus-agents-break",
  // Release Radar (orange)
  "how-much-does-ai-music-marketing-cost",
  "ai-content-creation-musicians",
  "ai-music-marketing-roi",
  "independent-artist-marketing-guide",
  "music-release-strategy-2026",
  "ai-music-marketing",
  // Catalog Files (teal)
  "ai-catalog-marketing-passive-revenue",
  // Label Ops (blue)
  "ai-ar-artist-discovery",
  "ai-music-distribution-automation",
  "music-executive-guide-ai-agents",
  "ai-for-record-labels",
  "ai-music-manager-tools",
  "how-labels-use-ai",
  "ai-replacing-music-marketing-teams",
]);

/**
 * Resolve a slug to its bespoke cover, or undefined if none exists (callers
 * fall back to the beat cover).
 */
export function postCoverForSlug(slug: string): string | undefined {
  return POST_COVER_SLUGS.has(slug) ? `/art/posts/${slug}.jpg` : undefined;
}
