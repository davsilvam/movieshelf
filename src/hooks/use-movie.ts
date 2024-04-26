import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'functions'

import { Credits, Images, Movie, MovieDetails, Review } from 'types'

import { queryClient } from 'services'

export function useMovie(movieId: string) {
  queryClient.invalidateQueries({
    queryKey: ['details'],
  })

  const { data: movie } = useQuery(['movie', 'details', movieId], getMovie)
  const { data: credits } = useQuery(
    ['movie', 'details', 'credits', 'list', movieId],
    getMovieCredits,
  )
  const { data: images } = useQuery(
    ['movie', 'details', 'images', 'list', movieId],
    getMovieImages,
  )
  const { data: reviews } = useQuery(
    ['movie', 'details', 'reviews', 'list', movieId],
    getMovieReviews,
  )
  const { data: similar } = useQuery(
    ['movie', 'details', 'similar', 'list', movieId],
    getMovieSimilar,
  )

  const mainCast = credits?.cast.filter(
    actor => credits.cast.indexOf(actor) < 5,
  )

  const mainBackdrops = images?.backdrops.filter(
    backdrop => images.backdrops.indexOf(backdrop) < 3,
  )

  const mainSimilar = similar?.filter(movie => similar.indexOf(movie) < 5)

  async function getMovie() {
    const data = await fetchWrapper<MovieDetails>(
      `movie/${movieId}?language=pt-BR`,
    )

    return data
  }

  async function getMovieCredits() {
    const data = await fetchWrapper<Credits>(
      `movie/${movieId}/credits?language=pt-BR`,
    )

    return data
  }

  async function getMovieImages() {
    const data = await fetchWrapper<Images>(`movie/${movieId}/images`)

    return data
  }

  async function getMovieReviews() {
    const { results } = await fetchWrapper<{ results: Review[] }>(
      `movie/${movieId}/reviews?language=pt-BR`,
    )

    return results
  }

  async function getMovieSimilar() {
    const { results } = await fetchWrapper<{ results: Movie[] }>(
      `movie/${movieId}/similar`,
    )

    return results
  }

  return {
    movie,
    credits,
    images,
    reviews,
    similar,
    mainCast,
    mainBackdrops,
    mainSimilar,
  }
}
