package recoupable

import (
	"errors"
	"fmt"
	"net/http"
)

// ErrInvalidResponse identifies oversized, non-JSON, or undecodable responses.
var ErrInvalidResponse = errors.New("invalid Recoup response")

// APIError contains a non-2xx response. Body may contain sensitive data;
// it is deliberately excluded from Error(). Headers are owned by the error.
type APIError struct {
	Status        int
	Body          []byte
	Headers       http.Header
	BodyTruncated bool
}

func (e *APIError) Error() string { return fmt.Sprintf("Recoup API returned HTTP %d", e.Status) }

// RetryAfter returns the raw Retry-After value (seconds or an HTTP date).
func (e *APIError) RetryAfter() string { return e.Headers.Get("Retry-After") }

// TransportError may occur after a write was performed. The SDK does not retry it.
// Unwrap preserves errors.Is support for context cancellation and deadlines.
type TransportError struct{ Cause error }

func (e *TransportError) Error() string {
	return "Recoup request transport failed; a write may already have completed"
}
func (e *TransportError) Unwrap() error { return e.Cause }
