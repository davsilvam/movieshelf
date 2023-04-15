import { FC } from 'react'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// icons
import { ChatCircleDots, Star } from '@phosphor-icons/react'

// primitives
import { ReviewPopover, TooltipMessage } from '../primitives'

interface ReviewInfoProps {
  id: number
}

export const ReviewInfo: FC<ReviewInfoProps> = ({ id }) => {
  const { shelf } = useShelf()
  const movieReview = shelf.find(movie => movie.id === Number(id))?.review
  const movieRate = shelf.find(movie => movie.id === Number(id))?.rate

  return (
    <div className="flex items-center gap-4">
      <TooltipMessage message={`${movieRate} Estrelas`}>
        <strong className="flex items-center gap-2 font-semibold">
          <Star size={20} weight="fill" className="text-pizazz" />
          <span>{id && movieRate}</span>
        </strong>
      </TooltipMessage>

      {movieReview && (
        <ReviewPopover
          review={movieReview}
        >
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center">
            <TooltipMessage message="Ver resenha">
              <ChatCircleDots size={24} />
            </TooltipMessage>
          </div>
        </ReviewPopover>
      )}
    </div>
  )
}
