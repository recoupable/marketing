// Package recoupable provides an official JSON client for the Recoup platform API.
package recoupable

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// Options configures a trusted API origin and exactly one credential.
// Zero Timeout and MaxResponseBytes use the documented defaults.
type Options struct {
	APIKey           string
	AccessToken      string
	BaseURL          string
	Timeout          time.Duration
	MaxResponseBytes int64
}

// Client performs JSON requests without following redirects or retrying writes.
// It is safe for concurrent requests after construction.
type Client struct {
	origin    *url.URL
	authName  string
	authValue string
	http      *http.Client
	maximum   int64
}

// New defaults to api.recoupable.dev, a 30-second total request deadline, and 16 MiB.
// A custom HTTPS origin is an explicit trusted destination for your credential.
func New(options Options) (*Client, error) {
	if (options.APIKey == "") == (options.AccessToken == "") {
		return nil, errors.New("provide exactly one API key or access token")
	}
	credential := options.APIKey
	authName, authValue := "x-api-key", credential
	if options.AccessToken != "" {
		credential = options.AccessToken
		authName = "Authorization"
		authValue = "Bearer " + credential
	}
	for _, c := range credential {
		if c < 33 || c > 126 {
			return nil, errors.New("credential must be an ASCII token without whitespace")
		}
	}
	base := options.BaseURL
	if base == "" {
		base = "https://api.recoupable.dev"
	}
	origin, err := url.Parse(base)
	if err != nil {
		return nil, errors.New("base URL must be an HTTPS origin")
	}
	local := origin.Hostname() == "localhost" || origin.Hostname() == "127.0.0.1" || origin.Hostname() == "::1"
	if origin.Hostname() == "" || (origin.Scheme != "https" && !(local && origin.Scheme == "http")) || origin.User != nil || (origin.Path != "" && origin.Path != "/") || origin.RawQuery != "" || origin.ForceQuery || origin.Fragment != "" {
		return nil, errors.New("base URL must be an HTTPS origin; HTTP is allowed only for loopback tests")
	}
	if options.Timeout < 0 || options.MaxResponseBytes < 0 || options.MaxResponseBytes == math.MaxInt64 {
		return nil, errors.New("request limits cannot be negative")
	}
	if options.Timeout == 0 {
		options.Timeout = 30 * time.Second
	}
	if options.MaxResponseBytes == 0 {
		options.MaxResponseBytes = 16 * 1024 * 1024
	}
	client := &http.Client{Timeout: options.Timeout, CheckRedirect: func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse }}
	return &Client{origin: origin, authName: authName, authValue: authValue, http: client, maximum: options.MaxResponseBytes}, nil
}

// String prevents ordinary formatting from printing the credential.
func (c *Client) String() string { return "recoupable.Client{credentials:redacted}" }

// GoString also redacts Go-syntax formatting.
func (c *Client) GoString() string { return c.String() }

// Request calls a documented JSON endpoint. path is an unencoded /api/ path;
// query is encoded separately. out may be nil or a pointer for JSON decoding.
// HTTP 204 returns nil without modifying out. SSE and multipart are unsupported.
func (c *Client) Request(ctx context.Context, method, path string, query url.Values, body, out any) error {
	if !strings.HasPrefix(path, "/api/") || strings.ContainsAny(path, "\\%?#") {
		return errors.New("provide an unencoded /api/ path without query or fragment")
	}
	for _, part := range strings.Split(path, "/") {
		if part == "." || part == ".." {
			return errors.New("path traversal is not allowed")
		}
	}
	for _, r := range path {
		if r < 32 {
			return errors.New("path contains a control character")
		}
	}
	method = strings.ToUpper(method)
	switch method {
	case "GET", "POST", "PUT", "PATCH", "DELETE":
	default:
		return errors.New("unsupported JSON request method")
	}
	if method == "GET" && body != nil {
		return errors.New("GET requests cannot contain a body")
	}
	target := *c.origin
	target.Path = path
	target.RawPath = ""
	target.RawQuery = query.Encode()
	var reader io.Reader
	if body != nil {
		encoded, err := json.Marshal(body)
		if err != nil {
			return err
		}
		reader = bytes.NewReader(encoded)
	}
	request, err := http.NewRequestWithContext(ctx, method, target.String(), reader)
	if err != nil {
		return err
	}
	request.Header.Set(c.authName, c.authValue)
	request.Header.Set("Accept", "application/json")
	request.Header.Set("User-Agent", "recoupable-go/0.1.0")
	if body != nil {
		request.Header.Set("Content-Type", "application/json")
	}
	response, err := c.http.Do(request)
	if err != nil {
		return &TransportError{Cause: err}
	}
	defer response.Body.Close()
	payload, err := io.ReadAll(io.LimitReader(response.Body, c.maximum+1))
	if err != nil {
		return &TransportError{Cause: err}
	}
	if int64(len(payload)) > c.maximum {
		return fmt.Errorf("%w: response exceeded MaxResponseBytes", ErrInvalidResponse)
	}
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return &APIError{Status: response.StatusCode, Body: payload, Headers: response.Header.Clone()}
	}
	if response.StatusCode == 204 {
		return nil
	}
	contentType := strings.ToLower(strings.TrimSpace(strings.SplitN(response.Header.Get("Content-Type"), ";", 2)[0]))
	if contentType != "application/json" && !strings.HasSuffix(contentType, "+json") {
		return fmt.Errorf("%w: expected JSON; streaming and binary endpoints are unsupported", ErrInvalidResponse)
	}
	if !json.Valid(payload) {
		return fmt.Errorf("%w: invalid JSON", ErrInvalidResponse)
	}
	if out == nil {
		return nil
	}
	if err := json.Unmarshal(payload, out); err != nil {
		return fmt.Errorf("%w: cannot decode response: %v", ErrInvalidResponse, err)
	}
	return nil
}
