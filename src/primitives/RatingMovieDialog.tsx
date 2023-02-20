import { FC, useRef, useState } from 'react'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import {
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Primitives
import * as Dialog from '@radix-ui/react-dialog'

interface RatingMovieDialogProps {
  children: React.ReactNode
  movieId: string | undefined
}

export const RatingMovieDialog: FC<RatingMovieDialogProps> = ({
  children,
  movieId
}) => {
  const { addToShelf } = useShelf()
  const [formStep, setFormStep] = useState<number>(0)
  const [rateMessage, setRateMessage] = useState<string>('')
  const [currentRate, setCurrentRate] = useState<number | null>(null)
  const reviewText = useRef<HTMLTextAreaElement>(null)

  const rateMessages = [
    'Péssimo 🤮',
    'Ruim 🥱',
    'Razoável 🤔',
    'Bom 😁',
    'Incrível 🤩'
  ]

  function handleAddToShelf(
    id: string | undefined,
    rate: number,
    review?: string
  ) {
    if (review) {
      return addToShelf(Number(id), rate + 1, review)
    }

    return addToShelf(Number(id), rate + 1)
  }

  function handleCurrentRate(rate: number) {
    setCurrentRate(rate)
  }

  function handleRateMessage(rate: number | null) {
    setRateMessage(rate === null ? '' : rateMessages[rate])
  }

  function toogleFormStep() {
    formStep === 1 ? setFormStep(0) : setFormStep(1)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content className="central-fixed fixed z-30 flex h-[300px] w-[90%] max-w-[450px] flex-col justify-between rounded-md bg-secondary-700 p-4">
          <section>
            <header className="flex w-full items-start justify-between">
              <div className="flex items-start gap-2">
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 text-secondary-100" />
                <div className="flex flex-col">
                  <Dialog.Title className="text-lg text-secondary-100">
                    Avaliação do Filme
                  </Dialog.Title>
                  <Dialog.Description>
                    <p className="text-sm font-medium text-secondary-300">
                      Dê uma nota e escreva uma resenha!
                    </p>
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close className="p-2">
                <XMarkIcon className="w-5 text-secondary-100" />
              </Dialog.Close>
            </header>
            {formStep === 0 ? (
              <>
                <div className="mt-5 flex w-full flex-row-reverse items-center justify-center">
                  {[4, 3, 2, 1, 0].map(id => (
                    <StarIcon
                      key={id}
                      className={`rate-star ${
                        currentRate === id && 'rated-star'
                      }`}
                      onMouseEnter={() => handleRateMessage(id)}
                      onMouseLeave={() => handleRateMessage(currentRate)}
                      onClick={() => handleCurrentRate(id)}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-secondary-100">
                  {rateMessage}
                </p>
              </>
            ) : (
              <>
                <textarea
                  className="mt-5 h-28 w-full rounded-sm bg-secondary-800 p-2 text-sm text-secondary-50 shadow-md"
                  ref={reviewText}
                  style={{ resize: 'none' }}
                />
              </>
            )}
          </section>
          <div className="flex items-center gap-4">
            {formStep === 0 ? (
              <button
                className={`flex h-10 w-full items-center justify-center gap-1 rounded-md py-1 px-2 text-sm font-semibold text-secondary-50 ${
                  currentRate !== null
                    ? 'border border-secondary-50 bg-transparent hover:opacity-80'
                    : 'cursor-not-allowed bg-secondary-900 opacity-50'
                }`}
                onClick={() => {
                  if (currentRate === null) return
                  toogleFormStep()
                }}
              >
                Adicionar Resenha
              </button>
            ) : (
              <button
                className={`flex h-10 w-full items-center justify-center gap-1 rounded-md py-1 px-2 text-sm font-semibold text-secondary-50 ${
                  currentRate !== null
                    ? 'border border-secondary-50 bg-transparent hover:opacity-80'
                    : 'cursor-not-allowed bg-secondary-900 opacity-50'
                }`}
                onClick={() => {
                  if (currentRate === null) return
                  toogleFormStep()
                }}
              >
                Voltar
              </button>
            )}
            <Dialog.Close asChild disabled={currentRate === null}>
              <button
                className={`flex h-10 w-full items-center justify-center gap-1 rounded-md py-1 px-2 text-sm font-semibold text-secondary-50 ${
                  currentRate !== null
                    ? 'bg-pizazz hover:saturate-200'
                    : 'cursor-not-allowed bg-secondary-900 opacity-50'
                }`}
                onClick={() => {
                  if (currentRate === null) return
                  handleAddToShelf(
                    movieId,
                    currentRate,
                    reviewText.current?.value
                  )
                }}
              >
                Para a estante
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
