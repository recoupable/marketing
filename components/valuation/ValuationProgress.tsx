"use client";

import { useElapsedSeconds } from "@/hooks/useElapsedSeconds";
import { formatElapsedSeconds } from "@/lib/valuation/formatElapsedSeconds";

type ValuationProgressProps = {
  /** Current staged progress line from useCatalogValuation. */
  stage: string;
};

/**
 * Visible progress state for the synchronous valuation run (chat#1902 M5):
 * a pulsing dot, the staged status line, a live elapsed-time ticker, and a
 * persistent expectation line. Mounts when the run starts so the ticker reads
 * 0s within the first second of the click.
 */
export function ValuationProgress({ stage }: ValuationProgressProps) {
  const elapsed = useElapsedSeconds();

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 rounded-2xl px-5 py-4"
      style={{
        boxShadow:
          "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-(--foreground)/70" />
        <span className="font-ui text-[14px] text-(--foreground)/80">
          {stage || "Measuring your catalog"}
        </span>
        <span className="ml-auto font-mono text-[13px] tabular-nums text-(--foreground)/50">
          {formatElapsedSeconds(elapsed)}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-(--foreground)/50">
        Measuring live play counts across your catalog. Large catalogs can take
        a minute or two.
      </p>
    </div>
  );
}
