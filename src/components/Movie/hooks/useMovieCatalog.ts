import { useQueries } from '@tanstack/react-query'
import { useMovies } from 'hooks/useMovies'

export function useMovieCatalog(genreIds: number[]) {
  const { getMoviesWithGenre } = useMovies()

  const movieQueries = useQueries({
    queries: genreIds.map((genreId) => {
      return {
        queryKey: ['genreMovies', genreId],
        queryFn: () => getMoviesWithGenre(genreId),
      }
    }),
  }).map((query) => query.data)

  return {
    movieQueries,
  }
}
