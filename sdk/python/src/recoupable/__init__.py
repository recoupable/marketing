"""Official Recoup Python client for JSON platform endpoints."""

from .client import Client
from .errors import APIError, RecoupError, ResponseError, TransportError

__all__ = ["APIError", "Client", "RecoupError", "ResponseError", "TransportError"]
__version__ = "0.1.0"
