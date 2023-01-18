import React, { useEffect, useState } from 'react'

// Services
import { ApiException } from '../../../services/apiException'
import { MoviesService } from '../../../services/apiServices'

// Types
import { CommentType } from '../../../@types/movies'

interface CommentsProps {
  id: number
}

export const Comments: React.FC<CommentsProps> = ({ id }) => {
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    MoviesService.getCommentsByID(id).then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      setComments(response.results)
    })
  }, [])

  return (
    <section className="flex w-full flex-col gap-3">
      <h3>Comentários</h3>
      {comments.length > 0 ? (
        comments.map(comment => (
          <article
            className="flex items-start gap-8 rounded-md bg-cadet bg-opacity-10 py-3 px-5 shadow-lg"
            key={comment.id}
          >
            {comment.author_details.avatar_path && (
              <img
                className="w-12 rounded-full"
                src={
                  comment.author_details.avatar_path
                    ? comment.author_details.avatar_path.startsWith('/http')
                      ? comment.author_details.avatar_path.substring(1)
                      : `https://www.themoviedb.org/t/p/w300_and_h300_face${comment.author_details.avatar_path}`
                    : `https://ui-avatars.com/api/?name=${comment.author}`
                }
                alt={'Avatar de ' + comment.author}
              />
            )}

            <div>
              <h4>{comment.author}</h4>
              <p className="text-xs text-lightest opacity-80">
                {comment.content}
              </p>
            </div>
          </article>
        ))
      ) : (
        <p className="font-semibold text-cadet">Sem comentários.</p>
      )}
    </section>
  )
}
