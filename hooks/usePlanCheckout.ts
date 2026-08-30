"use client";

import { buildChatUrl } from "@/lib/buildChatUrl";
import { createCheckoutSession, type CheckoutPlan } from "@/lib/checkout/createCheckoutSession";
import { useGatedStripeRedirect } from "@/hooks/useGatedStripeRedirect";
import { trackEvent } from "@/lib/analytics/trackEvent";

export type PlanCheckoutState = {
  startCheckout: () => Promise<void>;
  isPending: boolean;
  error: string;
};

/** UTM campaign per paid plan, so the app-side success redirect keeps attribution. */
const CAMPAIGN: Record<CheckoutPlan, string> = { starter: "starter", pro: "pro-trial" };

/**
 * Drives a paid plan's subscription checkout from the pricing page, behind
 * the shared Privy sign-in gate (useGatedStripeRedirect). On success the
 * browser navigates to the Stripe-hosted checkout page; Stripe then sends the
 * buyer into the chat app with attribution preserved.
 */
export function usePlanCheckout(plan: CheckoutPlan): PlanCheckoutState {
  const { start, isPending, error } = useGatedStripeRedirect(async (token) => {
    const url = await createCheckoutSession(
      buildChatUrl({ checkout: "success", campaign: CAMPAIGN[plan] }),
      token,
      plan,
    );
    // The session exists and the browser is about to leave for Stripe.
    trackEvent("checkout_opened", { plan });
    return url;
  });

  return { startCheckout: start, isPending, error };
}
