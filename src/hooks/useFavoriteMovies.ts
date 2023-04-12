import { useCallback, useState } from 'react'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// services
import { api } from '../services/api'
import { useQuery } from '@tanstack/react-query'

// types
import { Movie } from '../@types/tmdb'

// utils
import { MOVIE_DETAILS_URL } from '../utils/apiEndpoints'

export function useFavoriteMovies() {
  const { favorites } = useShelf()
  const [favoritesList, setFavoritesList] = useState<Movie[]>([])

  const getFavoriteMovies = useCallback(() => {
    favorites.map(async movie => {
      if (!movie) return

      const { data }: { data: Movie } = await api.get(
        MOVIE_DETAILS_URL(movie.id)
      )

      setFavoritesList(state => [...state, data])
    })
  }, [favorites])

  const query = useQuery({
    queryKey: ['favorite-movies', favorites],
    queryFn: getFavoriteMovies
  })

  return {
    favoritesList,
    ...query
  }
}
