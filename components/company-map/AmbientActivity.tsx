"use client";

import { useEffect, useRef, type RefObject } from "react";

type Point = { x: number; y: number };
type Props = {
  svgRef: RefObject<SVGSVGElement | null>;
  edges: { source: string; target: string }[];
  positions: Map<string, Point>;
  disabled: boolean;
};

/** Decorative signals only: no live activity or business status is implied. */
export function AmbientActivity({ svgRef, edges, positions, disabled }: Props) {
  const light = useRef<SVGCircleElement>(null);
  const trail = useRef<SVGLineElement>(null);
  const arrival = useRef<SVGRectElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || disabled) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const routes = edges.flatMap((edge) => {
      const a = positions.get(edge.source),
        b = positions.get(edge.target);
      if (!a || !b) return [];
      const distance = Math.hypot(b.x - a.x, b.y - a.y);
      return distance > 250 && distance < 1200 ? [{ a, b }] : [];
    });
    if (!routes.length) return;
    let frame = 0;
    let visible = true;
    let interacting = false;
    let resumeAt = performance.now() + 900;
    let cycleStart = resumeAt;
    let route = 0;
    const hide = () => {
      light.current?.setAttribute("fill-opacity", "0");
      trail.current?.setAttribute("stroke-opacity", "0");
      arrival.current?.setAttribute("stroke-opacity", "0");
      svg.style.translate = "";
    };
    const tick = (now: number) => {
      frame = 0;
      if (motion.matches || document.hidden || !visible || interacting) {
        hide();
        return;
      }
      if (now >= resumeAt) {
        const age = now - cycleStart;
        // A pixel-sized drift, measured in screen pixels rather than graph units.
        const settle = Math.min(1, (now - resumeAt) / 2000);
        svg.style.translate = `${Math.sin((now - resumeAt) / 5500) * 2.4 * settle}px ${Math.sin((now - resumeAt) / 7300) * 1.4 * settle}px`;
        if (age >= 5200) {
          cycleStart = now;
          route = (route + 37) % routes.length;
        }
        const elapsed = now - cycleStart;
        const { a, b } = routes[route];
        const dx = b.x - a.x,
          dy = b.y - a.y;
        // Stop at card boundaries so the signal never crosses a label.
        const inset = Math.min(87 / Math.abs(dx), 28 / Math.abs(dy));
        const progress = Math.min(1, elapsed / 2800);
        const at = (p: number) => ({
          x: a.x + dx * (inset + p * (1 - 2 * inset)),
          y: a.y + dy * (inset + p * (1 - 2 * inset)),
        });
        const head = at(progress),
          tail = at(Math.max(0, progress - 0.1));
        const scale = svg.viewBox.baseVal.width / Math.max(1, svg.clientWidth);
        light.current?.setAttribute("cx", String(head.x));
        light.current?.setAttribute("cy", String(head.y));
        light.current?.setAttribute("r", String(2 * scale));
        light.current?.setAttribute(
          "fill-opacity",
          elapsed < 2800 ? String(Math.min(0.75, elapsed / 400)) : "0",
        );
        trail.current?.setAttribute("x1", String(tail.x));
        trail.current?.setAttribute("y1", String(tail.y));
        trail.current?.setAttribute("x2", String(head.x));
        trail.current?.setAttribute("y2", String(head.y));
        trail.current?.setAttribute(
          "stroke-opacity",
          elapsed < 2800 ? "0.4" : "0",
        );
        arrival.current?.setAttribute("x", String(b.x - 87));
        arrival.current?.setAttribute("y", String(b.y - 28));
        arrival.current?.setAttribute(
          "stroke-opacity",
          elapsed >= 2800 && elapsed < 3500
            ? String(Math.sin(((elapsed - 2800) / 700) * Math.PI) * 0.5)
            : "0",
        );
      }
      frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      hide();
      resumeAt = performance.now() + 900;
      cycleStart = resumeAt;
      frame = requestAnimationFrame(tick);
    };
    const enter = () => {
      interacting = true;
      cancelAnimationFrame(frame);
      hide();
    };
    const leave = () => {
      if (!interacting) return;
      interacting = false;
      restart();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    observer.observe(svg);
    svg.addEventListener("pointerdown", enter);
    window.addEventListener("pointerup", leave);
    window.addEventListener("pointercancel", leave);
    svg.addEventListener("focusin", enter);
    svg.addEventListener("focusout", leave);
    svg.addEventListener("wheel", restart, { passive: true });
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    restart();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      svg.removeEventListener("pointerdown", enter);
      window.removeEventListener("pointerup", leave);
    window.removeEventListener("pointercancel", leave);
      svg.removeEventListener("focusin", enter);
      svg.removeEventListener("focusout", leave);
      svg.removeEventListener("wheel", restart);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
      hide();
    };
  }, [svgRef, edges, positions, disabled]);
  return (
    <g className="cm-ambient" aria-hidden="true" pointerEvents="none">
      <line ref={trail} strokeOpacity="0" />
      <circle ref={light} fillOpacity="0" />
      <rect
        ref={arrival}
        width="174"
        height="56"
        rx="12"
        fill="none"
        strokeOpacity="0"
      />
    </g>
  );
}
