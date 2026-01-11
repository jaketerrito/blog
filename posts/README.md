# Dependencies
- [docker desktop](https://docs.docker.com/desktop/)
- [just](https://github.com/casey/just)
- [uv](https://docs.astral.sh/uv/)


https://realpython.com/python-microservices-grpc/#best-practices

# Content
Posts are stored as `.md` files in `/posts/conent`
Formatted like:
```
<TITLE: string>
<ID: string>
<CREATION TIME: ISO8601>
<Blog Content>
...
<Blog Content>
```

# Local Development
All commands run through docker compose and just
`just --list`

# Debugging
## [grpcui](https://github.com/fullstorydev/grpcui)
This docker container runs along with the posts service and exposes ui for testing grpc methods.
Accessible at `localhost:8081`
