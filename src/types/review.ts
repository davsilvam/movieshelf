type AuthorDetails = {
  name: string
  username: string
  avatar_path: string
  rating: number
}

export type Review = {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
}

export interface ReviewsResponse {
  id: number
  page: number
  results: Review[]
  total_pages: number
  total_results: number
}
