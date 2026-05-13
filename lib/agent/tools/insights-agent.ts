import { tool } from "ai";
import { z } from "zod";

const insightsAgentInputSchema = z.object({
  artist: z
    .string()
    .min(1)
    .describe("Artist name to pull noteworthy highlights + trends for"),
});

const insightSchema = z.object({
  headline: z.string().describe("One-line takeaway"),
  detail: z
    .string()
    .describe("One sentence of supporting context with a specific stat"),
  sentiment: z
    .enum(["positive", "neutral", "warning"])
    .describe("Color-codes the insight in the UI"),
  recency: z
    .enum(["last_24h", "last_7d", "last_30d", "longer"])
    .describe("When the underlying event happened"),
});

const trendPointSchema = z.object({
  month: z.string().describe("YYYY-MM"),
  listeners: z.number().int().nonnegative(),
});

const insightsAgentOutputSchema = z.object({
  reference: z.string(),
  insights: z.array(insightSchema).min(1).max(5),
  monthlyListenerTrend: z.array(trendPointSchema).min(2).max(12),
});

export type InsightsAgentOutput = z.infer<typeof insightsAgentOutputSchema>;
export type Insight = InsightsAgentOutput["insights"][number];

const MOCK_INSIGHTS: Record<string, InsightsAgentOutput> = {
  sza: {
    reference: "SZA",
    insights: [
      {
        headline: "Just added to RapCaviar",
        detail: "Added 2 hours ago, currently at position #4 with 14.2M reach.",
        sentiment: "positive",
        recency: "last_24h",
      },
      {
        headline: "São Paulo audience is breaking out",
        detail: "Brazil listeners +34% MoM — fastest-growing market in the top 5.",
        sentiment: "positive",
        recency: "last_30d",
      },
      {
        headline: "Catalog reach hit a new high",
        detail: "Total Spotify playlist reach crossed 610M — first time over that line.",
        sentiment: "positive",
        recency: "last_7d",
      },
      {
        headline: "TikTok engagement softening",
        detail: "Music-tagged posts -12% week-over-week despite stable listener count.",
        sentiment: "warning",
        recency: "last_7d",
      },
      {
        headline: "Stable in core US markets",
        detail: "NY + LA listener counts flat — no decay, no growth in the home markets.",
        sentiment: "neutral",
        recency: "last_30d",
      },
    ],
    monthlyListenerTrend: [
      { month: "2025-06", listeners: 62_400_000 },
      { month: "2025-07", listeners: 63_100_000 },
      { month: "2025-08", listeners: 64_800_000 },
      { month: "2025-09", listeners: 65_300_000 },
      { month: "2025-10", listeners: 66_100_000 },
      { month: "2025-11", listeners: 67_900_000 },
      { month: "2025-12", listeners: 68_400_000 },
      { month: "2026-01", listeners: 69_000_000 },
      { month: "2026-02", listeners: 69_400_000 },
      { month: "2026-03", listeners: 69_600_000 },
      { month: "2026-04", listeners: 69_800_000 },
      { month: "2026-05", listeners: 69_937_628 },
    ],
  },
};

function getMockInsights(reference: string): InsightsAgentOutput {
  const key = reference.toLowerCase().split(/\s+/)[0];
  return {
    ...(MOCK_INSIGHTS[key] ?? MOCK_INSIGHTS["sza"]),
    reference,
  };
}

/**
 * Insights Agent — surfaces trending highlights, recent activity, and
 * a 12-month listener trend for an artist. Each insight is sentiment-tagged
 * (positive / neutral / warning) and recency-tagged so the UI can prioritize.
 *
 * Day 1 ships with mock data so we can build the parallel-fan-out UI
 * without juggling endpoint quirks. Day 4 swaps to
 * `/research/insights?artist=...` + `/research/metrics?artist=...`
 * against the live Recoup API.
 */
export const insightsAgentTool = tool({
  description:
    "Pull noteworthy highlights, recent activity, and a 12-month listener trend for an artist. Returns 3-5 sentiment-tagged insights (playlist adds, audience trend shifts, TikTok signals, market growth/decline) plus a monthly listener time series. Use whenever the user asks what's happening with an artist, what's new, what's trending, what to watch out for, recent activity, or growth trajectory.",
  inputSchema: insightsAgentInputSchema,
  outputSchema: insightsAgentOutputSchema,
  execute: async ({ artist }) => {
    return getMockInsights(artist);
  },
});
