package recoupable

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
	"time"
)

func TestJSONAndAccount(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("x-api-key") != "fixture-key" {
			t.Error("missing API key")
		}
		if r.URL.Path != "/api/accounts/id" {
			t.Error("wrong documented path")
		}
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprint(w, `{"status":"success","accountId":"fixture"}`)
	}))
	defer server.Close()
	client, err := New(Options{APIKey: "fixture-key", BaseURL: server.URL})
	if err != nil {
		t.Fatal(err)
	}
	account, err := client.GetAccountID(context.Background())
	if err != nil || account.AccountID != "fixture" {
		t.Fatalf("account: %+v, error: %v", account, err)
	}
	if strings.Contains(fmt.Sprintf("%v %#v", client, client), "fixture-key") {
		t.Fatal("credential in client representation")
	}
}

func TestBodyQueryAndBearer(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") != "Bearer fixture-token" || r.URL.Query().Get("name") != "A & B" {
			t.Error("auth/query mismatch")
		}
		var body map[string]string
		if json.NewDecoder(r.Body).Decode(&body) != nil || body["name"] != "Example" {
			t.Error("body mismatch")
		}
		w.WriteHeader(204)
	}))
	defer server.Close()
	client, _ := New(Options{AccessToken: "fixture-token", BaseURL: server.URL})
	if err := client.Request(context.Background(), "POST", "/api/example", url.Values{"name": {"A & B"}}, map[string]string{"name": "Example"}, nil); err != nil {
		t.Fatal(err)
	}
}

func TestNoRetriesOrRedirects(t *testing.T) {
	for _, status := range []int{302, 429} {
		t.Run(fmt.Sprint(status), func(t *testing.T) {
			calls := 0
			server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				calls++
				w.Header().Set("Location", "/api/leak")
				w.Header().Set("Retry-After", "7")
				w.WriteHeader(status)
				fmt.Fprint(w, `{"error":"fixture"}`)
			}))
			defer server.Close()
			client, _ := New(Options{APIKey: "key", BaseURL: server.URL})
			err := client.Request(context.Background(), "POST", "/api/example", nil, map[string]string{}, nil)
			var apiError *APIError
			if !errors.As(err, &apiError) || apiError.Status != status || apiError.RetryAfter() != "7" || calls != 1 {
				t.Fatalf("error: %v; calls: %d", err, calls)
			}
		})
	}
}

func TestUntrustedPathsAndConfiguration(t *testing.T) {
	client, _ := New(Options{APIKey: "key"})
	for _, path := range []string{"https://evil.invalid/api/x", "//evil.invalid/api/x", "/api/../x", "/api/%2e%2e/x", "/api/a%2fb", "/api/x?q=x", "/api/x#x", "/api/\\evil"} {
		if err := client.Request(context.Background(), "GET", path, nil, nil, nil); err == nil {
			t.Errorf("accepted path %s", path)
		}
	}
	for _, options := range []Options{{}, {APIKey: "a", AccessToken: "b"}, {APIKey: "\n"}, {APIKey: "a", BaseURL: "http://example.com"}, {APIKey: "a", BaseURL: "https://u:p@example.com"}, {APIKey: "a", Timeout: -time.Second}} {
		if _, err := New(options); err == nil {
			t.Fatal("accepted invalid options")
		}
	}
}

func TestResponseLimitsAndCancellation(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		switch r.URL.Path {
		case "/api/large":
			fmt.Fprint(w, strings.Repeat(" ", 2048))
		case "/api/stream":
			w.Header().Set("Content-Type", "text/event-stream")
			fmt.Fprint(w, "data: fixture\n")
		default:
			fmt.Fprint(w, "{")
		}
	}))
	defer server.Close()
	client, _ := New(Options{APIKey: "key", BaseURL: server.URL, MaxResponseBytes: 1024})
	for _, path := range []string{"/api/large", "/api/stream", "/api/invalid"} {
		if err := client.Request(context.Background(), "GET", path, nil, nil, nil); !errors.Is(err, ErrInvalidResponse) {
			t.Errorf("unexpected response error: %v", err)
		}
	}
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	if err := client.Request(ctx, "GET", "/api/example", nil, nil, nil); !errors.Is(err, context.Canceled) {
		t.Fatalf("cancellation: %v", err)
	}
}
