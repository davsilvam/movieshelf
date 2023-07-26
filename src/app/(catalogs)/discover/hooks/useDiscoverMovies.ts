import { useQuery } from '@tanstack/react-query'

import { fetchWrapper } from 'functions'

import { Movie } from 'types'

export function useDiscoverMovies(queries: string) {
  const discoverMovies = useQuery(
    ['movies', 'discover', queries, 'query'],
    getDiscoverMoviesByQuery,
  )

  async function getDiscoverMoviesByQuery() {
    const { results } = await fetchWrapper<{ results: Movie[] }>(
      `discover/movie?language=pt-BR&${queries}`,
    )

    return results
  }

  return {
    discoverMovies,
  }
}
