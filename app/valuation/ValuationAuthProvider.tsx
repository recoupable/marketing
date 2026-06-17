"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";
import { CatalogValuation } from "@/components/valuation/CatalogValuation";

/**
 * Scopes Privy auth to the valuation flow (the rest of the marketing site has
 * no auth). Reuses chat's Privy app via `NEXT_PUBLIC_PRIVY_APP_ID` (shared user
 * pool) with **email-only** login — the valuation gate captures an email, so
 * wallet/social-only would defeat the goal (chat#1798).
 *
 * `NEXT_PUBLIC_PRIVY_APP_ID` is required (mirrors chat's PrivyProvider): the
 * build is expected to fail if it's unset, so the gate can never silently
 * fail open.
 */
export function ValuationAuthProvider() {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!appId) {
    throw new Error("Missing required NEXT_PUBLIC_PRIVY_APP_ID environment variable");
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "light",
          accentColor: siteConfig.brand.accentColor,
          logo: siteConfig.brand.privyLogo,
        },
        loginMethods: ["email"],
      }}
    >
      <CatalogValuation />
    </PrivyProvider>
  );
}
