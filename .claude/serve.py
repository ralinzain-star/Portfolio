#!/usr/bin/env python3
import os, sys
os.chdir('/Users/harmony/Documents/GitHub/Portfolio')
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
port = int(os.environ.get('PORT') or (sys.argv[1] if len(sys.argv) > 1 else '4321'))
ThreadingHTTPServer(('127.0.0.1', port), SimpleHTTPRequestHandler).serve_forever()
