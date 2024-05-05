import { HttpClient, HttpResponse } from 'adapters'

import {
  CreditsResponse,
  ImagesResponse,
  MovieDetailsResponse,
  MovieListResponse,
  ReviewsResponse,
} from 'types'

type MovieListCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'

export interface MovieGateway {
  getMovieList(
    category: MovieListCategory,
  ): Promise<HttpResponse<MovieListResponse>>
  getDiscoverMovies(
    query: string,
    page: number,
  ): Promise<HttpResponse<MovieListResponse>>
  getMovieListByGenre(genreId: number): Promise<HttpResponse<MovieListResponse>>
  getMovieListBySearch(
    title: string,
    page: number,
  ): Promise<HttpResponse<MovieListResponse>>
  getMovieDetails(id: string): Promise<HttpResponse<MovieDetailsResponse>>
  getMovieCredits(id: string): Promise<HttpResponse<CreditsResponse>>
  getMovieImages(id: string): Promise<HttpResponse<ImagesResponse>>
  getMovieReviews(id: string): Promise<HttpResponse<ReviewsResponse>>
  getMovieRecommendations(id: string): Promise<HttpResponse<MovieListResponse>>
}

export class MovieGatewayHTTP implements MovieGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async getMovieList(
    category: MovieListCategory,
  ): Promise<HttpResponse<MovieListResponse>> {
    return await this.httpClient.request<MovieListResponse>({
      url: `movie/${category}?language=pt-BR`,
      method: 'get',
    })
  }

  async getDiscoverMovies(
    query: string,
    page = 1,
  ): Promise<HttpResponse<MovieListResponse>> {
    return await this.httpClient.request<MovieListResponse>({
      url: `discover/movie?language=pt-BR&${query}&page=${page}`,
      method: 'get',
    })
  }

  async getMovieListByGenre(
    genreId: number,
  ): Promise<HttpResponse<MovieListResponse>> {
    return await this.httpClient.request<MovieListResponse>({
      url: `discover/movie?language=pt-BR&sort_by=popularity.desc&with_genres=${genreId}`,
      method: 'get',
    })
  }

  async getMovieListBySearch(
    title: string,
    page: number,
  ): Promise<HttpResponse<MovieListResponse>> {
    return await this.httpClient.request<MovieListResponse>({
      url: `search/movie?query=${title}&language=pt-BR&page=${page}`,
      method: 'get',
    })
  }

  async getMovieDetails(
    id: string,
  ): Promise<HttpResponse<MovieDetailsResponse>> {
    return await this.httpClient.request<MovieDetailsResponse>({
      url: `movie/${id}?language=pt-BR`,
      method: 'get',
    })
  }

  async getMovieCredits(id: string): Promise<HttpResponse<CreditsResponse>> {
    return await this.httpClient.request<CreditsResponse>({
      url: `movie/${id}/credits?language=pt-BR`,
      method: 'get',
    })
  }

  async getMovieImages(id: string): Promise<HttpResponse<ImagesResponse>> {
    return await this.httpClient.request<ImagesResponse>({
      url: `movie/${id}/images`,
      method: 'get',
    })
  }

  async getMovieReviews(id: string): Promise<HttpResponse<ReviewsResponse>> {
    return await this.httpClient.request<ReviewsResponse>({
      url: `movie/${id}/reviews`,
      method: 'get',
    })
  }

  async getMovieRecommendations(
    id: string,
  ): Promise<HttpResponse<MovieListResponse>> {
    return await this.httpClient.request<MovieListResponse>({
      url: `movie/${id}/recommendations?language=pt-BR`,
      method: 'get',
    })
  }
}
