"use client";

import { usePrivy } from "@privy-io/react-auth";
import type { Artist } from "@/components/valuation/types";
import { formatCompact } from "@/lib/valuation/formatCompact";

/**
 * Pre-run teaser shown after an artist is selected (chat#1798). Built from
 * search data only — artist image + name + follower count + a sign-in nudge
 * (shown until the user is authenticated). No valuation number and no
 * measured-catalog call until the run fires.
 */
export function SelectedArtistTeaser({ artist }: { artist: Artist }) {
  const { ready, authenticated } = usePrivy();

  return (
    <div
      className="mt-6 flex items-center gap-3.5 rounded-2xl px-5 py-4"
      style={{ boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)" }}
    >
      {artist.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={artist.image}
          alt={`${artist.name} profile`}
          className="h-12 w-12 rounded-full object-cover"
        />
      )}
      <span className="text-left">
        <span className="block font-semibold text-[15px] text-(--foreground)">{artist.name}</span>
        {typeof artist.followers === "number" && (
          <span className="block text-[12px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/40">
            {formatCompact(artist.followers)} followers
          </span>
        )}
      </span>
      {ready && !authenticated && (
        <span className="ml-auto text-[12px] text-(--foreground)/45 max-w-[160px] text-right leading-snug">
          Sign in to measure your catalog&apos;s value
        </span>
      )}
    </div>
  );
}
