FROM python:3.13-slim-bookworm AS base
COPY --from=astral/uv:0.8.13 /uv /uvx /bin/
# Base stage for shared dependencies
FROM astral/uv:python3.13-bookworm-slim AS base
WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev



FROM base as development
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --only-dev

# Copy the project into the image
ADD . /app


FROM base AS production
ADD . /app
CMD ["uv", "run", "src/server.py"]
