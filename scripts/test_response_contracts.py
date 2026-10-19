"""Exercise producer imports and both frozen fixtures without services."""
import json
import re
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


class ResponseContractsTest(unittest.TestCase):
    def setUp(self):
        root = Path(__file__).resolve().parent.parent
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        real_workspace = Path(temporary.name) / 'resolved-workspace'
        real_workspace.mkdir()
        workspace = Path(temporary.name) / 'workspace-link'
        workspace.symlink_to(real_workspace, target_is_directory=True)
        self.marketing, self.api = workspace / 'marketing', workspace / 'api'
        script = self.marketing / 'scripts/build-contract-examples.py'
        script.parent.mkdir(parents=True)
        for name in ['build-contract-examples.py', 'build_response_contracts.py', 'resolve_response_schema.py',
                     'refresh_context_mapping.py', 'build_published_docs_record.py',
                     'build_guarded_file_contract.py', 'build_context_fixture.py']:
            shutil.copyfile(root / 'scripts' / name, script.parent / name)
        shutil.copytree(root / 'content/docs/source', self.marketing / 'content/docs/source')
        (self.marketing / 'content/docs/contracts').mkdir()
        artifact = self.api / 'lib/contracts/generated/error-responses.json'
        artifact.parent.mkdir(parents=True)
        self.error = {'type': 'object', 'properties': {'status': {'type': 'string', 'enum': ['error']}, 'error': {'type': 'string'}}, 'required': ['status', 'error']}
        message = {'type': 'object', 'properties': {'status': {'type': 'string', 'enum': ['error']}, 'message': {'type': 'string'}}, 'required': ['status', 'message']}
        self.authentication = {'anyOf': [self.error, message]}
        artifact.write_text(json.dumps({'ErrorResponse': self.error, 'MessageErrorResponse': message, 'AuthenticationErrorResponse': self.authentication}))
        self.command = ['python3', str(script), '--api', str(self.api)]
        subprocess.run(self.command, check=True, capture_output=True, text=True)

    def test_status_specific_refs_cover_every_project_operation(self):
        spec = json.loads((self.marketing / 'content/docs/source/api-reference/openapi/projects.json').read_text())
        self.assertEqual(spec['components']['schemas']['Error'], self.error)
        self.assertEqual(spec['components']['schemas']['AuthenticationError'], self.authentication)
        operations = [operation for methods in spec['paths'].values() for operation in methods.values() if 'responses' in operation]
        self.assertEqual(len(operations), 7)
        for operation in operations:
            for status in ['400', '401', '404', '500']:
                expected = 'AuthenticationError' if status == '401' else 'Error'
                self.assertEqual(operation['responses'][status]['content']['application/json']['schema'], {'$ref': '#/components/schemas/' + expected})
        subprocess.run([*self.command, '--check'], check=True, capture_output=True, text=True)

    def test_check_rejects_drift_in_each_owned_component(self):
        for name, component in [('projects.json', 'Error'), ('projects.json', 'AuthenticationError'), ('releases.json', 'ArtistPublicProfileErrorResponse')]:
            with self.subTest(specification=name, component=component):
                path = self.marketing / 'content/docs/source/api-reference/openapi' / name
                original = path.read_bytes()
                spec = json.loads(original)
                spec['components']['schemas'][component] = {'type': 'string'}
                path.write_text(json.dumps(spec, indent=2) + '\n')
                failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                self.assertNotEqual(failed.returncode, 0)
                self.assertIn('API-owned response schema', failed.stderr)
                self.assertIn(component, failed.stderr)
                path.write_bytes(original)

    def test_check_rejects_operation_identity_drift_in_either_fixture_copy(self):
        for path in [self.api / 'lib/contracts/fixtures/published-docs.json', self.marketing / 'content/docs/contracts/example-cases.json']:
            for field, value in [('method', 'POST'), ('path', '/api/wrong'), ('status', 200)]:
                with self.subTest(fixture=str(path), field=field):
                    original = path.read_bytes()
                    fixture = json.loads(original)
                    fixture['responseSchemas'][0][field] = value
                    path.write_text(json.dumps(fixture, indent=2) + '\n')
                    failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                    self.assertNotEqual(failed.returncode, 0)
                    self.assertIn('Stale documentation example fixture', failed.stderr)
                    self.assertIn(str(path.resolve()), failed.stderr)
                    path.write_bytes(original)

    def test_check_rejects_authentication_union_on_project_404(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/projects.json'
        spec = json.loads(path.read_text())
        spec['paths']['/api/projects/{projectId}']['get']['responses']['404']['content']['application/json']['schema'] = {'$ref': '#/components/schemas/AuthenticationError'}
        path.write_text(json.dumps(spec, indent=2) + '\n')
        failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('Projects response schema reference', failed.stderr)
        self.assertIn('404', failed.stderr)

    def test_path_item_metadata_is_preserved(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/projects.json'
        spec = json.loads(path.read_text())
        metadata = {
            'summary': 'Project operations',
            'parameters': [{'name': 'projectId', 'in': 'path', 'required': True, 'schema': {'type': 'string'}}],
        }
        spec['paths']['/api/projects/{projectId}'].update(metadata)
        path.write_text(json.dumps(spec, indent=2) + '\n')
        generated = subprocess.run(self.command, capture_output=True, text=True)
        self.assertEqual(generated.returncode, 0, generated.stderr)
        updated = json.loads(path.read_text())['paths']['/api/projects/{projectId}']
        for key, value in metadata.items():
            self.assertEqual(updated[key], value)
        subprocess.run([*self.command, '--check'], check=True, capture_output=True, text=True)

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

    def test_missing_guarded_file_parameters_or_examples_fail_before_freezing(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/content.json'
        original = path.read_bytes()
        for name, remove in [('path', True), ('include_revision', True), ('path', False)]:
            with self.subTest(parameter=name, removed=remove):
                spec = json.loads(original)
                parameters = spec['paths']['/api/sandboxes/file']['get']['parameters']
                if remove:
                    parameters[:] = [parameter for parameter in parameters if parameter['name'] != name]
                else:
                    parameter = next(parameter for parameter in parameters if parameter['name'] == name)
                    parameter.pop('example', None)
                    parameter['schema'].pop('example', None)
                path.write_text(json.dumps(spec, indent=2) + '\n')
                failed = subprocess.run(self.command, capture_output=True, text=True)
                self.assertNotEqual(failed.returncode, 0)
                self.assertIn('Guarded file read requires', failed.stderr)
                path.write_bytes(original)

    def test_required_extracted_claims_do_not_silently_default(self):
        source = self.marketing / 'content/docs/source'
        cases = [
            ('releases.json', 'artist', 'Artist scrape description'),
            ('social.json', 'social', 'Social scrape description'),
            ('content.json', 'callback', 'callbackSecret'),
        ]
        for filename, mutation, message in cases:
            with self.subTest(claim=mutation):
                path = source / 'api-reference/openapi' / filename
                original = path.read_bytes()
                spec = json.loads(original)
                if mutation == 'artist':
                    spec['paths']['/api/artist/socials/scrape']['post']['description'] = 'Pricing unavailable'
                elif mutation == 'social':
                    operation = spec['paths']['/api/socials/{id}/scrape']['post']
                    operation['description'] = re.sub(r'([\d,]+) \+ ([\d,]+) × posts', r'\1 + posts', operation['description'])
                else:
                    spec['components']['securitySchemes'].pop('callbackSecret')
                path.write_text(json.dumps(spec, indent=2) + '\n')
                failed = subprocess.run(self.command, capture_output=True, text=True)
                self.assertNotEqual(failed.returncode, 0)
                self.assertIn(message, failed.stderr)
                path.write_bytes(original)
        path = source / 'api-reference/sites/overview.mdx'
        original = path.read_text()
        before, section = original.split('## Delete and cancel generation', 1)
        path.write_text(before + '## Delete and cancel generation' + re.sub(r'```json\n.*?\n```', '', section, count=1, flags=re.DOTALL))
        failed = subprocess.run(self.command, capture_output=True, text=True)
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('Sites delete section requires', failed.stderr)
        path.write_text(original)

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


if __name__ == '__main__':
    unittest.main()
