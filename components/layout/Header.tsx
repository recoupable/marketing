"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { nav } from "@/lib/nav";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, ChevronDown } from "lucide-react";

type NavKey = keyof typeof nav;
const NAV_KEYS: NavKey[] = [
  "platform",
  "solutions",
  "developers",
  "learn",
  "company",
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<NavKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter(key: NavKey) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-(--background)/80 backdrop-blur-xl border-b border-(--border)/50" : "border-b border-transparent"}`}>
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/brand/recoup-wordmark-white.svg" : "/brand/recoup-wordmark-black.svg"}
            alt={siteConfig.name}
            width={140}
            height={28}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2" role="navigation">
          {NAV_KEYS.map((key) => {
            const section = nav[key];
            const isOpen = openDropdown === key;

            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleEnter(key)}
                onMouseLeave={handleLeave}
              >
                <Link
                  href={section.href}
                  className="flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-ui font-medium text-(--foreground)/60 hover:text-(--foreground) transition-colors rounded-full hover:bg-(--foreground)/5"
                >
                  {section.label}
                  <ChevronDown
                    size={12}
                    className={`opacity-40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {isOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="bg-(--background) border border-(--border) rounded-xl shadow-lg py-1.5 min-w-[180px]">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-[13px] font-ui text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--muted) transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-full text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5 transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <Link
            href={siteConfig.appUrl}
            className="hidden sm:inline-block text-[13px] font-ui font-medium text-(--foreground)/50 hover:text-(--foreground) transition-colors px-3 py-1.5"
          >
            Sign In
          </Link>
          <Link
            href={siteConfig.appUrl}
            className="bg-(--foreground) text-(--background) px-4 py-1.5 rounded-full text-[13px] font-ui font-semibold hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-(--border) bg-(--background)/95 backdrop-blur-lg">
          <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-1">
            {NAV_KEYS.map((key) => {
              const section = nav[key];
              return (
                <div key={key}>
                  <Link
                    href={section.href}
                    className="block px-3 py-2 text-sm font-ui font-semibold text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {section.label}
                  </Link>
                  <div className="pl-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-1.5 text-sm font-ui text-(--muted-foreground) hover:text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <Link
              href={siteConfig.appUrl}
              className="block px-3 py-2 text-sm font-ui font-medium text-(--foreground)/70 sm:hidden"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
