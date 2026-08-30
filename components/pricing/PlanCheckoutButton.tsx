"use client";

import { usePlanCheckout } from "@/hooks/usePlanCheckout";
import type { CheckoutPlan } from "@/lib/checkout/createCheckoutSession";
import { trackEvent } from "@/lib/analytics/trackEvent";

/**
 * A paid plan's CTA. Starts Stripe checkout directly from the pricing page
 * (sign-in gated via Privy inside usePlanCheckout) instead of deep-linking
 * into the chat app. Styled by the caller so it stays visually identical to
 * the anchor CTA on the Free card.
 */
export function PlanCheckoutButton({
  plan,
  label,
  note,
  className,
}: {
  plan: CheckoutPlan;
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
          trackEvent("pricing_cta_clicked", { plan });
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
        <p role="alert" className="mt-2 text-xs text-red-500 text-center">
          {error}. Click the button to retry.
        </p>
      )}
    </div>
  );
}
