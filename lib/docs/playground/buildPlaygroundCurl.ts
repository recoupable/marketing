import type { PlaygroundRequest } from "./types";

const quote = (value: string) => `'${value.replace(/'/g, `'"'"'`)}'`;

function maskSecret(name: string, value: string): string {
  const lower = name.toLowerCase();
  if (lower === "authorization") return "Bearer YOUR_API_KEY";
  if (lower === "x-api-key") return "YOUR_API_KEY";
  return value;
}

/** Renders the live request as a curl command in the same layout as the reference example, with credentials masked. */
export function buildPlaygroundCurl(request: PlaygroundRequest): string {
  const lines = [`curl --request ${request.method}`, `  --url ${quote(request.url)}`];
  for (const [name, value] of Object.entries(request.headers)) lines.push(`  --header ${quote(`${name}: ${maskSecret(name, value)}`)}`);
  if (request.body !== undefined) lines.push(`  --data ${quote(request.body)}`);
  return lines.join(" \\\n");
}
