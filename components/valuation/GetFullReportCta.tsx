"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";
import { claimCatalog } from "@/lib/valuation/claimCatalog";

type GetFullReportCtaProps = {
  snapshotId?: string;
  artistName?: string | null;
};

/**
 * The "Get the full report" CTA. On click it claims the just-measured run into
 * an account-owned catalog (`POST /api/catalogs` with the Privy bearer) and
 * deep-links to that catalog in chat, so the work continues instead of landing
 * on an empty homepage. Claim-on-click (not per-run) avoids creating catalogs
 * for bounces. Any failure — or a missing snapshot/token — falls back to the
 * plain app URL so the user is never blocked.
 */
export function GetFullReportCta({ snapshotId, artistName }: GetFullReportCtaProps) {
  const { getAccessToken } = usePrivy();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
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

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="cta-pulse mt-8 block w-full rounded-full bg-(--foreground) px-9 py-4 text-center font-ui text-[15px] font-semibold text-(--background) transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Preparing your report…" : "Get the full report with Recoup →"}
    </button>
  );
}
