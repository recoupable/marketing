"""Freeze Context declarations and require evidence models in the public response union."""
from resolve_response_schema import resolve_response_schema


def build_context_fixture(document, source_hash, evidence):
    context = document['paths']['/api/context']['post']
    schema = context['responses']['200']['content']['application/json']['schema']
    references = [branch['$ref'] for branch in schema.get('anyOf', []) if '$ref' in branch]
    expected = [
        '#/components/schemas/ContextEvidenceAttachmentReceipt',
        '#/components/schemas/ContextEvidenceAttachmentPage',
    ]
    if len(references) != len(expected) or set(references) != set(expected):
        raise SystemExit('Context evidence response schemas must be connected to the 200 response.')
    return {
        'evidence': evidence,
        'sourceHash': source_hash,
        'requestSchemas': context['requestBody']['content']['application/json']['schema']['oneOf'],
        'undocumentedActions': context['x-undocumented-actions'],
        'mcpOperations': context['x-recoup-mcp-operations'],
        'standardMcpOperations': context['x-recoup-standard-mcp-operations'],
        'evidenceResponseReferences': expected,
        'evidenceSchemas': {
            'receipt': resolve_response_schema({'$ref': expected[0]}, document),
            'page': resolve_response_schema({'$ref': expected[1]}, document),
        },
    }
