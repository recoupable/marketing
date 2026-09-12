import type { PlaygroundParam } from "./types";

/** Names of required parameters the visitor has not filled in. */
export function listMissingParams(parameters: PlaygroundParam[], values: Record<string, string>): string[] {
  return parameters.filter((param) => param.required && !values[`${param.in}:${param.name}`]?.trim()).map((param) => param.name);
}
