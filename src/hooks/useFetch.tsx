import { useState, useCallback } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: '2032',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  // useEffect(() => {
  //   fetchData(url);
  // }, [url]);

  return { fetchData, data, loading, error };
};
