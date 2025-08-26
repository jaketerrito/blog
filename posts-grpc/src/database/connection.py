from mongoengine import connect
import os


def init_db():
    connect(os.getenv("DB_URI"))
