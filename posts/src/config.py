import os

DEBUG = os.getenv("DEBUG", "False").lower() == "true"
PORT = os.getenv("PORT")
CONTENT_DIR = os.getenv("CONTENT_DIR", "/app/content/")
