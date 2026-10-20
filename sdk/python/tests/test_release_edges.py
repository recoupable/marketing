import copy
import json
import pickle
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from recoupable import APIError, Client, ResponseError, TransportError


class EdgeHandler(BaseHTTPRequestHandler):
    payload = b"{}"
    calls = 0

    def log_message(self, *_):
        pass

    def do_POST(self):
        self.do_GET()

    def do_GET(self):
        EdgeHandler.calls += 1
        if self.path == "/api/stall":
            self.server.release.wait(2)
            return
        self.send_response(429 if self.path == "/api/large-error" else 200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Retry-After", "7")
        if self.path == "/api/malformed":
            self.send_header("Transfer-Encoding", "chunked")
        self.end_headers()
        self.wfile.write(
            b"bad-chunk\r\n" if self.path == "/api/malformed" else self.payload
        )


class ReleaseEdges(unittest.TestCase):
    def setUp(self):
        EdgeHandler.calls = 0
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), EdgeHandler)
        self.server.release = threading.Event()
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.origin = f"http://127.0.0.1:{self.server.server_port}"

    def tearDown(self):
        self.server.release.set()
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def test_account_identity_requires_success_and_nonempty_id(self):
        client = Client(api_key="key", base_url=self.origin)
        for result in [
            None,
            {},
            {"status": "success"},
            {"status": "error", "accountId": "x"},
            {"status": "success", "accountId": ""},
        ]:
            EdgeHandler.payload = json.dumps(result).encode()
            with self.subTest(result=result), self.assertRaises(ResponseError):
                client.get_account_id()

    def test_large_http_error_preserves_status_and_is_bounded(self):
        EdgeHandler.payload = b"x" * 2048
        client = Client(api_key="key", base_url=self.origin, max_response_bytes=1024)
        with self.assertRaises(APIError) as caught:
            client.request("POST", "/api/large-error", body={})
        error = caught.exception
        self.assertEqual((error.status, error.retry_after), (429, "7"))
        self.assertEqual(len(error.body), 1024)
        self.assertTrue(error.body_truncated)
        self.assertEqual(EdgeHandler.calls, 1)
        for restored in [copy.copy(error), pickle.loads(pickle.dumps(error))]:
            self.assertEqual(restored.body, error.body)
            self.assertTrue(restored.body_truncated)

    def test_transport_failures_are_typed_without_write_retries(self):
        client = Client(api_key="key", base_url=self.origin, timeout=0.05)
        for path in ["/api/stall", "/api/malformed"]:
            EdgeHandler.calls = 0
            with self.subTest(path=path), self.assertRaises(TransportError):
                client.request("POST", path, body={})
            self.assertEqual(EdgeHandler.calls, 1)

    def test_origin_markers_and_boolean_limits_are_rejected(self):
        for kwargs in [
            {"base_url": self.origin + "?"},
            {"base_url": self.origin + "#"},
            {"max_response_bytes": True},
        ]:
            with self.subTest(kwargs=kwargs), self.assertRaises(ValueError):
                Client(api_key="key", **kwargs)
