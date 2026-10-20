import sys
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from recoupable import APIError, Client, ResponseError


class ResponseHandler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_POST(self):
        if self.path == "/api/stream":
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.end_headers()
            self.wfile.flush()
            self.server.release.wait(2)
            return
        if self.path.startswith("/api/empty"):
            self.send_response(202)
            if self.path.endswith("-json"):
                self.send_header("Content-Type", "application/json")
            self.end_headers()
            return
        self.send_response(429 if self.path.endswith("-error") else 200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        depth = max(10000, 2 * sys.getrecursionlimit())
        self.wfile.write(b"[" * depth + b"0" + b"]" * depth)


class ResponseEdges(unittest.TestCase):
    def setUp(self):
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), ResponseHandler)
        self.server.release = threading.Event()
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.client = Client(
            api_key="fixture",
            base_url=f"http://127.0.0.1:{self.server.server_port}",
            timeout=0.2,
        )

    def tearDown(self):
        self.server.release.set()
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def test_stream_is_rejected_before_waiting_for_body(self):
        with self.assertRaises(ResponseError):
            self.client.request("POST", "/api/stream")

    def test_empty_accepted_write_returns_none(self):
        for path in ["/api/empty", "/api/empty-json"]:
            with self.subTest(path=path):
                self.assertIsNone(self.client.request("POST", path))

    def test_deep_json_is_decoded_or_returns_a_structured_error(self):
        try:
            result = self.client.request("POST", "/api/deep")
        except ResponseError:
            pass  # Some supported Python parsers reject deep nesting.
        else:
            for _ in range(max(10000, 2 * sys.getrecursionlimit())):
                self.assertIsInstance(result, list)
                self.assertEqual(len(result), 1)
                result = result[0]
            self.assertEqual(result, 0)
        with self.assertRaises(APIError) as caught:
            self.client.request("POST", "/api/deep-error")
        self.assertEqual(caught.exception.status, 429)
