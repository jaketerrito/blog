import { Error, Loading } from "@/components";
import { useGetPostById } from "../api";

type Props = {
  id: string;
};

export function Post({ id }: Props) {
  const { data: post, isLoading, error } = useGetPostById(id);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <p>{post?.author_id}</p>
      <p>{post?.created_at}</p>
      <p>{post?.updated_at}</p>
      <p>{post?.public}</p>
    </div>
  );
}
