"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { CatalogValuation } from "@/components/valuation/CatalogValuation";
import { GatedCatalogValuation } from "@/components/valuation/GatedCatalogValuation";

/**
 * Scopes Privy auth to the valuation flow only (the rest of the marketing site
 * has no auth). Reuses chat's Privy app via `NEXT_PUBLIC_PRIVY_APP_ID` (shared
 * user pool) and **email-only** login — the valuation gate captures an email,
 * so wallet/social-only would defeat the goal (chat#1798).
 *
 * Degrades gracefully when the app id isn't configured yet: renders the flow
 * un-gated (no `PrivyProvider`, no `usePrivy`) so the page builds before the env
 * is set.
 */
export function ValuationAuthProvider() {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[valuation] NEXT_PUBLIC_PRIVY_APP_ID not set — sign-in gate disabled");
    }
    return <CatalogValuation />;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#003199",
          logo: "/brand/wordmark-lightmode.svg",
        },
        loginMethods: ["email"],
      }}
    >
      <GatedCatalogValuation />
    </PrivyProvider>
  );
}
