'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

import { SearchX } from 'lucide-react'

import {
  BannerCard,
  BannerSkeleton,
  CatalogPagination,
  MovieCard,
  MovieContainerSkeleton,
  PageTitle,
  SearchBar,
} from 'components'

import { useSearchedMovie } from './hooks'

export default function Search() {
  const title = useSearchParams().get('query')

  const {
    searchedMovies: { data: searchedMovies, isLoading },
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useSearchedMovie(title ?? '')

  return (
    <main className="relative pb-10">
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        searchedMovies?.results[0] && (
          <div className="h-[90vh] max-w-full">
            <BannerCard movie={searchedMovies.results[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-10 py-16">
        {isLoading ? (
          <MovieContainerSkeleton />
        ) : (
          <Fragment>
            <div className="flex flex-col gap-6">
              <PageTitle>Pesquisa</PageTitle>

              <div className="flex flex-col gap-3">
                <SearchBar size="full" />
                <h2 className="text-oslo">
                  Com base na sua pesquisa para:{' '}
                  <span className="font-semibold text-white">{title}</span>
                </h2>{' '}
              </div>
            </div>

            {searchedMovies?.results && searchedMovies.results.length > 0 ? (
              <div className="grid grid-cols-5 gap-12">
                {searchedMovies.results.map((movie) => (
                  <Link href={`/details/${movie.id}`} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-32 flex flex-col items-center justify-center gap-3 text-white">
                <SearchX className="h-7 w-7 text-carnation" />
                <p>Nenhum filme com esse nome foi encontrado.</p>
              </div>
            )}
          </Fragment>
        )}

        {searchedMovies && searchedMovies.total_pages > 1 && (
          <CatalogPagination
            currentPage={currentPage}
            totalPages={searchedMovies.total_pages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToPage={goToPage}
          />
        )}
      </section>
    </main>
  )
}
