import { createContext, FC, useContext, useMemo, useState } from 'react'

type ShelfMovie = {
  id: number
  rate: number
  isFavorite: boolean
}

interface ShelfContext {
  shelf: ShelfMovie[]
  addToShelf: (id: number, rate: number) => void
  favorites: ShelfMovie[]
  toogleFavorite: (id: number) => void
  saved: ShelfMovie[]
}

interface ShelfProviderProps {
  children: React.ReactNode
}

const ShelfContext = createContext<ShelfContext | null>(null)

export const ShelfProvider: FC<ShelfProviderProps> = ({ children }) => {
  const [shelf, setShelf] = useState<ShelfMovie[]>([
    {
      id: 315162,
      isFavorite: true,
      rate: 2
    }
  ])
  const [saved, setSaved] = useState<ShelfMovie[]>([])

  function addToShelf(id: number, rate: number) {
    const newMovie = { id, rate, isFavorite: false }
    setShelf(state => [...state, newMovie])
  }

  function toogleFavorite(id: number) {
    const updatedMovies = [...shelf]
    const updatedMovie = updatedMovies.find(movie => movie.id === id)

    if (!updatedMovie) return

    updatedMovie.isFavorite = !updatedMovie?.isFavorite

    setShelf(updatedMovies)
  }

  const favorites: ShelfMovie[] = useMemo(
    () => shelf.filter(movie => movie.isFavorite),
    [shelf]
  )

  return (
    <ShelfContext.Provider
      value={{ shelf, addToShelf, favorites, toogleFavorite, saved }}
    >
      {children}
    </ShelfContext.Provider>
  )
}

export function useShelf(): ShelfContext {
  const context = useContext(ShelfContext)

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesContext.')
  }

  return context
}
