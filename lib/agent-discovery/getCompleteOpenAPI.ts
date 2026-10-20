import inventory from "../../content/docs/inventory.json";
import { websiteOpenAPI } from "../agent-openapi";
import { getDocSpec, type ApiObject } from "../docs-server";
import { siteConfig } from "../config";
import { namespaceOpenApiComponents } from "./namespaceOpenApiComponents";

/** Build one discovery document from the published, independently owned contracts. */
export async function getCompleteOpenAPI(): Promise<ApiObject> {
  const website = websiteOpenAPI();
  const sources = [
    {
      name: "website",
      url: `${siteConfig.url}/agent-api/v1`,
      document: website,
    },
    ...(await Promise.all(
      inventory.specifications.map(async (filename) => ({
        name: filename.replace(".json", ""),
        url: `${siteConfig.url}/docs/spec/${filename}`,
        document: await getDocSpec(filename),
      })),
    )),
  ];
  const document: ApiObject = {
    openapi: "3.1.0",
    info: {
      ...website.info,
      title: "Recoup API",
      description:
        "Complete discovery contract for Recoup's published platform endpoints and public website tools. Every operation declares its own server and retains its source authentication requirements. Consult the platform authentication guide when a source operation has no formal security declaration. Public website batch and v1 retirement policy apply only to the website operations; they do not grant platform access or define a platform-wide versioning policy. Smaller source specifications remain available in x-source-specifications.",
    },
    servers: website.servers,
    security: [],
    "x-api-versioning": {
      ...website["x-api-versioning"],
      scope:
        "Public website operations at https://recoupable.dev/agent-api/v1 only",
    },
    "x-source-specifications": sources.map(({ name, url }) => ({ name, url })),
    externalDocs: {
      description: "Recoup API documentation",
      url: `${siteConfig.url}/docs`,
    },
    paths: {},
    components: {},
  };
  const methods = new Set([
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "head",
    "options",
    "trace",
  ]);
  const operationIds = new Set<string>();
  for (const source of sources) {
    // Keep the existing root document's component URLs stable.
    const spec =
      source.name === "website"
        ? source.document
        : namespaceOpenApiComponents(source.document, source.name);
    for (const [kind, entries] of Object.entries(spec.components)) {
      document.components[kind] = {
        ...document.components[kind],
        ...(entries as ApiObject),
      };
    }
    for (const [path, rawItem] of Object.entries(spec.paths)) {
      if (document.paths[path])
        throw new Error(`Duplicate OpenAPI path: ${path}`);
      const item = rawItem as ApiObject;
      document.paths[path] = { ...item };
      for (const [method, operation] of Object.entries(item)) {
        if (!methods.has(method)) continue;
        const op = operation as ApiObject;
        if (!op.operationId || operationIds.has(op.operationId)) {
          throw new Error(
            `Missing or duplicate operationId: ${method} ${path}`,
          );
        }
        operationIds.add(op.operationId);
        document.paths[path][method] = {
          ...op,
          servers: op.servers ?? item.servers ?? spec.servers,
          security: op.security ?? spec.security ?? [],
          "x-source-specification": source.url,
        };
      }
    }
  }
  return document;
}
