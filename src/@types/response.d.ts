import { GenreType } from './movies.d'
import { CommentType, MovieType } from './movies'

export type CommentResponse = {
  id: number
  page: number
  results: CommentType[]
  total_pages: number
  total_results: number
}

export type GenresResponse = {
  genres: GenreType[]
}

export type MovieResponse = {
  page: number
  results: MovieType[]
  total_pages: number
  total_results: number
}
