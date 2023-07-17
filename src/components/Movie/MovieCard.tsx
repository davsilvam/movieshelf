import Image from 'next/image'
import { Movie } from 'types/api'
import { movieGenres } from 'utils/movie-genres'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="w-full">
      <Image
        alt={`${movie.title} poster.`}
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        className="w-full rounded-xl"
        height={330}
        width={220}
      />

      <header className="mb-2 mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {movie.genre_ids
            .filter((genre) => movie.genre_ids.indexOf(genre) < 3)
            .map((genreId) => (
              <p
                className="rounded bg-carnation px-1 py-0.5 text-[10px] font-semibold text-woodsmoke"
                key={genreId}
              >
                {movieGenres[genreId]}
              </p>
            ))}
        </div>

        <p className="text-xs font-medium text-carnation">
          {movie.release_date.slice(0, -6)}
        </p>
      </header>

      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-white">
        {movie.title}
      </p>
    </div>
  )
}
