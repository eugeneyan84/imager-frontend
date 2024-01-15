import { useCallback, useEffect, useRef, useState } from 'react';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // data in useRef will not be re-initialised across re-render cycles
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      try {
        setIsLoading(true);

        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        return data;
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
