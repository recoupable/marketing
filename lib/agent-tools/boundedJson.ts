import { readBoundedJson } from "../http/readBoundedJson.ts";
import { RequestError } from "./RequestError.ts";

export async function boundedJson(request: Request): Promise<unknown> {
  const type = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (type !== "application/json")
    throw new RequestError(
      "UNSUPPORTED_MEDIA_TYPE",
      "Use Content-Type: application/json.",
      415,
    );
  return readBoundedJson(request, 16_384, (status) =>
    status === 413
      ? new RequestError(
          "BODY_TOO_LARGE",
          "The request must be at most 16 KB.",
          413,
        )
      : new RequestError(
          "INVALID_JSON",
          "The request body must be valid JSON.",
        ),
  );
}
