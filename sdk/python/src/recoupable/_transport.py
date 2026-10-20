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
            status = response.status
            headers = {key.lower(): value for key, value in response.headers.items()}
            content_type = (
                headers.get("content-type", "").split(";", 1)[0].strip().lower()
            )
            is_json = content_type == "application/json" or content_type.endswith(
                "+json"
            )
            if 200 <= status < 300:
                if status == 204 or headers.get("content-length") == "0":
                    return None
                if content_type and not is_json:
                    raise ResponseError(
                        "Expected JSON; streaming and binary endpoints are not supported."
                    )
            payload = response.read(maximum + 1)
    except (URLError, OSError, HTTPException):
        raise TransportError(
            "Recoup request transport failed; a write may already have completed."
        ) from None
    truncated = len(payload) > maximum
    if not 200 <= status < 300:
        payload = payload[:maximum]
        try:
            error_body = json.loads(payload)
        except (ValueError, UnicodeError, RecursionError):
            error_body = payload.decode("utf-8", errors="replace")
        raise APIError(status, error_body, headers, truncated)
    if truncated:
        raise ResponseError("Recoup response exceeded max_response_bytes.")
    if not payload:
        return None
    if not is_json:
        raise ResponseError(
            "Expected JSON; streaming and binary endpoints are not supported."
        )
    try:
        return json.loads(payload)
    except (ValueError, UnicodeError, RecursionError):
        raise ResponseError("Recoup returned invalid JSON.") from None
