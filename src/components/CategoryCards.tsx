'use client'

import Link from 'next/link'

import {
  LoadMovies,
  useHottestMovies,
  usePopularMovies,
  useTopRatedMovies,
} from 'hooks'

interface CategoryCardsProps {
  loadHottestMovies: LoadMovies
  loadPopularMovies: LoadMovies
  loadTopRatedMovies: LoadMovies
}

export function CategoryCards({
  loadHottestMovies,
  loadPopularMovies,
  loadTopRatedMovies,
}: CategoryCardsProps) {
  const { nowPlayingMovies } = useHottestMovies({
    loadHottestMovies,
  })

  const { popularMovies } = usePopularMovies({
    loadPopularMovies,
  })

  const { topRatedMovies } = useTopRatedMovies({
    loadTopRatedMovies,
  })

  return (
    <section className="flex w-full items-center justify-between gap-3 font-alt text-2xl text-white max-md:flex-col md:gap-4 lg:gap-8 xl:gap-20 xl:text-4xl">
      {popularMovies && (
        <Link
          className="flex h-32 w-full items-center justify-center rounded-md bg-opacity-20 bg-cover bg-center md:h-52"
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
          className="flex h-32 w-full items-center justify-center rounded-md bg-opacity-20 bg-cover bg-center md:h-52"
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
          className="flex h-32 w-full items-center justify-center rounded-md bg-opacity-20 bg-cover bg-center md:h-52"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${topRatedMovies[0].backdrop_path})`,
          }}
          href="/movies/top-rated"
        >
          <div className="flex h-full w-full items-center justify-center bg-woodsmoke/70 transition-colors hover:bg-woodsmoke/50">
            Melhor Avaliados
          </div>
        </Link>
      )}
    </section>
  )
}
