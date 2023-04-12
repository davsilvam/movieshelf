export type Comment = {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface CommentResponse {
  results: Comment[]
}

export type Genre = {
  id: number
  name: string
}

export interface GenreResponse {
  genres: Genre[]
}

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  genres: GenreType[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieResponse {
  results: Movie[]
}

export type MovieDetails = Movie & {
  budget: number
  genres: GenreType[]
  homepage: string
  imdb_id: string
  production_companies: []
  production_countries: []
  revenue: number
  runtime: number
  spoken_languages: []
  status: string
  tagline: string
}
