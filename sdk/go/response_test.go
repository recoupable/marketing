package recoupable

import (
	"context"
	"errors"
	"math"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestStreamingResponseRejectedBeforeBody(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.WriteHeader(200)
		w.(http.Flusher).Flush()
		<-r.Context().Done()
	}))
	defer server.Close()
	client, _ := New(Options{APIKey: "fixture", BaseURL: server.URL, Timeout: 200 * time.Millisecond})
	err := client.Request(context.Background(), "POST", "/api/stream", nil, nil, nil)
	if !errors.Is(err, ErrInvalidResponse) {
		t.Fatalf("expected immediate unsupported response, got %v", err)
	}
}

func TestEmptyAcceptedWrite(t *testing.T) {
	for _, contentType := range []string{"", "application/json"} {
		t.Run(contentType, func(t *testing.T) {
			server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
				if contentType != "" {
					w.Header().Set("Content-Type", contentType)
				}
				w.WriteHeader(202)
			}))
			defer server.Close()
			client, _ := New(Options{APIKey: "fixture", BaseURL: server.URL})
			out := map[string]string{"existing": "retained"}
			if err := client.Request(context.Background(), "POST", "/api/accepted", nil, nil, &out); err != nil {
				t.Fatal(err)
			}
			if out["existing"] != "retained" {
				t.Fatal("empty response modified output")
			}
		})
	}
}

func TestResponseLimitOverflowExplained(t *testing.T) {
	_, err := New(Options{APIKey: "fixture", MaxResponseBytes: math.MaxInt64})
	if err == nil || !strings.Contains(err.Error(), "MaxResponseBytes") {
		t.Fatalf("missing limit explanation: %v", err)
	}
}
