# Recoup Python SDK

Official Python client for the [Recoup platform API](https://recoupable.dev/docs).
Python 3.10+, with no runtime dependencies. This initial release supports JSON
requests, API-key and Bearer authentication, structured HTTP errors, response-size
bounds, and explicit timeouts. It does not implement SSE, multipart uploads,
OAuth login, pagination automation, or automatic retries.

## Install from source

```sh
python -m pip install 'git+https://github.com/recoupable/marketing.git#subdirectory=sdk/python'
```

A PyPI release is being prepared; the source installation is the available path
until a registry release is verified. Pin a commit for reproducible deployments.

```python
import os
from recoupable import APIError, Client

client = Client(api_key=os.environ["RECOUP_API_KEY"])
account = client.get_account_id()
print(account)

# Call another documented JSON endpoint without waiting for a generated method.
# response = client.request("GET", "/api/your-endpoint", query={"limit": 10})
```

Use `Client(access_token=...)` for an existing access token. Supply exactly one
credential; the SDK never reads environment variables or signs in implicitly.
The default origin is `https://api.recoupable.dev`. A custom HTTPS origin is an
explicit trusted destination for your credential; HTTP is restricted to loopback.
Redirects are not followed, and `/api/` paths cannot contain traversal or a new
origin. Pass unencoded paths and use the `query` argument for query parameters.

`client.request(method, path, query=..., body=...)` returns decoded JSON or `None`
for HTTP 204. The default response cap is 16 MiB; `max_response_bytes` overrides it.
`timeout` defaults to 30 seconds per blocking socket operation, not a total deadline.

Catch `APIError` for non-2xx responses and inspect `status`, `body`, `headers`, or
`retry_after` (the raw Retry-After value, which may be seconds or an HTTP date).
Catch `ResponseError` for oversized/non-JSON responses and `TransportError` for
network failures. Error strings omit response bodies and credentials. Treat error
bodies as potentially sensitive when logging. No request is automatically retried:
a failed connection or timeout may follow a successfully performed write.

## Development

```sh
PYTHONPATH=src python -m unittest discover -s tests
uv build
```

Tests use an isolated local HTTP server and synthetic credentials. No production
account data or paid operations are needed. MIT licensed; see `LICENSE`.
