#!/usr/bin/env python3
"""Serve the migrated Studio on its original origin, preserving browser decisions."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
import argparse
ROOT=Path(__file__).resolve().parents[1]
class Studio(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def send_head(self):
        url=urlsplit(self.path)
        if url.path in ('/','/brand-studio','/brand-studio/'):
            self.send_response(302)
            self.send_header('Location',urlunsplit(('', '', '/brand-studio/index.html',url.query,'')))
            self.send_header('Content-Length','0');self.end_headers();return None
        return super().send_head()
    def translate_path(self,path):
        if path.startswith('/brand-studio/'):path=path[len('/brand-studio'):]
        return super().translate_path(path)
    def end_headers(self):
        self.send_header('X-Robots-Tag','noindex, nofollow')
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=3012);args=parser.parse_args()
    print(f'Brand Studio: http://localhost:{args.port}/brand-studio',flush=True)
    ThreadingHTTPServer(('127.0.0.1',args.port),Studio).serve_forever()
