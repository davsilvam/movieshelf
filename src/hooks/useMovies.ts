'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'functions/fetch'
import { Movie } from 'types/api'

export function useMovies() {
  const { data: popularMovies } = useQuery({
    queryKey: ['todos'],
    queryFn: getPopularMovies,
  })

  async function getPopularMovies() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      'movie/popular?language=pt-BR',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data.results
  }

  return {
    popularMovies,
  }
}
