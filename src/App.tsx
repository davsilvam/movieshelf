import { FC } from 'react'
import { ShelfProvider } from './contexts/ShelfContext'
import { RouterPage } from './router'

export const App: FC = () => {
  return (
    <ShelfProvider>
      <RouterPage />
    </ShelfProvider>
  )
}
