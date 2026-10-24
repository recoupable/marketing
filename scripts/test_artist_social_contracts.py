"""Verify artist social declarations through the normal shared-fixture producer."""
import json
import subprocess
from response_contract_test_case import ResponseContractTestCase


class ArtistSocialContractsTest(ResponseContractTestCase):
    def test_artist_social_arrays_follow_the_actual_response_references(self):
        path = self.marketing / 'content/docs/source/api-reference/openapi/releases.json'
        spec = json.loads(path.read_text())
        for name, component in [('list', 'Artist'), ('update', 'UpdatedArtist')]:
            spec['components']['schemas'][component]['properties']['account_socials'] = {
                'type': 'array', 'items': {'type': 'object', 'description': name},
            }
        path.write_text(json.dumps(spec, indent=2) + '\n')
        subprocess.run(self.command, check=True, capture_output=True, text=True)
        record = json.loads((self.marketing / 'content/docs/contracts/example-cases.json').read_text())['artistSocials']
        for name, method, route in [('list', 'GET', '/api/artists'), ('update', 'PATCH', '/api/artists/{id}')]:
            self.assertEqual(record['responses'][name], {
                'method': method, 'path': route, 'status': 200,
                'schema': {'type': 'array', 'items': {'type': 'object', 'description': name}},
            })
