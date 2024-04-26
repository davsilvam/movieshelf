'use client'

import { Fragment } from 'react'

import { FetchHttpClientAdapter, HttpClient } from 'infra/adapters'

import {
  BannerCard,
  BannerSkeleton,
  MovieContainer,
  PageTitle,
} from 'components'

import { LoadMovies, useHottestMovies } from 'hooks'

import { Movie } from 'types'

function loadMovies(
  httpClient: HttpClient<{
    results: Movie[]
  }>,
): LoadMovies {
  async function loadAll() {
    return httpClient.request({
      url: '/movie/now_playing?language=pt-BR',
      method: 'get',
    })
  }

  return {
    loadAll,
  }
}

export default function Hottest() {
  const loadHottestMovies = loadMovies(new FetchHttpClientAdapter())

  const { nowPlayingMovies, isLoading } = useHottestMovies({
    loadHottestMovies,
  })

  return (
    <main>
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        nowPlayingMovies && (
          <div className="h-[70vh] max-w-full md:h-[80vh] lg:h-[90vh]">
            <BannerCard movie={nowPlayingMovies[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-16">
        <PageTitle>Novidades</PageTitle>

        {isLoading ? (
          <MovieContainer.Skeleton />
        ) : (
          <Fragment>
            {nowPlayingMovies && (
              <MovieContainer.Root movies={nowPlayingMovies} range={[0, 21]} />
            )}
          </Fragment>
        )}
      </section>
    </main>
  )
}
