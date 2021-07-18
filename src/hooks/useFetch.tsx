import { useState, useCallback } from 'react';
import { ViewTypes } from '../Types/ViewTypes';
import { appendViewIds, normalizePostData } from '../Utils/normalizer';

export const useFetch = (url: string) => {
  const [data, setData] = useState<ViewTypes[] | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching data from the API and populates data state.
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
      // adds a uuid to fetched objects, for frontend id. API doesn't provide
      // any unique values to use for keys and ids.
      const normalizedData = appendViewIds(data);
      setData(normalizedData);
    } catch (error) {
      setError('Cannot fetch views. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  // Persists data state on the API
  const persistData = async (data: ViewTypes[]) => {
    // Removes id and isMarked properties from the array of views.
    // Only used on the frontend, database doesn't accept it.
    const normalizedData = normalizePostData(data);
    setError(null);
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
      console.log(data);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  return { fetchData, persistData, data, loading, error };
};
