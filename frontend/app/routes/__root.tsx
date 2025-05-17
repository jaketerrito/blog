import { Error } from "@/components";
import { apiRequest } from "@/modules/api";
import {
  createRootRoute,
  Link,
  Outlet
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const MAIN_AUTHOR_ID = "jake";
const API_URL = process.env.POSTS_API_URL + "/blog-post";

interface BlogPostPreview {
  id: string;
  title: string;
}

const getPostsByAuthorId = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return apiRequest<BlogPostPreview[]>(`${API_URL}/?author_id=${id}`);
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "My Blog",
      },
    ],
  }),
  component: RootComponent,
  loader: ({}) => {
    return getPostsByAuthorId({ data: MAIN_AUTHOR_ID })
  },
  errorComponent: Error,
});

function RootComponent() {
  const post_ids = Route.useLoaderData();
  
  return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #eaeaea' }}>
          <h3>Posts by {MAIN_AUTHOR_ID}</h3>
          <nav>
            {post_ids.map((post_preview) => (
              <div key={post_preview.id} style={{ margin: '10px 0' }}>
                <Link to="/post/$id" params={{ id: post_preview.id }}>{post_preview.title}</Link>
              </div>
            ))}
          </nav>
          <div style={{ marginTop: '20px' }}>
            <Link to="/">Home</Link>
          </div>
        </div>
        
        {/* Main content area */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </div>
      </div>
  );
}
