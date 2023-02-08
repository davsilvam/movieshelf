import { FC } from 'react'

// Contexts
import { ShelfProvider } from './contexts/ShelfContext'

// Router
import { RouterPage } from './router'

export const App: FC = () => {
  return (
    <ShelfProvider>
      <RouterPage />
    </ShelfProvider>
  )
}
