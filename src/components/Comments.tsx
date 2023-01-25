import { FC } from 'react'

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
    <section className="flex w-full flex-col gap-3">
      <h3>Comentários</h3>
      {comments && comments.length > 0 ? (
        comments?.map(comment => (
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
