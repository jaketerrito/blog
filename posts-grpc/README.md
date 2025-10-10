# Dependencies
- [docker desktop](https://docs.docker.com/desktop/)
- [just](https://github.com/casey/just)
- [uv](https://docs.astral.sh/uv/)


https://realpython.com/python-microservices-grpc/#best-practices

# Local Development
All commands run through docker compose and just
`just --list`

# Debugging
## [grpcui](https://github.com/fullstorydev/grpcui)
This runs as a sidecar to the posts service and exposes ui for testing grpc methods.
Accessible at `localhost:8081`

# Database Models
Managed using [alembic](https://alembic.sqlalchemy.org/en/latest/index.html)
- `just make-migrations` to generate new migrations
- `just migrate` to apply the migrations

TODO: deploy, migrate as part of deployment
TODO: backups of data