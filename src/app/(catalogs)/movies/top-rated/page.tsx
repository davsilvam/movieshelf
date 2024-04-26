'use client'

import { Fragment } from 'react'

import { httpClientFactory } from 'factories'
import { LoadTopRatedMoviesGateway } from 'gateways'

import {
  BannerCard,
  BannerSkeleton,
  MovieContainer,
  PageTitle,
} from 'components'

import { useTopRatedMovies } from 'hooks'

export default function TopRated() {
  const loadTopRatedMovies = new LoadTopRatedMoviesGateway(httpClientFactory)

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
