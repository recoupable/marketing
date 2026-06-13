/**
 * Diligence sample page copy (W-15) — the visible artifact the catalog buyer
 * needs. Numbers are illustrative of a redacted sample output, clearly labeled
 * as a sample, not a real catalog. The point is to show the *shape* of what the
 * catalog-diligence workflow produces.
 */
import { siteConfig } from "@/lib/config";

export const diligenceCopy = {
  title: "See a catalog diligence report.",
  subtitle:
    "What the catalog-deals workflow produces from a data room — income summary, top tracks, vintage, and an IC-memo draft. This is a redacted sample, not a real catalog.",

  /** Headline income summary plaques. */
  summary: [
    { value: "$1.24M", label: "TTM net publisher share" },
    { value: "$5.8M", label: "Modeled purchase price (4.7×)" },
    { value: "-6.2%", label: "3-yr revenue decay (annualized)" },
    { value: "62%", label: "Income from top 20 tracks" },
  ],

  /** Top tracks table — redacted titles. */
  topTracks: [
    { track: "Track A — [redacted]", year: "2019", ttm: "$184k", share: "14.8%" },
    { track: "Track B — [redacted]", year: "2020", ttm: "$121k", share: "9.8%" },
    { track: "Track C — [redacted]", year: "2018", ttm: "$96k", share: "7.7%" },
    { track: "Track D — [redacted]", year: "2021", ttm: "$74k", share: "6.0%" },
    { track: "Track E — [redacted]", year: "2017", ttm: "$58k", share: "4.7%" },
  ],

  /** Flags the workflow surfaces automatically. */
  flags: [
    {
      level: "Watch",
      body: "Two of the top-5 tracks share a featured writer whose split is unconfirmed in the data room — rights-check before close.",
    },
    {
      level: "Positive",
      body: "Sync income grew 18% YoY against an overall -6% trend; placement pipeline looks underexploited.",
    },
    {
      level: "Watch",
      body: "31% of streams concentrated in one DSP-editorial playlist added in 2023 — playlist-dependency risk on renewal.",
    },
  ],

  /** Excerpt from the auto-drafted IC memo. */
  memoExcerpt:
    "Recommendation: proceed to LOI at or below 4.5× TTM NPS. The catalog's decay is steeper than the comp set, but stable sync income and an under-pitched top five support a reactivation thesis. Primary risk is unconfirmed writer splits on ~25% of income; condition any offer on a clean rights certification.",
  repoUrl: `${siteConfig.skillsRepoUrl}/tree/main/skills/catalog-value-estimator`,
} as const;
