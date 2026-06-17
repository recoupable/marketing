"use client";

import { useCatalogValuation, type ValuationGate } from "@/components/valuation/useCatalogValuation";
import { ArtistSearch } from "@/components/valuation/ArtistSearch";
import { ValuationResult } from "@/components/valuation/ValuationResult";

/**
 * The one-click catalog valuation flow: search → run → shareable result card.
 * `gate` (when present) holds the run behind Privy sign-in (chat#1798).
 */
export function CatalogValuation({ gate }: { gate?: ValuationGate }) {
  const v = useCatalogValuation(gate);

  return (
    <div className="mt-12 w-full max-w-[560px] text-left">
      {v.phase !== "done" ? (
        <ArtistSearch
          query={v.query}
          artists={v.artists}
          picked={v.picked}
          running={v.phase === "running"}
          needsAuth={v.needsAuth}
          progress={v.progress}
          error={v.phase === "error" ? v.error : ""}
          onQueryChange={v.onQueryChange}
          onPick={v.pick}
          onRun={v.run}
        />
      ) : (
        v.result && (
          <ValuationResult artist={v.picked} result={v.result} catalogAlbums={v.catalogAlbums} />
        )
      )}
    </div>
  );
}
