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
export function AmbientActivity(props: Props) {
  return (
    <>
      <AmbientJourney {...props} lane={0} />
      <AmbientJourney {...props} lane={1} />
    </>
  );
}

function AmbientJourney({
  svgRef,
  edges,
  positions,
  disabled,
  lane,
}: Props & { lane: number }) {
  const driftClock = useRef(0);
  const light = useRef<SVGCircleElement>(null);
  const trail = useRef<SVGLineElement>(null);
  const tailEnd = useRef<SVGLineElement>(null);
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
      if (distance <= 250 || distance >= 1200) return [];
      // These are conceptual connections, so a journey can follow either end.
      return [
        { a, b, source: edge.source, target: edge.target, distance },
        { a: b, b: a, source: edge.target, target: edge.source, distance },
      ];
    });
    if (!routes.length) return;
    const outgoing = new Map<string, number[]>();
    routes.forEach((route, index) => {
      const neighbors = outgoing.get(route.source) ?? [];
      neighbors.push(index);
      outgoing.set(route.source, neighbors);
    });
    // Sample viewport geometry only when choosing a route, never every frame.
    // Both ends must be readable so a packet does not spend its journey below the fold.
    const visibleRoutes = () => {
      const matrix = svg.getScreenCTM();
      if (!matrix) return [];
      const rect = svg.getBoundingClientRect();
      const left = Math.max(0, rect.left),
        right = Math.min(window.innerWidth, rect.right);
      const top = Math.max(0, rect.top),
        bottom = Math.min(window.innerHeight, rect.bottom);
      const onScreen = (point: Point) => {
        const x = point.x * matrix.a + point.y * matrix.c + matrix.e;
        const y = point.x * matrix.b + point.y * matrix.d + matrix.f;
        return (
          x >= left + 8 && x <= right - 8 && y >= top + 8 && y <= bottom - 8
        );
      };
      return routes.flatMap((route, index) =>
        onScreen(route.a) && onScreen(route.b) ? [index] : [],
      );
    };
    let seed = 17 + lane * 7919;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    let frame = 0;
    let visible = true;
    let pointerHeld = false;
    let focused = false;
    let quietUntil = 0;
    let lastFrame = performance.now();
    // Start mid-connection; the map itself never has an entrance sequence.
    let clock = lane === 0 ? 800 : -1200;
    let cycleStart = 0;
    let strength = 1;
    const startingRoutes = visibleRoutes();
    let route = startingRoutes.length
      ? startingRoutes[Math.floor(random() * startingRoutes.length)]
      : Math.floor(random() * routes.length);
    let remainingHops = 2;
    let visited = new Set([routes[route].source, routes[route].target]);
    let duration = 1900 + routes[route].distance * 1.1;
    let pause = 500;
    let next = -1;
    let completed = false;
    let glow: { a: Point; b: Point; started: number } | null = null;
    const hide = () => {
      light.current?.setAttribute("fill-opacity", "0");
      trail.current?.setAttribute("stroke-opacity", "0");
      tailEnd.current?.setAttribute("stroke-opacity", "0");
      afterglow.current?.setAttribute("stroke-opacity", "0");
    };
    const scheduleNext = () => {
      const visible = new Set(visibleRoutes());
      const neighbors = (outgoing.get(routes[route].target) ?? []).filter(
        (index) => visible.has(index) && !visited.has(routes[index].target),
      );
      next =
        remainingHops > 0 && neighbors.length
          ? neighbors[Math.floor(random() * neighbors.length)]
          : -1;
      pause = next >= 0 ? 360 + random() * 300 : 1000 + random() * 1200;
    };
    scheduleNext();
    const tick = (now: number) => {
      frame = 0;
      if (motion.matches || document.hidden || !visible) {
        hide();
        return;
      }
      const delta = Math.min(50, now - lastFrame);
      lastFrame = now;
      const resting = pointerHeld || focused || now < quietUntil;
      // Fade the paint, not an SVG group; group compositing breaks the dense map.
      // The logical clock stops with the handoff, then resumes the same journey.
      const target = resting ? 0 : 1;
      strength +=
        (target - strength) * (1 - Math.exp(-delta / (resting ? 90 : 420)));
      if (!resting) {
        clock += delta;
        // Freeze at the current offset during interaction, never snap to origin.
        // Retain phase through selection changes so returning to overview is continuous.
        driftClock.current += delta * strength;
        if (lane === 0)
          svg.style.translate = `${Math.sin(driftClock.current / 5500) * 2.4}px ${Math.sin(driftClock.current / 7300) * 1.4}px`;
      }
      if (clock - cycleStart >= duration + pause) {
        cycleStart = clock;
        if (next >= 0) {
          route = next;
          remainingHops--;
          visited.add(routes[route].target);
        } else {
          const visible = visibleRoutes();
          route = visible.length
            ? visible[Math.floor(random() * visible.length)]
            : route;
          remainingHops = 1 + Math.floor(random() * 3);
          visited = new Set([routes[route].source, routes[route].target]);
        }
        duration = 1900 + routes[route].distance * (0.95 + random() * 0.3);
        completed = false;
        scheduleNext();
      }
      const elapsed = clock - cycleStart;
      const { a, b } = routes[route];
      const dx = b.x - a.x,
        dy = b.y - a.y;
      // Stop at card boundaries so the signal never crosses a label.
      const inset = Math.min(87 / Math.abs(dx), 28 / Math.abs(dy));
      const progress = Math.max(0, Math.min(1, elapsed / duration));
      const at = (p: number) => ({
        x: a.x + dx * (inset + p * (1 - 2 * inset)),
        y: a.y + dy * (inset + p * (1 - 2 * inset)),
      });
      if (elapsed >= duration && !completed) {
        completed = true;
        glow = { a: at(0), b: at(1), started: clock };
      }
      if (glow) {
        afterglow.current?.setAttribute("x1", String(glow.a.x));
        afterglow.current?.setAttribute("y1", String(glow.a.y));
        afterglow.current?.setAttribute("x2", String(glow.b.x));
        afterglow.current?.setAttribute("y2", String(glow.b.y));
        afterglow.current?.setAttribute(
          "stroke-opacity",
          String(
            Math.max(0, 1 - (clock - glow.started) / 1800) ** 2 *
              0.14 *
              strength,
          ),
        );
      }
      const scale = Math.max(
        svg.viewBox.baseVal.width / Math.max(1, svg.clientWidth),
        svg.viewBox.baseVal.height / Math.max(1, svg.clientHeight),
      );
      // A short screen-space tail remains legible at overview without growing on zoom.
      const tailFraction = Math.min(
        0.45,
        (20 * scale) / (routes[route].distance * (1 - 2 * inset)),
      );
      const head = at(progress),
        middle = at(Math.max(0, progress - tailFraction * 0.45)),
        tail = at(Math.max(0, progress - tailFraction));
      // Feather both ends of travel instead of making a point wink out on arrival.
      const envelope =
        Math.max(0, Math.min(1, elapsed / 320)) *
        Math.max(0, Math.min(1, (duration - elapsed) / 260));
      light.current?.setAttribute("cx", String(head.x));
      light.current?.setAttribute("cy", String(head.y));
      light.current?.setAttribute("r", String(2.5 * scale));
      light.current?.setAttribute(
        "fill-opacity",
        String(envelope * 0.88 * strength),
      );
      trail.current?.setAttribute("x1", String(middle.x));
      trail.current?.setAttribute("y1", String(middle.y));
      trail.current?.setAttribute("x2", String(head.x));
      trail.current?.setAttribute("y2", String(head.y));
      trail.current?.setAttribute(
        "stroke-opacity",
        String(envelope * 0.58 * strength),
      );
      tailEnd.current?.setAttribute("x1", String(tail.x));
      tailEnd.current?.setAttribute("y1", String(tail.y));
      tailEnd.current?.setAttribute("x2", String(middle.x));
      tailEnd.current?.setAttribute("y2", String(middle.y));
      tailEnd.current?.setAttribute(
        "stroke-opacity",
        String(envelope * 0.24 * strength),
      );
      if (resting && strength < 0.002 && (pointerHeld || focused)) {
        hide();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const pointerDown = () => {
      pointerHeld = true;
      wake();
    };
    const pointerUp = () => {
      pointerHeld = false;
      quietUntil = performance.now() + 700;
      wake();
    };
    const focusIn = () => {
      focused = true;
      wake();
    };
    const focusOut = (event: FocusEvent) => {
      focused =
        event.relatedTarget instanceof Node &&
        svg.contains(event.relatedTarget);
      quietUntil = performance.now() + 700;
      wake();
    };
    const wheel = () => {
      quietUntil = performance.now() + 900;
      wake();
    };
    const visibilityChange = () => {
      // No catch-up burst after returning to the tab or viewport.
      hide();
      strength = 0;
      lastFrame = performance.now();
      wake();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibilityChange();
    });
    observer.observe(svg);
    svg.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointercancel", pointerUp);
    svg.addEventListener("focusin", focusIn);
    svg.addEventListener("focusout", focusOut);
    svg.addEventListener("wheel", wheel, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);
    motion.addEventListener("change", visibilityChange);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      svg.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerUp);
      svg.removeEventListener("focusin", focusIn);
      svg.removeEventListener("focusout", focusOut);
      svg.removeEventListener("wheel", wheel);
      document.removeEventListener("visibilitychange", visibilityChange);
      motion.removeEventListener("change", visibilityChange);
      hide();
    };
  }, [svgRef, edges, positions, disabled, lane]);
  return (
    <g className="cm-ambient" aria-hidden="true" pointerEvents="none">
      <line
        ref={afterglow}
        strokeOpacity="0"
        style={{ stroke: "var(--cm-accent)" }}
      />
      <line
        ref={tailEnd}
        strokeOpacity="0"
        style={{
          stroke: "var(--cm-accent)",
          strokeWidth: 1,
          strokeLinecap: "round",
        }}
      />
      <line
        ref={trail}
        strokeOpacity="0"
        style={{
          stroke: "var(--cm-accent)",
          strokeWidth: 1.8,
          strokeLinecap: "round",
        }}
      />
      <circle
        ref={light}
        fillOpacity="0"
        style={{ fill: "var(--cm-accent)" }}
      />
    </g>
  );
}
