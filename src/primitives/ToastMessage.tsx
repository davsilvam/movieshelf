import { FC } from 'react'

// icons
import { BarsArrowUpIcon, BarsArrowDownIcon } from '@heroicons/react/20/solid'

// primitives
import {
  Description,
  Provider,
  Root,
  Title,
  Viewport
} from '@radix-ui/react-toast'

interface ToastMessageDisplay {
  [action: string]: { title: string; description: string }
}

const messages: ToastMessageDisplay = {
  addToSaved: {
    title: 'Adicionado: Salvos',
    description: 'Filme adicionado à sua lista de salvos.'
  },
  removeFromSaved: {
    title: 'Removido: Salvos',
    description: 'Filme removido da sua lista de salvos.'
  },
  addToFavorites: {
    title: 'Adicionado: Favoritos',
    description: 'Filme adicionado à sua lista de favoritos.'
  },
  removeFromFavorites: {
    title: 'Removido: Favoritos',
    description: 'Filme removido da sua lista de favoritos.'
  }
}

interface ToastMessageProps {
  children: React.ReactNode
  toastConfig: { isOpen: boolean; action: string }
}

export const ToastMessage: FC<ToastMessageProps> = ({
  children,
  toastConfig
}) => (
  <Provider swipeDirection="right">
    {children}
    {toastConfig.isOpen && (
      <Root
        className="fixed right-3 z-20 flex items-center gap-5 rounded-md bg-secondary-700 py-3 px-5 shadow-lg max-md:top-12 md:bottom-8 md:right-10"
        duration={5000}
        open={toastConfig.isOpen}
      >
        <div className="flex flex-col items-start justify-center gap-1">
          <Title className="font-semibold">
            {messages[toastConfig.action].title}
          </Title>

          <Description className="text-sm font-light">
            {messages[toastConfig.action].description}
          </Description>
        </div>

        {toastConfig.action.startsWith('remove') && (
          <BarsArrowDownIcon className="w-8 text-carnation" />
        )}

        {toastConfig.action.startsWith('add') && (
          <BarsArrowUpIcon className="w-8 text-pizazz" />
        )}
      </Root>
    )}

    <Viewport />
  </Provider>
)
