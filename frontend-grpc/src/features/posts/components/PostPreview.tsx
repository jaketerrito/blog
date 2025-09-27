import { PostPreview as PostPreviewType } from "@/generated/proto/posts";
import { Link } from "@tanstack/react-router";

interface PostPreviewProps {
  postPreview: PostPreviewType;
}

export function PostPreview({ postPreview }: PostPreviewProps) {
  return (
    <div>
        This is a postpreview
        <Link to={"/post/$postId"} params={{ postId: postPreview.id }}>
        {postPreview.title || "Untitled"}
        </Link>
    </div>
  );
}