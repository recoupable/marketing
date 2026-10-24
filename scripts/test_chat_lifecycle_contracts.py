"""Freeze the optional POST/GET lifecycle query declarations through the shared producer."""
import json
from response_contract_test_case import ResponseContractTestCase


class ChatLifecycleContractsTest(ResponseContractTestCase):
    def test_both_stream_operations_declare_optional_query_opt_in(self):
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        for operation in record['chatLifecycle'].values():
            parameter = next(p for p in operation['parameters'] if p['name'] == 'streamLifecycle')
            self.assertEqual(parameter['in'], 'query')
            self.assertFalse(parameter['required'])
            self.assertEqual(parameter['schema']['type'], 'string')
            self.assertNotIn('enum', parameter['schema'])
            self.assertEqual(parameter['example'], 'explicit-stop-v1')
