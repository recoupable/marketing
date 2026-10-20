"""Bound response reads while preserving HTTP status and retry guidance."""

import json
from http.client import HTTPException
from urllib.error import HTTPError, URLError

from .errors import APIError, ResponseError, TransportError


def send_json(opener, request, timeout, maximum):
    try:
        try:
            response = opener.open(request, timeout=timeout)
        except HTTPError as error:
            response = error
        with response:
            payload = response.read(maximum + 1)
            status = response.status
            headers = {key.lower(): value for key, value in response.headers.items()}
    except (URLError, OSError, HTTPException):
        raise TransportError(
            "Recoup request transport failed; a write may already have completed."
        ) from None
    truncated = len(payload) > maximum
    if not 200 <= status < 300:
        payload = payload[:maximum]
        try:
            error_body = json.loads(payload)
        except (ValueError, UnicodeError):
            error_body = payload.decode("utf-8", errors="replace")
        raise APIError(status, error_body, headers, truncated)
    if truncated:
        raise ResponseError("Recoup response exceeded max_response_bytes.")
    if status == 204:
        return None
    content_type = headers.get("content-type", "").split(";", 1)[0].strip().lower()
    if content_type != "application/json" and not content_type.endswith("+json"):
        raise ResponseError(
            "Expected JSON; streaming and binary endpoints are not supported."
        )
    try:
        return json.loads(payload)
    except (ValueError, UnicodeError):
        raise ResponseError("Recoup returned invalid JSON.") from None
