package recoupable

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

func readResponse(response *http.Response, maximum int64, out any) error {
	success := response.StatusCode >= 200 && response.StatusCode < 300
	contentType := strings.ToLower(strings.TrimSpace(strings.SplitN(response.Header.Get("Content-Type"), ";", 2)[0]))
	isJSON := contentType == "application/json" || strings.HasSuffix(contentType, "+json")
	if success {
		if response.StatusCode == 204 || response.ContentLength == 0 {
			return nil
		}
		if contentType != "" && !isJSON {
			return fmt.Errorf("%w: expected JSON; streaming and binary endpoints are unsupported", ErrInvalidResponse)
		}
	}
	payload, err := io.ReadAll(io.LimitReader(response.Body, maximum+1))
	if err != nil {
		return &TransportError{Cause: err}
	}
	truncated := int64(len(payload)) > maximum
	if !success {
		if truncated {
			payload = payload[:maximum]
		}
		return &APIError{Status: response.StatusCode, Body: payload, Headers: response.Header.Clone(), BodyTruncated: truncated}
	}
	if truncated {
		return fmt.Errorf("%w: response exceeded MaxResponseBytes", ErrInvalidResponse)
	}
	if len(payload) == 0 {
		return nil
	}
	if !isJSON || !json.Valid(payload) {
		return fmt.Errorf("%w: expected valid JSON", ErrInvalidResponse)
	}
	if out == nil {
		return nil
	}
	if err := json.Unmarshal(payload, out); err != nil {
		return fmt.Errorf("%w: cannot decode response: %v", ErrInvalidResponse, err)
	}
	return nil
}
