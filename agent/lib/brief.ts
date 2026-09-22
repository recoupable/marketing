import { defineState } from "eve/context";
export const brief = defineState("recoup.website.brief", () => ({
  goal: "",
  tools: [] as string[],
  constraints: [] as string[],
  unknowns: [] as string[],
  discovery: {
    scope: null as string | null,
    priority: null as string | null,
    currentProcess: null as string | null,
    problem: null as string | null,
    workload: null as string | null,
    successMeasure: null as string | null,
  },
  setup: {
    aiUsage: null as string | null,
    aiTools: null as string[] | null,
    dataSources: null as string[] | null,
    previousAttempts: null as string | null,
    pilotOwner: null as string | null,
    accessConstraints: null as string | null,
  },
}));
