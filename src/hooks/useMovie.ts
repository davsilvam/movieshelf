import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'functions/fetch'
import { queryClient } from 'services/QueryProvider'
import { Credits, Images, Movie, QueryMovie, Review } from 'types/api'

export function useMovie(movieId: string) {
  queryClient.invalidateQueries({
    queryKey: [
      'queryMovie',
      'queryMovieCredit',
      'queryMovieImages',
      'queryMovieReviews',
      'queryMovieSimilar',
    ],
  })

  const { data: movie } = useQuery(['queryMovie', movieId], getMovie)
  const { data: credits } = useQuery(
    ['queryMovieCredit', movieId],
    getMovieCredits,
  )
  const { data: images } = useQuery(
    ['queryMovieImages', movieId],
    getMovieImages,
  )
  const { data: reviews } = useQuery(
    ['queryMovieReviews', movieId],
    getMovieReviews,
  )
  const { data: similar } = useQuery(
    ['queryMovieSimilar', movieId],
    getMovieSimilar,
  )

  const mainCast = credits?.cast.filter(
    (actor) => credits.cast.indexOf(actor) < 5,
  )

  const mainBackdrops = images?.backdrops.filter(
    (backdrop) => images.backdrops.indexOf(backdrop) < 3,
  )

  const mainSimilar = similar?.filter((movie) => similar.indexOf(movie) < 5)

  async function getMovie() {
    const data = await fetchWrapper<QueryMovie>(
      `movie/${movieId}?language=pt-BR`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data
  }

  async function getMovieCredits() {
    const data = await fetchWrapper<Credits>(
      `movie/${movieId}/credits?language=pt-BR`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data
  }

  async function getMovieImages() {
    const data = await fetchWrapper<Images>(`movie/${movieId}/images`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    })

    return data
  }

  async function getMovieReviews() {
    const data = await fetchWrapper<{ results: Review[] }>(
      `movie/${movieId}/reviews`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data.results
  }

  async function getMovieSimilar() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      `movie/${movieId}/similar`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data.results
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
