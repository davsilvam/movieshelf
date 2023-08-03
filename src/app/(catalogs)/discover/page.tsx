'use client'

import Link from 'next/link'
import { Fragment } from 'react'

import {
  CatalogPagination,
  FiltersBar,
  FiltersDropdown,
  GenresDropdown,
  MovieCard,
  MovieContainerSkeleton,
  PageTitle,
  SortBySelect,
} from 'components'

import { useDiscoverMovies } from './hooks'

export default function Discover() {
  const {
    discoverMovies: { data: discoverMovies, isLoading },
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useDiscoverMovies()

  return (
    <div className="flex items-center">
      <section className="relative flex w-full flex-col gap-8 px-6 md:px-10">
        <header className="flex flex-col gap-5">
          <div className="flex justify-between gap-4 max-md:flex-col md:items-end">
            <PageTitle>Descubra</PageTitle>

            <div className="flex flex-wrap items-center gap-3">
              <GenresDropdown />
              <FiltersDropdown />
              <SortBySelect />
            </div>
          </div>

          <FiltersBar />
        </header>

        {isLoading ? (
          <MovieContainerSkeleton hasTitle={false} />
        ) : (
          <Fragment>
            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
              {discoverMovies?.results?.map((movie) => (
                <Link href={`/details/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>

            {discoverMovies && (
              <CatalogPagination
                currentPage={currentPage}
                totalPages={discoverMovies?.total_pages}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                goToPage={goToPage}
              />
            )}
          </Fragment>
        )}
      </section>
    </div>
  )
}
