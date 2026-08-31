"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useSignedIn } from "@/hooks/useSignedIn";
import { fetchAccountPlan } from "@/lib/account/fetchAccountPlan";
import type { PlanId } from "@/lib/pricing/entitlements";

/**
 * The signed-in visitor's plan, or null while signed out, loading, or when
 * the api could not say. Render inside `PrivyProvider`.
 */
export function useAccountPlan(): PlanId | null {
  const signedIn = useSignedIn();
  const { getAccessToken } = usePrivy();
  const [plan, setPlan] = useState<PlanId | null>(null);

  useEffect(() => {
    if (!signedIn) {
      setPlan(null);
      return;
    }
    let cancelled = false;
    void (async () => {
      const token = await getAccessToken();
      const next = token ? await fetchAccountPlan(token) : null;
      if (!cancelled) setPlan(next);
    })();
    return () => {
      cancelled = true;
    };
    // getAccessToken is stable for a Privy session; re-run only on sign-in changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn]);

  return plan;
}
