"use client";

import { useEffect, useState } from "react";

/**
 * Whole seconds elapsed since mount, ticking once per second. Mount the
 * consuming component when the work starts (e.g. the valuation progress line)
 * so the ticker starts at 0 with the run.
 */
export function useElapsedSeconds(): number {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return elapsed;
}
