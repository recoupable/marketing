"use client";

import { usePlanCheckout } from "@/hooks/usePlanCheckout";
import type { CheckoutPlan } from "@/lib/checkout/createDirectCheckoutSession";
import { trackEvent } from "@/lib/analytics/trackEvent";
import type { PricingSurface } from "@/lib/analytics/pricingSurface";

/**
 * A paid plan's CTA. Opens Stripe checkout straight from the pricing page,
 * no sign-in modal first (usePlanCheckout). Styled by the caller so it stays
 * visually identical to the anchor CTA on the Free card.
 */
export function PlanCheckoutButton({
  plan,
  surface,
  label,
  note,
  className,
}: {
  plan: CheckoutPlan;
  surface: PricingSurface;
  label: string;
  /** Disclosed under the button so the sign-in and card steps are no surprise. */
  note?: string;
  className: string;
}) {
  const { startCheckout, isPending, error } = usePlanCheckout(plan);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          trackEvent("pricing_cta_clicked", { plan, surface });
          void startCheckout();
        }}
        disabled={isPending}
        className={`${className} disabled:opacity-70 disabled:cursor-wait`}
      >
        {isPending ? "Starting checkout..." : label}
      </button>
      {note && (
        <p className="mt-2 text-xs opacity-70 text-center leading-relaxed">
          {note}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive text-center">
          {error}. Click the button to retry.
        </p>
      )}
    </div>
  );
}
