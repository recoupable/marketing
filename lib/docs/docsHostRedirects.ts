import type { NextConfig } from "next";
import { siteConfig } from "../config.ts";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

const has = [{ type: "host" as const, value: "docs.recoupable.dev" }];
const to = (path: string) => `${siteConfig.url}${path}`;

// docs.recoupable.dev points at this project; every Mintlify path has the same
// slug under /docs, and the llms files live at the site root. Specific rules first.
export const docsHostRedirects: Redirect[] = [
  { source: "/", has, destination: to(siteConfig.docsPath), permanent: true },
  { source: "/llms.txt", has, destination: to("/llms.txt"), permanent: true },
  { source: "/llms-full.txt", has, destination: to("/llms-full.txt"), permanent: true },
  { source: "/:path*", has, destination: to(`${siteConfig.docsPath}/:path*`), permanent: true },
];
