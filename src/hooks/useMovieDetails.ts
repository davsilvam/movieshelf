// services
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// types
import { MovieDetails } from '../@types/tmdb'

// utils
import { MOVIE_DETAILS_URL } from '../utils'

export function useMovieDetails(id: string | undefined) {
  async function getMovieDetails() {
    try {
      const { data } = await api.get<MovieDetails>(MOVIE_DETAILS_URL(id))

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message)
      }
    }
  }

  const query = useQuery({
    queryKey: ['movie-details', id],
    queryFn: getMovieDetails
  })

  return {
    ...query
  }
}
