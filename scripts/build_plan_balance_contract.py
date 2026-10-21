"""Freeze the public examples and resolved schemas; never call a billing service."""
import json
import re
from resolve_response_schema import resolve_response_schema


def build_plan_balance_contract(accounts, root):
    contracts = {}
    for name, path in [('credits', '/api/accounts/{id}/credits'), ('subscription', '/api/accounts/{id}/subscription')]:
        content = accounts['paths'][path]['get']['responses']['200']['content']['application/json']
        contracts[name] = {
            'schema': resolve_response_schema(content['schema'], accounts),
            'examples': {key: item['value'] for key, item in content.get('examples', {}).items()},
        }
    guide = (root / 'content/docs/source/credits.mdx').read_text().split('## Check your balance', 1)[1]
    contracts['guideCreditExample'] = json.loads(re.search(r'```json\n([\s\S]*?)\n```', guide)[1])
    return contracts
