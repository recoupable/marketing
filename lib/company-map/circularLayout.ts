/** Keep the circular arrangement, separating labels where the arc becomes tight. */
export function circularLayout(entries: { id: string }[]) {
  const points = entries.map((n, i) => {
    const angle =
      entries.length > 60
        ? i * Math.PI * (3 - Math.sqrt(5))
        : (i / entries.length) * Math.PI * 2 - Math.PI / 2;
    const radius =
      entries.length > 60
        ? 105 * Math.sqrt(i + 1)
        : entries.length > 22 && i % 2
          ? 205
          : 320;
    return {
      id: n.id,
      x: 500 + Math.cos(angle) * radius,
      y: 420 + Math.sin(angle) * radius,
    };
  });
  for (let pass = 0; pass < 80; pass++) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i],
          b = points[j];
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const ox = 188 - Math.abs(dx),
          oy = 72 - Math.abs(dy);
        if (ox <= 0 || oy <= 0) continue;
        if (ox < oy) {
          const push = (ox / 2 + 0.1) * (dx >= 0 ? 1 : -1);
          a.x -= push;
          b.x += push;
        } else {
          const push = (oy / 2 + 0.1) * (dy >= 0 ? 1 : -1);
          a.y -= push;
          b.y += push;
        }
      }
    }
  }
  return new Map(points.map((p) => [p.id, { x: p.x, y: p.y }]));
}

/** Fit every label with padding while keeping the overview's familiar frame. */
export function layoutBounds(
  positions: Map<string, { x: number; y: number }>,
  viewportHeight = 580,
) {
  const points = [...positions.values()];
  const x = Math.min(0, ...points.map((p) => p.x - 110));
  const y = Math.min(0, ...points.map((p) => p.y - 52));
  const height = Math.max(840, ...points.map((p) => p.y + 52)) - y;
  // Match the 56px fades plus a small allowance for idle drift.
  const verticalPadding = (height * 62) / Math.max(1, viewportHeight - 124);
  return {
    x,
    y: y - verticalPadding,
    width: Math.max(1000, ...points.map((p) => p.x + 110)) - x,
    height: height + verticalPadding * 2,
  };
}
