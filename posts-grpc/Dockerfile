# Base stage for shared dependencies
FROM astral/uv:python3.13-bookworm-slim AS base
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
WORKDIR /app
COPY pyproject.toml .
RUN uv sync --no-dev

FROM base AS development
RUN uv sync --only-dev
# Copy application code
COPY . .

FROM base AS production
# Copy application code
COPY . .
CMD ["uv", "run", "src/main.py"]
