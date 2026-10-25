"""Keep conditional MCP names in the static source inventory."""
from pathlib import Path
import runpy
import tempfile
import unittest


class McpInventoryTests(unittest.TestCase):
    def test_literal_and_conditional_tool_names_are_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            api = Path(directory)
            tools = api / 'lib/mcp'
            tools.mkdir(parents=True)
            (tools / 'register.ts').write_text('''
server.registerTool('ordinary_tool', {}, handler);
for (const sidebar of [false, true]) {
  server.registerTool(
    sidebar ? "open_recoup_workflows_sidebar" : "open_recoup_workflows",
    {}, handler,
  );
}
''')
            tests = tools / '__tests__'
            tests.mkdir()
            (tests / 'register.test.ts').write_text('server.registerTool("test_only", {}, handler);')
            discover = runpy.run_path(str(Path(__file__).with_name('refresh-contract-inventory.py')))[
                'static_mcp_registrations'
            ]
            self.assertEqual(discover(api), [
                {'name': name, 'source': 'lib/mcp/register.ts'}
                for name in ['open_recoup_workflows', 'open_recoup_workflows_sidebar', 'ordinary_tool']
            ])


if __name__ == '__main__':
    unittest.main()
