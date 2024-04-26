import { Fragment } from 'react'

import { ImageOff } from 'lucide-react'

import { cn } from 'utils'

import { MovieDetailsResponse } from 'types'

interface DetailsBannerProps {
  movie: MovieDetailsResponse
}

export function DetailsBanner({ movie }: DetailsBannerProps) {
  const movieBackdrop = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`

  return (
    <Fragment>
      {movie.backdrop_path ? (
        <div
          className={cn(
            'absolute left-0 top-0 -z-10',
            'h-[600px] w-full',
            'bg-cover bg-top',
          )}
          style={{
            backgroundImage: movieBackdrop,
            boxShadow: '0px -180px 100px 0px #111214 inset',
          }}
        >
          <div className="absolute top-0 z-0 h-full w-full bg-woodsmoke/20" />
        </div>
      ) : (
        <div
          className={cn(
            'absolute left-0 top-0 -z-10',
            'flex items-center justify-center',
            'h-[600px] w-full',
            'text-woodsmoke',
            'bg-oslo/50',
          )}
          style={{
            boxShadow: '0px -180px 100px 0px #111214 inset',
          }}
        >
          <ImageOff className="h-7 w-7" />
        </div>
      )}
    </Fragment>
  )
}
