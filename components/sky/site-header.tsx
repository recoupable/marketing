"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { getStartedCopy } from "@/lib/copy/get-started";
import { GetStartedDialog } from "./get-started-dialog";
import { PageMark } from "./brand";
import { HeaderNavItems } from "./header-nav-items";
import { NavigationIcon } from "./navigation-icon";

export function SkySiteHeader({ audienceToggle }: { audienceToggle?: React.ReactNode }) {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);

  function openGetStarted(placement: string) {
    header.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(menu => { menu.open = false; });
    // Return focus to the always-visible CTA, even when opened from the mobile menu.
    startButton.current?.focus();
    dialog.current?.showModal();
    trackEvent("cta_clicked", { cta: "get_started", placement });
  }

  function closeOnLink(event: MouseEvent<HTMLElement>) {
    if (!(event.target instanceof Element) || !event.target.closest("a")) return;
    header.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((menu) => { menu.open = false; });
  }

  useEffect(() => {
    const root = header.current;
    const desktopNav = root?.querySelector(".ss-desktop-nav");
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    const cancelClose = () => clearTimeout(closeTimer);
    const closeDesktop = () => {
      desktopNav?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(menu => { menu.open = false; });
    };
    function openOnHover(event: Event) {
      if (!(event instanceof PointerEvent) || event.pointerType !== "mouse" || !matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches) return;
      if (!(event.target instanceof Element)) return;
      const summary = event.target.closest("summary");
      if (summary && desktopNav?.contains(summary)) {
        // Moving between a label and its chevron must not reopen a menu dismissed with Escape.
        if (event.relatedTarget instanceof Node && summary.contains(event.relatedTarget)) return;
        cancelClose();
        (summary.parentElement as HTMLDetailsElement).open = true;
      } else if (event.target.closest(".ss-desktop-nav > a")) {
        cancelClose();
        closeDesktop();
      }
    }
    function leaveHeader(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      cancelClose();
      closeTimer = setTimeout(closeDesktop, 180);
    }
    function leaveFocus(event: FocusEvent) {
      if (event.relatedTarget instanceof Node && root?.contains(event.relatedTarget)) return;
      cancelClose();
      closeDesktop();
    }
    function dismiss(event: PointerEvent | KeyboardEvent) {
      cancelClose();
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
    desktopNav?.addEventListener("pointerover", openOnHover);
    root?.addEventListener("pointerenter", cancelClose);
    root?.addEventListener("pointerleave", leaveHeader);
    root?.addEventListener("focusout", leaveFocus);
    return () => {
      cancelClose();
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
      desktopNav?.removeEventListener("pointerover", openOnHover);
      root?.removeEventListener("pointerenter", cancelClose);
      root?.removeEventListener("pointerleave", leaveHeader);
      root?.removeEventListener("focusout", leaveFocus);
    };
  }, []);

  return (
    <header ref={header} className={`ss-header${audienceToggle ? " ss-header-with-audience" : ""}`} onClick={closeOnLink}>
      <details className="ss-mobile-menu">
        <summary aria-label="Navigation"><NavigationIcon /></summary>
        <nav aria-label="Mobile navigation">
          <HeaderNavItems pathname={pathname} mobile />
          {audienceToggle && <div className="ss-mobile-audience">{audienceToggle}</div>}
          <button type="button" className="ss-mobile-start" aria-haspopup="dialog" onClick={() => openGetStarted("mobile_nav")}>{getStartedCopy.trigger} <SkyArrow /></button>
        </nav>
      </details>
      <Link href="/" className="ss-wordmark" aria-label="Recoup home"><PageMark /><span>Recoup</span></Link>
      <nav className="ss-desktop-nav" aria-label="Main navigation">
        <HeaderNavItems pathname={pathname} />
      </nav>
      {audienceToggle}
      <button ref={startButton} type="button" aria-haspopup="dialog" onClick={() => openGetStarted("header")} className="ss-contact ss-get-started">
        {getStartedCopy.trigger}<SkyArrow />
      </button>
      <GetStartedDialog ref={dialog} />
    </header>
  );
}
