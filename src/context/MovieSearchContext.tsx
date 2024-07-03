import React, { createContext, useContext } from 'react';
import useMovieSearch from '../hooks/useMovieSearch';
import { IMovie } from '../interfaces/IMovie';

interface MovieSearchContextType {
  query: string;
  movies: IMovie[];
  loading: boolean;
  error: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  resultContainerRef: React.RefObject<HTMLDivElement>;
}

const MovieSearchContext = createContext<MovieSearchContextType | undefined>(undefined);

export const MovieSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const movieSearch = useMovieSearch();

  return (
    <MovieSearchContext.Provider value={movieSearch}>
      {children}
    </MovieSearchContext.Provider>
  );
};

export const useMovieSearchContext = () => {
  const context = useContext(MovieSearchContext);
  if (context === undefined) {
    throw new Error('useMovieSearchContext does not exist');
  }
  return context;
};
