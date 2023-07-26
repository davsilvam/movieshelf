'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

import {
  BannerCard,
  BannerSkeleton,
  MovieCard,
  MovieContainerSkeleton,
  PageTitle,
  SearchBar,
} from 'components'

import { useSearchedMovie } from './hooks/useSearchedMovie'

export default function Search() {
  const title = useSearchParams().get('query')

  const {
    searchedMovies: { data: searchedMovies, isLoading },
  } = useSearchedMovie(title ?? '')

  return (
    <main className="relative pb-10">
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        searchedMovies && (
          <div className="h-[90vh] max-w-full">
            <BannerCard movie={searchedMovies?.results[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-10 py-16">
        {isLoading ? (
          <MovieContainerSkeleton />
        ) : (
          <Fragment>
            <div className="flex flex-col gap-10">
              <PageTitle>Pesquisa</PageTitle>

              <div className="flex flex-col gap-3">
                <SearchBar size="full" />
                <h2 className="text-oslo">
                  Com base na sua pesquisa para:{' '}
                  <span className="font-semibold text-white">{title}</span>
                </h2>{' '}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-12">
              {searchedMovies?.results.map((movie) => (
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
