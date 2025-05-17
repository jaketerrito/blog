export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (response.ok) {
    return response.json();
  }
  
  const message = (await response.json()).detail;
  throw Error(message);
}
