import { FC, ReactNode } from 'react'

// icons
import { CheckCircle, XCircle } from '@phosphor-icons/react'

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
  action: string
  children: ReactNode
  isToastVisible: boolean
  setToastVisible: () => void
}

export const ToastMessage: FC<ToastMessageProps> = ({
  action = '',
  children,
  isToastVisible = false,
  setToastVisible
}) => (
  <Provider swipeDirection="right" duration={5000}>
    {children}

    {isToastVisible && (
      <Root
        className="fixed right-3 z-20 flex items-center gap-3 rounded-md bg-secondary-700 py-3 px-5 shadow-lg max-md:top-12 md:bottom-8 md:right-10"
        open={isToastVisible}
        onOpenChange={setToastVisible}
      >
        {action.startsWith('remove') && (
          <XCircle size={28} className="text-carnation" />
        )}

        {action.startsWith('add') && (
          <CheckCircle size={28} className="text-green-500" />
        )}

        <div className="flex flex-col items-start justify-center">
          <Title className="font-semibold">{messages[action].title}</Title>
          <Description className="text-sm font-light">
            {messages[action].description}
          </Description>
        </div>
      </Root>
    )}

    <Viewport />
  </Provider>
)
