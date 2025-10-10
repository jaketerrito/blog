from typing import Generator
import pytest
from sqlalchemy import create_engine
from src.database.model.post import Post
from sqlalchemy.orm import scoped_session, sessionmaker, Session


@pytest.fixture(scope='session')
def session_factory():
    """yields a SQLAlchemy engine which is suppressed after the test session"""
    engine = create_engine(
        "sqlite://",
        echo=True,
    ) 
    Post.metadata.create_all(engine)

    yield scoped_session(sessionmaker(bind=engine))

    engine.dispose()



@pytest.fixture(scope='function')
def session(session_factory) -> Generator[Session]:
    """yields a SQLAlchemy connection which is rollbacked after the test"""
    session = session_factory()

    yield session

    session.close()