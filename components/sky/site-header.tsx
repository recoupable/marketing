"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageMark } from "./brand";
import { HeaderNavItems } from "./header-nav-items";
import { NavigationIcon } from "./navigation-icon";

export function SkySiteHeader() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);

  function closeOnLink(event: MouseEvent<HTMLElement>) {
    if (!(event.target instanceof Element) || !event.target.closest("a")) return;
    header.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((menu) => { menu.open = false; });
  }

  useEffect(() => {
    function dismiss(event: PointerEvent | KeyboardEvent) {
      const menus = [...(header.current?.querySelectorAll<HTMLDetailsElement>("details[open]") ?? [])];
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape") return;
        // Close the innermost disclosure first so focus stays in the visible mobile menu.
        const menu = menus.reverse().find((item) => item.contains(document.activeElement)) ?? menus[0];
        if (menu) {
          menu.open = false;
          menu.querySelector("summary")?.focus();
        }
        return;
      }
      for (const menu of menus) {
        if (event.target instanceof Node && menu.contains(event.target)) continue;
        menu.open = false;
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, []);

  return (
    <header ref={header} className="ss-header" onClick={closeOnLink}>
      <details className="ss-mobile-menu">
        <summary aria-label="Navigation"><NavigationIcon /></summary>
        <nav aria-label="Mobile navigation">
          <HeaderNavItems pathname={pathname} mobile />
          <TrackedLink href="/start-project" cta="free_audit" placement="mobile_nav">Get a free audit <SkyArrow /></TrackedLink>
        </nav>
      </details>
      <Link href="/" className="ss-wordmark" aria-label="Recoup home"><PageMark /><span>Recoup</span></Link>
      <nav className="ss-desktop-nav" aria-label="Main navigation">
        <HeaderNavItems pathname={pathname} />
      </nav>
      <TrackedLink href="/start-project" cta="free_audit" placement="header" className="ss-contact">
        <span className="nav-cta-desktop">Get a free audit</span><span className="nav-cta-mobile">Free audit</span><SkyArrow />
      </TrackedLink>
    </header>
  );
}
