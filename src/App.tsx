import { FC } from 'react'

// contexts
import { ShelfProvider } from './contexts/ShelfContext'

// router
import { RouterPage } from './router'

export const App: FC = () => {
  return (
    <ShelfProvider>
      <RouterPage />
    </ShelfProvider>
  )
}
