"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { playIntroActivation } from "@/lib/company-map/playIntroActivation";

export function IntroActivation({
  svgRef,
  positions,
}: {
  svgRef: RefObject<SVGSVGElement | null>;
  positions: Map<string, { x: number; y: number }>;
}) {
  const initialPositions = useRef(positions);
  useLayoutEffect(() => {
    if (positions !== initialPositions.current || !svgRef.current) return;
    // A new selection/filter can replace geometry. Release the previous snapshot
    // before paint, and never replay the arrival on a later layout.
    return playIntroActivation(svgRef.current);
  }, [svgRef, positions]);
  return null;
}
