// services
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// types
import { CommentType } from '../@types/tmdb'

export function useComments(id: number) {
  async function getMovieComments() {
    const MOVIE_REVIEWS_URL = `/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt_BR&page=1`

    try {
      const { data } = await api.get<{ results: CommentType[] }>(
        MOVIE_REVIEWS_URL
      )

      return data.results
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message)
      }
    }
  }

  const { data: comments } = useQuery({
    queryKey: ['comments', id],
    queryFn: getMovieComments
  })

  return {
    comments
  }
}
