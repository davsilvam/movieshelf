import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

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
  page: number
  goToPage: (page: number) => void
}

export function useDiscoverMovies({
  loadDiscoverMovies,
  page,
  goToPage,
}: UseDiscoverMoviesProps) {
  const searchParams = useSearchParams().toString()

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['discover'],
    })

    goToPage(1)
  }, [searchParams, goToPage])

  const getDiscoverMoviesByQuery = useCallback(async () => {
    const response = await loadDiscoverMovies.execute(searchParams, page)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading discover movies.')
    }

    return response.body
  }, [searchParams, page, loadDiscoverMovies])

  const { data: discoverMovies, isLoading } = useQuery(
    ['movies', 'discover', searchParams, 'query', page],
    getDiscoverMoviesByQuery,
  )

  return {
    discoverMovies,
    isLoading,
  }
}
