/** Decode a JSON body with an actual-byte limit and caller-owned error envelopes. */
export async function readBoundedJson(
  request: Request,
  maximum: number,
  errorForStatus: (status: number) => Error,
): Promise<unknown> {
  const length = request.headers.get("content-length");
  if (length !== null) {
    if (!/^\d+$/.test(length)) throw errorForStatus(400);
    if (Number(length) > maximum) throw errorForStatus(413);
  }
  if (!request.body) throw errorForStatus(400);
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const tooLarge = errorForStatus(413);
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maximum) {
        void reader.cancel().catch(() => undefined);
        throw tooLarge;
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body) as unknown;
  } catch (error) {
    if (error === tooLarge) throw error;
    throw errorForStatus(400);
  } finally {
    reader.releaseLock();
  }
}
