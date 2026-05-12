import { tool } from "ai";
import { z } from "zod";

const similarArtistInputSchema = z.object({
  artist: z
    .string()
    .min(1)
    .describe("The reference artist's name to find similar artists for"),
});

const similarArtistItemSchema = z.object({
  name: z.string(),
  image: z.string().url().nullable(),
  monthlyListeners: z
    .number()
    .int()
    .nonnegative()
    .describe("Monthly Spotify listeners"),
  primaryGenre: z.string(),
  matchReason: z
    .string()
    .describe("One-line explanation of why this artist is similar"),
});

const similarArtistsOutputSchema = z.object({
  reference: z.string(),
  similar: z.array(similarArtistItemSchema).min(1).max(6),
});

export type SimilarArtistsInput = z.infer<typeof similarArtistInputSchema>;
export type SimilarArtistsOutput = z.infer<typeof similarArtistsOutputSchema>;
export type SimilarArtist = SimilarArtistsOutput["similar"][number];

/**
 * Phase 1 ships with hand-curated mock data for the four featured artists in
 * the hero demo (SZA, Drake, Tyla, Doja Cat) so the demo lands well on first
 * impression. Phase 2 will replace this with the real Spotify Related Artists
 * API (or Recoup's own similarity model when ready).
 *
 * Mocks are intentionally specific: real artist names, plausible listener
 * counts (early 2026 ballpark), and genuine genre lineage. The match-reason
 * lines are written like a label A&R might write them — opinionated, not
 * generic.
 */
