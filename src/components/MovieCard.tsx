import { IMovie } from "../interfaces/IMovie"

interface IProps {
  movie: IMovie
}

export default function MovieCard({ movie }: IProps) {
  return (
    <div className="movie-card p-4 border rounded hover:bg-gray-800 transition duration-300">
      <div className="min-h-[490px]" >
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded max-w-full h-auto"

          />
        )}
      </div>
      <div className="movie-info mt-2">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-300">{movie.release_date.split('-')[0]}</p>
      </div>
    </div>
  )
}