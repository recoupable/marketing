"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { SkyArrow } from "@/components/sky/arrow";
import type { Episode } from "@/lib/podcast/episodeSchema";

const order = [
  { key: "youtube", label: "Watch on YouTube" },
  { key: "spotify", label: "Spotify" },
  { key: "apple", label: "Apple Podcasts" },
] as const;

/** Where to play this episode: video first as the lime pill, audio platforms as outlined pills; reports episode and platform only. */
export function EpisodeListenLinks({ slug, links }: { slug: string; links: Episode["links"] }) {
  const available = order.filter((platform) => links[platform.key]);
  return (
    <div className="flex flex-wrap gap-3 mt-[22px]">
      {available.map((platform, index) => (
        <a
          key={platform.key}
          className={`inline-flex items-center gap-3 px-[19px] py-2.5 min-h-11 rounded-[32px] text-[13px] font-[550] transition-colors duration-150 [&_svg]:!w-[17px] [&_svg]:!h-[17px] ${index === 0 ? "bg-[#d6ff62] text-[#173527] hover:bg-[#c6f443] hover:text-[#173527]" : "border border-[#cfdde2] text-[#173527] hover:border-[#087bab] hover:text-[#087bab]"}`}
          href={links[platform.key]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("podcast_episode_clicked", { slug, platform: platform.key })}
        >
          {platform.label} {index === 0 && <SkyArrow />}
        </a>
      ))}
    </div>
  );
}
