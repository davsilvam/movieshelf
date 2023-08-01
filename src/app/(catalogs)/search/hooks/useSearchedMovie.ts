import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { fetchWrapper } from 'functions'

import { MovieQuery } from 'types'

export function useSearchedMovie(movieTitle: string) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const searchedMovies = useQuery(
    ['movies', 'search', 'list', movieTitle, currentPage],
    getMoviesByTitle,
  )

  async function getMoviesByTitle() {
    const data = await fetchWrapper<MovieQuery>(
      `search/movie?query=${movieTitle}&language=pt-BR&page=${currentPage}`,
    )

    return data
  }

  function goToNextPage() {
    setCurrentPage((state) => state + 1)
  }

  function goToPreviousPage() {
    setCurrentPage((state) => state - 1)
  }

  function goToPage(page: number) {
    setCurrentPage(page)
  }

  return {
    currentPage,
    searchedMovies,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}
