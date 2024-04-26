import { useCallback, useMemo } from 'react'

import { useQueries, useQuery } from '@tanstack/react-query'
import { HttpResponse, HttpStatusCodes } from 'adapters'

import { Movie } from 'types'

export type LoadMovies = {
  loadAll: () => Promise<
    HttpResponse<{
      results: Movie[]
    }>
  >
}

export type LoadMoviesByGenre = {
  loadAll: (genreId: number) => Promise<
    HttpResponse<{
      results: Movie[]
    }>
  >
}

interface UseMoviesProps {
  loadNowPlayingMovies: LoadMovies
  loadPopularMovies: LoadMovies
  loadTopRatedMovies: LoadMovies
}

export function useMovies({
  loadNowPlayingMovies,
  loadPopularMovies,
  loadTopRatedMovies,
}: UseMoviesProps) {
  const {
    nowPlayingMovies,
    hottestMovies,
    isLoading: isNowPlayingLoading,
  } = useNowPlayingMovies({
    loadNowPlayingMovies,
  })

  const { popularMovies, isLoading: isPopularLoading } = usePopularMovies({
    loadPopularMovies,
  })

  const { topRatedMovies, isLoading: isTopRatedLoading } = useTopRatedMovies({
    loadTopRatedMovies,
  })

  return {
    nowPlayingMovies,
    hottestMovies,
    popularMovies,
    topRatedMovies,
    isNowPlayingLoading,
    isPopularLoading,
    isTopRatedLoading,
  }
}

export function useNowPlayingMovies({
  loadNowPlayingMovies,
}: Pick<UseMoviesProps, 'loadNowPlayingMovies'>) {
  const getNowPlayingMovies = useCallback(async () => {
    const response = await loadNowPlayingMovies.loadAll()

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movies')
    }

    return response.body?.results ?? []
  }, [loadNowPlayingMovies])

  const { data: nowPlayingMovies, isLoading } = useQuery(
    ['movies', 'now-playing', 'category', 'list'],
    getNowPlayingMovies,
  )

  const hottestMovies = useMemo(() => {
    return nowPlayingMovies?.slice(0, 10)
  }, [nowPlayingMovies])

  return {
    nowPlayingMovies,
    hottestMovies,
    isLoading,
  }
}

export function usePopularMovies({
  loadPopularMovies,
}: Pick<UseMoviesProps, 'loadPopularMovies'>) {
  const getPopularMovies = useCallback(async () => {
    const response = await loadPopularMovies.loadAll()

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movies.')
    }

    return response.body?.results ?? []
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

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movies.')
    }

    return response.body?.results ?? []
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

export function useMoviesByGenre({
  loadMoviesByGenre,
  genreIds,
}: {
  loadMoviesByGenre: LoadMoviesByGenre
  genreIds: number[]
}) {
  const getMoviesByGenre = useCallback(
    async (genreId: number) => {
      const response = await loadMoviesByGenre.loadAll(genreId)

      if (response.statusCode !== HttpStatusCodes.ok) {
        throw new Error('Error loading movies.')
      }

      return response.body?.results ?? []
    },
    [loadMoviesByGenre],
  )

  const movieQueries = useQueries({
    queries: genreIds.map(genreId => {
      return {
        queryKey: ['movies', 'genre', genreId, 'list'],
        queryFn: () => getMoviesByGenre(genreId),
      }
    }),
  }).map(query => query.data)

  return {
    movieQueries,
  }
}
