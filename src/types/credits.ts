export type CastMember = {
  id: number
  name: string
  profile_path: string
  character: string
}

type Cast = CastMember[]

export type CrewMember = {
  id: number
  name: string
  profile_path: string
  job: string
}

export type Crew = CrewMember[]

export interface CreditsResponse {
  id: number
  cast: Cast
  crew: Crew
}
