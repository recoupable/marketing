import type { Metadata } from "next";
import { podcastCopy } from "../copy/podcast.ts";
import { absoluteUrl, withPageMetadata } from "../seo.ts";

const titleCard = absoluteUrl("/podcast/title-card.jpg");

/** Page metadata for /podcast; the show's title card is the share image so invite links unfurl as the podcast. */
export function podcastMetadata(): Metadata {
  return withPageMetadata({
    title: podcastCopy.title,
    description: podcastCopy.description,
    alternates: { canonical: "/podcast" },
    openGraph: { images: [{ url: titleCard, width: 1280, height: 720, alt: "Recoup Podcast" }] },
    twitter: { images: [titleCard] },
  });
}
