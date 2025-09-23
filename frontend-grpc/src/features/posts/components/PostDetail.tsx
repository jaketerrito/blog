import { Post } from "../../../lib/grpc/posts";

interface PostDetailProps {
  post: Post | null;
}

export function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return <div>404 - Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title || "No title"}</h1>
      <p>{post.content || "No content"}</p>
      <p>{post.createdAt?.toLocaleString()}</p>
      <p>{post.updatedAt?.toLocaleString()}</p>
    </div>
  );
}