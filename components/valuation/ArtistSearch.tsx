"use client";

import { usePrivy } from "@privy-io/react-auth";
import type { Artist } from "@/components/valuation/types";
import type { SpotifyArtist } from "@/components/shared/useSpotifyArtistSearch";
import { ArtistSearchBox } from "@/components/shared/ArtistSearchBox";
import { SelectedArtistTeaser } from "@/components/valuation/SelectedArtistTeaser";

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
 * Valuation step 1: the shared (home-page) artist search island plus the
 * valuation run CTA. Reads Privy auth directly to label the CTA as a sign-in
 * gate when signed out (chat#1798). Search + selection UI is the shared
 * ArtistSearchBox (DRY, chat#1814); this owns only the run CTA and teaser.
 */
export function ArtistSearch(props: ArtistSearchProps) {
  const { ready, authenticated } = usePrivy();
  const needsAuth = ready && !authenticated && Boolean(props.picked);

  return (
    <>
      <ArtistSearchBox
        placeholder="Search your artist name…"
        disabled={props.running}
        onSelect={a => props.onPick(toArtist(a))}
        onQueryChange={() => {
          if (props.picked) props.onClear();
        }}
      />
      {props.picked && !props.running && <SelectedArtistTeaser artist={props.picked} />}
      <button
        onClick={props.onRun}
        disabled={!props.picked || props.running}
        className="cta-pulse mt-7 w-full font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {props.running ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
            {props.progress}
          </span>
        ) : needsAuth ? (
          "Sign in to value my catalog"
        ) : (
          "Value my catalog"
        )}
      </button>
      {props.error && <p className="mt-4 text-center text-[13px] text-red-500/90">{props.error}</p>}
    </>
  );
}
