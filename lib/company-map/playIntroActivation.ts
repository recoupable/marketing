/** Paint-only arrival; interaction owns the canvas immediately. */
export function playIntroActivation(svg: SVGSVGElement) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Deep links should arrive directly at their requested state.
  if (window.location.hash.length > 1 || motion.matches) return;
  const surface = svg.closest(".cm-explorer") ?? svg;
  let finished = false;
  let started = false;
  let timer = 0;
  let frame = 0;
  const finish = () => {
    finished = true;
    window.clearTimeout(timer);
    window.cancelAnimationFrame(frame);
    svg.removeAttribute("data-arriving");
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      if (started) finish();
      return;
    }
    if (started || finished || document.hidden || motion.matches) return;
    started = true;
    // Let the first ResizeObserver fit reach the screen before painting the breath.
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        if (finished) return;
        svg.setAttribute("data-arriving", "true");
        timer = window.setTimeout(finish, 2800);
      });
    });
  });
  const visibility = () => {
    if (document.hidden) finish();
  };
  const hoverNode = (event: Event) => {
    if ((event.target as Element | null)?.closest?.(".cm-node")) finish();
  };
  observer.observe(svg);
  // Capture runs before the graph's selection/zoom handlers, so their paint wins.
  surface.addEventListener("pointerover", hoverNode, true);
  surface.addEventListener("pointerdown", finish, true);
  surface.addEventListener("wheel", finish, { passive: true, capture: true });
  surface.addEventListener("keydown", finish, true);
  surface.addEventListener("focusin", finish, true);
  window.addEventListener("hashchange", finish);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", finish);
  return () => {
    finish();
    observer.disconnect();
    surface.removeEventListener("pointerover", hoverNode, true);
    surface.removeEventListener("pointerdown", finish, true);
    surface.removeEventListener("wheel", finish, true);
    surface.removeEventListener("keydown", finish, true);
    surface.removeEventListener("focusin", finish, true);
    window.removeEventListener("hashchange", finish);
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", finish);
  };
}
