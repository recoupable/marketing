import { eveChannel } from "eve/channels/eve";
import { readGrant } from "../../lib/website-agent/tokens";

export default eveChannel({
  auth: async (request: Request) => {
    const grant = readGrant(
      request.headers.get("x-recoup-agent-grant") ?? undefined,
      "internal",
    );
    const path = new URL(request.url).pathname;
    if (
      !grant ||
      grant.method !== request.method ||
      !path.endsWith(grant.path ?? "!")
    )
      return null;
    return {
      principalId: grant.principal,
      principalType: "user" as const,
      authenticator: "website-gateway",
      attributes: {},
    };
  },
});
