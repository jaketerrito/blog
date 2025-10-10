import os

DEBUG = os.getenv("DEBUG", "False").lower() == "true"
PORT = os.getenv("PORT")
DATABASE_URL = os.getenv("DATABASE_URL")