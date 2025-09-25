import { useCanEdit } from "@/features/auth";
import { Post as PostType } from "@/generated/proto/posts";
import { Link } from "@tanstack/react-router";

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
    timeZone: "UTC", // Force UTC to avoid server/client timezone differences
  }).format(date);
}

export function Post({ post }: PostProps) {
  const canEdit = useCanEdit();
  return (
    <div>
      <h1>{post.title || "No title"}</h1>
      <p>{post.content || "No content"}</p>
      <p>Created: {formatDate(post.createdAt)}</p>
      <p>Updated: {formatDate(post.updatedAt)}</p>
      {canEdit && (
        <Link to="/post/$postId/edit" params={{ postId: post.id }}>
          Edit
        </Link>
      )}
    </div>
  );
}
