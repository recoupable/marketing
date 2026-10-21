"""Isolate documentation producer tests from services and real repositories."""
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


class ResponseContractTestCase(unittest.TestCase):
    def setUp(self):
        root = Path(__file__).resolve().parent.parent
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        real_workspace = Path(temporary.name) / 'resolved-workspace'
        real_workspace.mkdir()
        workspace = Path(temporary.name) / 'workspace-link'
        workspace.symlink_to(real_workspace, target_is_directory=True)
        self.marketing, self.api = workspace / 'marketing', workspace / 'api'
        script = self.marketing / 'scripts/build-contract-examples.py'
        script.parent.mkdir(parents=True)
        for name in ['build-contract-examples.py', 'build_response_contracts.py', 'resolve_response_schema.py',
                     'refresh_context_mapping.py', 'build_published_docs_record.py',
                     'build_guarded_file_contract.py', 'build_context_fixture.py',
                     'build_plan_balance_contract.py', 'build_sites_lifecycle_contract.py',
                     'build_admin_coding_slack_contract.py', 'build_agent_signup_metadata_contract.py']:
            shutil.copyfile(root / 'scripts' / name, script.parent / name)
        shutil.copytree(root / 'content/docs/source', self.marketing / 'content/docs/source')
        (self.marketing / 'content/docs/contracts').mkdir()
        artifact = self.api / 'lib/contracts/generated/error-responses.json'
        artifact.parent.mkdir(parents=True)
        self.error = {'type': 'object', 'properties': {'status': {'type': 'string', 'enum': ['error']}, 'error': {'type': 'string'}}, 'required': ['status', 'error']}
        message = {'type': 'object', 'properties': {'status': {'type': 'string', 'enum': ['error']}, 'message': {'type': 'string'}}, 'required': ['status', 'message']}
        self.authentication = {'anyOf': [self.error, message]}
        artifact.write_text(json.dumps({'ErrorResponse': self.error, 'MessageErrorResponse': message, 'AuthenticationErrorResponse': self.authentication}))
        self.command = ['python3', str(script), '--api', str(self.api)]
        result = subprocess.run(self.command, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)

