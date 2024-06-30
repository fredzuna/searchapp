import React, { useState, FormEvent } from 'react';
import { IMovie } from '../interfaces/IMovie';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const apiKey = '5d1d338defaa5fa30f219fcfdee61747'; // Replace with your TMDb API key

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded mb-2"          
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card p-4 border rounded">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded"
              />
            )}
            <div className="movie-info mt-2">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-600">{movie.release_date.split('-')[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MovieSearch;