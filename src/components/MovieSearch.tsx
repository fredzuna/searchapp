import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IMovie } from '../interfaces/IMovie';
import throttle from 'lodash/throttle';
import MovieCard from './MovieCard';
import { SearchForm } from './SearchForm';

const MovieSearch: React.FC = () => {
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

  return (
    <div className="container mx-auto p-4">
      <SearchForm query={query} handleInputChange={handleInputChange} handleClearSearch={handleClearSearch} />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 result-container"
        ref={resultContainerRef}
        style={{ height: '80vh', overflowY: 'auto' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;