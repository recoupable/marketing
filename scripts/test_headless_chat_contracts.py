"""Keep the published headless error/timing/examples tied to the real producer."""
import json
from response_contract_test_case import ResponseContractTestCase


class HeadlessChatContractsTest(ResponseContractTestCase):
    def test_error_envelope_uses_error_and_optional_validation_path(self):
        spec = json.loads((self.marketing / 'content/docs/source/api-reference/openapi/research.json').read_text())
        error = spec['components']['schemas']['ChatGenerateErrorResponse']
        self.assertEqual(error['required'], ['status', 'error'])
        self.assertIn('error', error['properties'])
        self.assertNotIn('message', error['properties'])
        self.assertNotIn('missing_fields', error['required'])

    def test_all_timing_fields_explicitly_allow_unavailable_values_after_terminal_status(self):
        spec = json.loads((self.marketing / 'content/docs/source/api-reference/openapi/research.json').read_text())
        timing = spec['components']['schemas']['ChatRunStatusResponse']['properties']
        for field, kind in [('createdAt', 'string'), ('startedAt', 'string'), ('completedAt', 'string'), ('durationMs', 'integer')]:
            with self.subTest(field=field):
                self.assertEqual(timing[field]['type'], [kind, 'null'])
                self.assertNotIn('nullable', timing[field])
                self.assertIn('terminal', timing[field]['description'])

    def test_producer_exports_schemas_and_inline_examples_for_the_api_bridge(self):
        published = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())
        api = json.loads((self.api / 'lib/contracts/fixtures/published-docs.json').read_text())
        self.assertEqual(published, api)
        headless = published['headlessChat']
        self.assertEqual(headless['errorSchema']['required'], ['status', 'error'])
        self.assertGreaterEqual(len(headless['requestExamples']), 2)
        self.assertIn('data:text/plain;base64,', json.dumps(headless['requestExamples']))
        self.assertNotIn('$ref', json.dumps(headless))
