// apps/web/src/hooks/use-api.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "@/lib/api/client";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetch data from API on mount (and when path changes).
 * Pass `null` to skip fetching.
 */
export function useApi<T>(
  path: string | null,
  query?: Record<string, string | number | boolean | undefined>,
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!path);
  const [error, setError] = useState<string | null>(null);
  const queryKey = JSON.stringify(query ?? {});
  const reqId = useRef(0);

  const refetch = useCallback(async () => {
    if (!path) return;
    const myReq = ++reqId.current;
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<T>(path, query);
      if (myReq === reqId.current) setData(result);
    } catch (e) {
      if (myReq === reqId.current) {
        setError(e instanceof ApiError ? e.message : "Failed to load");
      }
    } finally {
      if (myReq === reqId.current) setLoading(false);
    }
  }, [path, queryKey]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}