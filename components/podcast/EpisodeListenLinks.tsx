"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { SkyArrow } from "@/components/sky/arrow";
import { podcastCopy } from "@/lib/copy/podcast";
import type { Episode } from "@/lib/podcast/episodeSchema";

const order = ["youtube", "spotify", "apple"] as const;

type Labels = Record<(typeof order)[number], string>;

/** Where to play this episode: video first as the lime pill, audio platforms as outlined pills; reports episode and platform only. */
export function EpisodeListenLinks({ slug, links, labels = podcastCopy.episode.editions.en, platformSuffix = "" }: { slug: string; links: Episode["links"]; labels?: Labels; platformSuffix?: string }) {
  const available = order.filter((platform) => links[platform]);
  return (
    <div className="flex flex-wrap gap-3 mt-[22px]">
      {available.map((platform, index) => (
        <a
          key={platform}
          className={`inline-flex items-center gap-3 px-[19px] py-2.5 min-h-11 rounded-[32px] text-[13px] font-[550] transition-colors duration-150 [&_svg]:!w-[17px] [&_svg]:!h-[17px] ${index === 0 ? "bg-[#d6ff62] text-[#173527] hover:bg-[#c6f443] hover:text-[#173527]" : "border border-[#cfdde2] text-[#173527] hover:border-[#087bab] hover:text-[#087bab]"}`}
          href={links[platform]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("podcast_episode_clicked", { slug, platform: `${platform}${platformSuffix}` })}
        >
          {labels[platform]} {index === 0 && <SkyArrow />}
        </a>
      ))}
    </div>
  );
}
