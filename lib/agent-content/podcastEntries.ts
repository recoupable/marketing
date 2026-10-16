import { readEpisodes } from "../podcast/readEpisodes.ts";
import { readTranscript } from "../podcast/readTranscript.ts";
import { formatTimestamp } from "../podcast/formatTimestamp.ts";
import { formatDuration } from "../podcast/formatDuration.ts";
import { absoluteUrl } from "../seo.ts";
import type { AgentContentEntry } from "./types.ts";

export const podcastEntries: AgentContentEntry[] = readEpisodes().map(
  (episode) => {
    const url = absoluteUrl(`/podcast/${episode.slug}`);
    const title = `${episode.title} w/ ${episode.guest}`;
    return {
      metadata: {
        id: `page:/podcast/${episode.slug}`,
        type: "page",
        title,
        description: episode.summary[0],
        url,
        representation: "full",
        publishedAt: episode.date,
      },
      searchable: `${title} ${episode.role} ${episode.summary.join(" ")}`,
      keywords: "podcast episode interview",
      markdown: async () => {
        const transcript = readTranscript(episode.slug);
        return (
          [
            `# ${title}`,
            `Source: ${url}`,
            `Published: ${episode.date}\n\nDuration: ${formatDuration(episode.durationSeconds)}`,
            `Guest: ${episode.guest}, ${episode.role}`,
            ...episode.summary,
            "## Listen and watch",
            ...Object.entries(episode.links).map(
              ([label, href]) => `- [${label}](${href})`,
            ),
            ...episode.guestLinks.map(
              (link) => `- [${link.label}](${link.href})`,
            ),
            ...(transcript
              ? [
                  "## Transcript",
                  ...transcript.flatMap((turn) => [
                    `### ${turn.speaker} (${formatTimestamp(turn.start)})`,
                    ...turn.paragraphs,
                  ]),
                ]
              : []),
          ].join("\n\n") + "\n"
        );
      },
    };
  },
);
