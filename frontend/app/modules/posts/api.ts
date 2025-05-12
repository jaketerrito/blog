import { apiRequest } from "@/modules/api";
import { useQuery } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";

const API_URL = process.env.POSTS_API_URL + "/blog-post";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  public: boolean;
}

const getPostById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return apiRequest<BlogPost[]>(`${API_URL}/${id}`);
  });

export function useGetPostById(id: string) {
  const getPost = useServerFn(getPostById);
  return useQuery({
    queryKey: ["getPostById", id],
    queryFn: () => getPost({ data: id }),
  });
}

const getAuthoredPosts = createServerFn({ method: "GET" })
  .validator((author_id: string) => author_id)
  .handler(async ({ data: author_id }) => {
    return apiRequest<string[]>(`${API_URL}/?author_id=${author_id}`);
  });

export function useGetAuthoredPosts(author_id: string) {
  const getPosts = useServerFn(getAuthoredPosts);
  return useQuery({
    queryKey: ["getAuthoredPosts", author_id],
    queryFn: () => getPosts({ data: author_id }),
  });
}
