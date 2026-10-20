package recoupable

import (
	"errors"
	"math"
	"net/http"
	"net/url"
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
	if options.Timeout < 0 || options.MaxResponseBytes < 0 {
		return nil, errors.New("request limits cannot be negative")
	}
	if options.MaxResponseBytes == math.MaxInt64 {
		return nil, errors.New("MaxResponseBytes must be smaller than math.MaxInt64")
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

// String and GoString redact credentials in ordinary formatting.
func (o Options) String() string   { return "recoupable.Options{credentials:redacted}" }
func (o Options) GoString() string { return o.String() }
