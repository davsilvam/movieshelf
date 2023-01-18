import { MovieType } from '../@types/movies'
import { CommentResponse, MovieResponse } from '../@types/response'
import { Api } from './apiConfig'
import { ApiException } from './apiException'

async function getMovieDetails(
  id: string | number
): Promise<ApiException | MovieType> {
  try {
    const { data } = await Api().get(
      `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
    )
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os filmes.')
  }
}

async function getMovies(url: string): Promise<ApiException | MovieResponse> {
  try {
    const { data } = await Api().get(url)
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os filmes.')
  }
}

async function searchMovies(id: string): Promise<ApiException | MovieResponse> {
  try {
    const { data } = await Api().get(
      `/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=pt-BR&query=${id}&page=1&include_adult=false`
    )
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os filmes.')
  }
}

async function getCommentsByID(
  id: number
): Promise<ApiException | CommentResponse> {
  try {
    const { data } = await Api().get(
      `/movie/${id}/reviews?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=pt_BR&page=1`
    )
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os filmes.')
  }
}

export const MoviesService = {
  getCommentsByID,
  getMovieDetails,
  getMovies,
  searchMovies
}
