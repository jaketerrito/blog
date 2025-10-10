from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.database.model.post import Post
from src import config

def create_database_session_factory():
    """Create database engine and session factory"""
    engine = create_engine(
        f"postgresql+psycopg://{config.DATABASE_URL}",
        echo=True,
        pool_pre_ping=True,
    )
    Post.metadata.create_all(engine)
    return sessionmaker(bind=engine)
