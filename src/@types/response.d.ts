import { GenreType } from './movies.d'
import { CommentType, MovieType } from './movies'

export type GenresResponse = {
  genres: GenreType[]
}

export type MovieResponse = {
  page: number
  results: MovieType[]
  total_pages: number
  total_results: number
}
