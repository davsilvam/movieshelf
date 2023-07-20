import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'functions/fetch'
import { Movie } from 'types/api'

export function useSearchedMovie(movieTitle: string) {
  const searchedMovies = useQuery(
    ['searchedMovie', movieTitle],
    getMoviesByTitle,
  )

  async function getMoviesByTitle() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      `search/movie?query=${movieTitle}&language=pt-BR`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data
  }

  return {
    searchedMovies,
  }
}
