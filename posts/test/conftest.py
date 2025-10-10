from typing import Generator
import pytest
from sqlalchemy import create_engine
from src.database.model.post import Post
from sqlalchemy.orm import sessionmaker, Session


@pytest.fixture(scope="session")
def engine():
    """Creates a SQLAlchemy engine for the test session"""
    engine = create_engine(
        "sqlite://",
        echo=True,
    )
    Post.metadata.create_all(engine)
    yield engine
    engine.dispose()


@pytest.fixture(scope="function")
def session(engine) -> Generator[Session, None, None]:
    """Provides a database session for each test function and clears data after each test"""
    # Create a new session for this test
    SessionLocal = sessionmaker(bind=engine)
    db_session = SessionLocal()

    try:
        yield db_session
    finally:
        # Clear all data from the database after each test
        db_session.rollback()

        # Delete all records from all tables
        for table in reversed(Post.metadata.sorted_tables):
            db_session.execute(table.delete())

        db_session.commit()
        db_session.close()


@pytest.fixture(scope="function")
def session_factory(engine):
    """Provides a session factory for each test function"""
    return sessionmaker(bind=engine)
