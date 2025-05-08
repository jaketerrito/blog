import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  createFileRoute,
  useRouter,
} from "@tanstack/react-router";
import * as React from "react";
import { postQueryOptions } from "../../postQueryOptions";
import { PostNotFoundError } from "../../posts";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ context: { queryClient }, params: { postId } }) => {
    return queryClient.ensureQueryData(postQueryOptions(postId));
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  React.useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  );
}

function PostComponent() {
  const postId = Route.useParams().postId;
  const { data: post } = useSuspenseQuery(postQueryOptions(postId));

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/edit/$postId"
        params={{ postId: postId }}
        className="block py-1 text-blue-600 hover:opacity-75"
        activeProps={{ className: "font-bold underline" }}
      >
        Edit
      </Link>
    </div>
  );
}
