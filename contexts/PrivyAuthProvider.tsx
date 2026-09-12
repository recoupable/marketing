"use client";

import type { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";

/** Email-only authentication, loaded only by the valuation route. */
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
          // Both marketing flows (valuation, Pro trial) open this modal after a
          // click elsewhere; say why it opened and that nothing is charged here.
          loginMessage:
            "Enter your email for a one-time code. Nothing is charged at this step.",
        },
        loginMethods: ["email"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
