import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { playIntroActivation } from "../playIntroActivation";

describe("Atlas arrival lifecycle", () => {
  let enter: (entries: { isIntersecting: boolean }[]) => void;
  let svg: SVGSVGElement;
  let surface: EventTarget;
  let motion: EventTarget & { matches: boolean };
  beforeEach(() => {
    vi.useFakeTimers();
    surface = new EventTarget();
    motion = Object.assign(new EventTarget(), { matches: false });
    const attrs = new Map<string, string>();
    svg = Object.assign(new EventTarget(), {
      closest: () => surface,
      setAttribute: (key: string, value: string) => attrs.set(key, value),
      removeAttribute: (key: string) => attrs.delete(key),
      getAttribute: (key: string) => attrs.get(key) ?? null,
    }) as unknown as SVGSVGElement;
    vi.stubGlobal(
      "window",
      Object.assign(new EventTarget(), {
        location: { hash: "" },
        matchMedia: () => motion,
        setTimeout,
        clearTimeout,
        requestAnimationFrame: (callback: FrameRequestCallback) =>
          setTimeout(callback, 16),
        cancelAnimationFrame: clearTimeout,
      }),
    );
    vi.stubGlobal(
      "document",
      Object.assign(new EventTarget(), { hidden: false }),
    );
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: typeof enter) {
          enter = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });
  it("waits for visibility, runs once, and never replays on returning", () => {
    const cleanup = playIntroActivation(svg);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(32);
    expect(svg.getAttribute("data-arriving")).toBe("true");
    vi.advanceTimersByTime(2800);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    enter([{ isIntersecting: false }]);
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(32);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    cleanup?.();
  });
  it.each(["pointerdown", "wheel", "keydown", "focusin"])(
    "yields permanently to %s",
    (event) => {
      const cleanup = playIntroActivation(svg);
      enter([{ isIntersecting: true }]);
      vi.advanceTimersByTime(32);
      surface.dispatchEvent(new Event(event));
      expect(svg.getAttribute("data-arriving")).toBeNull();
      enter([{ isIntersecting: true }]);
      vi.advanceTimersByTime(32);
      expect(svg.getAttribute("data-arriving")).toBeNull();
      cleanup?.();
    },
  );
  it("yields to a node hover but not entering empty canvas", () => {
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(32);
    surface.dispatchEvent(new Event("pointerover"));
    expect(svg.getAttribute("data-arriving")).toBe("true");
    const event = new Event("pointerover");
    Object.defineProperty(event, "target", { value: { closest: () => ({}) } });
    surface.dispatchEvent(event);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    cleanup?.();
  });
  it("cancels before the measured frame and removes pending work on cleanup", () => {
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    surface.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(100);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    cleanup?.();
    expect(vi.getTimerCount()).toBe(0);
  });
  it("stops when the graph leaves the viewport", () => {
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(32);
    enter([{ isIntersecting: false }]);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    cleanup?.();
  });
  it("skips a direct node link", () => {
    window.location.hash = "#node=staging";
    expect(playIntroActivation(svg)).toBeUndefined();
    expect(svg.getAttribute("data-arriving")).toBeNull();
  });
  it("skips reduced motion and stops if the preference changes", () => {
    motion.matches = true;
    expect(playIntroActivation(svg)).toBeUndefined();
    motion.matches = false;
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(32);
    motion.matches = true;
    motion.dispatchEvent(new Event("change"));
    expect(svg.getAttribute("data-arriving")).toBeNull();
    cleanup?.();
  });
});
