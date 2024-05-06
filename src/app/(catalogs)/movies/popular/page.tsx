'use client'

import { Fragment } from 'react'

import {
  BannerCard,
  BannerSkeleton,
  MovieContainer,
  PageTitle,
} from 'components'

import { useMoviesDependencies } from 'contexts/hooks/use-movies-dependencies'
import { usePopularMovies } from 'hooks'

export default function Popular() {
  const { movieGateway } = useMoviesDependencies()

  const { popularMovies, isLoading } = usePopularMovies(movieGateway)

  return (
    <main>
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        popularMovies && (
          <div className="h-[70vh] max-w-full md:h-[80vh] lg:h-[90vh]">
            <BannerCard movie={popularMovies[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-16">
        <PageTitle>Popular</PageTitle>

        {isLoading ? (
          <MovieContainer.Skeleton />
        ) : (
          <Fragment>
            {popularMovies && (
              <MovieContainer.Root movies={popularMovies} range={[0, 21]} />
            )}
          </Fragment>
        )}
      </section>
    </main>
  )
}
