"""Verify guarded file declarations through the real producer command."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class GuardedFileContractsTest(ResponseContractTestCase):
    def test_scoped_queries_and_response_examples_preserve_legacy_reads(self):
        fixture = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())['guardedGitFiles']
        self.assertNotIn('account_id', fixture['readQuery'])
        self.assertEqual(fixture['scopedReadQuery']['account_id'], fixture['listQuery']['account_id'])
        self.assertEqual(fixture['scopedReadQuery']['path'], fixture['readQuery']['path'])
        for response in fixture['responses']:
            if response['method'] != 'GET':
                continue
            self.assertNotIn('account_id', response['schema']['required'])
            self.assertEqual(response['schema']['properties']['account_id']['format'], 'uuid')
            self.assertTrue(any('account_id' in example for example in response['examples'].values()))
            self.assertTrue(any('account_id' not in example for example in response['examples'].values()))

    def test_invalid_account_override_declarations_fail_before_freezing(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/content.json'
        original = path.read_bytes()
        for route in ['/api/sandboxes', '/api/sandboxes/file']:
            for mutation in ['missing', 'header', 'required', 'format', 'example', 'duplicate']:
                with self.subTest(route=route, mutation=mutation):
                    spec = json.loads(original)
                    parameters = spec['paths'][route]['get']['parameters']
                    account = next(parameter for parameter in parameters if parameter['name'] == 'account_id')
                    if mutation == 'missing':
                        parameters.remove(account)
                    elif mutation == 'header':
                        account['in'] = 'header'
                    elif mutation == 'required':
                        account['required'] = True
                    elif mutation == 'format':
                        account['schema']['format'] = 'uri'
                    elif mutation == 'example':
                        account.pop('example', None)
                        account['schema'].pop('example', None)
                    else:
                        parameters.append(dict(account))
                    path.write_text(json.dumps(spec, indent=2) + '\n')
                    failed = subprocess.run(self.command, capture_output=True, text=True)
                    self.assertNotEqual(failed.returncode, 0)
                    self.assertIn('read requires one optional UUID account_id query and example', failed.stderr)
                    path.write_bytes(original)

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
        for name, remove in [('path', True), ('include_revision', True), ('path', False), ('include_revision', False)]:
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
