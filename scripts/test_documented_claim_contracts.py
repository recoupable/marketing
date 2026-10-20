"""Verify documented claim declarations through the real producer command."""
import json
import subprocess
import re
from response_contract_test_case import ResponseContractTestCase


class DocumentedClaimContractsTest(ResponseContractTestCase):
    def test_required_extracted_claims_do_not_silently_default(self):
        source = self.marketing / 'content/docs/source'
        cases = [
            ('releases.json', 'artist', 'Artist scrape description'),
            ('social.json', 'social', 'Social scrape description'),
            ('content.json', 'callback', 'callbackSecret'),
            ('content.json', 'callback_name', 'callbackSecret'),
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
                elif mutation == 'callback':
                    spec['components']['securitySchemes'].pop('callbackSecret')
                else:
                    spec['components']['securitySchemes']['callbackSecret'].pop('name')
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

