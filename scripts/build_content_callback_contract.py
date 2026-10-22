"""Freeze internal callback examples without calling a worker or media service."""
from resolve_response_schema import resolve_response_schema


def build_content_callback_contract(content):
    path = '/api/content-agent/callback'
    operation = content['paths'][path]['post']
    request = operation['requestBody']['content']['application/json']
    return {
        'path': path,
        'security': operation['security'],
        'requestSchema': resolve_response_schema(request['schema'], content),
        'examples': {name: example['value'] for name, example in request['examples'].items()},
        'responseSchemas': {
            status: resolve_response_schema(response['content']['application/json']['schema'], content)
            for status, response in operation['responses'].items()
        },
        'responseExamples': {
            status: {name: example['value'] for name, example in response['content']['application/json']['examples'].items()}
            for status, response in operation['responses'].items()
        },
        'responseHeaders': {
            status: response.get('headers', {})
            for status, response in operation['responses'].items()
        },
    }
