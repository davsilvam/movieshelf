import Link from 'next/link'
import { Fragment } from 'react'

import { ChevronRight } from 'lucide-react'

import { Button } from 'components'

import { cn, movieGenres } from 'utils'

import { Movie } from 'types'

interface MovieContainerBannerProps {
  movie: Movie
}

export function MovieContainerBanner({ movie }: MovieContainerBannerProps) {
  const movieBackdrop = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`

  return (
    <div
      className={cn(
        'flex flex-col items-end justify-between',
        'min-h-[160px] w-full rounded-lg p-5 md:h-[320px] md:p-10 lg:h-[400px]',
        'bg-cover bg-top shadow-genreBanner',
      )}
      style={{
        backgroundImage: movieBackdrop,
      }}
    >
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          {movie.genre_ids.map(genreId => (
            <Fragment key={genreId}>
              {movie.genre_ids.indexOf(genreId) > 0 && (
                <div className="h-4 w-[1px] bg-oslo max-sm:h-3" />
              )}

              <p className="font-alt uppercase text-white max-sm:text-xs">
                {movieGenres[genreId]}
              </p>
            </Fragment>
          ))}
        </div>

        <p className="max-w-md text-right font-alt text-2xl uppercase text-white md:text-5xl lg:max-w-lg">
          {movie.title}
        </p>
      </div>

      <Button asChild size={'lg'}>
        <Link href={`/details/${movie.id}`}>
          Detalhes
          <ChevronRight className="w-5" />
        </Link>
      </Button>
    </div>
  )
}
