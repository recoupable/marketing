import { tool } from "ai";
import { z } from "zod";

const audienceAgentInputSchema = z.object({
  artist: z
    .string()
    .min(1)
    .describe("Artist name to pull audience intelligence for"),
});

const marketSchema = z.object({
  city: z.string(),
  country: z.string(),
  listeners: z.number().int().nonnegative(),
  trend: z
    .enum(["growth", "stable", "decline"])
    .describe("30-day listener trend in this market"),
});

const audienceAgentOutputSchema = z.object({
  reference: z.string(),
  totalMonthlyListeners: z.number().int().nonnegative(),
  topMarkets: z.array(marketSchema).min(1).max(5),
  ageSplit: z.object({
    "18-24": z.number().min(0).max(1),
    "25-34": z.number().min(0).max(1),
    "35-44": z.number().min(0).max(1),
    "45+": z.number().min(0).max(1),
  }),
  genderSplit: z.object({
    female: z.number().min(0).max(1),
    male: z.number().min(0).max(1),
    other: z.number().min(0).max(1),
  }),
});

export type AudienceAgentOutput = z.infer<typeof audienceAgentOutputSchema>;
export type Market = AudienceAgentOutput["topMarkets"][number];

const MOCK_AUDIENCE: Record<string, AudienceAgentOutput> = {
  sza: {
    reference: "SZA",
    totalMonthlyListeners: 69_937_628,
    topMarkets: [
      { city: "New York", country: "US", listeners: 4_120_000, trend: "stable" },
      { city: "Los Angeles", country: "US", listeners: 3_870_000, trend: "growth" },
      { city: "São Paulo", country: "BR", listeners: 2_640_000, trend: "growth" },
      { city: "London", country: "GB", listeners: 2_180_000, trend: "stable" },
      { city: "Mexico City", country: "MX", listeners: 1_920_000, trend: "growth" },
    ],
    ageSplit: { "18-24": 0.42, "25-34": 0.36, "35-44": 0.16, "45+": 0.06 },
    genderSplit: { female: 0.61, male: 0.36, other: 0.03 },
  },
};

function getMockAudience(reference: string): AudienceAgentOutput {
  const key = reference.toLowerCase().split(/\s+/)[0];
  return {
    ...(MOCK_AUDIENCE[key] ?? MOCK_AUDIENCE["sza"]),
    reference,
  };
}

/**
 * Audience Agent — pulls demographics + geographic concentration for an
 * artist. Surfaces top 5 cities with trend direction, age split,
 * gender split, and total monthly listeners.
 *
 * Day 1 ships with mock data so we can build the parallel-fan-out UI
 * without juggling endpoint quirks. Day 4 swaps to
 * `/research/audience?artist=...` + `/research/cities?artist=...`
 * against the live Recoup API.
 */
export const audienceAgentTool = tool({
  description:
    "Pull audience intelligence for an artist: top 5 cities with 30-day trend direction, age and gender splits, and total monthly listeners. Use whenever the user asks about audience, demographics, fans, where their listeners live, top markets, or who's listening.",
  inputSchema: audienceAgentInputSchema,
  outputSchema: audienceAgentOutputSchema,
  execute: async ({ artist }) => {
    return getMockAudience(artist);
  },
});
