"""Verify context mapping declarations through the real producer command."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ContextMappingContractsTest(ResponseContractTestCase):
    def test_standard_only_evidence_cannot_be_published_as_delegated(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        operation = spec['paths']['/api/context']['post']
        operation['x-recoup-mcp-operations']['attach_evidence'] = operation['x-recoup-standard-mcp-operations']['attach_evidence']
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run(self.command, capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('cannot appear in the delegated MCP mapping', failed.stderr)


    def test_check_rejects_evidence_classification_and_response_drift_in_both_copies(self):
        paths = [self.api / 'lib/contracts/fixtures/context-contract.json', self.marketing / 'content/docs/contracts/context-contract.json']
        for path in paths:
            for field in ['standardMcpOperations', 'evidenceSchemas']:
                with self.subTest(path=str(path), field=field):
                    original = path.read_bytes()
                    fixture = json.loads(original)
                    fixture[field] = {}
                    path.write_text(json.dumps(fixture, indent=2) + '\n')
                    failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                    self.assertNotEqual(failed.returncode, 0)
                    self.assertIn(str(path.resolve()), failed.stderr)
                    path.write_bytes(original)


    def test_context_models_are_reachable_and_page_reuses_the_receipt(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        components = spec['components']['schemas']
        self.assertEqual(components['ContextEvidenceAttachmentPage']['properties']['items']['items'],
                         {'$ref': '#/components/schemas/ContextEvidenceAttachmentReceipt'})
        spec['paths']['/api/context']['post']['responses']['200']['content']['application/json']['schema'] = {'type': 'object'}
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run(self.command, capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('must be connected to the 200 response', failed.stderr)


    def test_context_regeneration_preserves_authored_tail(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        note = '\n\n### Additional author note\nKeep this exact authored tail.'
        spec['paths']['/api/context']['post']['description'] += note
        path.write_text(json.dumps(spec, indent=2) + '\n')
        subprocess.run(self.command, check=True, capture_output=True, text=True)
        updated = json.loads(path.read_text())['paths']['/api/context']['post']['description']
        self.assertTrue(updated.endswith(note))
        subprocess.run([*self.command, '--check'], check=True, capture_output=True, text=True)

