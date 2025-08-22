from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetPostRequest(_message.Message):
    __slots__ = ("id",)
    ID_FIELD_NUMBER: _ClassVar[int]
    id: str
    def __init__(self, id: _Optional[str] = ...) -> None: ...

class Post(_message.Message):
    __slots__ = ("id", "title", "content", "created_at", "updated_at")
    ID_FIELD_NUMBER: _ClassVar[int]
    TITLE_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    CREATED_AT_FIELD_NUMBER: _ClassVar[int]
    UPDATED_AT_FIELD_NUMBER: _ClassVar[int]
    id: str
    title: str
    content: str
    created_at: str
    updated_at: str
    def __init__(self, id: _Optional[str] = ..., title: _Optional[str] = ..., content: _Optional[str] = ..., created_at: _Optional[str] = ..., updated_at: _Optional[str] = ...) -> None: ...

class GetPostResponse(_message.Message):
    __slots__ = ("post",)
    POST_FIELD_NUMBER: _ClassVar[int]
    post: Post
    def __init__(self, post: _Optional[_Union[Post, _Mapping]] = ...) -> None: ...

class GetPostsRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetPostsResponse(_message.Message):
    __slots__ = ("posts",)
    POSTS_FIELD_NUMBER: _ClassVar[int]
    posts: _containers.RepeatedCompositeFieldContainer[GetPostResponse]
    def __init__(self, posts: _Optional[_Iterable[_Union[GetPostResponse, _Mapping]]] = ...) -> None: ...
