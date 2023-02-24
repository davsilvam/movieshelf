import { FC } from 'react'

// Components
import { Comment } from './exports'

// Services
import { instance } from '../services/apiConfig'

// Types
import { CommentType } from '../@types/tmdb'

// Query
import { useQuery } from 'react-query'

interface CommentsProps {
  id: number
}

export const Comments: FC<CommentsProps> = ({ id }) => {
  const { data: comments } = useQuery<CommentType[]>(
    ['details', id],
    async () => {
      const MOVIE_REVIEWS_URL = `/movie/${id}/reviews?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=pt_BR&page=1`

      const { data } = await instance.get(MOVIE_REVIEWS_URL)

      return data.results
    }
  )

  return (
    <section className="mb-6 flex w-full flex-col gap-3">
      <h3>Comentários</h3>
      {comments && comments.length > 0 ? (
        comments?.map(comment => <Comment comment={comment} key={comment.id} />)
      ) : (
        <p className="font-semibold text-cadet">Sem comentários.</p>
      )}
    </section>
  )
}
