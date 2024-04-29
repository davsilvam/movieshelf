'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

import { httpClientFactory } from 'factories'
import { LoadSearchedMoviesGateway } from 'gateways'
import { SearchX } from 'lucide-react'

import {
  BannerCard,
  BannerSkeleton,
  MovieCard,
  MovieContainer,
  PageTitle,
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  SearchBar,
  usePagination,
} from 'components'

import { useSearchedMovie } from 'hooks'

export default function Search() {
  const title = useSearchParams().get('query')

  const loadSearchedMovies = new LoadSearchedMoviesGateway(httpClientFactory)

  const {
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPage,
    goToPreviousPage,
  } = usePagination()

  const { searchedMovies, isLoading } = useSearchedMovie({
    loadSearchedMovies,
    movieTitle: title || '',
    page: currentPage,
    goToPage: setCurrentPage,
  })

  return (
    <main className="relative pb-10">
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        searchedMovies?.results[0] && (
          <div className="h-[70vh] max-w-full md:h-[80vh] lg:h-[90vh]">
            <BannerCard movie={searchedMovies.results[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-16">
        <div className="flex flex-col gap-6">
          <PageTitle>Pesquisa</PageTitle>

          <div className="flex flex-col gap-3">
            <SearchBar size="full" />
            <h2 className="text-oslo max-md:text-sm">
              Com base na sua pesquisa para:{' '}
              <span className="font-semibold text-white">{title}</span>
            </h2>{' '}
          </div>
        </div>

        {isLoading ? (
          <MovieContainer.Skeleton />
        ) : (
          <Fragment>
            {searchedMovies?.results && searchedMovies.results.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
                {searchedMovies.results.map(movie => (
                  <Link href={`/details/${movie.id}`} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-32 flex flex-col items-center justify-center gap-3 text-white max-md:text-sm">
                <SearchX className="h-7 w-7 text-carnation" />
                <p>Nenhum filme com esse nome foi encontrado.</p>
              </div>
            )}
          </Fragment>
        )}

        {searchedMovies && searchedMovies.total_pages > 1 && (
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
                  <PaginationButton onClick={() => goToPage(currentPage - 1)}>
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
                  <PaginationButton onClick={() => goToPage(currentPage + 3)}>
                    {currentPage + 3}
                  </PaginationButton>
                </PaginationItem>
              )}

              {searchedMovies.total_pages - currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  disabled={currentPage === searchedMovies.total_pages}
                  onClick={goToNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </main>
  )
}
