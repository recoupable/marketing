/**
 * Compare page copy — single source of truth.
 * Competitive comparison: Recoup vs alternatives.
 */

export type SupportLevel = "full" | "partial" | "none";

export interface ComparisonRow {
  capability: string;
  recoup: { level: SupportLevel; note: string };
  humans: { level: SupportLevel; note: string };
  agency: { level: SupportLevel; note: string };
  genericAI: { level: SupportLevel; note: string };
}

export interface CostRow {
  label: string;
  traditional: string;
  recoup: string;
  savings: string;
  source: string;
}

export const compareCopy = {
  title: "Why Recoup?",
  description:
    "Generic AI doesn't understand music. Agencies are slow and expensive. Recoup is purpose-built music intelligence — agents that know your artists, your data, and your industry.",

  columns: ["Recoup", "In-House Team", "Creative Agency", "ChatGPT / Claude"] as const,

  rows: [
    {
      capability: "Content Creation",
      recoup: { level: "full", note: "30 days of branded content in one session" },
      humans: { level: "full", note: "High quality, slow turnaround" },
      agency: { level: "full", note: "$5K+/mo, days per batch" },
      genericAI: { level: "partial", note: "Can write, but no artist context" },
    },
    {
      capability: "Artist Research",
      recoup: { level: "full", note: "Streaming, social, audience, playlists — live data" },
      humans: { level: "partial", note: "Manual data pulls, hours per report" },
      agency: { level: "none", note: "Not typically offered" },
      genericAI: { level: "partial", note: "No access to streaming APIs" },
    },
    {
      capability: "Release Strategy",
      recoup: { level: "full", note: "Data-informed, auto-generated per release" },
      humans: { level: "full", note: "Experienced, but expensive" },
      agency: { level: "partial", note: "Template-based, not data-driven" },
      genericAI: { level: "partial", note: "Generic advice, no real data" },
    },
    {
      capability: "Social Analytics",
      recoup: { level: "full", note: "Cross-platform scraping + insights" },
      humans: { level: "partial", note: "Manual exports from each platform" },
      agency: { level: "partial", note: "Monthly reports, often delayed" },
      genericAI: { level: "none", note: "No platform access" },
    },
    {
      capability: "Catalog Valuation",
      recoup: { level: "full", note: "Real-time from streaming data" },
      humans: { level: "partial", note: "Requires specialist + weeks" },
      agency: { level: "none", note: "Not offered" },
      genericAI: { level: "none", note: "No valuation models" },
    },
    {
      capability: "Automated Reporting",
      recoup: { level: "full", note: "Weekly reports, zero human effort" },
      humans: { level: "partial", note: "40+ hours/month for a team of 5" },
      agency: { level: "partial", note: "Monthly cadence, manual process" },
      genericAI: { level: "none", note: "No scheduling or automation" },
    },
    {
      capability: "Agent Plugin Ecosystem",
      recoup: { level: "full", note: "Install plugins in Claude, Cursor, Codex" },
      humans: { level: "none", note: "N/A" },
      agency: { level: "none", note: "N/A" },
      genericAI: { level: "partial", note: "General tools, no music plugins" },
    },
  ] satisfies ComparisonRow[],

  costTitle: "The real cost of alternatives",
  costDescription:
    "Measured with a label running on Recoup today.",

  costs: [
    {
      label: "Content Agency",
      traditional: "$5,000/mo",
      recoup: "Same price, 10× the output",
      savings: "Agency eliminated + new AI artist co-created",
      source: "Rostrum Records",
    },
  ] satisfies CostRow[],

  chatgptTitle: "But can't I just use ChatGPT?",
  chatgptDescription:
    "ChatGPT can write a marketing plan. Recoup writes one informed by your artist's actual streaming data, audience demographics, playlist history, and competitive landscape.",

  chatgptPoints: [
    "No access to streaming analytics (Spotify, Apple Music, Chartmetric)",
    "No playlist intelligence or placement tracking",
    "No artist context — brand voice, catalog history, audience segments",
    "No automated workflows — can't schedule reports or content pipelines",
    "No music industry data models — catalog valuation, royalty estimation",
    "No plugin ecosystem — can't extend with music-specific tools",
  ],

  chatgptPunchline:
    "Generic AI is a blank canvas. Recoup is a music business that already knows your artists.",

  ctaPrimary: { label: "See it in action", href: "/valuation" },
  ctaSecondary: { label: "View pricing", href: "/pricing" },
};
