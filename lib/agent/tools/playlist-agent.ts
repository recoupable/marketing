import { tool } from "ai";
import { z } from "zod";

const playlistAgentInputSchema = z.object({
  artist: z
    .string()
    .min(1)
    .describe("Artist name to find playlist-fit matches for"),
});

const playlistItemSchema = z.object({
  name: z.string(),
  curator: z.string(),
  followers: z.number().int().nonnegative(),
  fitScore: z
    .number()
    .min(0)
    .max(1)
    .describe("0-1 estimated playlist fit based on genre + audience + sonic match"),
  recentlyAdded: z
    .boolean()
    .describe("True if this playlist added artists in the last 30 days"),
  submissionUrl: z.string().url().nullable(),
});

const playlistAgentOutputSchema = z.object({
  reference: z.string(),
  playlists: z.array(playlistItemSchema).min(1).max(10),
});

export type PlaylistAgentOutput = z.infer<typeof playlistAgentOutputSchema>;
export type PlaylistMatch = PlaylistAgentOutput["playlists"][number];

const MOCK_PLAYLISTS: Record<string, PlaylistMatch[]> = {
  sza: [
    {
      name: "RapCaviar",
      curator: "Spotify",
      followers: 14_200_000,
      fitScore: 0.97,
      recentlyAdded: true,
      submissionUrl: null,
    },
    {
      name: "Are & Be",
      curator: "Spotify",
      followers: 5_100_000,
      fitScore: 0.96,
      recentlyAdded: true,
      submissionUrl: null,
    },
    {
      name: "Mood Booster",
      curator: "Spotify",
      followers: 8_700_000,
      fitScore: 0.84,
      recentlyAdded: false,
      submissionUrl: null,
    },
    {
      name: "Chilled R&B",
      curator: "Apple Music",
      followers: 1_400_000,
      fitScore: 0.95,
      recentlyAdded: true,
      submissionUrl: null,
    },
    {
      name: "Slow R&B",
      curator: "Indie · Cookie",
      followers: 420_000,
      fitScore: 0.93,
      recentlyAdded: true,
      submissionUrl: "https://submithub.com/playlist/slow-rnb",
    },
    {
      name: "Velvet Dreams",
      curator: "Indie · Lush Sounds",
      followers: 86_000,
      fitScore: 0.91,
      recentlyAdded: true,
      submissionUrl: "https://submithub.com/playlist/velvet-dreams",
    },
    {
      name: "Late Night Soul",
      curator: "Indie · After Hours",
      followers: 64_000,
      fitScore: 0.88,
      recentlyAdded: false,
      submissionUrl: "https://submithub.com/playlist/late-night-soul",
    },
    {
      name: "Yoga & Meditation",
      curator: "Spotify",
      followers: 6_300_000,
      fitScore: 0.42,
      recentlyAdded: false,
      submissionUrl: null,
    },
  ],
};

function getMockPlaylists(reference: string): PlaylistAgentOutput {
  const key = reference.toLowerCase().split(/\s+/)[0];
  const matches = MOCK_PLAYLISTS[key] ?? MOCK_PLAYLISTS["sza"];
  return { reference, playlists: matches };
}

/**
 * Playlist Agent — finds editorial + indie playlists that fit an artist's
 * genre/audience profile, with submission paths for the indie ones.
 *
 * Day 1 ships with mock data so we can build the parallel-fan-out UI
 * without juggling endpoint quirks. Day 4 swaps to
 * `/research/playlists?artist=...` against the live Recoup API.
 */
export const playlistAgentTool = tool({
  description:
    "Scan editorial and indie playlists for fit with a given artist's genre, audience, and sonic profile. Returns up to 10 ranked playlist matches with curator, follower count, a 0-1 fit score, whether they've added new artists recently, and submission URLs where available. Use when the user asks about playlists, pitching, placement opportunities, or launching a song/single.",
  inputSchema: playlistAgentInputSchema,
  outputSchema: playlistAgentOutputSchema,
  execute: async ({ artist }) => {
    return getMockPlaylists(artist);
  },
});
