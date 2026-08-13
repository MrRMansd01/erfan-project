const API_BASE_URL = 'http://10.0.0.15:8080';

export type LoginResult = {
  userId: string;
  username: string;
};

type RequestOptions = {
  path: string;
  body: Record<string, string>;
};

const request = async <T>({ path, body }: RequestOptions): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const rawText = await response.text();
  const data = rawText ? (JSON.parse(rawText) as T) : ({} as T);

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return data;
};

export const login = async (username: string): Promise<LoginResult> => {
  const trimmedUsername = username.trim();

  const response = await request<Partial<LoginResult> & { id?: string }>({
    path: '/login',
    body: { username: trimmedUsername },
  });

  return {
    username: response.username ?? trimmedUsername,
    userId: response.userId ?? response.id ?? trimmedUsername,
  };
};

export const joinRoom = async (
  roomId: string,
  userId: string,
): Promise<Record<string, unknown>> => {
  return request<Record<string, unknown>>({
    path: '/joinRoom',
    body: {
      roomId,
      userId,
    },
  });
};

export const apiConfig = {
  baseUrl: API_BASE_URL,
};
