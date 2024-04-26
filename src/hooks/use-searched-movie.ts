import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpResponse, HttpStatusCodes } from 'adapters'

import { MovieListResponse } from 'types'

import { queryClient } from 'services'

export type LoadSearchedMovies = {
  loadAll: (
    title: string,
    page: number,
  ) => Promise<HttpResponse<MovieListResponse>>
}

interface UseSearchedMoviesProps {
  loadSearchedMovies: LoadSearchedMovies
  movieTitle: string
}

export function useSearchedMovie({
  loadSearchedMovies,
  movieTitle,
}: UseSearchedMoviesProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['search'],
    })

    setCurrentPage(1)
  }, [movieTitle])

  const getMoviesByTitle = async () => {
    const response = await loadSearchedMovies.loadAll(movieTitle, currentPage)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading searched movies.')
    }

    return response.body
  }

  const { data: searchedMovies, isLoading } = useQuery(
    ['movies', 'search', 'list', movieTitle, currentPage],
    getMoviesByTitle,
  )

  function goToNextPage() {
    setCurrentPage(state => state + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(state => state - 1)
  }

  function goToPage(page: number) {
    setCurrentPage(page)
  }

  return {
    currentPage,
    isLoading,
    searchedMovies,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}
