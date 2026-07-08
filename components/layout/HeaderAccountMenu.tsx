"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/lib/config";
import { accountInitial } from "@/lib/format/accountInitial";
import { useClickOutside } from "@/hooks/useClickOutside";

type HeaderAccountMenuProps = {
  email: string | undefined;
  onLogout: () => Promise<void>;
};

/**
 * The signed-in header control: an avatar with the account's initial that
 * opens a small menu — the session email, "Open app" into chat, and log out.
 * Gives the marketing surface the logout it never had (chat#1850).
 */
export function HeaderAccountMenu({ email, onLogout }: HeaderAccountMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setOpen(false));

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-(--foreground) text-[13px] font-ui font-semibold text-(--background) transition-opacity hover:opacity-90"
      >
        {accountInitial(email)}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-(--background) py-1.5"
          style={{
            boxShadow:
              "0px 0px 0px 1px var(--border), 0px 4px 8px rgba(0,0,0,0.06), 0px 8px 16px -4px rgba(0,0,0,0.04)",
          }}
        >
          {email && (
            <p className="truncate px-3.5 pb-1.5 pt-1 text-[12px] text-(--foreground)/50">
              {email}
            </p>
          )}
          <a
            href={siteConfig.appUrl}
            role="menuitem"
            className="block px-3.5 py-2 text-[13px] font-ui font-medium text-(--foreground) transition-colors hover:bg-(--foreground)/5"
          >
            Open app
          </a>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              void onLogout();
            }}
            className="block w-full px-3.5 py-2 text-left text-[13px] font-ui font-medium text-(--foreground)/70 transition-colors hover:bg-(--foreground)/5"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
