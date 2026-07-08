"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";
import { HeaderAccountMenu } from "@/components/layout/HeaderAccountMenu";

/**
 * The header's auth cluster. Signed out (and while Privy initializes) it
 * renders the Sign In / Sign Up pair; once a Privy session exists it flips to
 * the account menu, so the header stops pretending the visitor is anonymous
 * after they authenticated through the valuation flow (chat#1850).
 */
export function HeaderAuth() {
  const { ready, authenticated, user, logout } = usePrivy();

  if (ready && authenticated) {
    return (
      <HeaderAccountMenu email={user?.email?.address} onLogout={logout} />
    );
  }

  return (
    <>
      <Link
        href={siteConfig.appUrl}
        className="hidden sm:inline-block text-[14px] font-ui font-medium text-(--foreground)/70 hover:text-(--foreground) transition-colors px-4 py-1.5 rounded-full border border-(--border) hover:border-(--foreground)/20"
      >
        Sign In
      </Link>
      <Link
        href={siteConfig.appUrl}
        className="bg-(--foreground) text-(--background) px-5 py-2 rounded-full text-[14px] font-ui font-semibold hover:opacity-90 transition-opacity"
      >
        Sign Up
      </Link>
    </>
  );
}
