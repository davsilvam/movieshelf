import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

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
  toogleSaved: (id: number) => void
  isMovieOnTheShelf: (id: number | undefined) => boolean
  isMovieFavorite: (id: number | undefined) => boolean
  isMovieSaved: (id: number | undefined) => boolean
}

interface ShelfProviderProps {
  children: React.ReactNode
}

const ShelfContext = createContext<ShelfContext | null>(null)

export const ShelfProvider: FC<ShelfProviderProps> = ({ children }) => {
  const [shelf, setShelf] = useState<ShelfMovie[]>(() => {
    const localStorageShelf = localStorage.getItem('shelf')

    return localStorageShelf ? JSON.parse(localStorageShelf) : []
  })

  useEffect(() => {
    localStorage.setItem('shelf', JSON.stringify(shelf))
  }, [shelf])

  const [saved, setSaved] = useState<Movie[]>(() => {
    const localStorageSaved = localStorage.getItem('saved')

    return localStorageSaved ? JSON.parse(localStorageSaved) : []
  })

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(saved))
  }, [saved])

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

  function toogleSaved(id: number) {
    if (shelf.some(movie => movie.id === id)) return

    if (saved.some(movie => movie.id === id)) {
      const updatedSaved = [...saved]
      const updatedSavedMovie = updatedSaved.find(movie => movie.id === id)

      return setSaved(state =>
        state.filter(movie => movie.id !== updatedSavedMovie?.id)
      )
    }

    const newMovie = { id }
    setSaved(state => [...state, newMovie])
  }

  const isMovieOnTheShelf = (id: number | undefined) => {
    return shelf.some(movie => movie.id === id)
  }

  const isMovieFavorite = (id: number | undefined) => {
    return favorites.some(favorite => favorite.id === id)
  }

  const isMovieSaved = (id: number | undefined) => {
    return saved.some(movie => movie.id === id)
  }

  return (
    <ShelfContext.Provider
      value={{
        shelf,
        addToShelf,
        favorites,
        toogleFavorite,
        saved,
        toogleSaved,
        isMovieOnTheShelf,
        isMovieFavorite,
        isMovieSaved
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
