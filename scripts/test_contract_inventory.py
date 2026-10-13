"""Verify root/dotted routes and preflight discovery without network access."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


class InventoryTests(unittest.TestCase):
    def test_root_dotted_routes_and_options_are_classified(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            marketing = root / 'marketing'
            scripts = marketing / 'scripts'
            scripts.mkdir(parents=True)
            script = scripts / 'refresh-contract-inventory.py'
            shutil.copyfile(Path(__file__).with_name(script.name), script)
            specs = marketing / 'content/docs/source/api-reference/openapi'
            specs.mkdir(parents=True)
            (specs / 'fixture.json').write_text(json.dumps({'paths': {
                '/api': {'get': {}}, '/api/.well-known/x': {'get': {}}
            }}))
            contracts = marketing / 'content/docs/contracts'
            contracts.mkdir(parents=True)
            (contracts / 'operation-dispositions.json').write_text('{}')
            api = root / 'api'
            routes = api / 'app/api'
            routes.mkdir(parents=True)
            (routes / 'route.ts').write_text('export function GET() {}\nexport function OPTIONS() {}')
            dotted = routes / '.well-known/x'
            dotted.mkdir(parents=True)
            (dotted / 'route.ts').write_text('export const GET = handler;')
            lipsync = routes / 'content/lipsync'
            lipsync.mkdir(parents=True)
            (lipsync / 'route.ts').write_text('export function POST() {}\nexport function OPTIONS() {}')
            (api / 'lib/mcp').mkdir(parents=True)
            binary = root / 'bin'
            binary.mkdir()
            git = binary / 'git'
            git.write_text('#!/usr/bin/env python3\nprint("a" * 40)\n')
            git.chmod(0o755)
            env = {**os.environ, 'PATH': str(binary) + os.pathsep + os.environ['PATH']}
            command = ['python3', str(script), '--api', str(api)]
            subprocess.run(command, env=env, check=True, capture_output=True)
            record = json.loads((contracts / 'operation-inventory.json').read_text())
            operations = {(row['method'], row['path']): row for row in record['operations']}
            self.assertEqual(set(operations), {
                ('GET', '/api'), ('GET', '/api/.well-known/x'), ('OPTIONS', '/api'),
                ('POST', '/api/content/lipsync'), ('OPTIONS', '/api/content/lipsync')
            })
            self.assertTrue(all(row['implementation'] for row in operations.values()))
            self.assertEqual(operations[('OPTIONS', '/api')]['classification'], 'internal')
            self.assertEqual(operations[('OPTIONS', '/api/content/lipsync')]['classification'], 'internal')
            self.assertEqual(operations[('POST', '/api/content/lipsync')]['classification'], 'pending')
            subprocess.run([*command, '--check'], env=env, check=True, capture_output=True)
            spec_path = specs / 'fixture.json'
            spec = json.loads(spec_path.read_text())
            spec['paths']['/api/missing'] = {'get': {'description': 'Read the promised feature.'}}
            spec_path.write_text(json.dumps(spec))
            failed = subprocess.run(command, env=env, capture_output=True, text=True)
            self.assertNotEqual(failed.returncode, 0)
            self.assertIn('GET /api/missing', failed.stderr)
            spec['paths']['/api/missing']['get'].update({
                'x-recoup-availability': 'pending',
                'description': '**Availability: pending reconciliation.** Retain the feature ticket.',
            })
            spec_path.write_text(json.dumps(spec))
            subprocess.run(command, env=env, check=True, capture_output=True)


if __name__ == '__main__':
    unittest.main()
