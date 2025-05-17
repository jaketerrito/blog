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

configure_local_python:
	pyenv install 3.13.3 --skip-existing
	pyenv virtualenv 3.13.3 posts-env
	pyenv local posts-env
	pip install --upgrade pip
	pip install -r requirements.txt -r requirements-dev.txt