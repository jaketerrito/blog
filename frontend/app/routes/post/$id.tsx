import { createFileRoute } from '@tanstack/react-router'
import { Error } from "@/components";
import { apiRequest } from "@/modules/api";
import { createServerFn, useServerFn } from '@tanstack/react-start';


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
  const post = Route.useLoaderData()
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.author_id}</p>
      <p>{post.created_at}</p>
      <p>{post.updated_at}</p>
      <p>{post.public}</p>
    </div>
  );
}