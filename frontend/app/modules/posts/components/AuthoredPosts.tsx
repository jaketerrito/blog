import { Error, Loading } from "@/components";
import { useGetAuthoredPosts } from "../api";
import { Post } from "./Post";

type Props = {
  author_id: string;
};

export function AuthoredPosts({ author_id }: Props) {
  const { data: posts, isLoading, error } = useGetAuthoredPosts(author_id);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  return (
    <div>wow{posts?.map((post_id) => <Post key={post_id} id={post_id} />)}</div>
  );
}
