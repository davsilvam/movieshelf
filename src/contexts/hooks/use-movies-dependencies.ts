import { useContext } from 'react'

import { MovieContext } from 'contexts'

export function useMoviesDependencies() {
  const context = useContext(MovieContext)

  if (!context) {
    throw new Error('useMoviesDependencies must be used within a MovieProvider')
  }

  return context
}
