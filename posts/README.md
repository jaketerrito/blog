# blog-post-service
Service for managing blog posts

# Prerequisites
- pyenv installed
- `make configure_local_python`

https://github.com/Kludex/fastapi-tips
https://github.com/zhanymkanov/fastapi-best-practices
## How to Use Docker Setup

This project is configured with Docker to simplify development and deployment. The setup includes separate configurations for development and production environments.

## Run local server
`fastapi dev src/main.py`
spins up dev server with auto reload

## Test
`pytest`

## Prod deploy notes
`fastapi run src/main.py` 
Runs server, using uvicorn


## Code Linting and Formatting
Ruff is used for linting and formatting.
https://docs.astral.sh/ruff/