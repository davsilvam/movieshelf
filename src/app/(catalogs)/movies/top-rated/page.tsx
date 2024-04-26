'use client'

import { Fragment } from 'react'

import { FetchHttpClientAdapter, HttpClient } from 'infra/adapters'

import {
  BannerCard,
  BannerSkeleton,
  MovieContainer,
  PageTitle,
} from 'components'

import { LoadMovies, useTopRatedMovies } from 'hooks'

import { Movie } from 'types'

function loadMovies(httpClient: HttpClient<Movie[]>): LoadMovies {
  async function loadAll() {
    return httpClient.request({
      url: '/movies/now_playing?language=pt-BR',
      method: 'get',
    })
  }

  return {
    loadAll,
  }
}

export default function TopRated() {
  const loadTopRatedMovies = loadMovies(new FetchHttpClientAdapter<Movie[]>())

  const { topRatedMovies, isLoading } = useTopRatedMovies({
    loadTopRatedMovies,
  })

  return (
    <main>
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        topRatedMovies && (
          <div className="h-[70vh] max-w-full md:h-[80vh] lg:h-[90vh]">
            <BannerCard movie={topRatedMovies[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-16">
        <PageTitle>Melhor Avaliados</PageTitle>

        {isLoading ? (
          <MovieContainer.Skeleton />
        ) : (
          <Fragment>
            {topRatedMovies && (
              <MovieContainer.Root movies={topRatedMovies} range={[0, 21]} />
            )}
          </Fragment>
        )}
      </section>
    </main>
  )
}
