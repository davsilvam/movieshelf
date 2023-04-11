import { FC } from 'react'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// icons
import {
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// primitives
import { ReviewPopover, TooltipMessage } from '../primitives/exports'

interface ReviewInfoProps {
  id: number
}

export const ReviewInfo: FC<ReviewInfoProps> = ({ id }) => {
  const { shelf } = useShelf()
  const reviewRate = shelf.find(movie => movie.id === Number(id))?.rate

  return (
    <div className="flex items-center gap-2">
      <TooltipMessage message={`${reviewRate} Estrelas`}>
        <h3 className="flex items-center gap-2 font-semibold">
          <StarIcon className="w-5 fill-pizazz text-pizazz" />{' '}
          {id && reviewRate}
        </h3>
      </TooltipMessage>
      {shelf.find(movie => movie.id === Number(id))?.review && (
        <ReviewPopover
          review={shelf.find(movie => movie.id === Number(id))?.review}
        >
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center">
            <TooltipMessage message="Ver resenha">
              <ChatBubbleOvalLeftEllipsisIcon className="w-6" />
            </TooltipMessage>
          </div>
        </ReviewPopover>
      )}
    </div>
  )
}
