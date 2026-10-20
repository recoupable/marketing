import { RequestError } from "./RequestError.ts";

export async function boundedJson(request: Request) {
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    throw new RequestError(
      "UNSUPPORTED_MEDIA_TYPE",
      "Use Content-Type: application/json.",
      415,
    );
  const maximum = 16_384;
  if (Number(request.headers.get("content-length")) > maximum)
    throw new RequestError(
      "BODY_TOO_LARGE",
      "The request must be at most 16 KB.",
      413,
    );
  if (!request.body)
    throw new RequestError("INVALID_JSON", "A JSON request body is required.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) {
        await reader.cancel();
        throw new RequestError(
          "BODY_TOO_LARGE",
          "The request must be at most 16 KB.",
          413,
        );
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new RequestError(
      "INVALID_JSON",
      "The request body must be valid JSON.",
    );
  }
}
