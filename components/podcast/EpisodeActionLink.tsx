"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { SkyArrow } from "@/components/sky/arrow";
import type { EpisodeAction } from "@/lib/podcast/episodeAction";

/** The card's pill; reports which episode and platform were chosen, nothing about the visitor. */
export function EpisodeActionLink({ slug, action }: { slug: string; action: EpisodeAction }) {
  return (
    <a
      className="podcast-watch"
      href={action.href}
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent("podcast_episode_clicked", { slug, platform: action.platform })}
    >
      {action.label} <SkyArrow />
    </a>
  );
}
