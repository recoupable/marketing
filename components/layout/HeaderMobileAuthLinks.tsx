"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { LogOut } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useSignedIn } from "@/hooks/useSignedIn";

/**
 * The auth-dependent rows inside the mobile menu. Counterpart to
 * `HeaderAuthActions`, which covers the same states on desktop; both own their
 * auth state so the header shell carries none.
 *
 * Log out is a labelled row here rather than the desktop's bare glyph — an
 * icon-only entry reads as decoration in a list of text links.
 *
 * @param onNavigate - closes the menu after the row is activated.
 */
export function HeaderMobileAuthLinks({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const { logout } = usePrivy();
  const signedIn = useSignedIn();

  return (
    <>
      <Link
        href={siteConfig.appUrl}
        className="block px-3 py-2.5 text-sm font-ui font-medium text-(--foreground)/70 sm:hidden"
        onClick={onNavigate}
      >
        {signedIn ? "Open app" : "Sign In"}
      </Link>
      {signedIn && (
        <button
          onClick={() => {
            onNavigate();
            void logout();
          }}
          className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-ui font-medium text-(--foreground)/70 sm:hidden"
        >
          <LogOut size={16} />
          Log out
        </button>
      )}
    </>
  );
}
