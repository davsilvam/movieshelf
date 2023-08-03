'use client'

import Link from 'next/link'
import { Fragment } from 'react'

import {
  BannerCard,
  BannerSkeleton,
  MovieCard,
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
        {isLoading ? (
          <MovieContainerSkeleton />
        ) : (
          <Fragment>
            <PageTitle>Melhor Avaliados</PageTitle>

            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
              {topRatedMovies?.map((movie) => (
                <Link href={`/details/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </Fragment>
        )}
      </section>
    </main>
  )
}
