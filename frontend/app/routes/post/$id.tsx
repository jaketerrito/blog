import { Error } from "@/components";
import { apiRequest } from "@/modules/api";
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from "react";
import Markdown from "react-markdown";


export interface BlogPost {
  _id: string;
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
  const [post, setPost] = useState<BlogPost>(Route.useLoaderData())
  return (
    <div>
      <h1>{post.title}</h1>
      <Markdown>{post.content}</Markdown>
      <p>{post.author_id}</p>
      <p>{post.created_at}</p>
      <p>{post.updated_at}</p>
      <Outlet/>
      <Link to="/post/$id/edit" params={{ id: post._id }}>Edit</Link>
    </div>
  );
}