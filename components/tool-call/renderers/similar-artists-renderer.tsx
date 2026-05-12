"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type {
  SimilarArtist,
  SimilarArtistsOutput,
} from "@/lib/agent/tools/similar-artists";
import { cn } from "@/lib/utils";

interface EnrichedArtist extends SimilarArtist {
  spotifyId?: string | null;
  resolvedImage?: string | null;
  previewUrl?: string | null;
  topTrackName?: string | null;
}

interface SpotifySearchResponse {
  artists?: { id: string; name: string; image: string | null }[];
}

interface TopTrackResponse {
  track: {
    id: string;
    name: string;
    previewUrl: string;
    durationMs: number;
    spotifyUrl: string | null;
    image: string | null;
  } | null;
}

/**
 * Renders the `similar_artists` tool output as a 2-column grid of artist
 * cards with inline 30s audio previews. Each card is enriched client-side
 * via two Spotify proxies:
 *   1. `/api/spotify/search?q=<name>` → artist id + image
 *   2. `/api/spotify/artist-top-track?id=<id>` → first playable preview URL
 *      (iterates top 5 tracks; ~10% of artists have no preview on any track)
 *
 * Audio plays through a singleton <audio> element owned by this component,
 * so starting one track auto-stops any other. A circular SVG progress ring
 * around the play button shows playback position.
 */
export function SimilarArtistsRenderer({
  output,
}: {
  output: SimilarArtistsOutput;
}) {
  const [enriched, setEnriched] = useState<EnrichedArtist[]>(output.similar);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingName, setPlayingName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function enrichOne(artist: SimilarArtist): Promise<EnrichedArtist> {
      let spotifyId: string | null = null;
      let resolvedImage = artist.image ?? null;

      try {
        const res = await fetch(
          `/api/spotify/search?q=${encodeURIComponent(artist.name)}&limit=1`,
        );
        const data = (await res.json()) as SpotifySearchResponse;
        const first = data.artists?.[0];
        if (first) {
          spotifyId = first.id;
          if (!resolvedImage) resolvedImage = first.image ?? null;
        }
      } catch {
        // network errors fall through to silent card
      }

      if (!spotifyId) {
        return { ...artist, resolvedImage, previewUrl: null };
      }

      try {
        const res = await fetch(
          `/api/spotify/artist-top-track?id=${encodeURIComponent(spotifyId)}`,
        );
        const data = (await res.json()) as TopTrackResponse;
        return {
          ...artist,
          spotifyId,
          resolvedImage,
          previewUrl: data.track?.previewUrl ?? null,
          topTrackName: data.track?.name ?? null,
        };
      } catch {
        return { ...artist, spotifyId, resolvedImage, previewUrl: null };
      }
    }

    Promise.all(output.similar.map(enrichOne)).then((result) => {
      if (!cancelled) setEnriched(result);
    });

    return () => {
      cancelled = true;
    };
  }, [output]);

  // Cleanup audio on unmount so a card swap doesn't leave a stranded track playing.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggle = useCallback(
    (artist: EnrichedArtist) => {
      if (!artist.previewUrl) return;

      // Pause-if-same: clicking the active card stops it.
      if (playingName === artist.name && audioRef.current) {
        audioRef.current.pause();
        setPlayingName(null);
        setProgress(0);
        return;
      }

      // Switch tracks: tear down any current audio cleanly.
      audioRef.current?.pause();
      const audio = new Audio(artist.previewUrl);
      audio.preload = "auto";
      audioRef.current = audio;
      setPlayingName(artist.name);
      setProgress(0);

      audio.addEventListener("timeupdate", () => {
        if (audioRef.current !== audio) return;
        const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
        setProgress(Math.min(1, Math.max(0, ratio)));
      });
      audio.addEventListener("ended", () => {
        if (audioRef.current !== audio) return;
        setPlayingName(null);
        setProgress(0);
      });

      audio.play().catch(() => {
        // Autoplay may be blocked on Safari without prior user gesture;
        // the click counts as a gesture so this should usually succeed.
        // If it doesn't, just reset state silently.
        setPlayingName(null);
        setProgress(0);
      });
    },
    [playingName],
  );

  return (
    <div className="space-y-2">
      <div className="text-[11px] font-ui text-(--foreground)/40">
        Artists similar to{" "}
        <span className="text-(--foreground)/80 font-medium">
          {output.reference}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {enriched.map((artist) => (
          <ArtistCard
            key={artist.name}
            artist={artist}
            isPlaying={playingName === artist.name}
            progress={playingName === artist.name ? progress : 0}
            onToggle={() => handleToggle(artist)}
          />
        ))}
      </div>
    </div>
  );
}

function ArtistCard({
  artist,
  isPlaying,
  progress,
  onToggle,
}: {
  artist: EnrichedArtist;
  isPlaying: boolean;
  progress: number;
  onToggle: () => void;
}) {
  const hasPreview = Boolean(artist.previewUrl);

  return (
    <div
      className="flex items-start gap-3 p-2.5 rounded-lg bg-(--background)"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      <div className="relative w-11 h-11 shrink-0">
        {artist.resolvedImage ? (
          <Image
            src={artist.resolvedImage}
            alt={artist.name}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-(--muted) flex items-center justify-center">
            <span className="text-[12px] text-(--foreground)/30">♪</span>
          </div>
        )}
        {hasPreview && (
          <PlayOverlay
            isPlaying={isPlaying}
            progress={progress}
            onClick={onToggle}
            artistName={artist.name}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-(--foreground) truncate">
            {artist.name}
          </span>
          <span className="text-[10px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/35 shrink-0">
            {formatListeners(artist.monthlyListeners)}
          </span>
        </div>
        <div className="text-[11px] text-(--foreground)/35 truncate">
          {artist.primaryGenre}
        </div>
        <p className="text-[11.5px] text-(--foreground)/55 mt-1 leading-snug">
          {artist.matchReason}
        </p>
        {isPlaying && artist.topTrackName && (
          <div className="text-[10px] font-pixel uppercase tracking-[0.12em] text-(--foreground)/40 mt-1 truncate">
            ♫ {artist.topTrackName}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Circular play/pause button overlaid on the artist image. The SVG ring
 * around it tracks playback progress (0 → 1). When not playing, the ring is
 * invisible and the button sits centered with a subtle dim overlay.
 */
function PlayOverlay({
  isPlaying,
  progress,
  onClick,
  artistName,
}: {
  isPlaying: boolean;
  progress: number;
  onClick: () => void;
  artistName: string;
}) {
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? `Pause ${artistName}` : `Play ${artistName}`}
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full",
        "transition-opacity duration-150",
        isPlaying
          ? "bg-black/45 opacity-100"
          : "bg-black/30 opacity-0 hover:opacity-100 focus-visible:opacity-100",
      )}
    >
      {isPlaying ? (
        <Pause className="w-4 h-4 text-white" fill="white" strokeWidth={0} />
      ) : (
        <Play
          className="w-4 h-4 text-white translate-x-px"
          fill="white"
          strokeWidth={0}
        />
      )}
      {isPlaying && (
        <svg
          className="absolute inset-0 -rotate-90"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          aria-hidden
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>
      )}
    </button>
  );
}

function formatListeners(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M listeners`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K listeners`;
  return `${n} listeners`;
}
