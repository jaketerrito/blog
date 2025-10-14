import { PostPreview as PostPreviewType } from "@/generated/proto/posts";
import { PostPreview } from "./PostPreview";

interface PostPreviewListProps {
  postPreviews: PostPreviewType[];
}

export function PostPreviewList({ postPreviews }: PostPreviewListProps) {
  return (
    <div>
      {postPreviews.map((postPreview) => (
        <div key={postPreview.id}>
          <PostPreview postPreview={postPreview} />
        </div>
      ))}
    </div>
  );
}
