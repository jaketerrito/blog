build:
	docker compose build development
	
test:
	docker compose run --rm development pytest
	
up:
	docker compose up -d development

down:
	docker compose down development db

logs:
	docker compose logs -f development

lint:
	docker compose run --rm development ruff check .

format:
	docker compose run --rm development ruff format .

