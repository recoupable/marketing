import { siteConfig } from "../config";

/** RFC 9745 permits linking the policy before a deprecation is scheduled. */
export const deprecationPolicyLink = `<${siteConfig.url}/docs/public-website-api#versioning-and-deprecation>; rel="deprecation"; type="text/html"`;
