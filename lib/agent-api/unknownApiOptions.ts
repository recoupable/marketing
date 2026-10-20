import { agentOptions } from "../agent-http.ts";

export function unknownApiOptions() {
  const response = agentOptions();
  response.headers.set("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
  return response;
}
