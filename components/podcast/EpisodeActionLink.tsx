"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { SkyArrow } from "@/components/sky/arrow";
import type { EpisodeAction } from "@/lib/podcast/episodeAction";

/** The card's pill, bottom-aligned across cards; reports which episode and platform were chosen, nothing about the visitor. */
export function EpisodeActionLink({ slug, action }: { slug: string; action: EpisodeAction }) {
  return (
    <a
      className="inline-flex items-center gap-3 self-start mt-auto px-[19px] py-2.5 min-h-11 rounded-[32px] bg-[#d6ff62] text-[#173527] hover:bg-[#c6f443] hover:text-[#173527] text-[13px] font-[550] transition-colors duration-150 [&_svg]:!w-[17px] [&_svg]:!h-[17px]"
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("podcast_episode_clicked", { slug, platform: action.platform })}
    >
      {action.label} <SkyArrow />
    </a>
  );
}
