"""Freeze the admin key-metadata contract without reading account or key data."""
from resolve_response_schema import resolve_response_schema


def build_agent_signup_metadata_contract(accounts):
    path = '/api/admins/agent-signups'
    operation = accounts['paths'][path]['get']
    success = operation['responses']['200']['content']['application/json']
    return {
        'path': path,
        'description': operation['description'],
        'security': operation['security'],
        'parameters': operation['parameters'],
        'schemas': {
            status: resolve_response_schema(response['content']['application/json']['schema'], accounts)
            for status, response in operation['responses'].items()
        },
        'examples': {name: example['value'] for name, example in success['examples'].items()},
    }
