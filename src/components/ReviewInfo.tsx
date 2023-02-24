import { FC } from 'react'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import {
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// Primitives
import { ReviewPopover } from '../primitives/exports'

interface ReviewInfoProps {
  id: number
}

export const ReviewInfo: FC<ReviewInfoProps> = ({ id }) => {
  const { shelf } = useShelf()

  return (
    <div className="flex items-center gap-2">
      <h3 className="flex items-center gap-2 font-semibold">
        <StarIcon className="w-5 fill-pizazz text-pizazz" />{' '}
        {id && shelf.find(movie => movie.id === Number(id))?.rate}
      </h3>
      {shelf.find(movie => movie.id === Number(id))?.review && (
        <ReviewPopover
          review={shelf.find(movie => movie.id === Number(id))?.review}
        >
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6" />
          </div>
        </ReviewPopover>
      )}
    </div>
  )
}
