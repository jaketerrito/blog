import { ErrorComponentProps } from "@tanstack/react-router";

export function Error({ error }: ErrorComponentProps) {
  return <div>Error: {error.message}</div>;
}
