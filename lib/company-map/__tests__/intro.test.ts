import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { introBreath } from "../introBreath";
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
      closest: (selector: string) =>
        selector === ".cm-explorer" ? surface : null,
      querySelector: () => null,
      querySelectorAll: () => [],
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
          setTimeout(() => callback(Date.now()), 16),
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
    vi.advanceTimersByTime(5500);
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
      vi.advanceTimersByTime(260);
      expect(svg.getAttribute("data-arriving")).toBeNull();
      enter([{ isIntersecting: true }]);
      vi.advanceTimersByTime(32);
      expect(svg.getAttribute("data-arriving")).toBeNull();
      cleanup?.();
    },
  );
  it("has an obvious inhale, expansive crest, and exact resting endpoint", () => {
    expect(introBreath(0)).toBeCloseTo(0);
    expect(introBreath(1100)).toBeCloseTo(-0.06);
    expect(introBreath(3200)).toBeCloseTo(0.12);
    expect(introBreath(5400)).toBe(0);
    expect(introBreath(8000)).toBe(0);
  });
  it("cancels before the measured frame and removes pending work on cleanup", () => {
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    surface.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(300);
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
  it("keeps edge endpoints attached to fixed-size translated cards and releases geometry", () => {
    const attributes = new Map<string, string>();
    const edgeGroup = {
      setAttribute: (key: string, value: string) => attributes.set(key, value),
      removeAttribute: (key: string) => attributes.delete(key),
    };
    const style = {
      translate: "",
      removeProperty: () => {
        style.translate = "";
      },
    };
    const node = { getAttribute: () => "translate(700,620)", style };
    Object.assign(svg, {
      querySelector: () => edgeGroup,
      querySelectorAll: (selector: string) =>
        selector === ".cm-node" ? [node] : [],
    });
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(1000);
    const matrix = attributes
      .get("transform")!
      .slice(7, -1)
      .split(" ")
      .map(Number);
    const [dx, dy] = style.translate.split(" ").map(parseFloat);
    expect(700 * matrix[0] + matrix[4]).toBeCloseTo(700 + dx);
    expect(620 * matrix[3] + matrix[5]).toBeCloseTo(620 + dy);
    expect(dx).toBeLessThan(-8);
    vi.advanceTimersByTime(2250);
    const crest = attributes
      .get("transform")!
      .slice(7, -1)
      .split(" ")
      .map(Number);
    expect(crest[0]).toBeGreaterThan(1.27);
    expect(crest[3]).toBeGreaterThan(1.06);
    expect(crest[3]).toBeLessThan(1.08);
    // Only translation is applied, leaving the 174x56 label dimensions intact.
    expect(Object.keys(style)).not.toContain("scale");
    cleanup?.();
    expect(attributes.has("transform")).toBe(false);
    expect(style.translate).toBe("");
    expect(vi.getTimerCount()).toBe(0);
  });
  it("finishes on wall time even when animation frames arrive slowly", () => {
    window.requestAnimationFrame = (callback) =>
      window.setTimeout(() => callback(Date.now()), 1000);
    const cleanup = playIntroActivation(svg);
    enter([{ isIntersecting: true }]);
    vi.advanceTimersByTime(3000);
    expect(svg.getAttribute("data-arriving")).toBe("true");
    vi.advanceTimersByTime(6000);
    expect(svg.getAttribute("data-arriving")).toBeNull();
    cleanup?.();
    expect(vi.getTimerCount()).toBe(0);
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
