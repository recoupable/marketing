"""Freeze copyable docs examples for provider-free tests in the pinned API checkout."""
import argparse
import hashlib
import json
import re
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--api', required=True)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
source = root / 'content/docs/source/api-reference/openapi'
specs = {name: json.loads((source / name).read_text()) for name in ['accounts.json', 'content.json', 'research.json', 'releases.json', 'social.json', 'context.json']}
context_operation = specs['context.json']['paths']['/api/context']['post']
mcp = context_operation['x-recoup-mcp-operations']
table = '\n'.join([
    '| REST action | Delegated OAuth tool | Classification |',
    '| --- | --- | --- |',
    *[f'| `{action}` | `{item["name"]}` | {"Read-only hint" if item["readOnly"] else "Writes or dispatches"} |' for action, item in mcp.items()],
])
description = context_operation['description']
table_start = '| REST action | Delegated OAuth tool | Classification |'
if table_start not in description:
    raise SystemExit('Context description is missing the generated MCP mapping table.')
expected_description = description.split(table_start)[0] + table
if args.check and description != expected_description:
    raise SystemExit('Stale Context MCP mapping table; regenerate it from the canonical metadata.')
if not args.check and description != expected_description:
    context_operation['description'] = expected_description
    (source / 'context.json').write_text(json.dumps(specs['context.json'], indent=2, ensure_ascii=False) + '\n')
content = specs['content.json']['components']['schemas']
research = specs['research.json']
social = specs['social.json']['paths']['/api/socials/{id}/scrape']['post']
price = re.search(r'([\d,]+) \+ (?:([\d,]+) × )?posts', social['description'])
if not price:
    raise SystemExit('Social scrape description must declare base + per-post micro-dollar credits.')
twitter_row = next(line for line in social['description'].splitlines() if line.startswith('| X / Twitter |'))
twitter_default = int(re.search(r'\d+', twitter_row.split('|')[-2]).group())
releases = specs['releases.json']
resume = research['paths']['/api/chat/{chatId}/stream']['get']
callback = specs['content.json']['components']['securitySchemes'].get('callbackSecret', {})
sites_path = root / 'content/docs/source/api-reference/sites/overview.mdx'
deletion_section = sites_path.read_text().split('## Delete and cancel generation')[1].split('\n## ')[0]
deletion_json = re.search(r'```json\n(.*?)\n```', deletion_section, re.DOTALL)
record = {
    'evidence': 'Provider-free request syntax and static contract claims only. URLs are placeholders; no provider, payment or customer workflow is exercised.',
    'sourceRepository': 'recoupable/marketing',
    'sourceHashes': {str((source / name).relative_to(root)): hashlib.sha256((source / name).read_bytes()).hexdigest() for name in specs},
    'examples': {
        'image': content['ContentCreateImageRequest']['example'],
        'video': content['ContentCreateVideoRequest']['example'],
        'lipsync': content['ContentCreateLipsyncRequest']['example'],
        'topup': specs['accounts.json']['components']['schemas']['CreateCreditsSessionRequest']['example'],
        'headless': research['components']['schemas']['ChatGenerateRequest']['example'],
        'trackStats': {p['name']: p['example'] for p in research['paths']['/api/research/track/stats']['get']['parameters'] if p['name'] in ['isrc', 'source']},
        'historicalMeasurementJob': research['components']['schemas']['ResearchMeasurementJobRequest']['example'],
    },
    'contracts': {
        'social': {
            'baseCredits': int(price[1].replace(',', '')),
            'perPostCredits': int((price[2] or '1').replace(',', '')),
            'twitterDefaultDepth': twitter_default,
            'security': social.get('security', []),
            'responses': sorted(social['responses']),
        },
        'catalogDaysMaximum': next(p['schema']['maximum'] for p in releases['paths']['/api/catalogs/{catalogId}/streams']['get']['parameters'] if p['name'] == 'days'),
        'resumeNoActiveStatus': 204 if '204' in resume['responses'] else 200,
        'resumeResponses': sorted(resume['responses']),
        'stopResponses': sorted(research['paths']['/api/chat/{chatId}/stop']['post']['responses']),
        'taskModelType': releases['components']['schemas']['CreateTaskRequest']['properties'].get('model', {}).get('type'),
        'taskModelRequired': 'model' in releases['components']['schemas']['CreateTaskRequest'].get('required', []),
        'taskReadResponses': sorted(releases['paths']['/api/tasks']['get']['responses']),
        'callbackHeader': callback.get('name'),
        'siteDeleteMethods': re.findall(r'`(GET|POST|PATCH|PUT|DELETE) /api/sites/\{id\}`', deletion_section),
        'siteDeleteExample': json.loads(deletion_json[1]) if deletion_json else None,
    },
}
record['sourceHashes'][str(sites_path.relative_to(root))] = hashlib.sha256(sites_path.read_bytes()).hexdigest()
context = specs['context.json']['paths']['/api/context']['post']
context_record = {
    'evidence': record['evidence'],
    'sourceHash': record['sourceHashes']['content/docs/source/api-reference/openapi/context.json'],
    'requestSchemas': context['requestBody']['content']['application/json']['schema']['oneOf'],
    'undocumentedActions': context['x-undocumented-actions'],
    'mcpOperations': context['x-recoup-mcp-operations'],
}
api = Path(args.api).resolve()
outputs = [
    (record, [root / 'content/docs/contracts/example-cases.json', api / 'lib/contracts/fixtures/published-docs.json']),
    (context_record, [root / 'content/docs/contracts/context-contract.json', api / 'lib/contracts/fixtures/context-contract.json']),
]
for item, paths in outputs:
    serialized = json.dumps(item, indent=2) + '\n'
    for path in paths:
        if args.check:
            if not path.is_file() or path.read_text() != serialized:
                raise SystemExit(f'Stale documentation example fixture: {path}. Refresh and test the coordinated API fixture.')
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(serialized)
print('Verified shared examples' if args.check else 'Updated shared examples; run API publishedDocs tests before committing')
