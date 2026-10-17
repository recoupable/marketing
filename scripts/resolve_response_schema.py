"""Resolve the selected acyclic OpenAPI response schemas without losing required fields."""


def resolve_response_schema(schema, document, visited=()):
    if isinstance(schema, list):
        return [resolve_response_schema(item, document, visited) for item in schema]
    if not isinstance(schema, dict):
        return schema
    if '$ref' in schema:
        reference = schema['$ref']
        if not reference.startswith('#/') or reference in visited:
            raise ValueError(f'Response contract requires an acyclic local reference: {reference}')
        target = document
        for segment in reference[2:].split('/'):
            target = target[segment.replace('~1', '/').replace('~0', '~')]
        return resolve_response_schema(target, document, (*visited, reference))
    return {key: resolve_response_schema(value, document, visited) for key, value in schema.items()}
