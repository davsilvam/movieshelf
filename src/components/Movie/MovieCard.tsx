import Image from 'next/image'
import { Fragment } from 'react'

import { ImageOff } from 'lucide-react'

import { movieGenres } from 'utils'

import { Movie } from 'types'

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
          className="aspect-[2/3] w-full rounded-lg opacity-80 transition-opacity hover:opacity-100"
          height={330}
          width={220}
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-oslo">
          <ImageOff className="h-5 w-5 text-woodsmoke" />
        </div>
      )}

      <p className="mb-1 mt-3 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-white max-sm:text-sm">
        {movie.title}
      </p>

      <div className="flex items-center justify-between gap-2 text-oslo max-sm:hidden">
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

        <p className="text-xs font-medium">
          {movie.release_date && movie.release_date.slice(0, -6)}
        </p>
      </div>
    </div>
  )
}
