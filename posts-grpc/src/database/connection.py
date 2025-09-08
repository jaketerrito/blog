from mongoengine import connect
from src import config


def init_db_connection():
    connect(
        host=config.MONGO_HOST,
        port=int(config.MONGO_PORT),
        username=config.MONGO_USER,
        password=config.MONGO_PASSWORD,
    )
