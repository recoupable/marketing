"""Freeze copyable docs examples for provider-free tests in the pinned API checkout."""
import argparse
import hashlib
import json
import re
from pathlib import Path

from build_response_contracts import build_response_contracts
from resolve_response_schema import resolve_response_schema

parser = argparse.ArgumentParser()
parser.add_argument('--api', required=True)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
source = root / 'content/docs/source/api-reference/openapi'
specs = {name: json.loads((source / name).read_text()) for name in ['accounts.json', 'content.json', 'research.json', 'releases.json', 'social.json', 'context.json', 'projects.json']}
api = Path(args.api).resolve()
schema_hash, response_schemas = build_response_contracts(specs, source, api, args.check)
context_operation = specs['context.json']['paths']['/api/context']['post']
mcp = context_operation['x-recoup-mcp-operations']
standard_mcp = context_operation['x-recoup-standard-mcp-operations']
if set(mcp) & set(standard_mcp):
    raise SystemExit('Standard-only Context actions cannot appear in the delegated MCP mapping.')
table = '\n'.join([
    '| REST action | Delegated OAuth tool | Classification |',
    '| --- | --- | --- |',
    *[f'| `{action}` | `{item["name"]}` | {"Read-only hint" if item["readOnly"] else "Writes or dispatches"} |' for action, item in mcp.items()],
])
description = context_operation['description']
table_start = '| REST action | Delegated OAuth tool | Classification |'
if table_start not in description:
    raise SystemExit('Context description is missing the generated MCP mapping table.')
standard_table = '\n'.join([
    '### Standard-only evidence tools',
    '',
    'These tools are available to standard MCP clients after the required database/API release. They are excluded from delegated OAuth connections pending organization-grant review.',
    '',
    '| REST action | Standard MCP tool | Classification |',
    '| --- | --- | --- |',
    *[f'| `{action}` | `{item["name"]}` | {"Read-only hint" if item["readOnly"] else "Writes"} |' for action, item in standard_mcp.items()],
])
expected_description = description.split(table_start)[0] + table + '\n\n' + standard_table
if args.check and description != expected_description:
    raise SystemExit('Stale Context MCP mapping table; regenerate it from the canonical metadata.')
if not args.check and description != expected_description:
    context_operation['description'] = expected_description
    (source / 'context.json').write_text(json.dumps(specs['context.json'], indent=2, ensure_ascii=False) + '\n')
content = specs['content.json']['components']['schemas']
research = specs['research.json']
social = specs['social.json']['paths']['/api/socials/{id}/scrape']['post']
artist_social = specs['releases.json']['paths']['/api/artist/socials/scrape']['post']
artist_price = re.search(r'([\d,]+) \+ ([\d,]+) × posts', artist_social['description'])
usage_properties = specs['accounts.json']['components']['schemas']['AccountUsageEvent']['properties']
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
    'responseEvidence': 'Selected route exports use real request, response and authentication code under dependency mocks. No live provider, customer or hosted route is exercised.',
    'sourceRepository': 'recoupable/marketing',
    'apiResponseSchemaSha256': schema_hash,
    'responseSchemas': response_schemas,
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
            'artistBaseCredits': int(artist_price[1].replace(',', '')) if artist_price else None,
            'artistPerPostCredits': int(artist_price[2].replace(',', '')) if artist_price else None,
            'requiredCreditsExample': specs['social.json']['components']['schemas']['SocialInsufficientCreditsResponse']['properties']['required_credits']['example'],
        },
        'usageEventNullables': sorted(name for name, schema in usage_properties.items() if schema.get('nullable') or 'null' in schema.get('type', [])),
        'usageTimeCursorExample': specs['accounts.json']['components']['schemas']['AccountUsageResponse']['properties']['next_cursor']['example'],
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
file_read = specs['content.json']['paths']['/api/sandboxes/file']['get']
file_write = specs['content.json']['paths']['/api/sandboxes/files']['post']
record['guardedGitFiles'] = {
    'readQuery': {
        parameter['name']: str(parameter.get('example', parameter['schema'].get('example'))).lower()
        if parameter['schema']['type'] == 'boolean'
        else parameter.get('example', parameter['schema'].get('example'))
        for parameter in file_read['parameters']
        if parameter['name'] in ('path', 'include_revision')
    },
    'upload': content['UploadSandboxFilesRequest']['example'],
    'uploadSchema': resolve_response_schema(
        file_write['requestBody']['content']['application/json']['schema'], specs['content.json'],
    ),
    'responses': [
        {
            'method': method, 'path': path, 'status': status,
            'schema': resolve_response_schema(
                operation['responses'][str(status)]['content']['application/json']['schema'],
                specs['content.json'],
            ),
        }
        for method, path, operation, statuses in [
            ('GET', '/api/sandboxes/file', file_read, [200]),
            ('POST', '/api/sandboxes/files', file_write, [200, 409, 500]),
        ]
        for status in statuses
    ],
}
context = specs['context.json']['paths']['/api/context']['post']
context_record = {
    'evidence': record['evidence'],
    'sourceHash': record['sourceHashes']['content/docs/source/api-reference/openapi/context.json'],
    'requestSchemas': context['requestBody']['content']['application/json']['schema']['oneOf'],
    'undocumentedActions': context['x-undocumented-actions'],
    'mcpOperations': context['x-recoup-mcp-operations'],
    'standardMcpOperations': context['x-recoup-standard-mcp-operations'],
    'evidenceSchemas': {
        'receipt': specs['context.json']['components']['schemas']['ContextEvidenceAttachmentReceipt'],
        'page': specs['context.json']['components']['schemas']['ContextEvidenceAttachmentPage'],
    },
}
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
