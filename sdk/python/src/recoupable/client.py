"""Synchronous JSON client for the documented Recoup platform API."""

import json
from urllib.parse import quote, urlencode
from urllib.request import HTTPRedirectHandler, Request, build_opener

from ._config import validate_config
from ._transport import send_json
from .errors import ResponseError


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
        self._base_url = validate_config(
            api_key, access_token, base_url, timeout, max_response_bytes
        )
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
        result = self.request("GET", "/api/accounts/id")
        if (
            not isinstance(result, dict)
            or result.get("status") != "success"
            or not isinstance(result.get("accountId"), str)
            or not result["accountId"]
        ):
            raise ResponseError("Recoup returned an incomplete account identity.")
        return result

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
        return send_json(self._opener, request, self._timeout, self._maximum)
