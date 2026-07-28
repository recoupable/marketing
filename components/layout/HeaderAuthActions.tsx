"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { LogOut } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useSignedIn } from "@/hooks/useSignedIn";

/**
 * The header's auth-dependent actions on desktop: "Open app" plus a log-out
 * control when signed in, "Sign In" / "Sign Up" when signed out. Owns its own
 * auth state so `Header` stays agnostic — a new auth-dependent action lands
 * here without touching the header shell.
 *
 * Mobile counterparts live in `HeaderMobileAuthLinks`, inside the menu. The
 * log-out icon is `hidden sm:inline-flex` for the same reason "Sign In" is:
 * below `sm` the labelled menu row is the one that shows, so phones never
 * render two log-out controls.
 */
export function HeaderAuthActions() {
  const { logout } = usePrivy();
  const signedIn = useSignedIn();

  if (signedIn) {
    return (
      <>
        {/* Icon-only, matching the theme toggle — the header chrome is
            achromatic and text-free, and "Open app" stays the only CTA with
            weight. Labelled for assistive tech and on hover, since a bare
            glyph carries no accessible name. */}
        <button
          onClick={() => logout()}
          className="hidden sm:inline-flex p-1.5 rounded-full text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5 transition-colors"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={16} />
        </button>
        <Link
          href={siteConfig.appUrl}
          className="bg-(--foreground) text-(--background) px-5 py-2 rounded-full text-[14px] font-ui font-semibold hover:opacity-90 transition-opacity"
        >
          Open app
        </Link>
      </>
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
