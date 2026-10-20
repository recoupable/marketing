# Recoup Go SDK

Official Go client for the [Recoup platform API](https://recoupable.dev/docs).
Go 1.23+, no external dependencies. Supports JSON endpoints, API-key and Bearer
authentication, structured errors, context cancellation, and explicit request
limits. SSE, multipart uploads, OAuth login, pagination automation and automatic
retries are outside this initial release's scope.

Install the published release:

```sh
go get github.com/recoupable/marketing/sdk/go@v0.1.0
```

Pin a released version in production. This nested module uses Git tags shaped
like `sdk/go/v0.1.0`. The repository root is a separate website, not a Go module.

```go
package main

import (
    "context"
    "log"
    "os"

    recoupable "github.com/recoupable/marketing/sdk/go"
)

func main() {
    client, err := recoupable.New(recoupable.Options{APIKey: os.Getenv("RECOUP_API_KEY")})
    if err != nil { log.Fatal(err) }
    account, err := client.GetAccountID(context.Background())
    if err != nil { log.Fatal(err) }
    log.Print(account.AccountID)
}
```

Use `Options{AccessToken: ...}` for an existing access token. Supply exactly one
credential; the SDK does not sign in or read environment variables implicitly.
`Request(ctx, method, path, query, body, out)` works with documented JSON routes.
Pass an unencoded `/api/` path, `url.Values` for query parameters, an encodable
body (or nil), and a response pointer (or nil). Empty successful responses,
including HTTP 204, leave `out` unchanged.

The default origin is `https://api.recoupable.dev`. A custom HTTPS `BaseURL` is an
explicit trusted destination for your credential; HTTP is restricted to loopback.
Redirects are not followed, and paths cannot escape `/api/`. The default timeout
is a 30-second total HTTP request deadline, including body reads; callers can set
an earlier context deadline. The default response cap is 16 MiB. Override these
with positive `Timeout` and `MaxResponseBytes`; zero selects defaults.

Use `errors.As(err, &apiError)` with a `*recoupable.APIError` for HTTP failures;
inspect `Status`, `Body`, `Headers`, or `RetryAfter()` explicitly. Retry-After may
be seconds or an HTTP date. Error strings omit response bodies and credentials.
Oversized HTTP error bodies are capped with `BodyTruncated=true`; status and
headers remain available. Oversized success bodies return `ErrInvalidResponse`.
Treat response bodies as sensitive when logging. Use `errors.Is` with
`ErrInvalidResponse` or `context.Canceled`. `TransportError` preserves the cause.
The SDK adds no retry loop. Go's standard transport may retry idempotent
requests on a reused connection; this client does not retry writes. A transport
failure can follow a completed write. The client is safe for concurrent requests after construction.

Run `go test -race ./...` and `go vet ./...`. Tests use local HTTP servers and
synthetic credentials. MIT licensed; see `LICENSE`.
