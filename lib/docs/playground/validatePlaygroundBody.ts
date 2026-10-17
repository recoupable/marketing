import type { PlaygroundBody } from "./types";

/** Explains why the body editor cannot be sent as is, or null when it can. */
export function validatePlaygroundBody(body: Pick<PlaygroundBody, "contentType" | "required">, text: string): string | null {
  if (!text.trim()) return body.required ? "This operation needs a request body." : null;
  if (body.contentType !== "application/json") return null;
  try {
    JSON.parse(text);
    return null;
  } catch (error) {
    return `Request body is not valid JSON: ${error instanceof Error ? error.message : String(error)}`;
  }
}
