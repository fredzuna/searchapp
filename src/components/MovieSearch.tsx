import React, { } from 'react';
import { SearchForm } from './SearchForm';
import { useMovieSearchContext } from '../context/MovieSearchContext';
import SearchResult from './SearchResult';

const MovieSearch: React.FC = () => {
  const {
    loading,
    error,
  } = useMovieSearchContext();

  return (
    <div className="container mx-auto p-4">
      <SearchForm />
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <SearchResult />
    </div>
  );
};

export default MovieSearch;