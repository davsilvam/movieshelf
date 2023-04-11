import { FC } from 'react'

// components
import { Comment } from './'

// hooks
import { useComments } from '../hooks/useComments'

interface CommentsProps {
  id: number
}

export const CommentsContainer: FC<CommentsProps> = ({ id }) => {
  const { comments } = useComments(id)

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
