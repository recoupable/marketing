"""Freeze the optional POST/GET lifecycle query declarations through the shared producer."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ChatLifecycleExportTest(ResponseContractTestCase):
    def test_export_reads_the_authored_query_declaration(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/research.json'
        spec = json.loads(path.read_text())
        for route, method in [('/api/chat', 'post'), ('/api/chat/{chatId}/stream', 'get')]:
            operation = spec['paths'][route][method]
            operation['parameters'] = [{'name': 'streamLifecycle', 'in': 'query', 'required': False,
                                        'schema': {'type': 'string'}, 'description': route}]
        path.write_text(json.dumps(spec, indent=2) + '\n')
        subprocess.run(self.command, check=True, capture_output=True, text=True)
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        for operation in record['chatLifecycle'].values():
            self.assertEqual(operation['parameters'][0]['description'], operation['path'])
