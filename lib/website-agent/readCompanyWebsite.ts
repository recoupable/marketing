import { extractCompanyPage } from "./extractCompanyPage";
import { WebsiteReadError } from "./WebsiteReadError";
import { lookup } from "node:dns/promises";
import { request } from "node:https";

/** Read public HTTPS pages with a pinned public IPv4 address, including redirects. */
export async function readCompanyWebsite(
  input: string,
  redirects = 0,
): Promise<ReturnType<typeof extractCompanyPage>> {
  const url = new URL(input.includes("://") ? input : `https://${input}`);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443")
  ) {
    throw new Error("Use a public HTTPS website address.");
  }
  const addresses = await lookup(url.hostname, { family: 4, all: true });
  const isPublic = (address: string) => {
    const [a, b] = address.split(".").map(Number);
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && (b === 168 || b === 0)) ||
      (a === 198 && (b === 18 || b === 19 || b === 51)) ||
      (a === 203 && b === 0)
    );
  };
  if (
    !addresses.length ||
    addresses.some(({ address }) => !isPublic(address))
  ) {
    throw new Error("Use a public company website.");
  }
  const result = await new Promise<{ location?: string; body: string }>(
    (resolve, reject) => {
      const req = request(
        url,
        {
          method: "GET",
          family: 4,
          headers: {
            "User-Agent": "RecoupWebsiteAssistant/1.0",
            Accept: "text/html,text/plain",
            "Accept-Encoding": "identity",
          },
          lookup: (_hostname, _options, callback) =>
            callback(null, addresses[0].address, 4),
        },
        (res) => {
          if (
            res.statusCode &&
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            res.resume();
            resolve({ location: res.headers.location, body: "" });
            return;
          }
          if (res.statusCode !== 200) {
            res.resume();
            reject(new WebsiteReadError("http", res.statusCode));
            return;
          }
          if (!/text\/(html|plain)/i.test(res.headers["content-type"] || "")) {
            res.resume();
            reject(new WebsiteReadError("unsupported"));
            return;
          }
          const chunks: Buffer[] = [];
          let size = 0;
          res.on("data", (chunk: Buffer) => {
            size += chunk.length;
            if (size > 1_000_000)
              req.destroy(new WebsiteReadError("too_large"));
            else chunks.push(chunk);
          });
          res.on("error", reject);
          res.on("end", () =>
            resolve({ body: Buffer.concat(chunks).toString("utf8") }),
          );
        },
      );
      const timer = setTimeout(
        () => req.destroy(new WebsiteReadError("timeout")),
        10000,
      );
      req.on("close", () => clearTimeout(timer));
      req.on("error", reject);
      req.end();
    },
  );
  if (result.location) {
    if (redirects >= 3) throw new WebsiteReadError("redirects");
    return readCompanyWebsite(
      new URL(result.location, url).href,
      redirects + 1,
    );
  }
  const page = extractCompanyPage(result.body, url.href);
  if (page.text.length < 80) throw new WebsiteReadError("empty");
  return page;
}
