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
