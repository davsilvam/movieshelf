export type CommentType = {
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

export type GenreType = {
  id: number
  name: string
}

export type MovieType = {
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

export type MovieDetailsType = MovieType & {
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
