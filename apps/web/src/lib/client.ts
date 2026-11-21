// apps/web/src/lib/api/client.ts
//
// Centralized API client. Reads JWT from localStorage, handles errors,
// returns typed JSON. All admin pages use this.

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public data?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken") ||
        null
    );
}

type RequestOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
    query?: Record<string, string | number | boolean | undefined | null>;
};

export async function apiRequest<T>(
    path: string,
    options: RequestOptions = {},
): Promise<T> {
    const { body, query, headers: customHeaders, ...rest } = options;

    // Build query string
    let fullPath = path;
    if (query) {
        const qs = new URLSearchParams();
        for (const [k, v] of Object.entries(query)) {
            if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
        }
        const qsString = qs.toString();
        if (qsString) fullPath += `?${qsString}`;
    }

    const token = getToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(customHeaders as Record<string, string>),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    let res: Response;
    try {
        res = await fetch(`${API_URL}${fullPath}`, {
            ...rest,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError(0, "Network error — API haipatikani. Iko running?");
    }

    // 204 No Content
    if (res.status === 204) return undefined as T;

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        // Handle JWT expiry
        if (res.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            // Optional: redirect to login
            // window.location.href = "/login?expired=1";
        }
        const message =
            (data as { message?: string })?.message ||
            (Array.isArray((data as { message?: string[] }).message)
                ? (data as { message: string[] }).message.join(", ")
                : undefined) ||
            res.statusText ||
            `Request failed (${res.status})`;
        throw new ApiError(res.status, message, data);
    }

    return data as T;
}

// Convenience methods
export const api = {
    get: <T>(path: string, query?: RequestOptions["query"]) =>
        apiRequest<T>(path, { method: "GET", query }),
    post: <T>(path: string, body?: unknown) =>
        apiRequest<T>(path, { method: "POST", body }),
    patch: <T>(path: string, body?: unknown) =>
        apiRequest<T>(path, { method: "PATCH", body }),
    put: <T>(path: string, body?: unknown) =>
        apiRequest<T>(path, { method: "PUT", body }),
    delete: <T>(path: string) =>
        apiRequest<T>(path, { method: "DELETE" }),
};