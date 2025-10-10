from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.database.model.post import Post
from src import config

def create_database_engine():
    engine = create_engine(
        f"postgresql+psycopg://{config.DATABASE_URL}",
        echo=config.DEBUG,
        pool_pre_ping=True,
    )
    return engine

def create_database_session_factory():
    """Create database engine and session factory"""
    engine = create_database_engine()
    return sessionmaker(bind=engine)
