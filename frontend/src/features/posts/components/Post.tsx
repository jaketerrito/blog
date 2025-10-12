import { Post as PostType } from "@/generated/proto/posts";
import Markdown from "react-markdown";


interface PostProps {
  post: PostType;
}

function formatDate(date: Date | undefined): string {
  if (!date) return "";

  // Use ISO string for consistent server/client rendering
  // Then format it consistently
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // Uses browser's local timezone
  }).format(date);
}

export function Post({ post }: PostProps) {
  return (
    <div>
      <h1>{post.title || "No title"}</h1>
      <Markdown>{post.content || "No content"}</Markdown>
      <p>Created: {formatDate(post.createdAt)}</p>
      <p>Updated: {formatDate(post.updatedAt)}</p>
    </div>
  );
}
