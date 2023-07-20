'use client'

import { Fragment } from 'react'

import { Flame, Heart, HeartCrack, Orbit, Sparkle } from 'lucide-react'

import { CategoryCards } from 'components'

import { useMovieCatalog } from './hooks'
import { useMovies } from 'hooks'

import { MovieContainer, MovieContainerSkeleton } from './'

export function MovieCatalog() {
  const {
    nowPlayingMovies: { data: nowPlayingMovies, isLoading },
  } = useMovies()
  const { movieQueries } = useMovieCatalog([16, 28, 18, 10749, 878])

  return (
    <main className="flex flex-col items-center gap-16 px-10 pb-40 pt-16">
      {isLoading ? (
        <Fragment>
          <div className="flex w-full items-center justify-between gap-20">
            <div className="h-52 w-full animate-pulse rounded-md bg-shark" />
            <div className="h-52 w-full animate-pulse rounded-md bg-shark" />
            <div className="h-52 w-full animate-pulse rounded-md bg-shark" />
          </div>

          <MovieContainerSkeleton />
        </Fragment>
      ) : (
        <Fragment>
          <CategoryCards />

          {nowPlayingMovies && (
            <MovieContainer
              icon={Flame}
              title="Novidades"
              movies={nowPlayingMovies}
            />
          )}
        </Fragment>
      )}

      {movieQueries[0] && (
        <MovieContainer
          icon={Sparkle}
          title="Animação"
          movies={movieQueries[0]}
          hasBanner
        />
      )}

      {movieQueries[1] && (
        <MovieContainer icon={Flame} title="Ação" movies={movieQueries[1]} />
      )}

      {movieQueries[2] && (
        <MovieContainer
          icon={HeartCrack}
          title="Drama"
          movies={movieQueries[2]}
          hasBanner
        />
      )}

      {movieQueries[3] && (
        <MovieContainer icon={Heart} title="Romance" movies={movieQueries[3]} />
      )}

      {movieQueries[4] && (
        <MovieContainer
          icon={Orbit}
          title="Ficção Científica"
          movies={movieQueries[4]}
          hasBanner
        />
      )}
    </main>
  )
}
