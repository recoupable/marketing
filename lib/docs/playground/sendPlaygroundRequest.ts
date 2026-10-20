import { formatResponseBody } from "./formatResponseBody";
import type { PlaygroundRequest, PlaygroundResult } from "./types";

const TIMEOUT_MS = 30_000;
const TEXTUAL = /json|text|xml|javascript|event-stream|markdown|csv|html|x-www-form-urlencoded/;

async function readBody(response: Response): Promise<{ body: string; isJson: boolean }> {
  const type = response.headers.get("content-type") ?? "";
  if (!type || TEXTUAL.test(type)) return formatResponseBody(await response.text());
  const bytes = (await response.arrayBuffer()).byteLength;
  return { body: `Binary response (${type.split(";")[0]}, ${bytes} bytes). Run the curl above to save it to a file.`, isJson: false };
}

/** Sends the request from the browser and reports the outcome as data; failures and timeouts become text, never exceptions. */
export async function sendPlaygroundRequest(request: PlaygroundRequest): Promise<PlaygroundResult> {
  const started = performance.now();
  const elapsed = () => Math.round(performance.now() - started);
  try {
    const response = await fetch(request.url, { method: request.method, headers: request.headers, body: request.body, signal: AbortSignal.timeout(TIMEOUT_MS) });
    const { body, isJson } = await readBody(response);
    return { status: response.status, statusText: response.statusText, elapsedMs: elapsed(), headers: [...response.headers.entries()], body, isJson };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return { error: timedOut ? `The api did not answer within ${TIMEOUT_MS / 1000} seconds.` : error instanceof Error ? error.message : String(error), elapsedMs: elapsed() };
  }
}
