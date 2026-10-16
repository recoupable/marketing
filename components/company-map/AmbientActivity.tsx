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
  const afterglow = useRef<SVGLineElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || disabled) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const routes = edges.flatMap((edge) => {
      const a = positions.get(edge.source),
        b = positions.get(edge.target);
      if (!a || !b) return [];
      const distance = Math.hypot(b.x - a.x, b.y - a.y);
      return distance > 250 && distance < 1200
        ? [{ a, b, source: edge.source, target: edge.target }]
        : [];
    });
    if (!routes.length) return;
    let frame = 0;
    let visible = true;
    let interacting = false;
    let resumeAt = performance.now();
    let opening = true;
    let cycleStart = resumeAt;
    let route = 0;
    let continued = false;
    let completed = false;
    let glow: { a: Point; b: Point; started: number } | null = null;
    const travelTime = () => 2200 + (route % 5) * 180;
    const continuation = () =>
      continued
        ? -1
        : routes.findIndex(
            (candidate) =>
              candidate.source === routes[route].target &&
              candidate.target !== routes[route].source,
          );
    const hide = () => {
      light.current?.setAttribute("fill-opacity", "0");
      trail.current?.setAttribute("stroke-opacity", "0");
      arrival.current?.setAttribute("stroke-opacity", "0");
      afterglow.current?.setAttribute("stroke-opacity", "0");
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
        const arrivalOffset = opening
          ? 8 * Math.pow(Math.max(0, 1 - (now - resumeAt) / 1800), 3)
          : 0;
        svg.style.translate = `${Math.sin((now - resumeAt) / 5500) * 2.4 * settle}px ${Math.sin((now - resumeAt) / 7300) * 1.4 * settle + arrivalOffset}px`;
        const next = continuation();
        const pause = next >= 0 ? 700 : 1800 + (route % 7) * 270;
        if (age >= travelTime() + pause) {
          cycleStart = now;
          route = next >= 0 ? next : (route + 37) % routes.length;
          continued = next >= 0;
          completed = false;
        }
        const elapsed = now - cycleStart;
        const duration = travelTime();
        const { a, b } = routes[route];
        const dx = b.x - a.x,
          dy = b.y - a.y;
        // Stop at card boundaries so the signal never crosses a label.
        const inset = Math.min(87 / Math.abs(dx), 28 / Math.abs(dy));
        const progress = Math.min(1, elapsed / duration);
        const at = (p: number) => ({
          x: a.x + dx * (inset + p * (1 - 2 * inset)),
          y: a.y + dy * (inset + p * (1 - 2 * inset)),
        });
        if (elapsed >= duration && !completed) {
          completed = true;
          glow = { a: at(0), b: at(1), started: cycleStart + duration };
        }
        if (glow) {
          afterglow.current?.setAttribute("x1", String(glow.a.x));
          afterglow.current?.setAttribute("y1", String(glow.a.y));
          afterglow.current?.setAttribute("x2", String(glow.b.x));
          afterglow.current?.setAttribute("y2", String(glow.b.y));
          afterglow.current?.setAttribute(
            "stroke-opacity",
            String(Math.max(0, 1 - (now - glow.started) / 1200) * 0.3),
          );
        }
        const head = at(progress),
          tail = at(Math.max(0, progress - 0.1));
        const scale = svg.viewBox.baseVal.width / Math.max(1, svg.clientWidth);
        light.current?.setAttribute("cx", String(head.x));
        light.current?.setAttribute("cy", String(head.y));
        light.current?.setAttribute("r", String(2 * scale));
        light.current?.setAttribute(
          "fill-opacity",
          elapsed < duration ? String(Math.min(0.75, elapsed / 400)) : "0",
        );
        trail.current?.setAttribute("x1", String(tail.x));
        trail.current?.setAttribute("y1", String(tail.y));
        trail.current?.setAttribute("x2", String(head.x));
        trail.current?.setAttribute("y2", String(head.y));
        trail.current?.setAttribute(
          "stroke-opacity",
          elapsed < duration ? "0.4" : "0",
        );
        arrival.current?.setAttribute("x", String(b.x - 87));
        arrival.current?.setAttribute("y", String(b.y - 28));
        arrival.current?.setAttribute(
          "stroke-opacity",
          elapsed >= duration && elapsed < duration + 700
            ? String(Math.sin(((elapsed - duration) / 700) * Math.PI) * 0.5)
            : "0",
        );
      }
      frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      opening = false;
      cancelAnimationFrame(frame);
      hide();
      resumeAt = performance.now() + 900;
      cycleStart = resumeAt;
      glow = null;
      completed = false;
      continued = false;
      frame = requestAnimationFrame(tick);
    };
    const enter = () => {
      interacting = true;
      opening = false;
      cancelAnimationFrame(frame);
      hide();
    };
    const leave = () => {
      if (!interacting) return;
      interacting = false;
      restart();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (visible !== entry.isIntersecting) {
        visible = entry.isIntersecting;
        restart();
      }
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
    // Begin partway along a connection, as if the network was already active.
    cycleStart = resumeAt - 800;
    frame = requestAnimationFrame(tick);
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
      <line ref={afterglow} strokeOpacity="0" />
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
