'use client'

import { Fragment } from 'react'

import {
  CatalogPagination,
  FiltersBar,
  FiltersDropdown,
  GenresDropdown,
  MovieContainer,
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
          <MovieContainer.Skeleton hasTitle={false} />
        ) : (
          <Fragment>
            {discoverMovies && (
              <MovieContainer.Root movies={discoverMovies.results} />
            )}

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
