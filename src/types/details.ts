import { Movie } from './movies'

type Genre = {
  id: number
  name: string
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
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
