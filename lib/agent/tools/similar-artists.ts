import { tool } from "ai";
import { z } from "zod";
import { siteConfig } from "@/lib/config";

const similarArtistInputSchema = z.object({
  artist: z
    .string()
    .min(1)
    .describe("The reference artist's name to find similar artists for"),
});

const careerStageSchema = z
  .enum(["superstar", "mainstream", "mid_level", "developing", "early"])
  .describe("Recoup career-stage classification");

const momentumSchema = z
  .enum(["growth", "stable", "decline"])
  .describe("Trailing-window momentum signal");

const similarArtistItemSchema = z.object({
  name: z.string(),
  image: z.string().url().nullable(),
  monthlyListeners: z
    .number()
    .int()
    .nonnegative()
    .describe("Monthly Spotify listeners"),
  spotifyFollowers: z
    .number()
    .int()
    .nonnegative()
    .describe("Spotify followers"),
  primaryGenre: z.string(),
  careerStage: careerStageSchema.nullable(),
  momentum: momentumSchema.nullable(),
  similarity: z
    .number()
    .min(0)
    .max(1)
    .describe("0-1 similarity score from Recoup's similarity model"),
  label: z.string().nullable(),
  matchReason: z
    .string()
    .describe("Short data-driven explanation of why this artist matches"),
});

const similarArtistsOutputSchema = z.object({
  reference: z.string(),
  similar: z.array(similarArtistItemSchema).min(1).max(6),
});

export type SimilarArtistsInput = z.infer<typeof similarArtistInputSchema>;
export type SimilarArtistsOutput = z.infer<typeof similarArtistsOutputSchema>;
export type SimilarArtist = SimilarArtistsOutput["similar"][number];

interface RawRecoupSimilarArtist {
  name?: string;
  image_url?: string | null;
  sp_monthly_listeners?: number;
  sp_followers?: number;
  primary_genre_smart?: { name?: string } | null;
  genres?: { name?: string }[];
  career_stage?: string | null;
  recent_momentum?: string | null;
  similarity?: number;
  label?: string | null;
}

interface RawRecoupSimilarResponse {
  status?: string;
  artists?: RawRecoupSimilarArtist[];
}

const VALID_CAREER_STAGES = new Set([
  "superstar",
  "mainstream",
  "mid_level",
  "developing",
  "early",
]);

const VALID_MOMENTUM = new Set(["growth", "stable", "decline"]);

/**
 * Synthesize a short, data-driven match reason from Recoup's structured
 * similarity output. We deliberately avoid LLM-generated prose here so the
 * one-liner stays factual and consistent across calls.
 */
function buildMatchReason(a: RawRecoupSimilarArtist): string {
  const matchPct = a.similarity != null ? Math.round(a.similarity * 100) : null;
  const stage = a.career_stage?.replace("_", "-") ?? null;
  const momentumIcon =
    a.recent_momentum === "growth"
      ? "rising"
      : a.recent_momentum === "decline"
        ? "cooling"
        : a.recent_momentum === "stable"
          ? "steady"
          : null;
  const genre = a.primary_genre_smart?.name ?? a.genres?.[0]?.name ?? null;

  const parts: string[] = [];
  if (matchPct != null) parts.push(`${matchPct}% match`);
  if (stage && genre) parts.push(`${stage} in ${genre}`);
  else if (genre) parts.push(genre);
  else if (stage) parts.push(stage);
  if (momentumIcon) parts.push(momentumIcon);

  if (!parts.length) return "Sonically and audience-adjacent.";
  return parts.join(" · ");
}

function normalizeCareerStage(raw: string | null | undefined) {
  if (!raw) return null;
  return VALID_CAREER_STAGES.has(raw)
    ? (raw as SimilarArtist["careerStage"])
    : null;
}

function normalizeMomentum(raw: string | null | undefined) {
  if (!raw) return null;
  return VALID_MOMENTUM.has(raw) ? (raw as SimilarArtist["momentum"]) : null;
}

/**
 * Calls Recoup's similarity model via `GET /api/research/similar`. The
 * upstream response includes the reference artist itself with similarity=1,
 * so we filter that out and take the next 6 most similar.
 *
 * If the API errors or returns no usable matches, the tool throws — the
 * agent loop then composes a plain-prose fallback ("I couldn't pull live
 * similarity data right now") rather than rendering an empty card.
 */
async function fetchSimilarArtists(
  reference: string,
): Promise<SimilarArtistsOutput> {
  const apiKey = process.env.RECOUP_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RECOUP_API_KEY missing — cannot call /research/similar from marketing demo",
    );
  }

  const params = new URLSearchParams({
    artist: reference,
    limit: "10",
  });
  const url = `${siteConfig.apiUrl}/research/similar?${params}`;

  const res = await fetch(url, {
    headers: { "x-api-key": apiKey },
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(
      `/research/similar failed: ${res.status} ${res.statusText}`,
    );
  }

  const data = (await res.json()) as RawRecoupSimilarResponse;
  const raw = data.artists ?? [];

  // Filter out the reference artist (similarity = 1) and any rows that lack
  // the bare-minimum fields the renderer needs.
  const filtered = raw.filter(
    (a) =>
      a.name &&
      typeof a.sp_monthly_listeners === "number" &&
      typeof a.similarity === "number" &&
      a.similarity < 1,
  );

  const similar: SimilarArtist[] = filtered.slice(0, 6).map((a) => ({
    name: a.name as string,
    image: a.image_url ?? null,
    monthlyListeners: a.sp_monthly_listeners ?? 0,
    spotifyFollowers: a.sp_followers ?? 0,
    primaryGenre:
      a.primary_genre_smart?.name ?? a.genres?.[0]?.name ?? "—",
    careerStage: normalizeCareerStage(a.career_stage),
    momentum: normalizeMomentum(a.recent_momentum),
    similarity: a.similarity ?? 0,
    label: a.label ?? null,
    matchReason: buildMatchReason(a),
  }));

  if (similar.length === 0) {
    throw new Error("No similar artists returned from Recoup");
  }

  return { reference, similar };
}

export const similarArtistsTool = tool({
  description:
    "Find artists similar to a given artist using Recoup's audience + genre similarity model. Returns up to 6 sonically and audience-adjacent artists with monthly listener counts, primary genre, career stage, momentum, label, and a similarity score. Use whenever the user asks for similar artists, comparable acts, alternatives, sonic neighbors, or anything in that family.",
  inputSchema: similarArtistInputSchema,
  outputSchema: similarArtistsOutputSchema,
  execute: async ({ artist }) => {
    return fetchSimilarArtists(artist);
  },
});
