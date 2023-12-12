import { useQueries } from '@tanstack/react-query'

import { useMovies } from 'hooks'

export function useMovieCatalog(genreIds: number[]) {
  const { getMoviesByGenre } = useMovies()

  const movieQueries = useQueries({
    queries: genreIds.map(genreId => {
      return {
        queryKey: ['movies', 'genre', genreId, 'list'],
        queryFn: () => getMoviesByGenre(genreId),
      }
    }),
  }).map(query => query.data)

  return {
    movieQueries,
  }
}
