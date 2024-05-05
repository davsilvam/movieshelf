import { useCallback, useMemo } from 'react'

import { useQueries, useQuery } from '@tanstack/react-query'
import { HttpStatusCodes } from 'adapters'
import { MovieGateway } from 'gateways/movie-gateway'

export function useMovies(movieGateway: MovieGateway) {
  const {
    nowPlayingMovies,
    hottestMovies,
    isLoading: isNowPlayingLoading,
  } = useNowPlayingMovies(movieGateway)

  const { popularMovies, isLoading: isPopularLoading } =
    usePopularMovies(movieGateway)

  const { topRatedMovies, isLoading: isTopRatedLoading } =
    useTopRatedMovies(movieGateway)

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

export function useNowPlayingMovies(movieGateway: MovieGateway) {
  const getNowPlayingMovies = useCallback(async () => {
    const response = await movieGateway.getMovieList('now_playing')

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movies')
    }

    return response.body?.results ?? []
  }, [movieGateway])

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

export function usePopularMovies(movieGateway: MovieGateway) {
  const getPopularMovies = useCallback(async () => {
    const response = await movieGateway.getMovieList('popular')

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movies.')
    }

    return response.body?.results ?? []
  }, [movieGateway])

  const { data: popularMovies, isLoading } = useQuery(
    ['movies', 'popular', 'category', 'list'],
    getPopularMovies,
  )

  return {
    popularMovies,
    isLoading,
  }
}

export function useTopRatedMovies(movieGateway: MovieGateway) {
  const getTopRatedMovies = useCallback(async () => {
    const response = await movieGateway.getMovieList('top_rated')

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movies.')
    }

    return response.body?.results ?? []
  }, [movieGateway])

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
  movieGateway,
  genreIds,
}: {
  movieGateway: MovieGateway
  genreIds: number[]
}) {
  const getMoviesByGenre = useCallback(
    async (genreId: number) => {
      const response = await movieGateway.getMovieListByGenre(genreId)

      if (response.statusCode !== HttpStatusCodes.ok) {
        throw new Error('Error loading movies.')
      }

      return response.body?.results ?? []
    },
    [movieGateway],
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
