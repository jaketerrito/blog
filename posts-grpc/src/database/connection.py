from mongoengine import connect
import os


def init_db():
    print(os.getenv("DB_URI"))
    connect(host=os.getenv("DB_URI"))
