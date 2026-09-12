import { formatResponseBody } from "./formatResponseBody";
import type { PlaygroundRequest, PlaygroundResult } from "./types";

/** Sends the request from the browser and reports the outcome as data; failures become text, never exceptions. */
export async function sendPlaygroundRequest(request: PlaygroundRequest): Promise<PlaygroundResult> {
  const started = performance.now();
  const elapsed = () => Math.round(performance.now() - started);
  try {
    const response = await fetch(request.url, { method: request.method, headers: request.headers, body: request.body });
    const { body, isJson } = formatResponseBody(await response.text());
    return { status: response.status, statusText: response.statusText, elapsedMs: elapsed(), headers: [...response.headers.entries()], body, isJson };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error), elapsedMs: elapsed() };
  }
}
