import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
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
    };

    fetchData(url);
    // return () => {
    //   cleanup;
    // };
  }, [url]);

  return { data, loading, error };
};
