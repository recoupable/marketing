"use client";

import { AppLink } from "@/components/analytics/AppLink";

type GetFullReportCtaProps = {
  /** The catalog materialized by `POST /api/valuation`; deep-links into the app. */
  catalogId?: string;
};

/**
 * The "Get the full report" CTA. The valuation endpoint already materialized an
 * account-owned catalog, so this just deep-links to it in the app (no
 * client-side claim). A missing id falls back to the app root so the user is
 * never blocked.
 */
export function GetFullReportCta({ catalogId }: GetFullReportCtaProps) {
  return (
    <AppLink
      placement="valuation"
      cta="full_report"
      path={catalogId ? `/catalogs/${catalogId}` : undefined}
      className="cta-pulse mt-8 block w-full rounded-full bg-(--foreground) px-9 py-4 text-center font-ui text-[15px] font-semibold text-(--background) transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5"
    >
      Get the full report with Recoup →
    </AppLink>
  );
}
