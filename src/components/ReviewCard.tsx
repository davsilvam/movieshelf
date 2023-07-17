import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { Review } from 'types/api'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const slicedAvatarPath =
    review.author_details.avatar_path &&
    review.author_details.avatar_path.slice(1)

  const avatarPath =
    review.author_details.avatar_path &&
    review.author_details.avatar_path.includes('secure.gravatar.com')
      ? slicedAvatarPath
      : `https://secure.gravatar.com/avatar/${slicedAvatarPath}`

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(review.created_at))

  return (
    <div className="flex w-full flex-col gap-4 bg-shark p-6 text-white">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {review.author_details.avatar_path && (
            <Image
              alt={`${review.author} profile pic.`}
              src={avatarPath}
              className="h-14 w-14 rounded-full"
              height={56}
              width={56}
            />
          )}

          <div className="flex flex-col gap-1">
            <p className="font-semibold">{review.author}</p>
            <p className="flex items-center gap-1 text-xs capitalize text-oslo">
              <Calendar className="h-4 w-4" /> {formattedDate}
            </p>
          </div>
        </div>

        {review.author_details.rating && (
          <p className="font-alt">
            <span className="text-3xl text-pizazz">
              {review.author_details.rating}{' '}
            </span>
            / 10
          </p>
        )}
      </header>

      <p className="text-sm leading-relaxed">{review.content}</p>
    </div>
  )
}
