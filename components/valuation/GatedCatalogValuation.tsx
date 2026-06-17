"use client";

import { usePrivy } from "@privy-io/react-auth";
import { CatalogValuation } from "@/components/valuation/CatalogValuation";

/**
 * Bridges Privy auth into the valuation flow. Rendered only inside
 * `PrivyProvider` (so `usePrivy` is safe); the un-gated variant renders
 * `CatalogValuation` directly. Passes the auth gate — `authenticated`, `login`,
 * and the access-token getter — down to the run (chat#1798).
 */
export function GatedCatalogValuation() {
  const { authenticated, login, getAccessToken, user } = usePrivy();
  return (
    <CatalogValuation
      gate={{
        authed: authenticated,
        login: () => login(),
        getToken: getAccessToken,
        email: user?.email?.address,
      }}
    />
  );
}
