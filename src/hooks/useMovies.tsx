import { useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { IMovie } from '../interfaces/IMovie';

const apiKey = '5d1d338defaa5fa30f219fcfdee61747'; // Replace with your TMDb API key

const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  const searchMovies = async (searchQuery: string, page: number) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const throttledSearch = useCallback(
    throttle((searchQuery: string, page: number) => {
      searchMovies(searchQuery, page);
    }, 1000),
    []
  );

  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    throttledSearch(newQuery, 1);
  };

  const handleClearSearch = () => {
    setQuery('');
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    if (page > 1) {
      throttledSearch(query, page);
    }
  }, [page]);

  return {
    movies,
    loading,
    error,
    query,
    hasMore,
    setPage,
    handleInputChange,
    handleClearSearch,
  };
};

export default useMovies;