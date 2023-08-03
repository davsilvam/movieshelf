'use client'

import { Fragment } from 'react'

import {
  BannerCard,
  BannerSkeleton,
  MovieContainer,
  MovieContainerSkeleton,
  PageTitle,
} from 'components'

import { useMovies } from 'hooks'

export default function TopRated() {
  const {
    topRatedMovies: { data: topRatedMovies, isLoading },
  } = useMovies()

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
          <MovieContainerSkeleton />
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
