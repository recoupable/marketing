"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";
import { buildCheckoutSuccessUrl } from "@/lib/checkout/buildCheckoutSuccessUrl";
import {
  createDirectCheckoutSession,
  type CheckoutPlan,
} from "@/lib/checkout/createDirectCheckoutSession";
import { trackEvent } from "@/lib/analytics/trackEvent";

export type PlanCheckoutState = {
  startCheckout: () => Promise<void>;
  isPending: boolean;
  error: string;
};

/**
 * Drives a paid plan's checkout from the pricing page straight to Stripe: no
 * sign-in modal first (app#2044 decision 1). A signed-in visitor's Privy
 * bearer rides along so the subscription attaches to their account; everyone
 * else signs in after paying and the api links the account by billing email.
 * Stays pending through the navigation to the Stripe-hosted page.
 */
export function usePlanCheckout(plan: CheckoutPlan): PlanCheckoutState {
  const { ready, authenticated, getAccessToken } = usePrivy();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    if (isPending || !ready) return;
    setIsPending(true);
    setError("");
    try {
      // Wait for Privy hydrate before deciding signed-in vs signed-out, or a
      // signed-in click drops the bearer and links via billing email instead.
      const token = authenticated
        ? ((await getAccessToken()) ?? undefined)
        : undefined;
      const url = await createDirectCheckoutSession({
        plan,
        successUrl: buildCheckoutSuccessUrl(plan),
        cancelUrl: `${siteConfig.url}/pricing`,
        token,
      });
      // Session exists; fire before navigate so the beacon can flush.
      trackEvent("checkout_opened", { plan });
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setIsPending(false);
    }
  }

  return { startCheckout, isPending: isPending || !ready, error };
}
