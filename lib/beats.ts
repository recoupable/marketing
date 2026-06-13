/**
 * Editorial beats (W-26) — named recurring formats, Every-style.
 *
 * A beat is a promise the reader learns to seek out ("Vibe Check" = model
 * verdicts for music teams). Beats are orthogonal to the category filter
 * (essay/guide/tutorial): a guide can belong to Release Radar, an essay to
 * Agent Diaries. The slug → beat map below is the single source of truth for
 * existing content; new MDX posts can also set `series` in frontmatter, which
 * wins over this map.
 *
 * No node imports — safe for client components.
 */

export type BeatId =
  | "release-radar"
  | "label-ops"
  | "catalog-files"
  | "agent-diaries"
  | "vibe-check";

export interface Beat {
  id: BeatId;
  name: string;
  /** One-line promise shown as a tooltip/eyebrow. */
  promise: string;
  /** Card cover color (light theme); pairs with white type. */
  color: string;
  /** Cover illustration (D-01) — engraving + flat-color-block system. */
  cover: string;
}

export const BEATS: Record<BeatId, Beat> = {
  "release-radar": {
    id: "release-radar",
    name: "Release Radar",
    promise: "Release, marketing & content playbooks you can run this week.",
    color: "#ea580c",
    cover: "/art/beat-release-radar.jpg",
  },
  "label-ops": {
    id: "label-ops",
    name: "Label Ops",
    promise: "How labels, distributors & managers actually deploy AI.",
    color: "#2563eb",
    cover: "/art/beat-label-ops.jpg",
  },
  "catalog-files": {
    id: "catalog-files",
    name: "Catalog Files",
    promise: "Catalog, diligence & royalty intelligence.",
    color: "#0d9488",
    cover: "/art/beat-catalog-files.jpg",
  },
  "agent-diaries": {
    id: "agent-diaries",
    name: "Agent Diaries",
    promise: "Operational notes from running our own label on agents.",
    color: "#9333ea",
    cover: "/art/beat-agent-diaries.jpg",
  },
  "vibe-check": {
    id: "vibe-check",
    name: "Vibe Check",
    promise: "Model & tool verdicts for music teams, on release day.",
    color: "#16a34a",
    cover: "/art/beat-vibe-check.jpg",
  },
};

export const BEAT_ORDER: readonly BeatId[] = [
  "release-radar",
  "label-ops",
  "catalog-files",
  "agent-diaries",
  "vibe-check",
];

export function isBeatId(value: string | undefined): value is BeatId {
  return value !== undefined && value in BEATS;
}

/** Existing content, retagged (W-26). New posts set `series` in frontmatter. */
export const BEAT_BY_SLUG: Record<string, BeatId> = {
  // Release Radar — releases, marketing, content
  "ai-music-marketing": "release-radar",
  "music-release-strategy-2026": "release-radar",
  "ai-content-creation-musicians": "release-radar",
  "independent-artist-marketing-guide": "release-radar",
  "ai-music-marketing-roi": "release-radar",
  "how-much-does-ai-music-marketing-cost": "release-radar",

  // Label Ops — labels, distributors, managers, execs
  "ai-for-record-labels": "label-ops",
  "how-labels-use-ai": "label-ops",
  "ai-music-distribution-automation": "label-ops",
  "music-executive-guide-ai-agents": "label-ops",
  "ai-music-manager-tools": "label-ops",
  "ai-replacing-music-marketing-teams": "label-ops",
  "ai-ar-artist-discovery": "label-ops",

  // Catalog Files — catalog, diligence, royalties
  "ai-catalog-marketing-passive-revenue": "catalog-files",

  // Agent Diaries — essays + operational notes from our own stack
  "why-artists-need-ai-agents": "agent-diaries",
  "open-labels": "agent-diaries",
  "sandbox-for-record-labels": "agent-diaries",
  "recoup-in-2026": "agent-diaries",
  "install-marketplace-claude-desktop": "agent-diaries",

  // Vibe Check — model/tool verdicts and industry signal reads
  "meta-bought-manus-agents-break": "vibe-check",
};

export function beatForSlug(
  slug: string,
  frontmatterSeries?: string,
): Beat | undefined {
  if (isBeatId(frontmatterSeries)) return BEATS[frontmatterSeries];
  const mapped = BEAT_BY_SLUG[slug];
  return mapped ? BEATS[mapped] : undefined;
}
