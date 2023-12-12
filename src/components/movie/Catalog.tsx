'use client'

import { Fragment } from 'react'

import { Flame, Heart, HeartCrack, Orbit, Sparkle } from 'lucide-react'

import { CategoryCards } from 'components'

import { useMovieCatalog } from './hooks'
import { useMovies } from 'hooks'

import { MovieContainer } from '.'

export function MovieCatalog() {
  const {
    nowPlayingMovies: { data: nowPlayingMovies, isLoading },
  } = useMovies()
  const { movieQueries } = useMovieCatalog([16, 28, 18, 10749, 878])

  return (
    <main className="flex flex-col items-center gap-16 px-6 pb-40 pt-16 md:px-10">
      {isLoading ? (
        <Fragment>
          <div className="flex w-full items-center justify-between gap-3 font-alt text-2xl text-white max-md:flex-col md:gap-4 lg:gap-8 xl:gap-20 xl:text-4xl">
            <div className="h-32 w-full animate-pulse rounded-md bg-shark md:h-52" />
            <div className="h-32 w-full animate-pulse rounded-md bg-shark md:h-52" />
            <div className="h-32 w-full animate-pulse rounded-md bg-shark md:h-52" />
          </div>

          <MovieContainer.Skeleton hasTitle />
        </Fragment>
      ) : (
        <Fragment>
          <CategoryCards />

          {nowPlayingMovies && (
            <MovieContainer.Root movies={nowPlayingMovies}>
              <MovieContainer.Title icon={Flame}>
                Novidades
              </MovieContainer.Title>
            </MovieContainer.Root>
          )}
        </Fragment>
      )}

      {movieQueries[0] && (
        <MovieContainer.Root movies={movieQueries[0]} range={[1, 6]}>
          <MovieContainer.Title icon={Sparkle}>Animação</MovieContainer.Title>
          <MovieContainer.Banner movie={movieQueries[0][0]} />
        </MovieContainer.Root>
      )}

      {movieQueries[1] && (
        <MovieContainer.Root movies={movieQueries[1]}>
          <MovieContainer.Title icon={Flame}>Ação</MovieContainer.Title>
        </MovieContainer.Root>
      )}

      {movieQueries[2] && (
        <MovieContainer.Root movies={movieQueries[2]} range={[1, 6]}>
          <MovieContainer.Title icon={HeartCrack}>Drama</MovieContainer.Title>
          <MovieContainer.Banner movie={movieQueries[2][0]} />
        </MovieContainer.Root>
      )}

      {movieQueries[3] && (
        <MovieContainer.Root movies={movieQueries[3]}>
          <MovieContainer.Title icon={Heart}>Romance</MovieContainer.Title>
        </MovieContainer.Root>
      )}

      {movieQueries[4] && (
        <MovieContainer.Root movies={movieQueries[4]} range={[1, 6]}>
          <MovieContainer.Title icon={Orbit}>
            Ficção Científica
          </MovieContainer.Title>
          <MovieContainer.Banner movie={movieQueries[4][0]} />
        </MovieContainer.Root>
      )}
    </main>
  )
}
