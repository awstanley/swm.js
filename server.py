#!/bin/env python3

import sys
import socketserver
from http.server import SimpleHTTPRequestHandler

class TestServer(SimpleHTTPRequestHandler):
    def end_headers(self):        
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

# WASM (for those like me who use WASM)
TestServer.extensions_map['.wasm'] = 'application/wasm'

# For those like me who like not seeing errors.
TestServer.extensions_map['.js'] = 'application/javascript'

if __name__ == '__main__':
    PORT = 8080
    with socketserver.TCPServer(("", PORT), TestServer) as httpd:
        print("Listening on port {}. Press Ctrl+C to stop.".format(PORT))
        httpd.serve_forever()