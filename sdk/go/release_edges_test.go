package recoupable

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync/atomic"
	"testing"
	"time"
)

func TestAccountIdentityRejectsIncompleteSuccess(t *testing.T) {
	for _, body := range []string{`{}`, `null`, `{"status":"success"}`, `{"status":"error","accountId":"x"}`, `{"status":"success","accountId":""}`} {
		t.Run(body, func(t *testing.T) {
			server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
				w.Header().Set("Content-Type", "application/json")
				fmt.Fprint(w, body)
			}))
			defer server.Close()
			client, _ := New(Options{APIKey: "key", BaseURL: server.URL})
			if _, err := client.GetAccountID(context.Background()); !errors.Is(err, ErrInvalidResponse) {
				t.Fatalf("accepted incomplete identity: %v", err)
			}
		})
	}
}

func TestLargeHTTPErrorPreservesRetryGuidance(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Retry-After", "7")
		w.WriteHeader(429)
		fmt.Fprint(w, strings.Repeat("x", 2048))
	}))
	defer server.Close()
	client, _ := New(Options{APIKey: "key", BaseURL: server.URL, MaxResponseBytes: 1024})
	err := client.Request(context.Background(), "POST", "/api/limited", nil, nil, nil)
	var apiError *APIError
	if !errors.As(err, &apiError) || apiError.Status != 429 || apiError.RetryAfter() != "7" || len(apiError.Body) != 1024 {
		t.Fatalf("lost bounded HTTP error: %v", err)
	}
}

func TestTimeoutDoesNotRetryWrites(t *testing.T) {
	var calls atomic.Int32
	server := httptest.NewServer(http.HandlerFunc(func(_ http.ResponseWriter, r *http.Request) {
		calls.Add(1)
		<-r.Context().Done()
	}))
	defer server.Close()
	client, _ := New(Options{APIKey: "key", BaseURL: server.URL, Timeout: 50 * time.Millisecond})
	err := client.Request(context.Background(), "POST", "/api/stall", nil, nil, nil)
	var transportError *TransportError
	if !errors.As(err, &transportError) || !errors.Is(err, context.DeadlineExceeded) || calls.Load() != 1 {
		t.Fatalf("timeout: %v; calls: %d", err, calls.Load())
	}
}

func TestCredentialFormatting(t *testing.T) {
	options := Options{APIKey: "private-fixture-key"}
	client, _ := New(options)
	for _, value := range []any{options, &options, client, *client} {
		if strings.Contains(fmt.Sprintf("%v %+v %#v", value, value, value), "private-fixture-key") {
			t.Fatalf("credential was exposed for type %T", value)
		}
	}
}
