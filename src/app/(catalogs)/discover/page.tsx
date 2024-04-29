'use client'

import { Fragment } from 'react'

import { httpClientFactory } from 'factories'
import { LoadDiscoverMoviesGateway } from 'gateways'

import {
  FiltersBar,
  FiltersDropdown,
  GenresDropdown,
  MovieContainer,
  PageTitle,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  SortBySelect,
  usePagination,
} from 'components'

import { useDiscoverMovies } from 'hooks'

export default function Discover() {
  const loadDiscoverMovies = new LoadDiscoverMoviesGateway(httpClientFactory)

  const {
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPage,
    goToPreviousPage,
  } = usePagination()

  const { discoverMovies, isLoading } = useDiscoverMovies({
    loadDiscoverMovies,
    page: currentPage,
    goToPage: setCurrentPage,
  })

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
          discoverMovies && (
            <Fragment>
              <MovieContainer.Root movies={discoverMovies.results} />

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={goToPreviousPage}
                    />
                  </PaginationItem>

                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationButton
                        onClick={() => goToPage(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </PaginationButton>
                    </PaginationItem>
                  )}

                  {Array.from({ length: 3 }, (_, index) => (
                    <PaginationItem key={currentPage + index}>
                      <PaginationButton
                        onClick={() => goToPage(currentPage + index)}
                        isActive={currentPage === currentPage + index}
                      >
                        {currentPage + index}
                      </PaginationButton>
                    </PaginationItem>
                  ))}

                  {currentPage === 1 && (
                    <PaginationItem>
                      <PaginationButton
                        onClick={() => goToPage(currentPage + 3)}
                      >
                        {currentPage + 3}
                      </PaginationButton>
                    </PaginationItem>
                  )}

                  {discoverMovies.total_pages - currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      disabled={currentPage === discoverMovies.total_pages}
                      onClick={goToNextPage}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </Fragment>
          )
        )}
      </section>
    </div>
  )
}
