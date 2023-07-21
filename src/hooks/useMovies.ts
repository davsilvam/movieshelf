'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchWrapper } from 'functions'

import { Movie } from 'types'

export function useMovies() {
  const nowPlayingMovies = useQuery(
    ['movies', 'now-playing', 'list'],
    getNowPlayingMovies,
  )
  const popularMovies = useQuery(
    ['movies', 'popular', 'list'],
    getPopularMovies,
  )
  const topRatedMovies = useQuery(
    ['movies', 'top-rated', 'list'],
    getTopRatedMovies,
  )

  async function getNowPlayingMovies() {
    const { results } = await fetchWrapper<{ results: Movie[] }>(
      'movie/now_playing?language=pt-BR',
    )

    return results
  }

  async function getPopularMovies() {
    const { results } = await fetchWrapper<{ results: Movie[] }>(
      'movie/popular?language=pt-BR',
    )

    return results
  }

  async function getTopRatedMovies() {
    const { results } = await fetchWrapper<{ results: Movie[] }>(
      'movie/top_rated?language=pt-BR',
    )

    return results
  }

  async function getMoviesByGenre(genreId: number) {
    const { results } = await fetchWrapper<{ results: Movie[] }>(
      `discover/movie?with_genres=${genreId}?language=pt-BR`,
    )

    return results
  }

  return {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    getMoviesByGenre,
  }
}
