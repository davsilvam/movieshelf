import { useQuery } from '@tanstack/react-query'

import { fetchWrapper } from 'functions'

import { Movie } from 'types'

export function useSearchedMovie(movieTitle: string) {
  const searchedMovies = useQuery(
    ['searchedMovie', movieTitle],
    getMoviesByTitle,
  )

  async function getMoviesByTitle() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      `search/movie?query=${movieTitle}&language=pt-BR`,
    )

    return data
  }

  return {
    searchedMovies,
  }
}
