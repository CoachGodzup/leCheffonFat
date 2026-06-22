import { useState, useEffect, useCallback, useRef } from "react";

export interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = [],
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false;

    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ data, isLoading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled)
          setState({
            data: null,
            isLoading: false,
            error:
              err instanceof Error ? err.message : "An unknown error occurred",
          });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = useCallback(() => {
    setState({ data: null, isLoading: true, error: null });

    fetcherRef
      .current()
      .then((data) => setState({ data, isLoading: false, error: null }))
      .catch((err) =>
        setState({
          data: null,
          isLoading: false,
          error:
            err instanceof Error ? err.message : "An unknown error occurred",
        }),
      );
  }, []);

  return { ...state, refetch };
}
