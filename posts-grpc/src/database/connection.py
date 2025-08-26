from mongoengine import connect
import os


def init_db():
    connect(host=os.getenv("DB_URI"))
