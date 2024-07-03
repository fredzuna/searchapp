import MovieCard from './MovieCard';
import { useMovieSearchContext } from './MovieSearchContext';

export default function SearchResult() {
  const { movies, resultContainerRef } = useMovieSearchContext();
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 result-container"
      ref={resultContainerRef}
      style={{ height: '80vh', overflowY: 'auto' }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}