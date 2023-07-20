import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'
import { Movie } from 'types/api'
import { movieGenres } from 'utils/movie-genres'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="w-full">
      {movie.poster_path ? (
        <Image
          alt={`${movie.title} poster.`}
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          className="aspect-[2/3] w-full rounded-xl"
          height={330}
          width={220}
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-oslo">
          <ImageOff className="h-5 w-5 text-woodsmoke" />
        </div>
      )}

      <header className="mb-1 mt-3 flex items-center justify-between gap-2 text-oslo">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {movie.genre_ids.slice(0, 3).map((genreId) => (
              <Fragment key={genreId}>
                {movie.genre_ids.indexOf(genreId) > 0 && (
                  <div className="h-2 w-[1px] bg-oslo" />
                )}

                <p className="text-xs text-white/70">{movieGenres[genreId]}</p>
              </Fragment>
            ))}
          </div>
        </div>

        <p className="text-xs font-medium">{movie.release_date.slice(0, -6)}</p>
      </header>

      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-white">
        {movie.title}
      </p>
    </div>
  )
}
