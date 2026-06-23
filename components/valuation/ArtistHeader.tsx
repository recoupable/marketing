import type { Artist } from "@/components/valuation/types";
import { formatCompact } from "@/lib/valuation/formatCompact";

/**
 * The artist identity atop the result card — PFP, name, follower count.
 */
export function ArtistHeader({ artist }: { artist: Artist }) {
  return (
    <div className="mb-7 flex items-center gap-4">
      {artist.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={artist.image}
          alt={artist.name}
          className="h-16 w-16 rounded-full object-cover"
          style={{
            boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)",
          }}
        />
      )}
      <div>
        <p className="font-pixel text-[clamp(1.25rem,3vw,1.75rem)] leading-tight tracking-[-0.01em] text-(--foreground)">
          {artist.name}
        </p>
        {typeof artist.followers === "number" && (
          <p className="mt-0.5 text-[12px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/40">
            {formatCompact(artist.followers)} followers
          </p>
        )}
      </div>
    </div>
  );
}
