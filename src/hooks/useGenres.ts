// services
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// types
import { GenreResponse } from '../@types/tmdb'

// utils
import { GENRES_URL } from '../utils'

export function useGenres() {
  async function getMovieGenres() {
    try {
      const { data } = await api.get<GenreResponse>(GENRES_URL)
      
      return data.genres
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message)
      }
    }
  }

  const query = useQuery({
    queryKey: ['genres'],
    queryFn: getMovieGenres
  })

  return {
    ...query
  }
}
