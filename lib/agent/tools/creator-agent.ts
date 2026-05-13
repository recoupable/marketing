import { tool } from "ai";
import { z } from "zod";

const creatorAgentInputSchema = z.object({
  artist: z
    .string()
    .min(1)
    .describe("Artist name to find audience-matched creators for"),
});

const creatorSchema = z.object({
  handle: z.string(),
  platform: z.enum(["tiktok", "instagram"]),
  followers: z.number().int().nonnegative(),
  audienceMatch: z
    .number()
    .min(0)
    .max(1)
    .describe("0-1 audience-overlap score with the reference artist's listeners"),
  recentMusicPosts: z
    .number()
    .int()
    .nonnegative()
    .describe("Count of music-related posts in last 30 days"),
  avatarUrl: z.string().url().nullable(),
});

const creatorAgentOutputSchema = z.object({
  reference: z.string(),
  creators: z.array(creatorSchema).min(1).max(6),
});

export type CreatorAgentOutput = z.infer<typeof creatorAgentOutputSchema>;
export type Creator = CreatorAgentOutput["creators"][number];

const MOCK_CREATORS: Record<string, Creator[]> = {
  sza: [
    {
      handle: "@notlinawaithe",
      platform: "tiktok",
      followers: 2_100_000,
      audienceMatch: 0.94,
      recentMusicPosts: 12,
      avatarUrl: null,
    },
    {
      handle: "@kennedy.eurich",
      platform: "tiktok",
      followers: 1_400_000,
      audienceMatch: 0.91,
      recentMusicPosts: 8,
      avatarUrl: null,
    },
    {
      handle: "@aliyahsinterlude",
      platform: "instagram",
      followers: 880_000,
      audienceMatch: 0.93,
      recentMusicPosts: 6,
      avatarUrl: null,
    },
    {
      handle: "@theshyloft",
      platform: "tiktok",
      followers: 320_000,
      audienceMatch: 0.89,
      recentMusicPosts: 14,
      avatarUrl: null,
    },
  ],
};

function getMockCreators(reference: string): CreatorAgentOutput {
  const key = reference.toLowerCase().split(/\s+/)[0];
  const creators = MOCK_CREATORS[key] ?? MOCK_CREATORS["sza"];
  return { reference, creators };
}

/**
 * Creator Agent — surfaces TikTok and Instagram creators whose audience
 * profile overlaps with the artist's listeners. Ranked by audience-match
 * percentage, with recent music-post count as a "warm-lead" signal.
 *
 * Day 1 ships with mock data so we can build the parallel-fan-out UI
 * without juggling endpoint quirks. Day 4 swaps to
 * `/research/people?artist=...` + `/research/instagram-posts?artist=...`
 * against the live Recoup API.
 */
export const creatorAgentTool = tool({
  description:
    "Find TikTok and Instagram creators whose audience profile overlaps with the artist's listeners — useful for promo outreach, influencer matching, and viral seeding. Returns up to 6 creators ranked by audience-match score, with handle, platform, follower count, and recent music-post count as a warm-lead signal. Use when the user asks about creators, influencers, TikTok promo, IG promo, virality, or seeding a song.",
  inputSchema: creatorAgentInputSchema,
  outputSchema: creatorAgentOutputSchema,
  execute: async ({ artist }) => {
    return getMockCreators(artist);
  },
});
