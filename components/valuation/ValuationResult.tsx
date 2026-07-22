import type { Artist, Result } from "@/components/valuation/types";
import { ArtistHeader } from "@/components/valuation/ArtistHeader";
import { GetFullReportCta } from "@/components/valuation/GetFullReportCta";
import { formatUsd } from "@/lib/valuation/formatUsd";

type ValuationResultProps = {
  artist: Artist | null;
  result: Result;
};

/**
 * The full result card: artist identity, valuation band, what-we-measured
 * signal, honest-limits disclosure, and the product CTA. The valuation runs
 * fully server-side (`POST /api/valuation`, docs#272), which returns the band
 * and the number of tracks measured — no per-release breakdown to render.
 */
export function ValuationResult({ artist, result }: ValuationResultProps) {
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
        {formatUsd(result.band.central)}
      </p>
      <p className="mt-2 text-[14px] text-(--foreground)/55">
        range {formatUsd(result.band.low)} – {formatUsd(result.band.high)}
      </p>
      <p className="mt-6 text-[13px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/45">
        Valued across {result.songsMeasured}{" "}
        {result.songsMeasured === 1 ? "measured track" : "measured tracks"}
      </p>
      <p className="mt-7 text-[12px] leading-relaxed text-(--foreground)/45">
        Directional model, not an appraisal: live platform-displayed Spotify
        play counts (measured today), other platforms approximated as a labeled
        share of Spotify, annual run-rate from your catalog&apos;s lifetime
        average, master-side NLS × a 10–16× market multiple. Real statements
        collapse the range.
      </p>
      <GetFullReportCta catalogId={result.catalogId} />
    </div>
  );
}
