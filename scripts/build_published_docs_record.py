"""Freeze the existing cross-domain examples and claims used by API contract tests."""
import hashlib
import json
import re
from build_guarded_file_contract import build_guarded_file_contract
from resolve_response_schema import resolve_response_schema
from build_plan_balance_contract import build_plan_balance_contract
from build_sites_lifecycle_contract import build_sites_lifecycle_contract
from build_admin_coding_slack_contract import build_admin_coding_slack_contract
from build_agent_signup_metadata_contract import build_agent_signup_metadata_contract
from build_content_callback_contract import build_content_callback_contract
from build_task_validation_contract import build_task_validation_contract
from build_task_authentication_contract import build_task_authentication_contract


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
            'chatStartResponses': sorted(research['paths']['/api/chat']['post']['responses']),
            'chatStartMediaTypes': sorted(research['paths']['/api/chat']['post']['responses']['200']['content']),
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
    record['artistFans'] = {
        'schema': resolve_response_schema(
            releases['paths']['/api/artists/{id}/fans']['get']['responses']['200']['content']['application/json']['schema'], releases,
        ),
        'example': releases['components']['schemas']['ArtistFansResponse']['example'],
    }
    record['artistSocials'] = {
        'example': releases['components']['schemas']['ArtistSocial'].get('example'),
        'responses': {},
    }
    for name, method, path in [('list', 'get', '/api/artists'), ('update', 'patch', '/api/artists/{id}')]:
        response = releases['paths'][path][method]['responses']['200']['content']['application/json']
        schema = resolve_response_schema(response['schema'], releases)
        artist = schema['properties']['artists']['items'] if name == 'list' else schema['properties']['artist']
        record['artistSocials']['responses'][name] = {
            'method': method.upper(), 'path': path, 'status': 200,
            'schema': artist['properties']['account_socials'],
        }
    comments = specs['social.json']['paths']['/api/comments']['get']
    record['storedComments'] = {
        'method': 'GET', 'path': '/api/comments',
        'security': comments.get('security', []),
        'parameters': comments['parameters'],
        'schemas': {
            status: resolve_response_schema(response['content']['application/json']['schema'], specs['social.json'])
            for status, response in comments['responses'].items()
        },
        'headers': {status: response['headers'] for status, response in comments['responses'].items()},
        'queryExample': {parameter['name']: parameter['example'] for parameter in comments['parameters']},
        'example': specs['social.json']['components']['schemas']['CommentsResponse']['example'],
    }
    record['planBalances'] = build_plan_balance_contract(specs['accounts.json'], root)
    record['sourceHashes']['content/docs/source/credits.mdx'] = hashlib.sha256((root / 'content/docs/source/credits.mdx').read_bytes()).hexdigest()
    record['siteLifecycle'] = build_sites_lifecycle_contract(sites_path.read_text())
    record['adminCodingSlack'] = build_admin_coding_slack_contract(specs['accounts.json'])
    record['agentSignupMetadata'] = build_agent_signup_metadata_contract(specs['accounts.json'])
    record['contentCallback'] = build_content_callback_contract(specs['content.json'])
    record['taskValidation'] = build_task_validation_contract(specs['releases.json'])
    record['taskAuthentication'] = build_task_authentication_contract(specs['releases.json'])
    signup_guide = root / 'content/docs/source/api-reference/admins/agent-signups.mdx'
    record['sourceHashes'][str(signup_guide.relative_to(root))] = hashlib.sha256(signup_guide.read_bytes()).hexdigest()
    record['headlessChat'] = {
        'requestSchema': resolve_response_schema(research['components']['schemas']['ChatGenerateRequest'], research),
        'requestExamples': [research['components']['schemas']['ChatGenerateRequest']['example'], *research['components']['schemas']['ChatGenerateRequest'].get('examples', [])],
        'errorSchema': resolve_response_schema(research['components']['schemas']['ChatGenerateErrorResponse'], research),
        'statusSchema': resolve_response_schema(research['components']['schemas']['ChatRunStatusResponse'], research),
    }
    record['chatLifecycle'] = {
        name: {'method': method.upper(), 'path': path,
               'parameters': research['paths'][path][method].get('parameters', [])}
        for name, method, path in [('start', 'post', '/api/chat'),
                                   ('resume', 'get', '/api/chat/{chatId}/stream')]
    }
    return record
