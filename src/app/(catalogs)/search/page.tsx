'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

import { FetchHttpClientAdapter, HttpClient } from 'infra/adapters'
import { SearchX } from 'lucide-react'

import {
  BannerCard,
  BannerSkeleton,
  CatalogPagination,
  MovieCard,
  MovieContainer,
  PageTitle,
  SearchBar,
} from 'components'

import { useSearchedMovie } from 'hooks'

import { MovieQuery } from 'types'

function loadSearchedMovies(httpClient: HttpClient<MovieQuery>) {
  async function loadAll(title: string, page: number) {
    return httpClient.request({
      url: `search/movie?query=${title}&language=pt-BR&page=${page}`,
      method: 'get',
    })
  }

  return { loadAll }
}

export default function Search() {
  const title = useSearchParams().get('query')

  const {
    searchedMovies,
    isLoading,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useSearchedMovie({
    loadSearchedMovies: loadSearchedMovies(new FetchHttpClientAdapter()),
    movieTitle: title || '',
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
