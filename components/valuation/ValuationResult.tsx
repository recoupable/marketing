import type { Artist, Result, StartedAlbum } from "@/components/valuation/useCatalogValuation";
import { ArtistHeader } from "@/components/valuation/ArtistHeader";
import { ValuationStats } from "@/components/valuation/ValuationStats";
import { MeasuredCatalog } from "@/components/valuation/MeasuredCatalog";
import { formatUsd } from "@/lib/valuation/formatUsd";

type ValuationResultProps = {
  artist: Artist | null;
  result: Result;
  catalogAlbums: StartedAlbum[];
};

/**
 * The full result card: artist identity, valuation band, stats, honest-limits
 * disclosure, measured-catalog breakdown, and the product CTA.
 */
export function ValuationResult({ artist, result, catalogAlbums }: ValuationResultProps) {
  return (
    <div
      className="rounded-2xl p-8 sm:p-10"
      style={{
        boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)",
      }}
    >
      {artist && <ArtistHeader artist={artist} />}
      <p className="text-[11px] font-pixel uppercase tracking-[0.16em] text-(--foreground)/45">
        Estimated catalog value
      </p>
      <p className="mt-3 font-pixel text-[clamp(3rem,8vw,4.5rem)] leading-[0.95] tracking-[-0.01em] text-(--foreground)">
        {formatUsd(result.valueBand.central)}
      </p>
      <p className="mt-2 text-[14px] text-(--foreground)/55">
        range {formatUsd(result.valueBand.low)} – {formatUsd(result.valueBand.high)}
      </p>
      <ValuationStats result={result} />
      <p className="mt-7 text-[12px] leading-relaxed text-(--foreground)/45">
        Directional model, not an appraisal: live platform-displayed Spotify
        play counts (measured today), other platforms approximated as a labeled
        share of Spotify, annual run-rate from your catalog&apos;s lifetime
        average over ~{result.catalogAgeYears} years, master-side NLS × an{" "}
        {result.assumptions.multiple.low}–{result.assumptions.multiple.high}×
        market multiple. Real statements collapse the range.
      </p>
      <MeasuredCatalog
        albums={result.albums}
        catalogAlbums={catalogAlbums}
        centralValue={result.valueBand.central}
        totalStreams={result.totalStreams}
      />
      <a
        href="https://chat.recoupable.com"
        className="cta-pulse mt-8 block w-full rounded-full bg-(--foreground) px-9 py-4 text-center font-ui text-[15px] font-semibold text-(--background) transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5"
      >
        Get the full report with Recoup →
      </a>
    </div>
  );
}
