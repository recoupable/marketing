"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { nav, isNavGroup } from "@/lib/nav";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The homepage has a full-bleed dark hero; while sitting over it (before any
  // scroll), the header goes light for contrast, then reverts once scrolled
  // onto the white sections below.
  const overHero = pathname === "/" && !scrolled;
  const whiteLogo = overHero || theme === "dark";
  const iconButton = overHero
    ? "text-white/80 hover:text-white hover:bg-white/10"
    : "text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5";

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
            src={whiteLogo ? "/brand/recoup-wordmark-white.svg" : "/brand/recoup-wordmark-black.svg"}
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
            className={`p-1.5 rounded-full transition-colors ${iconButton}`}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <Link
            href="/consulting"
            className={`hidden sm:inline-flex px-5 py-2 rounded-full text-[14px] font-ui font-semibold transition-colors ${
              overHero
                ? "bg-white text-[#0a0a0a] hover:bg-white/90"
                : "bg-(--foreground) text-(--background) hover:opacity-90"
            }`}
          >
            Talk to us
          </Link>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className={`p-1.5 rounded-full transition-colors ${iconButton}`}
            aria-label="Toggle menu"
            {...{ "aria-expanded": menuOpen }}
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
          {/* Dimmed backdrop closes the menu (Every-style). */}
          <button
            type="button"
            aria-label="Close menu"
            title="Close menu"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-16 z-40 cursor-default bg-black/40 animate-[menu-backdrop-in_0.2s_ease-out]"
          />
          {/* Left sidebar drawer. */}
          <div
            id="site-menu"
            className="fixed top-16 bottom-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col overflow-y-auto bg-(--background) animate-[menu-panel-in_0.28s_cubic-bezier(.16,1,.3,1)]"
            style={{ boxShadow: "1px 0 0 0 var(--border)" }}
          >
            <nav className="flex flex-1 flex-col px-4 py-6 space-y-0.5" role="navigation">
              {nav.map((item) =>
                isNavGroup(item) ? (
                  <div key={item.label} className="pt-3 first:pt-0">
                    <p className="px-3 pb-1 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-(--foreground)/35">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block px-3 py-2.5 text-[15px] font-ui font-semibold text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
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
                    className="block px-3 py-2.5 text-[15px] font-ui font-semibold text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="px-4 pb-6 pt-2">
              <Link
                href="/consulting"
                className="block px-3 py-3 text-sm font-ui font-semibold text-(--background) bg-(--foreground) rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Talk to us
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
