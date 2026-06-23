"use client";

import { ArtistResultRow } from "@/components/search/ArtistResultRow";
import type { SpotifyArtist } from "@/lib/spotify/types";

type ArtistSearchResultsProps = {
  results: SpotifyArtist[];
  loading: boolean;
  selectedIdx: number;
  expanded: boolean;
  onPick: (artist: SpotifyArtist) => void;
};

/**
 * The integrated in-island autocomplete dropdown. Collapses with a grid-rows
 * transition; `inert` while collapsed so its rows aren't focusable / announced
 * (no invisible tab stops).
 */
export function ArtistSearchResults({
  results,
  loading,
  selectedIdx,
  expanded,
  onPick,
}: ArtistSearchResultsProps) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: expanded ? "1fr" : "0fr",
        transition: "grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <div className="min-h-0 overflow-hidden" inert={!expanded}>
        <div className="mx-4 h-px" style={{ background: "var(--border)" }} />
        <div className="max-h-[232px] overflow-y-auto py-1">
          {loading && results.length === 0 && (
            <div className="flex items-center gap-2.5 px-5 py-3 text-[13px] text-(--foreground)/30">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--foreground)/10 border-t-(--foreground)/30" />
              Searching…
            </div>
          )}
          {results.map((artist, i) => (
            <ArtistResultRow
              key={artist.id}
              artist={artist}
              active={i === selectedIdx}
              onSelect={onPick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
