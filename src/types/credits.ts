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

export interface CreditsResponse {
  id: number
  cast: Cast[]
  crew: Crew[]
}
