"use client";

import { useCatalogValuation } from "@/hooks/useCatalogValuation";
import { ArtistSearchBox } from "@/components/search/ArtistSearchBox";
import { ValuationResult } from "@/components/valuation/ValuationResult";
import { toArtist } from "@/lib/valuation/toArtist";

/**
 * The one-click catalog valuation flow: search → run → shareable result card.
 * Adapts the shared ArtistSearchBox to the valuation domain inline — Spotify→
 * Artist mapping, the clear-while-running guard, and error chrome (chat#1814).
 */
export function CatalogValuation() {
  const v = useCatalogValuation();
  const running = v.phase === "running";

  return (
    <div className="mt-12 w-full max-w-[560px] text-left">
      {v.phase !== "done" ? (
        <>
          <ArtistSearchBox
            picked={v.picked}
            running={running}
            progress={v.progress}
            placeholder="Search your artist name…"
            onSelect={(a) => v.pick(toArtist(a))}
            onClear={running ? () => {} : v.clearPick}
            onSubmit={v.run}
          />
          {v.phase === "error" && (
            <p className="mt-4 text-center text-[13px] text-red-500/90">
              {v.error}
            </p>
          )}
        </>
      ) : (
        v.result && (
          <ValuationResult
            artist={v.picked}
            result={v.result}
            catalogAlbums={v.catalogAlbums}
          />
        )
      )}
    </div>
  );
}
