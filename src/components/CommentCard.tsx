import { FC } from 'react'

// types
import { Comment } from '../@types/tmdb'

// utils
import { transformCommentDate } from '../utils/transformCommentDate'

interface CommentProps {
  comment: Comment
}

export const CommentCard: FC<CommentProps> = ({ comment }) => (
  <article
    className="flex flex-col items-start gap-3 rounded-md bg-secondary-700 py-3 px-5 shadow-lg"
    key={comment.id}
  >
    <header className="flex items-center gap-3">
      {comment.author_details && (
        <img
          className="w-8 rounded-full"
          src={
            comment.author_details.avatar_path !== null
              ? comment.author_details.avatar_path.startsWith('/http')
                ? comment.author_details.avatar_path.substring(1)
                : `https://www.themoviedb.org/t/p/w300_and_h300_face${comment.author_details.avatar_path}`
              : `https://ui-avatars.com/api/?name=${comment.author}`
          }
          alt={'Avatar de ' + comment.author}
        />
      )}
      <h4 className="flex items-center gap-2 text-sm font-medium">
        {comment.author}{' '}
        <span className="flex items-center gap-2 text-xs text-secondary-300">
          {transformCommentDate(comment.created_at)}
        </span>
      </h4>
    </header>

    <div>
      <p className="text-xs text-secondary-50 opacity-80">{comment.content}</p>
    </div>
  </article>
)
