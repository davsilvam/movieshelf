import { Genre } from './genre'

export interface MovieDetailsResponse {
  adult: boolean
  backdrop_path: string
  genres: Genre[]
  id: number
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
}
