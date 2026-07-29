"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { buildChatUrl } from "@/lib/buildChatUrl";
import { createCheckoutSession } from "@/lib/checkout/createCheckoutSession";

export type ProCheckoutState = {
  startCheckout: () => Promise<void>;
  isPending: boolean;
  error: string;
};

/**
 * Drives the Pro subscription checkout behind the Privy sign-in gate,
 * mirroring useCatalogValuation: the trigger opens Privy when signed out and,
 * on login, auto-resumes the checkout. On success the browser navigates to the
 * Stripe-hosted checkout page; Stripe then sends the buyer into the chat app
 * with attribution preserved. Render inside `PrivyProvider`.
 */
export function useProCheckout(): ProCheckoutState {
  const { ready, authenticated, login, getAccessToken } = usePrivy();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  // Set when the trigger fires while signed out, so the post-login effect
  // resumes the checkout automatically.
  const pendingCheckout = useRef(false);

  async function doCheckout() {
    setIsPending(true);
    setError("");
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("couldn't verify your session, please try again");
      const successUrl = buildChatUrl({ checkout: "success", campaign: "pro-trial" });
      window.location.href = await createCheckoutSession(successUrl, token);
      // Stay pending: the browser is navigating to Stripe.
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setIsPending(false);
    }
  }

  async function startCheckout() {
    if (!ready || isPending) return;
    // Gate: signed out opens Privy and defers checkout to a successful login.
    if (!authenticated) {
      pendingCheckout.current = true;
      login();
      return;
    }
    await doCheckout();
  }

  // Auto-resume the deferred checkout once the user signs in.
  useEffect(() => {
    if (authenticated && pendingCheckout.current) {
      pendingCheckout.current = false;
      void doCheckout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return { startCheckout, isPending, error };
}
