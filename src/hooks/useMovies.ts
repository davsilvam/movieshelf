import { fetchWrapper } from 'functions/fetch'
import { Movie } from 'types/api'

export async function useMovies() {
  const data = await fetchWrapper<{
    results: Movie[]
  }>('movie/popular?language=pt-BR', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  })

  const popularMovies = data.results

  return {
    popularMovies,
  }
}
