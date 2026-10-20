"""Freeze the existing cross-domain examples and claims used by API contract tests."""
import hashlib
import json
import re
from build_guarded_file_contract import build_guarded_file_contract


def build_published_docs_record(specs, source, root, schema_hash, response_schemas):
    content = specs['content.json']['components']['schemas']
    research = specs['research.json']
    social = specs['social.json']['paths']['/api/socials/{id}/scrape']['post']
    artist_social = specs['releases.json']['paths']['/api/artist/socials/scrape']['post']
    artist_price = re.search(r'([\d,]+) \+ ([\d,]+) × posts', artist_social['description'])
    if not artist_price:
        raise SystemExit('Artist scrape description must declare base + per-post micro-dollar credits.')
    usage_properties = specs['accounts.json']['components']['schemas']['AccountUsageEvent']['properties']
    price = re.search(r'([\d,]+) \+ ([\d,]+) × posts', social['description'])
    if not price:
        raise SystemExit('Social scrape description must declare base + per-post micro-dollar credits.')
    twitter_row = next(line for line in social['description'].splitlines() if line.startswith('| X / Twitter |'))
    twitter_default = int(re.search(r'\d+', twitter_row.split('|')[-2]).group())
    releases = specs['releases.json']
    resume = research['paths']['/api/chat/{chatId}/stream']['get']
    callback = specs['content.json']['components']['securitySchemes'].get('callbackSecret')
    if not callback or not callback.get('name'):
        raise SystemExit('Content callbackSecret must declare its header name.')
    sites_path = root / 'content/docs/source/api-reference/sites/overview.mdx'
    deletion_section = sites_path.read_text().split('## Delete and cancel generation')[1].split('\n## ')[0]
    deletion_json = re.search(r'```json\n(.*?)\n```', deletion_section, re.DOTALL)
    if not deletion_json:
        raise SystemExit('Sites delete section requires a JSON response example.')
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
                'perPostCredits': int(price[2].replace(',', '')),
                'twitterDefaultDepth': twitter_default,
                'security': social.get('security', []),
                'responses': sorted(social['responses']),
                'artistBaseCredits': int(artist_price[1].replace(',', '')),
                'artistPerPostCredits': int(artist_price[2].replace(',', '')),
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
            'callbackHeader': callback['name'],
            'siteDeleteMethods': re.findall(r'`(GET|POST|PATCH|PUT|DELETE) /api/sites/\{id\}`', deletion_section),
            'siteDeleteExample': json.loads(deletion_json[1]),
        },
    }
    record['sourceHashes'][str(sites_path.relative_to(root))] = hashlib.sha256(sites_path.read_bytes()).hexdigest()
    record['guardedGitFiles'] = build_guarded_file_contract(specs['content.json'])
    return record
