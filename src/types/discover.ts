import { Movie } from './movies'

export interface MovieQuery {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
