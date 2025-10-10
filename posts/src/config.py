import os

DEBUG = os.getenv("DEBUG", "False").lower() == "true"
PORT = os.getenv("PORT")

# Database configuration
DATABASE_URI = os.getenv("DATABASE_URI")
