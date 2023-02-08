import { FC, useState } from 'react'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
  const [rateMessage, setRateMessage] = useState<string>('')
  const [currentRate, setCurrentRate] = useState<number | null>(null)
  const { addToShelf } = useShelf()

  const rateMessages = [
    'Péssimo 🤮',
    'Ruim 🥱',
    'Razoável 🤔',
    'Bom 😁',
    'Incrível 🤩'
  ]

  function handleAddToShelf(id: string | undefined, rate: number) {
    addToShelf(Number(id), rate + 1)
  }

  function handleCurrentRate(rate: number) {
    setCurrentRate(rate)
  }

  function handleRateMessage(rate: number | null) {
    setRateMessage(rate === null ? '' : rateMessages[rate])
  }

  console.log(movieId)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content className="central-fixed fixed z-30 flex h-[300px] w-[450px] flex-col justify-between rounded-md bg-secondary-700 p-4">
          <section>
            <header className="flex w-full items-center justify-between border-b-[0.5px] border-b-secondary-400 border-opacity-20">
              <Dialog.Title className="text-lg text-secondary-100">
                Avaliação do Filme
              </Dialog.Title>
              <Dialog.Close className="p-2">
                <XMarkIcon className="w-5 text-secondary-100" />
              </Dialog.Close>
            </header>
            <Dialog.Description className="pt-2 text-sm font-medium text-secondary-200">
              E aí, qual nota esse filme merece?
            </Dialog.Description>
            <div className="mt-5 flex w-full flex-row-reverse items-center justify-center">
              {[4, 3, 2, 1, 0].map(id => (
                <StarIcon
                  className={`rate-star ${currentRate === id && 'rated-star'}`}
                  onMouseEnter={() => handleRateMessage(id)}
                  onMouseLeave={() => handleRateMessage(currentRate)}
                  onClick={() => handleCurrentRate(id)}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-secondary-100">{rateMessage}</p>
          </section>
          <Dialog.Close
            asChild
            className="outline-none"
            disabled={currentRate === null}
          >
            <button
              className={`flex h-12 w-full items-center justify-center gap-1 rounded-md py-1 px-2 text-base font-bold text-secondary-50 ${
                currentRate !== null
                  ? 'bg-pizazz'
                  : 'cursor-not-allowed bg-secondary-900 opacity-50'
              }`}
              onClick={() => {
                if (currentRate === null) return
                handleAddToShelf(movieId, currentRate)
              }}
            >
              Para a estante
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
