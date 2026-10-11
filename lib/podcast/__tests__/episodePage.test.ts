import { expect, test } from "vitest";
import { episodeJsonLd } from "../episodeJsonLd.ts";
import { episodeMetadata } from "../episodeMetadata.ts";
import { episodePath } from "../episodePath.ts";
import { formatEpisodeDate } from "../formatEpisodeDate.ts";
import { readEpisode } from "../readEpisode.ts";
import { readEpisodes } from "../readEpisodes.ts";

test("every episode has a summary and a page path under /podcast", () => {
  for (const episode of readEpisodes()) {
    expect(episode.summary.length).toBeGreaterThan(0);
    expect(episodePath(episode.slug)).toBe(`/podcast/${episode.slug}`);
  }
});

test("readEpisode finds by slug and misses unknown slugs", () => {
  expect(readEpisode("jesse-kirshbaum")?.guest).toBe("Jesse Kirshbaum");
  expect(readEpisode("no-such-episode")).toBeUndefined();
});

test("episode metadata uses the episode title, first summary paragraph, canonical path and cover", () => {
  const episode = readEpisode("vickie-nauman")!;
  const metadata = episodeMetadata(episode);
  expect(metadata.title).toStrictEqual({ absolute: `${episode.title} w/ Vickie Nauman | Recoup Podcast` });
  expect(metadata.description).toBe(episode.summary[0]);
  expect(metadata.alternates?.canonical).toBe("/podcast/vickie-nauman");
  expect(JSON.stringify(metadata.openGraph)).toContain("/podcast/vickie-nauman-wide.jpg");
});

test("episode JSON-LD is a PodcastEpisode in the Recoup Podcast series", () => {
  const ld = episodeJsonLd(readEpisode("jesse-kirshbaum")!);
  expect(ld["@type"]).toBe("PodcastEpisode");
  expect(ld.partOfSeries.name).toBe("Recoup Podcast");
  expect(ld.datePublished).toBe("2026-10-11");
  expect(ld.url).toMatch(/\/podcast\/jesse-kirshbaum$/);
});

test("episode dates read as calendar dates", () => {
  expect(formatEpisodeDate("2026-10-11")).toBe("October 11, 2026");
});

test("no published copy carries an em or en dash", () => {
  expect(JSON.stringify(readEpisodes())).not.toMatch(/[–—]/);
});

test("YouTube links become embed URLs; anything else does not", async () => {
  const { youtubeEmbedUrl } = await import("../youtubeEmbedUrl.ts");
  expect(youtubeEmbedUrl("https://www.youtube.com/watch?v=q8CsBbdmXqA")).toBe("https://www.youtube.com/embed/q8CsBbdmXqA?rel=0");
  expect(youtubeEmbedUrl("https://youtu.be/q8CsBbdmXqA")).toBe("https://www.youtube.com/embed/q8CsBbdmXqA?rel=0");
  expect(youtubeEmbedUrl("https://open.spotify.com/episode/abc")).toBeUndefined();
  expect(youtubeEmbedUrl(undefined)).toBeUndefined();
});
