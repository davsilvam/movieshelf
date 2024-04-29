import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpResponse, HttpStatusCodes } from 'adapters'

import { MovieListResponse } from 'types'

import { queryClient } from 'services'

export type LoadSearchedMovies = {
  execute: (
    title: string,
    page: number,
  ) => Promise<HttpResponse<MovieListResponse>>
}

interface UseSearchedMoviesProps {
  loadSearchedMovies: LoadSearchedMovies
  movieTitle: string
  page: number
  goToPage: (page: number) => void
}

export function useSearchedMovie({
  loadSearchedMovies,
  movieTitle,
  page,
  goToPage,
}: UseSearchedMoviesProps) {
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['search'],
    })

    goToPage(1)
  }, [movieTitle, goToPage])

  const getMoviesByTitle = async () => {
    const response = await loadSearchedMovies.execute(movieTitle, page)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading searched movies.')
    }

    return response.body
  }

  const { data: searchedMovies, isLoading } = useQuery(
    ['movies', 'search', 'list', movieTitle, page],
    getMoviesByTitle,
  )

  return {
    isLoading,
    searchedMovies,
  }
}
