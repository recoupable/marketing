"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { nav, isNavGroup } from "@/lib/nav";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-(--background)/80 backdrop-blur-xl border-b border-(--border)/50" : "border-b border-transparent"}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/brand/recoup-wordmark-white.svg" : "/brand/recoup-wordmark-black.svg"}
            alt={siteConfig.name}
            width={140}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <Link
            href="/consulting"
            className="hidden sm:inline-flex bg-(--foreground) text-(--background) px-5 py-2 rounded-full text-[14px] font-ui font-semibold hover:opacity-90 transition-opacity"
          >
            Talk to us
          </Link>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="p-1.5 rounded-full text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-controls="site-menu"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          {/* Click-outside backdrop closes the menu. */}
          <button
            type="button"
            aria-label="Close menu"
            title="Close menu"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-16 z-40 cursor-default bg-transparent"
          />
          <div
            id="site-menu"
            className="relative z-50 border-t border-(--border) bg-(--background)/95 backdrop-blur-lg"
          >
            <nav
              className="max-w-[1280px] mx-auto px-6 py-4 space-y-1"
              role="navigation"
            >
              {nav.map((item) =>
                isNavGroup(item) ? (
                  <div key={item.label} className="pt-2">
                    <p className="px-3 pb-1 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-(--foreground)/35">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block px-3 py-2.5 text-sm font-ui font-semibold text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block px-3 py-2.5 text-sm font-ui font-semibold text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link
                href="/consulting"
                className="mt-2 block px-3 py-2.5 text-sm font-ui font-semibold text-(--background) bg-(--foreground) rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Talk to us
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
