import { aiStrategyCopy } from "../copy/ai-strategy";

/** Only known example IDs can prefill an inquiry; URL text is never a brief. */
export function getStrategyProject(id: unknown) {
  if (typeof id !== "string") return undefined;
  return aiStrategyCopy.projects.find((project) => project.id === id);
}
