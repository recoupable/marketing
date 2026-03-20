"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { nav } from "@/lib/nav";
import { NavDropdown } from "./NavDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { useHumanMachine } from "@/contexts/HumanMachineContext";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Site-wide header with logo and full nav per website-structure-report.md.
 * Dark when Machine view is selected so nav matches the markdown panel.
 * Logo uses light/dark asset by theme and Machine view.
 */
export function Header() {
  const { view } = useHumanMachine();
  const { theme } = useTheme();
  const isMachine = view === "machine";
  const useDarkLogo = isMachine || theme === "dark";

  return (
    <header
      className={`transition-colors ${
        isMachine ? "bg-[#0d1117]" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={useDarkLogo ? "/brand/wordmark-darkmode.svg" : "/brand/wordmark-lightmode.svg"}
            alt={siteConfig.name}
            width={260}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavDropdown
            label={nav.platform.label}
            href={nav.platform.href}
            items={nav.platform.items}
            dark={isMachine}
          />
          <NavDropdown
            label={nav.solutions.label}
            href={nav.solutions.href}
            items={nav.solutions.items}
            dark={isMachine}
          />
          <NavDropdown
            label={nav.developers.label}
            href={nav.developers.href}
            items={nav.developers.items}
            dark={isMachine}
          />
          <NavDropdown
            label={nav.learn.label}
            href={nav.learn.href}
            items={nav.learn.items}
            dark={isMachine}
          />
          <NavDropdown
            label={nav.company.label}
            href={nav.company.href}
            items={nav.company.items}
            dark={isMachine}
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <ThemeToggle />
          <Link
            href={siteConfig.appUrl}
            className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full focus:ring-[var(--foreground)] ${
              isMachine ? "text-[#8b949e] hover:text-[#e6edf3]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Sign in
          </Link>
          <Link
            href={siteConfig.appUrl}
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Mobile: simple links to main sections + blog */}
      <nav
        className={`md:hidden border-t px-4 py-3 flex flex-wrap items-center gap-4 text-sm ${
          isMachine
            ? "border-[#30363d]"
            : "border-[var(--border)]"
        }`}
      >
        <Link
          href="/platform"
          className={isMachine ? "text-[#8b949e] hover:text-[#e6edf3]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}
        >
          Platform
        </Link>
        <Link
          href="/solutions"
          className={isMachine ? "text-[#8b949e] hover:text-[#e6edf3]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}
        >
          Solutions
        </Link>
        <Link
          href="/developers"
          className={isMachine ? "text-[#8b949e] hover:text-[#e6edf3]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}
        >
          Developers
        </Link>
        <Link
          href="/blog"
          className={isMachine ? "text-[#8b949e] hover:text-[#e6edf3]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}
        >
          Blog
        </Link>
        <Link
          href="/company"
          className={isMachine ? "text-[#8b949e] hover:text-[#e6edf3]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}
        >
          Company
        </Link>
      </nav>
    </header>
  );
}
