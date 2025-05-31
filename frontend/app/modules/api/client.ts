import { setResponseStatus } from "@tanstack/react-start/server";

const API_URL = process.env.POSTS_API_URL;

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(API_URL + path, {
    ...options,
  });

  // Handle responses with no content (like 204 No Content) first
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    // Don't set response status for 204 as TanStack Start doesn't handle it well
    return null as T;
  }
  
  setResponseStatus(response.status)
  
  // Check if response has JSON content
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  // For non-JSON responses, try to parse as text
  const text = await response.text();
  if (text) {
    try {
      return JSON.parse(text);
    } catch {
      return text as T;
    }
  }
  
  return null as T;
}