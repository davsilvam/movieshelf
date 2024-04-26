import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpResponse, HttpStatusCodes } from 'adapters'

import { MovieListResponse } from 'types'

import { queryClient } from 'services'

export type LoadDiscoverMovies = {
  execute: (
    query: string,
    page: number,
  ) => Promise<HttpResponse<MovieListResponse>>
}

interface UseDiscoverMoviesProps {
  loadDiscoverMovies: LoadDiscoverMovies
}

export function useDiscoverMovies({
  loadDiscoverMovies,
}: UseDiscoverMoviesProps) {
  const searchParams = useSearchParams().toString()
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['discover'],
    })

    setCurrentPage(1)
  }, [searchParams])

  const getDiscoverMoviesByQuery = useCallback(async () => {
    const response = await loadDiscoverMovies.execute(searchParams, currentPage)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading discover movies.')
    }

    return response.body
  }, [searchParams, currentPage, loadDiscoverMovies])

  const { data: discoverMovies, isLoading } = useQuery(
    ['movies', 'discover', searchParams, 'query', currentPage],
    getDiscoverMoviesByQuery,
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
    discoverMovies,
    isLoading,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}
