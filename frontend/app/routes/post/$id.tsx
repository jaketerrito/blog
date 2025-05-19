import { Error } from "@/components";
import { apiRequest } from "@/modules/api";
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from "react";
import Markdown from "react-markdown";


export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  public: boolean;
}

const API_URL = process.env.POSTS_API_URL + "/blog-post";
const getPostById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return apiRequest<BlogPost>(`${API_URL}/${id}`);
});


export const Route = createFileRoute('/post/$id')({
  component: RouteComponent,
  errorComponent: Error,
  loader: ({ params: { id } }) => {
    return getPostById({ data: id })
  },
})

function RouteComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const [post, setPost] = useState<BlogPost>(Route.useLoaderData())
  console.log(isEditing)
  return (
    <div>
      <h1>{post.title}</h1>
      <Markdown>{post.content}</Markdown>
      <p>{post.author_id}</p>
      <p>{post.created_at}</p>
      <p>{post.updated_at}</p>
      {isEditing ? (
        <div>
          <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
          <textarea value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} />
        </div>
      ): <div>Not editing</div>}
      
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</button>

    </div>
  );
}