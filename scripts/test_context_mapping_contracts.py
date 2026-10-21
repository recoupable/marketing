"""Verify context mapping declarations through the real producer command."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase
from resolve_response_schema import resolve_response_schema


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


    def test_catalog_planning_freezes_the_specific_response_and_public_examples(self):
        spec = json.loads((self.marketing / 'content/docs/source/api-reference/openapi/context.json').read_text())
        operation = spec['paths']['/api/context']['post']
        fixture = json.loads((self.marketing / 'content/docs/contracts/context-contract.json').read_text())
        planning = fixture['catalogPlanning']
        source = planning['responseReferenceSource']
        self.assertEqual(source['reference'], '#/components/schemas/ContextCatalogPlanningResponse')
        self.assertIn({'$ref': source['reference']}, operation['responses']['200']['content']['application/json']['schema']['anyOf'])
        self.assertEqual(fixture['responseSchemas']['catalogPlanning'], resolve_response_schema({'$ref': source['reference']}, spec))
        self.assertEqual(fixture['responseReferences'], {'plan_catalog_members': '#/responseSchemas/catalogPlanning'})
        self.assertEqual({item['module'] for item in planning['requestExamples']},
                         {'recording_candidates', 'recording_work_candidates', 'platform_metadata'})
        self.assertEqual(set(planning['responseExamples']),
                         {'catalogPlanRecording', 'catalogPlanWork', 'catalogPlanPlatform', 'catalogPlanEmpty'})
        request = next(item for item in fixture['requestSchemas'] if item['properties']['action']['const'] == 'plan_catalog_members')
        self.assertEqual(set(request['properties']['module']['enum']),
                         {'recording_candidates', 'recording_work_candidates', 'platform_metadata',
                          'musicbrainz', 'mlc_recording', 'songstats'})
        self.assertNotIn('plan_catalog_members', fixture['undocumentedActions'])
        self.assertEqual(fixture['mcpOperations']['plan_catalog_members'],
                         {'name': 'plan_music_catalog_research', 'readOnly': True})


    def test_producer_rejects_catalog_planning_hidden_by_the_generic_response(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        branches = spec['paths']['/api/context']['post']['responses']['200']['content']['application/json']['schema']['anyOf']
        branches.remove({'$ref': '#/components/schemas/ContextCatalogPlanningResponse'})
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run(self.command, capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('catalog planning response schemas must be connected', failed.stderr)


    def test_check_rejects_catalog_planning_drift_in_both_fixture_copies(self):
        paths = [self.api / 'lib/contracts/fixtures/context-contract.json',
                 self.marketing / 'content/docs/contracts/context-contract.json']
        for path in paths:
            for field, value in [('requestExamples', []), ('responseExamples', {})]:
                with self.subTest(path=str(path), field=field):
                    original = path.read_bytes()
                    fixture = json.loads(original)
                    fixture['catalogPlanning'][field] = value
                    try:
                        path.write_text(json.dumps(fixture, indent=2) + '\n')
                        failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                        self.assertNotEqual(failed.returncode, 0)
                        self.assertIn(str(path.resolve()), failed.stderr)
                    finally:
                        path.write_bytes(original)

            for field in ['responseSchemas', 'responseReferences']:
                with self.subTest(path=str(path), field=field):
                    original = path.read_bytes()
                    fixture = json.loads(original)
                    fixture[field] = {}
                    try:
                        path.write_text(json.dumps(fixture, indent=2) + '\n')
                        failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                        self.assertNotEqual(failed.returncode, 0)
                        self.assertIn(str(path.resolve()), failed.stderr)
                    finally:
                        path.write_bytes(original)

