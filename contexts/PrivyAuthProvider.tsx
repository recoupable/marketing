"use client";

import type { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";

/**
 * App-wide Privy auth provider (email-only, brand-themed). Rendered once at the
 * root (app/layout.tsx) so any page can use the valuation flow directly — no
 * per-page wrapper. Privy initializes on the client; the provider renders a
 * plain context on the server, so pages stay statically prerenderable
 * (chat#1798, chat#1814). Build fails if `NEXT_PUBLIC_PRIVY_APP_ID` is unset, so
 * the auth gate can never silently fail open.
 */
export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!appId) {
    throw new Error(
      "Missing required NEXT_PUBLIC_PRIVY_APP_ID environment variable",
    );
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
      {children}
    </PrivyProvider>
  );
}
