"use client";

import { buildChatUrl } from "@/lib/buildChatUrl";
import { createCheckoutSession } from "@/lib/checkout/createCheckoutSession";
import { useGatedStripeRedirect } from "@/hooks/useGatedStripeRedirect";
import { trackEvent } from "@/lib/analytics/trackEvent";

export type ProCheckoutState = {
  startCheckout: () => Promise<void>;
  isPending: boolean;
  error: string;
};

/**
 * Drives the paid Pro subscription checkout from the pricing page, behind the
 * shared Privy sign-in gate (useGatedStripeRedirect). On success the browser
 * navigates to the Stripe-hosted checkout page; Stripe then sends the buyer
 * into the chat app with attribution preserved.
 */
export function useProCheckout(): ProCheckoutState {
  const { start, isPending, error } = useGatedStripeRedirect(async (token) => {
    const url = await createCheckoutSession(
      buildChatUrl({ checkout: "success", campaign: "pro-trial" }),
      token,
    );
    // The session exists and the browser is about to leave for Stripe.
    trackEvent("checkout_opened", { plan: "pro" });
    return url;
  });

  return { startCheckout: start, isPending, error };
}
