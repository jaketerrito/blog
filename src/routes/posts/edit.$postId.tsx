import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { postQueryOptions } from "../../postQueryOptions";

export const Route = createFileRoute("/posts/edit/$postId")({
  component: EditPostComponent,
});

function EditPostComponent() {
  const postId = Route.useParams().postId;
  const { data: post } = useSuspenseQuery(postQueryOptions(postId));

  // State for form fields
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.body || "");
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview'

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically make an API call to update the post
    console.log("Submitting updated post:", { id: postId, title, body });
    // TODO: Add actual submission logic and navigation after success
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {/* Body tabs */}
        <div className="mb-4">
          <div className="flex border-b mb-4">
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === "edit" ? "border-b-2 border-blue-500 font-medium" : ""}`}
              onClick={() => setActiveTab("edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === "preview" ? "border-b-2 border-blue-500 font-medium" : ""}`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
          </div>

          {/* Edit tab content */}
          {activeTab === "edit" && (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border rounded-md min-h-[200px]"
            />
          )}

          {/* Preview tab content */}
          {activeTab === "preview" && (
            <div className="border rounded-md p-4 min-h-[200px]">
              {/* Rendered content would go here */}
              <div className="text-gray-500 italic">
                {body || "Nothing to preview"}
              </div>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
