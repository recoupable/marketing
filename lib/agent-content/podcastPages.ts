import { podcastCopy } from "../copy/podcast.ts";
import { siteConfig } from "../config.ts";
import { readEpisodes } from "../podcast/readEpisodes.ts";
import type { PageSummary } from "./types.ts";

// Summary of the podcast page; the episode list is the page's own content, so it is included in full.
export const podcastPages: PageSummary[] = [
  {
    path: "/podcast",
    title: podcastCopy.title,
    description: podcastCopy.description,
    keywords: "podcast episodes interviews music business AI founders publishers catalog owners fund managers guest",
    paragraphs: [
      ...podcastCopy.paragraphs,
      ...readEpisodes().map((episode) => `${episode.title} w/ ${episode.guest}, ${episode.role} (${episode.date}). YouTube: ${episode.links.youtube ?? "none"}. Spotify: ${episode.links.spotify}.`),
      podcastCopy.guest.description,
    ],
    links: [
      ["Watch on YouTube", siteConfig.podcast.youtube],
      ["Listen on Spotify", siteConfig.podcast.spotify],
      ["Listen on Apple Podcasts", siteConfig.podcast.apple],
      [podcastCopy.guest.action, podcastCopy.guest.href],
    ],
  },
];
