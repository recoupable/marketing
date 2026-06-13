import { siteConfig } from "@/lib/config";
import type { StatItem } from "@/components/marketing/StatsStrip";

/**
 * Proof stats (W-07 / W-17). Verifiable numbers only — each maps to something
 * a visitor can click through and confirm. Keep counts honest; update when the
 * underlying numbers change.
 *
 * Sources:
 * - 11 open skills: github.com/recoupable/skills (skills/ folder count)
 * - 19 research pieces: /blog (getAllContent length at time of writing)
 * - 8 teams: lib/customerLogos.ts (CUSTOMER_LOGOS length)
 * - 1 label: Recoup Records / Gatsby Grace dogfooding
 */
export const HOMEPAGE_STATS: readonly StatItem[] = [
  { value: "11", label: "Open-source skills", href: siteConfig.skillsRepoUrl, external: true },
  { value: "19", label: "Research pieces published", href: "/blog" },
  { value: "8", label: "Labels, distributors & platforms" },
  { value: "1", label: "Label we run ourselves", href: "/company/recoup-records" },
] as const;
