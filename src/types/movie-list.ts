import { GenreId } from 'types'

export type Movie = {
  backdrop_path: string
  genre_ids: GenreId[]
  id: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
