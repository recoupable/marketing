# Official Recoup SDKs

Clients for the JSON endpoints documented at [recoupable.dev/docs](https://recoupable.dev/docs).
The existing [Recoup CLI](https://www.npmjs.com/package/@recoupable/cli) serves Node users.
These packages add Python and Go integrations; they do not grant new account access.

| Language | Source | Registry status |
| --- | --- | --- |
| Python 3.10+ | [Python SDK](python/README.md) | Package built and tested; PyPI account/trusted publisher setup is pending |
| Go 1.23+ | [Go SDK](go/README.md) | Module prepared; publish a nested-module tag after merge |

Both initial clients handle API keys or existing Bearer tokens, arbitrary documented
JSON endpoints, response limits, redirects, errors and timeouts. They include an
account-identity helper. They do not claim generated method coverage for every
endpoint, streaming, multipart uploads, OAuth login, or automatic pagination.
MIT licenses apply only to these SDK directories.

## Python publication

The built project name is `recoupable`, version `0.1.0`. No matching public PyPI
package was found during preparation; this does not reserve the name.

The account owner must create/verify a [PyPI account](https://pypi.org/account/register/)
and enable its required two-factor authentication. Keep passwords, recovery codes
and tokens out of Git and chat. Then configure a pending trusted publisher using
[PyPI's publishing settings](https://pypi.org/manage/account/publishing/):

- Project name: `recoupable`
- Owner: `recoupable`
- Repository: `marketing`
- Workflow filename: `publish-python-sdk.yml`
- Environment: `pypi`

Configure the repository's `pypi` environment to allow deployments only from
`main`. Once this PR is merged and the account-owner setup is complete, run
**Publish Python SDK** on `main` with the reviewed version. The workflow builds
and tests the wheel, then publishes through short-lived OIDC credentials. It does
not require a stored PyPI password or API token. It is never triggered by a PR.
Verify the registry metadata, a clean `pip install recoupable==0.1.0`, and imports
before changing the website or table above to say the package is published.

## Go publication

After merge, create the annotated tag `sdk/go/v0.1.0` on the reviewed commit and
push that tag. Check a clean module download through `proxy.golang.org`, then the
[Go package index](https://pkg.go.dev/github.com/recoupable/marketing/sdk/go).
A public source directory alone is not evidence that the index has ingested a
release. The Go module has no external dependencies. Keep the module path stable.
