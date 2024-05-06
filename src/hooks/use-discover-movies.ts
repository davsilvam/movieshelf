import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpStatusCodes } from 'adapters'
import { MovieGateway } from 'gateways/movie-gateway'

import { queryClient } from 'services'

interface UseDiscoverMoviesProps {
  movieGateway: MovieGateway
  page: number
  goToPage: (page: number) => void
}

export function useDiscoverMovies({
  movieGateway,
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
    const response = await movieGateway.getDiscoverMovies(searchParams, page)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading discover movies.')
    }

    return response.body
  }, [searchParams, page, movieGateway])

  const { data: discoverMovies, isLoading } = useQuery(
    ['movies', 'discover', searchParams, 'query', page],
    getDiscoverMoviesByQuery,
  )

  return {
    discoverMovies,
    isLoading,
  }
}
