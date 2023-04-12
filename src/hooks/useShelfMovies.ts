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

export function useShelfMovies() {
  const { shelf } = useShelf()
  const [shelfList, setShelfList] = useState<Movie[]>([])

  const getShelfMovies = useCallback(() => {
    shelf.map(async movie => {
      if (!movie) return

      const { data }: { data: Movie } = await api.get(
        MOVIE_DETAILS_URL(movie.id)
      )

      setShelfList(state => [...state, data])
    })
  }, [shelf])

  const query = useQuery({
    queryKey: ['shelf-movies', shelf],
    queryFn: getShelfMovies
  })

  return {
    shelfList,
    ...query
  }
}
