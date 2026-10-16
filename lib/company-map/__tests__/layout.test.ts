import { expect, it } from "vitest";
import model from "../model.json";
import { circularLayout, layoutBounds } from "../circularLayout";
it("keeps labels separated in every domain and workflow", () => {
  const groups = [
    model.domains,
    model.nodes,
    ...model.domains.map((d) => model.nodes.filter((n) => n.domain === d.id)),
    ...model.workflows.map((w) =>
      model.nodes.filter((n) => w.nodes.includes(n.id)),
    ),
  ];
  for (const group of groups) {
    const positions = circularLayout(group);
    const bounds = layoutBounds(positions);
    const points = [...positions.values()];
    for (let i = 0; i < points.length; i++) {
      expect(points[i].x).toBeGreaterThan(bounds.x + 87);
      expect(points[i].x).toBeLessThan(bounds.x + bounds.width - 87);
      expect(points[i].y).toBeGreaterThan(bounds.y + 28);
      expect(points[i].y).toBeLessThan(bounds.y + bounds.height - 28);
      for (let j = i + 1; j < points.length; j++)
        expect(
          Math.abs(points[i].x - points[j].x) >= 174 ||
            Math.abs(points[i].y - points[j].y) >= 56,
        ).toBe(true);
    }
  }
});

it("keeps fixed-size overview cards separated at the intro inhale", () => {
  const points = [...circularLayout(model.nodes).values()];
  for (let i = 0; i < points.length; i++)
    for (let j = i + 1; j < points.length; j++)
      expect(
        Math.abs(points[i].x - points[j].x) * 0.94 >= 174 ||
          Math.abs(points[i].y - points[j].y) * (1 - 0.06 * 0.88) >= 56,
      ).toBe(true);
});
