import { expect, test } from "vitest";
import { siteConfig } from "../../config.ts";
import { podcastMetadata } from "../podcastMetadata.ts";

test("/podcast unfurls as the podcast: the title card is the og and twitter image", () => {
  const metadata = podcastMetadata();
  const og = metadata.openGraph?.images;
  const tw = metadata.twitter?.images;
  const first = Array.isArray(og) ? og[0] : og;
  expect(first && typeof first === "object" && "url" in first ? first.url : first).toBe(`${siteConfig.url}/podcast/title-card.jpg`);
  expect(Array.isArray(tw) ? tw[0] : tw).toBe(`${siteConfig.url}/podcast/title-card.jpg`);
  expect(metadata.alternates?.canonical).toBe("/podcast");
  expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/podcast`);
});
