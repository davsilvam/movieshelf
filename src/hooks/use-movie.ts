import { useCallback, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpStatusCodes } from 'adapters'
import { MovieGateway } from 'gateways/movie-gateway'

import { queryClient } from 'services'

interface UseMovieProps {
  movieGateway: MovieGateway
  id: string
}

export function useMovie({ movieGateway, id }: UseMovieProps) {
  const { details, moviePoster, runtimeHours, runtimeMinutes } =
    useMovieDetails({
      movieGateway,
      id,
    })

  const { credits, mainCast } = useMovieCredits({
    movieGateway,
    id,
  })

  const { images, mainBackdrops } = useMovieImages({
    movieGateway,
    id,
  })

  const { reviews } = useMovieReviews({
    movieGateway,
    id,
  })

  const { recommendations, topRecommendations } = useMovieRecommendations({
    movieGateway,
    id,
  })

  return {
    details,
    moviePoster,
    runtimeHours,
    runtimeMinutes,
    credits,
    mainCast,
    images,
    mainBackdrops,
    reviews,
    recommendations,
    topRecommendations,
  }
}

export function useMovieDetails({
  movieGateway,
  id,
}: {
  movieGateway: MovieGateway
  id: string
}) {
  queryClient.invalidateQueries({
    queryKey: ['details'],
  })

  const getMovieDetails = useCallback(async () => {
    const response = await movieGateway.getMovieDetails(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie details.')
    }

    return response.body
  }, [id, movieGateway])

  const { data: details } = useQuery(['movie', 'details'], getMovieDetails)

  const moviePoster = useMemo(() => {
    return details?.poster_path
      ? `https://image.tmdb.org/t/p/w342${details.poster_path}`
      : ''
  }, [details])

  const runtimeHours = useMemo(() => {
    return details && Math.floor(details?.runtime / 60)
  }, [details])

  const runtimeMinutes = useMemo(() => {
    return details && details?.runtime % 60
  }, [details])

  return {
    details,
    moviePoster,
    runtimeHours,
    runtimeMinutes,
  }
}

export function useMovieCredits({
  movieGateway,
  id,
}: {
  movieGateway: MovieGateway
  id: string
}) {
  const getMovieCredits = useCallback(async () => {
    const response = await movieGateway.getMovieCredits(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie credits.')
    }

    return response.body
  }, [id, movieGateway])

  const { data: credits } = useQuery(
    ['movie', 'details', 'credits'],
    getMovieCredits,
  )

  const mainCast = useMemo(() => {
    return credits?.cast.filter((_, index) => index < 5)
  }, [credits])

  return {
    credits,
    mainCast,
  }
}

export function useMovieImages({
  movieGateway,
  id,
}: {
  movieGateway: MovieGateway
  id: string
}) {
  const getMovieImages = useCallback(async () => {
    const response = await movieGateway.getMovieImages(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie images.')
    }

    return response.body
  }, [id, movieGateway])

  const { data: images } = useQuery(
    ['movie', 'details', 'images'],
    getMovieImages,
  )

  const mainBackdrops = useMemo(() => {
    return images?.backdrops.filter((_, index) => index < 3)
  }, [images])

  return {
    images,
    mainBackdrops,
  }
}

export function useMovieReviews({
  movieGateway,
  id,
}: {
  movieGateway: MovieGateway
  id: string
}) {
  const getMovieReviews = useCallback(async () => {
    const response = await movieGateway.getMovieReviews(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie reviews.')
    }

    return response.body?.results || []
  }, [id, movieGateway])

  const { data: reviews } = useQuery(
    ['movie', 'details', 'reviews'],
    getMovieReviews,
  )

  return {
    reviews,
  }
}

export function useMovieRecommendations({
  movieGateway,
  id,
}: {
  movieGateway: MovieGateway
  id: string
}) {
  const getMovieRecommendations = useCallback(async () => {
    const response = await movieGateway.getMovieRecommendations(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading similar movies.')
    }

    return response.body?.results || []
  }, [id, movieGateway])

  const { data: recommendations } = useQuery(
    ['movie', 'details', 'recommendations'],
    getMovieRecommendations,
  )

  const topRecommendations = useMemo(() => {
    return recommendations?.filter((_, index) => index < 5)
  }, [recommendations])

  return {
    recommendations,
    topRecommendations,
  }
}
