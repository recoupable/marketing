"""Exercise publication output and fail-closed stale-page handling without a real checkout."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


class PublicationTests(unittest.TestCase):
    def test_copy_provenance_branding_and_stale_page(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            repo = root / 'marketing'
            scripts = repo / 'scripts'
            scripts.mkdir(parents=True)
            shutil.copyfile(Path(__file__).with_name('sync-legacy-docs.py'), scripts / 'sync-legacy-docs.py')
            source = repo / 'content/docs/source'
            source.mkdir(parents=True)
            navigation = {'tabs': []}
            (source / 'docs.json').write_text(json.dumps({'navigation': navigation}))
            (source / 'guide.mdx').write_text('A maintained guide')
            target = root / 'docs'
            target.mkdir()
            (target / 'docs.json').write_text(json.dumps({'theme': 'mint', 'name': 'Recoup', 'navigation': {'old': []}}))
            binary = root / 'bin'
            binary.mkdir()
            git = binary / 'git'
            git.write_text('#!/usr/bin/env python3\nimport sys\nif "rev-parse" in sys.argv: print("a" * 40)\n')
            git.chmod(0o755)
            env = {**os.environ, 'PATH': str(binary) + os.pathsep + os.environ['PATH']}
            command = ['python3', str(scripts / 'sync-legacy-docs.py'), '--target', str(target)]
            subprocess.run(command, env=env, check=True, capture_output=True)
            config = json.loads((target / 'docs.json').read_text())
            self.assertEqual(config, {'theme': 'mint', 'name': 'Recoup', 'navigation': navigation})
            pin = json.loads((target / 'SOURCE-PROVENANCE.json').read_text())
            self.assertEqual(pin['commit'], 'a' * 40)
            self.assertEqual(pin['files'][0]['sha256'], hashlib.sha256(b'A maintained guide').hexdigest())
            (target / 'extra.mdx').write_text('Unmapped')
            result = subprocess.run(command, env=env, capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('extra.mdx', result.stderr)
            self.assertTrue((target / 'extra.mdx').exists())
            (target / 'extra.mdx').unlink()
            extra_spec = target / 'api-reference/openapi/extra.json'
            extra_spec.parent.mkdir(parents=True)
            extra_spec.write_text('{}')
            result = subprocess.run(command, env=env, capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('extra.json', result.stderr)
            extra_spec.unlink()
            (source / 'guide.mdx').unlink()
            result = subprocess.run(command, env=env, capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('guide.mdx', result.stderr)


if __name__ == '__main__':
    unittest.main()
