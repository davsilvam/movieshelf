import React from 'react'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { RouterPage } from './router'

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <RouterPage />
    </FavoritesProvider>
  )
}
