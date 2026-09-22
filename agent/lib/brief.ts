import { defineState } from "eve/context";
export const brief = defineState("recoup.website.brief", () => ({
  goal: "",
  tools: [] as string[],
  constraints: [] as string[],
  unknowns: [] as string[],
  setup: {
    aiUsage: null as string | null,
    aiTools: null as string[] | null,
    dataSources: null as string[] | null,
    previousAttempts: null as string | null,
    pilotOwner: null as string | null,
    accessConstraints: null as string | null,
  },
}));
