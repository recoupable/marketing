"""Verify that the Stop fixture reads the authored response example."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ChatStopExampleContractsTest(ResponseContractTestCase):
    def test_pending_start_example_is_read_from_the_response(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/research.json'
        spec = json.loads(path.read_text())
        responses = spec['paths']['/api/chat/{chatId}/stop']['post']['responses']
        responses['503'] = {'content': {'application/json': {
            'schema': {'$ref': '#/components/schemas/StopChatErrorResponse'},
            'examples': {'pendingStart': {'value': {'status': 'error', 'error': 'Changed fixture'}}},
        }}}
        path.write_text(json.dumps(spec, indent=2) + '\n')
        subprocess.run(self.command, check=True, capture_output=True, text=True)
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        response = next(r for r in record['responseSchemas']
                        if r['path'] == '/api/chat/{chatId}/stop' and r['status'] == 503)
        self.assertEqual(response['examples']['pendingStart']['error'], 'Changed fixture')
