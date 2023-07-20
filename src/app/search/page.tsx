'use client'

import { Header } from 'components'
import { BannerCard } from 'components/Banner/BannerCard'
import { MovieCard } from 'components/Movie/MovieCard'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSearchedMovie } from './hooks/useSearchedMovie'

export default function Search() {
  const title = useSearchParams().get('query')
  const { searchedMovies } = useSearchedMovie(title ?? '')

  return (
    <main className="relative min-h-screen bg-woodsmoke pb-10">
      <Header />

      {searchedMovies && (
        <div className="h-[80vh] max-w-full">
          <BannerCard movie={searchedMovies?.results[0]} />
        </div>
      )}

      <section className="flex flex-col gap-8 px-10 py-16">
        <h1 className="text-xl text-white">
          Com base na sua pesquisa para:{' '}
          <span className="font-semibold">{title}</span>
        </h1>

        <div className="grid grid-cols-5 gap-5">
          {searchedMovies?.results.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
