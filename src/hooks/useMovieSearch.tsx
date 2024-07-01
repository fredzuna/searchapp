import { useState, useEffect, useCallback, useRef } from 'react';
import throttle from 'lodash/throttle';
import { IMovie } from '../interfaces/IMovie';

const useMovieSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const resultContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = '5d1d338defaa5fa30f219fcfdee61747';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
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

  const handleScroll = useCallback(() => {
    const container = resultContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      throttledSearch(query, page);
    }
  }, [page]);

  useEffect(() => {
    const container = resultContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return {
    query,
    movies,
    loading,
    error,
    handleInputChange,
    handleClearSearch,
    resultContainerRef,
  };
};

export default useMovieSearch;