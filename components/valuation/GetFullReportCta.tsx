"use client";

import { useGetFullReport } from "@/hooks/useGetFullReport";

type GetFullReportCtaProps = {
  snapshotId?: string;
  artistName?: string | null;
};

/**
 * The "Get the full report" CTA. Presentational only — the claim + redirect
 * logic and loading state live in `useGetFullReport`.
 */
export function GetFullReportCta({ snapshotId, artistName }: GetFullReportCtaProps) {
  const { loading, onGetFullReport } = useGetFullReport({ snapshotId, artistName });

  return (
    <button
      type="button"
      onClick={onGetFullReport}
      disabled={loading}
      className="cta-pulse mt-8 block w-full rounded-full bg-(--foreground) px-9 py-4 text-center font-ui text-[15px] font-semibold text-(--background) transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Preparing your report…" : "Get the full report with Recoup →"}
    </button>
  );
}
