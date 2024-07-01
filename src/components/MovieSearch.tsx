import React, {  } from 'react';
import MovieCard from './MovieCard';
import { SearchForm } from './SearchForm';
import useMovieSearch from '../hooks/useMovieSearch';

const MovieSearch: React.FC = () => {  
  const {
    query,
    movies,
    loading,
    error,
    handleInputChange,
    handleClearSearch,
    resultContainerRef,
  } = useMovieSearch();

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