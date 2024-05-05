import Image from 'next/image'

import { Calendar, User } from 'lucide-react'

import { formatDate } from 'utils'

import { Review } from 'types'

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

  return (
    <div className="flex w-full flex-col gap-4 bg-shark p-6 text-white">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {review.author_details.avatar_path ? (
            <Image
              alt={`${review.author} profile pic.`}
              src={avatarPath}
              className="h-14 w-14 rounded-full"
              height={56}
              width={56}
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-oslo">
              <User className="h-6 w-6 text-woodsmoke" />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <p className="font-semibold">{review.author}</p>
            <p className="flex items-center gap-1 text-xs capitalize text-oslo">
              <Calendar className="h-4 w-4" /> {formatDate(review.created_at)}
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

      <p className="text-xs leading-relaxed md:text-sm">{review.content}</p>
    </div>
  )
}
