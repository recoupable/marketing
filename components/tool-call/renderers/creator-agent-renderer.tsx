"use client";

import { Instagram, Music2 } from "lucide-react";
import type {
  Creator,
  CreatorAgentOutput,
} from "@/lib/agent/tools/creator-agent";

/**
 * Creator Agent card body. 2-column grid of creator cards (matching the
 * compact look of the similar-artists grid). Each card surfaces:
 *   - Platform icon (TikTok or IG)
 *   - Handle as the headline
 *   - Follower count in pixel-font
 *   - Audience-match percentage (the key signal — how well their
 *     followers overlap with the reference artist's listeners)
 *   - Recent music-post count as a "warmth" cue
 */
export function CreatorAgentRenderer({
  output,
}: {
  output: CreatorAgentOutput;
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {output.creators.map((c) => (
        <CreatorCard key={c.handle} creator={c} />
      ))}
    </div>
  );
}

function CreatorCard({ creator }: { creator: Creator }) {
  const PlatformIcon = creator.platform === "tiktok" ? Music2 : Instagram;
  const matchPct = Math.round(creator.audienceMatch * 100);

  return (
    <div
      className="p-2 rounded-md bg-(--background)"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <PlatformIcon
          className="w-3 h-3 text-(--foreground)/60 shrink-0"
          aria-hidden
        />
        <span className="text-[11.5px] font-medium text-(--foreground) truncate">
          {creator.handle}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-1">
        <span className="text-[10px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/45">
          {formatFollowers(creator.followers)} · {matchPct}% match
        </span>
      </div>
      {creator.recentMusicPosts > 0 && (
        <div className="text-[10px] text-(--foreground)/40 mt-0.5">
          {creator.recentMusicPosts} music post
          {creator.recentMusicPosts === 1 ? "" : "s"} · 30d
        </div>
      )}
    </div>
  );
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}
