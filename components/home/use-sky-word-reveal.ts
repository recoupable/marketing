"use client";

import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

/** Reveal in reading order regardless of how the browser wraps the paragraph. */
export function useSkyWordReveal(container: RefObject<HTMLDivElement | null>, phase: MotionValue<number>, enabled: boolean) {
  useEffect(() => {
    const paragraph = container.current?.querySelector("p");
    if (!enabled || !paragraph) return;
    const words = Array.from(paragraph.querySelectorAll<HTMLElement>(".sky-statement-word"));
    const paint = () => {
      words.forEach((word, index) => {
        const start = index / Math.max(1, words.length - 1) * 0.85;
        const progress = Math.max(0, Math.min(1, (phase.get() - start) / 0.17));
        const eased = 1 - Math.pow(1 - progress, 3);
        word.style.opacity = String(0.35 + eased * 0.65);
        word.style.filter = `blur(${(1 - eased) * 7}px)`;
      });
    };
    const unsubscribe = phase.on("change", paint);
    paint();

    return () => {
      unsubscribe();
      words.forEach((word) => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("filter");
      });
    };
  }, [container, phase, enabled]);
}
