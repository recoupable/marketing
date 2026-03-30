"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Item = { readonly label: string; readonly href: string };

/**
 * Accessible dropdown for nav sections (Platform, Solutions, etc.).
 * Opens on hover with delay; closes on blur. Keyboard and screen-reader friendly.
 */
const darkActive = "text-[#e6edf3] font-medium";
const darkInactive = "text-[#8b949e] hover:text-[#e6edf3]";
const lightActive = "text-[var(--foreground)] font-medium";
const lightInactive = "text-[var(--muted-foreground)] hover:text-[var(--foreground)]";

export function NavDropdown({
  label,
  href,
  items,
  dark = false,
}: {
  label: string;
  href: string;
  items: readonly Item[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPending = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleEnter = () => {
    clearPending();
    timeoutRef.current = setTimeout(() => setOpen(true), 100);
  };

  const handleLeave = () => {
    clearPending();
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => clearPending();
  }, []);

  const isActive = pathname === href || pathname.startsWith(href + "/");
  const linkClass = `text-sm transition-colors ${isActive ? (dark ? darkActive : lightActive) : (dark ? darkInactive : lightInactive)}`;

  if (items.length === 0) {
    return (
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    );
  }

  const panelClass = dark
    ? "min-w-[180px] rounded-md border border-[#30363d] bg-[#0d1117] py-1 shadow-lg"
    : "min-w-[180px] rounded-md border border-[var(--border)] bg-[var(--background)] py-1 shadow-lg";
  const itemClass = dark
    ? "block px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#21262d] transition-colors first:rounded-t-md last:rounded-b-md"
    : "block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors first:rounded-t-md last:rounded-b-md";

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link href={href} className={linkClass}>
        {label}
      </Link>
      {open && (
        <div
          className="absolute top-full left-0 pt-1 z-50"
          role="menu"
          aria-label={`${label} menu`}
        >
          <div className={panelClass}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={itemClass}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
