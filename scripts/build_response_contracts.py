"""Import API-owned error shapes and freeze the selected response contracts."""
import hashlib
import json

from resolve_response_schema import resolve_response_schema


SCHEMA_TARGETS = [
    ('releases.json', 'ArtistPublicProfileErrorResponse', 'ErrorResponse'),
    ('releases.json', 'TaskAuthenticationErrorResponse', 'AuthenticationErrorResponse'),
    ('releases.json', 'TaskFailureErrorResponse', 'ErrorResponse'),
    ('projects.json', 'Error', 'ErrorResponse'),
    ('projects.json', 'AuthenticationError', 'AuthenticationErrorResponse'),
    ('social.json', 'CommentsErrorResponse', 'ErrorResponse'),
    ('social.json', 'CommentsAuthenticationErrorResponse', 'AuthenticationErrorResponse'),
]
TASK_FAILURE_TARGETS = [
    ('releases.json', 'GET', '/api/tasks', 403),
    ('releases.json', 'POST', '/api/tasks', 403),
    ('releases.json', 'PATCH', '/api/tasks', 403),
    ('releases.json', 'DELETE', '/api/tasks', 403),
    ('releases.json', 'GET', '/api/tasks', 500),
    ('releases.json', 'POST', '/api/tasks', 500),
]
RESPONSE_TARGETS = [
    ('releases.json', 'GET', '/api/artists/{id}/profile', 404),
    ('projects.json', 'GET', '/api/projects/{projectId}', 401),
    ('projects.json', 'GET', '/api/projects/{projectId}', 404),
    ('research.json', 'POST', '/api/chat', 409),
    ('research.json', 'POST', '/api/chat', 500),
    ('research.json', 'POST', '/api/chat', 503),
    ('research.json', 'GET', '/api/chat/{chatId}/stream', 500),
    ('research.json', 'POST', '/api/chat/{chatId}/stop', 200),
    ('research.json', 'POST', '/api/chat/{chatId}/stop', 502),
    ('research.json', 'POST', '/api/chat/{chatId}/stop', 503),
    ('research.json', 'POST', '/api/chat/{chatId}/stop', 504),
    ('sessions.json', 'GET', '/api/sessions/{sessionId}/chats', 500),
    ('sessions.json', 'POST', '/api/sessions/{sessionId}/chats', 500),
    ('sessions.json', 'GET', '/api/sessions/{sessionId}/chats/{chatId}', 500),
    ('sessions.json', 'PATCH', '/api/sessions/{sessionId}/chats/{chatId}', 500),
    ('sessions.json', 'DELETE', '/api/sessions/{sessionId}/chats/{chatId}', 500),
    ('sessions.json', 'POST', '/api/sessions/{sessionId}/chats/{chatId}/read', 500),
    ('releases.json', 'GET', '/api/tasks', 401),
    ('releases.json', 'POST', '/api/tasks', 401),
    ('releases.json', 'PATCH', '/api/tasks', 401),
    ('releases.json', 'DELETE', '/api/tasks', 401),
] + TASK_FAILURE_TARGETS


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
        record = {
            'specification': name, 'method': method, 'path': path, 'status': status,
            'mediaType': 'application/json',
            'schema': resolve_response_schema(response['content']['application/json']['schema'], document),
        }
        if ((name, method, path, status) in TASK_FAILURE_TARGETS
                or (path, status) == ('/api/chat/{chatId}/stop', 503)):
            record['examples'] = {
                key: value['value']
                for key, value in response['content']['application/json'].get('examples', {}).items()
            }
        responses.append(record)
    return hashlib.sha256(artifact.read_bytes()).hexdigest(), responses
