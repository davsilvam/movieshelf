import { createContext, FC, useContext, useMemo, useState } from 'react'

type Movie = {
  id: number
}

type ShelfMovie = Movie & {
  rate: number
  isFavorite: boolean
  review?: string
}

interface ShelfContext {
  shelf: ShelfMovie[]
  addToShelf: (id: number, rate: number, review?: string) => void
  favorites: ShelfMovie[]
  toogleFavorite: (id: number) => void
  saved: Movie[]
  addToSaved: (id: number) => void
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
      rate: 2,
      review: 'Animação muito massa, curti demais!'
    }
  ])
  const [saved, setSaved] = useState<Movie[]>([])

  function addToShelf(id: number, rate: number, review?: string) {
    if (saved.some(movie => movie.id === id)) {
      setSaved(state => state.filter(movie => movie.id !== id))
    }

    const newMovie = { id, rate, isFavorite: false, review }
    setShelf(state => [...state, newMovie])
  }

  const favorites: ShelfMovie[] = useMemo(
    () => shelf.filter(movie => movie.isFavorite),
    [shelf]
  )

  function toogleFavorite(id: number) {
    const updatedMovies = [...shelf]
    const updatedMovie = updatedMovies.find(movie => movie.id === id)

    if (!updatedMovie) return

    updatedMovie.isFavorite = !updatedMovie?.isFavorite

    setShelf(updatedMovies)
  }

  function addToSaved(id: number) {
    if (
      saved.some(movie => movie.id === id) ||
      shelf.some(movie => movie.id === id)
    )
      return
    const newMovie = { id }
    setSaved(state => [...state, newMovie])
  }

  return (
    <ShelfContext.Provider
      value={{
        shelf,
        addToShelf,
        favorites,
        toogleFavorite,
        saved,
        addToSaved
      }}
    >
      {children}
    </ShelfContext.Provider>
  )
}

export function useShelf(): ShelfContext {
  const context = useContext(ShelfContext)

  if (!context) {
    throw new Error('useShelf must be used within a ShelfContext.')
  }

  return context
}
