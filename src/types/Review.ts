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
