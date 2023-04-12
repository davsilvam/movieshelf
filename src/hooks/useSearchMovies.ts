// services
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// types
import { MovieResponse } from '../@types/tmdb'

// utils
import { SEARCH_MOVIES_URL } from '../utils'

export function useSearchMovies(id: string | undefined) {
  async function getMoviesFromSearch() {
    try {
      const { data } = await api.get<MovieResponse>(SEARCH_MOVIES_URL(id))

      return data.results
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message)
      }
    }
  }

  const query = useQuery({
    queryKey: ['search-movies', id],
    queryFn: getMoviesFromSearch
  })

  return {
    ...query
  }
}
