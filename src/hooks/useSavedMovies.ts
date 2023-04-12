import { useCallback, useState } from 'react'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// services
import { api } from '../services/api'
import { useQuery } from '@tanstack/react-query'

// types
import { Movie } from '../@types/tmdb'

// utils
import { MOVIE_DETAILS_URL } from '../utils'

export function useSavedMovies() {
  const { saved } = useShelf()
  const [savedList, setSavedList] = useState<Movie[]>([])

  const getSavedMovies = useCallback(() => {
    saved.map(async movie => {
      if (!movie) return

      const { data }: { data: Movie } = await api.get(
        MOVIE_DETAILS_URL(movie.id)
      )

      setSavedList(state => [...state, data])
    })
  }, [saved])

  const query = useQuery({
    queryKey: ['saved-movies', saved],
    queryFn: getSavedMovies
  })

  return {
    savedList,
    ...query
  }
}
