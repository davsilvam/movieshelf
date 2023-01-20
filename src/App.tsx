import React from 'react'
import { AuthenticationProvider } from './contexts/AuthenticationContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { RouterPage } from './router'

export const App: React.FC = () => {
  return (
    <AuthenticationProvider>
      <FavoritesProvider>
        <RouterPage />
      </FavoritesProvider>
    </AuthenticationProvider>
  )
}
