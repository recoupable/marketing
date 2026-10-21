"""Freeze Context declarations and their reachable, action-specific response models."""
from resolve_response_schema import resolve_response_schema


def build_context_fixture(document, source_hash, evidence):
    context = document['paths']['/api/context']['post']
    schema = context['responses']['200']['content']['application/json']['schema']
    references = [branch['$ref'] for branch in schema.get('anyOf', []) if '$ref' in branch]
    evidence_references = [
        '#/components/schemas/ContextEvidenceAttachmentReceipt',
        '#/components/schemas/ContextEvidenceAttachmentPage',
    ]
    planning_reference = '#/components/schemas/ContextCatalogPlanningResponse'
    expected = [*evidence_references, planning_reference]
    if not set(expected).issubset(references):
        raise SystemExit('Context evidence and catalog planning response schemas must be connected to the 200 response.')
    request_content = context['requestBody']['content']['application/json']
    response_content = context['responses']['200']['content']['application/json']
    actions = [item['properties']['action']['const'] for item in request_content['schema']['oneOf']]
    mappings = context.get('x-recoup-context-responses', {})
    if set(mappings) != set(actions):
        raise SystemExit('Context response mapping must cover every request action.')
    models, response_references, statuses = {}, {}, {}
    expected_by_status = {}
    evidence_models = dict(zip(evidence_references, ['receipt', 'page']))
    for action, mapping in mappings.items():
        status = mapping.get('status')
        reference = mapping.get('schema', {}).get('$ref', '')
        expected_by_status.setdefault(str(status), set()).add(reference)
        if status not in [200, 202] or not reference.startswith('#/components/schemas/'):
            raise SystemExit('Context success models must match their action/status mappings.')
        component = reference.rsplit('/', 1)[-1]
        if component not in document['components']['schemas']:
            raise SystemExit('Context success models must match their action/status mappings.')
        if reference in evidence_models:
            local = '#/evidenceSchemas/' + evidence_models[reference]
        else:
            if not component.startswith('Context') or not component.endswith('Response'):
                raise SystemExit('Context success model names must use Context<Name>Response.')
            name = component[len('Context'):-len('Response')]
            name = name[0].lower() + name[1:]
            models[name] = resolve_response_schema({'$ref': reference}, document)
            local = '#/responseSchemas/' + name
        response_references[action], statuses[action] = local, status
    for status, expected_refs in expected_by_status.items():
        branches = context['responses'].get(status, {}).get('content', {}).get('application/json', {}).get('schema', {}).get('anyOf', [])
        actual_refs = [item.get('$ref') for item in branches]
        if len(actual_refs) != len(expected_refs) or set(actual_refs) != expected_refs:
            raise SystemExit('Context success models must match their action/status mappings.')
    completed = {'attach_evidence', 'read_evidence_attachment', 'list_evidence_attachments', 'plan_catalog_members'}
    examples = []
    remaining = set(actions) - completed
    for name, example in request_content.get('examples', {}).items():
        if not name.startswith('contextAction'):
            continue
        request = example.get('value', {})
        action = request.get('action')
        expected_name = 'contextAction' + ''.join(part.capitalize() for part in str(action).split('_'))
        if action not in remaining or name != expected_name:
            raise SystemExit('Context action examples must match their own request and response.')
        response = context['responses'][str(statuses[action])]['content']['application/json'].get('examples', {}).get(name, {})
        if not request or request.get('action') != action or response.get('x-recoup-context-action') != action or 'value' not in response:
            raise SystemExit('Context action examples must match their own request and response.')
        examples.append({'name': action, 'request': request, 'status': statuses[action],
                         'responseReference': response_references[action], 'response': response['value']})
    if {example['name'] for example in examples} != remaining or len(examples) != len(remaining):
        raise SystemExit('Context action examples must match their own request and response.')
    return {
        'evidence': evidence,
        'sourceHash': source_hash,
        'requestSchemas': context['requestBody']['content']['application/json']['schema']['oneOf'],
        'undocumentedActions': context['x-undocumented-actions'],
        'mcpOperations': context['x-recoup-mcp-operations'],
        'standardMcpOperations': context['x-recoup-standard-mcp-operations'],
        'evidenceResponseReferences': ['#/evidenceSchemas/receipt', '#/evidenceSchemas/page'],
        'evidenceResponseReferenceSource': {
            'repository': 'recoupable/marketing',
            'path': 'content/docs/source/api-reference/openapi/context.json',
            'references': evidence_references,
        },
        'evidenceSchemas': {
            'receipt': resolve_response_schema({'$ref': evidence_references[0]}, document),
            'page': resolve_response_schema({'$ref': evidence_references[1]}, document),
        },
        'responseSchemas': models,
        'responseReferences': response_references,
        'responseStatusCodes': statuses,
        'operationExamples': examples,
        'catalogPlanning': {
            'responseReferenceSource': {
                'repository': 'recoupable/marketing',
                'path': 'content/docs/source/api-reference/openapi/context.json',
                'reference': planning_reference,
            },
            'requestExamples': [
                example['value'] for example in request_content['examples'].values()
                if example.get('value', {}).get('action') == 'plan_catalog_members'
            ],
            'responseExamples': {
                name: example['value'] for name, example in response_content['examples'].items()
                if example.get('x-recoup-context-action') == 'plan_catalog_members'
            },
        },
    }
