import { useState, useEffect } from "react";
import { useUpdatePost } from "../hooks";
import { Post as PostType } from "@/generated/proto/posts";
import { Post } from "./Post";

interface EditPostProps {
  post: PostType;
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
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ flex: 1 }}>
            <Post post={{ ...post, title, content }} />
          </div>

          <div style={{ flex: 1 }}>
            <h3>Edit</h3>
            <div>
              <input
                id="title"
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
                required
              />
            </div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              style={{ width: "100%", resize: "vertical" }}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={updatePostMutation.isPending}>
          {updatePostMutation.isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};
