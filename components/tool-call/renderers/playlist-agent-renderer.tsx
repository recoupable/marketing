"use client";

import { ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  PlaylistAgentOutput,
  PlaylistMatch,
} from "@/lib/agent/tools/playlist-agent";

/**
 * Playlist Agent card body. A scroll-bounded vertical list of playlist
 * matches sorted by the model's chosen ranking (the tool returns them
 * already ranked). Each row shows the playlist name, curator, follower
 * count, a horizontal fit-score bar, and — if the playlist accepts
 * submissions — an external link icon hinting at the submission path.
 *
 * The fit-score bar is the visual anchor: zero-padding for full-bleed
 * progress, achromatic so it reads as data rather than decoration.
 */
export function PlaylistAgentRenderer({
  output,
}: {
  output: PlaylistAgentOutput;
}) {
  // Cap the visible list at 6 — the tool may return 8-10, but the card
  // gets tall fast inside the parallel-fan-out grid.
  const visible = output.playlists.slice(0, 6);

  return (
    <div className="space-y-1.5">
      {visible.map((p) => (
        <PlaylistRow key={p.name} playlist={p} />
      ))}
      {output.playlists.length > visible.length && (
        <div className="text-[10px] font-pixel uppercase tracking-[0.12em] text-(--foreground)/35 pt-1">
          + {output.playlists.length - visible.length} more
        </div>
      )}
    </div>
  );
}

function PlaylistRow({ playlist }: { playlist: PlaylistMatch }) {
  const fitPct = Math.round(playlist.fitScore * 100);

  return (
    <div
      className="flex items-center gap-2.5 py-1.5 px-2 rounded-md"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      <FitBar fitPct={fitPct} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[12px] font-medium text-(--foreground) truncate">
            {playlist.name}
          </span>
          {playlist.recentlyAdded && (
            <Sparkles
              className="w-2.5 h-2.5 text-(--foreground)/60 shrink-0"
              aria-label="Recently added new artists"
            />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[10.5px] text-(--foreground)/40 truncate">
          <span className="truncate">{playlist.curator}</span>
          <span className="opacity-50">·</span>
          <span className="font-pixel uppercase tracking-[0.1em] text-[9px] shrink-0">
            {formatFollowers(playlist.followers)}
          </span>
        </div>
      </div>
      {playlist.submissionUrl && (
        <a
          href={playlist.submissionUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Submit to ${playlist.name}`}
          className="text-(--foreground)/40 hover:text-(--foreground)/85 transition-colors shrink-0"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

function FitBar({ fitPct }: { fitPct: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 shrink-0 w-8">
      <div className="h-1 w-full rounded-full bg-(--foreground)/8 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full",
            fitPct >= 80
              ? "bg-(--foreground)"
              : fitPct >= 60
                ? "bg-(--foreground)/60"
                : "bg-(--foreground)/30",
          )}
          style={{ width: `${fitPct}%` }}
        />
      </div>
      <span className="text-[9px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/45 leading-none">
        {fitPct}%
      </span>
    </div>
  );
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}
