"use client";

import { useEffect, type RefObject } from "react";
import { playIntroActivation } from "@/lib/company-map/playIntroActivation";

export function IntroActivation({
  svgRef,
}: {
  svgRef: RefObject<SVGSVGElement | null>;
}) {
  useEffect(() => {
    if (svgRef.current) return playIntroActivation(svgRef.current);
  }, [svgRef]);
  return null;
}
