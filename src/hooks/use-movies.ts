import { useCallback } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpResponse } from 'infra/adapters'

import { Movie } from 'types'

export type LoadMovies = {
  loadAll: () => Promise<HttpResponse<Movie[]>>
}

interface UseMoviesProps {
  loadHottestMovies: LoadMovies
  loadPopularMovies: LoadMovies
  loadTopRatedMovies: LoadMovies
}

export function useHottestMovies({
  loadHottestMovies,
}: Pick<UseMoviesProps, 'loadHottestMovies'>) {
  const getNowPlayingMovies = useCallback(async () => {
    const response = await loadHottestMovies.loadAll()

    if (!response.body) {
      return []
    }

    return response.body
  }, [loadHottestMovies])

  const { data: nowPlayingMovies, isLoading } = useQuery(
    ['movies', 'now-playing', 'category', 'list'],
    getNowPlayingMovies,
  )

  return {
    nowPlayingMovies,
    isLoading,
  }
}

export function usePopularMovies({
  loadPopularMovies,
}: Pick<UseMoviesProps, 'loadPopularMovies'>) {
  const getPopularMovies = useCallback(async () => {
    const response = await loadPopularMovies.loadAll()

    if (!response.body) {
      return []
    }

    return response.body
  }, [loadPopularMovies])

  const { data: popularMovies, isLoading } = useQuery(
    ['movies', 'popular', 'category', 'list'],
    getPopularMovies,
  )

  return {
    popularMovies,
    isLoading,
  }
}

export function useTopRatedMovies({
  loadTopRatedMovies,
}: Pick<UseMoviesProps, 'loadTopRatedMovies'>) {
  const getTopRatedMovies = useCallback(async () => {
    const response = await loadTopRatedMovies.loadAll()

    if (!response.body) {
      return []
    }

    return response.body
  }, [loadTopRatedMovies])

  const { data: topRatedMovies, isLoading } = useQuery(
    ['movies', 'top-rated', 'category', 'list'],
    getTopRatedMovies,
  )

  return {
    topRatedMovies,
    isLoading,
  }
}
