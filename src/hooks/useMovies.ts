'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchWrapper } from 'functions'

import { Movie } from 'types'

export function useMovies() {
  const nowPlayingMovies = useQuery(['nowPlayingMovies'], getNowPlayingMovies)
  const popularMovies = useQuery(['popularMovies'], getPopularMovies)
  const topRatedMovies = useQuery(['topRatedMovies'], getTopRatedMovies)

  async function getNowPlayingMovies() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      'movie/now_playing?language=pt-BR',
    )

    return data.results
  }

  async function getPopularMovies() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      'movie/popular?language=pt-BR',
    )

    return data.results
  }

  async function getTopRatedMovies() {
    const data = await fetchWrapper<{ results: Movie[] }>(
      'movie/top_rated?language=pt-BR',
    )

    return data.results
  }

  async function getMoviesWithGenre(genreId: number) {
    const data = await fetchWrapper<{ results: Movie[] }>(
      `discover/movie?with_genres=${genreId}?language=pt-BR`,
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
