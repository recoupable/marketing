"use client";

import type { Artist } from "@/components/valuation/types";
import type { SpotifyArtist } from "@/components/shared/useSpotifyArtistSearch";
import { ArtistSearchBox } from "@/components/shared/ArtistSearchBox";

type ArtistSearchProps = {
  picked: Artist | null;
  running: boolean;
  progress: string;
  error: string;
  onPick: (artist: Artist) => void;
  onClear: () => void;
  onRun: () => void;
};

function toArtist(a: SpotifyArtist): Artist {
  return { id: a.id, name: a.name, image: a.image ?? undefined, followers: a.followers };
}

/**
 * Valuation step 1: the shared home-island artist search. Selecting an artist
 * pins it as a chip; the island's send arrow (or Enter) runs the valuation,
 * which opens the Privy sign-in gate when signed out (chat#1798, chat#1814).
 */
export function ArtistSearch(props: ArtistSearchProps) {
  return (
    <>
      <ArtistSearchBox
        picked={props.picked}
        running={props.running}
        progress={props.progress}
        placeholder="Search your artist name…"
        onSelect={a => props.onPick(toArtist(a))}
        onClear={props.onClear}
        onSubmit={props.onRun}
      />
      {props.error && <p className="mt-4 text-center text-[13px] text-red-500/90">{props.error}</p>}
    </>
  );
}
