from mongoengine import connect
import os


def init_db_connection():
    connect(host=os.getenv("DB_URI"))
