// Services
import { instance } from './apiConfig'
import { ApiException } from './apiException'

// Types
import {
  GenresResponse,
  MovieResponse
} from '../@types/response'


async function getGenres(): Promise<ApiException | GenresResponse> {
  try {
    const { data } = await instance.get(
      `/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
    )
    return data
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os gêneros.')
  }
}

async function getMovieByGenre(
  id: string | number
): Promise<ApiException | MovieResponse> {
  try {
    const { data } = await instance.get(
      `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&with_genres=${id}&language=pt-BR`
    )
    return data
  } catch (error: any) {
    return new ApiException(
      error.message || 'Erro ao buscar os filmes do gênero.'
    )
  }
}

export const MoviesService = {
  getGenres,
  getMovieByGenre,
}
