const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type QueryParams = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  query?: QueryParams;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("accessToken") ||
    null
  );
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", headers: customHeaders, body, query } = options;

  let fullPath = path;
  if (query) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    }
    const s = qs.toString();
    if (s) fullPath += "?" + s;
  }

  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customHeaders || {}),
  };
  if (token) headers["Authorization"] = "Bearer " + token;

  let res: Response;
  try {
    res = await fetch(API_URL + fullPath, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Network error: API haipatikani. Iko running?");
  }

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    const anyData = data as { message?: string | string[] };
    const msgFromBody = Array.isArray(anyData.message)
      ? anyData.message.join(", ")
      : anyData.message;
    const msg =
      msgFromBody ||
      res.statusText ||
      "Request failed (" + res.status + ")";
    throw new ApiError(res.status, msg, data);
  }

  return data as T;
}

type ApiFunction = {
  <T = unknown>(path: string, init?: RequestInit): Promise<T>;
  get<T = unknown>(path: string, query?: QueryParams): Promise<T>;
  post<T = unknown>(path: string, body?: unknown): Promise<T>;
  patch<T = unknown>(path: string, body?: unknown): Promise<T>;
  put<T = unknown>(path: string, body?: unknown): Promise<T>;
  delete<T = unknown>(path: string): Promise<T>;
};

const api = ((path: string, init?: RequestInit) =>
  request(path, init as RequestOptions)) as ApiFunction;

api.get = <T = unknown>(path: string, query?: QueryParams) =>
  request<T>(path, { method: "GET", query });

api.post = <T = unknown>(path: string, body?: unknown) =>
  request<T>(path, { method: "POST", body });

api.patch = <T = unknown>(path: string, body?: unknown) =>
  request<T>(path, { method: "PATCH", body });

api.put = <T = unknown>(path: string, body?: unknown) =>
  request<T>(path, { method: "PUT", body });

api.delete = <T = unknown>(path: string) =>
  request<T>(path, { method: "DELETE" });

export { api, request };