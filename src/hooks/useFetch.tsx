import { useState, useCallback } from 'react';
import { ViewTypes } from '../Types/ViewTypes';
import { normalizePostData } from '../Utils/normalizer';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
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
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const persistData = async (data: ViewTypes[]) => {
    const normalizedData = normalizePostData(data);
    setError(null);
    console.log(data);
    // setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: '2032',
          'Content-Type': 'application/json',
        },
        body: await JSON.stringify(normalizedData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  return { fetchData, persistData, data, loading, error };
};
