import episodes from "../../content/podcast/episodes.json";
import { episodeSchema, type Episode } from "./episodeSchema.ts";

/** The published episodes, validated and sorted newest first. */
export function readEpisodes(): Episode[] {
  return episodes.map((episode) => episodeSchema.parse(episode)).sort((a, b) => b.date.localeCompare(a.date));
}
