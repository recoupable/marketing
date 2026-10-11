import type { Metadata } from "next";
import type { Episode } from "./episodeSchema.ts";
import { episodePath } from "./episodePath.ts";
import { absoluteUrl, withPageMetadata } from "../seo.ts";

/** Page metadata for one episode: "<title> w/ <guest>", the first summary paragraph, and the episode cover as the share image. */
export function episodeMetadata(episode: Episode): Metadata {
  const cover = absoluteUrl(episode.cover);
  const title = `${episode.title} w/ ${episode.guest} | Recoup Podcast`;
  return withPageMetadata({
    title: { absolute: title },
    description: episode.summary[0],
    alternates: { canonical: episodePath(episode.slug) },
    openGraph: { images: [{ url: cover, width: 1280, height: 720, alt: `${episode.title} w/ ${episode.guest}` }] },
    twitter: { images: [cover] },
  });
}
