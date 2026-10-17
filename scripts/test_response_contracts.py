"""Exercise the response-schema import and frozen-fixture checks without services."""
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


class ResponseContractsTest(unittest.TestCase):
    def test_import_checks_producer_shapes_and_operation_identity(self):
        root = Path(__file__).resolve().parent.parent
        with tempfile.TemporaryDirectory() as directory:
            workspace = Path(directory)
            marketing = workspace / 'marketing'
            api = workspace / 'api'
            script = marketing / 'scripts/build-contract-examples.py'
            script.parent.mkdir(parents=True)
            shutil.copyfile(root / 'scripts/build-contract-examples.py', script)
            shutil.copytree(root / 'content/docs/source', marketing / 'content/docs/source')
            (marketing / 'content/docs/contracts').mkdir()
            artifact = api / 'lib/contracts/generated/error-responses.json'
            artifact.parent.mkdir(parents=True)
            error = {'type': 'object', 'properties': {'status': {'type': 'string', 'enum': ['error']}, 'error': {'type': 'string'}}, 'required': ['status', 'error']}
            message = {'type': 'object', 'properties': {'status': {'type': 'string', 'enum': ['error']}, 'message': {'type': 'string'}}, 'required': ['status', 'message']}
            artifact.write_text(json.dumps({'ErrorResponse': error, 'MessageErrorResponse': message, 'ErrorOrMessageResponse': {'anyOf': [error, message]}}))
            command = ['python3', str(script), '--api', str(api)]
            subprocess.run(command, check=True, capture_output=True, text=True)
            subprocess.run([*command, '--check'], check=True, capture_output=True, text=True)

            spec_path = marketing / 'content/docs/source/api-reference/openapi/projects.json'
            spec = json.loads(spec_path.read_text())
            self.assertEqual(spec['components']['schemas']['Error'], {'anyOf': [error, message]})
            spec['components']['schemas']['Error'] = error
            spec_path.write_text(json.dumps(spec))
            failed = subprocess.run([*command, '--check'], capture_output=True, text=True)
            self.assertNotEqual(failed.returncode, 0)
            self.assertIn('API-owned response schema', failed.stderr)

            subprocess.run(command, check=True, capture_output=True, text=True)
            fixture_path = api / 'lib/contracts/fixtures/published-docs.json'
            fixture = json.loads(fixture_path.read_text())
            fixture['responseSchemas'][0]['status'] = 200
            fixture_path.write_text(json.dumps(fixture))
            failed = subprocess.run([*command, '--check'], capture_output=True, text=True)
            self.assertNotEqual(failed.returncode, 0)
            self.assertIn('Stale documentation example fixture', failed.stderr)


if __name__ == '__main__':
    unittest.main()
