import { useState, useCallback, useEffect } from 'react';
import throttle from 'lodash/throttle';
import { get } from '../apiService';
import { IMovie } from '../interfaces/IMovie';
import useInfiniteScroll from './useInfiniteScroll';

const useMovieSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const searchMovies = async (searchQuery: string, page: number) => {
    setLoading(true);
    setError('');

    try {
      const data = await get(`/search/movie?query=${searchQuery}&page=${page}`);
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

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const resultContainerRef = useInfiniteScroll(loading, hasMore, loadMore);

  useEffect(() => {
    if (page > 1) {
      throttledSearch(query, page);
    }
  }, [page, query, throttledSearch]);

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