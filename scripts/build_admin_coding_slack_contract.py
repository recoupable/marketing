"""Freeze the two admin Slack operations without collecting Slack data."""
from resolve_response_schema import resolve_response_schema


def build_admin_coding_slack_contract(accounts):
    record = {}
    for name, path in [
        ('mentions', '/api/admins/coding/slack'),
        ('options', '/api/admins/coding-agent/slack-tags'),
    ]:
        operation = accounts['paths'][path]['get']
        success = operation['responses']['200']['content']['application/json']
        record[name] = {
            'path': path,
            'security': operation['security'],
            'parameters': operation.get('parameters', []),
            'schemas': {
                status: resolve_response_schema(response['content']['application/json']['schema'], accounts)
                for status, response in operation['responses'].items()
            },
            'examples': {key: item['value'] for key, item in success.get('examples', {}).items()},
        }
    parameters = {item['name']: item for item in record['mentions']['parameters']}
    record['queryExample'] = {
        'period': parameters['period']['schema']['default'],
        'tag': parameters['tag']['example'],
    }
    return record
