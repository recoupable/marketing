import { discoveryHeaders } from "./discoveryHeaders.ts";

export function discoveryOptions() {
  return new Response(null, {
    status: 204,
    headers: discoveryHeaders("text/plain; charset=utf-8"),
  });
}
