import { TokenResponse } from './../@types/response.d'
// Services
import { Api } from './apiConfig'
import { ApiException } from './apiException'

// Types
import { MovieDetailsType } from './../@types/movies.d'
import {
  CommentResponse,
  GenresResponse,
  MovieResponse
} from '../@types/response'
import { SessionUserType } from '../contexts/AuthenticationContext'

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

async function getGenres(): Promise<ApiException | GenresResponse> {
  try {
    const { data } = await Api().get(
      `/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
    )
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os filmes.')
  }
}

async function getMovieByGenre(
  id: string | number
): Promise<ApiException | MovieResponse> {
  try {
    const { data } = await Api().get(
      `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&with_genres=${id}&language=pt-BR`
    )
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os filmes.')
  }
}

async function getMovieDetails(
  id: string | number
): Promise<ApiException | MovieDetailsType> {
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

async function getToken(): Promise<ApiException | TokenResponse> {
  try {
    const { data } = await Api().get(
      `/authentication/token/new?api_key=${import.meta.env.VITE_API_KEY}`
    )
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

async function postUserAndValidateWithLogin(
  user: SessionUserType
): Promise<ApiException | any> {
  try {
    const { password, username, request_token } = user
    const sessionUser = {
      "username": username,
      "password": password,
      "request_token": request_token
    }

    const { data } = await Api().post(
      `/authentication/token/validate_with_login?api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      sessionUser
    )
    return data
  } catch (error: any) {
    return new ApiException(error.response.status || 'Erro ao buscar os filmes.')
  }
}

export const MoviesService = {
  getCommentsByID,
  getGenres,
  getMovieByGenre,
  getMovieDetails,
  getMovies,
  getToken,
  postUserAndValidateWithLogin,
  searchMovies
}
