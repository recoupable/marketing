export const discoveryPaths = {
  hub: "/agents",
  catalog: "/agents/catalog.json",
  navigation: "/llms.txt",
  summaries: "/llms-full.txt",
  instructions: "/agents.md",
  openapi: "/openapi.json",
  apiCatalog: "/.well-known/api-catalog",
  ard: "/.well-known/ard.json",
} as const;
