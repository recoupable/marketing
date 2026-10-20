"""Synchronous JSON client for the documented Recoup platform API."""

import json
import math
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

from .errors import APIError, ResponseError, TransportError


class _NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, message, headers, new_url):
        return None


class Client:
    """Use exactly one API key or access token. Requests are never automatically retried."""

    def __init__(
        self,
        *,
        api_key: str | None = None,
        access_token: str | None = None,
        base_url: str = "https://api.recoupable.dev",
        timeout: float = 30,
        max_response_bytes: int = 16 * 1024 * 1024,
    ):
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
            or origin.query
            or origin.fragment
        ):
            raise ValueError(
                "base_url must be an HTTPS origin (HTTP is allowed only for loopback tests)."
            )
        if (
            not math.isfinite(timeout)
            or timeout <= 0
            or not isinstance(max_response_bytes, int)
            or max_response_bytes <= 0
        ):
            raise ValueError(
                "timeout and max_response_bytes must be positive finite limits."
            )
        self._base_url = base_url.rstrip("/")
        self._auth = (
            {"x-api-key": api_key}
            if api_key is not None
            else {"Authorization": f"Bearer {access_token}"}
        )
        self._timeout = timeout
        self._maximum = max_response_bytes
        self._opener = build_opener(_NoRedirect())

    def get_account_id(self) -> object:
        """GET /api/accounts/id: identify the account associated with these credentials."""
        return self.request("GET", "/api/accounts/id")

    def request(
        self, method: str, path: str, *, query: dict | None = None, body: object = None
    ) -> object:
        """Call a documented /api/ JSON endpoint; returns decoded JSON or None for HTTP 204.

        Supply an unencoded path and a query mapping. Streaming and multipart endpoints
        are outside this client's scope. The timeout bounds blocking socket operations.
        """
        if (
            not isinstance(path, str)
            or not path.startswith("/api/")
            or any(c in path for c in "\\%?#")
            or any(ord(c) < 32 for c in path)
            or any(segment in (".", "..") for segment in path.split("/"))
        ):
            raise ValueError(
                "path must be an unencoded /api/ path without traversal, query, or fragment."
            )
        method = method.upper()
        if method not in ("GET", "POST", "PUT", "PATCH", "DELETE"):
            raise ValueError("Unsupported JSON request method.")
        if method == "GET" and body is not None:
            raise ValueError("GET requests cannot contain a body.")
        url = self._base_url + quote(path, safe="/-._~")
        if query:
            url += "?" + urlencode(query, doseq=True)
        headers = {
            **self._auth,
            "Accept": "application/json",
            "User-Agent": "recoupable-python/0.1.0",
        }
        data = None
        if body is not None:
            data = json.dumps(body, allow_nan=False).encode("utf-8")
            headers["Content-Type"] = "application/json"
        request = Request(url, data=data, headers=headers, method=method)
        try:
            try:
                response = self._opener.open(request, timeout=self._timeout)
            except HTTPError as error:
                response = error
            with response:
                payload = response.read(self._maximum + 1)
                status = response.status
                response_headers = {
                    key.lower(): value for key, value in response.headers.items()
                }
        except (URLError, OSError, TimeoutError):
            raise TransportError(
                "Recoup request transport failed; a write may already have completed."
            ) from None
        if len(payload) > self._maximum:
            raise ResponseError("Recoup response exceeded max_response_bytes.")
        if not 200 <= status < 300:
            try:
                error_body = json.loads(payload)
            except (ValueError, UnicodeError):
                error_body = payload.decode("utf-8", errors="replace")
            raise APIError(status, error_body, response_headers)
        if status == 204:
            return None
        content_type = (
            response_headers.get("content-type", "").split(";", 1)[0].strip().lower()
        )
        if content_type != "application/json" and not content_type.endswith("+json"):
            raise ResponseError(
                "Expected JSON; streaming and binary endpoints are not supported."
            )
        try:
            return json.loads(payload)
        except (ValueError, UnicodeError):
            raise ResponseError("Recoup returned invalid JSON.") from None
