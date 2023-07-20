import { Fragment } from 'react'

import { ChevronRight } from 'lucide-react'

import { LinkButton } from 'components'

import { cn, movieGenres } from 'utils'

import { Movie } from 'types'

interface MovieBannerProps {
  movie: Movie
}

export function MovieBanner({ movie }: MovieBannerProps) {
  const movieBackdrop = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`

  return (
    <div
      className={cn(
        'flex flex-col items-end justify-between',
        'h-[400px] w-full rounded-xl p-10',
        'bg-cover bg-top shadow-genreBanner',
      )}
      style={{
        backgroundImage: movieBackdrop,
      }}
    >
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          {movie.genre_ids.map((genreId) => (
            <Fragment key={genreId}>
              {movie.genre_ids.indexOf(genreId) > 0 && (
                <div className="h-4 w-[1px] bg-oslo" />
              )}

              <p className="font-alt uppercase text-white">
                {movieGenres[genreId]}
              </p>
            </Fragment>
          ))}
        </div>

        <p
          className="max-w-lg text-right font-alt text-5xl uppercase text-white"
          style={{ lineHeight: '64px' }}
        >
          {movie.title}
        </p>
      </div>

      <LinkButton href={`/movie/${movie.id}`} icon={ChevronRight}>
        Detalhes
      </LinkButton>
    </div>
  )
}
