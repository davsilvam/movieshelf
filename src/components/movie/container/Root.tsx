import Link from 'next/link'
import { ReactNode } from 'react'

import { Movie } from 'types'

import { MovieCard } from '../Card'

interface MovieContainerRootProps {
  children?: ReactNode
  movies: Movie[]
  range?: [number, number]
}

export function MovieContainerRoot({
  children,
  movies,
  range = [0, 10],
}: MovieContainerRootProps) {
  return (
    <section className="flex w-full flex-col gap-6">
      {children}
      <div className="grid grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
        {movies
          .filter(
            movie =>
              movies.indexOf(movie) >= range[0] &&
              movies.indexOf(movie) < range[1],
          )
          .map(movie => (
            <Link href={`/details/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
      </div>
    </section>
  )
}
