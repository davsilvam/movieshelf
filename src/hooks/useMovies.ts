import { useQuery } from '@tanstack/react-query'

import { fetchWrapper } from 'functions'

import { Movie } from 'types'

export function useMovies() {
  const nowPlayingMovies = useQuery(
    ['movies', 'now-playing', 'category', 'list'],
    getNowPlayingMovies,
  )
  const popularMovies = useQuery(
    ['movies', 'popular', 'category', 'list'],
    getPopularMovies,
  )
  const topRatedMovies = useQuery(
    ['movies', 'top-rated', 'category', 'list'],
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
      `discover/movie?language=pt-BR&sort_by=popularity.desc&with_genres=${genreId}`,
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
