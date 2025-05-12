export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    const message = (await response.json()).detail;
    throw Error("Downstream Error: " + response.status + " " + message);
  }
  return response.json();
}
