'use client'

import { Fragment } from 'react'

import { FetchHttpClientAdapter, HttpClient } from 'infra/adapters'
import { Flame, Heart, HeartCrack, Orbit, Sparkle } from 'lucide-react'

import { CategoryCards } from 'components'

import {
  LoadMovies,
  LoadMoviesByGenre,
  useHottestMovies,
  useMoviesByGenre,
} from 'hooks'

import { Movie } from 'types'

import { MovieContainer } from '.'

function loadPopularMovies(
  httpClient: HttpClient<{
    results: Movie[]
  }>,
) {
  async function loadAll() {
    return httpClient.request({
      url: '/movie/popular?language=pt-BR',
      method: 'get',
    })
  }

  return { loadAll }
}

function loadTopRatedMovies(
  httpClient: HttpClient<{
    results: Movie[]
  }>,
) {
  async function loadAll() {
    return httpClient.request({
      url: '/movie/top_rated?language=pt-BR',
      method: 'get',
    })
  }

  return { loadAll }
}

interface MovieCatalogProps {
  loadHottestMovies: LoadMovies
  loadMoviesByGenre: LoadMoviesByGenre
}

export function MovieCatalog({
  loadHottestMovies,
  loadMoviesByGenre,
}: MovieCatalogProps) {
  const { nowPlayingMovies, isLoading } = useHottestMovies({
    loadHottestMovies,
  })

  const { movieQueries } = useMoviesByGenre({
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
            loadHottestMovies={loadHottestMovies}
            loadPopularMovies={loadPopularMovies(new FetchHttpClientAdapter())}
            loadTopRatedMovies={loadTopRatedMovies(
              new FetchHttpClientAdapter(),
            )}
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
