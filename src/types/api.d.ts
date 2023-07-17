export type Genre =
  | 28
  | 12
  | 16
  | 35
  | 80
  | 99
  | 18
  | 10751
  | 14
  | 36
  | 27
  | 10402
  | 9648
  | 10749
  | 878
  | 10770
  | 53
  | 10752
  | 37

export interface Movie {
  backdrop_path: string
  genre_ids: Genre[]
  id: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}

export type QueryGenre = Array<{ id: number; name: string }>

export interface QueryMovie extends Omit<Movie, 'genre_ids'> {
  genres: QueryGenre
  overview: string
  runtime: number
  tagline: string
}

type Cast = {
  id: number
  name: string
  profile_path: string
  character: string
}

type Crew = {
  id: number
  name: string
  profile_path: string
  job: string
}

export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

type Backdrops = {
  aspect_ratio: number
  height: number
  iso_639_1: number
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

type Posters = {
  aspect_ratio: number
  height: number
  iso_639_1: number
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Images {
  backdrops: Backdrops[]
  posters: Posters[]
}

export interface Review {
  author: string
  author_details: {
    avatar_path: string
    rating: number
  }
  content: string
  created_at: string
  id: string
}
