"""Freeze guarded-file examples and resolved responses without accessing services."""
from resolve_response_schema import resolve_response_schema


def build_guarded_file_contract(document):
    content = document['components']['schemas']
    file_read = document['paths']['/api/sandboxes/file']['get']
    file_write = document['paths']['/api/sandboxes/files']['post']
    return {
        'readQuery': {
            parameter['name']: str(parameter.get('example', parameter['schema'].get('example'))).lower()
            if parameter['schema']['type'] == 'boolean'
            else parameter.get('example', parameter['schema'].get('example'))
            for parameter in file_read['parameters']
            if parameter['name'] in ('path', 'include_revision')
        },
        'upload': content['UploadSandboxFilesRequest']['example'],
        'uploadSchema': resolve_response_schema(
            file_write['requestBody']['content']['application/json']['schema'], document,
        ),
        'responses': [
            {
                'method': method, 'path': path, 'status': status,
                'schema': resolve_response_schema(
                    operation['responses'][str(status)]['content']['application/json']['schema'],
                    document,
                ),
            }
            for method, path, operation, statuses in [
                ('GET', '/api/sandboxes/file', file_read, [200]),
                ('POST', '/api/sandboxes/files', file_write, [200, 409, 500]),
            ]
            for status in statuses
        ],
    }
