"""Freeze task authentication declarations and examples without resolving credentials."""


def build_task_authentication_contract(releases):
    path = '/api/tasks'
    operations = {}
    for method in ['get', 'post', 'patch', 'delete']:
        operation = releases['paths'][path][method]
        content = operation['responses']['401']['content']['application/json']
        operations[method.upper()] = {
            'security': operation.get('security', releases.get('security', [])),
            'examples': {name: example['value'] for name, example in content.get('examples', {}).items()},
        }
    return {'path': path, 'operations': operations}
