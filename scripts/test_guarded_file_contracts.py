"""Verify guarded file declarations through the real producer command."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class GuardedFileContractsTest(ResponseContractTestCase):
    def test_same_named_nonquery_parameters_cannot_replace_query_examples(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/content.json'
        original = path.read_bytes()
        for location in ['header', 'path']:
            with self.subTest(location=location):
                spec = json.loads(original)
                parameters = spec['paths']['/api/sandboxes/file']['get']['parameters']
                query = next(parameter for parameter in parameters if parameter['name'] == 'path')
                parameters.append({**query, 'in': location, 'example': 'wrong-location.txt'})
                path.write_text(json.dumps(spec, indent=2) + '\n')
                subprocess.run(self.command, check=True, capture_output=True, text=True)
                fixture = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
                expected = query.get('example', query['schema'].get('example'))
                self.assertEqual(fixture['guardedGitFiles']['readQuery']['path'], expected)
                path.write_bytes(original)

    def test_nonquery_parameters_do_not_satisfy_required_query_fields(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/content.json'
        original = path.read_bytes()
        for name in ['path', 'include_revision']:
            for location in ['header', 'path']:
                with self.subTest(parameter=name, location=location):
                    spec = json.loads(original)
                    parameters = spec['paths']['/api/sandboxes/file']['get']['parameters']
                    next(parameter for parameter in parameters if parameter['name'] == name)['in'] = location
                    path.write_text(json.dumps(spec, indent=2) + '\n')
                    failed = subprocess.run(self.command, capture_output=True, text=True)
                    self.assertNotEqual(failed.returncode, 0)
                    self.assertIn('Guarded file read requires', failed.stderr)
                    path.write_bytes(original)

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

