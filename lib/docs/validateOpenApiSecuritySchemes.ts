interface SecuritySpecification {
  security?: Record<string, string[]>[];
  components?: { securitySchemes?: Record<string, unknown> };
  paths?: Record<string, Record<string, unknown>>;
}

/** Return unresolved authentication scheme names at OpenAPI security locations. */
export function validateOpenApiSecuritySchemes(
  spec: SecuritySpecification,
): string[] {
  const declared = spec.components?.securitySchemes ?? {};
  const locations = [{ name: "root", security: spec.security ?? [] }];
  for (const [route, methods] of Object.entries(spec.paths ?? {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!/^(get|post|put|patch|delete|head|options|trace)$/.test(method))
        continue;
      const security =
        (operation as { security?: Record<string, string[]>[] }).security ?? [];
      locations.push({ name: `${method.toUpperCase()} ${route}`, security });
    }
  }
  return locations.flatMap(({ name, security }) =>
    security.flatMap((requirement) =>
      Object.keys(requirement)
        .filter((scheme) => !Object.hasOwn(declared, scheme))
        .map((scheme) => `${name}: undefined security scheme ${scheme}`),
    ),
  );
}
