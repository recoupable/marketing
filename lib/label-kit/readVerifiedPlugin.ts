import { createHash } from "node:crypto";
import release from "@/content/label-kit/release.json";

/** Verify the pinned release before sending any bytes to a buyer. */
export async function readVerifiedPlugin(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8 * 1024 * 1024)
        throw new Error("Plugin archive exceeds delivery limit");
      chunks.push(value);
    }
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  } finally {
    reader.releaseLock();
  }
  const bytes = Buffer.concat(chunks, size);
  if (createHash("sha256").update(bytes).digest("hex") !== release.sha256)
    throw new Error("Plugin archive does not match the pinned release");
  return bytes;
}
