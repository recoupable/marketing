"use client";

import { siteConfig } from "@/lib/config";

type GetFullReportCtaProps = {
  /** The catalog materialized by `POST /api/valuation`; deep-links into chat. */
  catalogId?: string;
};

/**
 * The "Get the full report" CTA. The valuation endpoint already materialized an
 * account-owned catalog, so this just deep-links to it in chat (no client-side
 * claim). A missing id falls back to the plain app URL so the user is never
 * blocked.
 */
export function GetFullReportCta({ catalogId }: GetFullReportCtaProps) {
  const href = catalogId
    ? `${siteConfig.appUrl}/catalogs/${catalogId}`
    : siteConfig.appUrl;

  return (
    <a
      href={href}
      className="cta-pulse mt-8 block w-full rounded-full bg-(--foreground) px-9 py-4 text-center font-ui text-[15px] font-semibold text-(--background) transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5"
    >
      Get the full report with Recoup →
    </a>
  );
}
