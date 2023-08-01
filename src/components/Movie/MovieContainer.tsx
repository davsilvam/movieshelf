import Link from 'next/link'
import { ElementType } from 'react'

import { Movie } from 'types'

import { MovieBanner, MovieCard } from './'

interface MovieContainerProps {
  icon: ElementType
  title: string
  hasBanner?: boolean
  movies: Movie[]
}

export function MovieContainer({
  icon: Icon,
  title,
  movies,
  hasBanner = false,
}: MovieContainerProps) {
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="text-white">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          <p className="text-2xl font-semibold">{title}</p>
        </div>
      </header>

      {hasBanner && <MovieBanner movie={movies[0]} />}

      <div className="grid grid-cols-5 gap-10">
        {movies
          .filter((movie) => {
            if (hasBanner) {
              return movies.indexOf(movie) > 0 && movies.indexOf(movie) < 6
            }

            return movies.indexOf(movie) < 10
          })
          .map((movie) => (
            <Link href={`/details/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
      </div>
    </section>
  )
}
