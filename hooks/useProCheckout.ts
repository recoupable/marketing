"use client";

import { buildChatUrl } from "@/lib/buildChatUrl";
import { createCheckoutSession } from "@/lib/checkout/createCheckoutSession";
import { useGatedStripeRedirect } from "@/hooks/useGatedStripeRedirect";

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
  const { start, isPending, error } = useGatedStripeRedirect((token) =>
    createCheckoutSession(
      buildChatUrl({ checkout: "success", campaign: "pro-trial" }),
      token,
    ),
  );

  return { startCheckout: start, isPending, error };
}
