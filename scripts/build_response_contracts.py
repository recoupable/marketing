"""Import API-owned error shapes and freeze the selected response contracts."""
import hashlib
import json

from resolve_response_schema import resolve_response_schema


SCHEMA_TARGETS = [
    ('releases.json', 'ArtistPublicProfileErrorResponse', 'ErrorResponse'),
    ('projects.json', 'Error', 'ErrorResponse'),
    ('projects.json', 'AuthenticationError', 'AuthenticationErrorResponse'),
    ('social.json', 'CommentsErrorResponse', 'ErrorResponse'),
    ('social.json', 'CommentsAuthenticationErrorResponse', 'AuthenticationErrorResponse'),
]
RESPONSE_TARGETS = [
    ('releases.json', 'GET', '/api/artists/{id}/profile', 404),
    ('projects.json', 'GET', '/api/projects/{projectId}', 401),
    ('projects.json', 'GET', '/api/projects/{projectId}', 404),
    ('research.json', 'POST', '/api/chat', 409),
    ('research.json', 'POST', '/api/chat', 500),
    ('research.json', 'POST', '/api/chat', 503),
    ('research.json', 'GET', '/api/chat/{chatId}/stream', 500),
    ('research.json', 'GET', '/api/chat/{chatId}/stream', 502),
    ('sessions.json', 'GET', '/api/sessions/{sessionId}/chats', 500),
    ('sessions.json', 'POST', '/api/sessions/{sessionId}/chats', 500),
    ('sessions.json', 'GET', '/api/sessions/{sessionId}/chats/{chatId}', 500),
    ('sessions.json', 'PATCH', '/api/sessions/{sessionId}/chats/{chatId}', 500),
    ('sessions.json', 'DELETE', '/api/sessions/{sessionId}/chats/{chatId}', 500),
    ('sessions.json', 'POST', '/api/sessions/{sessionId}/chats/{chatId}/read', 500),
]


def build_response_contracts(specs, source, api, check=False):
    artifact = api / 'lib/contracts/generated/error-responses.json'
    producer_schemas = json.loads(artifact.read_text())
    changed = set()
    for name, component, producer in SCHEMA_TARGETS:
        expected = producer_schemas[producer]
        if specs[name]['components']['schemas'].get(component) != expected:
            if check:
                raise SystemExit(f'API-owned response schema is stale: {name} {component}')
            specs[name]['components']['schemas'][component] = expected
            changed.add(name)

    for path, methods in specs['projects.json']['paths'].items():
        for method, operation in methods.items():
            if method not in {'get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'}:
                continue
            for status, response in operation.get('responses', {}).items():
                if status not in ('400', '401', '404', '500'):
                    continue
                component = 'AuthenticationError' if status == '401' else 'Error'
                expected = {'$ref': '#/components/schemas/' + component}
                content = response['content']['application/json']
                if content['schema'] != expected:
                    if check:
                        raise SystemExit(f'Projects response schema reference is stale: {method.upper()} {path} {status}')
                    content['schema'] = expected
                    changed.add('projects.json')

    for name in sorted(changed):
        path = source / name
        ascii_source = path.read_text().isascii()
        path.write_text(json.dumps(specs[name], indent=2, ensure_ascii=ascii_source) + '\n')

    responses = []
    for name, method, path, status in RESPONSE_TARGETS:
        document = specs[name]
        response = document['paths'][path][method.lower()]['responses'][str(status)]
        responses.append({
            'specification': name, 'method': method, 'path': path, 'status': status,
            'mediaType': 'application/json',
            'schema': resolve_response_schema(response['content']['application/json']['schema'], document),
        })
    return hashlib.sha256(artifact.read_bytes()).hexdigest(), responses
