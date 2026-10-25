"""Freeze guarded-file examples and resolved responses without accessing services."""
from resolve_response_schema import resolve_response_schema


def build_guarded_file_contract(document):
    content = document['components']['schemas']
    sandbox_list = document['paths']['/api/sandboxes']['get']
    file_read = document['paths']['/api/sandboxes/file']['get']
    file_write = document['paths']['/api/sandboxes/files']['post']
    required = {'path', 'include_revision'}
    parameters = {
        parameter['name']: parameter for parameter in file_read['parameters']
        if parameter.get('in') == 'query' and parameter['name'] in required
    }
    if set(parameters) != required or any(
        parameter.get('example', parameter['schema'].get('example')) is None
        for parameter in parameters.values()
    ):
        raise SystemExit('Guarded file read requires path/include_revision parameters and examples.')
    account_parameters = {}
    for name, operation in [('list', sandbox_list), ('file', file_read)]:
        matches = [parameter for parameter in operation['parameters']
                   if parameter.get('in') == 'query' and parameter['name'] == 'account_id']
        if (len(matches) != 1 or matches[0].get('required', False)
                or matches[0]['schema'].get('type') != 'string'
                or matches[0]['schema'].get('format') != 'uuid'
                or not matches[0].get('example', matches[0]['schema'].get('example'))):
            raise SystemExit(f'Account-scoped {name} read requires one optional UUID account_id query and example.')
        account_parameters[name] = matches[0]
    read_query = {
        parameter['name']: str(parameter.get('example', parameter['schema'].get('example'))).lower()
        if parameter['schema']['type'] == 'boolean'
        else parameter.get('example', parameter['schema'].get('example'))
        for parameter in parameters.values()
    }
    target = lambda name: account_parameters[name].get('example', account_parameters[name]['schema'].get('example'))
    return {
        'readQuery': read_query,
        'scopedReadQuery': {**read_query, 'account_id': target('file')},
        'listQuery': {'account_id': target('list'), 'metadata_only': 'true'},
        'accountScopeParameters': account_parameters,
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
                **({'examples': {
                    name: example['value'] for name, example in
                    operation['responses'][str(status)]['content']['application/json'].get('examples', {}).items()
                }} if method == 'GET' else {}),
            }
            for method, path, operation, statuses in [
                ('GET', '/api/sandboxes', sandbox_list, [200]),
                ('GET', '/api/sandboxes/file', file_read, [200]),
                ('POST', '/api/sandboxes/files', file_write, [200, 409, 500]),
            ]
            for status in statuses
        ],
    }
