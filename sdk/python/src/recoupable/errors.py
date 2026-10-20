"""Errors retain response details without putting credentials or response bodies in messages."""


class RecoupError(Exception):
    """Base class for SDK request failures."""


class APIError(RecoupError):
    """A non-success HTTP response. Inspect body and headers explicitly."""

    def __init__(
        self,
        status: int,
        body: object,
        headers: dict[str, str],
        body_truncated: bool = False,
    ):
        self.status = status
        self.body = body
        self.headers = headers
        self.retry_after = headers.get("retry-after")
        self.body_truncated = body_truncated
        super().__init__(f"Recoup API returned HTTP {status}")

    def __reduce__(self):
        return type(self), (self.status, self.body, self.headers, self.body_truncated)


class ResponseError(RecoupError):
    """An oversized or unsupported successful response."""


class TransportError(RecoupError):
    """The transport failed. A write may already have been performed; do not blindly retry."""
