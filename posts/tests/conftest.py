from contextlib import asynccontextmanager
from unittest.mock import patch

from pytest_asyncio import fixture
from fastapi.testclient import TestClient
from mongomock_motor import AsyncMongoMockClient

from src.database import init_database
from src.main import app


# Configures mock mongo database
@fixture(autouse=True)
async def database():
    client = AsyncMongoMockClient(database="test_db")
    await init_database(client)


# Configures test lifespan, prevents actual database connection
@asynccontextmanager
async def test_lifespan(app):
    yield


# Configures test client
@fixture
async def client(database):
    app.router.lifespan_context = test_lifespan

    with TestClient(app) as test_client:
        yield test_client


@fixture(autouse=True)
async def admin_status():
    """Fixture to control admin status in tests. Defaults to True."""
    with patch("src.deps.get_admin_status") as mock_admin:
        mock_admin.return_value = True
        yield mock_admin
