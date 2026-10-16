import { introBreath } from "./introBreath";

/** Geometry and current share a clock; camera/selection state remains React-owned. */
export function playIntroActivation(svg: SVGSVGElement) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (window.location.hash.length > 1 || motion.matches) return;
  const surface = svg.closest(".cm-explorer") ?? svg;
  const viewport = svg.closest<HTMLElement>(".cm-graph-viewport");
  const edges = svg.querySelector<SVGGElement>(".cm-intro-edges");
  const nodes = [...svg.querySelectorAll<SVGGElement>(".cm-node")].map(
    (node) => {
      const point = /translate\(([-\d.]+),\s*([-\d.]+)\)/.exec(
        node.getAttribute("transform") ?? "",
      );
      return {
        node,
        x: Number(point?.[1] ?? 500),
        y: Number(point?.[2] ?? 420),
      };
    },
  );
  const lines = [...svg.querySelectorAll<SVGLineElement>(".cm-edge")];
  // Four existing long connections carry a current. Never illuminate the full mesh.
  const currents = [0, 1, 2, 3].flatMap((quadrant) => {
    const source = lines
      .filter((line) => {
        const x = Number(line.getAttribute("x2")) - 500;
        const y = Number(line.getAttribute("y2")) - 420;
        return (x >= 0 ? 1 : 0) + (y >= 0 ? 2 : 0) === quadrant;
      })
      .sort((a, b) => {
        const length = (line: SVGLineElement) =>
          Math.hypot(
            Number(line.getAttribute("x2")) - Number(line.getAttribute("x1")),
            Number(line.getAttribute("y2")) - Number(line.getAttribute("y1")),
          );
        return length(b) - length(a);
      })[0];
    if (!source || !edges) return [];
    const light = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    for (const key of ["x1", "y1", "x2", "y2"])
      light.setAttribute(key, source.getAttribute(key) ?? "0");
    light.setAttribute("pathLength", "1");
    light.setAttribute("stroke-dasharray", "0.12 1");
    light.setAttribute("stroke-opacity", "0");
    light.setAttribute("vector-effect", "non-scaling-stroke");
    light.setAttribute("aria-hidden", "true");
    light.style.cssText =
      "stroke:var(--cm-accent);stroke-width:2;stroke-linecap:round;pointer-events:none";
    edges.appendChild(light);
    return [{ light, delay: 1600 + quadrant * 260 }];
  });
  let finished = false,
    started = false,
    frame = 0;
  let horizontalLimit = 0.28,
    verticalLimit = 0.07;
  let clock = 0,
    last = 0;
  let amount = { x: 0, y: 0 };
  let settling = false,
    settleClock = 0;
  let settleFrom = { x: 0, y: 0 };
  const paint = (value: { x: number; y: number }) => {
    amount = value;
    // Anisotropic expansion gives the silhouette a soft organic stretch. This
    // transforms line endpoints only; each card receives a translation, no scale.
    viewport?.style.setProperty(
      "--cm-intro-fade",
      `${56 - Math.max(0, value.x / Math.max(0.001, horizontalLimit), value.y / Math.max(0.001, verticalLimit)) * 36}px`,
    );
    const dx = value.x,
      dy = value.y;
    const sx = 1 + dx,
      sy = 1 + dy;
    edges?.setAttribute(
      "transform",
      `matrix(${sx} 0 0 ${sy} ${500 * (1 - sx)} ${420 * (1 - sy)})`,
    );
    for (const { node, x, y } of nodes)
      node.style.translate = `${(x - 500) * dx}px ${(y - 420) * dy}px`;
  };
  const finish = () => {
    finished = true;
    window.cancelAnimationFrame(frame);
    edges?.removeAttribute("transform");
    viewport?.style.removeProperty("--cm-intro-fade");
    for (const { node } of nodes) node.style.removeProperty("translate");
    for (const { light } of currents) light.remove();
    svg.removeAttribute("data-arriving");
  };
  const yieldToInteraction = () => {
    if (finished || settling) return;
    if (!started) {
      finish();
      return;
    }
    settling = true;
    settleFrom = amount;
    settleClock = 0;
  };
  const tick = (now: number) => {
    if (finished) return;
    // Intro duration follows wall time even when rendering drops frames.
    const delta = last ? now - last : 0;
    last = now;
    clock += delta;
    if (settling) {
      settleClock += delta;
      const t = Math.min(1, settleClock / 220);
      paint({ x: settleFrom.x * (1 - t) ** 3, y: settleFrom.y * (1 - t) ** 3 });
      for (const { light } of currents)
        light.setAttribute("stroke-opacity", "0");
      if (t === 1) {
        finish();
        return;
      }
    } else {
      paint({
        x: introBreath(clock, horizontalLimit),
        y: introBreath(clock, verticalLimit, 0.0528),
      });
      for (const { light, delay } of currents) {
        const travel = (clock - delay) / 2300;
        const envelope = Math.max(
          0,
          Math.min(1, travel / 0.16, (1 - travel) / 0.2),
        );
        light.setAttribute("stroke-dashoffset", String(0.12 - travel));
        light.setAttribute("stroke-opacity", String(envelope * 0.85));
      }
      if (clock >= 5400) {
        finish();
        return;
      }
    }
    frame = window.requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      if (started) finish();
      return;
    }
    if (started || finished || document.hidden || motion.matches) return;
    started = true;
    // The fit observer gets two frames before we borrow presentation geometry.
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        if (finished) return;
        // Keep the crest inside even a width-limited phone viewport. Read layout
        // once after the fit, not during the animation loop.
        const matrix = svg.getScreenCTM?.();
        const rect = svg.getBoundingClientRect?.();
        if (matrix && rect) {
          for (const { x, y } of nodes) {
            const dx = (x - 500) * matrix.a,
              dy = (y - 420) * matrix.d;
            const cx = 500 * matrix.a + matrix.e,
              cy = 420 * matrix.d + matrix.f;
            if (Math.abs(dx) > 1)
              horizontalLimit = Math.min(
                horizontalLimit,
                ((dx > 0 ? rect.right - cx : cx - rect.left) -
                  87 * matrix.a -
                  12) /
                  Math.abs(dx) -
                  1,
              );
            if (Math.abs(dy) > 1)
              verticalLimit = Math.min(
                verticalLimit,
                (((dy > 0 ? rect.bottom - cy : cy - rect.top) -
                  28 * matrix.d -
                  20) /
                  Math.abs(dy) -
                  1) /
                  1,
              );
          }
          horizontalLimit = Math.max(0, horizontalLimit);
          verticalLimit = Math.max(0, verticalLimit);
        }
        svg.setAttribute("data-arriving", "true");
        frame = window.requestAnimationFrame(tick);
      });
    });
  });
  const visibility = () => {
    if (document.hidden) finish();
  };
  observer.observe(svg);
  surface.addEventListener("pointerdown", yieldToInteraction, true);
  surface.addEventListener("wheel", yieldToInteraction, {
    passive: true,
    capture: true,
  });
  surface.addEventListener("keydown", yieldToInteraction, true);
  surface.addEventListener("focusin", yieldToInteraction, true);
  window.addEventListener("hashchange", yieldToInteraction);
  window.addEventListener("resize", finish);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", finish);
  return () => {
    finish();
    observer.disconnect();
    surface.removeEventListener("pointerdown", yieldToInteraction, true);
    surface.removeEventListener("wheel", yieldToInteraction, true);
    surface.removeEventListener("keydown", yieldToInteraction, true);
    surface.removeEventListener("focusin", yieldToInteraction, true);
    window.removeEventListener("hashchange", yieldToInteraction);
    window.removeEventListener("resize", finish);
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", finish);
  };
}
