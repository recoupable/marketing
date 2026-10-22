"""Freeze task HTTP validation errors without executing a schedule or service."""
from resolve_response_schema import resolve_response_schema


def build_task_validation_contract(releases):
    path = '/api/tasks'
    responses = {}
    for method in ['post', 'patch']:
        content = releases['paths'][path][method]['responses']['400']['content']['application/json']
        responses[method.upper()] = {
            'schema': resolve_response_schema(content['schema'], releases),
            'examples': {name: example['value'] for name, example in content.get('examples', {}).items()},
        }
    return {'path': path, 'responses': responses}
