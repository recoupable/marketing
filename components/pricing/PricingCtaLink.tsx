"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

/**
 * Pricing-page CTA anchor that fires `pricing_cta_clicked` on click. A client
 * wrapper so the server-rendered pricing page can attach the handler without
 * changing the anchor's href, copy, or styling.
 */
export function PricingCtaLink({
  plan,
  href,
  className,
  children,
}: {
  plan: string;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("pricing_cta_clicked", { plan })}
    >
      {children}
    </a>
  );
}
