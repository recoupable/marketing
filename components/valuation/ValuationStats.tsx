import type { Result } from "@/components/valuation/useCatalogValuation";
import { formatCompact } from "@/lib/valuation/formatCompact";

/**
 * The three-up stat grid: lifetime streams, tracks, releases measured.
 */
export function ValuationStats({ result }: { result: Result }) {
  const stats = [
    { label: "Lifetime streams", value: formatCompact(result.totalStreams) },
    { label: "Tracks measured", value: String(result.trackCount) },
    {
      label: "Releases measured",
      value:
        result.capturedAlbums < result.albumCount
          ? `${result.capturedAlbums} of ${result.albumCount}`
          : String(result.albumCount),
    },
  ];
  return (
    <dl
      className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl"
      style={{
        boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
      }}
    >
      {stats.map(s => (
        <div key={s.label} className="bg-(--foreground)/[0.03] px-4 py-4">
          <dt className="text-[10px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/40">
            {s.label}
          </dt>
          <dd className="mt-1.5 text-[19px] font-semibold text-(--foreground)">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
