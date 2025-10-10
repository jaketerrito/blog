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

TODO: backups of data
TODO: postgres because cnpg is amazing?: -- alembic --update isn't working

TODO: simplify this whole thing
https://github.com/mdzhang/grpc-python-example/blob/master/grpc_python_example/services/implementations/item_master.py