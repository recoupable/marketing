"use client";

import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

/** Follow the browser's actual line wraps, including after fonts load or resize. */
export function useSkyLineReveal(container: RefObject<HTMLDivElement | null>, phase: MotionValue<number>, enabled: boolean) {
  useEffect(() => {
    const paragraph = container.current?.querySelector("p");
    if (!enabled || !paragraph) return;
    const words = Array.from(paragraph.querySelectorAll<HTMLElement>(".sky-statement-word"));
    let lines: HTMLElement[][] = [];
    let disposed = false;

    const paint = () => {
      lines.forEach((line, index) => {
        const start = index / Math.max(1, lines.length - 1) * 0.7;
        const progress = Math.max(0, Math.min(1, (phase.get() - start) / 0.32));
        const eased = 1 - Math.pow(1 - progress, 3);
        line.forEach((word) => {
          word.style.opacity = String(0.18 + eased * 0.82);
          word.style.filter = `blur(${(1 - eased) * 7}px)`;
        });
      });
    };
    const measure = () => {
      if (disposed) return;
      lines = [];
      let previousTop = -Infinity;
      // Read layout only when wrapping changes, never on each scroll frame.
      const tops = words.map((word) => word.offsetTop);
      words.forEach((word, index) => {
        if (Math.abs(tops[index] - previousTop) > 2) lines.push([]);
        lines[lines.length - 1].push(word);
        previousTop = tops[index];
      });
      paint();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(paragraph);
    document.fonts.ready.then(measure);
    const unsubscribe = phase.on("change", paint);
    measure();

    return () => {
      disposed = true;
      observer.disconnect();
      unsubscribe();
      words.forEach((word) => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("filter");
      });
    };
  }, [container, phase, enabled]);
}
