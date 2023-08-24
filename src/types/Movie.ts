import { Genre, GenreId } from 'types'

export interface Movie {
  backdrop_path: string
  genre_ids: GenreId[]
  id: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}

export interface MovieQuery {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  overview: string
  runtime: number
  tagline: string
}
