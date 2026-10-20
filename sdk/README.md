# Official Recoup SDKs

Clients for the JSON endpoints documented at [recoupable.dev/docs](https://recoupable.dev/docs).
The existing [Recoup CLI](https://www.npmjs.com/package/@recoupable/cli) serves Node users.
These packages add Python and Go integrations; they do not grant new account access.

| Language | Source | Registry status |
| --- | --- | --- |
| Python 3.10+ | [Python SDK](python/README.md) | [0.1.0 published on PyPI](https://pypi.org/project/recoupable/0.1.0/); clean registry installation and all 14 SDK tests verified |
| Go 1.23+ | [Go SDK](go/README.md) | [v0.1.0 published and indexed](https://pkg.go.dev/github.com/recoupable/marketing/sdk/go@v0.1.0); clean proxy download and race tests verified |

Both initial clients handle API keys or existing Bearer tokens, arbitrary documented
JSON endpoints, response limits, redirects, errors and timeouts. They include an
account-identity helper. They do not claim generated method coverage for every
endpoint, streaming, multipart uploads, OAuth login, or automatic pagination.
MIT licenses apply only to these SDK directories.

## Python publication

Version `0.1.0` is published as [recoupable on PyPI](https://pypi.org/project/recoupable/0.1.0/).
The [release workflow](https://github.com/recoupable/marketing/actions/runs/39378001507)
published the reviewed source at `d7933440caf11d34ac491cb1b4283cc344c6c1ec`.
A fresh registry installation verified the MIT metadata, project links, imports,
and all 14 SDK tests.

Trusted publishing is configured for this project. Keep passwords, recovery codes
and tokens out of Git and chat. The publisher's configuration is:

- Project name: `recoupable`
- Owner: `recoupable`
- Repository: `marketing`
- Workflow filename: `publish-python-sdk.yml`
- Environment: `pypi`

The repository's `pypi` environment allows deployments only from `main`.
For a subsequent release, merge the reviewed version update, then run
**Publish Python SDK** on `main` with that version. The workflow builds
and tests the wheel, then publishes through short-lived OIDC credentials. It does
not require a stored PyPI password or API token. It is never triggered by a PR.
Verify the registry metadata, a clean installation of the new version, and imports
before changing the website or table above to say the release is published.

## Go publication

Version `v0.1.0` is published from reviewed commit
`7c93a8f148978cb2a6399cf6928e80938d2f4ec9` with the annotated tag
`sdk/go/v0.1.0`. A clean `proxy.golang.org` download and race tests passed, and
[pkg.go.dev lists the release](https://pkg.go.dev/github.com/recoupable/marketing/sdk/go@v0.1.0).

For a subsequent release, create its annotated `sdk/go/v<version>` tag on the
reviewed merged commit and push that tag. Check a clean module download through
`proxy.golang.org`, then the
[Go package index](https://pkg.go.dev/github.com/recoupable/marketing/sdk/go).
A public source directory alone is not evidence that the index has ingested a
release. The Go module has no external dependencies. Keep the module path stable.
