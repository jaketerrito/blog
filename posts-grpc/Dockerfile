FROM astral/uv:python3.13-bookworm-slim AS builder
WORKDIR /app

ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PYTHON_DOWNLOADS=0 PYTHONPYCACHEPREFIX=/app/.py_cache

# Install non dev dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev


FROM builder as development
# Install entr for file watching
RUN apt-get update && apt-get install -y entr
# Install dev dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --only-dev

COPY . /app
ENV PATH="/app/.venv/bin:$PATH"
ENTRYPOINT []
CMD ["find /app/src/ | entr -r python src/server.py"]


FROM python:3.13-slim-bookworm AS production
WORKDIR /app

# Copy the virtual environment from the builder stage
COPY --from=builder --chown=app:app /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

# Copy in source
COPY --chown=app:app . /app

CMD ["python", "src/server.py"]
