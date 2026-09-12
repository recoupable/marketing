"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS = "[data-reveal], [data-reveal-group] > *";

/** Progressive enhancement: server-rendered content is always visible. */
export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    const seen = new WeakSet<HTMLElement>();
    const pending = new Map<HTMLElement, number>();
    const active = new Map<HTMLElement, Animation>();
    let printing = false;

    const stop = (element: HTMLElement) => {
      seen.add(element);
      pending.delete(element);
      observer.unobserve(element);
      active.get(element)?.cancel();
      active.delete(element);
    };

    const prepare = (element: HTMLElement, delay: number) => {
      const style = getComputedStyle(element);
      const frames: Keyframe[] = [{ opacity: 0 }, { opacity: style.opacity }];
      // Individual translate preserves existing artwork rotations and transforms.
      if (style.translate === "none") {
        frames[0].translate = compact.matches ? "0 16px" : "0 22px";
        frames[1].translate = "0 0";
      }
      const animation = element.animate(frames, {
        duration: compact.matches ? 650 : 800,
        delay,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      });
      animation.id = "recoup-reveal";
      animation.pause();
      animation.currentTime = 0;
      active.set(element, animation);
      animation.onfinish = () => { active.delete(element); animation.cancel(); };
      animation.oncancel = () => {
        if (active.get(element) === animation) active.delete(element);
      };
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        if (!pending.has(element) || !element.isConnected) continue;
        // Fast jumps and keyboard destinations should appear immediately.
        if (reduced.matches || printing || entry.boundingClientRect.top < 0 ||
            element.matches(":focus-within")) {
          stop(element);
          continue;
        }
        seen.add(element);
        pending.delete(element);
        observer.unobserve(element);
        active.get(element)?.play();
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });

    const revealDestination = (destination: Element) => {
      for (const element of new Set([...pending.keys(), ...active.keys()])) {
        if (destination.contains(element) || element.contains(destination)) stop(element);
      }
    };

    const hashDestination = (hash: string) => {
      if (!hash) return;
      try {
        const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (destination) revealDestination(destination);
      } catch { /* Malformed fragment identifiers still use native navigation. */ }
    };

    const register = (element: HTMLElement) => {
      if (seen.has(element) || pending.has(element)) return;
      // Never stack parent and child reveal animations.
      if (element.parentElement?.closest(TARGETS)) return;
      const rect = element.getBoundingClientRect();
      // First paint and restored scroll positions must never fade out to fade in.
      if (rect.top < window.innerHeight || rect.height === 0) {
        seen.add(element);
        return;
      }
      const siblings = element.parentElement?.hasAttribute("data-reveal-group")
        ? Array.from(element.parentElement.children) : [];
      const delay = Math.min(Math.max(siblings.indexOf(element), 0), 3) * (compact.matches ? 45 : 80);
      pending.set(element, delay);
      if (!reduced.matches && !printing) {
        prepare(element, delay);
        observer.observe(element);
      }
    };

    const scan = (root: Element) => {
      if (root instanceof HTMLElement && root.matches(TARGETS)) register(root);
      root.querySelectorAll<HTMLElement>(TARGETS).forEach(register);
      hashDestination(window.location.hash);
    };

    const resume = () => {
      observer.disconnect();
      for (const animation of active.values()) animation.cancel();
      active.clear();
      for (const element of pending.keys()) {
        if (!element.isConnected || element.getBoundingClientRect().top < window.innerHeight) stop(element);
        else if (!reduced.matches && !printing) {
          prepare(element, pending.get(element) ?? 0);
          observer.observe(element);
        }
      }
    };

    const onInteraction = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      for (const element of new Set([...pending.keys(), ...active.keys()])) {
        if (element.contains(event.target)) stop(element);
      }
    };
    const onAnchor = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search) {
        hashDestination(url.hash);
      }
    };
    const onHash = () => { hashDestination(location.hash); resume(); };
    const onPrint = () => { printing = true; resume(); };
    const afterPrint = () => { printing = false; resume(); };
    const onRestore = (event: PageTransitionEvent) => { if (event.persisted) resume(); };
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) if (node instanceof Element) scan(node);
      }
      for (const element of pending.keys()) if (!element.isConnected) stop(element);
      for (const element of active.keys()) if (!element.isConnected) stop(element);
    });

    scan(main);
    mutations.observe(main, { childList: true, subtree: true });
    reduced.addEventListener("change", resume);
    main.addEventListener("focusin", onInteraction);
    main.addEventListener("pointerdown", onInteraction);
    document.addEventListener("click", onAnchor, true);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    window.addEventListener("pageshow", onRestore);
    window.addEventListener("beforeprint", onPrint);
    window.addEventListener("afterprint", afterPrint);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      pending.clear();
      for (const animation of active.values()) animation.cancel();
      reduced.removeEventListener("change", resume);
      main.removeEventListener("focusin", onInteraction);
      main.removeEventListener("pointerdown", onInteraction);
      document.removeEventListener("click", onAnchor, true);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
      window.removeEventListener("pageshow", onRestore);
      window.removeEventListener("beforeprint", onPrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, [pathname]);

  return null;
}
