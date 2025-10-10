import logging
import sys

from alembic import context

from src.database.connection import create_database_engine
from src.database.model.post import Post

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Configure logging programmatically instead of using fileConfig
def configure_logging():
    """Configure logging to match the previous alembic.ini configuration."""
    # Create formatter
    formatter = logging.Formatter(
        fmt='%(levelname)-5.5s [%(name)s] %(message)s',
        datefmt='%H:%M:%S'
    )
    
    # Create console handler
    console_handler = logging.StreamHandler(sys.stderr)
    console_handler.setLevel(logging.NOTSET)
    console_handler.setFormatter(formatter)
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.WARNING)
    root_logger.addHandler(console_handler)
    
    # Configure SQLAlchemy logger
    sqlalchemy_logger = logging.getLogger('sqlalchemy.engine')
    sqlalchemy_logger.setLevel(logging.WARNING)
    
    # Configure Alembic logger
    alembic_logger = logging.getLogger('alembic')
    alembic_logger.setLevel(logging.INFO)

# Set up logging
configure_logging()

# for 'autogenerate' support
target_metadata = Post.metadata

def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = create_database_engine()

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


run_migrations_online()
