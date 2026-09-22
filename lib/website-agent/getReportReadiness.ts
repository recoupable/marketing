import type { z } from "zod/v3";
import type { discoverySchema } from "./discovery";
import type { setupSchema } from "./setup";

/** Publishing depends on useful context, never on a fixed number of questions. */
export function getReportReadiness(brief: {
  discovery?: z.infer<typeof discoverySchema>;
  setup?: z.infer<typeof setupSchema>;
}) {
  const known = (value: string | null | undefined) =>
    !!value?.trim() &&
    !/^(?:unknown|not sure|not specified|not provided|tbd|to be confirmed|skipped|unspecified|not yet known)\b/i.test(
      value.trim(),
    );
  const missing: string[] = [];
  const discovery = brief.discovery;
  for (const [key, label] of Object.entries({
    scope: "your role and the team this report is for",
    priority: "the business outcome you want to improve",
    currentProcess: "how that work happens today",
    problem: "what is difficult or missing in that process",
    workload: "how often it happens and the approximate workload",
    successMeasure: "what a useful result would look like",
  })) {
    if (!known(discovery?.[key as keyof NonNullable<typeof discovery>]))
      missing.push(label);
  }
  const setup = brief.setup;
  if (!known(setup?.aiUsage)) missing.push("how your team currently uses AI");
  if (!setup?.aiTools || !setup.aiTools.every(known))
    missing.push(
      "the actual AI tools you use, or confirmation that there are none",
    );
  if (!setup?.dataSources?.length || !setup.dataSources.every(known))
    missing.push(
      "the actual tools or records used for this work and where they live",
    );
  if (!known(setup?.previousAttempts))
    missing.push(
      "what you have already tried, or confirmation that this is new",
    );
  if (!known(setup?.pilotOwner))
    missing.push("who could run and review a first test");
  if (!known(setup?.accessConstraints))
    missing.push("data access, time and approval constraints for that test");
  return { ready: missing.length === 0, missing };
}
