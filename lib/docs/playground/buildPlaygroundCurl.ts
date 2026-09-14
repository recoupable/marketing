import type { PlaygroundRequest } from "./types";

const quote = (value: string) => `'${value.replace(/'/g, `'"'"'`)}'`;

/** Renders the live request as a curl command in the same layout as the reference example, with the credential header masked. */
export function buildPlaygroundCurl(request: PlaygroundRequest): string {
  const lines = [`curl --request ${request.method}`, `  --url ${quote(request.url)}`];
  for (const [name, value] of Object.entries(request.headers)) {
    const secret = request.secretHeader !== undefined && name.toLowerCase() === request.secretHeader.toLowerCase();
    const shown = secret ? (value.startsWith("Bearer ") ? "Bearer YOUR_API_KEY" : "YOUR_API_KEY") : value;
    lines.push(`  --header ${quote(`${name}: ${shown}`)}`);
  }
  for (const [name, value] of request.form ?? []) lines.push(`  --form ${quote(`${name}=${value}`)}`);
  if (request.body !== undefined) lines.push(`  --data ${quote(request.body)}`);
  return lines.join(" \\\n");
}
