# Base stage for shared dependencies
FROM python:3.13-slim-bookworm AS base
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
WORKDIR /posts
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

FROM base AS development
COPY requirements-dev.txt .
RUN pip install --no-cache-dir --upgrade -r requirements-dev.txt
COPY . .
CMD ["fastapi", "dev", "src/main.py", "--host", "0.0.0.0"]

FROM base AS production
# Copy application code
COPY ./src ./src
# Production command without --reload for better performance
CMD ["fastapi", "run", "src/main.py"]
