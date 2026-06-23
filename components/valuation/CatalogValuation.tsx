"use client";

import { useCatalogValuation } from "@/components/valuation/useCatalogValuation";
import { ArtistSearch } from "@/components/valuation/ArtistSearch";
import { ValuationResult } from "@/components/valuation/ValuationResult";

/**
 * The one-click catalog valuation flow: search → run → shareable result card.
 */
export function CatalogValuation() {
  const v = useCatalogValuation();

  return (
    <div className="mt-12 w-full max-w-[560px] text-left">
      {v.phase !== "done" ? (
        <ArtistSearch
          picked={v.picked}
          running={v.phase === "running"}
          progress={v.progress}
          error={v.phase === "error" ? v.error : ""}
          onPick={v.pick}
          onClear={v.clearPick}
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
