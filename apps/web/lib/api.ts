const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type FetchOptions = Omit<RequestInit, 'body'> & { body?: unknown };

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
