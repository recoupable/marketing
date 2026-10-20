import { checkRateLimit } from "@vercel/firewall";

const policy = {
  "RateLimit-Limit": "120",
  "RateLimit-Policy": '"recoup-public-tools";q=120;w=60',
};

/** The matching Vercel SDK rule counts per IP, per region, across these endpoints. */
export async function withAgentRateLimit(
  request: Request,
  run: () => Promise<Response>,
) {
  if (process.env.VERCEL !== "1") return run();
  let limited: boolean;
  try {
    const result = await checkRateLimit("recoup-public-tools", {
      request,
      timeout: 1500,
    });
    if (result.error === "not-found")
      throw new Error("Public quota is not configured.");
    limited = result.rateLimited;
  } catch {
    return Response.json(
      {
        error: {
          code: "UNAVAILABLE",
          message: "The public API is temporarily unavailable.",
          resolution: "Wait briefly, then retry the same request.",
        },
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
          "X-Content-Type-Options": "nosniff",
          "Retry-After": "5",
        },
      },
    );
  }
  const response = limited
    ? Response.json(
        {
          error: {
            code: "RATE_LIMITED",
            message: "The public API request limit has been reached.",
            resolution:
              "Wait 60 seconds before retrying. The limit is 120 requests per minute per IP in each serving region.",
          },
        },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
            "X-Content-Type-Options": "nosniff",
            "Retry-After": "60",
          },
        },
      )
    : await run();
  for (const [name, value] of Object.entries(policy))
    response.headers.set(name, value);
  response.headers.append(
    "Access-Control-Expose-Headers",
    "RateLimit-Limit, RateLimit-Policy, Retry-After",
  );
  return response;
}
