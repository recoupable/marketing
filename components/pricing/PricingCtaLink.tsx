"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import type { PricingSurface } from "@/lib/analytics/pricingSurface";

/**
 * Plan CTA anchor that fires `pricing_cta_clicked { plan, surface }` on
 * click. A client wrapper so a server-rendered page can attach the handler
 * without changing the anchor's href, copy, or styling.
 */
export function PricingCtaLink({
  plan,
  surface,
  href,
  className,
  children,
}: {
  plan: string;
  surface: PricingSurface;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("pricing_cta_clicked", { plan, surface })}
    >
      {children}
    </a>
  );
}
