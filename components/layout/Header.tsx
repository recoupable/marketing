"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { nav } from "@/lib/nav";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-(--background)/80 backdrop-blur-xl border-b border-(--border)/50" : "border-b border-transparent"}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/brand/recoupable-wordmark-white.svg" : "/brand/recoupable-wordmark-black.svg"}
            alt={siteConfig.name}
            width={140}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" role="navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="px-4 py-2 text-[14px] font-ui font-medium text-(--foreground)/60 hover:text-(--foreground) transition-colors rounded-full hover:bg-(--foreground)/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/5 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

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
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-(--border) bg-(--background)/95 backdrop-blur-lg">
          <div className="max-w-[1280px] mx-auto px-6 py-4 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block px-3 py-2.5 text-sm font-ui font-semibold text-(--foreground) rounded-lg hover:bg-(--muted) transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.appUrl}
              className="block px-3 py-2.5 text-sm font-ui font-medium text-(--foreground)/70 sm:hidden"
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
