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

      console.log(data.results)

      return data.results
    }
  )

  function getCommentDate(date: string) {
    const now = new Date()

    let currentYear = now.getFullYear()
    const commentYear = Number(date.slice(0, -20))

    let currentMonth = now.getMonth() + 1
    const commentMonth = Number(date.slice(0, -14).slice(-5).slice(0, -3))

    let currentDay = now.getDate()
    const commentDay = Number(date.slice(0, -14).slice(-2))

    if (currentYear > commentYear) {
      return currentMonth > commentMonth && currentYear - commentYear > 1
        ? `${currentYear - commentYear}a atrás`
        : `${currentMonth - commentMonth + 12}m atrás`
    }

    if (currentMonth > commentMonth) {
      return `${currentMonth - commentMonth}m atrás`
    }

    if (currentDay > commentDay) {
      return `${currentDay - commentDay}d atrás`
    }
  }

  return (
    <section className="mb-6 flex w-full flex-col gap-3">
      <h3>Comentários</h3>
      {comments && comments.length > 0 ? (
        comments?.map(comment => (
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
                  {getCommentDate(comment.created_at)}
                </span>
              </h4>
            </header>

            <div>
              <p className="text-xs text-secondary-50 opacity-80">
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