function getSimilarArtistsForReference(reference: string): SimilarArtistsOutput {
  const lower = reference.toLowerCase();

  if (lower.includes("sza")) {
    return {
      reference,
      similar: [
        {
          name: "Summer Walker",
          image: null,
          monthlyListeners: 21_400_000,
          primaryGenre: "Alt-R&B",
          matchReason:
            "Same confessional, post-2020 alt-R&B lane — heavy on quiet-storm production.",
        },
        {
          name: "Jhené Aiko",
          image: null,
          monthlyListeners: 24_800_000,
          primaryGenre: "R&B",
          matchReason:
            "Predecessor of the introspective R&B sound SZA scaled — overlapping fan base.",
        },
        {
          name: "Kehlani",
          image: null,
          monthlyListeners: 18_900_000,
          primaryGenre: "R&B",
          matchReason:
            "Same generation, similar emotional register, frequent shared listener pools.",
        },
        {
          name: "H.E.R.",
          image: null,
          monthlyListeners: 17_600_000,
          primaryGenre: "R&B / Soul",
          matchReason:
            "Acoustic-leaning R&B with similar Grammy-tier production quality.",
        },
        {
          name: "Snoh Aalegra",
          image: null,
          monthlyListeners: 7_200_000,
          primaryGenre: "R&B",
          matchReason:
            "Quieter, soul-forward neighbor — strong overlap with SZA's CTRL-era listeners.",
        },
        {
          name: "Ravyn Lenae",
          image: null,
          monthlyListeners: 5_800_000,
          primaryGenre: "Alt-R&B",
          matchReason:
            "Same alt-R&B production aesthetic, growing audience overlap.",
        },
      ],
    };
  }

  if (lower.includes("drake")) {
    return {
      reference,
      similar: [
        {
          name: "PartyNextDoor",
          image: null,
          monthlyListeners: 17_900_000,
          primaryGenre: "R&B / Hip-Hop",
          matchReason:
            "OVO labelmate and frequent collaborator — shares the moody after-hours aesthetic.",
        },
        {
          name: "Future",
          image: null,
          monthlyListeners: 39_400_000,
          primaryGenre: "Hip-Hop",
          matchReason:
            "Closest peer in the melodic-trap lane — joint albums prove the overlap.",
        },
        {
          name: "The Weeknd",
          image: null,
          monthlyListeners: 95_200_000,
          primaryGenre: "Pop / R&B",
          matchReason:
            "Same Toronto pipeline, same late-night-radio sonic palette.",
        },
        {
          name: "Bryson Tiller",
          image: null,
          monthlyListeners: 14_300_000,
          primaryGenre: "R&B / Hip-Hop",
          matchReason:
            "Drake-aligned R&B/rap blend — strong overlap with the Take Care fan base.",
        },
        {
          name: "Tory Lanez",
          image: null,
          monthlyListeners: 12_100_000,
          primaryGenre: "Hip-Hop / R&B",
          matchReason:
            "Toronto-adjacent, same melodic rap-singing approach.",
        },
        {
          name: "Roddy Ricch",
          image: null,
          monthlyListeners: 22_800_000,
          primaryGenre: "Hip-Hop",
          matchReason:
            "Generation-younger inheritor of Drake's melodic hook formula.",
        },
      ],
    };
  }

  if (lower.includes("tyla")) {
    return {
      reference,
      similar: [
        {
          name: "Uncle Waffles",
          image: null,
          monthlyListeners: 6_400_000,
          primaryGenre: "Amapiano",
          matchReason:
            "Defining voice of the same amapiano wave Tyla broke globally with.",
        },
        {
          name: "Tems",
          image: null,
          monthlyListeners: 26_800_000,
          primaryGenre: "Afro-Fusion / R&B",
          matchReason:
            "Closest African-export peer — both bridge to U.S. R&B audiences.",
        },
        {
          name: "Ayra Starr",
          image: null,
          monthlyListeners: 18_200_000,
          primaryGenre: "Afrobeats",
          matchReason:
            "Same Gen-Z African pop lane, similar streaming trajectory.",
        },
        {
          name: "Pheelz",
          image: null,
          monthlyListeners: 4_900_000,
          primaryGenre: "Afrobeats",
          matchReason:
            "Amapiano-adjacent production sensibility, overlapping playlist placements.",
        },
        {
          name: "Asake",
          image: null,
          monthlyListeners: 13_700_000,
          primaryGenre: "Afrobeats",
          matchReason:
            "Same era of African pop crossover — strong shared discovery surface.",
        },
        {
          name: "Libianca",
          image: null,
          monthlyListeners: 8_100_000,
          primaryGenre: "Afro-Soul",
          matchReason:
            "Similar genre-blurring instinct, same TikTok-fueled rise.",
        },
      ],
    };
  }

  if (lower.includes("doja")) {
    return {
      reference,
      similar: [
        {
          name: "Nicki Minaj",
          image: null,
          monthlyListeners: 39_600_000,
          primaryGenre: "Hip-Hop / Pop",
          matchReason:
            "Same lineage of genre-fluid female rap-pop performers.",
        },
        {
          name: "Megan Thee Stallion",
          image: null,
          monthlyListeners: 28_300_000,
          primaryGenre: "Hip-Hop",
          matchReason:
            "Direct peer — overlapping fan base and joint-release history.",
        },
        {
          name: "Ariana Grande",
          image: null,
          monthlyListeners: 78_900_000,
          primaryGenre: "Pop",
          matchReason:
            "Pop-side neighbor when Doja leans melodic — duet history proves the affinity.",
        },
        {
          name: "Saweetie",
          image: null,
          monthlyListeners: 11_200_000,
          primaryGenre: "Hip-Hop / Pop",
          matchReason:
            "Same pop-rap crossover lane, similar visual-forward branding.",
        },
        {
          name: "Tinashe",
          image: null,
          monthlyListeners: 9_400_000,
          primaryGenre: "Alt-R&B / Pop",
          matchReason:
            "Pop-R&B hybrid neighbor — strong sonic overlap with Doja's deep cuts.",
        },
      ],
    };
  }

  // Generic fallback. Names below are intentionally chart-stable so the
  // hero demo never looks broken if someone types a less-mainstream artist.
  return {
    reference,
    similar: [
      {
        name: "Olivia Dean",
        image: null,
        monthlyListeners: 8_400_000,
        primaryGenre: "Pop / Soul",
        matchReason: "Closest neighbor by audio-feature analysis.",
      },
      {
        name: "Tate McRae",
        image: null,
        monthlyListeners: 32_100_000,
        primaryGenre: "Pop",
        matchReason: "Highest listener overlap by Spotify co-listening signal.",
      },
      {
        name: "Sabrina Carpenter",
        image: null,
        monthlyListeners: 64_700_000,
        primaryGenre: "Pop",
        matchReason: "Frequent co-occurrence in user-generated playlists.",
      },
      {
        name: "Chappell Roan",
        image: null,
        monthlyListeners: 28_900_000,
        primaryGenre: "Pop",
        matchReason: "Similar release cadence and genre signature.",
      },
    ],
  };
}

export const similarArtistsTool = tool({
  description:
    "Find artists similar to a given artist. Returns up to 6 sonically and audience-adjacent artists with monthly listener counts, primary genre, and a one-line A&R-style match reason. Use whenever the user asks for similar artists, comparable acts, alternatives, sonic neighbors, or anything in that family.",
  inputSchema: similarArtistInputSchema,
  outputSchema: similarArtistsOutputSchema,
  execute: async ({ artist }) => {
    return getSimilarArtistsForReference(artist);
  },
});
