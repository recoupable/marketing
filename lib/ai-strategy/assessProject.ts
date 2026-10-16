import type { StrategyInput } from "./strategySchema";
import { aiStrategyCopy } from "../copy/ai-strategy";

/** A project needs specific evidence; enthusiasm cannot offset missing access. */
export function assessProject(input: StrategyInput) {
  // Show every missing prerequisite so the owner can prepare the whole test.
  const gaps = (["access", "example", "review", "baseline"] as const)
    .filter((key) => input[key] !== "yes")
    .map((key) => aiStrategyCopy.prerequisiteMessages[key]);
  return { ready: gaps.length === 0, gaps };
}
