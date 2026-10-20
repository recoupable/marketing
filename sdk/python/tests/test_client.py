import json
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import ClassVar

from recoupable import APIError, Client, ResponseError


class Handler(BaseHTTPRequestHandler):
    requests: ClassVar[list] = []

    def log_message(self, *_):
        pass

    def do_GET(self):
        self.respond()

    def do_POST(self):
        self.respond()

    def respond(self):
        payload = self.rfile.read(int(self.headers.get("content-length", 0)))
        self.requests.append((self.command, self.path, dict(self.headers), payload))
        status, body, content_type = (
            200,
            b'{"status":"success","accountId":"fixture"}',
            "application/json",
        )
        if self.path == "/api/limited":
            status, body = 429, b'{"error":"rate_limit_exceeded"}'
        elif self.path == "/api/redirect":
            status, body = 302, b""
        elif self.path == "/api/empty":
            status, body = 204, b""
        elif self.path == "/api/stream":
            body, content_type = b"data: secret\n", "text/event-stream"
        elif self.path == "/api/invalid":
            body = b"{"
        elif self.path == "/api/large":
            body = b" " * 2048
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Retry-After", "7")
        self.send_header("Location", self.server.origin + "/api/leak")
        self.end_headers()
        self.wfile.write(body)


class ClientTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        cls.server.origin = f"http://127.0.0.1:{cls.server.server_port}"
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def setUp(self):
        Handler.requests.clear()
        self.client = Client(api_key="fixture-key", base_url=self.server.origin)

    def test_authenticated_account_and_encoded_query(self):
        self.assertEqual(
            self.client.get_account_id(), {"status": "success", "accountId": "fixture"}
        )
        self.client.request("GET", "/api/accounts", query={"name": "A & B"})
        self.assertEqual(Handler.requests[0][1], "/api/accounts/id")
        self.assertEqual(Handler.requests[0][2]["X-Api-Key"], "fixture-key")
        self.assertIn("name=A+%26+B", Handler.requests[1][1])
        self.assertNotIn("fixture-key", repr(self.client))

    def test_json_body_and_bearer_authentication(self):
        client = Client(access_token="fixture-token", base_url=self.server.origin)
        client.request("POST", "/api/example", body={"name": "Example"})
        self.assertEqual(
            Handler.requests[0][2]["Authorization"], "Bearer fixture-token"
        )
        self.assertEqual(json.loads(Handler.requests[0][3]), {"name": "Example"})

    def test_rate_limit_preserves_details_without_retrying(self):
        with self.assertRaises(APIError) as result:
            self.client.request("POST", "/api/limited", body={})
        self.assertEqual(result.exception.status, 429)
        self.assertEqual(result.exception.retry_after, "7")
        self.assertEqual(result.exception.body["error"], "rate_limit_exceeded")
        self.assertEqual(len(Handler.requests), 1)

    def test_does_not_follow_redirect_with_credentials(self):
        with self.assertRaises(APIError) as result:
            self.client.request("GET", "/api/redirect")
        self.assertEqual(result.exception.status, 302)
        self.assertEqual(len(Handler.requests), 1)

    def test_paths_cannot_escape_api_origin(self):
        for path in [
            "https://evil.invalid/api/x",
            "//evil.invalid/api/x",
            "/api/../oauth",
            "/api/%2e%2e/oauth",
            "/api/a%2fb",
            "/api/x?q=x",
            "/api/x#x",
            "/api/\\evil",
        ]:
            with self.subTest(path=path), self.assertRaises(ValueError):
                self.client.request("GET", path)
        self.assertFalse(Handler.requests)

    def test_empty_response_and_unsupported_responses(self):
        self.assertIsNone(self.client.request("GET", "/api/empty"))
        for path in ["/api/invalid", "/api/stream"]:
            with self.subTest(path=path), self.assertRaises(ResponseError):
                self.client.request("GET", path)
        client = Client(
            api_key="key", base_url=self.server.origin, max_response_bytes=1024
        )
        with self.assertRaises(ResponseError):
            client.request("GET", "/api/large")

    def test_configuration_rejects_ambiguous_or_insecure_credentials(self):
        for kwargs in [
            {},
            {"api_key": "a", "access_token": "b"},
            {"api_key": "\n"},
            {"api_key": "a", "base_url": "http://example.com"},
            {"api_key": "a", "base_url": "https://u:p@example.com"},
            {"api_key": "a", "timeout": 0},
        ]:
            with self.subTest(kwargs=kwargs), self.assertRaises(ValueError):
                Client(**kwargs)


if __name__ == "__main__":
    unittest.main()
