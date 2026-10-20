"""Validate the single trusted destination and explicit request limits."""

import math
from urllib.parse import urlsplit


def validate_config(api_key, access_token, base_url, timeout, max_response_bytes):
    if (api_key is None) == (access_token is None):
        raise ValueError("Provide exactly one api_key or access_token.")
    credential = api_key if api_key is not None else access_token
    if (
        not isinstance(credential, str)
        or not credential
        or any(ord(c) < 33 or ord(c) > 126 for c in credential)
    ):
        raise ValueError(
            "The credential must be a nonempty ASCII token without whitespace."
        )
    origin = urlsplit(base_url)
    local = origin.hostname in ("localhost", "127.0.0.1", "::1")
    if (
        (origin.scheme != "https" and not (local and origin.scheme == "http"))
        or not origin.hostname
        or origin.username
        or origin.password
        or origin.path not in ("", "/")
        or "?" in base_url
        or "#" in base_url
    ):
        raise ValueError(
            "base_url must be an HTTPS origin (HTTP is allowed only for loopback tests)."
        )
    if (
        isinstance(timeout, bool)
        or not isinstance(timeout, (int, float))
        or not math.isfinite(timeout)
        or timeout <= 0
        or isinstance(max_response_bytes, bool)
        or not isinstance(max_response_bytes, int)
        or max_response_bytes <= 0
    ):
        raise ValueError(
            "timeout and max_response_bytes must be positive finite limits."
        )
    return origin._replace(path="").geturl()
