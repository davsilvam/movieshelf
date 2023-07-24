type GenreId =
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
  genre_ids: GenreId[]
  id: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}
