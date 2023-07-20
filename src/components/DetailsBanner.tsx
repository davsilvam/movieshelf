import { cn } from 'utils'

import { QueryMovie } from 'types'

interface DetailsBannerProps {
  movie: QueryMovie
}

export function DetailsBanner({ movie }: DetailsBannerProps) {
  const movieBackdrop = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`

  return (
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
  )
}
