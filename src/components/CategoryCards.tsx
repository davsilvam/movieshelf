'use client'

import Link from 'next/link'

import { useMovies } from 'hooks'

export function CategoryCards() {
  const {
    nowPlayingMovies: { data: nowPlayingMovies },
    popularMovies: { data: popularMovies },
    topRatedMovies: { data: topRatedMovies },
  } = useMovies()

  return (
    <section className="flex w-full items-center justify-between gap-20 font-alt text-4xl text-white">
      {popularMovies && (
        <Link
          className="flex h-52 w-full items-center justify-center rounded-md bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path})`,
          }}
          href="/movies/popular"
        >
          <div className="flex h-full w-full items-center justify-center bg-woodsmoke/70 transition-colors hover:bg-woodsmoke/50">
            Popular
          </div>
        </Link>
      )}

      {nowPlayingMovies && (
        <Link
          className="flex h-52 w-full items-center justify-center rounded-md bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w342${nowPlayingMovies[0].backdrop_path})`,
          }}
          href="/movies/hottest"
        >
          <div className="flex h-full w-full items-center justify-center bg-woodsmoke/70 transition-colors hover:bg-woodsmoke/50">
            Novidades
          </div>
        </Link>
      )}

      {topRatedMovies && (
        <Link
          className="flex h-52 w-full items-center justify-center rounded-md bg-opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${topRatedMovies[0].backdrop_path})`,
          }}
          href="/movies/top_rated"
        >
          <div className="flex h-full w-full items-center justify-center bg-woodsmoke/70 transition-colors hover:bg-woodsmoke/50">
            Melhor Avaliados
          </div>
        </Link>
      )}
    </section>
  )
}
