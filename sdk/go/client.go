// Package recoupable provides an official JSON client for the Recoup platform API.
package recoupable

import (
	"net/http"
	"net/url"
)

// Client performs JSON requests without following redirects or retrying writes.
// It is safe for concurrent requests after construction.
type Client struct {
	origin    *url.URL
	authName  string
	authValue string
	http      *http.Client
	maximum   int64
}

// String prevents ordinary formatting from printing the credential.
func (c Client) String() string { return "recoupable.Client{credentials:redacted}" }

// GoString also redacts Go-syntax formatting.
func (c Client) GoString() string { return c.String() }
