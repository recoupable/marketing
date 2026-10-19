"""Keep connection-specific Context tables synchronized with canonical metadata."""
import json
import re


def refresh_context_mapping(document, path, check):
    context_operation = document['paths']['/api/context']['post']
    mcp = context_operation['x-recoup-mcp-operations']
    standard_mcp = context_operation['x-recoup-standard-mcp-operations']
    if set(mcp) & set(standard_mcp):
        raise SystemExit('Standard-only Context actions cannot appear in the delegated MCP mapping.')
    table = '\n'.join([
        '| REST action | Delegated OAuth tool | Classification |',
        '| --- | --- | --- |',
        *[f'| `{action}` | `{item["name"]}` | {"Read-only hint" if item["readOnly"] else "Writes or dispatches"} |' for action, item in mcp.items()],
    ])
    description = context_operation['description']
    table_start = '| REST action | Delegated OAuth tool | Classification |'
    if table_start not in description:
        raise SystemExit('Context description is missing the generated MCP mapping table.')
    standard_header = '| REST action | Standard MCP tool | Classification |'
    standard_table = '\n'.join([
        standard_header,
        '| --- | --- | --- |',
        *[f'| `{action}` | `{item["name"]}` | {"Read-only hint" if item["readOnly"] else "Writes"} |' for action, item in standard_mcp.items()],
    ])
    standard_section = '\n'.join([
        '### Standard-only evidence tools',
        '',
        'These tools are available to standard MCP clients after the required database/API release. They are excluded from delegated OAuth connections pending organization-grant review.',
        '',
        standard_table,
    ])
    def replace_table(text, header, replacement):
        match = re.search(re.escape(header) + r'(?:\n\|[^\n]*)+', text)
        if not match:
            raise SystemExit('Context description is missing generated table rows.')
        return text[:match.start()] + replacement + text[match.end():]
    expected_description = replace_table(description, table_start, table)
    if standard_header in expected_description:
        expected_description = replace_table(expected_description, standard_header, standard_table)
    elif '### Standard-only evidence tools' in expected_description:
        raise SystemExit('Context standard-only section is missing its generated table.')
    else:
        expected_description += '\n\n' + standard_section
    if check and description != expected_description:
        raise SystemExit('Stale Context MCP mapping table; regenerate it from the canonical metadata.')
    if not check and description != expected_description:
        context_operation['description'] = expected_description
        path.write_text(json.dumps(document, indent=2, ensure_ascii=False) + '\n')
