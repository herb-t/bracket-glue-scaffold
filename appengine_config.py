"""
This file is automatically loaded when App Engine
starts a new instance of your application. This runs before any
WSGI applications specified in app.yaml are loaded.
"""

import os
from google.appengine.ext import vendor


# Adds the path to the Bracket server code to App Engine so imports work.
bracket_dir = os.path.join(
    os.path.dirname(__file__), 'node_modules', '@google', 'bracket', 'python')
vendor.add(bracket_dir)
