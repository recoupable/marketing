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
    if len(references) != len(expected) or set(references) != set(expected):
        raise SystemExit('Context evidence and catalog planning response schemas must be connected to the 200 response.')
    request_content = context['requestBody']['content']['application/json']
    response_content = context['responses']['200']['content']['application/json']
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
        'responseSchemas': {
            'catalogPlanning': resolve_response_schema({'$ref': planning_reference}, document),
        },
        'responseReferences': {
            'plan_catalog_members': '#/responseSchemas/catalogPlanning',
        },
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
