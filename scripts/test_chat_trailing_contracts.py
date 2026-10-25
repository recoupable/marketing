"""Freeze the bounded trailing-delete reference without claiming writer serialization."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ChatTrailingContractsTest(ResponseContractTestCase):
    def test_status_schemas_and_authored_operation_survive_export(self):
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        operation = record['chatTrailingDelete']
        parameters = {p['name']: p for p in operation['parameters']}
        self.assertEqual(parameters['from_message_id']['in'], 'query')
        self.assertTrue(parameters['from_message_id']['required'])
        self.assertFalse(parameters['account_id']['required'])
        self.assertEqual(operation['security'], [{'apiKeyAuth': []}, {'bearerAuth': []}])
        responses = {r['status']: r for r in record['responseSchemas'] if r['path'] == operation['path']}
        self.assertEqual(set(responses), {200, 400, 401, 403, 404, 409, 500})
        self.assertEqual(responses[200]['schema']['required'], ['status', 'chat_id', 'from_message_id'])
        self.assertIn('anyOf', responses[401]['schema'])
        self.assertEqual(responses[409]['examples']['occupiedSlot']['error'],
                         'Chat has an active workflow reservation; retry after it clears')
        self.assertIn('possibly affecting zero rows', operation['description'])
        self.assertIn('Concurrent edit/resend is unsupported', operation['description'])

    def test_export_reads_authored_narrative_and_examples(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/research.json'
        spec = json.loads(path.read_text())
        operation = spec['paths']['/api/chats/{id}/messages/trailing']['delete']
        operation['description'] = 'Changed bounded operation description'
        operation['responses']['409']['description'] = 'Changed conflict description'
        operation['responses']['409']['content']['application/json']['examples']['occupiedSlot']['value']['error'] = 'Changed example'
        path.write_text(json.dumps(spec, indent=2) + '\n')
        subprocess.run(self.command, check=True, capture_output=True, text=True)
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        self.assertEqual(record['chatTrailingDelete']['description'], operation['description'])
        self.assertEqual(record['chatTrailingDelete']['responseDescriptions']['409'], 'Changed conflict description')
        response = next(r for r in record['responseSchemas'] if r['path'] == '/api/chats/{id}/messages/trailing' and r['status'] == 409)
        self.assertEqual(response['examples']['occupiedSlot']['error'], 'Changed example')
