package recoupable

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

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
	truncated := int64(len(payload)) > c.maximum
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		if truncated {
			payload = payload[:c.maximum]
		}
		return &APIError{Status: response.StatusCode, Body: payload, Headers: response.Header.Clone(), BodyTruncated: truncated}
	}
	if truncated {
		return fmt.Errorf("%w: response exceeded MaxResponseBytes", ErrInvalidResponse)
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
