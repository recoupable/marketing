"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type {
  SimilarArtist,
  SimilarArtistsOutput,
} from "@/lib/agent/tools/similar-artists";

interface EnrichedArtist extends SimilarArtist {
  resolvedImage?: string | null;
}

interface SpotifySearchResponse {
  artists?: { id: string; name: string; image: string | null }[];
}

/**
 * Renders the `similar_artists` tool output as a 2-column grid of artist
 * cards. Image URLs are intentionally NOT baked into the tool output (which
 * keeps the tool portable and JSON-serializable); instead, this renderer
 * client-side-enriches each artist with a real Spotify image via the
 * existing `/api/spotify/search` proxy.
 *
 * Falls back gracefully to a music-note placeholder if Spotify search
 * fails or returns no match.
 */
export function SimilarArtistsRenderer({
  output,
}: {
  output: SimilarArtistsOutput;
}) {
  const [enriched, setEnriched] = useState<EnrichedArtist[]>(output.similar);

  useEffect(() => {
    let cancelled = false;

    async function enrichOne(artist: SimilarArtist): Promise<EnrichedArtist> {
      if (artist.image) return { ...artist, resolvedImage: artist.image };
      try {
        const res = await fetch(
          `/api/spotify/search?q=${encodeURIComponent(artist.name)}&limit=1`,
        );
        const data = (await res.json()) as SpotifySearchResponse;
        return { ...artist, resolvedImage: data.artists?.[0]?.image ?? null };
      } catch {
        return { ...artist, resolvedImage: null };
      }
    }

    Promise.all(output.similar.map(enrichOne)).then((result) => {
      if (!cancelled) setEnriched(result);
    });

    return () => {
      cancelled = true;
    };
  }, [output]);

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
          <ArtistCard key={artist.name} artist={artist} />
        ))}
      </div>
    </div>
  );
}

function ArtistCard({ artist }: { artist: EnrichedArtist }) {
  return (
    <div
      className="flex items-start gap-3 p-2.5 rounded-lg bg-(--background)"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      {artist.resolvedImage ? (
        <Image
          src={artist.resolvedImage}
          alt={artist.name}
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-11 h-11 rounded-full bg-(--muted) shrink-0 flex items-center justify-center">
          <span className="text-[12px] text-(--foreground)/30">♪</span>
        </div>
      )}
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
      </div>
    </div>
  );
}

function formatListeners(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M listeners`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K listeners`;
  return `${n} listeners`;
}
