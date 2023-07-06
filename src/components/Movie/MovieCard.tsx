import { Star } from 'lucide-react'
import Image from 'next/image'
import { Movie } from 'types/api'
import { movieGenres } from 'utils/movieGenres'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <Image
          alt={`${movie.title} poster.`}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          className="w-full rounded-xl"
          height={330}
          width={220}
        />

        <span className="absolute -right-5 -top-3 flex items-center gap-1 rounded-md bg-pizazz px-2 py-1 text-xs font-medium text-bunker-950">
          <Star className="h-3 w-3 fill-bunker-950" />
          {movie.vote_average}
        </span>
      </div>

      <header className="mb-2 mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {movie.genre_ids
            .filter((genre) => movie.genre_ids.indexOf(genre) < 3)
            .map((genreId) => (
              <p
                className="rounded bg-carnation px-1 py-0.5 text-[10px] font-semibold text-bunker-950"
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

      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-bunker-50">
        {movie.title}
      </p>
    </div>
  )
}
