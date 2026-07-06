"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { siteConfig } from "@/lib/config";

/**
 * The mobile menu's Sign In entry. Hidden for signed-in sessions — on mobile
 * the account menu in the header bar already carries "Open app" and log out.
 */
export function MobileSignInLink({ onNavigate }: { onNavigate: () => void }) {
  const { ready, authenticated } = usePrivy();
  if (ready && authenticated) return null;
  return (
    <Link
      href={siteConfig.appUrl}
      className="block px-3 py-2.5 text-sm font-ui font-medium text-(--foreground)/70 sm:hidden"
      onClick={onNavigate}
    >
      Sign In
    </Link>
  );
}
