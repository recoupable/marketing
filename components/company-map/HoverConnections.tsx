"use client";

import { useEffect, useState, type RefObject } from "react";

type Props = {
  svgRef: RefObject<SVGSVGElement | null>;
  edges: { id: string; source: string; target: string }[];
  positions: Map<string, { x: number; y: number }>;
  disabled: boolean;
};

/** Hover updates this small decorative layer, never the underlying graph. */
export function HoverConnections({
  svgRef,
  edges,
  positions,
  disabled,
}: Props) {
  const [nodeId, setNodeId] = useState("");
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || disabled) return;
    const identify = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest("[data-node-id]")?.getAttribute("data-node-id") || ""
        : "";
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.buttons) return;
      setNodeId(identify(event.target));
    };
    const leave = (event: PointerEvent) =>
      setNodeId(identify(event.relatedTarget));
    const clear = () => setNodeId("");
    const focus = (event: FocusEvent) => setNodeId(identify(event.target));
    const blur = (event: FocusEvent) =>
      setNodeId(identify(event.relatedTarget));
    svg.addEventListener("pointerover", enter);
    svg.addEventListener("pointerout", leave);
    svg.addEventListener("pointerleave", clear);
    svg.addEventListener("pointerdown", clear);
    svg.addEventListener("focusin", focus);
    svg.addEventListener("focusout", blur);
    return () => {
      svg.removeEventListener("pointerover", enter);
      svg.removeEventListener("pointerout", leave);
      svg.removeEventListener("pointerleave", clear);
      svg.removeEventListener("pointerdown", clear);
      svg.removeEventListener("focusin", focus);
      svg.removeEventListener("focusout", blur);
    };
  }, [svgRef, disabled]);
  if (!nodeId || disabled) return null;
  return (
    <g
      key={nodeId}
      className="cm-hover-connections"
      aria-hidden="true"
      pointerEvents="none"
    >
      {edges
        .filter((edge) => edge.source === nodeId || edge.target === nodeId)
        .map((edge) => {
          const a = positions.get(edge.source);
          const b = positions.get(edge.target);
          if (!a || !b) return null;
          return <line key={edge.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
    </g>
  );
}
