"""Errors retain response details without putting credentials or response bodies in messages."""


class RecoupError(Exception):
    """Base class for SDK request failures."""


class APIError(RecoupError):
    """A non-success HTTP response. Inspect body and headers explicitly."""

    def __init__(self, status: int, body: object, headers: dict[str, str]):
        self.status = status
        self.body = body
        self.headers = headers
        self.retry_after = headers.get("retry-after")
        super().__init__(f"Recoup API returned HTTP {status}")


class ResponseError(RecoupError):
    """An oversized response or a successful response that is not supported JSON."""


class TransportError(RecoupError):
    """The transport failed. A write may already have been performed; do not blindly retry."""
