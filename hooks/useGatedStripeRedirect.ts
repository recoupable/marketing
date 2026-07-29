"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export type GatedStripeRedirect = {
  start: () => Promise<void>;
  isPending: boolean;
  error: string;
};

/**
 * Shared Privy gate for the pricing page's Stripe redirects (paid Pro checkout
 * and the $0 card-on-file setup), mirroring useCatalogValuation: the trigger
 * opens Privy when signed out and auto-resumes on login, then navigates the
 * same tab to the Stripe-hosted page. Stays pending through that navigation.
 * Render inside `PrivyProvider`.
 *
 * @param createSessionUrl - Receives the Privy bearer, returns the hosted URL.
 */
export function useGatedStripeRedirect(
  createSessionUrl: (token: string) => Promise<string>,
): GatedStripeRedirect {
  const { ready, authenticated, login, getAccessToken } = usePrivy();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  // Set when the trigger fires while signed out, so the post-login effect
  // resumes the redirect automatically.
  const pendingRedirect = useRef(false);
  // Held in a ref so the resume effect never calls a stale closure.
  const createSessionUrlRef = useRef(createSessionUrl);
  createSessionUrlRef.current = createSessionUrl;

  async function doRedirect() {
    setIsPending(true);
    setError("");
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("couldn't verify your session, please try again");
      window.location.href = await createSessionUrlRef.current(token);
      // Stay pending: the browser is navigating to Stripe.
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setIsPending(false);
    }
  }

  async function start() {
    if (!ready || isPending) return;
    // Gate: signed out opens Privy and defers the redirect to a successful login.
    if (!authenticated) {
      pendingRedirect.current = true;
      login();
      return;
    }
    await doRedirect();
  }

  // Auto-resume the deferred redirect once the user signs in.
  useEffect(() => {
    if (authenticated && pendingRedirect.current) {
      pendingRedirect.current = false;
      void doRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return { start, isPending, error };
}
