import episodes from "../../content/podcast/episodes.json";
import { episodeSchema, type Episode } from "./episodeSchema.ts";

/** The published episodes, validated, in the curated order of episodes.json (first entry = first card). */
export function readEpisodes(): Episode[] {
  return episodes.map((episode) => episodeSchema.parse(episode));
}
