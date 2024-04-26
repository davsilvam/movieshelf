import { useCallback, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { HttpResponse, HttpStatusCodes } from 'infra/adapters'

import { Credits, Images, Movie, MovieDetails, Review } from 'types'

import { queryClient } from 'services'

export type LoadMovieDetails = {
  load: (id: string) => Promise<HttpResponse<MovieDetails>>
}

export type LoadMovieCredits = {
  loadAll: (id: string) => Promise<HttpResponse<Credits>>
}

export type LoadMovieImages = {
  loadAll: (id: string) => Promise<HttpResponse<Images>>
}

export type LoadMovieReviews = {
  loadAll: (id: string) => Promise<
    HttpResponse<{
      results: Review[]
    }>
  >
}

export type LoadMovieSimilar = {
  loadAll: (id: string) => Promise<
    HttpResponse<{
      results: Movie[]
    }>
  >
}

interface UseMovieProps {
  loadMovieDetails: LoadMovieDetails
  loadMovieCredits: LoadMovieCredits
  loadMovieImages: LoadMovieImages
  loadMovieReviews: LoadMovieReviews
  loadMovieSimilar: LoadMovieSimilar
  id: string
}

export function useMovie({
  loadMovieDetails,
  loadMovieCredits,
  loadMovieImages,
  loadMovieReviews,
  loadMovieSimilar,
  id,
}: UseMovieProps) {
  const { details, moviePoster, runtimeHours, runtimeMinutes } =
    useMovieDetails({
      loadMovieDetails,
      id,
    })

  const { credits, mainCast } = useMovieCredits({
    loadMovieCredits,
    id,
  })

  const { images, mainBackdrops } = useMovieImages({
    loadMovieImages,
    id,
  })

  const { reviews } = useMovieReviews({
    loadMovieReviews,
    id,
  })

  const { similar, mainSimilar } = useMovieSimilar({
    loadMovieSimilar,
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
    similar,
    mainSimilar,
  }
}

export function useMovieDetails({
  loadMovieDetails,
  id,
}: {
  loadMovieDetails: LoadMovieDetails
  id: string
}) {
  queryClient.invalidateQueries({
    queryKey: ['details'],
  })

  const getMovieDetails = useCallback(async () => {
    const response = await loadMovieDetails.load(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie details.')
    }

    return response.body
  }, [id, loadMovieDetails])

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
  loadMovieCredits,
  id,
}: {
  loadMovieCredits: LoadMovieCredits
  id: string
}) {
  const getMovieCredits = useCallback(async () => {
    const response = await loadMovieCredits.loadAll(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie credits.')
    }

    return response.body
  }, [id, loadMovieCredits])

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
  loadMovieImages,
  id,
}: {
  loadMovieImages: LoadMovieImages
  id: string
}) {
  const getMovieImages = useCallback(async () => {
    const response = await loadMovieImages.loadAll(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie images.')
    }

    return response.body
  }, [id, loadMovieImages])

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
  loadMovieReviews,
  id,
}: {
  loadMovieReviews: LoadMovieReviews
  id: string
}) {
  const getMovieReviews = useCallback(async () => {
    const response = await loadMovieReviews.loadAll(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading movie reviews.')
    }

    return response.body?.results || []
  }, [id, loadMovieReviews])

  const { data: reviews } = useQuery(
    ['movie', 'details', 'reviews'],
    getMovieReviews,
  )

  return {
    reviews,
  }
}

export function useMovieSimilar({
  loadMovieSimilar,
  id,
}: {
  loadMovieSimilar: LoadMovieSimilar
  id: string
}) {
  const getMovieSimilar = useCallback(async () => {
    const response = await loadMovieSimilar.loadAll(id)

    if (response.statusCode !== HttpStatusCodes.ok) {
      throw new Error('Error loading similar movies.')
    }

    return response.body?.results || []
  }, [id, loadMovieSimilar])

  const { data: similar } = useQuery(
    ['movie', 'details', 'similar'],
    getMovieSimilar,
  )

  const mainSimilar = useMemo(() => {
    return similar?.filter((_, index) => index < 5)
  }, [similar])

  return {
    similar,
    mainSimilar,
  }
}
