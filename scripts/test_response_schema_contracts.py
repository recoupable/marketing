"""Verify response schema declarations through the real producer command."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ResponseSchemaContractsTest(ResponseContractTestCase):
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
                try:
                    path.write_text(json.dumps(spec, indent=2) + '\n')
                    failed = subprocess.run([*self.command, '--check'], capture_output=True, text=True)
                    self.assertNotEqual(failed.returncode, 0)
                    self.assertIn('API-owned response schema', failed.stderr)
                    self.assertIn(component, failed.stderr)
                finally:
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
        response = spec['paths']['/api/projects/{projectId}']['get']['responses']['404']['content']['application/json']
        response['schema'] = {'$ref': '#/components/schemas/AuthenticationError'}
        path.write_text(json.dumps(spec, indent=2) + '\n')
        generated = subprocess.run(self.command, capture_output=True, text=True)
        self.assertEqual(generated.returncode, 0, generated.stderr)
        updated = json.loads(path.read_text())['paths']['/api/projects/{projectId}']
        for key, value in metadata.items():
            self.assertEqual(updated[key], value)
        self.assertEqual(updated['get']['responses']['404']['content']['application/json']['schema'],
                         {'$ref': '#/components/schemas/Error'})
        subprocess.run([*self.command, '--check'], check=True, capture_output=True, text=True)

