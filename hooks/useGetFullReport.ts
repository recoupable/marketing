"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";
import { claimCatalog } from "@/lib/valuation/claimCatalog";

type UseGetFullReportArgs = {
  snapshotId?: string;
  artistName?: string | null;
};

export type UseGetFullReport = {
  loading: boolean;
  onGetFullReport: () => Promise<void>;
};

/**
 * Drives the "Get the full report" CTA. On invocation it claims the
 * just-measured run into an account-owned catalog (`POST /api/catalogs` with
 * the Privy bearer) and deep-links to that catalog in chat, so the work
 * continues instead of landing on an empty homepage. Claim-on-click (not
 * per-run) avoids creating catalogs for bounces; any failure — or a missing
 * snapshot/token — falls back to the plain app URL so the user is never
 * blocked. Lives apart from the CTA component so the button stays presentational.
 */
export function useGetFullReport({
  snapshotId,
  artistName,
}: UseGetFullReportArgs): UseGetFullReport {
  const { getAccessToken } = usePrivy();
  const [loading, setLoading] = useState(false);

  async function onGetFullReport() {
    if (loading) return;
    setLoading(true);
    try {
      const token = await getAccessToken();
      if (token && snapshotId) {
        const catalogId = await claimCatalog({
          snapshotId,
          token,
          name: artistName ? `${artistName} Catalog` : undefined,
        });
        window.location.href = `${siteConfig.appUrl}/catalogs/${catalogId}`;
        return;
      }
    } catch {
      // Fall through to the plain app link — never block the user on a claim.
    }
    window.location.href = siteConfig.appUrl;
  }

  return { loading, onGetFullReport };
}
