// services
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// types
import { GenreResponse } from '../@types/tmdb'

export function useGenres() {
  const GENRES_URL = `/genre/movie/list?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=pt-BR`

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

  return query
}
