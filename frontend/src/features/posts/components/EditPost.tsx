import { useState, useEffect } from "react";
import { useUpdatePost } from "../hooks";
import { Post } from "@/generated/proto/posts";

interface EditPostProps {
  post: Post;
  onSuccess?: () => void;
}

export const EditPost = ({ post, onSuccess }: EditPostProps) => {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");
  const updatePostMutation = useUpdatePost();

  // Update form state when post prop changes
  useEffect(() => {
    setTitle(post.title || "");
    setContent(post.content || "");
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        title,
        content,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            cols={50}
            required
          />
        </div>

        <button type="submit" disabled={updatePostMutation.isPending}>
          {updatePostMutation.isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};
