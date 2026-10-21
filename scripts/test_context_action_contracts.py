"""Keep every Context action connected to its own success model and examples."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ContextActionContractsTest(ResponseContractTestCase):
    def test_response_table_regeneration_preserves_authored_notes(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        operation = spec['paths']['/api/context']['post']
        note = '\n\n### Operator note\nKeep this authored note.'
        operation['description'] = operation['description'].replace(
            '| `ingest` | 202 | `ContextRequestResponse` |',
            '| `ingest` | 200 | `ContextRequestResponse` |') + note
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        subprocess.run(self.command, check=True, capture_output=True, text=True)
        description = json.loads(path.read_text())['paths']['/api/context']['post']['description']
        self.assertTrue('| `ingest` | 202 | `ContextRequestResponse` |' in description)
        self.assertTrue(description.endswith(note))

    def test_every_action_has_a_specific_status_model_and_examples(self):
        fixture = json.loads((self.marketing / 'content/docs/contracts/context-contract.json').read_text())
        actions = {s['properties']['action']['const'] for s in fixture['requestSchemas']}
        self.assertEqual(set(fixture['responseReferences']), actions)
        self.assertEqual(set(fixture['responseStatusCodes']), actions)
        self.assertEqual({a for a, status in fixture['responseStatusCodes'].items() if status == 202},
                         {'ingest', 'verify_release', 'verify_release_tracks'})
        completed = {'attach_evidence', 'read_evidence_attachment', 'list_evidence_attachments', 'plan_catalog_members'}
        examples = fixture['operationExamples']
        self.assertEqual({e['request']['action'] for e in examples}, actions - completed)
        for example in examples:
            action = example['request']['action']
            self.assertEqual(example['name'], action)
            self.assertEqual(example['status'], fixture['responseStatusCodes'][action])
            self.assertEqual(example['responseReference'], fixture['responseReferences'][action])
        self.assertEqual(len(fixture['catalogPlanning']['requestExamples']), 3)
        self.assertEqual(len(fixture['catalogPlanning']['responseExamples']), 4)
        subprocess.run([*self.command, '--check'], check=True, capture_output=True, text=True)

    def test_producer_rejects_a_missing_action_mapping(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        del spec['paths']['/api/context']['post']['x-recoup-context-responses']['read_execution']
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run(self.command, capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('response mapping must cover every request action', failed.stderr)

    def test_producer_rejects_a_dangling_or_wrong_status_model(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        original = path.read_bytes()
        for replacement in [{'status': 202, 'schema': {'$ref': '#/components/schemas/ContextExecutionResponse'}},
                            {'status': 200, 'schema': {'$ref': '#/components/schemas/MissingResponse'}}]:
            with self.subTest(replacement=replacement):
                spec = json.loads(original)
                spec['paths']['/api/context']['post']['x-recoup-context-responses']['read_execution'] = replacement
                path.write_text(json.dumps(spec, indent=2) + '\n')
                failed = subprocess.run(self.command, capture_output=True, text=True)
                self.assertNotEqual(failed.returncode, 0)
                self.assertIn('Context success models must match their action/status mappings', failed.stderr)
        path.write_bytes(original)

    def test_producer_rejects_a_generic_success_fallback(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        spec = json.loads(path.read_text())
        spec['paths']['/api/context']['post']['responses']['200']['content']['application/json']['schema']['anyOf'].append({'type': 'object'})
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run(self.command, capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('Context success models must match their action/status mappings', failed.stderr)

    def test_producer_rejects_missing_or_cross_action_examples(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/context.json'
        original = path.read_bytes()
        for mutation in ['missing', 'wrong-action']:
            with self.subTest(mutation=mutation):
                spec = json.loads(original)
                example = spec['paths']['/api/context']['post']['requestBody']['content']['application/json']['examples']
                if mutation == 'missing':
                    del example['contextActionReadExecution']
                else:
                    example['contextActionReadExecution']['value']['action'] = 'read'
                path.write_text(json.dumps(spec, indent=2) + '\n')
                failed = subprocess.run(self.command, capture_output=True, text=True)
                self.assertNotEqual(failed.returncode, 0)
                self.assertIn('Context action examples must match their own request and response', failed.stderr)
        path.write_bytes(original)

    def test_check_rejects_response_and_example_drift_in_both_copies(self):
        paths = [self.api / 'lib/contracts/fixtures/context-contract.json',
                 self.marketing / 'content/docs/contracts/context-contract.json']
        for path in paths:
            for field in ['responseSchemas', 'responseReferences', 'responseStatusCodes', 'operationExamples']:
                with self.subTest(path=str(path), field=field):
                    original = path.read_bytes()
                    fixture = json.loads(original)
                    fixture[field] = [] if field == 'operationExamples' else {}
                    try:
                        path.write_text(json.dumps(fixture, indent=2) + '\n')
                        failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                        self.assertNotEqual(failed.returncode, 0)
                        self.assertIn(str(path.resolve()), failed.stderr)
                    finally:
                        path.write_bytes(original)
