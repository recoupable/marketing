import { siteConfig } from "./config.ts";

/** A page on the documentation site (docs.recoupable.dev); `path` starts with "/" or is empty for the docs home. */
export function docsUrl(path = ""): string {
  return `${siteConfig.docsUrl}${path}`;
}
