"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { podcastCopy } from "@/lib/copy/podcast";
import type { Episode } from "@/lib/podcast/episodeSchema";

const platforms = ["youtube", "spotify"] as const;

/** The original Spanish recording of a dubbed episode: its title and where to play it; reports episode and platform only. */
export function EpisodeSpanishLinks({ slug, spanish }: { slug: string; spanish: NonNullable<Episode["spanish"]> }) {
  const copy = podcastCopy.episode.spanish;
  return (
    <p className="!mt-4 text-sm text-[#586f78]" lang="es">
      <span className="sp-kicker text-[#5b7886] !text-[10px] mr-2">{copy.kicker}</span>
      <span className="text-[#22343c]">{spanish.title}</span>
      {platforms.map((platform) => (
        <a
          key={platform}
          className="ml-4 font-medium underline decoration-[#cfdde2] underline-offset-4 hover:text-[#087bab]"
          href={spanish[platform]}
          aria-label={`${copy[platform]} (${copy.kicker})`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("podcast_episode_clicked", { slug, platform: `${platform}-es` })}
        >
          {copy[platform]}
        </a>
      ))}
    </p>
  );
}
