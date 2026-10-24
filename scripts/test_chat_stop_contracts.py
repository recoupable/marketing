"""Freeze the pending-start Stop response through the shared producer."""
import json
from response_contract_test_case import ResponseContractTestCase


class ChatStopContractsTest(ResponseContractTestCase):
    def test_stop_export_includes_the_pending_start_example(self):
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        responses = {r['status']: r for r in record['responseSchemas']
                     if r['method'] == 'POST' and r['path'] == '/api/chat/{chatId}/stop'}
        self.assertEqual(set(responses), {200, 502, 503, 504})
        self.assertIn('stopped', responses[200]['schema']['required'])
        self.assertEqual(responses[503]['examples']['pendingStart'], {
            'status': 'error', 'error': 'Workflow is still starting; retry Stop shortly',
        })
