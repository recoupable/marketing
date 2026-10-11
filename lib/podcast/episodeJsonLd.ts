import type { Episode } from "./episodeSchema.ts";
import { episodePath } from "./episodePath.ts";
import { absoluteUrl } from "../seo.ts";
import { siteConfig } from "../config.ts";

/** schema.org PodcastEpisode for one episode page, linked to the show and its listening platforms. */
export function episodeJsonLd(episode: Episode) {
  const url = absoluteUrl(episodePath(episode.slug));
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${url}#episode`,
    url,
    name: `${episode.title} w/ ${episode.guest}`,
    description: episode.summary.join(" "),
    datePublished: episode.date,
    timeRequired: `PT${Math.round(episode.durationSeconds / 60)}M`,
    image: absoluteUrl(episode.cover),
    partOfSeries: { "@type": "PodcastSeries", name: "Recoup Podcast", url: absoluteUrl("/podcast") },
    actor: { "@type": "Person", name: episode.guest, jobTitle: episode.role },
    publisher: { "@id": absoluteUrl("/#organization"), name: siteConfig.name },
    sameAs: Object.values(episode.links),
  };
}
