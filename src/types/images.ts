type Backdrop = {
  aspect_ratio: number
  height: number
  iso_639_1: number
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

type Poster = {
  aspect_ratio: number
  height: number
  iso_639_1: number
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ImagesResponse {
  backdrops: Backdrop[]
  posters: Poster[]
}
