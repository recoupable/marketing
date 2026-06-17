"use client";

import { useCatalogValuation } from "@/components/valuation/useCatalogValuation";
import { ArtistSearch } from "@/components/valuation/ArtistSearch";
import { ValuationResult } from "@/components/valuation/ValuationResult";

/**
 * The catalog valuation flow: search → (sign-in gate) → run → result card.
 * Rendered inside `PrivyProvider` (ValuationAuthProvider), so the hook reads
 * Privy auth directly (chat#1798).
 */
export function CatalogValuation() {
  const v = useCatalogValuation();

  return (
    <div className="mt-12 w-full max-w-[560px] text-left">
      {v.phase !== "done" ? (
        <ArtistSearch
          query={v.query}
          artists={v.artists}
          picked={v.picked}
          running={v.phase === "running"}
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
