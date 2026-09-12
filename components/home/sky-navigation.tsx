"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { NavigationIcon } from "@/components/sky/navigation-icon";

export function SkyNavigation({ mark }: { mark: ReactNode }) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    function dismiss(event: PointerEvent | KeyboardEvent) {
      if (!header.current) return;
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      for (const menu of header.current.querySelectorAll<HTMLDetailsElement>("details[open]")) {
        if (event instanceof PointerEvent && event.target instanceof Node && menu.contains(event.target)) continue;
        menu.open = false;
        if (event instanceof KeyboardEvent) menu.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, []);

  function closeOnNavigation() {
    header.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((menu) => { menu.open = false; });
  }

  return <header className="sky-nav" ref={header}>
    <details className="sky-mobile-menu">
      <summary aria-label="Navigation"><NavigationIcon /></summary>
      <nav aria-label="Mobile navigation" onClick={closeOnNavigation}>
        <Link href="/services">Services</Link><Link href="/case-studies">Work</Link><Link href="/pricing">Pricing</Link><a href="#tools">Tools</a><Link href="/docs">Docs</Link><Link href="/about">About</Link><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link><TrackedLink href="/start-project" cta="free_audit" placement="home_mobile_nav">Get a Free Audit</TrackedLink>
      </nav>
    </details>
    <a href="#sky-home" className="sky-wordmark" aria-label="Recoup home">{mark}<span>Recoup</span></a>
    <nav className="sky-desktop-nav" aria-label="Main navigation">
      <Link href="/services">Services</Link>
      <Link href="/case-studies">Work</Link>
      <Link href="/pricing">Pricing</Link>
      <details className="sky-tools-menu">
        <summary>Tools <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg></summary>
        <div className="sky-tools-dropdown" onClick={closeOnNavigation}>
          <Link href="/skills"><strong>Skills</strong><span>Music playbooks for your AI.</span></Link>
          <Link href="/platform"><strong>Platform</strong><span>Research, content, and recurring work.</span></Link>
          <Link href="/developers"><strong>Developers</strong><span>Build with the API, MCP, and CLI.</span></Link>
        </div>
      </details>
      <Link href="/docs">Docs</Link><Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
    </nav>
    <TrackedLink href="/start-project" cta="free_audit" placement="home_header" className="sky-nav-contact"><span className="nav-cta-desktop">Get a Free Audit</span><span className="nav-cta-mobile">Free Audit</span><SkyArrow /></TrackedLink>

  </header>;
}
