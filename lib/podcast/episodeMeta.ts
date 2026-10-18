import type { Episode } from "./episodeSchema.ts";
import { formatDuration } from "./formatDuration.ts";
import { formatEpisodeDate } from "./formatEpisodeDate.ts";

/** "10/18/2026 · 30 min": the published date and length shown on the episode card and page. */
export function episodeMeta(episode: Pick<Episode, "date" | "durationSeconds">): string {
  return `${formatEpisodeDate(episode.date)} · ${formatDuration(episode.durationSeconds)}`;
}
