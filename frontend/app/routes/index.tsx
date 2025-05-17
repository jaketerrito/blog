// app/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>Select a post from the sidebar to start reading.</p>
    </div>
  );
}
