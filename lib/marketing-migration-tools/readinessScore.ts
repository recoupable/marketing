import { readinessGates } from "./readinessGates.ts";

/** How many of the three readiness gates passed (0-3); an analytics label, never shown to the visitor. */
export function readinessScore(answers: Record<string, string>): number {
  return Object.values(readinessGates(answers)).filter((needsWork) => !needsWork).length;
}
