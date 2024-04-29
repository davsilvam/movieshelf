'use client'

import { Fragment } from 'react'

import { Flame, Heart, HeartCrack, Orbit, Sparkle } from 'lucide-react'

import { CategoryCards } from 'components'

import {
  LoadMovies,
  LoadMoviesByGenre,
  useNowPlayingMovies,
  useMoviesByGenre,
} from 'hooks'

import { MovieContainer } from '.'

interface MovieCatalogProps {
  loadNowPlayingMovies: LoadMovies
  loadPopularMovies: LoadMovies
  loadTopRatedMovies: LoadMovies
  loadMoviesByGenre: LoadMoviesByGenre
}

export function MovieCatalog({
  loadNowPlayingMovies,
  loadPopularMovies,
  loadTopRatedMovies,
  loadMoviesByGenre,
}: MovieCatalogProps) {
  const { nowPlayingMovies, isLoading } = useNowPlayingMovies({
    loadNowPlayingMovies,
  })

  const {
    movieQueries: [
      animationMovies,
      actionMovies,
      dramaMovies,
      romanceMovies,
      sciFiMovies,
    ],
  } = useMoviesByGenre({
    loadMoviesByGenre,
    genreIds: [16, 28, 18, 10749, 878],
  })

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
          <CategoryCards
            loadNowPlayingMovies={loadNowPlayingMovies}
            loadPopularMovies={loadPopularMovies}
            loadTopRatedMovies={loadTopRatedMovies}
          />

          {nowPlayingMovies && (
            <MovieContainer.Root movies={nowPlayingMovies}>
              <MovieContainer.Title icon={Flame}>
                Novidades
              </MovieContainer.Title>
            </MovieContainer.Root>
          )}
        </Fragment>
      )}

      {animationMovies && (
        <MovieContainer.Root movies={animationMovies} range={[1, 6]}>
          <MovieContainer.Title icon={Sparkle}>Animação</MovieContainer.Title>
          <MovieContainer.Banner movie={animationMovies[0]} />
        </MovieContainer.Root>
      )}

      {actionMovies && (
        <MovieContainer.Root movies={actionMovies}>
          <MovieContainer.Title icon={Flame}>Ação</MovieContainer.Title>
        </MovieContainer.Root>
      )}

      {dramaMovies && (
        <MovieContainer.Root movies={dramaMovies} range={[1, 6]}>
          <MovieContainer.Title icon={HeartCrack}>Drama</MovieContainer.Title>
          <MovieContainer.Banner movie={dramaMovies[0]} />
        </MovieContainer.Root>
      )}

      {romanceMovies && (
        <MovieContainer.Root movies={romanceMovies}>
          <MovieContainer.Title icon={Heart}>Romance</MovieContainer.Title>
        </MovieContainer.Root>
      )}

      {sciFiMovies && (
        <MovieContainer.Root movies={sciFiMovies} range={[1, 6]}>
          <MovieContainer.Title icon={Orbit}>
            Ficção Científica
          </MovieContainer.Title>
          <MovieContainer.Banner movie={sciFiMovies[0]} />
        </MovieContainer.Root>
      )}
    </main>
  )
}
