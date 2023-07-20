'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'functions/fetch'
import { Movie } from 'types/api'

export function useMovies() {
  const nowPlayingMovies = useQuery(['nowPlayingMovies'], getNowPlayingMovies)
  const popularMovies = useQuery(['popularMovies'], getPopularMovies)
  const topRatedMovies = useQuery(['topRatedMovies'], getTopRatedMovies)

  async function getNowPlayingMovies() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      'movie/now_playing?language=pt-BR',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data.results
  }

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

  async function getTopRatedMovies() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      'movie/top_rated?language=pt-BR',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      },
    )

    return data.results
  }

  async function getMoviesWithGenre(genreId: number) {
    const data = await fetchWrapper<{ results: Movie[] }>(
      `discover/movie?with_genres=${genreId}&language=pt-BR`,
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
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    getMoviesWithGenre,
  }
}
