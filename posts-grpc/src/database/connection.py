from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src import config
from sqlalchemy.dialects import registry


def create_database_engine():
    registry.register(
        "postgres", "sqlalchemy.dialects.postgresql.psycopg", "PGDialect_psycopg"
    )
    engine = create_engine(
        config.DATABASE_URI,
        echo=config.DEBUG,
        pool_pre_ping=True,
    )
    return engine


def create_database_session_factory():
    """Create database engine and session factory"""
    engine = create_database_engine()
    return sessionmaker(bind=engine)
