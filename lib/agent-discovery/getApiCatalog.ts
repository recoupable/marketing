import inventory from "../../content/docs/inventory.json" with { type: "json" };
import { absoluteUrl } from "../seo.ts";
import { discoveryPaths } from "./discoveryPaths.ts";

export function getApiCatalog() {
  return {
    linkset: [
      {
        anchor: absoluteUrl(discoveryPaths.apiCatalog),
        item: [
          {
            href: absoluteUrl(discoveryPaths.openapi),
            type: "application/json",
            title: "Recoup website API: public reading and utilities",
          },
          ...inventory.specifications.map((name) => ({
            href: absoluteUrl(`/docs/spec/${name}`),
            type: "application/json",
            title: `Recoup platform API: ${name.replace(".json", "")}`,
          })),
        ],
      },
      {
        anchor: absoluteUrl("/agent-api/v1/tools"),
        "service-desc": [
          {
            href: absoluteUrl(discoveryPaths.openapi),
            type: "application/json",
          },
        ],
        "service-doc": [
          { href: absoluteUrl(discoveryPaths.hub), type: "text/html" },
        ],
        "service-meta": [
          {
            href: absoluteUrl(discoveryPaths.catalog),
            type: "application/json",
          },
        ],
      },
      {
        anchor: "https://api.recoupable.dev/api",
        "service-desc": inventory.specifications.map((name) => ({
          href: absoluteUrl(`/docs/spec/${name}`),
          type: "application/json",
        })),
        "service-doc": [
          { href: absoluteUrl("/docs"), type: "text/html" },
          { href: absoluteUrl("/docs/authentication"), type: "text/html" },
        ],
        "terms-of-service": [
          { href: absoluteUrl("/terms"), type: "text/html" },
        ],
        "privacy-policy": [
          { href: absoluteUrl("/privacy"), type: "text/html" },
        ],
      },
    ],
  };
}
