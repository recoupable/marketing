"""Ensure the producer CI entry command cannot pass an empty suite."""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest


class SuiteRunnerContractsTest(unittest.TestCase):
    def test_empty_discovery_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            runner = Path(directory) / 'test_response_contracts.py'
            shutil.copyfile(Path(__file__).with_name(runner.name), runner)
            result = subprocess.run([sys.executable, '-B', str(runner)], capture_output=True, text=True)
            self.assertIn('Ran 0 tests', result.stderr)
            self.assertNotEqual(result.returncode, 0, result.stderr)
