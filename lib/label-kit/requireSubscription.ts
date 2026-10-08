import { z } from "zod";
import { siteConfig } from "@/lib/config";

/** Resolve identity at the API; never accept an account ID from the browser. */
export async function requireSubscription(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer "))
    throw Response.json(
      { error: "Sign in to access your plugin." },
      { status: 401 },
    );
  const read = async (path: string) => {
    const response = await fetch(`${siteConfig.apiUrl}${path}`, {
      headers: { authorization },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok)
      throw Response.json(
        {
          error:
            response.status === 401
              ? "Your sign-in expired. Please sign in again."
              : "We couldn’t verify your subscription. Please retry.",
        },
        { status: response.status === 401 ? 401 : 503 },
      );
    return response.json();
  };
  const { accountId } = z
    .object({ accountId: z.string().uuid() })
    .parse(await read("/accounts/id"));
  const subscription = z
    .object({
      status: z.string(),
      plan: z.string().nullable(),
    })
    .parse(await read(`/accounts/${accountId}/subscription`));
  if (
    subscription.status !== "active" ||
    !["starter", "pro"].includes(subscription.plan ?? "")
  )
    throw Response.json(
      {
        error:
          "An active Recoup subscription is required. If you just paid, use your checkout email and try again in a moment.",
      },
      { status: 403 },
    );
  return subscription;
}
