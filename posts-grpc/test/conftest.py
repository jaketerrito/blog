import pytest
import mongomock
from mongoengine import connect, disconnect

@pytest.fixture(scope="session", autouse=True)
def mongo_connection():
    connect('test_db', host='mongodb://localhost', mongo_client_class=mongomock.MongoClient)
    yield
    disconnect()
    

@pytest.fixture(autouse=True)
def clear_database():
    # Clear all collections before each test
    from mongoengine.connection import get_db
    db = get_db()
    for collection in db.list_collection_names():
        db.drop_collection(collection)