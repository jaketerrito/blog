from mongoengine import connect
import os


def init_db_connection():

    connect(host=os.getenv("MONGO_HOST"), port=int(os.getenv("MONGO_PORT")), username=os.getenv("MONGO_USER"), password=os.getenv("MONGO_PASSWORD"))
