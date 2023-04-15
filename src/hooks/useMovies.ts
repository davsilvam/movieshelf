// services
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// types
import { MovieResponse } from '../@types/tmdb'

export function useMovies(url: string, amount?: number) {
  async function getMoviesFromUrl() {
    try {
      const { data } = await api.get<MovieResponse>(url)

      if (amount) {
        return data.results.slice(0, amount)
      }

      return data.results
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message)
      }
    }
  }

  const query = useQuery({
    queryKey: ['movies', url],
    queryFn: getMoviesFromUrl,
  })

  return {
    ...query
  }
}
